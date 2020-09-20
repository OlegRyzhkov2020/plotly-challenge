// Read json data
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

d3.json("samples.json").then(function(data) {

  let metaData = data['metadata'];
  let samplesData = data['samples'];
  var i;
  console.log(metaData);
  let id = "selDataset";
  initDropdownList(id, metaData);

  document.getElementById(id).addEventListener('change', function() {
  id_value = this.value;
  console.log('You selected: ', id_value);
  for (i in metaData) {
    if (metaData[i]['id'] == id_value) {
      console.log (id_value, metaData[i]['id'], metaData[i]['ethnicity'], metaData[i]['gender']);
    }
  }
});
  //var otu_ids = data['samples'][0]['otu_ids'];
  //var otu_values = data['samples'][0]['sample_values'];


});


function initDropdownList( id, data ) {
    var select, i, option;
    select = document.getElementById( id );
    for ( i in data ) {
        option = document.createElement( 'option' );
        option.value = option.text = data[i]['id'];
        select.add( option );
    }
};

function optionChanged (select_value) {
            alert ("The selected option is " + select_value);
        };
