import rekapService from "../services/rekap-service.js"

const getDataRekap = async (req, res, next) => {
    try {
        const result = await rekapService.getDataRekap(req.user.id_lembaga, req.user.role)
        res.status(200).json({
            code: 200,
            message: "Get data rekap success",
            status: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getDataSummary = async (req, res, next) => {
    try {
        const result = await rekapService.dataSummary(req.user.id_lembaga, req.user.role)
        res.status(200).json({
            code: 200,
            message: "Get data summary success",
            status: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export default {
    getDataRekap,
    getDataSummary
}