// 全タブのタイトルとURLをストレージに保存する
function setTitleUrls(tabs) {
    var titleUrls = [];
    for (var i = 0; i < tabs.length; i++){
        titleUrls[i] = {
            "title": tabs[i].title,
            "url": tabs[i].url
        }
    }

    //ストレージに保存
    chrome.storage.local.set({
        'titleUrls': titleUrls
    });
}

window.setInterval(
    function(){
        chrome.tabs.query({},setTitleUrls);
    },
    1000
);