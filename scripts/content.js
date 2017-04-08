function isDownload(url) {
    var reg = /thunder:\/\/.*|magnet:?.*/
    if (url && reg.test(url)) {
        return true;
    }
    return false;
}

let CHOSEN_LIST = new Set();

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

    // add css
    $(`<style>
    .copyLinksaddButton {
        position: absolute;
        background-color: #F44336;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        background: #F44336;
        border: none;
        outline: none;
        color: #FFF;
        font-size: 20px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        transition: .3s;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .copyLinksaddButton:focus {
        transform:scale(1.1);
        transform:rotate(45deg);
        -ms-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }
    </style>`).appendTo('head')
}

function newButton(top, left, url) {
    let btn = $(`<buntton class="copyLinksaddButton">+</>`);
    btn.css("top", `${top}px`);
    btn.css("left", `${left}px`);

    btn.bind('click', function() {
        if (btn.text() == '+') {
            CHOSEN_LIST.add(url);
            btn.text('-')
        } else {
            CHOSEN_LIST.delete(url);
            btn.text('+')
        }
        console.log(CHOSEN_LIST)
    });
    return btn;
}

function modifyAllDownloadLinks() {
    let screen = $('.screen');
    let screenTop = screen.offset().top;
    let screenLeft = screen.offset().left;

    $('a').each(function() {
        let that = $(this);
        let url = that.attr('href');
        if (isDownload(url)) {
            let top = that.offset().top - screenTop;
            let left = that.offset().left - screenLeft;
            screen.append(newButton(top, left, url))
        }
    });
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    console.log("something happening from the extension");
    // var data = request.data || {};
    var data = CHOSEN_LIST;
    console.log(`data is ${JSON.stringify(data)}`)
    insertScreen();
    modifyAllDownloadLinks();
    sendResponse({data: CHOSEN_LIST, success: true});
});

$(document).ready(function(){
    console.log(`All is ready!!!!!!!!!!!!!!!!!!!!!`)

});