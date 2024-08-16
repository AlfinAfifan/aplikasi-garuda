import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createAnggotaValidation, updateAnggotaValidation } from "../validation/anggota-validation.js"
import { validate } from "../validation/validation.js"

const createAnggota = async (req, idLembaga, role) => {
    if(role !== "super_admin") {
        const totalLembaga = await prismaClient.lembaga.count({
            where: {
                id: idLembaga
            }
        })
        if(totalLembaga !== 1) {
            throw new ResponseError(404, "Lembaga not found")
        }
        
        req.id_lembaga = idLembaga
    }
    const data = validate(createAnggotaValidation, req)

    return prismaClient.anggota.create({
        data,
        select: {
            id: true,
            nama: true,
            id_lembaga: true
        }
    })
}

const getAnggota = async (id, idLembaga, role) => {
    let where
    if(role === "super_admin") {
        where = {
            id
        }
    } else {
        where = {
            id,
            id_lembaga: idLembaga
        }
    }
    
    const anggota = await prismaClient.anggota.findUnique({
        where,
        select: {
            id: true,
            nama: true,
            lembaga: {
                select: {
                    id: true,
                    nama_lembaga: true
                }
            },
            no_induk: true,
            nta: true,
            tmpt_lahir: true,
            tgl_lahir: true,
            gender: true,
            agama: true,
            warga: true,
            rt: true,
            rw: true,
            desa_kelurahan: true,
            kecamatan: true,
            kab_kota: true,
            provinsi: true,
            no_telp: true,
            bakat_hobi: true,
            nama_ayah: true,
            tmpt_lahir_ayah: true,
            tgl_lahir_ayah: true,
            nama_ibu: true,
            tmpt_lahir_ibu: true,
            tgl_lahir_ibu: true,
            no_telp_ortu: true,
            alamat_ortu: true,
            tgl_masuk_pangkalan: true,
            tingkat_masuk_pangkalan: true,
            tgl_keluar_pangkalan: true,
            alasan_keluar: true,
            createdAt: true,
            updatedAt: true
        }
    })

    if(!anggota) {
        throw new ResponseError(404, "Data not found")
    }

    return anggota
}

const getAllAnggota = async (idLembaga, role) => {
    let where
    if(role !== "super_admin") {
        where = {
            id_lembaga: idLembaga
        }
    }
    
    const anggota = await prismaClient.anggota.findMany({
        where,
        select: {
            id: true,
            nama: true,
            lembaga: {
                select: {
                    id: true,
                    nama_lembaga: true
                }
            },
            no_induk: true,
            nta: true,
            tmpt_lahir: true,
            tgl_lahir: true,
            gender: true,
            agama: true,
            warga: true,
            rt: true,
            rw: true,
            desa_kelurahan: true,
            kecamatan: true,
            kab_kota: true,
            provinsi: true,
            no_telp: true,
            bakat_hobi: true,
            nama_ayah: true,
            tmpt_lahir_ayah: true,
            tgl_lahir_ayah: true,
            nama_ibu: true,
            tmpt_lahir_ibu: true,
            tgl_lahir_ibu: true,
            no_telp_ortu: true,
            alamat_ortu: true,
            tgl_masuk_pangkalan: true,
            tingkat_masuk_pangkalan: true,
            tgl_keluar_pangkalan: true,
            alasan_keluar: true,
            createdAt: true,
            updatedAt: true,
        }
    })

    if(!anggota) {
        throw new ResponseError(404, "Data not found")
    }

    return anggota
}

const updateAnggota = async (req, id, idLembaga, role) => {
    let where
    if(role === "super_admin") {
        where = {
            id
        }
    } else {
        where = {
            id,
            id_lembaga: idLembaga
        }

        const totalLembaga = await prismaClient.lembaga.count({
            where: {
                id: idLembaga
            }
        })
        if(totalLembaga !== 1) {
            throw new ResponseError(404, "Lembaga not found")
        }
        
        req.id_lembaga = idLembaga
    }

    const totalAnggota = await prismaClient.anggota.count({
        where
    })
    if(totalAnggota !== 1) {
        throw new ResponseError(404, "Data not found")
    }

    const data = validate(updateAnggotaValidation, req)

    return prismaClient.anggota.update({
        where: {
            id
        },
        data,
        select: {
            id: true,
            nama: true,
            id_lembaga: true
        }
    })
}

const deleteAnggota = async(id, idLembaga, role) => {
    let where
    if(role === "super_admin") {
        where = {
            id
        }
    } else {
        where = {
            id,
            id_lembaga: idLembaga
        }

    }

    const totalAnggota = await prismaClient.anggota.count({
        where
    })
    if(totalAnggota !== 1) {
        throw new ResponseError(404, "Data not found")
    }

    return prismaClient.anggota.delete({
        where: {
            id
        },
        select: {
            id: true
        }
    })
}

export default {
    createAnggota,
    getAnggota,
    getAllAnggota,
    updateAnggota,
    deleteAnggota
}