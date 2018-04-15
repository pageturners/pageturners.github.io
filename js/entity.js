/*
 * Initiatilize the entity view
 */
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

	addRowHandler('c1_table');
	addRowHandler('c2_table');
	addRowHandler('c3_table');
	add_event_listeners();
	sort_all_entity_tables();
}

/* 
 * Remove punctuation from names for the purpose of div IDs
 */
function unformat_name(name) {
	var new_name = name.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g,"");
	new_name = new_name.replace(/\s{2,}/g," ");
	new_name = new_name.replace(' ', '');
	return new_name;
}

/*
 * Add the event listeners to the check boxes and sliders
 */
function add_event_listeners() {

	// when entity checkboxes change, update document scores
	$('input[name=checkbox]').change(function() {
		var checkboxId = this.id;
		checkboxId = checkboxId.substring(0, checkboxId.length - 9);
	    if ($(this).is(':checked')) {
	        // don't need to change anything just yet...
	    } else {
	        // set weight to 0 and re-sort the table
	        entity_weight_map[checkboxId] = 0; 
	        document.getElementById(checkboxId + '_weight').value = "0";
	        if (person_entities_unformatted.indexOf(checkboxId) > -1)
		    	sort_entity_table('c1_table');
		    else if (organization_entities_unformatted.indexOf(checkboxId) > -1)
		    	sort_entity_table('c2_table');
		    else if (location_entities_unformatted.indexOf(checkboxId) > -1)
		    	sort_entity_table('c3_table');

		    update_document_scores();
	    }
	});

	// when entity weights change, update document scores
	for (var i = 0; i < all_entities.length; i++) {
		var slider = document.getElementById(unformat_name(all_entities[i]) + '_weight');

		// Update the current slider value (each time you drag the slider handle)
		slider.onmouseup = function() {
			var slider_id = this.id;
			slider_id = slider_id.substring(0, slider_id.length - 7);
			entity_weight_map[slider_id] = slider.value; // todo: does slider.value work?
		    if (person_entities_unformatted.indexOf(slider_id) > -1)
		    	sort_entity_table('c1_table');
		    else if (organization_entities_unformatted.indexOf(slider_id) > -1)
		    	sort_entity_table('c2_table');
		    else if (location_entities_unformatted.indexOf(slider_id) > -1)
		    	sort_entity_table('c3_table');

		    update_document_scores();
		}
	}
}

//open document when table row is clicked
function addRowHandler(table_name) {
	console.log('row handler added for: '+table_name);
  var table = document.getElementById(table_name);
  var rows = table.getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    var currentRow = table.rows[i];
    var createClickHandler = function(row) {
      return function() {
// 	      console.log('entity clicked');
	      	//remove past highlighting
	$('#doc_table tr').css('background','white');
	
	//reapply current article highlight
	$('#doc_table tr').filter(function(){
  		return $.trim($('td', this).eq(6).text())==current_article;
	}).css('background','aquamarine');
	      
        var cell = row.getElementsByTagName("td")[1];
        var entity = cell.innerHTML;
//         highlight files which contain that entity
	for (var article in file_entity_map) {
		if (entity in file_entity_map[article]) {
// 			console.log('entity found in a file!');
			//highlight which doc is open in table
			$('#doc_table tr').filter(function(){
  				return $.trim($('td', this).eq(6).text())==article;
			}).css('background','silver');
		}		
	}
      };
    };
    currentRow.onclick = createClickHandler(currentRow);
  }
}


/*
 * Sort the entity table
 * which_table is either c1_table, c2_table, or c3_table
 * entity_order defines the new sorted order
 */
function sort_entity_table(which_table) {
	var table = document.getElementById(which_table);
	var switching = true;
	var should_switch = false;
	var i;

	while (switching) {
		switching = false;
		var rows = table.getElementsByTagName('tr');

		// loop through all table rows
		should_switch = false;
		for (i = 0; i < rows.length - 1; i++) {
			// get the two elements to compare
			var row1 = rows[i].getElementsByTagName('td')[2].getElementsByTagName('input')[0];
			var row2 = rows[i + 1].getElementsByTagName('td')[2].getElementsByTagName('input')[0];

			var val1 = +row1.value;
			var val2 = +row2.value;

			// check if the two rows should switch place
			if (val1 < val2) {
				should_switch = true;
				break;
			}
		}
	    
	    if (should_switch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}
	}
}

/*
 * Sort all of the entity tables 
 */
function sort_all_entity_tables() {
	sort_entity_table('c1_table');
	sort_entity_table('c2_table');
	sort_entity_table('c3_table');
}

/*
 * Update all of the document scores
 */
function update_document_scores() {
	for (article in file_entity_map) {
		var entity_sum = 0; 
		var article_score = 0;
		for (cur_entity in file_entity_map[article]) {
			unformatted_entity = unformat_name(cur_entity);
// 			article_score += (file_entity_map[article][cur_entity] * entity_weight_map[unformatted_entity]);
// 			entity_sum += file_entity_map[article][cur_entity];
			article_score += (1*entity_weight_map[unformatted_entity]);
			entity_sum += 1;	
		}

		if (entity_sum != 0)
			article_score /= entity_sum;
		if (article_score > 1) 
			article_score = 1;
	
		article_weight_map[article] = article_score;
	}

	update_timeline();
	update_doc_table();
}
