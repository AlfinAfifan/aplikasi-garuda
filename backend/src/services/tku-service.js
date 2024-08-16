import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createTkuValidation, generalTkuValidation } from "../validation/tku-validation.js"
import { validate } from "../validation/validation.js"
import moment from "moment"

const createRamu = async (req, role, idLembaga) => {
    req.ramu = true
    req.tgl_ramu = new Date()
    const data = validate(createTkuValidation, req)

    let where
    if(role === "super_admin") {
        where = {
            id: data.id_anggota
        }
    } else {
        where = {
            id: data.id_anggota,
            id_lembaga: idLembaga
        }
    }

    const checkAnggota = await prismaClient.anggota.count({
        where
    })
    if(checkAnggota !== 1) {
        throw new ResponseError(404, "Anggota not found")
    }

    return prismaClient.tku.create({
        data,
        select: {
            id: true,
            no_sk: true,
            id_anggota: true,
            ramu: true,
            tgl_ramu: true
        }
    })
}

const createRakit = async (role, id, idLembaga) => {
    const dataTku = await prismaClient.tku.findUnique({
        where: {
            id
        }
    })

    if(!dataTku) {
        throw new ResponseError(404, "Data not found")
    }

    if(dataTku.ramu !== true) {
        throw new ResponseError(400, "Belum selesai ramu")
    }

    const tglRamu = moment(dataTku.tgl_ramu);
    if(moment().diff(tglRamu, 'days') <= 100) {
        throw new ResponseError(400, "Jarak minimum update 100 hari")
    }

    let where
    if(role === "super_admin") {
        where = {
            id: dataTku.id_anggota
        }
    } else {
        where = {
            id: dataTku.id_anggota,
            id_lembaga: idLembaga
        }
    }
    const checkAnggota = await prismaClient.anggota.count({
        where
    })
    if(checkAnggota !== 1) {
        throw new ResponseError(404, "Anggota not found")
    }

    const data = {
        rakit : true,
        tgl_rakit : new Date()
    }

    return prismaClient.tku.update({
        where: {
            id: dataTku.id
        },
        data,
        select: {
            id: true,
            no_sk: true,
            id_anggota: true,
            rakit: true,
            tgl_rakit: true
        }
    })
}

const createTerap = async (role, id, idLembaga) => {
    const dataTku = await prismaClient.tku.findUnique({
        where: {
            id
        }
    })

    if(!dataTku) {
        throw new ResponseError(404, "Data not found")
    }

    if(dataTku.rakit !== true) {
        throw new ResponseError(400, "Belum selesai ramu")
    }

    const tglRakit = moment(dataTku.tgl_rakit);
    if(moment().diff(tglRakit, 'days') <= 100) {
        throw new ResponseError(400, "Jarak minimum update 100 hari")
    }

    let where
    if(role === "super_admin") {
        where = {
            id: dataTku.id_anggota
        }
    } else {
        where = {
            id: dataTku.id_anggota,
            id_lembaga: idLembaga
        }
    }
    const checkAnggota = await prismaClient.anggota.count({
        where
    })
    if(checkAnggota !== 1) {
        throw new ResponseError(404, "Anggota not found")
    }

    const data = {
        terap : true,
        tgl_terap : new Date()
    }

    return prismaClient.tku.update({
        where: {
            id: dataTku.id
        },
        data,
        select: {
            id: true,
            no_sk: true,
            id_anggota: true,
            terap: true,
            tgl_terap: true
        }
    })
}

const getTkk = async(req, idLembaga, role) => {
    const data = validate(generalTkuValidation, req)
    
    let whereGetAll
    let whereGetById
    let select
    if(role === "super_admin") {
        whereGetAll = {}

        whereGetById = {
            id: data.id
        }
    } else {
        whereGetAll = {
            anggota: {
                id_lembaga: idLembaga
            }
        }

        whereGetById = {
            id: data.id,
            anggota: {
                id_lembaga: idLembaga
            }
        }
    }

    if(data.type === "ramu") {
        whereGetAll = {
            ...whereGetAll,
            ramu: true
        }

        whereGetById = {
            ...whereGetById,
            ramu: true
        }

        select = {
            id: true,
            no_sk: true,
            ramu: true,
            tgl_ramu: true,
            anggota: {
                select: {
                    id: true,
                    nama: true,
                    lembaga: {
                        select: {
                            id: true,
                            nama_lembaga: true
                        }
                    }
                }
            }
        }
    } else if(data.type === "rakit") {
        whereGetAll = {
            ...whereGetAll,
            rakit: true
        }

        whereGetById = {
            ...whereGetById,
            rakit: true
        }

        select = {
            id: true,
            no_sk: true,
            rakit: true,
            tgl_rakit: true,
            anggota: {
                select: {
                    id: true,
                    nama: true,
                    lembaga: {
                        select: {
                            id: true,
                            nama_lembaga: true
                        }
                    }
                }
            }
        }
    } else if(data.type === "terap") {
        whereGetAll = {
            ...whereGetAll,
            terap: true
        }

        whereGetById = {
            ...whereGetById,
            terap: true
        }

        select = {
            id: true,
            no_sk: true,
            terap: true,
            tgl_terap: true,
            anggota: {
                select: {
                    id: true,
                    nama: true,
                    lembaga: {
                        select: {
                            id: true,
                            nama_lembaga: true
                        }
                    }
                }
            }
        }
    } else {
        select = {
            id: true,
            no_sk: true,
            ramu: true,
            tgl_ramu: true,
            rakit: true,
            tgl_rakit: true,
            terap: true,
            tgl_terap: true,
            anggota: {
                select: {
                    id: true,
                    nama: true,
                    lembaga: {
                        select: {
                            id: true,
                            nama_lembaga: true
                        }
                    }
                }
            }
        }
    }

    let result
    if(!data.id) {
        result = await prismaClient.tku.findMany({
            where: whereGetAll,
            select
        })
    } else {
        result = await prismaClient.tku.findUnique({
            where: whereGetById,
            select
        })
    }

    if(!result) {
        throw new ResponseError(400, "Data not found")
    } else {
        return result
    }
}

const deleteTku = async(req, idLembaga, role) => {
    const data = validate(generalTkuValidation, req)

    const dataTku = await prismaClient.tku.findUnique({
        where: {
            id: data.id
        }
    })

    if(!dataTku) {
        throw new ResponseError(404, "Data not found")
    }

    let whereForAnggota
    if(role === "super_admin") {
        whereForAnggota = {
            id: dataTku.id_anggota
        }
    } else {
        whereForAnggota = {
            id: dataTku.id_anggota,
            id_lembaga: idLembaga
        }
    }
    const checkAnggota = await prismaClient.anggota.count({
        where: whereForAnggota
    })
    if(checkAnggota !== 1) {
        throw new ResponseError(404, "Anggota not found")
    }

    let where
    if(role === "super_admin") {
        where = {
            id: data.id,
        }
    } else {
        where = {
            id: data.id,
            anggota: {
                id_lembaga: idLembaga
            }
        }
    }

    let dataUpdate
    if(data.type === "rakit") {
        dataUpdate = {
            rakit: false,
            terap: false,
            tgl_rakit: null,
            tgl_terap: null
        }
    } else if(data.type === "terap") {
        dataUpdate = {
            terap: false,
            tgl_terap: null
        }
    }

    if(data.type === "ramu") {
        return prismaClient.tku.delete({
            where,
            select: {
                id: true
            }
        })
    } else {
        return prismaClient.tku.update({
            where,
            data: dataUpdate,
            select: {
                id: true
            }
        })
    }
}

export default {
    createRamu,
    createRakit,
    createTerap,
    getTkk,
    deleteTku
}