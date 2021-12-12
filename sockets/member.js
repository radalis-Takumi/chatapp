'use strict';

var member_list = {Room1:[], Room2:[], Room3:[]}
// パスワードリスト(メンバーリスト関連の処理を直さなくて良いよう、別に作りました。)
var userPass_list = {Room1:[], Room2:[], Room3:[]}

module.exports = function (socket) {

    socket.on('enterEvent', function (data) {
        console.log(data)
        // 現在トークルームにいる人の名前を送信
        socket.emit('init_receiveEnterMessageEvent', {member_list: member_list[data.roomNum], roomNum: data.roomNum});
        member_list[data.roomNum].push(data.message);
        userPass_list[data.roomNum].push(data.userPass);
    });
    // 退室したメンバーをリストから削除
    socket.on('sendOutEvent', function (data) {
        var exit_mem_i = member_list[data.roomNum].indexOf(data.message);
        member_list[data.roomNum].splice(exit_mem_i, 1);
        userPass_list[data.roomNum].splice(exit_mem_i, 1);
    });

    // 入室予定のメンバーと同じ名前がないか確認
    socket.on('Pre_enterEvent', function (data) {
        var result = member_list[data.roomNum].indexOf(data.userName);
        console.log(userPass_list[result]);
        if(result === -1){
            socket.emit('Pre_EnterMessageEvent', 'OK');
        }
        else{
            if(userPass_list[data.roomNum][result] === data.userPass){
                socket.emit('Pre_EnterMessageEvent', 'OK');
            }else{
                socket.emit('Pre_EnterMessageEvent', 'NG');
            }
        }
    });
};