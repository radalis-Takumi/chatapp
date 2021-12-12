'use strict';

const express = require('express');
const router = express.Router();

// ログイン画面の表示
router.get('/', function(request, response, next) {
    response.render('index');
});

// チャット画面の表示
router.post('/room', function(request, response, next) {
    console.log('ユーザ名：' + request.body.userName);
    console.log('ルーム名：' + request.body.roomNum);
    response.render('room', { userName: request.body.userName, roomNum: request.body.roomNum,userPass:request.body.userPass});
});

module.exports = router;
