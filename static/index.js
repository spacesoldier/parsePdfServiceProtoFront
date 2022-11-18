

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

    let filesToAttach = Array.from(files);

    if (
        filesToAttach !== undefined
    ){
        filesToAttach.forEach(
            (file,index) => {
                let fileName = file.name;
                formData.set(fileName, file);
            }
        )
    }

    console.log("[LOADER]: uploading pdf files to server");

    axios.post(
                "/api/loadfiles",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                    onUploadProgress: progressEvent => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        console.log(`[LOADER]: upload process: ${percentCompleted}%`);
                    }
                }
        )
        .then(
                    function(response) {
                        console.log(response.data)
                        console.log(response.data.url)
                    }
                )
        .catch(
                function(error) {
                    console.log("[LOADER ERROR]:"+error);
                }
        )
        .finally(
            function () {
                        console.log("[LOADER]: completed");
                    }
                );

}