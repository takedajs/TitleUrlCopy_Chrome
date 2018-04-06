
chrome.storage.local.get('checkCopy', function(res) {
    document.getElementById(res.checkCopy).checked = true;
    setCheckCopy();
});


//ストレージに格納されている情報をラジオボタンに反映
chrome.storage.local.get('checkAllTag', function(res) {
    document.getElementById(res.checkAllTag).checked = true;
    setCheckAllTag();
});

document.getElementById("copy").onchange = setCheckCopy;
document.getElementById("allTag").onchange = setCheckAllTag;

//コピー情報のラジオボタンを変更した時に実行
function setCheckCopy() {
    var copy = document.getElementsByName("copy");

    var checkedCopy = "";
    for (var i = 0; i < copy.length; i++) {
        //チェックした値を取得
        if (copy[i].checked) {
            checkedCopy = copy[i].value;
            break;
        }
    }

    //チェックした要素をストレージに格納
    chrome.storage.local.set({
        'checkCopy': checkedCopy
    });
}

//全タグのラジオボタンを変更した時に実行
function setCheckAllTag() {
    var allTag = document.getElementsByName("allTag");

    var checkedAllTag = "";
    for (var i = 0; i < allTag.length; i++) {
        //チェックした値を取得
        if (allTag[i].checked) {
            checkedAllTag = allTag[i].value;
            break;
        }
    }

    //チェックした要素をストレージに格納
    chrome.storage.local.set({
        'checkAllTag': checkedAllTag
    });
}