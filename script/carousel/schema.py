from __future__ import annotations

from copy import deepcopy
from pathlib import Path


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
                "section_kicker": "Pourquoi maintenant",
                "section_title": "Un signal visuel simple",
                "image": fallback_2,
                "caption": "Exemple terrain",
                "paragraph": "Ce visuel illustre un cas concret. Le paragraphe est optionnel et peut être masqué si vous voulez une slide plus minimaliste.",
                "show_paragraph": True,
            },
            {
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
    return deepcopy(data)
