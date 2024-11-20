import pandas as pd
import requests
import re
from bs4 import BeautifulSoup
from datetime import *

LastEntry = datetime(2024, 10, 6)
wikiurl = 'https://en.wikipedia.org/wiki/Opinion_polling_for_the_next_Australian_federal_election'
table_class = "wikitable sortable jquery-tablesorter"
response = requests.get(wikiurl)


# 200

soup = BeautifulSoup(response.text, 'html.parser')
cities = soup.find_all('table', {"class": "wikitable", "class": "sortable"})


# <table class="wikitable sortable">
# <tbody><tr>
# <th>Name of Town
# </th>
# <th>State
# ....

tables = pd.read_html(str(cities[0]))


PyTable = tables[0].to_numpy()

#Clean Program
for x in PyTable:
    #Get just the last date
    EndString = x[0].split("–")
    x[0] = EndString[-1]

    #Remove citations marks
    x[1] = re.sub("\[.*]","",x[1])

    Counter = 9
    #Remove % and replace blank entries with 0
    for Num in range(Counter):
        CurrentEntry = x[4+Num] 
        CurrentEntry = re.sub("—","0",CurrentEntry)
        CurrentEntry = re.sub("%","",CurrentEntry)
        x[4+Num] = CurrentEntry

#Output in JS format
for y in PyTable:
    if (datetime.strptime(y[0],"%d %B %Y") < LastEntry):
        break 
    print("[")
    for x in y:
        print('"'+ x + '",')
    print("],")
