import Joi from "joi"

const createTkuValidation = Joi.object({
    no_sk: Joi.string().required(),
    id_anggota: Joi.number().required(),
    ramu: Joi.boolean(),
    rakit: Joi.boolean(),
    terap: Joi.boolean(),
    tgl_ramu: Joi.date(),
    tgl_rakit: Joi.date(),
    tgl_terap: Joi.date(),
})

const generalTkuValidation = Joi.object({
    id: Joi.number(),
    type: Joi.string().valid('ramu', 'rakit', 'terap')
})

export {
    createTkuValidation,
    generalTkuValidation
}