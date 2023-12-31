// Define the base URL for the deletion operation
const baseUrl = 'https://www.analytics-toolkit.com/tools/testhub/ajax/dbTestData.php?action=delete&testId=';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const untilBatchId = parseInt(request.untilBatchId, 10);
  const maxBatchId = parseInt(request.maxBatchId, 10);

  // Extract the current testId from the URL of the page the user is visiting
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const url = new URL(tabs[0].url);
    const pathSegments = url.pathname.split('/');
    const listDataIndex = pathSegments.indexOf('listData');
    const currentTestId = listDataIndex !== -1 ? parseInt(pathSegments[listDataIndex + 1], 10) : null;

    if (currentTestId) {
      // Get the PHPSESSID cookie
      chrome.cookies.get({url: 'https://www.analytics-toolkit.com', name: 'PHPSESSID'}, function(cookie) {
        const phpSessionId = cookie.value;

        // Delete datapulls for each batchId from the maxBatchId down to the untilBatchId
        for (let batchId = maxBatchId; batchId >= untilBatchId; batchId--) {
          // Construct the URL for the deletion operation
          const url = baseUrl + currentTestId + '&batchId=' + batchId;

          // Perform the deletion operation
          fetch(url, {
            method: 'GET',
            headers: {
              'authority': 'www.analytics-toolkit.com',
              'accept': '*/*',
              'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,de;q=0.7',
              'Cookie': 'PHPSESSID=' + phpSessionId
              // Add other headers as necessary
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(text => console.log('Response:', text))
          .catch(error => console.log('Error:', error));
        }
      });
    } else {
      console.log('Could not extract testId from URL');
    }
  });
});
