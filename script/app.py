from __future__ import annotations

import json
from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components

from carousel.export_png import export_html_to_pdf, export_html_to_png
from carousel.schema import clone_data, default_data, discover_fallback_images
from carousel.templates import render_slide


ROOT = Path(__file__).resolve().parents[1]
SCRIPT_DIR = Path(__file__).resolve().parent
TMP_DIR = SCRIPT_DIR / ".tmp"
OUTPUT_DIR = SCRIPT_DIR / "output"
UPLOAD_DIR = SCRIPT_DIR / "uploads"


def _init_state() -> None:
    if "data" not in st.session_state:
        st.session_state.data = default_data(ROOT)
    if "current_slide" not in st.session_state:
        st.session_state.current_slide = 0


def _persist_upload(upload, name: str) -> str:
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    ext = Path(upload.name).suffix.lower() or ".png"
    target = UPLOAD_DIR / f"{name}{ext}"
    target.write_bytes(upload.getbuffer())
    return str(target.relative_to(ROOT))


def _text_area_list(label: str, value: list[str], key: str) -> list[str]:
    text = st.text_area(label, "\n".join(value), key=key, height=140)
    return [line.strip() for line in text.splitlines() if line.strip()]


def _resize_list_of_dicts(items: list[dict], target_size: int, template: dict) -> list[dict]:
    if target_size <= 0:
        return []
    next_items = items[:target_size]
    while len(next_items) < target_size:
        next_items.append(template.copy())
    return next_items


def _edit_slide(slide_index: int) -> None:
    data = st.session_state.data
    slide = data["slides"][slide_index]
    fallback_images = [""] + discover_fallback_images(ROOT)

    st.subheader(f"Édition slide {slide_index + 1}/7")

    image_mode = st.radio(
        "Image",
        ["Aucune", "Choisir une image du projet", "Uploader une image"],
        horizontal=True,
        key=f"img_mode_{slide_index}",
    )
    if image_mode == "Choisir une image du projet":
        slide["image"] = st.selectbox(
            "Image fallback",
            options=fallback_images,
            index=max(0, fallback_images.index(slide.get("image", "")) if slide.get("image", "") in fallback_images else 0),
            key=f"fallback_img_{slide_index}",
        )
    elif image_mode == "Uploader une image":
        up = st.file_uploader("Image locale", type=["png", "jpg", "jpeg", "webp"], key=f"upload_{slide_index}")
        if up:
            slide["image"] = _persist_upload(up, f"slide_{slide_index + 1}")
    else:
        slide["image"] = ""

    if slide_index == 0:
        data["brand"] = st.text_input("Marque", data["brand"])
        data["series"] = st.text_input("Série", data["series"])
        data["episode"] = st.text_input("Épisode", data["episode"])
        data["topic"] = st.text_input("Topic", data["topic"])
        slide["kicker"] = st.text_input("Kicker", slide["kicker"])
        slide["title_lines"] = _text_area_list("Titre (1 ligne = 1 ligne de titre)", slide["title_lines"], "title_lines")
        slide["subtitle"] = st.text_area("Sous-titre", slide["subtitle"], height=120)
        slide["meta"] = st.text_area("Meta", slide["meta"], height=90)
    elif slide_index == 1:
        slide["section_kicker"] = st.text_input("Section kicker", slide["section_kicker"])
        slide["section_title"] = st.text_input("Section title", slide["section_title"])
        slide["copy"] = st.text_area("Copy", slide["copy"], height=140)
        slide["show_inline_image"] = st.checkbox(
            "Afficher l'image sous le texte descriptif",
            value=slide.get("show_inline_image", True),
            key="show_inline_image_s2",
        )
        card_count = st.slider("Nombre de cards", 1, 5, len(slide["cards"]), key="card_count_s2")
        slide["cards"] = _resize_list_of_dicts(
            slide["cards"],
            card_count,
            {"title": "Nouveau titre", "body": "Nouveau descriptif."},
        )
        for i, card in enumerate(slide["cards"]):
            with st.expander(f"Card {i+1}", expanded=i == 0):
                card["title"] = st.text_input("Titre", card["title"], key=f"card_t_1_{i}")
                card["body"] = st.text_area("Corps", card["body"], key=f"card_b_1_{i}")
    elif slide_index == 2:
        slide["section_kicker"] = st.text_input("Section kicker", slide["section_kicker"])
        slide["section_title"] = st.text_input("Section title", slide["section_title"])
        slide["caption"] = st.text_input("Légende image", slide.get("caption", ""))
        slide["show_paragraph"] = st.checkbox(
            "Afficher paragraphe optionnel",
            value=slide.get("show_paragraph", True),
            key="show_paragraph_s3",
        )
        slide["paragraph"] = st.text_area("Paragraphe optionnel", slide.get("paragraph", ""), height=160)
    elif slide_index == 3:
        slide["section_kicker"] = st.text_input("Section kicker", slide["section_kicker"])
        slide["section_title"] = st.text_input("Section title", slide["section_title"])
        slide["intro"] = st.text_area("Intro", slide.get("intro", ""), height=110)
        definitions = slide.get("definitions", [])
        count = st.slider("Nombre de définitions", 3, 8, len(definitions) if definitions else 3, key="definitions_count_s4")
        slide["definitions"] = _resize_list_of_dicts(
            definitions,
            count,
            {"term": "Terme", "definition": "Définition"},
        )
        for i, item in enumerate(slide["definitions"]):
            with st.expander(f"Définition {i+1}", expanded=i == 0):
                item["term"] = st.text_input("Terme", item["term"], key=f"def_t_{i}")
                item["definition"] = st.text_area("Définition", item["definition"], key=f"def_d_{i}")
    elif slide_index in (4, 5):
        slide["section_kicker"] = st.text_input("Section kicker", slide["section_kicker"])
        slide["section_title"] = st.text_input("Section title", slide["section_title"])
        for i, box in enumerate(slide["matrix"]):
            with st.expander(f"Bloc {i+1}", expanded=i == 0):
                box["small"] = st.text_input("Petit titre", box["small"], key=f"mx_s_{slide_index}_{i}")
                box["big"] = st.text_input("Grand titre", box["big"], key=f"mx_b_{slide_index}_{i}")
                box["body"] = st.text_area("Corps", box["body"], key=f"mx_p_{slide_index}_{i}")
    else:
        slide["section_kicker"] = st.text_input("Section kicker", slide["section_kicker"])
        slide["section_title"] = st.text_input("Section title", slide["section_title"])
        slide["radar_text"] = st.text_input("Texte radar", slide["radar_text"])
        slide["radar_body"] = st.text_area("Corps radar", slide["radar_body"], height=120)
        markers = slide.get("client_markers", [])
        markers = _resize_list_of_dicts(
            markers,
            2,
            {
                "type": "client",
                "section": "trial",
                "angle_deg": 30,
                "color": "#2f2a7a",
            },
        )
        markers[0]["type"] = st.text_input(
            "Type client #1",
            markers[0].get("type", "forte contrainte réglementaire"),
            key="marker_type_0",
        )
        markers[0]["section"] = st.selectbox(
            "Section radar #1",
            ["adopt", "trial", "assess", "hold"],
            index=["adopt", "trial", "assess", "hold"].index(markers[0].get("section", "trial")) if markers[0].get("section", "trial") in ["adopt", "trial", "assess", "hold"] else 1,
            key="marker_section_0",
        )
        markers[0]["angle_deg"] = st.slider("Angle #1", 0, 359, int(markers[0].get("angle_deg", 28)), key="marker_angle_0")
        markers[1]["type"] = st.text_input(
            "Type client #2",
            markers[1].get("type", "faible contrainte réglementaire"),
            key="marker_type_1",
        )
        markers[1]["section"] = st.selectbox(
            "Section radar #2",
            ["adopt", "trial", "assess", "hold"],
            index=["adopt", "trial", "assess", "hold"].index(markers[1].get("section", "assess")) if markers[1].get("section", "assess") in ["adopt", "trial", "assess", "hold"] else 2,
            key="marker_section_1",
        )
        markers[1]["angle_deg"] = st.slider("Angle #2", 0, 359, int(markers[1].get("angle_deg", 138)), key="marker_angle_1")
        markers[0]["color"] = st.color_picker("Couleur #1", markers[0].get("color", "#163a50"), key="marker_color_0")
        markers[1]["color"] = st.color_picker("Couleur #2", markers[1].get("color", "#2b8f9e"), key="marker_color_1")
        slide["client_markers"] = markers


def _render_preview() -> None:
    html = render_slide(ROOT, st.session_state.data, st.session_state.current_slide)
    components.html(html, height=1380, width=1120, scrolling=True)


def _export_all() -> None:
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    html_files: list[Path] = []
    for i in range(7):
        p = TMP_DIR / f"slide_{i+1:02d}.html"
        p.write_text(render_slide(ROOT, st.session_state.data, i), encoding="utf-8")
        html_files.append(p)
    try:
        outputs = export_html_to_png(html_files, OUTPUT_DIR)
        st.success(f"Export terminé: {len(outputs)} PNG dans {OUTPUT_DIR}")
    except RuntimeError as exc:
        st.error(str(exc))


def _export_pdf() -> None:
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    html_files: list[Path] = []
    for i in range(7):
        p = TMP_DIR / f"slide_{i+1:02d}.html"
        p.write_text(render_slide(ROOT, st.session_state.data, i), encoding="utf-8")
        html_files.append(p)
    try:
        pdf_path = export_html_to_pdf(html_files, OUTPUT_DIR / "carousel.pdf")
        st.session_state.exported_pdf_bytes = pdf_path.read_bytes()
        st.session_state.exported_pdf_name = pdf_path.name
        st.success(f"Export PDF terminé: {pdf_path}")
    except RuntimeError as exc:
        st.error(str(exc))


def main() -> None:
    st.set_page_config(page_title="Wenovat Carousel Builder", layout="wide")
    _init_state()

    st.title("Générateur de carrousel LinkedIn (7 slides)")

    with st.sidebar:
        st.header("Navigation")
        st.session_state.current_slide = st.slider("Slide", 0, 6, st.session_state.current_slide)

        col_a, col_b = st.columns(2)
        if col_a.button("← Précédent"):
            st.session_state.current_slide = max(0, st.session_state.current_slide - 1)
        if col_b.button("Suivant →"):
            st.session_state.current_slide = min(6, st.session_state.current_slide + 1)

        st.divider()
        if st.button("Réinitialiser contenu"):
            st.session_state.data = default_data(ROOT)

        st.download_button(
            "Télécharger JSON",
            data=json.dumps(st.session_state.data, ensure_ascii=False, indent=2),
            file_name="carousel_content.json",
            mime="application/json",
        )
        uploaded_json = st.file_uploader("Importer JSON", type=["json"])
        if uploaded_json:
            st.session_state.data = clone_data(json.loads(uploaded_json.read().decode("utf-8")))
            st.success("Contenu importé")

        st.divider()
        st.caption("Exports 1080x1350")
        if st.button("Exporter les 7 slides en PNG"):
            _export_all()
        if st.button("Exporter en PDF"):
            _export_pdf()

        if st.session_state.get("exported_pdf_bytes"):
            st.download_button(
                "Télécharger le PDF généré",
                data=st.session_state.exported_pdf_bytes,
                file_name=st.session_state.get("exported_pdf_name", "carousel.pdf"),
                mime="application/pdf",
            )

    left, right = st.columns([1.05, 1.35])
    with left:
        _edit_slide(st.session_state.current_slide)
    with right:
        st.subheader("Prévisualisation")
        _render_preview()


if __name__ == "__main__":
    main()
