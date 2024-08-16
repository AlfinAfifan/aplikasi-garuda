-- DropForeignKey
ALTER TABLE `anggota` DROP FOREIGN KEY `Anggota_id_lembaga_fkey`;

-- CreateTable
CREATE TABLE `jenis_tkk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(50) NOT NULL,
    `bidang` VARCHAR(100) NOT NULL,
    `warna` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `anggota` ADD CONSTRAINT `anggota_id_lembaga_fkey` FOREIGN KEY (`id_lembaga`) REFERENCES `Lembaga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
