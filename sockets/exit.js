'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('sendOutEvent', function (data) {
        console.log(data);
        socket.broadcast.emit('receiveOutMessageEvent', data);
    });
};
