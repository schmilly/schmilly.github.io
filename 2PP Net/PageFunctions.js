PP_Split = ["greens","one","UAP","other"]


FlowstoLab = [0.5,0.5,0.5,0.5]

document.getElementById("enableadvance").checked = TwoPPBool;

PP_Split.forEach((value,index) => {
  eval('var ' + value + "slide = document.getElementById('" + value + "2pp')");
  eval('var ' + value + "lab = document.getElementById('" + value + "flowlab')");
  eval('var ' + value + "lib = document.getElementById('" + value + "flowlib')");
  

  eval ("FlowstoLab[index] = " + value + "slide.value")
  eval(value + "lab.innerHTML = "+ value + "slide.value")
  eval(value + "lib.innerHTML = 100 - "+ value + "slide.value")
  
  eval(value + "slide.oninput = function() {slideinput(index," + value + "slide," + value + "lab," +  value + "lib);}");

});

function slideinput(index,Slider,SliderLab,SliderLib){
  SliderLab.innerHTML = Slider.value;
  SliderLib.innerHTML = 100 - Slider.value;
  if (TwoPPBool){
    FlowstoLab[index] = Slider.value/100;
    CalcCustom2PP(true);
  };
}

function EnableCustom2pp() {
  PP_Split.forEach((value,index) => {
    eval("var CurrentValue = document.getElementById('" + value + "2pp').value")
    FlowstoLab[index] = Number(CurrentValue)/100
  })
  TwoPPBool = !(TwoPPBool)
  if (TwoPPBool){
    document.getElementById("enableadvance").checked = TwoPPBool;
    CalcCustom2PP(true)
  }
  else{
    document.getElementById("enableadvance").unchecked = TwoPPBool;
    CalcCustom2PP(false)
  }
}

function CalcCustom2PP(boolean){
  var DataSets = [];
  CustomData = Custom2PPgenerateChartData(DataSets, Filelist, boolean, FlowstoLab)

  for (let i = 0; i < mixedChart.data.datasets[0].data.length; i++){
    mixedChart.data.datasets[0].data[i].y = CustomData[0].data[i].y
  }
  for (let i = 0; i < mixedChart.data.datasets[1].data.length; i++){
    mixedChart.data.datasets[1].data[i].y = CustomData[1].data[i].y
  }
  mixedChart.update();
  
  if (SelectedPollPos != undefined){
    document.getElementById("Pll2PP").innerText = ChartData.data.datasets[0].data[SelectedPollPos].y.toFixed(2) + "%"
  }
}
