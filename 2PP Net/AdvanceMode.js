
var Array_2PP = []

ArrayColours = [PartyColor.Grn+"90",PartyColor.One+"90",PartyColor.UAP+"90",PartyColor.Oth+"90"]

ArrayName = ["Greens","One Nation","United Australia","Other"]

function Custom2PPgenerateChartData(DataSets, Filelist, CustomMode, FlowstoLab){
  if (CustomMode){
    Array_2PP = [];
    var FlowContribution = [[],[],[],[]];
    var electionDate = new Date("21-May-2022")
    RawData.forEach((RawValue,index) => {
      LaborPref = Number(RawValue[5]) 
      LiberalPref = Number(RawValue[4])
      counter = 6
      var PollDateStr = Date.parse(RawData[index][0].split('–')[1])
      var Polldate = new Date(PollDateStr)
      var timediff = Polldate.getTime() - electionDate.getTime()
      var Day= timediff / (1000 * 60 * 60 * 24)

      FlowstoLab.forEach((Value) => {
        if (isNaN(RawValue[counter])){ console.log("Invalid Value")}
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
    var electionDate = new Date("21-May-2022")
    RawData.forEach((Value,index) => {
      Result = Number(RawData[index][11])-Number(RawData[index][12])
      var PollDateStr = Date.parse(RawData[index][0].split('–')[1])
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
           zoom: {
            pan: {
              enabled: true,
              modifierKey: 'ctrl'
            },
            limits: {
              x: {
                min: 0,
                max: 1112
              }
            },
            zoom: { 
              wheel: {  enabled: true, },
              pinch: { enabled: true  },
              mode: 'xy',
              }
            },
          annotation: {
            annotations: {
              line1: {
              // Indicates the type of annotation
                type: 'line',
                yMin: 0,
                yMax: 0,
                borderColor: 'rgb(255, 255, 255)',
                borderWidth: 2,
                }
              }
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
              max: 1112,
              grid:{
                color:"#747474"
              },
              ticks:{
                callback: function(value, index, ticks) {
                        return 'Day ' + Math.round(value);
                    },
                major:{
                  enabled: true,
                },
              },
              title: {
                display: true,
                text: "Days since election"
              }
            }
          }
      }
    }
};



