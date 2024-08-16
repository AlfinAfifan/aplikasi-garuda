import { ResponseError } from "../error/response-error.js"

const errorMiddleware = async (err, req, res, next) => {
    if(!err) {
        next()
        return
    }

    if(err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message,
            code: err.status,
            status: false
        }).end()
    } else {
        res.status(500).json({
            errors: err.message,
            code: 500,
            status: false
        })
    }
}

export {
    errorMiddleware
}