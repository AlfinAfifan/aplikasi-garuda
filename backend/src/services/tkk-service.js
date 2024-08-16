import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createTkkValidation, generalTkkValidation } from "../validation/tkk-validation.js"
import { validate } from "../validation/validation.js"
import moment from "moment"

const createPurwa = async (req, role, idLembaga) => {
    req.purwa = true
    req.tgl_purwa = new Date()
    const data = validate(createTkkValidation, req)

    let where
    if(role === "super_admin") {
        where = {
            id: data.id_anggota,
            tku: {
                some: {
                    rakit: true
                }
            }
        }
    } else {
        where = {
            id: data.id_anggota,
            id_lembaga: idLembaga,
            tku: {
                some: {
                    rakit: true
                }
            }
        }
    }

    const checkAnggota = await prismaClient.anggota.count({
        where
    })
    if(checkAnggota !== 1) {
        throw new ResponseError(404, "Anggota not found")
    }

    return prismaClient.tkk.create({
        data,
        select: {
            id: true,
            no_sk: true,
            id_anggota: true,
            purwa: true,
            tgl_purwa: true
        }
    })
}

const createMadya = async (role, id, idLembaga) => {
    const dataTku = await prismaClient.tkk.findUnique({
        where: {
            id
        }
    })

    if(!dataTku) {
        throw new ResponseError(404, "Data not found")
    }

    if(dataTku.purwa !== true) {
        throw new ResponseError(400, "Belum selesai purwa")
    }

    const tglPurwa = moment(dataTku.tgl_purwa);
    if(moment().diff(tglPurwa, 'days') <= 30) {
        throw new ResponseError(400, "Jarak minimum update 30 hari")
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
        madya : true,
        tgl_madya : new Date()
    }

    return prismaClient.tkk.update({
        where: {
            id: dataTku.id
        },
        data,
        select: {
            id: true,
            no_sk: true,
            id_anggota: true,
            madya: true,
            tgl_madya: true
        }
    })
}

const createUtama = async (role, id, idLembaga) => {
    const dataTku = await prismaClient.tkk.findUnique({
        where: {
            id
        }
    })

    if(!dataTku) {
        throw new ResponseError(404, "Data not found")
    }

    if(dataTku.madya !== true) {
        throw new ResponseError(400, "Belum selesai purwa")
    }

    const tglMadya = moment(dataTku.tgl_madya);
    if(moment().diff(tglMadya, 'days') <= 100) {
        throw new ResponseError(400, "Jarak minimum update 30 hari")
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
        utama : true,
        tgl_utama : new Date()
    }

    return prismaClient.tkk.update({
        where: {
            id: dataTku.id
        },
        data,
        select: {
            id: true,
            no_sk: true,
            id_anggota: true,
            utama: true,
            tgl_utama: true
        }
    })
}

const getTkk = async(req, idLembaga, role) => {
    const data = validate(generalTkkValidation, req)
    
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

    if(data.type === "purwa") {
        whereGetAll = {
            ...whereGetAll,
            purwa: true
        }

        whereGetById = {
            ...whereGetById,
            purwa: true
        }

        select = {
            id: true,
            no_sk: true,
            purwa: true,
            tgl_purwa: true,
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
    } else if(data.type === "madya") {
        whereGetAll = {
            ...whereGetAll,
            madya: true
        }

        whereGetById = {
            ...whereGetById,
            madya: true
        }

        select = {
            id: true,
            no_sk: true,
            madya: true,
            tgl_madya: true,
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
    } else if(data.type === "utama") {
        whereGetAll = {
            ...whereGetAll,
            utama: true
        }

        whereGetById = {
            ...whereGetById,
            utama: true
        }

        select = {
            id: true,
            no_sk: true,
            utama: true,
            tgl_utama: true,
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
            purwa: true,
            tgl_purwa: true,
            madya: true,
            tgl_madya: true,
            utama: true,
            tgl_utama: true,
            nama_penguji: true,
            jabatan_penguji: true,
            alamat_penguji: true,
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
            },
            jenis_tkk: {
                select: {
                    id: true,
                    nama: true
                }
            }
        }
    }

    let result
    if(!data.id) {
        result = await prismaClient.tkk.findMany({
            where: whereGetAll,
            select
        })
    } else {
        result = await prismaClient.tkk.findUnique({
            where: whereGetById,
            select
        })
    }

    if (!result) {
        throw new ResponseError(400, "Data not found")
    } else {
        return result
    }
}

const deleteTkk = async(req, idLembaga, role) => {
    const data = validate(generalTkkValidation, req)

    const dataTku = await prismaClient.tkk.findUnique({
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
    if(data.type === "madya") {
        dataUpdate = {
            madya: false,
            utama: false,
            tgl_madya: null,
            tgl_utama: null
        }
    } else if(data.type === "utama") {
        dataUpdate = {
            utama: false,
            tgl_utama: null
        }
    }

    if(data.type === "purwa") {
        return prismaClient.tkk.delete({
            where,
            select: {
                id: true
            }
        })
    } else {
        return prismaClient.tkk.update({
            where,
            data: dataUpdate,
            select: {
                id: true
            }
        })
    }
}

export default {
    createPurwa,
    createMadya,
    createUtama,
    getTkk,
    deleteTkk
}