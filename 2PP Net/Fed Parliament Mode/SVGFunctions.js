var selected = "Grayndler"
DataYear = "M2024"

//-- SVG Functions --
//
function SetupSVG(ParliamentList,MapMode,DataYear){
  ParliamentList.forEach((i) => {
    if (MapMode){
      //Loop to wait for document to load
      var Seat = document.getElementById("Map").getElementById(i)
    }
    else {
      var Seat = document.getElementById("Parliament").getElementById(i)
    }
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
    try{
      Seat.addEventListener("click",ClickonSeat)
      CombinedName = DataYear + "." + i
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

        GetElcFirPref(CombinedName,FirstPrefData.data);
        BarsFirstPref.update();

        try {
          document.getElementById("Map").getElementById(selected).style.opacity=1
          document.getElementById("Parliament").getElementById(selected).style.opacity=1
        }
        catch {
          console.log("Error, could not find selected to return to normal opacity:" + selected)
        }
        selected = i;
        var MapObject = document.getElementById("Map").getElementById(i)
        MapObject.style.opacity=0.5

        currentScroll = document.documentElement.scrollTop
        MapObject.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
        document.documentElement.scrollTop = currentScroll;

        document.getElementById("Parliament").getElementById(i).style.opacity=0.5

        UpdatePollBar(); 
      }
    }
    catch{
      console.log("Error adding Seat Interaction listner")
    }
  })
};

function UpdatePollBar(){
  if (CustomSwing){
    ArrayToChartJS(CalcSeatSwing(Swing,selected),PredictedPrimData.data)
    BarPredictedPref.update();
    SimulatePrefChart(selected);
  }
  else if (SelectedPollPos != undefined){
    ArrayToChartJS(CalculateSeatPrim(
      RawData[SelectedPollPos],
      RawData[RawData.length-1],
      selected),PredictedPrimData.data)
    BarPredictedPref.update();
    SimulatePrefChart(selected);
  }
  else{
    console.log("Please select a poll")
  }

}

var svgUrl2    = "Australian_House_of_Representatives_chart.svg";
var container2 = $("#container2");
$.get(svgUrl2) 
  .then(injectParliament)

function injectParliament(xmlDoc) {
  var svg = $(xmlDoc).find("svg");
  svg.attr("id", "Parliament")
  svg.attr("width","100%")
  svg.attr("height","100%")
  svg.attr("onload","SetupSVG(ElectorateList,false,DataYear)")
  container2.append(svg);
}

InjectSVGMap("Australian_electoral_divisions,_blank_map_(2022).svg")

function InjectSVGMap(FileName){
  document.getElementById("container1").innerHTML=""
  var svgUrl1    = FileName;
  var container1 = $("#container1");
  $.get(svgUrl1) 
    .then(data => injectMap(data,container1))
}


function injectMap(xmlDoc,container1) {
  var svg = $(xmlDoc).find("svg");
  svg.attr("id", "Map")
  svg.attr("style","overflow:auto;")
  svg.attr("onload","SetupSVG(ElectorateList,true,DataYear)")
  container1.append(svg);
}

//Map Zoom
Scale = 1
function MapZoom(ZoomIn){
    Var = ""
    if (ZoomIn ==1 ){
        Scale = Scale + 0.2
    }
    if (ZoomIn == 0){
        Scale = Scale - 0.2
    }
    if (ZoomIn == -1){
      Scale =  1
    }
    if (Scale < 0.6){
        Scale = 0.6
    }
    if (Scale > 1){
      Scale = 1
    }
    Var = "scale("  + (Scale) + ")"
    SVGMap = document.getElementById("Map")
    SVGMap.style.transform = Var
    return 0;
}

function SetMap(File,MapName,SetData){
  DataYear = SetData
  document.getElementById("container1").innerHTML=""
  InjectSVGMap(File)
  document.getElementById("CurrentMap").innerText=MapName
}
