var entity_type_map = {};
var entity_types = ['Type1', 'Type2', 'Type3', 'Type4', 'Type5'];

function init() {

	// load entity map
	d3.csv('csv/entities.csv', function(data) {
		entity_type_map[data['entity_name']] = { 'type': data['entity_type'], 'total_appearances': data['total_appearances'], 'document_appearances': data['document_appearances'] };
	});

	// wait one second to make sure data finishes loading 
	window.setTimeout(function() {
		entity_init();
	}, 1000);
}