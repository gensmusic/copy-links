function isDownload(url) {
    var reg = /thunder:\/\/.*|magnet:?.*/
    if (url && reg.test(url)) {
        return true;
    }
    return false;
}

let CHOSEN_LIST = new Set();
let ALL_LINKS = new Set();

function insertScreen() {
    let docWidth = $(document).width();
    let docHeight = $(document).height();
    $(`<div class="screen" style="
        position: absolute;
        width: ${docWidth}px;
        height: ${docHeight}px;
        margin: 0px;
        top: 0px;
        left: 0px;
        z-index: 3000; "></div>`).appendTo('body');
    // add css
    $(`<style>
        .copyLinksaddButton {
            position: absolute;
            background-size: 100%;
            background-repeat: no-repeat;
            width: 30px;
            height: 30px;
            border-radius: 100%;
            border: none;
            outline: none;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }
    </style>`).appendTo('head');
}

function newButton(top, left, url) {
    ALL_LINKS.add(url);
    let btn = $(`<buntton downloadUrl="${url}" class="copyLinksaddButton"></>`);
    btn.css("top", `${top}px`);
    btn.css("left", `${left}px`);
    let plusUrl = chrome.extension.getURL('images/plus.png');
    let minusUrl = chrome.extension.getURL('images/minus.png');
    btn.css('background-image', `url(${plusUrl})`);

    btn.bind('click', function() {
        let bg = $(this).css('background-image');
        if (bg.indexOf(plusUrl) !== -1) {
            $('.copyLinksaddButton').each(function() {
                if ($(this).attr('downloadUrl') === url) {
                    $(this).css('background-image', `url(${minusUrl})`);
                }
            })
            CHOSEN_LIST.add(url);
        } else {
            $('.copyLinksaddButton').each(function() {
                if ($(this).attr('downloadUrl') === url) {
                    $(this).css('background-image', `url(${plusUrl})`);
                }
            })
            CHOSEN_LIST.delete(url);
        }
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
    var event = request.data || {};
    switch (event) {
        case 'tagLinks':
            insertScreen();
            modifyAllDownloadLinks();
            sendResponse({data: Array.from(ALL_LINKS), success: true});
            break;
        case 'copyLinks':
            sendResponse({data: Array.from(CHOSEN_LIST), success: true})
            break;
        case 'cleanLinks':
            break;
        default:
            console.log(`Unknown event: ${event}`);
            break;
    }
});

$(document).ready(function(){
    console.log(`All is ready!!!!!!!!!!!!!!!!!!!!!`)
});