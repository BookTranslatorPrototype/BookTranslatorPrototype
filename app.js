(function () {
    function $(id) {
        return document.getElementById(id);
    }

    class WordParser {
        constructor(regex) {
            this.regex = regex;
        }

        parse(text) {
            return text.match(this.regex);
        }
    }

    class DownloadResource {
        constructor(link) {
            this.link = link;
        }

        updateFileName(value) {
            this.link.download = value;
        }

        updateBlob(text) {
            const file = new Blob([text], {type: 'text/plain'});
            this.link.href = URL.createObjectURL(file);
        }
    }

    const wordParser = new WordParser(/\b(\w+)\b/g);
    const downloadButton = $('js-download');
    const downloadResource = new DownloadResource(downloadButton);
    const filenameInput = $('js-filename');
    const fileInput = $('js-file');

    function fileNameChangeEvent() {
        downloadResource.updateFileName(filenameInput.value);
    }

    function analyze(text) {
        return wordParser.parse(text).join();
    }

    function onFileLoad(e) {
        downloadResource.updateBlob(analyze(e.target.result));
    }

    function readSingleFile(event) {
        const reader = new FileReader();
        reader.onload = onFileLoad;
        reader.readAsText(event.target.files[0]);
    }

    fileInput.addEventListener('change', readSingleFile);
    filenameInput.addEventListener('change', fileNameChangeEvent);
})();