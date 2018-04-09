var entity_map = {}; // (entity, {type, total appearances, document appearances})
var file_entity_map = {}; // (file name, (entity, # occurrences))
var article_map = {}; // (file name, {type, date, title, author})

var entity_types = ['PERSON', 'ORGANIZATION', 'LOCATION'];
var person_entities = [];
var organization_entities = [];
var location_entities = [];
 
function init() {

	// load entity overview
	d3.csv('csv/entityOverview.csv', function(data) {
		for (var i = 0; i < data.length; i++) {
			entity_map[data[i]['entity']] = { 'type': data[i]['type'], 'total_appearances': data[i]['overall appearances'], 'document_appearances': data[i]['documents containing'] };
			if (data[i]['type'] == 'PERSON')
				person_entities.push(data[i]['entity']);
			else if (data[i]['type'] == 'ORGANIZATION')
				organization_entities.push(data[i]['entity']);
			else if (data[i]['type'] == 'LOCATION')
				location_entities.push(data[i]['entity']);
		}

		// load entity dictionary
		d3.csv('csv/entityDictionary.csv', function(data) {
			for (var i = 0; i < data.length; i++) {
				var entry = JSON.parse(data[i]['entitydictionary'].replace(/'/g, '"'));
				for (key in entry) {
					var new_key = key.replace('*', "'");
					if (new_key != key) {
						entry[new_key] = entry[key];
						delete entry[key];
					}
				}
				file_entity_map[data[i]['filename']] = entry;
			}

			// load article info
			d3.csv('csv/articleInfo.csv', function(data) {
				for (var i = 0; i < data.length; i++)
					article_map[data[i]['filename']] = { 'type': data[i]['type'], 'date': data[i]['date'], 'title': data[i]['title'], 'author': data[i]['author'] }
			});
		});
	});

	// wait a couple seconds to make sure data finishes loading
	window.setTimeout(function() {
		console.log('entity_map', entity_map);
		console.log('file_entity_map', file_entity_map);
		console.log('article_map', article_map);
		entity_init();
		timeline_init();
		doc_init();
	}, 2000);

}
