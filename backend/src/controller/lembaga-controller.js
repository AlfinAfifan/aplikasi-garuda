import lembagaService from "../services/lembaga-service.js"

const createLembaga = async(req, res, next) => {
    try {
        const result = await lembagaService.createLembaga(req.body, req.user.role)
        res.status(200).json({
            code: 200,
            message: "Create lembaga success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getLembaga = async(req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10)
        const result = await lembagaService.getLembaga(id)
        res.status(200).json({
            code: 200,
            message: "Get lembaga success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getAllLembaga = async (req, res, next) => {
    try {
        const result = await lembagaService.getAllLembaga()
        res.status(200).json({
            code: 200,
            message: "Get all lembaga success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const updateLembaga = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10)
        const result = await lembagaService.updateLembaga(req.body, id, req.user.role)
        res.status(200).json({
            code: 200,
            message: "Update lembaga success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const deleteLembaga = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10)
        const result = await lembagaService.deleteLembaga(id, req.user.role)
        res.status(200).json({
            code: 200,
            message: "Delete lembaga success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

export default {
    createLembaga,
    getLembaga,
    getAllLembaga,
    updateLembaga,
    deleteLembaga
}