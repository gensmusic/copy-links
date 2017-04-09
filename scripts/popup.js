
function renderStatus(msg) {
    $('#status').text(msg);
}

function sendEvent(event, fnc) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {data: event}, function(response) {
            let data = response.data;
            fnc(data);
        });
    });
}

function copyToClipboard(links) {
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val(links.join('\n')).select();
    document.execCommand("copy");
    $temp.remove();
}

let CHOOSEN_LINKS = [];

$(document).ready(function(){
    renderStatus('点击标记按钮来标记网页上所有的下载链接');

    $('#tagLinks').bind('click', function() {
        renderStatus('正在标记网页中所有的下载链接...');
        sendEvent('tagLinks', function(data) {
            let links = data || [];
            renderStatus(`标记所有的链接完成, 已找到${links.length}个下载资源`)
        })
    })

    $('#copyLinks').bind('click', function() {
        renderStatus('正在获取标记的下载链接');
        sendEvent('copyLinks', function(data) {
            let links = data || [];
            CHOOSEN_LINKS = CHOOSEN_LINKS.concat(links);
            copyToClipboard(CHOOSEN_LINKS);
            renderStatus(`${CHOOSEN_LINKS.length}下载链接已复制到粘贴板`);
        })
    })
});


