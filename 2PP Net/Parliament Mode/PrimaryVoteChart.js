const data = {
  labels: ["Test","Data","Test"],
  datasets: [
    {
      label: 'Dataset 1',
      data: [30,40,50,30],
    }
  ]
};


const Chart2PP = {
  type: 'bar',
  data: data,
  options: {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart'
      }
    }
  },
};

function clickHandler(){

}
