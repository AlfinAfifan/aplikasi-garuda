-- CreateTable
CREATE TABLE `Lembaga` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_lembaga` VARCHAR(100) NOT NULL,
    `alamat` VARCHAR(255) NULL,
    `no_gudep_lk` VARCHAR(100) NOT NULL,
    `no_gudep_pr` VARCHAR(100) NOT NULL,
    `kepsek` VARCHAR(100) NULL,
    `nip_kepsek` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `id_lembaga` INTEGER NOT NULL,
    `role` VARCHAR(50) NOT NULL,
    `nta` VARCHAR(50) NULL,
    `tmpt_lahir` VARCHAR(100) NULL,
    `tgl_lahir` DATE NULL,
    `alamat` VARCHAR(255) NULL,
    `agama` VARCHAR(50) NULL,
    `jabatan` VARCHAR(50) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_id_lembaga_fkey` FOREIGN KEY (`id_lembaga`) REFERENCES `Lembaga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
