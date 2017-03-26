import * as $ from 'jquery';
import * as timesync from 'timesync';
import * as YTPlayer from 'yt-player';
import * as Promise from 'promise-js';
import SyncModel from '../shared/models/SyncModel';

export default class Client {
    
    private _ts;
    private _player: YTPlayer;
    private _sync: SyncModel;
    
    private _isSyncPending: boolean;
    
    constructor(playerSelector: string) {
        this._player = new YTPlayer(playerSelector);
        this._ts = timesync.create({ server: '/timesync', interval: null });
        
        this._player.on('playing', $.proxy(this._onYTPlaying, this));
        this._ts.on('sync', $.proxy(this._onTimeSync, this));
    }
    
    // create(group: SyncGroup)
    
    // join(id: string) {
    //     $.get(`/sync/${groupId}`, (data: SyncModel) => this.syncTo(data));
    // }
    
    syncTo(data: SyncModel): void {
        this._sync = data;  // update sync data
        this._isSyncPending = true;
        this._syncTime();
    }
    
    syncUp(sync: SyncModel): void {
        $.post('/sync', sync);
    }
    
    syncDown(id: string): void {
        $.get(`/sync/${id}`, (sync: SyncModel) => {
            this.syncTo(sync);
        });
    }
    
    private _syncTime(): void {
        this._ts.sync();
    }
    
    private _syncPlayer(): void {
        this._player.load(this._sync.videoId);
        this._player.play();
    }
    
    private _seekAheadAndWait(seekTo: number, offset: number = 3): void {

        this._player.pause();
        let seconds = seekTo + offset;
        this._player.seek(seconds);
        setTimeout(() => {
            this._player.play();
            console.log('player synced to %s', seconds);
        }, offset * 1000);
    }

    private _onTimeSync(state: 'start'|'end') {
        if (state == 'end') {
            this._syncPlayer();
            console.log('time sync completed. %s', this._ts.now());
        }
    }
    
    private _onYTPlaying() {
        if (this._isSyncPending) {
            this._isSyncPending = false;
            let seconds = (this._ts.now() - this._sync.startTime) / 1000;
            this._seekAheadAndWait(seconds);
        }
    }
}


