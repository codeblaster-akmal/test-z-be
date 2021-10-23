'use strict';

module.exports = (app) => {

    app.get('/', async (req, res, next) => {
        try {
            res.status(200).json({
                'applicationName': 'ZABS_SERVER',
                'status': 'Up',
                'date': new Date()
            });
        } catch (error) {
            next(error);
        }
    });

    app.get('/ping', async (req, res, next) => {
        try {
            res.status(200).send('<h2>Pong</h2>');
        } catch (error) {
            next(error);
        }
    });

};
