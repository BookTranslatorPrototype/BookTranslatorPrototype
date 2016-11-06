(function () {
    function $(id) {
        return document.getElementById(id);
    }

    let text;
    const downloadButton = $('js-download');
    const filenameInput = $('js-filename');
    const fileInput = $('js-file');

    function refresh() {
        const filename = filenameInput.value;
        if (filename && text) {
            download(filename, text);
        }
    }

    function download(filename, text) {
        const file = new Blob([text], {type: 'text/plain'});
        downloadButton.href = URL.createObjectURL(file);
        downloadButton.download = filename;
    }

    function onFileLoad(e) {
        text = e.target.result;
        refresh();
    }

    function readSingleFile(event) {
        const reader = new FileReader();
        reader.onload = onFileLoad;
        reader.readAsText(event.target.files[0]);
    }

    fileInput.addEventListener('change', readSingleFile);
    filenameInput.addEventListener('change', refresh);
})();