
const Array_2PP = []

function Custom2PPgenerateChartData(DataSets, Filelist, CustomMode, FlowstoLab){
  if (CustomMode){
    console.log("Test")
  }
  else{
    var electionDate = new Date("21-May-2022")
    RawData.forEach((Value,index) => {
      Result = Number(RawData[index][11])-Number(RawData[index][12])
      var PollDateStr = Date.parse(RawData[index][0].split('–')[1])
      var Polldate = new Date(PollDateStr)
      var timediff = Polldate.getTime() - electionDate.getTime()
      Array_2PP.push([timediff / (1000 * 60 * 60 * 24),Result/100]); 
    });
    DataSets.push(createDataSets(Array_2PP, "2PP Array"));
    DataSets.push(createMean(Array_2PP,"2PP Rolling Avrg."))
  }
}


PartyColor = {
    "ALP": "#C97064",
    "Lib": "#56638A",
    "LaP": "#40798C",
    "LNP":"#0066ff",
    "Grn": "#68A357", 
    "Nat": "#009933",
    "One": "#ffff99",
    "OaI": "#e8e3d3",
    "Oth": "#EDE7E3",
    "Ind": "#D4E4BC",
    "JLN": "#BCA371"
}


