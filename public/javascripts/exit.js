'use strict';

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    const userName = $('#userName').val();
    const roomNum = $('#roomNum').val();
    // 退室メッセージイベントを送信する
    socket.emit('sendOutEvent',{message: userName, roomNum: roomNum});

    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('receiveOutMessageEvent', function (data) {
    const roomNum = $('#roomNum').val();
    if(roomNum === data.roomNum){
        const date1 = new Date();
        const date2 = '[' + date1.getFullYear() + '/' + 
                    (date1.getMonth() + 1)  + '/' + 
                    date1.getDate() + ' ' + 
                    date1.getHours() + ':' + 
                    date1.getMinutes() + ':' + 
                    date1.getSeconds() + ']';
        $('#thread').prepend('<p>' + date2 + ' ' + data.message  + 'さんが退出しました' + '</p>');
        $('#mem_' + data.message).remove();
    }
});