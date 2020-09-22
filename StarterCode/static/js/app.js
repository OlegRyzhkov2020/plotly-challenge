
d3.json("samples.json").then(function(data) {
  let sel_id = "selDataset";
  let metaData = data['metadata'];
  let samplesData = data['samples'];
  console.log(samplesData);
  initDropdownList(sel_id, metaData);
  buildTable(metaData[0]);
  buildPlot(samplesData[0]['otu_ids'], samplesData[0]['sample_values'],
            samplesData[0]['otu_labels']);
});

function optionChanged (select_value) {
    alert ("The selected option is " + select_value);
    d3.json("samples.json").then(function(data) {
      let info_id = "sample-metadata";
      let metaData = data['metadata'];
      let samplesData = data['samples'];
      var i, id_value;
      //console.log(metaData, samplesData);
      for (i in metaData) {
          if (metaData[i]['id'] == select_value) {
              buildTable(metaData[i]);
              buildPlot(samplesData[i]['otu_ids'], samplesData[i]['sample_values'],
                        samplesData[i]['otu_labels']);
              //console.log (id_value, metaData[i]['id'], metaData[i]['ethnicity'], metaData[i]['gender']);
              }
          }
      });
};

function buildPlot(data_labels, data_values, text_values) {
  var top_values, top_labels, top_text_values;
  var otu_ids = data_labels.slice();

  var myText = 'My text';
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

  var data = [{
    x: top_values,
    y: top_labels,
    text: top_text_values,
    hovertemplate: ' x: %{x}<br> y: %{y}<br> Placement:%{text}<br> myText: ' + myText,
    type: "bar",
    orientation: 'h'
  }];

  var layout = {
    height: 500,
    width: 400
  };

  Plotly.newPlot("bar", data, layout);

  var trace1 = {
    x: data_labels,
    y: data_values,
    text: text_values,
    mode: 'markers',
    marker: {
      color: data_labels,
      size: data_values,
      opacity: [0.6, 0.7, 0.8, 0.9]
      }
    };
  var bubble_data = [trace1];
  console.log("Trace1", trace1);
  console.log("Bubble chart", bubble_data);

  var bubble_layout = {
    title: 'Marker Size',
    showlegend: false,
    height: 500,
    width: 800
  };

  Plotly.newPlot('bubble', bubble_data, bubble_layout);

  var gauge_data = [
  {
    type: "indicator",
    mode: "gauge+number+delta",
    value: 420,
    title: { text: "Speed", font: { size: 24 } },
    delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
    gauge: {
      axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
      bar: { color: "darkblue" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
        { range: [0, 250], color: "cyan" },
        { range: [250, 400], color: "royalblue" }
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 490
      }
      }
    }
  ];

  var gauge_layout = {
    width: 500,
    height: 400,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "lavender",
    font: { color: "darkblue", family: "Arial" }
  };

  Plotly.newPlot('gauge', gauge_data, gauge_layout);

};

function buildTable(dates) {
  var table = d3.select("#summary-table");
  var tbody = table.select("tbody");
  // remove any children from the tbody to
  tbody.html("");

  var trow, idx, key, dict_length;
  dict_length = Object.keys(dates).length
  console.log (dates, dict_length);

  for (idx = 0; idx < dict_length; idx++) {
    key = Object.keys(dates)[idx];
    value = dates[key];
    trow = tbody.append("tr");
    trow.append("td").text(key);
    trow.append("td").text(value);
  }
}

function initDropdownList( id, data ) {
    var select, i, option;
    select = document.getElementById( id );
    for ( i in data ) {
        option = document.createElement( 'option' );
        option.value = option.text = data[i]['id'];
        select.add( option );
    }
};
