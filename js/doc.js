function getFileFromServer(url, doneCallback) {
    var xhr;

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handleStateChange;
    xhr.open("GET", url, true);
    xhr.send();

    function handleStateChange() {
        if (xhr.readyState === 4) {
            doneCallback(xhr.status == 200 ? xhr.responseText : null);
        }
    }
}

function init_doc_view() {
    console.log('document init');
    
    jQuery.get('data/1101162143775.txt, function(text) {
        if (text == null) {
            console.log('text null');
            document.getElementById("documentView").innerHTML = "Failed to load document";
        }
        else {
            // `text` is the file text; set text to appear in div
            document.getElementById("documentView").innerHTML = text;
        }
    });
    
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

