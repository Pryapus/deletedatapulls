document.getElementById('deleteButton').addEventListener('click', function() {
    const untilBatchId = document.getElementById('untilBatchId').value;
    const maxBatchId = document.getElementById('maxBatchId').value;
    chrome.runtime.sendMessage({untilBatchId: untilBatchId, maxBatchId: maxBatchId});
  });
  