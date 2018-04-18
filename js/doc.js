var next_article = '1101243424483.txt';
var view_map = {};

function doc_init() {
    console.log('doc init');

    openDoc('1101243424483.txt'); //change to most relevant doc

    // create a table for the the document information
	var doc_div = document.getElementById('documents');
	var doc_header = '<table id="doc_header" class="doc_header">';
	doc_header += '  <tr><th style="width: 10px;">Rel</th><th style="    width:  10px;">View</th><th style="    width: 228px;">Title</th><th style="    width: 60px;">Author</th><th style="width: 70px;">Date</th><th style="    width: 55px">Type</th><th>Filename</th></tr>';
	doc_header += '</table>';
	var doc_table = '<table id="doc_table" class="doc_table">';
	for (var key in article_map) {
		doc_table += '<tr>';
		var val = article_map[key]
		var weight = (article_weight_map[key]).toFixed(2);
		doc_table += '  <td class="doc_td">'+weight+'</td>'; //relevance
		doc_table += '  <td class="doc_td">0</td>'; //view count
		doc_table += '  <td class="doc_td">' + val.title + '</td>'; //title
		doc_table += '  <td class="doc_td">' + val.author + '</td>'; //author
		doc_table += '  <td class="doc_td">' + val.date + '</td>'; //date
		doc_table += '  <td class="doc_td">' + val.type + '</td>'; //type
		doc_table += '  <td class="doc_td">' + key + '</td>'; //Filenames
		doc_table += '</tr>';
	}

	doc_table += '</table>';
	doc_div.innerHTML = doc_header + doc_table;

	sortTable();
	addRowHandlers();
}

function openDoc(filename) {
    d3.text('data/'+filename, function(error, text) {
        if (error) {
            console.log('error reading text');
            document.getElementById("document_view").innerHTML = "Failed to load document";
            throw error;
        } else {

			text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');

			current_article = filename;

		for (var i = 0; i < organization_entities.length; i++) {
			if (organization_entities[i].length > 2 && !organization_entities[i].endsWith(".")) {
				var re = new RegExp(organization_entities[i],"g");
				text = text.replace(re, "<span class='highlightorg'>"+organization_entities[i]+"</span>");
			}
		}
		for (var i = 0; i < location_entities.length; i++) {
			if (location_entities[i].length > 2 && !location_entities[i].endsWith(".")) {
				var re = new RegExp(location_entities[i],"g");
				text = text.replace(re, "<span class='highlightloc'>"+location_entities[i]+"</span>");
			}
		}
		for (var i = 0; i < person_entities.length; i++) {
			var entity = person_entities[i];
			//entity = escapeRegExp(entity);
			if (!entity.includes(")")) {
				var re = new RegExp(entity,"g");
				text = text.replace(re, "<span class='highlightperson'>"+person_entities[i]+"</span>");
			}
		}
        document.getElementById("document_view").innerHTML = text;
        }
    });
	document.getElementById("defaultOpen").click();

	//todo: call click of timeline dot

	highlight_entities(filename);

	//remove past highlighting
	$('#doc_table tr').css('background','white');

	//highlight which doc is open in table
	$('#doc_table tr').filter(function(){
  		return $.trim($('td', this).eq(6).text())==filename;
	}).css('background','aquamarine');

 	//incriment view count
	var table = document.getElementById("doc_table");
	var rows = table.getElementsByTagName("tr");
	for (i = 0; i < rows.length; i++) {
		var currentRow = table.rows[i];
    	var fn = currentRow.getElementsByTagName("td")[6].innerHTML;
		if (fn === filename) {
			var viewCell = currentRow.getElementsByTagName("td")[1];
			var viewCountString = viewCell.innerHTML;
			var viewCount = parseInt(viewCountString, 10) + 1;
			viewCell.innerHTML = +viewCount;
			view_map[filename] = viewCount;

			if (rows.length > (i+1)) {
				next_article = table.rows[i+1].getElementsByTagName("td")[6].innerHTML; //todo: change to only go to next article containing certain entities
			}
		}
  	}
}

function update_doc_table() {
	// create a table for the the document information
	var doc_div = document.getElementById('documents');
	var doc_header = '<table id="doc_header" class="doc_header">';
	doc_header += '  <tr><th>Score</th><th>Views</th><th>Title</th><th>Author</th><th>Date</th><th>Type</th><th>Filename</th></tr>';
	doc_header += '</table>';
	var doc_table = '<table id="doc_table" class="doc_table">';
	for (var key in article_map) {
		doc_table += '<tr>';
		var val = article_map[key]
		var weight = (article_weight_map[key]).toFixed(2);
		doc_table += '  <td class="doc_td">'+weight+'</td>'; //relevance
		if (key in view_map) {
			doc_table += '  <td class="doc_td">'+view_map[key]+'</td>';
		} else {
			doc_table += '  <td class="doc_td">0</td>'; //view count
		}
		doc_table += '  <td class="doc_td">' + val.title + '</td>'; //title
		doc_table += '  <td class="doc_td">' + val.author + '</td>'; //author
		doc_table += '  <td class="doc_td">' + val.date + '</td>'; //date
		doc_table += '  <td class="doc_td">' + val.type + '</td>'; //type
		doc_table += '  <td class="doc_td">' + key + '</td>'; //Filenames
		doc_table += '</tr>';
	}

	doc_table += '</table>';
	doc_div.innerHTML = doc_header + doc_table;

	sortTable();
	addRowHandlers();
}

function next_doc() {
	openDoc(next_article);
}

function highlight_entities(current_article) {
	$('#c1_table tr').css('background','white');
	$('#c2_table tr').css('background','white');
	$('#c3_table tr').css('background','white');

	for (var cur_entity in file_entity_map[current_article]) {

	//highlight current person entities
	$('#c1_table tr').filter(function(){
  		return $.trim($('td', this).eq(1).text())==cur_entity;
	}).css('background','#e7e7e7');

	//highlight current org entities
	$('#c2_table tr').filter(function(){
  		return $.trim($('td', this).eq(1).text())==cur_entity;
	}).css('background','#e7e7e7');

	//highlight current location entities
	$('#c3_table tr').filter(function(){
  		return $.trim($('td', this).eq(1).text())==cur_entity;
	}).css('background','#e7e7e7');
	}
}

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("doc_table");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("tr");
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 0; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[0];
      y = rows[i + 1].getElementsByTagName("td")[0];
      // Check if the two rows should switch place:
      if (x.innerHTML < y.innerHTML) {
        // I so, mark as a switch and break the loop:
        shouldSwitch= true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

//open document when table row is clicked
function addRowHandlers() {
  var table = document.getElementById("doc_table");
  var rows = table.getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    var currentRow = table.rows[i];
    var createClickHandler = function(row) {
      return function() {
        var cell = row.getElementsByTagName("td")[6];
        var filename = cell.innerHTML;
//         console.log("filename clicked:" + filename);
		openDoc(filename);
      };
    };
    currentRow.onclick = createClickHandler(currentRow);
  }
}

function switchTabs(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
