#!/usr/bin/env python3
"""
Extract Fair Work Commission (FWC) Protected Action Ballot Results from HTML
and generate JavaScript objects for the STRIKE_DATA array in data.js.

Usage:
    python extract_fwc_ballots.py input.html [--start-id 1000]

If no input file, reads from clipboard or a hardcoded HTML string (adjust as needed).
"""

import re
import sys
from pathlib import Path
from bs4 import BeautifulSoup
from slugify import slugify  # optional, else use custom slug

# Default coordinates for unknown locations (centre of Australia)
DEFAULT_LAT = -25.5
DEFAULT_LNG = 134.0

def parse_date(text):
    """Extract date string from text like ' - 8 September 2026'"""
    # Remove leading ' - ' and trailing spaces
    date_str = text.replace(' - ', '').strip()
    # Convert to ISO format (YYYY-MM-DD)
    # Try to parse with datetime
    from datetime import datetime
    for fmt in ("%d %B %Y", "%d %b %Y"):
        try:
            dt = datetime.strptime(date_str, fmt)
            return dt.strftime("%Y-%m-%d")
        except ValueError:
            continue
    # fallback: return original
    return date_str

def extract_entries(html_content):
    """Parse HTML and yield dicts for each list item."""
    soup = BeautifulSoup(html_content, 'html.parser')
    entries = []
    for li in soup.find_all('li'):
        a = li.find('a')
        if not a:
            continue
        # Use title attribute if present, else text
        title_attr = a.get('title', '')
        if title_attr and title_attr.startswith('Open '):
            # Remove 'Open ' and trailing ' in a new tab'
            raw = title_attr.replace('Open ', '').replace(' in a new tab', '')
        else:
            raw = a.get_text(strip=True)
        # The raw string often looks like "Union and Employer"
        # Split on " and " first occurrence.
        # But careful: "AMOU & CFMEU" has & not "and", so we'll handle that.
        # We'll use regex to split on " and " or " & " (but & might be in union name).
        # Simpler: assume pattern "Union and Employer" for most.
        parts = re.split(r'\s+and\s+', raw, maxsplit=1)
        if len(parts) == 2:
            union = parts[0].strip()
            employer = parts[1].strip()
        else:
            # Could be just union (e.g., "CPSU") or union with no employer
            union = raw.strip()
            employer = ''
        # Clean up union/employer: remove trailing "in a new tab" etc
        union = union.replace('Open ', '').replace(' in a new tab', '').strip()
        employer = employer.replace('Open ', '').replace(' in a new tab', '').strip()
        # Date is after the link, e.g., " - 8 September 2026"
        # li text includes link text + date. We can get the whole li text and remove link part.
        full_text = li.get_text(strip=True)
        link_text = a.get_text(strip=True)
        # Remove link text from full text; what remains is likely date
        date_part = full_text.replace(link_text, '', 1).strip()
        # Remove leading '-' and spaces
        date_part = date_part.lstrip('-').strip()
        date_iso = parse_date(date_part) if date_part else ''
        # Get URL
        url = a.get('href', '')
        if not url:
            continue
        # Generate actionId: slug union+employer (lowercase, hyphens)
        action_id = slugify(f"{union}-{employer}") if employer else slugify(union)
        if not action_id:
            action_id = f"entry-{len(entries)}"
        # Determine industry (basic heuristic)
        industry = "Not specified"
        emp_lower = employer.lower()
        if any(kw in emp_lower for kw in ['rail', 'train', 'transdev', 'metro', 'tram']):
            industry = "Rail Transport"
        elif any(kw in emp_lower for kw in ['health', 'hospital', 'care', 'medical', 'imaging']):
            industry = "Healthcare"
        elif any(kw in emp_lower for kw in ['council', 'city of', 'shire']):
            industry = "Local Government"
        elif any(kw in emp_lower for kw in ['construction', 'build', 'contractor', 'engineering', 'infrastructure']):
            industry = "Construction"
        elif any(kw in emp_lower for kw in ['mining', 'coal', 'bhp', 'glencore', 'south32']):
            industry = "Mining"
        elif any(kw in emp_lower for kw in ['ferry', 'port', 'shipping', 'stevedoring']):
            industry = "Maritime"
        elif any(kw in emp_lower for kw in ['education', 'school', 'university', 'college']):
            industry = "Education"
        elif any(kw in emp_lower for kw in ['energy', 'electricity', 'power', 'solar', 'wind']):
            industry = "Energy"
        elif any(kw in emp_lower for kw in ['transport', 'logistics', 'freight', 'bus', 'coach']):
            industry = "Transport / Logistics"
        elif any(kw in emp_lower for kw in ['water', 'sewage', 'utilities']):
            industry = "Utilities"
        elif any(kw in emp_lower for kw in ['manufacturing', 'foods', 'beverage', 'steel', 'packaging']):
            industry = "Manufacturing"
        else:
            industry = "Other"
        entry = {
            "id": None,  # will be assigned later
            "actionId": action_id,
            "title": f"{union} and {employer} - Protected Action Ballot" if employer else f"{union} - Protected Action Ballot",
            "union": union,
            "employer": employer,  # extra field not used in original schema, but keep for reference
            "industry": industry,
            "type": "planned",
            "startDate": date_iso,
            "endDate": "",
            "workers": None,
            "description": "Protected action ballot result from Fair Work Commission. Workers have voted in favour of taking industrial action.",
            "locations": [
                {
                    "city": "Unknown",
                    "state": "",
                    "lat": DEFAULT_LAT,
                    "lng": DEFAULT_LNG,
                    "name": employer if employer else union
                }
            ],
            "sources": [
                {"name": "FWC Ballot Result", "url": url}
            ],
            "tags": [industry.lower().replace(' ', '-'), union.lower().replace(' ', '-'), "fwc-ballot"]
        }
        entries.append(entry)
    return entries

def generate_js(entries, start_id=1000):
    """Generate JavaScript array code for STRIKE_DATA."""
    lines = []
    lines.append("// Auto-generated from FWC ballot results")
    lines.append("const fwcBallotEntries = [")
    for i, entry in enumerate(entries, start=start_id):
        entry["id"] = i
        lines.append("    {")
        lines.append(f"        id: {entry['id']},")
        lines.append(f"        actionId: \"{entry['actionId']}\",")
        lines.append(f"        title: \"{entry['title']}\",")
        lines.append(f"        union: \"{entry['union']}\",")
        # Optionally include employer? Not in schema, so skip.
        lines.append(f"        industry: \"{entry['industry']}\",")
        lines.append(f"        type: \"{entry['type']}\",")
        lines.append(f"        startDate: \"{entry['startDate']}\",")
        lines.append(f"        endDate: \"{entry['endDate']}\",")
        lines.append(f"        workers: {entry['workers'] if entry['workers'] is not None else 'null'},")
        lines.append(f"        description: \"{entry['description']}\",")
        # Locations (one for now)
        loc = entry['locations'][0]
        lines.append("        locations: [")
        lines.append("            {")
        lines.append(f"                city: \"{loc['city']}\",")
        lines.append(f"                state: \"{loc['state']}\",")
        lines.append(f"                lat: {loc['lat']},")
        lines.append(f"                lng: {loc['lng']},")
        lines.append(f"                name: \"{loc['name']}\"")
        lines.append("            }")
        lines.append("        ],")
        # Sources
        src = entry['sources'][0]
        lines.append("        sources: [")
        lines.append("            {")
        lines.append(f"                name: \"{src['name']}\",")
        lines.append(f"                url: \"{src['url']}\"")
        lines.append("            }")
        lines.append("        ],")
        # Tags
        tags_str = ", ".join(f'"{tag}"' for tag in entry['tags'])
        lines.append(f"        tags: [{tags_str}]")
        lines.append("    },")
    lines.append("];")
    return "\n".join(lines)

def main():
    # Get HTML input
    if len(sys.argv) > 1:
        # Read from file
        input_path = Path(sys.argv[1])
        html_content = input_path.read_text(encoding='utf-8')
    else:
        # Default: use a hardcoded string or read from stdin
        print("No input file provided. Paste HTML and press Ctrl+D (or provide filename as argument).")
        html_content = sys.stdin.read()

    if not html_content.strip():
        print("Error: No HTML content provided.")
        sys.exit(1)

    entries = extract_entries(html_content)
    print(f"Extracted {len(entries)} entries.")

    # Optional start id argument
    start_id = 1000
    if '--start-id' in sys.argv:
        idx = sys.argv.index('--start-id')
        if idx + 1 < len(sys.argv):
            start_id = int(sys.argv[idx+1])

    js_code = generate_js(entries, start_id)
    print(js_code)

if __name__ == '__main__':
    main()