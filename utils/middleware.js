const morgan = require('morgan')

morgan.token('content', function (req, res) {
    return [
        JSON.stringify(req.body)
    ]
})

const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :content')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        console.log('errorHandler middleware taking over for CastError!')
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        console.log('errorHandler middleware taking over for ValidationError!')
        return response.status(400).send({ error: error.message })
    }

    next(error)
}

module.exports = {
    morganLogger,
    unknownEndpoint,
    errorHandler
}
