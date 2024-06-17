var selected = ""


//-- SVG Functions --
//
function SetSeatColor(ParliamentList,MapMode){
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

      GetElcFirPref(i,FirstPrefData.data);
      BarsFirstPref.update();

      try {
      document.getElementById("Map").getElementById(selected).style.opacity=1
      document.getElementById("Parliament").getElementById(selected).style.opacity=1
      }
      catch {}
      selected = i;
      var MapObject = document.getElementById("Map").getElementById(i)
      MapObject.style.opacity=0.5
      MapObject.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
      document.documentElement.scrollTop = 0;

      document.getElementById("Parliament").getElementById(i).style.opacity=0.5
    }
    }
    catch{

    }
  })
};

var svgUrl2    = "Australian_House_of_Representatives_chart.svg";
var container2 = $("#container2");
$.get(svgUrl2) 
  .then(injectParliament)

function injectParliament(xmlDoc) {
  var svg = $(xmlDoc).find("svg");
  svg.attr("id", "Parliament")
  svg.attr("width","100%")
  svg.attr("height","100%")
  svg.attr("onload","SetSeatColor(ElectorateList,false)")
  container2.append(svg);
}



var svgUrl1    = "Australian_electoral_divisions,_blank_map_(2022).svg";
var container1 = $("#container1");
$.get(svgUrl1) 
  .then(injectMap)

function injectMap(xmlDoc) {
  var svg = $(xmlDoc).find("svg");
  svg.attr("id", "Map")
  svg.attr("style","overflow:auto;")
  svg.attr("onload","SetSeatColor(ElectorateList,true)")

  container1.append(svg);

}

//Taken from Satckoverflow
// https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

//--Seat Functions--
//
function InitalDataFirstPRef(){
  return {
    labels: [""],
    datasets: [
      {
        label: 'No Data',
        data: [100],
        borderColor: 'Gray',
        backgroundColor: 'Gray'
      }
    ]
  }
}

function CreateHorConfig(){
  return {
    type: 'bar',
    data: InitalDataFirstPRef(),
    options: {
      layout : {
        padding: 0
      },
      indexAxis: 'y',
      maintainAspectRatio: false,
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
          text: ''
        }
      },
      scales: {
        x: {
          ticks: {
            display: false
          },
          stacked: true,
          max:100
        },
        y: {
          stacked: true,
          max:100,
        },
      },
    },
  };
}

function GetElcFirPref(ElcID,Data){
  eval("Value = FirstPref." + ElcID)
  var othervote = 0.00;
  var postionInArray = 0
  Object.entries(Value).forEach((element) => {
    eval("SetPartyName = PartyNameArray." + element[0])
    if (SetPartyName != undefined){
      eval("PartyColored = PartyColor."+ element[0])

      Data.datasets[postionInArray] = {
        label: SetPartyName,
        data: [element[1]],
        backgroundColor: PartyColored
      }
      postionInArray = postionInArray + 1

    }
    else{
      console.log("Couldn't find Party with ID " + element[0])
      console.log("Adding votes of "+ element[1] +  " to other vote")
      othervote = othervote + element[1]
    }
  });

  Data.datasets[postionInArray] = {
    label: "Other",
    data: [othervote],
    backgroundColor: PartyColor.Oth
  }
  postionInArray = postionInArray + 1

  while(Data.datasets.length > postionInArray){
    Data.datasets.pop();
  }
  return Data;
}

//function UpdateFirPrefChart(ElcID,Data){
//  for (let i = 0; i < Bars2PP.data.datasets.length; i++){
//    Bars2PP.data.datasets[]
//  }
//}

SmoothCircle.onclick = PollClick; 

function PollClick(click){
  //console.log(click)
  try{
    const points = mixedChart.getElementsAtEventForMode(click,'nearest'
    , { intersect: true}, false)
    if (points[0].datasetIndex != 0){throw new Error("Click on undefined average 2PP")}
    ClickonPoll = RawData[points[0].index];
    //console.log(RawData[points[0].index])
    

    PartyPref = ClickonPoll[11]-ClickonPoll[12]
    document.getElementById("SelectPollDate").innerText = ClickonPoll[0]
    document.getElementById("PllPollster").innerText = ClickonPoll[1]  
    //document.getElementById("PllPrimaryVote").innerText = ClickonPoll[2]
    if (TwoPPBool){
      document.getElementById("Pll2PP").innerText = points[0].element.$context.raw.y.toFixed(2) + "%"; 
    }
    else{document.getElementById("Pll2PP").innerText = PartyPref.toFixed(2) + "%";}

    getPollPrimVote(ClickonPoll,PollBarFirstPref.data);
    PollBarFirstPref.update()
    
    SelectedPoll = ClickonPoll
    SelectedPollPos = points[0].index
  }
  catch{
    console.log("Error; Please click on a Poll data point")
  }
}



function getPollPrimVote(RawDataEntry,Data){
  var postionInArray = 0
  RawDataEntry.forEach((element,index) => {
      PartyID = RawDataHeaderID[index]
      if (PartyID != "N/A"){
        eval("SetPartyName = PartyNameArray." + PartyID)
        if (SetPartyName != undefined){
          eval("PartyColored = PartyColor."+ PartyID)
          Data.datasets[postionInArray] = {
            label: SetPartyName,
            data: [element],
            backgroundColor: PartyColored
          }
          postionInArray = postionInArray + 1
        }
        else{
          console.log("Couldn't find Party with ID " + PartyID)
        }
      }  
  })
  while(Data.datasets.length > postionInArray){
    Data.datasets.pop();
  }
  console.log(Data)
  return Data;
}


function RenderParliment(){
  document.getElementById("disclaimertext").innerText = "\nThanks for tying this, unforutnatly my ass yet to get this to work so uhh; will be done eventually"

}
