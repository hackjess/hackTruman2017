import './sync';
import { app } from '../core';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as timesyncServer from 'timesync/server';

app.use(bodyParser.json());
app.use('/timesync', timesyncServer.requestHandler);
app.use('/', express.static(path.resolve('build', 'client')));