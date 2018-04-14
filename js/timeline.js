function timeline_init() {

	console.log('timeline init');

	// Timeline
	var margin = { top: 20, right: 20, bottom: 30, left: 40 },
	    width = 1280 - margin.left - margin.right,
	    height = 330 - margin.top - margin.bottom;

	var time_format = d3.time.format("%m/%d/%Y");

	var x = d3.time.scale()
		.domain([time_format.parse("1/1/2004"), time_format.parse("12/24/2004")])
	    .range([0, width]);

	var y = d3.scale.linear()
		.domain([0, 1])
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom")
	    .tickFormat(time_format);

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var svg = d3.select("#timeline").append("svg")
		.attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	  .append("text")
		.attr("class", "label")
		.attr("x", width)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text("Date");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	  .append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Relavance Score")

	svg.selectAll(".dot")
		.data(all_articles)
	  	.enter().append("circle")
		.attr("class", "dot")
		.attr("r", function(d) {
			if (d == current_article) {
				return 7;
			} else {
				return 3.5;
			}
		})
		.attr("cx", function(d) { return x(time_format.parse(article_map[d]['date'])); })
		.attr("cy", function(d) { return y(article_weight_map[d]); })
		.style("fill",  function(d) { 
			if (article_map[d]['type'] == "editorial") {
				return "#6A1B9A";
			} else if (article_map[d]['type'] == "obituary") {
				return "#000000";
			} else if (article_map[d]['type'] == "article") {
				return "#4CAF50";
			} else if (article_map[d]['type'] == "factsheet") {
				return "#008B8B";
			} else if (article_map[d]['type'] === "lucky numbers") {
				return "#778899";
			} else {
			    return "#808080";
			}
		})
	.style("stroke",  function(d) { 
			if (article_map[d]['type'] == "editorial") {
				return "#6A1B9A";
			} else if (article_map[d]['type'] == "obituary") {
				return "#000000";
			} else if (article_map[d]['type'] == "article") {
				return "#4CAF50";
			} else if (article_map[d]['type'] == "factsheet") {
				return "#008B8B";
			} else if (article_map[d]['type'] === "lucky numbers") {
				return "#778899";
			} else {
			    return "#808080";
			}
		})
		.on('click', function(d,i) {
			openDoc(d);
			svg.selectAll(".dot").attr("r", function(d) {
			if (d == current_article) {
				return 7;
			} else {
				return 3.5;
			}
			});
        });
	
}

// todo: update stuff in the timeline (called after document scores change)
function update_timeline() {
// 	// Timeline
// 	var margin = { top: 20, right: 20, bottom: 30, left: 40 },
// 	    width = 1280 - margin.left - margin.right,
// 	    height = 330 - margin.top - margin.bottom;

// 	var time_format = d3.time.format("%m/%d/%Y");

// 	var x = d3.time.scale()
// 		.domain([time_format.parse("1/1/2004"), time_format.parse("12/24/2004")])
// 	    .range([0, width]);

// 	var y = d3.scale.linear()
// 		.domain([0, 1])
// 	    .range([height, 0]);
	
// 	var dots = d3.selectAll(".dot");
// 	dots.data(all_articles)
// 		.transition()
// 		.duration(1000)
// 		.attr("r", 3.5)
// 		.attr("cx", function(d) { return x(time_format.parse(article_map[d]['date'])); })
// 		.attr("cy", function(d) { return y(article_weight_map[d]); })
// 		.style("fill", "#000000")
// 		.on('click', function(d,i) {
// 			openDoc(d);
//         });
}
