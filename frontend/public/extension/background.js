const detections = new Map();

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'HOTEL_DETECTED' && sender.tab?.id !== undefined) {
    detections.set(sender.tab.id, message.payload);
    chrome.runtime.sendMessage({ type: 'HOTEL_DETECTED', payload: message.payload }).catch(() => {});
    return false;
  }

  if (message.type === 'GET_DETECTION') {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, ([tab]) => {
      sendResponse({ payload: tab?.id === undefined ? null : detections.get(tab.id) || null });
    });
    return true;
  }

  return false;
});

chrome.tabs.onRemoved.addListener((tabId) => detections.delete(tabId));