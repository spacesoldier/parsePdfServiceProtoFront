

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

    let filesToAttach = files;

    if (
        filesToAttach !== undefined
    ){
        filesToAttach.forEach(
            (file,index) => {
                formData.append(file.name, filesToAttach.get(index));
            }
        )
    }

    console.log("[LOADER]: uploading pdf files to server");

}