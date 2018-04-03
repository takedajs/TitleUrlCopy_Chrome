//コピー情報のラジオボタンを変更した時に実行
document.getElementById("copy").onchange = function(){
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
    browser.storage.local.set({
        'checkCopy': checkedCopy
    });
}

//ストレージに格納されている情報をラジオボタンに反映
browser.storage.local.get('checkCopy', function(res) {
    document.getElementById(res.checkCopy).checked = true;
});


//全タグのラジオボタンを変更した時に実行
document.getElementById("allTag").onchange = function(){
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
    browser.storage.local.set({
        'checkAllTag': checkedAllTag
    });
}

//ストレージに格納されている情報をラジオボタンに反映
browser.storage.local.get('checkAllTag', function(res) {
    document.getElementById(res.checkAllTag).checked = true;
});