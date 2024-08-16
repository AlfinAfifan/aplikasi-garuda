import Joi from "joi"

const createLembagaValidation = Joi.object({
    nama_lembaga: Joi.string().max(100).required(),
    alamat: Joi.string().max(255),
    no_gudep_lk: Joi.string().max(100),
    no_gudep_pr: Joi.string().max(100),
    kepsek: Joi.string().max(100),
    nip_kepsek: Joi.string().max(100),
})

const updateLembagaValidation = Joi.object({
    nama_lembaga: Joi.string().max(100),
    alamat: Joi.string().max(255),
    no_gudep_lk: Joi.string().max(100),
    no_gudep_pr: Joi.string().max(100),
    kepsek: Joi.string().max(100),
    nip_kepsek: Joi.string().max(100),
})

export {
    createLembagaValidation,
    updateLembagaValidation
}