'use strict';

var con_Flg = true;

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    const roomNum = $('#roomNum').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();

    // メッセージが未入力でないかチェックする
    if(message && message.match(/\S/g)){
        // 投稿内容を送信
        if(con_Flg){
            socket.emit('sendMessageEvent',{name: userName, message: message, roomNum: roomNum});
            con_Flg = false;
        }
        else{
            alert('連続の投稿はできません');
        }
    }

    // メッセージ入力欄を空にする
    $('#message').val('');
    return false;
}

// ユーザー名によって、投稿のスタイルを変更する
function myMessage_css(){
    const post_class_username = 'message_'+userName;
    var myMessage_html = document.getElementsByClassName(post_class_username);
    console.log(myMessage_html[0]);
    for(let i=0;i<myMessage_html.length;i++){
        myMessage_html[i].style.marginLeft='auto';
        myMessage_html[i].lastElementChild.style.backgroundColor='rgb(183, 255, 74)';
    }
}



// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {

    // ユーザ名を取得
    const userName = $('#userName').val();
    const roomNum = $('#roomNum').val();

    if(roomNum === data.roomNum){
        // 投稿のクラス
        var add_post_class ='';

        const date1 = new Date();
        const date2 = '[' + date1.getFullYear() + '/' + 
                    (date1.getMonth() + 1)  + '/' + 
                    date1.getDate() + ' ' + 
                    date1.getHours() + ':' + 
                    date1.getMinutes() + ':' + 
                    date1.getSeconds() + ']';
    
        //\nを<br>に変換し改行を正しく表示
        var message = data.message.replace(/\n/g, '<br>');
                    
        // 本人かどうかを確認
        if(userName===data.name){
            add_post_class +='message_'+userName
        }
        else{
            con_Flg = true;
        }
    
        var add_obj = '<div class="post ' + add_post_class +'"><p class="post_data">' + data.name +'さん: ' + date2 + '</p><div class="comment">' + message + '</div></div>';
        $('#thread').prepend(add_obj);
        myMessage_css()
    }


});
