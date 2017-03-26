import * as chance from 'chance';

import { app } from '../core';
import SyncModel from '../../shared/models/SyncModel';

const syncs = {
    'eyueldk': {
        id: 'eyueldk',
        videoId: '2Tvy_Pbe5NA',
        startTime: Date.now()
    }
};

app.post('/sync', (req, res) => {
    let sync = new SyncModel();
    sync.id = req.body.id;
    sync.videoId = req.body.videoId;
    sync.startTime = req.body.startTime;
    syncs[sync.id] = sync;
});

app.get('/sync/:id', (req, res) => {
    let id = req.params.id;
    res.send(syncs[id]);
});