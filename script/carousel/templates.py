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


def _footer(topic: str, section: str, slide_no: int) -> str:
    return f"""
    <div class=\"footer-line\"></div>
    <div class=\"footer\">
      <div class=\"f1\">Wenovat Radar</div>
      <div class=\"f2\">{escape(section)}</div>
      <div class=\"f3\">{slide_no} / 7</div>
    </div>
    """


def _inline_footer_like(section: str, slide_no: int) -> str:
    return f"""
    <div class=\"inline-footer-like\">
      <div class=\"inline-footer-line\"></div>
      <div class=\"inline-footer\">
        <div class=\"f1\">Wenovat Radar</div>
        <div class=\"f2\">{escape(section)}</div>
        <div class=\"f3\">{slide_no} / 7</div>
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
    brand = escape(payload["brand"])
    series = escape(payload["series"])
    topic = escape(payload["topic"])
    slide_no = index + 1

    if index == 0:
        title = "".join([f"<span class='line'>{escape(x)}</span>" for x in slide["title_lines"]])
        body = f"""
        <div class=\"logo\">{brand}<span class=\"dot\">.</span></div>
        <div class=\"series\">{series}<br/>{escape(slide['kicker'])}</div>
        <div class=\"title\">{title}</div>
        <br/>
        <div class=\"subtitle\">{escape(slide['subtitle'])}</div>
        <div class=\"meta\">{escape(payload['episode'])} · {escape(slide['meta'])}</div>
             <br/>
        {_inline_footer_like(topic, slide_no)}
         
        {_image_block(root, slide.get('image', ''))}
       
        """
    elif index == 1:
        cards = "".join(
            [
                f"""
                <div class=\"card\"><div class=\"num\">{i+1}</div><div><h3>{escape(c['title'])}</h3><p>{escape(c['body'])}</p></div></div>
                """
                for i, c in enumerate(slide["cards"])
            ]
        )
        inline_image = ""
        if slide.get("show_inline_image", True):
            inline_image = _inline_copy_image(root, slide.get("image", ""))
        body = f"""
        <div class=\"logo\">{brand}<span class=\"dot\">.</span></div>
        <div class=\"series\">{series}</div>
        <div class=\"section-kicker\">{escape(slide['section_kicker'])}</div>
        <div class=\"section-title section-title-concept\">{escape(slide['section_title'])}</div>
        <div class=\"copy{' with-inline-image' if inline_image else ''}\">{escape(slide['copy'])}</div>
        <div class=\"card-list\">{cards}</div>
        {_inline_footer_like(topic, slide_no)}
        """
    elif index == 2:
        visual_uri = _img(root, slide.get("image", ""))
        visual_img = f"<div class='visual-story-image'><img src='{visual_uri}' alt='visual'/></div>" if visual_uri else ""
        paragraph = (
            f"<div class='visual-story-paragraph'>{escape(slide.get('paragraph', ''))}</div>"
            if slide.get("show_paragraph", True) and slide.get("paragraph", "").strip()
            else ""
        )
        body = f"""
        <div class=\"logo\">{brand}<span class=\"dot\">.</span></div>
        <div class=\"series\">{series}</div>
        <div class=\"section-kicker\">{escape(slide['section_kicker'])}</div>
        <div class=\"section-title section-title-now\">{escape(slide['section_title'])}</div>
        <div class=\"visual-story-wrap\">
        <div class=\"visual-story-image\">{visual_img} </div>
        <div class=\"visual-story-paragraph\">{paragraph} </div>
          
          
        </div>
        {_inline_footer_like(topic, slide_no)}
        """
    elif index == 3:
        definitions = "".join(
            [
                f"<div class='def-item'><div class='def-term'>{escape(item['term'])}</div><div class='def-body'>{escape(item['definition'])}</div></div>"
                for item in slide.get("definitions", [])
            ]
        )
        body = f"""
        <div class=\"logo\">{brand}<span class=\"dot\">.</span></div>
        <div class=\"series\">{series}</div>
        <div class=\"section-kicker\">{escape(slide['section_kicker'])}</div>
        <div class=\"section-title\">{escape(slide['section_title'])}</div>
        <div class=\"definitions-wrap\">
          <div class=\"definitions-intro\">{escape(slide.get('intro', ''))}</div>
          {definitions}
        </div>
        {_inline_footer_like(topic, slide_no)}
        """
    elif index in (4, 5):
        matrix = "".join(
            [
                f"<div class='box'><div class='small'>{escape(x['small'])}</div><div class='big'>{escape(x['big'])}</div><p>{escape(x['body'])}</p></div>"
                for x in slide["matrix"]
            ]
        )
        body = f"""
        <div class=\"logo\">{brand}<span class=\"dot\">.</span></div>
        <div class=\"series\">{series}</div>
        <div class=\"section-kicker\">{escape(slide['section_kicker'])}</div>
        <div class=\"section-title\">{escape(slide['section_title'])}</div>
        <div class=\"matrix\">{matrix}</div>
        {_inline_footer_like(topic, slide_no)}
        """
    else:
        markers = []
        for marker in slide.get("client_markers", []):
            x, y = _compute_marker(marker.get("section", "trial"), marker.get("angle_deg", 30))
            color = escape(marker.get("color", "#2f2a7a"))
            markers.append(
                f"<circle cx='{x:.1f}' cy='{y:.1f}' r='7' fill='white' stroke='{color}' stroke-width='3'/>"
            )
        points = "".join(markers)
        legend_items = "".join(
            [
                f"<div class='simple-legend-item'><span class='dot' style='background:{escape(m.get('color', '#2f2a7a'))}'></span>{escape(m.get('type', 'Client'))}</div>"
                for m in slide.get("client_markers", [])
            ]
        )
        body = f"""
        <div class=\"logo\">{brand}<span class=\"dot\">.</span></div>
        <div class=\"series\">{series}</div>
        <div class=\"section-kicker\">{escape(slide['section_kicker'])}</div>
        <div class=\"section-title\">{escape(slide['section_title'])}</div>
        <div class=\"radar-wrap\">
          <div>
            <div class=\"radar-text\"><strong>{escape(slide['radar_text'])}</strong></div>
            <div class=\"bodycopy\" style=\"margin-top:22px;\">{escape(slide['radar_body'])}</div>
          </div>
          <div>
            <svg class=\"radar-quarter\" viewBox=\"0 0 640 640\" width=\"100%\" height=\"100%\" aria-label=\"Radar quart de cercle\">
              <g>
                <path d=\"M0 560 A560 560 0 0 1 560 0\" fill=\"none\" stroke=\"#8E8E8E\" stroke-width=\"2\"/>
                <path d=\"M140 560 A420 420 0 0 1 560 140\" fill=\"none\" stroke=\"#8E8E8E\" stroke-width=\"2\"/>
                <path d=\"M280 560 A280 280 0 0 1 560 280\" fill=\"none\" stroke=\"#8E8E8E\" stroke-width=\"2\"/>
                <path d=\"M420 560 A140 140 0 0 1 560 420\" fill=\"none\" stroke=\"#8E8E8E\" stroke-width=\"2\"/>
                <line x1=\"0\" y1=\"560\" x2=\"560\" y2=\"560\" stroke=\"#8E8E8E\" stroke-width=\"2\"/>
                <line x1=\"560\" y1=\"560\" x2=\"560\" y2=\"0\" stroke=\"#8E8E8E\" stroke-width=\"2\"/>

                <text x=\"20\" y=\"596\" font-size=\"22\" fill=\"#26242A\" font-weight=\"600\">Caution</text>
                <text x=\"166\" y=\"596\" font-size=\"22\" fill=\"#26242A\" font-weight=\"600\">Assess</text>
                <text x=\"315\" y=\"596\" font-size=\"22\" fill=\"#26242A\" font-weight=\"600\">Trial</text>
                <text x=\"545\" y=\"596\" font-size=\"22\" fill=\"#26242A\" font-weight=\"600\" text-anchor=\"end\">Adopt</text>
                <text x=\"20\" y=\"620\" font-size=\"12\" fill=\"#6B7280\">Peu prioritaire</text>
                <text x=\"166\" y=\"620\" font-size=\"12\" fill=\"#6B7280\">Cadrer et préparer</text>
                <text x=\"315\" y=\"620\" font-size=\"12\" fill=\"#6B7280\">Tester en réel</text>
                <text x=\"545\" y=\"620\" font-size=\"12\" fill=\"#6B7280\" text-anchor=\"end\">Déployer à l'échelle</text>

                <g transform=\"translate(0,560) scale(3.2,-3.2)\">{points}</g>
              </g>
            </svg>
            <div class=\"simple-legend\">{legend_items}</div>
          </div>
        </div>
        {_inline_footer_like(topic, slide_no)}
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
      <section class='page slide-{slide_no}'><div class='content-frame'><div class='grid'>{body}</div></div></section>
    </body>
    </html>
    """
