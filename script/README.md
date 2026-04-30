# LinkedIn Carousel Builder (Streamlit)

Utilitaire local pour créer un carrousel LinkedIn **7 slides fixes** (1080x1350), avec :

- formulaire d’édition par slide,
- prévisualisation interactive,
- export PNG slide par slide,
- export PDF multi-pages (1 slide par page).

## Emplacement du code

Tout le code de l’outil est dans [`script/`](script).

## Installation

Depuis la racine du projet :

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r script/requirements.txt
python -m playwright install chromium
```

## Lancer l’application

```bash
streamlit run script/app.py
```

## Fonctionnement

- Éditer le contenu via la sidebar + formulaire.
- Choisir des images :
  - upload local,
  - ou fallback depuis [`src/images/`](src/images).
- Prévisualiser la slide active à droite.
- Exporter les 7 slides en PNG ou en PDF via les boutons d’export.

## Sorties

- HTML temporaires : [`script/.tmp/`](script/.tmp)
- PNG finaux : [`script/output/`](script/output) au format `slide_01.png` → `slide_07.png`
- PDF final : [`script/output/carousel.pdf`](script/output/carousel.pdf)

## Structure

- [`script/app.py`](script/app.py) : app Streamlit
- [`script/carousel/schema.py`](script/carousel/schema.py) : données par défaut et fallback images
- [`script/carousel/styles.py`](script/carousel/styles.py) : CSS inspiré du template fourni + tokens du site
- [`script/carousel/templates.py`](script/carousel/templates.py) : rendu HTML par slide
- [`script/carousel/export_png.py`](script/carousel/export_png.py) : export HTML → PNG + PDF avec Playwright
