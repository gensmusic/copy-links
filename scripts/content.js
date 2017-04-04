function isDownload(url) {
    var reg = /thunder:\/\/.*/
    if (url && reg.test(url)) {
        return true;
    }
    return false;
}

function modifyAllDownloadLinks() {
    $('a').each(function() {
        var that = $(this);
        var url = that.attr('href');
        if (isDownload(url)) {
            console.log(url);
            var btn = $("<input type='button' id='testBtn' value='test'>")
            btn.bind('click', function(url) {
                return function() {
                    alert(url)
                }
            }(url))
            that.append(btn)
        }
    });
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    console.log("something happening from the extension");
    var data = request.data || {};
    console.log(`data is ${JSON.stringify(data)}`)

    sendResponse({data: data, success: true});
});

$(document).ready(function(){
    console.log(`All is ready!!!!!!!!!!!!!!!!!!!!!`)
    modifyAllDownloadLinks();
});