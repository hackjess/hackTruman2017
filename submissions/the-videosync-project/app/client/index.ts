import * as $ from 'jquery';
// import * as socketio from 'socket.io';

import Client from './Client';

let client = new Client('#player');
// client.syncTo({
//     id: 'asdfas',
//     videoId: 'ouyC28ffPjQ',
//     startTime: Date.now() - 30000
// });
// client.join('something');

client.syncDown('eyueldk');
