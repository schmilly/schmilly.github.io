# Schmilly's personal website

PLEASE SEND ANY ISSUES, OR CONTACT QUERIES to: schmilly@proton.me

My personal web page, couple different projects under this. 

See below for explanations of Each of them

## Australia Net 2PP Chart

Started out as a chart to show net 2PP in polls and their changes over times
Currently a work in progress with a lot of feature creep.

[Parliament Mode:](https://schmilly.github.io/2PP%20Net/Parliament%20Mode/Parliament.html)
Work in progress, currently shows seat by seat level Primary vote; Along with also allowing setting custom pref flows for polling data from 2022 and see resulting 2PP trends. Plans to implement ability to simulate flows and changes calculated from 2022 -> Poll in invidual seats as well to render flows and changes in Parliament map.

##### Known Bugs/Issues:
[comment]: <> (StartParlBug)
- [X] *Many* Spelling mistakes - thanks to @hindsight_apple on Twitter for pointing out the issues (https://twitter.com/hindsight_apple/status/1792376323551408563)
- [ ] Sometimes when calculating seat vote based certain polls can lead to negative values for other vote
      - Example Canberra Electorate with 25/08/2022 Roy Morgan Poll leas to a negative other count and breaks chart
- [ ] Render Poll to Parliament button doesn't work
- [ ] Can't Reset 2PP Chart Zoom
- [ ] Unchecking consolidation doesn't actually stop it from consolidating other vote
[comment]: <> (EndParlBug)

##### Planned features and further support:
- [ ] Re-implement ability to view 2PP from multiple different terms
  - [ ] Show just rolling averages or remove year with one click instead of two in both basic and advance mode.
  - [ ] Ability to filter out pollsters in Advance Mode - i.e. show only Roy Morgan or News Polls polls
- [ ] Add Parliamentary map and seats based calculation, with changes in primary vote reflected in Parliament
  - [X] Implementation of Seat level swings based on Poll
  - [X] Added Geographic and Seating based map
  - [X] Add abilitiy to calculate winner of Seat Based on Prefrences flows
      - [ ] Fix bugs with this
  - [X] Implementation of Parliament wide swings and rendering of such based on Poll
      - [X] Provide Seat Count of Parliament based on such swings.
      - [ ] Show with Coaliton/ALP Results properly
- [X] Add abillity to Auto Pull Polling Data from Wikipedia on load or via script and convert to JS format as required.
      - [ ] Setup a server to auto pull and pload such data
      
