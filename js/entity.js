function entity_init() {
	console.log('entity init');

	// create a table for the first entity type
	var c1_div = document.getElementById('entities_c1');
	var c1_table_header = '<table id="c1_table_header" class="entity_header">'; 
	c1_table_header += '  <tr><th colspan="3">' + entity_types[0] + '</th></tr>';
	c1_table_header += '</table>';
	var c1_table = '<table id="c1_table" class="entity_table">';
	for (var i = 0; i < person_entities.length; i++) {
		c1_table += '<tr>';
		c1_table += '  <td class="checkbox_td"><input id="' + unformat_name(person_entities[i]) + '_checkBox" type="checkbox" name="checkbox" class="entity_checkbox" checked/></td>'; 
		c1_table += '  <td class="entity_td">' + person_entities[i] + '</td>';
		c1_table += '  <td class="slider_td"><input id="' + unformat_name(person_entities[i]) + '_weight" type="range" min="0" max="100" value="' + (entity_map[person_entities[i]]['default_weight'] * 100) + '" class="slider"></td>'; 
		c1_table += '</tr>';
	}
	c1_table += '</table>';
	c1_div.innerHTML = c1_table_header + c1_table;

	// create a table for the second entity type
	var c2_div = document.getElementById('entities_c2');
	var c2_table_header = '<table id="c2_table_header" class="entity_header">';
	c2_table_header += '  <tr><th colspan="3">' + entity_types[1] + '</th></tr>';
	c2_table_header += '</table>';
	var c2_table = '<table id="c2_table" class="entity_table">';
	for (var i = 0; i < organization_entities.length; i++) {
		c2_table += '<tr>';
		c2_table += '  <td class="checkbox_td"><input id="' + unformat_name(organization_entities[i]) + '_checkBox" type="checkbox" name="checkbox" class="entity_checkbox" checked/></td>';
		c2_table += '  <td class="entity_td">' + organization_entities[i] + '</td>';
		c2_table += '  <td class="slider_td"><input id="' + unformat_name(organization_entities[i]) + '_weight" type="range" min="0" max="100" value="' + (entity_map[organization_entities[i]]['default_weight'] * 100) + '" class="slider"></td>';
		c2_table += '</tr>';
	}
	c2_table += '</table>';
	c2_div.innerHTML = c2_table_header + c2_table;

	// create a table for the third entity type
	var c3_div = document.getElementById('entities_c3');
	var c3_table_header = '<table id="c3_table_header" class="entity_header">';
	c3_table_header += '  <tr><th colspan="3">' + entity_types[2] + '</th></tr>';
	c3_table_header += '</table>';
	var c3_table = '<table id="c3_table" class="entity_table">';
	for (var i = 0; i < location_entities.length; i++) {
		c3_table += '<tr>';
		c3_table += '  <td class="checkbox_td"><input id="' + unformat_name(location_entities[i]) + '_checkBox" type="checkbox" name="checkbox" class="entity_checkbox" checked/></td>'; 
		c3_table += '  <td class="entity_td">' + location_entities[i] + '</td>';
		c3_table += '  <td class="slider_td"><input id="' + unformat_name(location_entities[i]) + '_weight" type="range" min="0" max="100" value="' + (entity_map[location_entities[i]]['default_weight'] * 100) + '" class="slider"></td>';
		c3_table += '</tr>';
	}
	c3_table += '</table>';
	c3_div.innerHTML = c3_table_header + c3_table;

	add_event_listeners();
}

function unformat_name(name) {
	var new_name = name.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g,"");
	new_name = new_name.replace(/\s{2,}/g," ");
	new_name = new_name.replace(' ', '');
	return new_name;
}

function add_event_listeners() {

	// when entity checkboxes change, update document scores
	$('input[name=checkbox]').change(function() {
	    if ($(this).is(':checked')) {
	        // Checkbox is checked..
	    } else {
	        // Checkbox is not checked..
	    }
	});

	// when entity weights change, update document scores
	for (var i = 0; i < all_entities.length; i++) {
		var slider = document.getElementById(unformat_name(all_entities[i]) + '_weight');

		// Update the current slider value (each time you drag the slider handle)
		slider.oninput = function() {
		    // do something
		}
	}
}