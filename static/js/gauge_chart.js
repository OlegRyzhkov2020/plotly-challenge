//------------------------------------------------------------------------------
//Gauge Chart, 2 types: Indicator, Scatter
//------------------------------------------------------------------------------
function gaugeChart_indicator(value) {
  var gauge_data = [
  {
    type: "indicator",
    mode: "gauge+number",
    value: value,
    title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
    gauge: {
      axis: { range: [null, 9], tickwidth: 1, tickcolor: "skyblue" },
      bar: { color: "navy" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
        { range: [0, 2], color: "aliceblue" },
        { range: [2, 4], color: "lavender" },
        { range: [4, 8], color: "powderblue" }
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 9
      }
      }
    }
  ];

  var gauge_layout = {
    width: 450,
    height: 420,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "white",
    font: { color: "darkblue", family: "Arial" }
  };

  Plotly.newPlot('gauge', gauge_data, gauge_layout);

  };

function gaugeChart_scatter(value) {
  // Enter a speed between 0 and 180
  var level = value/10*180;

  var degrees = 180 - level,
     radius = .5;
  var radians = degrees * Math.PI / 180;
  var aX = 0.025 * Math.cos((degrees-90) * Math.PI / 180);
  var aY = 0.025 * Math.sin((degrees-90) * Math.PI / 180);
  var bX = -0.025 * Math.cos((degrees-90) * Math.PI / 180);
  var bY = -0.025 * Math.sin((degrees-90) * Math.PI / 180);
  var cX = radius * Math.cos(radians);
  var cY = radius * Math.sin(radians);

  var path = 'M ' + aX + ' ' + aY +
               ' L ' + bX + ' ' + bY +
               ' L ' + cX + ' ' + cY +
               ' Z';


  var data = [{ type: 'scatter',
      x: [0], y:[0],
      marker: {size: 14, color:'850000'},
      showlegend: true,
      name: 'Scrubs',
      text: value,
      hoverinfo: 'text+name'},
    { values: [1,1,1,1,1,1,1,1,1,9],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2','0-1',''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['rgb(65,105,225)','rgb(72,61,139)', 'rgb(106,90,205)', 'rgb(123,104,238)',
                      'rgb(95,158,160)', 'rgb(70,130,180)', 'rgb(0,191,255)', 'rgb(135,206,250)',
                      'rgb(240,248,255)', 'rgba(0, 0, 0, 0.5)']},
    hoverinfo: 'text',
    hole: .5,
    type: 'pie',
    showlegend: false
  }];

  var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
    height: 550,
    width: 450,
    title: { text: "Belly Button Washing Frequency", font: { size: 20 } },
    xaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]}
  };

  Plotly.newPlot('gauge', data, layout);

  };
