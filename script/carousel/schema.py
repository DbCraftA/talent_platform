from __future__ import annotations

from copy import deepcopy
from pathlib import Path


DEFAULT_TEMPLATE_TYPES = [
    "cover",
    "concept_cards",
    "visual_story",
    "timeline",
    "compare_table",
    "definitions",
    "matrix_why",
    "matrix_difficulty",
    "radar_verdict",
]


def discover_fallback_images(root: Path) -> list[str]:
    images_dir = root / "src" / "images"
    if not images_dir.exists():
        return []
    allowed = {".png", ".jpg", ".jpeg", ".webp", ".svg"}
    return sorted(
        [
            str(path.relative_to(root))
            for path in images_dir.rglob("*")
            if path.is_file() and path.suffix.lower() in allowed
        ]
    )


def default_data(root: Path) -> dict:
    fallback = discover_fallback_images(root)
    fallback_1 = fallback[0] if fallback else ""
    fallback_2 = fallback[1] if len(fallback) > 1 else fallback_1

    return {
        "brand": "Wenovat",
        "series": "WENOVAT RADAR",
        "episode": "Épisode 01 · Security",
        "topic": "Cryptographie quantique",
        "slides": [
            {
                "template_type": "cover",
                "kicker": "Concept Enlightenment for architects, CTOs and tech leaders",
                "title_lines": [
                    "Faut-il vraiment",
                    "s’inquiéter des risques",
                    "de la cryptographie",
                    "quantique ?",
                ],
                "subtitle": "Une lecture simple du sujet : ce qui relève du signal, ce qui relève du bruit, et ce que cela change réellement.",
                "meta": "Format pensé pour être décliné sur d’autres sujets avec la même structure éditoriale.",
                "image": fallback_1,
            },
            {
                "template_type": "concept_cards",
                "section_kicker": "Le concept",
                "section_title": "Le sujet en 20 secondes",
                "copy": "Le vrai risque n’est pas que le quantique casse tout demain. Le sujet est surtout architectural.",
                "show_inline_image": True,
                "cards": [
                    {"title": "Ce qui est concerné", "body": "Les mécanismes asymétriques utilisés pour l’échange de clés et signatures."},
                    {"title": "Ce que cela implique", "body": "Une migration progressive vers des standards post-quantiques et hybrides."},
                    {"title": "Ce qu’il faut retenir", "body": "Inventaire, dépendances, priorisation et exécution."},
                ],
                "image": fallback_2,
            },
            {
                "template_type": "visual_story",
                "section_kicker": "Pourquoi maintenant",
                "section_title": "Un signal visuel simple",
                "image": fallback_2,
                "caption": "Exemple terrain",
                "paragraph": "Ce visuel illustre un cas concret. Le paragraphe est optionnel et peut être masqué si vous voulez une slide plus minimaliste.",
                "show_paragraph": True,
            },
            {
                "template_type": "timeline",
                "section_kicker": "Pourquoi maintenant",
                "section_title": "Pourquoi le sujet revient",
                "timeline_items": [
                    {
                        "date": "AOÛT 2024",
                        "title": "Le NIST finalise les premiers standards",
                        "body": "Le sujet quitte en partie le terrain de la recherche pure. Il existe désormais des références concrètes pour préparer la transition.",
                    },
                    {
                        "date": "MARS 2025",
                        "title": "Le NCSC publie une trajectoire de migration",
                        "body": "La logique change : les organisations sont invitées à se préparer maintenant, même si les déploiements seront progressifs.",
                    },
                    {
                        "date": "DÈS AUJOURD’HUI",
                        "title": "Le risque store now, decrypt later compte déjà",
                        "body": "Certaines données sensibles peuvent être captées aujourd’hui puis exposées plus tard si leur horizon de confidentialité est long.",
                    },
                ],
                "image": "",
            },
            {
                "template_type": "compare_table",
                "section_kicker": "Tableau comparatif",
                "section_title": "Deux approches face à la cryptographie quantique",
                "subtitle": "Un visuel éditorial pour comparer clairement plusieurs options.",
                "table_columns": 3,
                "table_rows": 4,
                "table_headers": ["Critère", "Option A", "Option B"],
                "table_cells": [
                    ["Urgence business", "Faible", "Modérée"],
                    ["Risque long terme", "Élevé", "Réduit"],
                    ["Complexité de mise en œuvre", "Faible", "Progressive"],
                    ["Verdict", "Hold", "Assess / Trial"],
                ],
                "image": "",
            },
            {
                "template_type": "definitions",
                "section_kicker": "Définitions",
                "section_title": "Définitions clés",
                "intro": "Version épurée pour aligner rapidement les équipes sur le vocabulaire du sujet.",
                "definitions": [
                    {"term": "Crypto-agilité", "definition": "Capacité à faire évoluer les mécanismes cryptographiques sans refonte lourde."},
                    {"term": "Store now, decrypt later", "definition": "Risque de déchiffrement futur de données captées aujourd’hui."},
                    {"term": "Migration PQC", "definition": "Transition progressive vers des standards post-quantiques."},
                ],
                "image": "",
            },
            {
                "template_type": "matrix_why",
                "section_kicker": "Pourquoi c’est utile",
                "section_title": "Pourquoi s’y intéresser",
                "matrix": [
                    {"small": "Raison 01", "big": "Protéger les données longues", "body": "Les actifs sensibles se raisonnent souvent en années."},
                    {"small": "Raison 02", "big": "Éviter une migration subie", "body": "Une préparation tardive augmente le coût et le risque."},
                    {"small": "Raison 03", "big": "Renforcer la crypto-agilité", "body": "Un SI adaptable devient plus robuste globalement."},
                    {"small": "Raison 04", "big": "Mieux challenger les fournisseurs", "body": "Le sujet révèle la maturité réelle des produits."},
                ],
                "image": "",
            },
            {
                "template_type": "matrix_difficulty",
                "section_kicker": "Complexité",
                "section_title": "Pourquoi c’est difficile",
                "matrix": [
                    {"small": "Friction 01", "big": "Inventaire incomplet", "body": "La cryptographie est diffuse et rarement cartographiée."},
                    {"small": "Friction 02", "big": "Interopérabilité", "body": "Les solutions du marché n’évoluent pas au même rythme."},
                    {"small": "Friction 03", "big": "Performance", "body": "Des compromis peuvent exister sur taille/latence."},
                    {"small": "Friction 04", "big": "Gouvernance", "body": "Le sujet traverse plusieurs équipes et métiers."},
                ],
                "image": "",
            },
            {
                "template_type": "radar_verdict",
                "section_kicker": "Verdict",
                "section_title": "La bonne lecture du sujet",
                "radar_text": "Oui pour la préparation. Non pour la panique.",
                "radar_body": "Préparer la transition : inventaire, fournisseurs, priorisation des actifs, premiers pilotes.",
                "client_markers": [
                    {
                        "type": "forte contrainte réglementaire",
                        "section": "trial",
                        "angle_deg": 28,
                        "color": "#163a50",
                    },
                    {
                        "type": "faible contrainte réglementaire",
                        "section": "assess",
                        "angle_deg": 138,
                        "color": "#2b8f9e",
                    },
                ],
                "image": "",
            },
        ],
    }


def clone_data(data: dict) -> dict:
    cloned = deepcopy(data)
    slides = cloned.get("slides", [])

    for i, slide in enumerate(slides):
        if "template_type" not in slide:
            slide["template_type"] = DEFAULT_TEMPLATE_TYPES[i] if i < len(DEFAULT_TEMPLATE_TYPES) else "cover"

    return cloned
