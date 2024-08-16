import anggotaService from "../services/anggota-service.js"

const createAnggota = async (req, res, next) => {
    try {
        const result = await anggotaService.createAnggota(req.body, req.user.id_lembaga, req.user.role)
        res.status(200).json({
            code: 200,
            message: "Create anggota success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getAnggota = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10)
        const result = await anggotaService.getAnggota(id, req.user.id_lembaga, req.user.role)
        res.status(200).json({
            code: 200,
            message: "Get anggota success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getAllAnggota = async (req, res, next) => {
    try {
        const result = await anggotaService.getAllAnggota(req.user.id_lembaga, req.user.role)
        res.status(200).json({
            code: 200,
            message: "Get all anggota success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const updateAnggota = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10)
        const dataUser = req.user
        const result = await anggotaService.updateAnggota(req.body, id, dataUser.id_lembaga, dataUser.role)
        res.status(200).json({
            code: 200,
            message: "Update anggota success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const deleteAnggota = async(req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10)
        const dataUser = req.user
        const result = await anggotaService.deleteAnggota(id, dataUser.id_lembaga, dataUser.role)
        res.status(200).json({
            code: 200,
            message: "Delete anggota success",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

export default {
    createAnggota,
    getAnggota,
    getAllAnggota,
    updateAnggota,
    deleteAnggota
}