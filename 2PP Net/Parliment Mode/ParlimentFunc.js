
//-- SVG Functions --
//
function SetSeatColor(ParlimentList){
  ParlimentList.forEach((i) => {
    var Seat = document.getElementById(i)
    eval("PartyID = Currentelectorateparty." + i)
    eval("SeatColor = PartyColor." + PartyID)
    try {
      if (rgb2hex(Seat.style.fill) != SeatColor.toLowerCase()){
        Seat.style.fill = SeatColor;
        //console.log("Set Color for " + i)
      }
      else {
        // console.log( i + " already correct color")
      }
    }
    catch {
      console.log("Error," + i + " not found")
    }
    Seat.addEventListener("click",ClickonSeat)
    function ClickonSeat(){
      Name = document.getElementById("ElcName")
      eval ("Name.innerText =  ElectorateIDNameArray." + i)
      MPName = document.getElementById("ElcMoP")
      eval ("MPName.innerText = MPArray." + i)
      PartyName = document.getElementById("ElcPrty")
      PartyIcon = document.getElementById("ElcPrtyIcon")
      eval ("ElcPartyID = Currentelectorateparty." + i)
      eval("PartyName.innerText = PartyNameArray." + ElcPartyID)
      eval("PartyIcon.style.color = PartyColor." + ElcPartyID)
      LocName = document.getElementById("ElcState")
      eval("LocID = ElcLocation." + i)
      eval("LocName.innerText = StateIDArray." + LocID)
      primaryvote = document.getElementById("primvote")
      primaryvote.innerHTML = GetElcFirPref(i);
    }
  })
};

var svgUrl    = "./Australian_House_of_Representatives_chart.svg";
var container = $("#container");
$.get(svgUrl) 
  .then(injectSvg)

function injectSvg(xmlDoc) {
  var svg = $(xmlDoc).find("svg");
  container.append(svg);
  svg.attr("id", "test")
  svg.attr("height","")
  svg.attr("width","100%")
  svg.attr("onload","SetSeatColor(ElectorateList)")
  loaded = true;
}

//Taken from Satckoverflow
// https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

//--Seat Functions--

function GetElcFirPref(ElcID){
  eval("Value = FirstPref." + ElcID)
  var othervote = 0.00;
  var finalString = ""
  Object.entries(Value).forEach(element => {
    eval("SetPartyName = PartyNameArray." + element[0])
    if (SetPartyName != undefined){
      eval("PartyColored = PartyColor."+ element[0])
      finalString = finalString + "Party: <text style='color:"+ PartyColored + "'>■</text><b> " + SetPartyName + "</b> Got <b>" + element[1] + "%</b> of votes <br>"
    }
    else{
      console.log("Couldn't find Party with IO " + element[0])
      console.log("Adding votes of "+ element[1] +  " to other vote")
      othervote = othervote + element[1]
    }
  });
  finalString = finalString + "Other vote total is: " + othervote + "%"
  return finalString 
}
