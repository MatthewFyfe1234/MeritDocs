"""Reads .xlsx workbooks with the standard library alone: an .xlsx file is a zip of XML sheets.

workbook(path)   (the sheet names, rows), rows(name) giving a sheet's rows as lists of cell values
                 (strings, or None for an empty cell)
"""

import re
import zipfile
import xml.etree.ElementTree as ET

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships"}


def column(ref):
    """A cell reference's column, from 0: "A1" 0, "C7" 2, "AA3" 26."""
    n = 0
    for ch in re.match(r"[A-Z]+", ref).group():
        n = n * 26 + ord(ch) - 64
    return n - 1


def workbook(path):
    z = zipfile.ZipFile(path)
    shared = []
    if "xl/sharedStrings.xml" in z.namelist():
        for si in ET.fromstring(z.read("xl/sharedStrings.xml")).findall("m:si", NS):
            shared.append("".join(t.text or "" for t in si.iter("{%s}t" % NS["m"])))
    book = ET.fromstring(z.read("xl/workbook.xml"))
    target = {r.get("Id"): r.get("Target") for r in ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))}
    sheets = {s.get("name"): "xl/" + target[s.get("{%s}id" % NS["r"])].lstrip("/").replace("xl/", "")
              for s in book.find("m:sheets", NS)}

    def rows(name):
        out = []
        for row in ET.fromstring(z.read(sheets[name])).iter("{%s}row" % NS["m"]):
            cells = {}
            for c in row.findall("m:c", NS):
                v = c.find("m:v", NS)
                if c.get("t") == "s" and v is not None:
                    value = shared[int(v.text)]
                elif c.get("t") == "inlineStr":
                    value = "".join(x.text or "" for x in c.iter("{%s}t" % NS["m"]))
                else:
                    value = v.text if v is not None else None
                cells[column(c.get("r"))] = value
            if cells:
                out.append([cells.get(k) for k in range(max(cells) + 1)])
        return out

    return list(sheets), rows
