var SmoothData = {
    type: 'doughnut',
    data: {
        labels: PrtyLabels,
        datasets: [{
            label: '%',
            data: PartyData,
            borderWidth: 10,
            borderAlign: "inner",
            backgroundC5olor: colors
        }]
    },
    options: {
        rotation: -90,
        circumference: 180,
        maintainAspectRatio: false,
        onClick: handleChartClick,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 14
                    },
                }
            }
        }
    }
};

ParliamentData = generateParliamentdata(colors, PrtyLabels, SeatCount, PartyCount);
var HighChartsData = {
    chart: {
        type: 'item',
        height: (75) + '%',
        borderWidth: 0,
        spacingTop: 0,
        spacingRight: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        plotBorderWidth: 0,
        marginRight: 0,//-60, //this does move the chart but you'll need to recompute it
        marginLeft: 0,//-60,  //whenever the page changes width
        marginTop: 0,
        marginBottom: 0
    },
    legend: {
        itemStyle: {
            fontSize: '14px'
        },
    },
    title: {
        text: "Group Chat composition 31/01/2024",
    },
    series: [{
        name: 'Seats',
        keys: ['name', 'y', 'color'],
        data: ParliamentData,
        dataLabels: {
            enabled: false,
        },

        // Circular options
        center: ['50%', '75%'],
        size: '125%',
        startAngle: -100,
        endAngle: 100,
    }],
    plotOptions: {
        series: {
            states: {
                inactive: {
                    opacity: 1
                }
            },
        }
    },
};

var ElectorateChart = {
  type: 'bar',
  data: {
    datasets: [],
    labels: [""]
  },
  options: {
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
        position: 'right',
      },
      title: {
        display: false,
        text: ''
      }
    },
  scales: {
      x: {
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
