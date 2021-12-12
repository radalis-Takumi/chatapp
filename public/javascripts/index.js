'use strict';

// チャットルームに入室する
function enter() {
    // 入力されたユーザ名を取得する
    const userName = $('#userName').val();
    const roomNum = $('#roomNum').val();
    const userPass = $('#userPass').val();
    // ユーザ名が未入力でないかチェックする
    if(userName != ''){
        // 同じユーザー名確認イベント
        socket.emit('Pre_enterEvent',{userName: userName, roomNum: roomNum,userPass:userPass});

    }else{
        alert('ユーザー名が未入力です');
    }
}

// 入室許可イベント
socket.on('Pre_EnterMessageEvent', function (data) {
    if(data === 'OK'){
        $('form').submit();
    }
    else{
        alert('同じユーザー名がすでに存在するか、パスワードが間違っています。');
    }
});
