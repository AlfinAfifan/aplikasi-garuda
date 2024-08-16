import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"

const getDataRekap = async (idLembaga, role) => {
    let where
    if (role === "super_admin") {
        where = {}
    } else {
        where = {
            id_lembaga: idLembaga
        }
    }

    const data = await prismaClient.anggota.findMany({
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
            tku: {
                select: {
                    ramu: true,
                    rakit: true,
                    terap: true,
                    tgl_ramu: true,
                    tgl_rakit: true,
                    tgl_terap: true,
                }
            },
        }
    })
    
    if (!data) {
        throw new ResponseError(404, "Data not found")
    }

    const countTkk = data.map(async anggota => {
        const countPurwa = await prismaClient.tkk.count({
            where: {
                id_anggota: anggota.id,
                purwa: true
            }
        });

        const countMadya = await prismaClient.tkk.count({
            where: {
                id_anggota: anggota.id,
                madya: true
            }
        });

        const countUtama = await prismaClient.tkk.count({
            where: {
                id_anggota: anggota.id,
                utama: true
            }
        });

        return {
            ...anggota,
            countPurwa,
            countMadya,
            countUtama
        };
    });

    const dataWithCounts = await Promise.all(countTkk);
    return dataWithCounts
}

const dataSummary = async (idLembaga, role) => {
    let whereAdmin
    let whereLembaga
    let whereAnggota
    if(role === "super_admin") {
        whereAdmin = {}
        whereLembaga = {}
        whereAnggota = {}
    } else {
        whereAdmin = {
            id_lembaga: idLembaga
        }
        whereLembaga = {
            id: idLembaga
        }
        whereAnggota = {
            id_lembaga: idLembaga
        }
    }

    const [admin, lembaga, anggota, jenisTkk] = await Promise.all([
        prismaClient.user.count({ where: whereAdmin }),
        prismaClient.lembaga.count({ where: whereLembaga}),
        prismaClient.anggota.count({ where: whereAnggota }),
        prismaClient.anggota.count(),
    ]);

    const [ramu, rakit, terap] = await Promise.all([
        prismaClient.tku.count({ where: { ramu: true } }),
        prismaClient.tku.count({ where: { rakit: true } }),
        prismaClient.tku.count({ where: { terap: true } })
    ]);

    const [purwa, madya, utama] = await Promise.all([
        prismaClient.tkk.count({ where: { purwa: true } }),
        prismaClient.tkk.count({ where: { madya: true } }),
        prismaClient.tkk.count({ where: { utama: true } })
    ])

    return {
        countAdmin: admin,
        countLembaga: lembaga,
        countAnggota: anggota,
        countJenisTkk: jenisTkk,
        tku: {
            countRamu: ramu,
            countRakit: rakit,
            countTerap: terap
        },
        tkk: {
            countPurwa: purwa,
            countMadya: madya,
            countUtama: utama
        }
    };
}

export default {
    getDataRekap,
    dataSummary
}