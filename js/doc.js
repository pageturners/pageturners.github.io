function doc_init() {
    console.log('doc init');
    
    d3.text('data/1101162505451.txt', function(error, text) {
        if (error) {
            console.log('error reading text');
            document.getElementById("document_view").innerHTML = "Failed to load document";
            throw error;
        } else {
//             console.log(text);
		text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
            document.getElementById("document_view").innerHTML = text;          
        }
    });
	
    var document_list_table = document.getElementById('document_list');
	var dl_header = '<tr>';
	var document_list = {};
    //create table from articleInfo.csv and add columns for number of times read and relevance score
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

