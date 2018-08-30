
window.setInterval(getCheckCopy,1000);
window.setInterval(getCheckAllTag,1000);
window.setInterval(getTitleUrls,1000);

var checkCopy = "";
//オプションで設定したコピーする情報を取得
function getCheckCopy(){
    chrome.storage.local.get('checkCopy', function(res) {
        checkCopy = res.checkCopy;
    });
}

var checkAllTag = "";
//オプションで設定した全タブ取得有無の情報を取得
function getCheckAllTag(){
    chrome.storage.local.get('checkAllTag', function(res) {
        checkAllTag = res.checkAllTag;
    });
}

var titleUrls = "";
//全タブのタイトルとURLを取得
function getTitleUrls() {
    chrome.storage.local.get('titleUrls', function(res) {
        titleUrls = res.titleUrls;
    });
}

document.onkeydown = keyDown;
var isAllTags = false;

function keyDown(e) {
    if (e.key == "x") {
        isAllTags = true;
    }
}

document.addEventListener('copy', function(e){
    // 選択している文字を取得(フォームの選択文字は取得できない)
    var select_word = window.getSelection().toString();

    var active_element = document.activeElement;
    var value = active_element.value;
    var form_select_word = "";
    if (value) {
        // フォームの選択文字を取得する
        var start = parseInt(active_element.selectionStart, 10);
        var end = parseInt(active_element.selectionEnd, 10);
        form_select_word = value.substring(start, end);
    }

    // 文字を選択していない場合
    if (select_word === "" && form_select_word === "") {

        var ua = window.navigator.userAgent.toLowerCase();
        var is_mac = (ua.indexOf("mac") > -1);

        if (is_mac) {
            var new_line_word = "\n";
        } else {
            var new_line_word = "\r\n";
        }

        // 全タブ情報取得
        // オプション設定を1度も変更していない場合、checkAllTagがundefinedになる
        if (isAllTags && (checkAllTag == "allTagOn" || typeof checkAllTag === "undefined") ) {
            var setData = "";
            if (checkCopy == "urlOnly") {
                for (var i = 0; i < titleUrls.length; i++) {
                    setData += titleUrls[i].url + new_line_word;
                }
            } else if (checkCopy == "titleOnly") {
                for (var i = 0; i < titleUrls.length; i++) {
                    setData += titleUrls[i].title + new_line_word;
                }
            } else if (checkCopy == "markdown1") { // マークダウン形式 e.g. [Title](https://example.com "Title")
                // @link https://qiita.com/Qiita/items/c686397e4a0f4f11683d#links---%E3%83%AA%E3%83%B3%E3%82%AF
                // 「リンクテキスト」と「リンクタイトル」の設定を増やす可能性を考慮してmarkdown "1" としています。
                for (var i = 0; i < titleUrls.length; i++) {
                    // setData += '[' + titleUrls[i].title + '](' + titleUrls[i].url + '"' + titleUrls[i].title +'")' + new_line_word;
                    setData += '[' + titleUrls[i].title + '](' + titleUrls[i].url + ')';
                }
            } else {
                for (var i = 0; i < titleUrls.length; i++) {
                    setData += titleUrls[i].title + new_line_word + titleUrls[i].url + new_line_word + new_line_word;
                }
            }
            e.clipboardData.setData("text/plain", setData);

            //正常に全てのタブ情報がコピーされない場合があるため、
            //ユーザビリティ向上のため、正常動作時にアラートを出してユーザに知らせる
            alert("copied all tabs");

        } else {
            //オプションで選択した取得条件に合わせてコピーするものを変える
            if (checkCopy == "urlOnly") {
                e.clipboardData.setData("text/plain", document.URL);
            } else if (checkCopy == "titleOnly") {
                e.clipboardData.setData("text/plain", document.title);
            } else if (checkCopy == "markdown1") { // マークダウン形式
                var the_str = '[' + document.title + '](' + document.URL + ' "' + document.title + '")';
                e.clipboardData.setData("text/plain", the_str);
            } else {
                e.clipboardData.setData("text/plain", document.title + new_line_word + document.URL);
            }
        }

        e.preventDefault();
    }
    isAllTags = false;
});
