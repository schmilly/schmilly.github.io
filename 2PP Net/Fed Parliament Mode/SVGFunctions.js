var selected = "Grayndler"

//-- SVG Functions --
//
function SetupSVG(Parliament,MapMode,DataYear){
  eval("ParliamentList = Parliament." + DataYear );
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
        //ConsoleLog.innerHTML = (ConsoleLog.innerHTML + "<br>Set Color for " + i)
      }
      else {
        // console.log( i + " already correct color")
      }
    }
    catch {
      ConsoleLog.innerHTML = (ConsoleLog.innerHTML + "<br>Error," + i + " not found")
    }
    try{
      Seat.addEventListener("click",ClickonSeat)
      function ClickonSeat(){ 
        Name = document.getElementById("ElcName")
        eval ("Name.innerText =  ElectorateIDNameArray." + i + " + ' ' + DataYear")
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

        GetElcFirPref(DataYear + "." + i,FirstPrefData.data);
        BarsFirstPref.update();

        try {
          document.getElementById("Map").getElementById(selected).style.opacity=1
          document.getElementById("Parliament").getElementById(selected).style.opacity=1
        }
        catch {
          ConsoleLog.innerHTML = (ConsoleLog.innerHTML + "<br>Error, could not find selected to return to normal opacity:" + selected)
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
      ConsoleLog.innerHTML = (ConsoleLog.innerHTML + "<br>Error adding Seat Interaction listner")
    }
  })
};

function UpdatePollBar(){
  if (CustomSwing){
    ArrayToChartJS(CalcSeatSwing(Swing,DataYear + "." + selected),PredictedPrimData.data)
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
    ConsoleLog.innerHTML = (ConsoleLog.innerHTML + "<br>Please select a poll")
  }

}

function injectParliament(xmlDoc,container2) {
  var svg = $(xmlDoc).find("svg");
  svg.attr("id", "Parliament")
  svg.attr("width","100%")
  svg.attr("height","100%")
  container2.append(svg).append(eval("SetupSVG(ElectorateList,false,DataYear)"));
}

function InjectSVGMap(FileName,Container,MapQ){
  document.getElementById(Container).innerHTML=""
  var svgUrl1    = FileName;
  var container1 = $("#"+ Container);
  if (MapQ){
  $.get(svgUrl1) 
    .then(data => injectMap(data,container1))
  }
  else{
  $.get(svgUrl1) 
    .then(data => injectParliament(data,container1))
  }
}


function injectMap(xmlDoc,container1) {
  var svg = $(xmlDoc).find("svg");
  svg.attr("id", "Map")
  svg.attr("style","overflow:auto;")
  container1.append(svg).append(eval("SetupSVG(ElectorateList,true,DataYear)"));

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

function SetMap(MapFile,SeatFile,MapName,SetData){
  DataYear = SetData

  document.getElementById("container2").innerHTML=""
  InjectSVGMap(SeatFile,"container2",false)
  document.getElementById("container1").innerHTML=""
  InjectSVGMap(MapFile,"container1",true)
  document.getElementById("CurrentMap").innerText=MapName
}
