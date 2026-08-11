from __future__ import annotations

import json
import re
from pathlib import Path

from docx import Document

SOURCE = Path("/workspace/scratch/858138f18641")
OUTPUT = Path(__file__).resolve().parents[1] / "data" / "readers.json"
PERSIAN_TO_ASCII = str.maketrans("۰۱۲۳۴۵۶۷۸۹", "0123456789")
NUMBERED_LINE = re.compile(r"^([۰-۹]{2,3}٫[۰-۹]{2})\s+(.+)$")
WEEK_LINE = re.compile(r"^هفتهٔ\s+([۰-۹]+)$")
TEACHER_WEEK = re.compile(r"^WEEK\s+(\d+)$")

READERS = [
    ("zal-rudabeh", "شاهنامه", "داستان زال و رودابه", "Zal and Rudabeh", "Shahnameh_Full_Zal_Rudabeh_Farsi_Student.docx", "Shahnameh_Full_Zal_Rudabeh_Teacher.docx"),
    ("haft-khan-rostam", "شاهنامه", "هفت‌خوان رستم", "Rostam’s Seven Labors", "Shahnameh_Full_Haft_Khan_Rostam_Farsi_Student.docx", "Shahnameh_Full_Haft_Khan_Rostam_Teacher.docx"),
    ("rostam-sohrab", "شاهنامه", "داستان رستم و سهراب", "Rostam and Sohrab", "Shahnameh_Full_Rostam_Sohrab_Farsi_Student.docx", "Shahnameh_Full_Rostam_Sohrab_Teacher.docx"),
    ("siyavash", "شاهنامه", "داستان سیاوش", "The Story of Siyavash", "Shahnameh_Full_Siyavash_Farsi_Student.docx", "Shahnameh_Full_Siyavash_Teacher.docx"),
    ("bijan-maniezh", "شاهنامه", "داستان بیژن و منیژه", "Bijan and Manijeh", "Shahnameh_Full_Bijan_Maniezh_Farsi_Student.docx", "Shahnameh_Full_Bijan_Maniezh_Teacher.docx"),
    ("haft-khan-esfandiyar", "شاهنامه", "هفت‌خوان اسفندیار", "Esfandiyar’s Seven Labors", "Shahnameh_Full_Haft_Khan_Esfandiyar_Farsi_Student.docx", "Shahnameh_Full_Haft_Khan_Esfandiyar_Teacher.docx"),
    ("rostam-esfandiyar", "شاهنامه", "داستان رستم و اسفندیار", "Rostam and Esfandiyar", "Shahnameh_Full_Rostam_Esfandiyar_Farsi_Student.docx", "Shahnameh_Full_Rostam_Esfandiyar_Teacher.docx"),
    ("rostam-shaghad", "شاهنامه", "داستان رستم و شغاد", "Rostam and Shaghad", "Shahnameh_Full_Rostam_Shaghad_Farsi_Student.docx", "Shahnameh_Full_Rostam_Shaghad_Teacher.docx"),
    ("classical-poetry", "شعر", "گزیدهٔ شعرِ فارسی", "Hafez, Rumi, Saadi, and Khayyam", "Persian_Classical_Poetry_Companion_Farsi_Student.docx", "Persian_Classical_Poetry_Companion_Teacher.docx"),
    ("golestan", "نثر", "گلستان: حکایت‌های برگزیده", "Golestan: Selected Stories", "Golestan_Selected_Stories_Farsi_Student_Reader.docx", "Golestan_Selected_Stories_Teacher_Reader.docx"),
]


def doc_paragraphs(path: Path) -> list[str]:
    return [paragraph.text.strip() for paragraph in Document(path).paragraphs if paragraph.text.strip()]


def student_weeks(path: Path) -> list[dict]:
    weeks: list[dict] = []
    current: dict | None = None
    metadata_count = 0
    for value in doc_paragraphs(path):
        found_week = WEEK_LINE.match(value)
        if found_week:
            current = {"number": int(found_week.group(1).translate(PERSIAN_TO_ASCII)), "title_fa": "", "section_fa": "", "lines": [], "vocab": [], "note": ""}
            weeks.append(current)
            metadata_count = 0
            continue
        if not current:
            continue
        found_line = NUMBERED_LINE.match(value)
        if found_line:
            current["lines"].append({"id": found_line.group(1), "text": found_line.group(2), "gloss": ""})
            continue
        if not current["lines"]:
            if metadata_count == 0:
                current["title_fa"] = value
            elif metadata_count == 1:
                current["section_fa"] = value
            metadata_count += 1
    return weeks


def teacher_weeks(path: Path) -> dict[int, dict]:
    weeks: dict[int, dict] = {}
    current: dict | None = None
    pending_line: dict | None = None
    in_vocab = False
    for value in doc_paragraphs(path):
        found_week = TEACHER_WEEK.match(value)
        if found_week:
            current = {"lines": [], "vocab": [], "note": ""}
            weeks[int(found_week.group(1))] = current
            pending_line = None
            in_vocab = False
            continue
        if not current:
            continue
        found_line = NUMBERED_LINE.match(value)
        if found_line:
            pending_line = {"id": found_line.group(1), "gloss": ""}
            current["lines"].append(pending_line)
            in_vocab = False
            continue
        if value == "Vocabulary and older usage":
            in_vocab, pending_line = True, None
            continue
        if value.startswith("Teaching note:"):
            current["note"] = value.replace("Teaching note:", "").strip()
            in_vocab, pending_line = False, None
            continue
        if pending_line:
            pending_line["gloss"] = value
            pending_line = None
        elif in_vocab:
            current["vocab"].append(value)
    return weeks


def main() -> None:
    readers = []
    for slug, category, title_fa, title_en, student, teacher in READERS:
        weeks = student_weeks(SOURCE / student)
        guidance = teacher_weeks(SOURCE / teacher)
        for week in weeks:
            current = guidance.get(week["number"], {})
            for source_line, guide_line in zip(week["lines"], current.get("lines", [])):
                source_line["gloss"] = guide_line.get("gloss", "")
            week["vocab"] = current.get("vocab", [])
            week["note"] = current.get("note", "")
        readers.append({"slug": slug, "category": category, "title_fa": title_fa, "title_en": title_en, "student": student, "teacher": teacher, "weeks": weeks})
    OUTPUT.write_text(json.dumps({"readers": readers}, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")


if __name__ == "__main__":
    main()
