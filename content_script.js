let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousedown', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// 黑名单类名数组，包含已知的系统或框架类名
const blacklist = ['ImageGatherer', 'SideFunctionPanel'];

function getUniqueClassNames() {
    const elements = document.querySelectorAll('*');
    const classNames = new Set();
    elements.forEach(element => {
        element.classList.forEach(className => {
            if (!blacklist.includes(className) && !isCommonFrameworkClass(className)) {
                classNames.add(className);
            }
        });
    });
    return Array.from(classNames);
}

// 函数用于检测类名是否包含常见框架类名
function isCommonFrameworkClass(className) {
    const commonFrameworkClasses = ['mpa-', 'commonclass2'];
    return commonFrameworkClasses.some(commonClass => className.includes(commonClass));
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'screenshot') {
        const targetElement = document.elementFromPoint(mouseX, mouseY);
        if (targetElement) {
            window.takeScreenshotAndDownload(targetElement);
        } else {
            console.error('未找到目标元素。');
        }
    } else if (request.action === 'downloadAll') {
        const classNames = getUniqueClassNames();
        window.createElementSelectionDialog(classNames).then((selector) => {
            window.downloadAllElements(selector);
        }).catch((error) => {
            console.error(error);
        });
    }
});
