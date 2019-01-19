const notificationId = 'crushNotif';
var shortUrl;

function crushLink(tab) {

  var url = 'http://cpc.cx/';
  var params = 'long_link=' + tab.url;


  fetch('http://cpc.cx/', {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: params
  }).then((response) => {
    return response.text();

  }).then((html) => {
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(html, "text/html");
    shortUrl = htmlDocument.getElementsByClassName("inputext")[0].value;
    navigator.clipboard.writeText(shortUrl);

  }).then(() => {
    console.log("copy");
    return browser.notifications.create('', {
      "type": 'basic',
      "title": 'Link crushed!',
      "message": shortUrl  + ' copied to clipboard'
    });
  }).then((id) => {
    console.log("Notif");
    setTimeout(() => {
      browser.notifications.clear(id);
    }, 2000);
  }).catch((error) => {
    console.log("CPC Crusher error: " + error);
  });
}

browser.browserAction.onClicked.addListener(crushLink);
