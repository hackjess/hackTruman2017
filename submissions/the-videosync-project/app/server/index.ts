import './routes';

import { app } from './core';

app.listen(process.env.PORT, () => {
    console.log('listening on http://%s:%s', '0.0.0.0', process.env.PORT);
});
