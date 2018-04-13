var entity_map = {}; // (entity, {type, total appearances, document appearances, default weight})
var file_entity_map = {}; // (file name, (entity, # occurrences))
var article_map = {}; // (file name, {type, date, title, author})
var article_weight_map = {}; // (file name, article weight)
var entity_weight_map = {}; // (entity name, entity weight)

var entity_types = ['PERSON', 'ORGANIZATION', 'LOCATION'];
var all_entities = [];
var person_entities = [];
var person_entities_unformatted = [];
var organization_entities = [];
var organization_entities_unformatted = [];
var location_entities = [];
var location_entities_unformatted = [];
var total_entity_appearances = 8214; // hard-coded sum of all entity appearances (for computing entity weights)
var max_entity_appearances = 560; // hard-coded max of all entity appearances (for computing entity weights)
var weight_threshold = 50; // anything that appears more than weight_threshold times will have default weight of 1; 8 entities will have max default weight
var all_articles = [];

function init() {

	// load entity overview
	d3.csv('csv/entityOverview.csv', function(data) {
		for (var i = 0; i < data.length; i++) {
			var cur_entity = data[i]['entity'];
			var entity_weight = Math.min(1.0, +data[i]['overall appearances'] / weight_threshold);
			entity_weight_map[unformat_name(cur_entity)] = entity_weight;
			entity_map[cur_entity] = { 'type': data[i]['type'], 'total_appearances': data[i]['overall appearances'], 'document_appearances': data[i]['documents containing'], 'default_weight': entity_weight };
			if (data[i]['type'] == 'PERSON') {
				person_entities.push(cur_entity);
				person_entities_unformatted.push(unformat_name(cur_entity));
			} else if (data[i]['type'] == 'ORGANIZATION') {
				organization_entities.push(cur_entity);
				organization_entities_unformatted.push(unformat_name(cur_entity));
			} else if (data[i]['type'] == 'LOCATION') {
				location_entities.push(cur_entity);
				location_entities_unformatted.push(unformat_name(cur_entity));
			}
			all_entities.push(cur_entity);
		}

		// load entity dictionary
		d3.csv('csv/entityDictionary.csv', function(data) {
			for (var i = 0; i < data.length; i++) {
				var entry = JSON.parse(data[i]['entitydictionary'].replace(/'/g, '"'));
				for (key in entry) {
					var new_key = key.replace(/\*/g, "'");
					if (new_key != key) {
						entry[new_key] = entry[key];
						delete entry[key];
					}
				}
				file_entity_map[data[i]['filename']] = entry;
				all_articles.push(data[i]['filename']);
			}

			// load article info
			d3.csv('csv/articleInfo.csv', function(data) {
				for (var i = 0; i < data.length; i++) {
					var article_default_weight = 0;
					var entity_sum = 0;
					var article_entities = file_entity_map[data[i]['filename']];

					for (entity_key in article_entities) {
						article_default_weight += (article_entities[entity_key] * entity_map[entity_key]['default_weight']);
						entity_sum += article_entities[entity_key];
					}

					article_default_weight /= entity_sum;
					if (isNaN(article_default_weight))
						aarticle_default_weight = 0;

					article_weight_map[data[i]['filename']] = article_default_weight;
					var article_date = data[i]['date'];
					if (article_date == 'none') 
						article_date = "1/1/2004"; // setting default date as a temporary measure until we come up with a better solution
					article_map[data[i]['filename']] = { 'type': data[i]['type'], 'date': article_date, 'title': data[i]['title'], 'author': data[i]['author'] }
				}
			});
		});
	});

	// wait a couple seconds to make sure all the data finishes loading
	window.setTimeout(function() {
		console.log('entity_map', entity_map);
		console.log('file_entity_map', file_entity_map);
		console.log('article_map', article_map);
		console.log('person_entities', person_entities);
		console.log('person_entities_unformatted', person_entities_unformatted);
		console.log('organization_entities', organization_entities);
		console.log('organization_entities_unformatted', organization_entities_unformatted);
		console.log('location_entities', location_entities);
		console.log('location_entities_unformatted', location_entities_unformatted);
		console.log('entity_weight_map', entity_weight_map);
		console.log('article_weight_map', article_weight_map);

		entity_init();
		timeline_init();
		doc_init();
	}, 2000);

}
