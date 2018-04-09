function entity_init() {
	console.log('entity init');

	// create a table for the first entity type
	var c1_div = document.getElementById('entities_c1');
	var c1_table = '<table id="c1_table">';
	c1_table += '  <tr><th colspan="3">' + entity_types[0] + '</th></tr>';
	for (var i = 0; i < person_entities.length; i++) {
		c1_table += '<tr>';
		c1_table += '  <td>**</td>'; // placeholder for checkbox
		c1_table += '  <td>' + person_entities[i] + '</td>';
		c1_table += '  <td>**</td>'; // placeholder for weight slider
		c1_table += '</tr>';
	}
	c1_table += '</table>';
	c1_div.innerHTML = c1_table;

	// create a table for the second entity type
	var c2_div = document.getElementById('entities_c2');
	var c2_table = '<table id="c2_table">';
	c2_table += '  <tr><th colspan="3">' + entity_types[1] + '</th></tr>';
	for (var i = 0; i < organization_entities.length; i++) {
		c2_table += '<tr>';
		c2_table += '  <td>**</td>'; // placeholder for checkbox
		c2_table += '  <td>' + organization_entities[i] + '</td>';
		c2_table += '  <td>**</td>'; // placeholder for weight slider
		c2_table += '</tr>';
	}
	c2_table += '</table>';
	c2_div.innerHTML = c2_table;

	// create a table for the third entity type
	var c3_div = document.getElementById('entities_c3');
	var c3_table = '<table id="c3_table">';
	c3_table += '  <tr><th colspan="3">' + entity_types[2] + '</th></tr>';
	for (var i = 0; i < location_entities.length; i++) {
		c3_table += '<tr>';
		c3_table += '  <td>**</td>'; // placeholder for checkbox
		c3_table += '  <td>' + location_entities[i] + '</td>';
		c3_table += '  <td>**</td>'; // placeholder for weight slider
		c3_table += '</tr>';
	}
	c3_table += '</table>';
	c3_div.innerHTML = c3_table;
}