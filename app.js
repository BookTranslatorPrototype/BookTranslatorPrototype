(function () {
    function $(id) {
        return document.getElementById(id);
    }

    const textInput = $('js-text');
    const downloadButton = $('js-download');
    const filenameInput = $('js-filename');
    const refreshButton = $('js-refresh');
    const fileInput = $('js-file');

    function onFileLoad(e) {
        textInput.value = e.target.result;
    }

    function readSingleFile(event) {
        const reader = new FileReader();
        reader.onload = onFileLoad;
        reader.readAsText(event.target.files[0]);
    }

    function refresh() {
        const filename = filenameInput.value;
        const text = textInput.value;
        if (filename && text) {
            download(filename, text);
        }
    }

    function download(filename, text) {
        const file = new Blob([text], {type: 'text/plain'});
        downloadButton.href = URL.createObjectURL(file);
        downloadButton.download = filename;
    }

    refreshButton.addEventListener('click', refresh);

    fileInput.addEventListener('change', readSingleFile);
})();