
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
  var otu_ids = data_labels;
  console.log("OTU data", otu_ids, data_labels);
  var myText = 'My text';
  //for(var i = 0; i < otu_ids.length; i += 1){
    //otu_ids[i] = 'OTU ' + otu_ids[i];
  //}
  console.log("Updated OTU data", otu_ids);
  top_values = data_values.sort((a, b) => b - a).slice(0, 10);
  top_labels = otu_ids.slice(0, 10);
  top_text_values = text_values.slice(0, 10);

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
    mode: 'markers',
    marker: {
      color: ['hsl(0,100,40)', 'hsl(33,100,40)', 'hsl(66,100,40)', 'hsl(99,100,40)'],
      size: data_values,
      opacity: [0.6, 0.7, 0.8, 0.9]
      }
    };
  console.log("trace1 x data", data_labels);
  console.log("Trace1", trace1);
  var buble_data = [trace1];
  console.log("Buble chart", buble_data);

  var buble_layout = {
    title: 'Marker Size',
    showlegend: false,
    height: 500,
    width: 800
  };

  Plotly.newPlot('bubble', buble_data, buble_layout);
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
