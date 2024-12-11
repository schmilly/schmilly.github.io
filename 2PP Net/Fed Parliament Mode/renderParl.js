function renderParliment(SeatList) {
  Counts = {
  "ALP": 0,  "Lib": 0,  "LaP": 0,  "LNP": 0,  "CLP": 0,  "Nat": 0,  "Grn": 0, 
  "UAP": 0,  "One": 0,  "Oth": 0,  "Ind": 0,  "JLN": 0,  "XEN": 0,  "KAP": 0
  }
  
  SeatList.forEach((Seat) => {
    try{
      Winner = SimulatePrefChart(Seat, Winner)
    }
    catch{
      console.log("Error with Electorate: " + Seat)
    }
    console.log(Seat)
    console.log(Winner)
    //Loop to wait for document to load
    var SeatMap = document.getElementById("Map").getElementById(Seat)
    var SeatParl = document.getElementById("Parliament").getElementById(Seat)
    eval("Counts." + Winner + " = Counts." + Winner + " + 1")
    eval("SeatColor = PartyColor." + Winner)
    SeatParl.style.fill = SeatColor; 
    SeatMap.style.fill = SeatColor;
  })
  TopRow = ""
  BottomRow = ""
  Object.entries(Counts).forEach((Elements => {
      if (Elements[1] > 0){
      eval("CountPartyName = PartyNameArray." + Elements[0])
      TopRow = TopRow + "<th> " + CountPartyName + "</th>"
      eval("Prty2022 = Count2022." + Elements[0])
      Change = Elements[1] - Prty2022
      BottomRow = BottomRow + "<td>" + Elements[1] + " <br> (" + ((Change<=0?"":"+") + Change) + ") </td>"
  }}))
  document.getElementById("SeatCount").innerHTML = "<tr>" + TopRow + "</tr> <tr>" + BottomRow + "</tr>"
}
