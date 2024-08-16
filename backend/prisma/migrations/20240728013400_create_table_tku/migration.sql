-- CreateTable
CREATE TABLE `tku` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `no_sk` VARCHAR(100) NOT NULL,
    `id_anggota` INTEGER NOT NULL,
    `ramu` BOOLEAN NULL,
    `rakit` BOOLEAN NULL,
    `terap` BOOLEAN NULL,
    `tgl_ramu` DATE NULL,
    `tgl_rakit` DATE NULL,
    `tgl_terap` DATE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tku` ADD CONSTRAINT `tku_id_anggota_fkey` FOREIGN KEY (`id_anggota`) REFERENCES `anggota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
