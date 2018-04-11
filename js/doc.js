function doc_init() {
    console.log('doc init');
    
    d3.text('data/1101162505451.txt', function(error, text) {
        if (error) {
            console.log('error reading text');
            document.getElementById("document_view").innerHTML = "Failed to load document";
            throw error;
        } else {
	    text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
            document.getElementById("document_view").innerHTML = text;          
        }
    });

	document.getElementById("defaultOpen").click();

    	// create a table for the the document information
	var doc_div = document.getElementById('documents');
	var doc_header = '<table id="doc_header" class="doc_header">'; 
	doc_header += '  <tr><th>Filename</th><th>Type</th><th>Date</th><th>Title</th><th>Author</th><th>Views</th><th>Relevance</th></tr>';
	doc_header += '</table>';
	var doc_table = '<table id="doc_table" class="doc_table">';
	x = 0
	for (var key in article_map) {
		doc_table += '<tr>';
		doc_table += '  <td class="doc_td">' + key + '</td>'; //Filenames
		var val = article_map[key]
		doc_table += '  <td class="doc_td">' + val.type + '</td>'; //type
		doc_table += '  <td class="doc_td">' + val.date + '</td>'; //date
		doc_table += '  <td class="doc_td">' + val.title + '</td>'; //title
		doc_table += '  <td class="doc_td">' + val.author + '</td>'; //author
		doc_table += '  <td class="doc_td">0</td>'; //view count
		doc_table += '  <td class="doc_td">Rel.</td>'; //relevance
		doc_table += '</tr>';
	}

	doc_table += '</table>';
	doc_div.innerHTML = doc_header + doc_table;
	
	addRowHandlers();
}

//open document when table row is clicked
function addRowHandlers() {
  var table = document.getElementById("doc_table");
  var rows = table.getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    var currentRow = table.rows[i];
    var createClickHandler = function(row) {
      return function() {
        var cell = row.getElementsByTagName("td")[0];
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

function openDoc(filename) {
    d3.text('data/'+filename, function(error, text) {
        if (error) {
            console.log('error reading text');
            document.getElementById("document_view").innerHTML = "Failed to load document";
            throw error;
        } else {
	    text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
            document.getElementById("document_view").innerHTML = text;          
        }
    });
	
    document.getElementById("defaultOpen").click();
}

// function get_next_doc(currentFile) {
// //return filename of next best document to read
//   return filename
// }

// function next_doc() {
//   filename = get_next_doc(currentDoc)
// d3.text('data/'+filename, function(error, text) {
//         console.log('reading text....');
//         if (error) {
//             console.log('error reading text');
//             document.getElementById("document_view").innerHTML = "Failed to load document";
//             throw error;
//         } else {
//             // `text` is the file text; set text to appear in div
//             console.log(text); // Hello, world!
//             document.getElementById("document_view").innerHTML = "File Reads: "+text;          
//         }
//     });
// }

