-- AlterTable
ALTER TABLE `anggota` MODIFY `alamat_ortu` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `Tkk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `no_sk` VARCHAR(100) NOT NULL,
    `id_anggota` INTEGER NOT NULL,
    `id_jenis_tkk` INTEGER NOT NULL,
    `purwa` BOOLEAN NULL,
    `madya` BOOLEAN NULL,
    `utama` BOOLEAN NULL,
    `tgl_purwa` DATE NULL,
    `tgl_madya` DATE NULL,
    `tgl_utama` DATE NULL,
    `nama_penguji` VARCHAR(100) NOT NULL,
    `jabatan_penguji` VARCHAR(50) NULL,
    `alamat_penguji` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tkk` ADD CONSTRAINT `Tkk_id_anggota_fkey` FOREIGN KEY (`id_anggota`) REFERENCES `anggota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tkk` ADD CONSTRAINT `Tkk_id_jenis_tkk_fkey` FOREIGN KEY (`id_jenis_tkk`) REFERENCES `jenis_tkk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
