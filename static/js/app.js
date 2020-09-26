//------------------------------------------------------------------------------
//Explore dataset for Initial WebPage
//------------------------------------------------------------------------------
d3.json("samples.json").then(function(data) {
  let sel_id = "selDataset";
  let metaData = data['metadata'];
  let samplesData = data['samples'];
  console.log(samplesData);
  initDropdownList(sel_id, metaData);
  buildTable(metaData[0]);
  buildPlot(samplesData[0]['otu_ids'], samplesData[0]['sample_values'],
            samplesData[0]['otu_labels'], metaData[0]['wfreq']);
});
//------------------------------------------------------------------------------
//ID Selected - Option Changed Event
//------------------------------------------------------------------------------
function optionChanged (select_value) {
    //alert ("The selected option is " + select_value);
    d3.json("samples.json").then(function(data) {
      let info_id = "sample-metadata";
      let metaData = data['metadata'];
      let samplesData = data['samples'];
      var i, id_value;
      //console.log(metaData, samplesData);
      for (i in metaData) {
          if (metaData[i]['id'] == select_value) {
              //console.log (metaData[i]['id'], metaData[i]['wfreq']);
              buildTable(metaData[i]);
              buildPlot(samplesData[i]['otu_ids'], samplesData[i]['sample_values'],
                        samplesData[i]['otu_labels'], metaData[i]['wfreq']);
              }
          }
      });
};
//------------------------------------------------------------------------------
//Building Plot Function
//------------------------------------------------------------------------------
function buildPlot(data_labels, data_values, text_values, freq_value) {
  var top_values, top_labels, top_text_values;
  var otu_ids = data_labels.slice();

  var myText = 'Belly Button Biodiversity';
  for(var i = 0; i < otu_ids.length; i += 1){
    otu_ids[i] = 'OTU ' + otu_ids[i];
  }
  console.log("Updated OTU data", otu_ids, data_labels);
  var array = []
  for (i=0; i<data_values.length; i++) {
    array.push([otu_ids[i], data_values[i], text_values[i]])
  }
  console.log(array);
  top_array = array.sort((a,b) => b[1]-a[1]).slice(0, 10).reverse();

  top_values = [];
  top_labels = [];
  top_text_values = [];
  for (i=0; i<top_array.length; i++) {
    top_labels.push(top_array[i][0]);
    top_values.push(top_array[i][1]);
    top_text_values.push(top_array[i][2]);
  }
  console.log(top_labels, top_values, top_text_values);
  //------------------------------------------------------------------------------
  //Bar Chart
  //------------------------------------------------------------------------------
  var data = [{
    x: top_values,
    y: top_labels,
    text: top_text_values,
    hovertemplate: ' Sample Value: %{x}<br> otu_ids: %{y}<br> Placement:%{text}<br> Dataset: ' + myText,
    type: "bar",
    orientation: 'h'
  }];

  var layout = {
    title:'Top 10 Bacteria Cultures Found',
    height: 500,
    width: 330
  };

  Plotly.newPlot("bar", data, layout);
  //------------------------------------------------------------------------------
  //Bubble Chart
  //------------------------------------------------------------------------------
  var trace1 = {
    x: data_labels,
    y: data_values,
    text: text_values,
    mode: 'markers',
    marker: {
      color: ['rgb(75,0,130)', 'rgb(138,43,226)', 'rgb(25,25,112)', 'rgb(0,0,128)',
              'rgb(0,0,139)', 'rgb(0,0,205)', 'rgb(0,0,255)', 'rgb(65,105,225)',
              'rgb(72,61,139)', 'rgb(106,90,205)', 'rgb(123,104,238)', 'rgb(95,158,160)',
              'rgb(70,130,180)', 'rgb(0,191,255)', 'rgb(135,206,250)', 'rgb(240,248,255)'
              ],
      size: data_values,
      opacity: [0.6, 0.7, 0.8, 0.9]
      }
    };
  var bubble_data = [trace1];
  console.log("Trace1", trace1);
  console.log("Bubble chart", bubble_data);

  var bubble_layout = {
    title: 'Bacteria Cultures per Sample',
    showlegend: false,
    height: 500,
    width: 750
  };

  Plotly.newPlot('bubble', bubble_data, bubble_layout);
  //------------------------------------------------------------------------------
  //Gauge Chart
  //------------------------------------------------------------------------------
  var gauge_data = [
  {
    type: "indicator",
    mode: "gauge+number",
    value: freq_value,
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
//------------------------------------------------------------------------------
//Demographic Info Table
//------------------------------------------------------------------------------
function buildTable(dates) {
  var table = d3.select("#summary-table");
  var thead = table.select("thead");
  var tbody = table.select("tbody");
  // remove any children from the tbody and thead
  thead.html("");
  tbody.html("");

  var trow, idx, key, dict_length;
  dict_length = Object.keys(dates).length
  console.log (dates, dict_length);

  trow = tbody.append("tr");
  trow.append("th").text("DEMOGRAPHIC INFO");
  for (idx = 0; idx < dict_length; idx++) {
    key = Object.keys(dates)[idx].toUpperCase();
    trow.append("th").text(key);
  }

  trow = tbody.append("tr");
  trow.append("td").text("Belly Button Data Set 1");
  for (idx = 0; idx < dict_length; idx++) {
    key = Object.keys(dates)[idx];
    value = dates[key];
    trow.append("td").text(value);
  }
}
//------------------------------------------------------------------------------
//Create Selection ID list
//------------------------------------------------------------------------------
function initDropdownList( id, data ) {
    var select, i, option;
    select = document.getElementById( id );
    for ( i in data ) {
        option = document.createElement( 'option' );
        option.value = option.text = data[i]['id'];
        select.add( option );
    }
};
