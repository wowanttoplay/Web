chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
      id: "sampleContextMenu",
      title: "Sample Context Menu",
      contexts: ["page", "selection", "link", "editable", "image", "video", "audio"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sampleContextMenu") {
      chrome.tabs.sendMessage(tab.id, { action: 'screenshot' });
  }
});