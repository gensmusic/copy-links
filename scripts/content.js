function isDownload(url) {
    var reg = /thunder:\/\/.*/
    if (url && reg.test(url)) {
        return true;
    }
    return false;
}

var CHOSEN_LIST = [];

function modifyAllDownloadLinks() {
    $('a').each(function() {
        var that = $(this);
        var url = that.attr('href');
        if (isDownload(url)) {
            console.log(url);
            var btn = $("<input type='button' id='testBtn' value='+'>")
            btn.bind('click', function(url) {
                return function() {
                    console.log(url)
                    if (CHOSEN_LIST.indexOf(url) === -1) {
                        console.log(`add url to list: ${url}`)
                        CHOSEN_LIST.push(url);
                    } else {
                        console.log(`already has this url: ${url}`)
                    }
                    console.log(CHOSEN_LIST)
                }
            }(url))
            btn.css({
                'backgroud-color': '#F44336',
                width: '25px',
                height: '25px',
                'border-radius': '100%',
                background: '#F44336',
                border: 'none',
                outline: 'none',
                color: '#FFF',
                'font-size': '23px',
                // 'box-shadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                transition: '.3s',
                position: 'relative',
                'z-index': 3000
            })
            that.append(btn)
        }
    });
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    console.log("something happening from the extension");
    // var data = request.data || {};
    var data = CHOSEN_LIST;
    console.log(`data is ${JSON.stringify(data)}`)

    sendResponse({data: CHOSEN_LIST, success: true});
});

$(document).ready(function(){
    console.log(`All is ready!!!!!!!!!!!!!!!!!!!!!`)
    modifyAllDownloadLinks();
});