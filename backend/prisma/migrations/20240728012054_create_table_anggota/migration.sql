/*
  Warnings:

  - You are about to alter the column `agama` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `agama` VARCHAR(30) NULL;

-- CreateTable
CREATE TABLE `Anggota` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(100) NOT NULL,
    `id_lembaga` INTEGER NOT NULL,
    `no_induk` VARCHAR(50) NOT NULL,
    `nta` VARCHAR(50) NOT NULL,
    `tmpt_lahir` VARCHAR(100) NULL,
    `tgl_lahir` DATE NULL,
    `gender` VARCHAR(20) NULL,
    `agama` VARCHAR(50) NULL,
    `warga` VARCHAR(20) NULL,
    `rt` VARCHAR(20) NULL,
    `rw` VARCHAR(20) NULL,
    `desa_kelurahan` VARCHAR(50) NULL,
    `kecamatan` VARCHAR(50) NULL,
    `kab_kota` VARCHAR(50) NULL,
    `provinsi` VARCHAR(50) NULL,
    `no_telp` VARCHAR(50) NULL,
    `bakat_hobi` VARCHAR(100) NULL,
    `nama_ayah` VARCHAR(50) NULL,
    `tmpt_lahir_ayah` VARCHAR(100) NULL,
    `tgl_lahir_ayah` DATE NULL,
    `nama_ibu` VARCHAR(50) NULL,
    `tmpt_lahir_ibu` VARCHAR(100) NULL,
    `tgl_lahir_ibu` DATE NULL,
    `no_telp_ortu` VARCHAR(50) NULL,
    `alamat_ortu` VARCHAR(100) NULL,
    `tgl_masuk_pangkalan` DATE NULL,
    `tingkat_masuk_pangkalan` VARCHAR(50) NULL,
    `tgl_keluar_pangkalan` DATE NULL,
    `alasan_keluar` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Anggota` ADD CONSTRAINT `Anggota_id_lembaga_fkey` FOREIGN KEY (`id_lembaga`) REFERENCES `Lembaga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
