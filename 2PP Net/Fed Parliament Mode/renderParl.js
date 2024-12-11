function renderParliment(SeatList) {
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
    eval("SeatColor = PartyColor." + Winner)
    SeatParl.style.fill = SeatColor; 
    SeatMap.style.fill = SeatColor;
  })
}
