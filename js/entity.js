function entity_init() {
	// for debugging -- make sure data loaded from entity file correctly first
	console.log('entity init');
	console.log(entity_type_map);

	var entity_table = document.getElementById('entity_table');
	var entity_header = '<tr>';
	var entity_type_list = {};
	for (key in entity_type_map) {
		cur_type = entity_type_map[key]['type'];
		if (entity_type_list[cur_type] == undefined)
			entity_type_list[cur_type] = [];
		entity_type_list[cur_type].push(key);
	}

	// create a table for each entity type within the column 
	/*for (key in entity_type_list) {
		entity_header += '<th>';
		entity_header += '<table id="entity_table_' + key + '" valign="top" style="height: 400px; overflow: scroll;"></table>';
		entity_header += '</th>';
	}
	entity_header += '</tr>';
	entity_table.innerHTML = entity_header;

	for (key in entity_type_list) {
		var entity_type_table = document.getElementById('entity_table_' + key);
		var cur_list = entity_type_list[key];
		var cur_sub_table = '<tr><td></td><td>' + key + '</td><td></td></tr>';
		for (var i = 0; i < cur_list.length; i++) {
			cur_sub_table += '<tr>';
			cur_sub_table += '  <td><input id="' + cur_list[i] + '_checkBox" type="checkbox" checked/></td>';
			cur_sub_table += '  <td>' + cur_list[i] + '</td>';
			cur_sub_table += '  <td>slider</td>';
			cur_sub_table += '</tr>';
		}
		entity_type_table.innerHTML = cur_sub_table;
	}*/ //currently a monstrosity D: 
}