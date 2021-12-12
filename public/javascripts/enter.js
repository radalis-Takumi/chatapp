'use strict';

// 入室メッセージをサーバに送信する

// ユーザ名取得
const userName = $('#userName').val();
const userPass = $('#userPass').val();
const roomNum = $('#roomNum').val();
console.log(userName);
// 入室メッセージイベントを送信する
socket.emit('enterMessageEvent',{message: userName, roomNum: roomNum});
// 入室メンバー管理イベントを送信する
socket.emit('enterEvent',{message: userName, roomNum: roomNum,userPass:userPass});



// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveEnterMessageEvent', function (data) {
    if(roomNum === data.roomNum){
        const date1 = new Date();
        const date2 = '[' + date1.getFullYear() + '/' + 
                    (date1.getMonth() + 1)  + '/' + 
                    date1.getDate() + ' ' + 
                    date1.getHours() + ':' + 
                    date1.getMinutes() + ':' + 
                    date1.getSeconds() + ']';
        
        $('#thread').prepend('<p>' + data.message + 'さんが入室しました:' + date2 + '</p>');
        $('#talk_member').prepend('<li id="mem_' + data.message + '">' + data.message + 'さん</li>');
        
    }
});

// サーバから受信した現在のトークメンバーを画面上に表示する
socket.on('init_receiveEnterMessageEvent', function (data) {
    if(roomNum === data.roomNum){
        for(var i = 0;i < data.member_list.length;i++){
            $('#talk_member').prepend('<li id="mem_' + data.member_list[i] + '">' + data.member_list[i] + 'さん</li>');
        }
    }
});
