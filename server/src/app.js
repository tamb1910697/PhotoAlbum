const express = require('express');
const cors = require('cors');

const app = express()

const photobookController = require('./controllers/photobook.controller')
const ApiError = require('./api_error')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ 'message': 'Welcome' })
});

app.route('/api/photobooks')
    .get(photobookController.list)
    .post(photobookController.create)
    .delete(photobookController.deleteAll)

app.route('/api/photobooks/favorite')
    .get(photobookController.findAllFavorite)

app.route('/api/photobooks/:id')
    .get(photobookController.read)
    .put(photobookController.update)
    .delete(photobookController.delete)

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'))
})

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal server error'
    })
})

module.exports = app;