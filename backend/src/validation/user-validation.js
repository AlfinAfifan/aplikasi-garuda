import Joi from "joi"

const registerUserValidation = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    nama: Joi.string().max(100).required(),
    role: Joi.string().max(50).required(),
    id_lembaga: Joi.number().positive().required(),
    nta: Joi.string().max(50),
    tmpt_lahir: Joi.string().max(100),
    tgl_lahir: Joi.date(),
    alamat: Joi.string().max(255),
    agama: Joi.string().max(30),
    jabatan: Joi.string().max(50),
})

const loginUserValidation = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
})

const updateUserValidation = Joi.object({
    email: Joi.string().max(100),
    password: Joi.string().max(100),
    nama: Joi.string().max(100),
    role: Joi.string().max(50),
    id_lembaga: Joi.number().positive(),
    nta: Joi.string().max(50),
    tmpt_lahir: Joi.string().max(100),
    tgl_lahir: Joi.date(),
    alamat: Joi.string().max(255),
    agama: Joi.string().max(30),
    jabatan: Joi.string().max(50),
})

export {
    registerUserValidation,
    loginUserValidation,
    updateUserValidation
}