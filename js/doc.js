function init_doc_view() {
    console.log('document init');
    
    d3.text('data/1101162143775.txt', function(error, text) {
        if (error) {
            document.getElementById("document_view").innerHTML = "Failed to load document";
            throw error;
        } else {
            // `text` is the file text; set text to appear in div
            console.log(text); // Hello, world!
            document.getElementById("document_view").innerHTML = "File Reads: "+text;          
        }
    });
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

// function init_doc_list() {
// //fill second tab with list of documents, their relevance score & number of times they've been read
// }

// function get_next_doc(currentFile) {
// //return filename of next best document to read
//   return filename
// }

// function next_doc() {
//   filename = get_next_doc(currentDoc)
//   getFileFromServer("data/"+filename, function(text) {
//     if (text === null) {
//         // An error occurred
//     }
//     else {
//         // `text` is the file text
//     }
//   });
// }

