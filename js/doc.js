function init_doc_view() {
    console.log('document init');
    
    d3.text('/data/1101162143775.txt', function(error, text) {
        if (error) {
            document.getElementById("document_view").innerHTML = "Failed to load document";
            throw error;
        } else {
            // `text` is the file text; set text to appear in div
//             console.log(text); // Hello, world!
            document.getElementById("document_view").innerHTML = ""+text;          
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

