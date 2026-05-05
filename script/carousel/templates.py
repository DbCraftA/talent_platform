from __future__ import annotations

from html import escape
from math import cos, radians, sin
from pathlib import Path

from .styles import build_css


def _img(root: Path, relative_or_abs: str) -> str:
    if not relative_or_abs:
        return ""
    path = Path(relative_or_abs)
    if not path.is_absolute():
        path = root / path
    return path.resolve().as_uri() if path.exists() else ""


def _footer(topic: str, section: str, slide_no: int, total_slides: int) -> str:
    return f"""
    <div class=\"footer-line\"></div>
    <div class=\"footer\">
      <div class=\"f1\">Wenovat Radar</div>
      <div class=\"f2\">{escape(section)}</div>
      <div class=\"f3\">{slide_no} / {total_slides}</div>
    </div>
    """


def _inline_footer_like(section: str, slide_no: int, total_slides: int) -> str:
    return f"""
    <div class=\"inline-footer-like\">
      <div class=\"inline-footer-line\"></div>
      <div class=\"inline-footer\">
        <div class=\"f1\">Wenovat Radar</div>
        <div class=\"f2\">{escape(section)}</div>
        <div class=\"f3\">{slide_no} / {total_slides}</div>
      </div>
    </div>
    """


def _image_block(root: Path, src: str) -> str:
    uri = _img(root, src)
    if not uri:
        return ""
    return f"<div class=\"image-wrap\"><img src=\"{uri}\" alt=\"illustration\"/></div>"


def _inline_copy_image(root: Path, src: str) -> str:
    uri = _img(root, src)
    if not uri:
        return ""
    return f"<div class=\"inline-copy-image\"><img src=\"{uri}\" alt=\"illustration\"/></div>"


def _section_radius(section: str) -> int:
    mapping = {
        "adopt": 42,
        "trial": 82,
        "assess": 125,
        "hold": 170,
        "caution": 170,
    }
    return mapping.get(section.lower(), 82)


def _compute_marker(section: str, angle_deg: float) -> tuple[float, float]:
    radius = _section_radius(section)
    angle = radians(angle_deg)
    x = radius * cos(angle)
    y = radius * sin(angle)
    return x, y


def render_slide(root: Path, payload: dict, index: int) -> str:
    slide = payload["slides"][index]
    brand = escape(payload.get("brand", ""))
    series = escape(payload.get("series", ""))
    topic = escape(payload.get("topic", ""))
    slide_no = index + 1
    total_slides = len(payload.get("slides", [])) or 1
    default_types = [
        "cover",
        "concept_cards",
        "visual_story",
        "timeline",
        "definitions",
        "matrix_why",
        "matrix_difficulty",
        "radar_verdict",
    ]
    template_type = slide.get("template_type") or (default_types[index] if index < len(default_types) else "cover")

    if template_type == "cover":
        title_lines = slide.get("title_lines") or [slide.get("section_title", "Titre")]
        title = "".join([f"<span class='line'>{escape(x)}</span>" for x in title_lines])
        body = f"""
        <div class="logo">{brand}<span class="dot">.</span></div>
        <div class="series">{series}<br/>{escape(slide.get('kicker', ''))}</div>
        <div class="title">{title}</div>
        <br/>
        <div class="subtitle">{escape(slide.get('subtitle', ''))}</div>
        <div class="meta">{escape(payload.get('episode', ''))} · {escape(slide.get('meta', ''))}</div>
        """
    elif template_type == "concept_cards":
        cards = "".join([
            f"<div class='card'><div class='num'>{i+1}</div><div><h3>{escape(c.get('title',''))}</h3><div class='card-desc'>{escape(c.get('body',''))}</div></div></div>"
            for i, c in enumerate(slide.get("cards", []))
        ])
        inline_image = _inline_copy_image(root, slide.get("image", "")) if slide.get("show_inline_image", True) else ""
        body = f"""
        <div class="logo">{brand}<span class="dot">.</span></div>
        <div class="series">{series}</div>
        <div class="section-kicker">{escape(slide.get('section_kicker',''))}</div>
        <div class="section-title section-title-concept">{escape(slide.get('section_title',''))}</div>
        <div class="copy{' with-inline-image' if inline_image else ''}">{escape(slide.get('copy',''))}</div>
        {inline_image}
        <div class="card-list">{cards}</div>
        """
    elif template_type == "visual_story":
        visual_uri = _img(root, slide.get("image", ""))
        paragraph = f"<div class='visual-story-paragraph'>{escape(slide.get('paragraph', ''))}</div>" if slide.get("show_paragraph", True) and slide.get("paragraph", "").strip() else ""
        body = f"""
        <div class="logo">{brand}<span class="dot">.</span></div>
        <div class="series">{series}</div>
        <div class="section-kicker">{escape(slide.get('section_kicker',''))}</div>
        <div class="section-title section-title-now">{escape(slide.get('section_title',''))}</div>
        <div class="visual-story-wrap">
          <div class="visual-story-image">{f"<img src='{visual_uri}' alt='visual'/>" if visual_uri else ''}</div>
          {paragraph}
        </div>
        """
    elif template_type == "timeline":
        timeline_items = slide.get("timeline_items", [])[:3]
        timeline_items_next = slide.get("timeline_items", [])[3:6]
        blocks = "".join([
            f"<div class='time-block'><div class='time-date'>{escape(item.get('date',''))}</div><div class='time-title'>{escape(item.get('title',''))}</div><div class='time-body'>{escape(item.get('body',''))}</div></div>"
            for item in timeline_items
        ])
        blocks_next = "".join([
            f"<div class='time-block'><div class='time-date'>{escape(item.get('date', ''))}</div><div class='time-title'>{escape(item.get('title', ''))}</div><div class='time-body'>{escape(item.get('body', ''))}</div></div>"
            for item in timeline_items_next
        ])
        body = f"""
        <div class="logo">{brand}<span class="dot">.</span></div>
        <div class="series">{series}</div>
        <div class="section-kicker">{escape(slide.get('section_kicker',''))}</div>
        <div class="section-title">{escape(slide.get('section_title',''))}</div>
        <div class="timeline">{blocks}</div>
        <div class="timeline">{blocks_next}</div>
        """
    elif template_type == "compare_table":
        headers = slide.get("table_headers", [])
        rows = slide.get("table_cells", [])
        cols = max(2, int(slide.get("table_columns", len(headers) if headers else 3)))
        while len(headers) < cols:
            headers.append(f"Colonne {len(headers)+1}")
        headers = headers[:cols]

        grid_cols = "2.1fr " + " ".join(["1.65fr" for _ in range(max(0, cols - 1))])

        cells_html = "".join([f"<div class='cell head'><div class='label'>{escape(h)}</div></div>" for h in headers])
        for row in rows:
            row_vals = row if isinstance(row, list) else []
            while len(row_vals) < cols:
                row_vals.append("")
            for c in range(cols):
                val = row_vals[c]
                cells_html += f"<div class='cell'><div class='main'>{escape(val)}</div></div>"

        body = f"""
        <div class="logo">{brand}<span class="dot">.</span></div>
        <div class="series">{series}<br/>Comparative view</div>
        <div class="section-kicker">{escape(slide.get('section_kicker',''))}</div>
        <div class="title">{escape(slide.get('section_title',''))}</div>
        <div class="subtitle">{escape(slide.get('subtitle',''))}</div>
        <div class="compare-wrap" style="grid-template-columns:{grid_cols};">{cells_html}</div>
        """
    elif template_type == "definitions":
        definitions = "".join([f"<div class='def-item'><div class='def-term'>{escape(item.get('term',''))}</div><div class='def-body'>{escape(item.get('definition',''))}</div></div>" for item in slide.get("definitions", [])])
        body = f"""
        <div class="logo">{brand}<span class="dot">.</span></div>
        <div class="series">{series}</div>
        <div class="section-kicker">{escape(slide.get('section_kicker',''))}</div>
        <div class="section-title">{escape(slide.get('section_title',''))}</div>
        <div class="definitions-wrap"><div class="definitions-intro">{escape(slide.get('intro', ''))}</div>{definitions}</div>
        """
    elif template_type in ("matrix_why", "matrix_difficulty"):
        matrix = "".join([f"<div class='box'><div class='small'>{escape(x.get('small',''))}</div><div class='big'>{escape(x.get('big',''))}</div><div class='card-desc'>{escape(x.get('body',''))}</div></div>" for x in slide.get("matrix", [])])
        body = f"""
        <div class="logo">{brand}<span class="dot">.</span></div>
        <div class="series">{series}</div>
        <div class="section-kicker">{escape(slide.get('section_kicker',''))}</div>
        <div class="section-title">{escape(slide.get('section_title',''))}</div>
        <div class="matrix">{matrix}</div>
        """
    else:
        markers = []
        for marker in slide.get("client_markers", []):
            x, y = _compute_marker(marker.get("section", "trial"), marker.get("angle_deg", 30))
            color = escape(marker.get("color", "#2f2a7a"))
            markers.append(f"<circle cx='{x:.1f}' cy='{y:.1f}' r='7' fill='white' stroke='{color}' stroke-width='3'/>")
        points = "".join(markers)
        legend_items = "".join([f"<div class='simple-legend-item'><span class='dot' style='background:{escape(m.get('color', '#2f2a7a'))}'></span>{escape(m.get('type', 'Client'))}</div>" for m in slide.get("client_markers", [])])
        body = f"""
        <div class="logo">{brand}<span class="dot">.</span></div>
        <div class="series">{series}</div>
        <div class="section-kicker">{escape(slide.get('section_kicker',''))}</div>
        <div class="section-title">{escape(slide.get('section_title',''))}</div>
        <div class="radar-wrap"><div><div class="radar-text"><strong>{escape(slide.get('radar_text',''))}</strong></div>
        <div class="bodycopy" style="margin-top:22px;">{escape(slide.get('radar_body',''))}</div>
        </div>
        <div><svg class="radar-quarter" viewBox="0 0 640 640" width="100%" height="100%" aria-label="Radar quart de cercle"><g><path d="M0 560 A560 560 0 0 1 560 0" fill="none" stroke="#8E8E8E" stroke-width="2"/><path d="M140 560 A420 420 0 0 1 560 140" fill="none" stroke="#8E8E8E" stroke-width="2"/><path d="M280 560 A280 280 0 0 1 560 280" fill="none" stroke="#8E8E8E" stroke-width="2"/><path d="M420 560 A140 140 0 0 1 560 420" fill="none" stroke="#8E8E8E" stroke-width="2"/><line x1="0" y1="560" x2="560" y2="560" stroke="#8E8E8E" stroke-width="2"/><line x1="560" y1="560" x2="560" y2="0" stroke="#8E8E8E" stroke-width="2"/><g transform="translate(0,560) scale(3.2,-3.2)">{points}</g></g></svg>
        <div class="simple-legend">{legend_items}
        </div>
        </div></div>
        """

    return f"""
    <!doctype html>
    <html lang='fr'>
    <head>
      <meta charset='utf-8'/>
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <style>{build_css()}</style>
    </head>
    <body>
      <section class='page slide-{slide_no}'><div class='content-frame'><div class='grid'>{body}</div>{_inline_footer_like(topic, slide_no, total_slides)}</div></section>
    </body>
    </html>
    """
