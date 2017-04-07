function isDownload(url) {
    var reg = /thunder:\/\/.*/
    if (url && reg.test(url)) {
        return true;
    }
    return false;
}

var CHOSEN_LIST = [];

function insertScreen() {
    let docWidth = $(document).width();
    let docHeight = $(document).height();
    let d = $(`<div
    class="screen"
    style="
        position: absolute;
        width: ${docWidth}px;
        height: ${docHeight}px;
        margin: 0px;
        top: 0px;
        left: 0px;
        z-index: 3000;
    "></div>`)
    $('body').append(d);
}

function modifyAllDownloadLinks() {
    let screen = $('.screen');
    let screenTop = screen.offset().top;
    let screenLeft = screen.offset().left;
    $('a').each(function() {
        let that = $(this);
        let url = that.attr('href');
        if (isDownload(url)) {
            let btn = $(`<i style="
                position: absolute;
                font-size: 18px;
                color: '#FFF';
                border: none;
                background: #F44336;
                display: block;
                width: 20px;
                height: 20px;
                top: ${that.offset().top - screenTop}px;
                left: ${that.offset().left - screenLeft}px;
                border-radius: 50%;
                z-index: 3000;
            ">+</i>`)
            btn.bind('click', function() {
                if (CHOSEN_LIST.indexOf(url) === -1) {
                    console.log(`add url to list: ${url}`)
                    CHOSEN_LIST.push(url);
                } else {
                    console.log(`already has this url: ${url}`)
                }
                console.log(CHOSEN_LIST)
            });
            screen.append(btn)
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
    insertScreen();
    modifyAllDownloadLinks();
});