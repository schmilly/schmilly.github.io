
var Array_2PP = []

ArrayColours = [PartyColor.Grn+"90",PartyColor.One+"90",PartyColor.UAP+"90",PartyColor.Oth+"90"]

ArrayName = ["Greens","One Nation","United Australia","Other"]


Polsters = ["Essential","Roy Morgan","YouGov","Resolve Strategic","RedBridge Group","Newspoll","Freshwater Strategy","Newspoll-YouGov","Dynata","Election"]


function Custom2PPgenerateChartData(DataSets, Filelist, CustomMode, FlowstoLab){
  if (CustomMode){
    Array_2PP = [];
    var FlowContribution = [[],[],[],[]];
    var electionDate = electionDate
    RawData.forEach((RawValue,index) => {
      LaborPref = Number(RawValue[Location.ALP]) 
      LiberalPref = Number(RawValue[Location.Lib])
      counter = 6
      var PollDateStr = Date.parse(RawData[index][0].split('–')[1])
      var Polldate = new Date(PollDateStr)
      var timediff = Polldate.getTime() - electionDate.getTime()
      var Day= timediff / (1000 * 60 * 60 * 24)

      FlowstoLab.forEach((Value) => {
        if (isNaN(RawValue[counter])){ ConsoleLog.innerHTML = (ConsoleLog.innerHTML + "<br>Invalid Value")}
        else {
        LaborPref = Number(LaborPref) + Number(RawValue[counter]*Value)
        LiberalPref = Number(LiberalPref) + Number(RawValue[counter]*(1-Value))
        FlowContribution[counter-6].push([Day,(RawValue[counter]*Value-RawValue[counter]*(1-Value))/100])
        }
        counter = counter+1
      })
      Result = LaborPref-LiberalPref
      Array_2PP.push([Day,Result/100]); 
    });
    DataSets.push(createDataSets(Array_2PP, "Custom 2PP Array"));
    DataSets.push(createMean(Array_2PP,"Custom 2PP Rolling Avrg."));
    FlowContribution.forEach((element,index)=> {
      DataSets.push(createbar(element,ArrayName[index],ArrayColours[index]))
    });

  }
  else{
    Array_2PP = [];
    var electionDate = ElectionDate
    RawData.forEach((Value,index) => {
      Result = Number(RawData[index][Location.ALP2PP])-Number(RawData[index][Location.Lib2PP])
      var PollDateStr = RawData[index][0]
      var Polldate = new Date(PollDateStr)
      var timediff = Polldate.getTime() - electionDate.getTime()
      Array_2PP.push([timediff / (1000 * 60 * 60 * 24),Number(Result)/100]); 
    });
    DataSets.push(createDataSets(Array_2PP, "2PP Array"));
    DataSets.push(createMean(Array_2PP,"2PP Rolling Avrg."))
  }
 
  return DataSets
}

function ChartDataCreate(DataSets) {
  return ChartData = {
    data: {
      datasets: DataSets,
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {

            label: function(context) {
              let label = "Date " || '';

              if (label) {
                label += ': ';
              }
              if (context.parsed.x !== null) {
                tickDate = new Date(ElectionDateStr);
                tickDate.setDate(tickDate.getDate() + context.parsed.x)
                label += tickDate.toLocaleDateString();
              }
              if (context.parsed.y !== null){
                label += ", Net 2PP: " + context.parsed.y + "%"
              }
              return label;
            }
          }
        }, 
        annotation: {
          annotations: {
            line1: {
              // Indicates the type of annotation
              type: 'line',
              yMin: 0,
              yMax: 0,
              borderColor: '#C2C7D0',
              borderWidth: 1.25,
              opacity: 0.5,
            }
          }
        },
        legend: {
          postition: 'bottom',
        },
      },
      maintainAspectRatio: false,
      scales : {
        y: {
          grid:{
            color:"#747474"
          },
          ticks:{
            callback: function(value, index) {
              return Math.round(value) + "%";
            },
          }, 
          title: {
            display: true,
            text: "Net 2 Party Preffered (% +/-)" 
          },
        },
        x: {
          min: 0,
          grid:{
            color:"#747474"
          },
          ticks:{
            callback: function(value, index, ticks) {
              tickDate = new Date(ElectionDateStr);
              tickDate.setDate(tickDate.getDate() + value)
              return tickDate.toLocaleDateString();
            },
            major:{
              enabled: true,
            },
          },
          title: {
            display: true,
            text: "Date (DD/MM/YYYY)"
          }
        }
      }
    }
  }
};



