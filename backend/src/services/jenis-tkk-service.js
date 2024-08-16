import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createJenisTkkValidation, updateJenisTkkValidation } from "../validation/jenis-tkk-validation.js"
import { validate } from "../validation/validation.js"

const createJenisTkk = async (req, role) => {
    if(role !== "super_admin") {
        throw new ResponseError(403, "Access denied")
    }

    const data = validate(createJenisTkkValidation, req)

    const countJenisTkk = await prismaClient.jenisTkk.count({
        where: {
            nama: data.nama
        }
    })
    if (countJenisTkk > 0) {
        throw new ResponseError(400, "TKK name already exist")
    }

    return prismaClient.jenisTkk.create({
        data
    })
}

const getJenisTkk = async (id) => {
    const jenisTkk = await prismaClient.jenisTkk.findUnique({
        where: {
            id
        }
    })

    if(!jenisTkk) {
        throw new ResponseError(404, "Data not found")
    }

    return jenisTkk
}

const getAllJenisTkk = async () => {
    const jenisTkk = await prismaClient.jenisTkk.findMany()

    if(!jenisTkk) {
        throw new ResponseError(404, "Data not found")
    }
    return jenisTkk
}

const updateJenisTkk = async (req, id, role) => {
    if(role !== "super_admin") {
        throw new ResponseError(403, "Access denied")
    }

    const data = validate(updateJenisTkkValidation, req)

    const totalJenisTkk = await prismaClient.jenisTkk.count({
        where: {
            id
        }
    })
    if(totalJenisTkk !== 1) {
        throw new ResponseError(404, "Data not found")
    }

    if(data.nama) {
        const jenisTkkExist = await prismaClient.jenisTkk.count({
            where: {
                nama: data.nama
            }
        })

        if(jenisTkkExist > 0) {
            throw new ResponseError(400, "TKK name already exist")
        }
    }

    return prismaClient.jenisTkk.update({
        where: {
            id
        },
        data,
        select: {
            id: true,
            nama: true
        }
    })
}

const deleteJenisTkk = async (id, role) => {
    if(role !== "super_admin") {
        throw new ResponseError(403, "Access denied")
    }

    const totalJenisTkk = await prismaClient.jenisTkk.count({
        where: {
            id
        }
    })
    if(totalJenisTkk !== 1) {
        throw new ResponseError(404, "Data not found")
    }
    
    return prismaClient.jenisTkk.delete({
        where: {
            id
        },
        select: {
            id: true,
        }
    })
}

export default {
    createJenisTkk,
    getJenisTkk,
    getAllJenisTkk,
    updateJenisTkk,
    deleteJenisTkk
}