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
		.attr("r", 3.5)
		.attr("cx", function(d) { console.log(time_format.parse(article_map[d]['date'])); return x(time_format.parse(article_map[d]['date'])); })
		.attr("cy", function(d) { return y(article_weight_map[d]); })
		.style("fill", "#000000")
		.on('click', function(d,i) {
			openDoc(d);
        	});
}

// todo: update stuff in the timeline (called after document scores change)
function update_timeline() {
	var svg = d3.select("#timeline").append("svg")
	  .attr("width", width + margin.left + margin.right)
	  .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	svg.selectAll(".dot").remove();
	svg.selectAll(".dot")
		.data(all_articles)
	  	.enter().append("circle")
		.attr("class", "dot")
		.attr("r", 3.5)
		.attr("cx", function(d) { console.log(time_format.parse(article_map[d]['date'])); return x(time_format.parse(article_map[d]['date'])); })
		.attr("cy", function(d) { return y(article_weight_map[d]); })
		.style("fill", "#000000")
		.on('click', function(d,i) {
			openDoc(d);
        	});
}
