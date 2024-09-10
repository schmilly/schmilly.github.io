
fileURL = '/README.md'

fetch(fileURL)
   .then( r => r.text() )
   .then( t => InsertBugs(t) )

function InsertBugs(BugText){
  BugsAft = BugText.split("[comment]: <> (StartParlBug)")
  Bugs = BugsAft[1].split("[comment]: <> (EndParlBug)")
	var converter = new showdown.Converter();
  HTMLInsert = converter.makeHtml(Bugs[0])
  document.getElementById("BugReportText").innerHTML = HTMLInsert }

