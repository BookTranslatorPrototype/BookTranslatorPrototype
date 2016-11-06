function readSingleFile(event) {
    var file = event.target.files[0];

    var r = new FileReader();
    r.onload = function (e) {
        document.getElementById('js-text').value = e.target.result;
    };
    r.readAsText(file);
}
function download(filename, text) {
    var a = document.getElementById('js-download');
    var file = new Blob([text], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = filename;
}
document.getElementById('js-refresh').addEventListener('click', function () {
    download(
        document.getElementById('js-filename').value,
        document.getElementById('js-text').value
    );
});
document.getElementById('js-file').addEventListener('change', readSingleFile);