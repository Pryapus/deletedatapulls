document.getElementById('deleteButton').addEventListener('click', function() {
    const untilBatchId = document.getElementById('untilBatchId').value;
    chrome.runtime.sendMessage({untilBatchId: untilBatchId});
  });
  