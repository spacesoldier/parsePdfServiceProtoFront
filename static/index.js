

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
                    onUploadProgress: progressEvent => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        console.log(`upload process: ${percentCompleted}%`);
                    }
                }
        )
        .then(
                res => {
                        console.log(res.data)
                        console.log(res.data.url)
                    }
                );

}