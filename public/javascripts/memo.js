'use strict';

// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();

    const date1 = new Date();
    const date2 = '[' + date1.getFullYear() + '/' + 
				(date1.getMonth() + 1)  + '/' + 
				date1.getDate() + ' ' + 
				date1.getHours() + ':' + 
				date1.getMinutes() + ':' + 
				date1.getSeconds() + ']';

    // メッセージが未入力でないかチェックする
    if(message && message.match(/\S/g)){
        // メモの内容を表示
        var rep_message = message.replace(/\n/g, '<br>');
        var add_obj = '<div class="post memo"><p class="post_data">' + userName + 'さんのメモ: ' + date2 + '<div class="comment memo_bub">' + rep_message + '</div></p></div>';
        $('#thread').prepend(add_obj);
    }

    // メッセージ入力欄を空にする
    $('#message').val('');

    return false;
}
