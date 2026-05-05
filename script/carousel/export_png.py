from __future__ import annotations

import asyncio
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
    if not png_files:
        raise RuntimeError("Aucune image PNG à convertir en PDF")

    images = [Image.open(p).convert("RGB") for p in png_files]
    first, rest = images[0], images[1:]
    first.save(str(output_path), "PDF", resolution=300.0, save_all=True, append_images=rest)
    for im in images:
        im.close()


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
