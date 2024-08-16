import Joi from "joi"

const createJenisTkkValidation = Joi.object({
    nama: Joi.string().max(50).required(),
    bidang: Joi.string().max(100).required(),
    warna: Joi.string().max(50).required(),
})

const updateJenisTkkValidation = Joi.object({
    nama: Joi.string().max(50),
    bidang: Joi.string().max(100),
    warna: Joi.string().max(50),
})

export {
    createJenisTkkValidation,
    updateJenisTkkValidation
}