import tkuService from "../services/tku-service.js"

const createRamu = async (req, res, next) => {
    try {
        const result = await tkuService.createRamu(req.body, req.user.role, req.user.id_lembaga)
        res.status(200).json({
            code: 200,
            message: "Create ramu success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const createRakit = async (req, res, next) => {
    try {
        const result = await tkuService.createRakit(req.user.role, req.body.id, req.user.id_lembaga)
        res.status(200).json({
            code: 200,
            message: "Create rakit success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const createTerap = async (req, res, next) => {
    try {
        const result = await tkuService.createTerap(req.user.role, req.body.id, req.user.id_lembaga)
        res.status(200).json({
            code: 200,
            message: "Create terap success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getTkk = async (req, res, next) => {
    try {
        const result = await tkuService.getTkk(req.body, req.user.id_lembaga, req.user.role)
        res.status(200).json({
            code: 200,
            message: "Get TKU success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const deleteTku = async (req, res, next) => {
    try {
        await tkuService.deleteTku(req.body, req.user.id_lembaga, req.user.role)
        res.status(200).json({
            code: 200,
            message: "Delete TKU success",
            status: true,
        })
    } catch (error) {
        next(error)
    }
}

export default {
    createRamu,
    createRakit,
    createTerap,
    getTkk,
    deleteTku
}