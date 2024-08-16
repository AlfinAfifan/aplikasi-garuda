import Joi from "joi"

const createTkkValidation = Joi.object({
    no_sk: Joi.string().required(),
    id_anggota: Joi.number().required(),
    id_jenis_tkk: Joi.number().required(),
    purwa: Joi.boolean(),
    madya: Joi.boolean(),
    utama: Joi.boolean(),
    tgl_purwa: Joi.date(),
    tgl_madya: Joi.date(),
    tgl_utama: Joi.date(),
    nama_penguji: Joi.string().max(100).required(),
    jabatan_penguji: Joi.string().max(50),
    alamat_penguji: Joi.string().max(255),
})

const generalTkkValidation = Joi.object({
    id: Joi.number(),
    type: Joi.string().valid('purwa', 'madya', 'utama')
})

export {
    createTkkValidation,
    generalTkkValidation
}