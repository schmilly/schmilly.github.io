

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
    }
    else{
      SetPartyName = element[0]
      PartyColored = PartyColor.Oth
    }
    if (PartyColored == undefined){
        PartyColored = PartyColor.Oth
    }

      Data.datasets[postionInArray] = {
        label: SetPartyName,
        data: [element[1]],
        backgroundColor: PartyColored
      }
      postionInArray = postionInArray + 1
  });

  while(Data.datasets.length > postionInArray){
    Data.datasets.pop();
  }
  return Data;
}

function ShowVote(obj) {
  steps = document.getElementById("PrefHistory")
  if($(obj).is(":checked")){
    steps.style = "width: 100%;left: 0;"
  }else{
    steps.style = ""
  } 
}

