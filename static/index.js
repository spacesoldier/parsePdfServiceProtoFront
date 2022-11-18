

$(document).ready(
        () =>{
            initClient();
        }
    );

function initClient() {
    console.log("[INIT]: app initialization");
}

function uploadFiles(){

    let fileElement = document.getElementById('loadPdfFilesInput');

    // check if user had selected a file
    if (fileElement.files.length === 0) {
        alert('please choose a file')
        return
    }

    let files = fileElement.files;

    let formData = new FormData();

    files.forEach(
        (file, position) => {
            formData.set(file.name, file);
        }
    )

    console.log("[LOADER]: uploading pdf files to server");

}