let mouseX = 0;
let mouseY = 0;

// 捕获鼠标坐标
document.addEventListener('mousedown', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// 处理截图和下载的函数
function takeScreenshotAndDownload(targetElement) {
    html2canvas(targetElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // 创建 Blob 对象并使用 URL.createObjectURL
        const blob = dataURLtoBlob(imgData);
        const url = URL.createObjectURL(blob);

        // 使用 a 标签进行下载
        const a = document.createElement('a');
        a.href = url;
        a.download = 'element_screenshot.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);  // 释放 URL 对象以节省内存
    }).catch((error) => {
        console.error('截图错误:', error);
    });
}

// 监听来自后台脚本的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'screenshot') {
        const targetElement = document.elementFromPoint(mouseX, mouseY);
        if (targetElement) {
            takeScreenshotAndDownload(targetElement);
        } else {
            console.error('未找到目标元素。');
        }
    }
});

// 辅助函数：将 data URL 转换为 Blob 对象
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