
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
              buildTable(metaData[i])
              //console.log (id_value, metaData[i]['id'], metaData[i]['ethnicity'], metaData[i]['gender']);
              }
          }
      });
};

function buildPlot(data_labels, data_values, text_values) {
  var top_values, top_labels, top_text_values;
  var myText = 'My text';
  for(var i = 0; i < data_labels.length; i += 1){
    data_labels[i] = 'OTU ' + data_labels[i];
  }
  console.log(data_values, data_labels);
  top_values = data_values.sort((a, b) => b - a).slice(0, 10);
  top_labels = data_labels.slice(0, 10);
  top_text_values = text_values.slice(0, 10);
  console.log(top_values, data_values.slice(0, 10));
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
