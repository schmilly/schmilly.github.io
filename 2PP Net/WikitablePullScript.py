import pandas as pd
import requests
import sys
import re
from bs4 import BeautifulSoup
from datetime import *

LastEntry = datetime(2022, 1, 1)
wikiurl = 'https://en.wikipedia.org/wiki/Opinion_polling_for_the_next_Australian_federal_election'
table_class = "wikitable sortable jquery-tablesorter"
Read_File = False

if len(sys.argv) >= 2:
    file_location = sys.argv[1]
    Read_File = True
#Only Argument python program

response = requests.get(wikiurl)


# 200

soup = BeautifulSoup(response.text, 'html.parser')
polls = soup.find_all('table', {"class": "wikitable", "class": "sortable"})


# <table class="wikitable sortable">
# <tbody><tr>
# <th>Name of Town
# </th>
# <th>State
# ....

tables = pd.read_html(str(polls[0]))

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

if(Read_File):
    with open(file_location,'r') as file:
        RawData = file.read().split('"',2)
    NewestDate = RawData[1]
    LastEntry = datetime.strptime(NewestDate,"%d %B %Y")

#Output in JS format
print("const RawData = [")
for y in PyTable:
    try:
        if (datetime.strptime(y[0],"%d %B %Y") <= LastEntry):
            break 
    except:
        print("invalid date (oh well)")
    print("[")
    for x in y:
        print('"'+ str(x) + '",')
    print("] ,")

#2PP.html setup
