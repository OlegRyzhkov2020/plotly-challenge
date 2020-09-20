
d3.json("samples.json").then(function(data) {
  let sel_id = "selDataset";
  let metaData = data['metadata'];
  //console.log(metaData, samplesData);
  initDropdownList(sel_id, metaData);
});

function optionChanged (select_value) {
    alert ("The selected option is " + select_value);
    d3.json("samples.json").then(function(data) {
      let sel_id = "selDataset";
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
