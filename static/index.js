

$(document).ready(
        () =>{
            initClient();
        }
    );

const api = axios.create({
    // baseURL: 'https://genplan.leaderhackdemo.pro/api',
    baseURL: 'http://localhost:8082/api',
    timeout: 120000,
});

function initClient() {
    hideProgressBar();
    console.log("[INIT]: app initialization");
}

var itemStatusValues = {
    "RECEIVED OK": "Загружен успешно"
}

function addListItem(itemName, itemStatus){
    let statusText = "Ошибка загрузки";

    if (itemStatus in itemStatusValues){
        statusText = itemStatusValues[itemStatus];
    }
    $("#statuslist").append(
        '<li class="list-group-item">' +
        '<div class="row"><div class="col text-left">' +
        ''+itemName+'</div>' +
        '<div class="col"></div>' +
        '<div class="col text-right">'+statusText+'</div>' +
        '</div></li>');
}

function fillFilesReport(fileResponse){
    if (fileResponse.data !== undefined){
        if (fileResponse.data.processResults !== undefined){

            itemReports = fileResponse.data.processResults;

            itemReports.forEach(
                (report, number) => {
                    addListItem(report.name, report.status);
                }
            )
        }
    }

}

function showProgressBar(){
    $("#uploadProgress").show();
}

function updateProgressBar(newValue){
    let progressBar = $("#uploadProgress");

    progressBar.css('width', newValue+'%')
                .attr("aria-valuenow",newValue);
}

function hideProgressBar(){
    $("#uploadProgress").hide();
    updateProgressBar(0);
}

function uploadFiles(){

    let fileElement = document.getElementById('loadPdfFilesInput');

    // check if user had selected a file
    if (fileElement.files.length === 0) {
        alert('please choose a file')
        return
    }

    showProgressBar();

    let files = fileElement.files;

    let formData = new FormData();

    let filesToAttach = Array.from(files);

    if (
        filesToAttach !== undefined
    ){
        filesToAttach.forEach(
            (file,index) => {
                let fileName = file.name;
                formData.append("file", file);
            }
        )
    }

    console.log("[LOADER]: uploading pdf files to server");

    api.request(
        {
            method: "post",
            url: "/loadfiles",
            responseType: "json",
            data: formData,
            headers: {
                "Accept": "*/*",
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: progressEvent => {
                                    const percentCompleted = Math.round(
                                                                        (progressEvent.loaded * 100) /
                                                                            progressEvent.total
                                                                        );
                                    updateProgressBar(percentCompleted);
                                    console.log(`[LOADER]: upload process: ${percentCompleted}%`);
                                }
        }
    )
        .then(
                    function(response) {
                        console.log(response.data)
                        console.log(response.data.url)
                        fillFilesReport(response.data);
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
                        hideProgressBar();
                    }
                );

}