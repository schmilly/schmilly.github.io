#!/bin/bash

# Variables
WIKI_URL="https://en.wikipedia.org/wiki/Opinion_polling_for_the_next_Australian_federal_election"
TABLE_ID="nowrap wikitable sortable tpl-blanktable jquery-tablesorter"
CSV_FILE="data.csv"
JS_FILE="../2PP Net/Fed Parliament Mode/Raw_Data.js"
TEMP_JS="temp.js"

# Step 1: Pull a Wikipedia table and convert it to CSV
echo "Fetching Wikipedia table..."
curl -s "$WIKI_URL" |
	grep -oP '(?<=<table).*?(?=</table>)' |
	awk '/id="'$TABLE_ID'"/, /<\/table>/' >temp_table.html

# Use a tool to convert HTML table to CSV
# Assuming you have `htmlq` or `xmlstarlet` installed for processing HTML
# Replace this with your preferred method to extract and format the table
htmlq --attribute href 'table#'$TABLE_ID >"$CSV_FILE"

# Step 2: Check a JS file for the newest entry
echo "Checking newest entry in $JS_FILE..."
NEWEST_ENTRY=$(grep -oP '"[A-Za-z0-9_-]+"(?=:)' "$JS_FILE" | tail -1)

if [ -z "$NEWEST_ENTRY" ]; then
	echo "No entries found in $JS_FILE. Pulling all data."
else
	echo "Newest entry is: $NEWEST_ENTRY"
fi

# Step 3: Filter CSV for entries after the newest data
if [ -n "$NEWEST_ENTRY" ]; then
	echo "Filtering new entries..."
	awk -F',' -v entry="$NEWEST_ENTRY" '$1 > entry' "$CSV_FILE" >filtered.csv
	mv filtered.csv "$CSV_FILE"
fi

# Step 4: Convert CSV to JS using PapaParse
echo "Converting CSV to JS..."
node -e "
const fs = require('fs');
const Papa = require('papaparse');

const csv = fs.readFileSync('$CSV_FILE', 'utf8');
const json = Papa.parse(csv, { header: true }).data;
const jsContent = 'const data = ' + JSON.stringify(json, null, 2) + ';';

fs.writeFileSync('$TEMP_JS', jsContent);
"

# Step 5: Insert JS at the start of the file
echo "Inserting new JS into $JS_FILE..."
sed -i "1s/^/$(cat $TEMP_JS)\n/" "$JS_FILE"

# Cleanup
rm temp_table.html $TEMP_JS

echo "Script completed!"
