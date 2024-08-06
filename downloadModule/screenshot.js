(function() {
    function screenshotElement(element, filename) {
        html2canvas(element, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            logging: true,
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const blob = dataURLtoBlob(imgData);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }).catch((error) => {
            console.error('截图错误:', error);
        });
    }

    function takeScreenshotAndDownload(targetElement) {
        screenshotElement(targetElement, 'element_screenshot.png');
    }

    function downloadAllElements(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            screenshotElement(element, `element_screenshot_${index}.png`);
        });
    }

    function dataURLtoBlob(dataUrl) {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    // 将函数挂载到全局对象上
    window.screenshotElement = screenshotElement;
    window.takeScreenshotAndDownload = takeScreenshotAndDownload;
    window.downloadAllElements = downloadAllElements;
    window.dataURLtoBlob = dataURLtoBlob;
})();
