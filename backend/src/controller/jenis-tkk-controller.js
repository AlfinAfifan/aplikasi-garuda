import jenisTkkService from "../services/jenis-tkk-service.js"

const createJenisTkk = async (req, res, next) => {
    try {
        const result = await jenisTkkService.createJenisTkk(req.body, req.user.role)
        res.status(200).json({
            code: 200,
            message: "Create jenis TKK success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getJenisTkk = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const result = await jenisTkkService.getJenisTkk(id)
        res.status(200).json({
            code: 200,
            message: "Get jenis TKK success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getAllJenisTkk = async (req, res, next) => {
    try {
        const result = await jenisTkkService.getAllJenisTkk()
        res.status(200).json({
            code: 200,
            message: "Get all jenis TKK success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const updateJenisTkk = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10)
        const result = await jenisTkkService.updateJenisTkk(req.body, id, req.user.role)
        res.status(200).json({
            code: 200,
            message: "Update jenis TKK success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const deleteJenisTkk = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10)
        const result = await jenisTkkService.deleteJenisTkk(id, req.user.role)
        res.status(200).json({
            code: 200,
            message: "Delete jenis TKK success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

export default {
    createJenisTkk,
    getJenisTkk,
    getAllJenisTkk,
    updateJenisTkk,
    deleteJenisTkk
}