-- DropForeignKey
ALTER TABLE `tkk` DROP FOREIGN KEY `Tkk_id_anggota_fkey`;

-- DropForeignKey
ALTER TABLE `tkk` DROP FOREIGN KEY `Tkk_id_jenis_tkk_fkey`;

-- AddForeignKey
ALTER TABLE `tkk` ADD CONSTRAINT `tkk_id_anggota_fkey` FOREIGN KEY (`id_anggota`) REFERENCES `anggota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tkk` ADD CONSTRAINT `tkk_id_jenis_tkk_fkey` FOREIGN KEY (`id_jenis_tkk`) REFERENCES `jenis_tkk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
