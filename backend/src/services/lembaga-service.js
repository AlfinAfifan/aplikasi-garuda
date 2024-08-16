import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createLembagaValidation, updateLembagaValidation } from "../validation/lembaga-validation.js"
import { validate } from "../validation/validation.js"

const createLembaga = async (request, role) => {
    if(role !== 'super_admin') {
        throw new ResponseError(403, "Access denied")
    }

    const data = validate(createLembagaValidation, request)
    const countLembaga = await prismaClient.lembaga.count({
        where: {
            nama_lembaga: data.nama_lembaga
        }
    })

    if(countLembaga > 0) {
        throw new ResponseError(400, "Lembaga already exist")
    }

    return prismaClient.lembaga.create({
        data: data,
        select: {
            id: true,
            nama_lembaga: true
        }
    })
}

const getLembaga = async(id) => {
    const lembaga = prismaClient.lembaga.findUnique({
        where: {
            id
        }
    })

    if(!lembaga) {
        throw new ResponseError(404, "Data not found")
    }

    return lembaga
}

const getAllLembaga = async() => {
    const lembaga = await prismaClient.lembaga.findMany()

    if(!lembaga) {
        throw new ResponseError(404, "Data not found")
    }
    return lembaga
}

const updateLembaga = async(request, id, role) => {
    if(role !== "super_admin") {
        throw new ResponseError(403, "Access denied")
    }

    const data = validate(updateLembagaValidation, request)

    const totalLembaga = await prismaClient.lembaga.count({
        where: {
            id
        }
    })
    if(totalLembaga !== 1) {
        throw new ResponseError(404, "Data not found")
    }

    if(data.nama_lembaga) {
        const namaLembagaExist = await prismaClient.lembaga.count({
            where: {
                nama_lembaga: data.nama_lembaga,
                NOT: {
                    id
                }
            },
        })

        if(namaLembagaExist > 0) {
            throw new ResponseError(400, "Nama lembaga already exist")
        }
    }

    return prismaClient.lembaga.update({
        where: {
            id
        },
        data,
        select: {
            id: true,
            nama_lembaga: true
        }
    })
}

const deleteLembaga = async (id, role) => {
    if(role !== "super_admin") {
        throw new ResponseError(403, "Access denied")
    }

    const totalLembaga = await prismaClient.lembaga.count({
        where: {
            id
        }
    })
    if(totalLembaga !== 1) {
        throw new ResponseError(404, "Data not found")
    }

    return prismaClient.lembaga.delete({
        where: {
            id
        },
        select: {
            id: true
        }
    })
}

export default {
    createLembaga,
    getLembaga,
    getAllLembaga,
    updateLembaga,
    deleteLembaga
}