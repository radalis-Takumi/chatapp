'use strict';

const member = require("./member");

module.exports = function (socket) {

    // 入室メッセージをクライアントに送信する
    socket.on('enterMessageEvent', function (data) {
        console.log(data);
        // 新しく入ってきた人の名前を送信
        socket.broadcast.emit('receiveEnterMessageEvent', data);
    });

};
