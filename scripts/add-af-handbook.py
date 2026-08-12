from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

from docx import Document


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "readers.json"
DOWNLOADS = ROOT / "public" / "downloads"
STUDENT = "AFH1_2025_Farsi_Student_Study_Handbook.docx"
TEACHER = "AFH1_2025_Farsi_English_Teacher_Handbook.docx"
SLUG = "afh1-2025"

PERSIAN_TO_ASCII = str.maketrans("۰۱۲۳۴۵۶۷۸۹", "0123456789")
ASCII_TO_PERSIAN = str.maketrans("0123456789", "۰۱۲۳۴۵۶۷۸۹")
WEEK = re.compile(r"^هفته[ٔ\s]+([۰-۹0-9]+)\s*\|\s*صفحه[ٔ\s]+منبع:\s*([۰-۹0-9]+)")
NUMBERED = re.compile(r"^([۰-۹0-9]{3})[٫.]([۰-۹0-9]{2})\s+(.+)$")


def paragraphs(filename: str) -> list[str]:
    document = Document(DOWNLOADS / filename)
    return [" ".join(paragraph.text.split()) for paragraph in document.paragraphs if paragraph.text.strip()]


def number(value: str) -> int:
    return int(value.translate(PERSIAN_TO_ASCII))


def display_id(left: str, right: str) -> str:
    return f"{left.translate(ASCII_TO_PERSIAN)}٫{right.translate(ASCII_TO_PERSIAN)}"


def key_id(left: str, right: str) -> str:
    return f"{left.translate(PERSIAN_TO_ASCII)}.{right.translate(PERSIAN_TO_ASCII)}"


def normalize_farsi(value: str) -> str:
    text = unicodedata.normalize("NFC", value)
    text = text.replace("ي", "ی").replace("ى", "ی").replace("ك", "ک").replace("ۀ", "هٔ")
    text = re.sub(r"[\u064b-\u0653\u0655-\u065f\u0670]", "", text)
    text = re.sub(r"\s+([،؛؟!])", r"\1", text)
    return re.sub(r" {2,}", " ", text).strip()


def teacher_glosses() -> dict[tuple[int, str], str]:
    result: dict[tuple[int, str], str] = {}
    current_week: int | None = None
    values = paragraphs(TEACHER)
    for index, value in enumerate(values):
        found_week = WEEK.match(value)
        if found_week:
            current_week = number(found_week.group(1))
            continue
        found_line = NUMBERED.match(value)
        if current_week is None or not found_line or index + 1 >= len(values):
            continue
        following = values[index + 1]
        if WEEK.match(following) or NUMBERED.match(following):
            continue
        result[(current_week, key_id(found_line.group(1), found_line.group(2)))] = following
    return result


def handbook_reader() -> dict:
    glosses = teacher_glosses()
    weeks: list[dict] = []
    current: dict | None = None

    for value in paragraphs(STUDENT):
        found_week = WEEK.match(value)
        if found_week:
            week_number = number(found_week.group(1))
            source_page = number(found_week.group(2))
            current = {
                "number": week_number,
                "title_fa": "راهنمای مطالعهٔ AFH 1",
                "section_fa": f"صفحهٔ {str(source_page).translate(ASCII_TO_PERSIAN)} از متن منبع",
                "lines": [],
                "vocab": [],
                "note": "The English shown sentence by sentence is the authoritative source text supplied in the teacher handbook.",
            }
            weeks.append(current)
            continue

        if current is None:
            continue

        found_line = NUMBERED.match(value)
        if found_line:
            identity = key_id(found_line.group(1), found_line.group(2))
            current["lines"].append({
                "id": display_id(found_line.group(1), found_line.group(2)),
                "text": normalize_farsi(found_line.group(3)),
                "gloss": glosses.get((current["number"], identity), ""),
            })
            continue

        current["lines"].append({"id": "", "text": normalize_farsi(value), "gloss": "", "kind": "heading"})

    return {
        "slug": SLUG,
        "category": "راهنمای AFH",
        "title_fa": "راهنمای مطالعهٔ AFH 1",
        "title_en": "Air Force Handbook 1 (2025)",
        "student": STUDENT,
        "teacher": TEACHER,
        "weeks": weeks,
    }


def main() -> None:
    payload = json.loads(DATA.read_text(encoding="utf-8"))
    payload["readers"] = [reader for reader in payload["readers"] if reader["slug"] != SLUG]
    payload["readers"].insert(0, handbook_reader())
    DATA.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    handbook = payload["readers"][0]
    entries = sum(len(week["lines"]) for week in handbook["weeks"])
    print(f"Added AFH reader with {len(handbook['weeks'])} sections and {entries} readable entries.")


if __name__ == "__main__":
    main()
