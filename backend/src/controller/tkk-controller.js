import tkkService from "../services/tkk-service.js"


const createPurwa = async (req, res, next) => {
    try {
        const result = await tkkService.createPurwa(req.body, req.user.role, req.user.id_lembaga)
        res.status(200).json({
            code: 200,
            message: "Create purwa success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const createMadya = async (req, res, next) => {
    try {
        const result = await tkkService.createMadya(req.user.role, req.body.id, req.user.id_lembaga)
        res.status(200).json({
            code: 200,
            message: "Create madya success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const createUtama = async (req, res, next) => {
    try {
        const result = await tkkService.createUtama(req.user.role, req.body.id, req.user.id_lembaga)
        res.status(200).json({
            code: 200,
            message: "Create utama success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getTkk = async (req, res, next) => {
    try {
        const result = await tkkService.getTkk(req.body, req.user.id_lembaga, req.user.role)
        res.status(200).json({
            code: 200,
            message: "Get TKK success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const deleteTkk = async (req, res, next) => {
    try {
        await tkkService.deleteTkk(req.body, req.user.id_lembaga, req.user.role)
        res.status(200).json({
            code: 200,
            message: "Delete TKK success",
            status: true,
        })
    } catch (error) {
        next(error)
    }
}

export default {
    createPurwa,
    createMadya,
    createUtama,
    getTkk,
    deleteTkk
}