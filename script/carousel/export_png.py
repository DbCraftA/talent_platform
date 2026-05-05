from __future__ import annotations

import asyncio
import base64
import struct
from pathlib import Path

from playwright.async_api import async_playwright
from PIL import Image


async def _render_one(html_path: Path, output_path: Path) -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=["--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"],
        )
        page = await browser.new_page(viewport={"width": 1080, "height": 1350})
        await page.goto(html_path.resolve().as_uri())
        await page.wait_for_timeout(250)
        page_container = page.locator(".content-frame")
        if await page_container.count() > 0:
            box = await page_container.bounding_box()
            if box:
                clip_x = max(0, box["x"])
                clip_y = max(0, box["y"])
                clip_w = max(1, box["width"])
                clip_h = max(1, box["height"])
                await page.screenshot(
                    path=str(output_path),
                    clip={
                        "x": clip_x,
                        "y": clip_y,
                        "width": clip_w,
                        "height": clip_h,
                    },
                )
            else:
                await page.screenshot(path=str(output_path), full_page=False)
        else:
            await page.screenshot(path=str(output_path), full_page=False)
        await browser.close()


async def _render_png_files(html_files: list[Path], output_dir: Path) -> list[Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    results: list[Path] = []
    for i, html_path in enumerate(html_files, start=1):
        output = output_dir / f"slide_{i:02d}.png"
        await _render_one(html_path, output)
        results.append(output)
    return results


def _normalize_pngs(png_files: list[Path]) -> None:
    target_width_out = 850
    target_height_out = 850
    target_ratio = target_width_out / target_height_out
    for png in png_files:
        with Image.open(png) as img:
            width, height = img.size
            current_ratio = width / height if height else target_ratio

            if abs(current_ratio - target_ratio) < 1e-6:
                continue

            if current_ratio > target_ratio:
                target_width = int(round(height * target_ratio))
                left = max(0, (width - target_width) // 2)
                right = left + target_width
                top = 0
                bottom = height
            else:
                target_height = int(round(width / target_ratio))
                top = max(0, (height - target_height) // 2)
                bottom = top + target_height
                left = 0
                right = width

            cropped = img.crop((left, top, right, bottom))
            resized = cropped.resize((target_width_out, target_height_out), Image.Resampling.LANCZOS)
            resized.save(png)


async def _render_pdf(html_files: list[Path], output_path: Path) -> None:
    try:
        await _render_pdf_direct(html_files, output_path)
    except Exception:
        png_dir = output_path.parent / ".pdf_png_tmp"
        png_files = await _render_png_files(html_files, png_dir)
        await _render_pdf_from_pngs(png_files, output_path)


async def _render_pdf_direct(html_files: list[Path], output_path: Path) -> None:
    raise RuntimeError("Direct HTML->PDF path disabled: fallback PNG->PDF is enforced for stable output")


async def _render_pdf_from_pngs(png_files: list[Path], output_path: Path) -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=["--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"],
        )
        page = await browser.new_page(viewport={"width": 1080, "height": 1350})

        def _png_size(path: Path) -> tuple[int, int]:
            raw = path.read_bytes()
            if len(raw) < 24 or raw[:8] != b"\x89PNG\r\n\x1a\n":
                return (1080, 1350)
            width, height = struct.unpack(">II", raw[16:24])
            return int(width), int(height)

        page_w, page_h = _png_size(png_files[0]) if png_files else (1080, 1350)

        blocks: list[str] = []
        for png in png_files:
            b64 = base64.b64encode(png.read_bytes()).decode("ascii")
            blocks.append(
                f'<div class="pdf-page"><img src="data:image/png;base64,{b64}" alt="slide" /></div>'
            )
        img_blocks = "\n".join(blocks)

        merged_html = f"""
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      @page {{ size: {page_w}px {page_h}px; margin: 0; }}
      html, body {{ margin: 0; padding: 0; background: #ffffff; }}
      .pdf-page {{ width: {page_w}px; height: {page_h}px; page-break-after: always; break-after: page; }}
      .pdf-page:last-child {{ page-break-after: auto; break-after: auto; }}
      .pdf-page img {{ width: 100%; height: 100%; display: block; object-fit: fill; }}
    </style>
  </head>
  <body>
    {img_blocks}
  </body>
</html>
"""

        await page.set_content(merged_html, wait_until="networkidle")
        await page.pdf(
            path=str(output_path),
            width=f"{page_w}px",
            height=f"{page_h}px",
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
            print_background=True,
        )
        await browser.close()


def export_html_to_png(html_files: list[Path], output_dir: Path) -> list[Path]:
    try:
        results = asyncio.run(_render_png_files(html_files, output_dir))
        _normalize_pngs(results)
    except Exception as exc:
        raise RuntimeError(
            "Échec de l'export PNG via Playwright. "
            "Assurez-vous que Chromium est installé avec: "
            "python -m playwright install chromium"
        ) from exc
    return results


def export_html_to_pdf(html_files: list[Path], output_path: Path) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        asyncio.run(_render_pdf(html_files, output_path))
    except Exception as exc:
        raise RuntimeError(
            "Échec de l'export PDF via Playwright. "
            "Assurez-vous que Chromium est installé avec: "
            "python -m playwright install chromium"
        ) from exc
    return output_path
