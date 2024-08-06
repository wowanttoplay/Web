chrome.runtime.onInstalled.addListener(() => {
  // 创建右键菜单项，用于下载点击的元素
  chrome.contextMenus.create({
    id: "downloadClickedElement",
    title: "Download Clicked Element",
    contexts: ["page", "selection", "link", "editable", "image", "video", "audio"]
  });

  // 创建右键菜单项，用于下载页面中所有匹配的元素
  chrome.contextMenus.create({
    id: "downloadAllElements",
    title: "Download All Elements of This Type",
    contexts: ["page"]
  });
});

// 监听右键菜单项点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "downloadClickedElement") {
    chrome.tabs.sendMessage(tab.id, { action: 'screenshot' });
  } else if (info.menuItemId === "downloadAllElements") {
    chrome.tabs.sendMessage(tab.id, { action: 'downloadAll' });
  }
});
