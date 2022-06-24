CREATE DATABASE  IF NOT EXISTS `expense` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `expense`;
-- MariaDB dump 10.17  Distrib 10.4.14-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: expense
-- ------------------------------------------------------
-- Server version	10.4.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `xpn_account`
--

DROP TABLE IF EXISTS `xpn_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xpn_account` (
  `acc_id` varchar(5) NOT NULL,
  `acc_desc` varchar(500) DEFAULT NULL,
  `acc_active` int(1) NOT NULL DEFAULT 1,
  `loc_id` int(11) NOT NULL,
  `acc_createDate` datetime NOT NULL DEFAULT current_timestamp(),
  `acc_createUser` varchar(50) DEFAULT NULL,
  `acc_updateDate` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `acc_updateUser` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`acc_id`,`loc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xpn_account`
--

LOCK TABLES `xpn_account` WRITE;
/*!40000 ALTER TABLE `xpn_account` DISABLE KEYS */;
INSERT INTO `xpn_account` VALUES ('10000','AKTIVA',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 14:27:08','administrator'),('10000','AKTIVA',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('11000','Aktiva Lancar',1,1,'2022-01-25 10:55:48','administrator','2022-02-10 15:33:43','administrator'),('11000','Aktiva Lancar',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('11100','Kas',1,1,'2022-01-25 10:55:48','administrator','2022-02-10 15:33:44','administrator'),('11100','Kas',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('11150','Kas kecil',1,1,'2022-01-25 10:55:48','administrator','2022-02-10 15:33:48','administrator'),('11150','Kas kecil',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('11200','Bank',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:31:04','administrator'),('11200','Bank',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('11300','Investasi Jangka Pendek / Deposito',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:31:06','administrator'),('11300','Investasi Jangka Pendek / Deposito',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('11400','Piutang',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('11400','Piutang',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('11500','Persediaan',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('11500','Persediaan',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('11600','Pajak',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('11600','Pajak',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('13000','Biaya Dibayar Dimuka',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 14:31:28','administrator'),('13000','Biaya Dibayar Dimuka',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('13100','Sewa Dibayar Dimuka',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('13100','Sewa Dibayar Dimuka',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('16000','Aktiva Tidak Lancar',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('16000','Aktiva Tidak Lancar',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('16100','Aset',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('16100','Aset',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('16600','Akumulasi Depresiasi',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('16600','Akumulasi Depresiasi',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('18000','Aktiva Tidak Berwujud',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('18000','Aktiva Tidak Berwujud',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('18100','Asuransi',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('18100','Asuransi',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('18200','Perangkat lunak',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('18200','Perangkat lunak',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('19000','Beban Ditangguhkan',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('19000','Beban Ditangguhkan',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('19100','Beban ditangguhkan',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('19100','Beban ditangguhkan',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('20000','KEWAJIBAN',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('20000','KEWAJIBAN',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('21000','Hutang Lancar',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('21000','Hutang Lancar',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('21100','Hutang Dagang',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('21100','Hutang Dagang',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('21200','Hutang Biaya yang Masih Harus Dibayar',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('21200','Hutang Biaya yang Masih Harus Dibayar',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('23000','Hutang Tidak Lancar',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('23000','Hutang Tidak Lancar',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('27000','Kewajiban Jangka Panjang',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('27000','Kewajiban Jangka Panjang',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('27100','Penerimaan diterima di muka',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('27100','Penerimaan diterima di muka',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('30000','EKUITAS',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('30000','EKUITAS',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('31000','Modal Pendiri',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('31000','Modal Pendiri',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('32000','Tambahan modal disetor',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('32000','Tambahan modal disetor',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('33000','Surplus / (Defisit)',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('33000','Surplus / (Defisit)',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('34000','Laba / (Rugi) Ditahan',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('34000','Laba / (Rugi) Ditahan',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('40000','PENDAPATAN',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('40000','PENDAPATAN',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('41000','Hibah',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('41000','Hibah',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('41100','Yayasan',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('41100','Yayasan',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('41110','Ford Foundation',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('41110','Ford Foundation',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('41120','Wikimedia Foundation',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('41120','Wikimedia Foundation',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('41200','Pemerintah',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('41200','Pemerintah',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('41300','Perusahaan',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('41300','Perusahaan',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('41400','Institusi / Organisasi',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('41400','Institusi / Organisasi',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('41410','Universitas',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('41410','Universitas',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('41500','Asosiasi Lokal Wikimedia',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('41500','Asosiasi Lokal Wikimedia',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('41900','Lain-lain',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('41900','Lain-lain',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('41910','Pertamina',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('41910','Pertamina',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('42000','Iuran Anggota',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('42000','Iuran Anggota',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('42100','Iuran anggota umum',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('42100','Iuran anggota umum',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('42200','Iuran anggota mahasiswa',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('42200','Iuran anggota mahasiswa',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('42300','Iuran anggota bawah umur',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('42300','Iuran anggota bawah umur',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('43000','Sumbangan',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('43000','Sumbangan',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('43100','Sumbangan Individual',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('43100','Sumbangan Individual',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('43200','Sumbangan Organisasi',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('43200','Sumbangan Organisasi',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('43900','Sumbangan Lain-lain',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('43900','Sumbangan Lain-lain',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('44000','Sponsor',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('44000','Sponsor',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('50000','PENGELUARAN',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('50000','PENGELUARAN',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('51000','Biaya Administrasi',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('51000','Biaya Administrasi',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('51100','Sewa kantor',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('51100','Sewa kantor',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('51200','Perlengkapan kantor',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('51200','Perlengkapan kantor',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('51300','Biaya Kebersihan + Kebutuhan Dapur (Umum)',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('51300','Biaya Kebersihan + Kebutuhan Dapur (Umum)',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('51400','Biaya listrik/air/telpon kantor',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('51400','Biaya listrik/air/telpon kantor',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('51500','Biaya Pos',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('51500','Biaya Pos',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('51600','Biaya komunikasi/modem internet',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('51600','Biaya komunikasi/modem internet',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('51700','Biaya Domain/Hosting',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('51700','Biaya Domain/Hosting',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('51800','Biaya admin umum',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('51800','Biaya admin umum',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('51900','Biaya lain-lain',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('51900','Biaya lain-lain',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('52000','Biaya Transportasi',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('52000','Biaya Transportasi',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('52100','Biaya Taksi/Tol/Bensin/Parkir',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('52100','Biaya Taksi/Tol/Bensin/Parkir',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('52900','Biaya Transportasi Lain',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('52900','Biaya Transportasi Lain',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('53000','Biaya Gaji & Kompensasi',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('53000','Biaya Gaji & Kompensasi',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('53100','Kompensasi Konsultan',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('53100','Kompensasi Konsultan',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('53200','Kompensasi Magang / Paruh Waktu',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('53200','Kompensasi Magang / Paruh Waktu',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('53300','Kompensasi Desain & Grafis',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('53300','Kompensasi Desain & Grafis',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('53400','Honor Pembicara/ Moderator/ MC',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('53400','Honor Pembicara/ Moderator/ MC',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('53500','Gaji Admin / Manajer Proyek',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('53500','Gaji Admin / Manajer Proyek',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('53600','Honor Pelatih Wiki',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('53600','Honor Pelatih Wiki',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('53700','Biaya Agen',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('53700','Biaya Agen',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('53800','Gaji Pramubakti',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('53800','Gaji Pramubakti',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('53900','Lain-Lain',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('53900','Lain-Lain',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('54000','Biaya Rapat/ Pelatihan/ Konferensi Besar',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('54000','Biaya Rapat/ Pelatihan/ Konferensi Besar',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('54100','Biaya ruangan',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('54100','Biaya ruangan',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('54200','Biaya konsumsi',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('54200','Biaya konsumsi',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('55000','Perjalanan Dinas',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('55000','Perjalanan Dinas',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('55100','Biaya Tiket (Pesawat/Kereta/Bis Antar Kota/ Kapal Laut)',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('55100','Biaya Tiket (Pesawat/Kereta/Bis Antar Kota/ Kapal Laut)',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('55200','Pajak Bandara',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('55200','Pajak Bandara',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('55300','Biaya Visa / Agen / Asuransi',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('55300','Biaya Visa / Agen / Asuransi',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('55400','Biaya Konferensi',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('55400','Biaya Konferensi',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('55500','Biaya Bagasi',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('55500','Biaya Bagasi',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('55600','Biaya Transportasi Daerah / Negara Lain',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('55600','Biaya Transportasi Daerah / Negara Lain',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('55700','Penginapan',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('55700','Penginapan',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('55800','Konsumsi',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('55800','Konsumsi',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('55900','Lain-Lain',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('55900','Lain-Lain',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('56000','Biaya Promosi',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('56000','Biaya Promosi',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('56100','Spanduk/ Standing Banner',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('56100','Spanduk/ Standing Banner',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('56200','Poster',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('56200','Poster',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('56300','Stiker/ Pin/ Suvenir',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('56300','Stiker/ Pin/ Suvenir',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('56400','Backwall',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('56400','Backwall',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('56500','Kaos',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('56500','Kaos',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('56600','Proposal',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('56600','Proposal',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('56700','Sertifikat',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('56700','Sertifikat',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('56900','Lain-Lain',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('56900','Lain-Lain',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('57000','Beasiswa',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('57000','Beasiswa',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('57100','Uang Tunai',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('57100','Uang Tunai',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('57200','Perangkat Elektronik',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('57200','Perangkat Elektronik',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('57300','Biaya Paket Perjalanan',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('57300','Biaya Paket Perjalanan',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('57400','Beasiswa Pendidikan',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('57400','Beasiswa Pendidikan',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('58000','Hibah pihak ketiga',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('58000','Hibah pihak ketiga',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('59000','Biaya lain-lain',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('59000','Biaya lain-lain',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('60000','BIAYA DEPRESIASI DAN AMORTISASI',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('60000','BIAYA DEPRESIASI DAN AMORTISASI',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('61000','Biaya Depresiasi Aktiva Tetap',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('61000','Biaya Depresiasi Aktiva Tetap',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('62000','Biaya Amortisasi Aktiva Tak Berujud',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('62000','Biaya Amortisasi Aktiva Tak Berujud',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('70000','PENGELUARAN LAIN-LAIN',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('70000','PENGELUARAN LAIN-LAIN',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('71000','Pengeluaran lain-lain',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('71000','Pengeluaran lain-lain',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('71100','Biaya administrasi bank',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('71100','Biaya administrasi bank',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('71200','Biaya Legal',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('71200','Biaya Legal',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('79900','Biaya lain-lain',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('79900','Biaya lain-lain',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('80000','PENDAPATAN LAIN-LAIN',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('80000','PENDAPATAN LAIN-LAIN',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('80009','Pendapatan Penjualan Tuyul',1,2,'2022-01-25 14:50:54','administrator','2022-01-25 14:52:33','administrator'),('81000','Pendapatan lain-lain',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('81000','Pendapatan lain-lain',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator'),('82000','Pendapatan lain-lain — Bunga',1,1,'2022-01-25 10:55:48','administrator','2022-01-25 11:30:47','administrator'),('82000','Pendapatan lain-lain — Bunga',1,2,'2022-01-25 10:29:59','administrator','2022-01-25 10:54:21','administrator');
/*!40000 ALTER TABLE `xpn_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xpn_location`
--

DROP TABLE IF EXISTS `xpn_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xpn_location` (
  `loc_id` int(11) NOT NULL AUTO_INCREMENT,
  `loc_name` varchar(50) DEFAULT NULL,
  `loc_desc` varchar(200) DEFAULT NULL,
  `loc_active` int(1) DEFAULT 1,
  `loc_createDate` datetime DEFAULT current_timestamp(),
  `loc_createUser` varchar(50) DEFAULT NULL,
  `loc_updateDate` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `loc_updateUser` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`loc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xpn_location`
--

LOCK TABLES `xpn_location` WRITE;
/*!40000 ALTER TABLE `xpn_location` DISABLE KEYS */;
INSERT INTO `xpn_location` VALUES (1,'Pusat','Pusat',1,'2022-01-21 10:04:53',NULL,'2022-02-10 14:44:34','administrator'),(2,'Pabrik','Pabrik',1,'2022-01-21 10:04:53',NULL,NULL,'administrator'),(3,'Jakarta','Jakarta',1,'2022-01-21 10:04:53',NULL,NULL,NULL),(4,'Surabaya','Surabaya',1,'2022-01-21 10:04:53',NULL,NULL,NULL),(5,'Makassar','Makassar',1,'2022-01-21 10:04:53',NULL,NULL,NULL),(6,'Semarang','Semarang',1,'2022-01-21 10:04:53',NULL,NULL,NULL),(7,'Cirebon','Cirebon',1,'2022-01-21 10:04:53',NULL,NULL,NULL),(8,'Lampung','Lampung',1,'2022-01-21 10:04:53',NULL,NULL,NULL),(9,'Bogor','Bogor',1,'2022-01-21 10:04:53',NULL,NULL,NULL),(10,'Bekasi','Bekasi',1,'2022-01-21 10:04:53',NULL,NULL,NULL),(11,'Bandung','Bandung',1,'2022-01-21 10:04:53',NULL,'2022-03-23 14:32:36','administrator');
/*!40000 ALTER TABLE `xpn_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xpn_transaction`
--

DROP TABLE IF EXISTS `xpn_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xpn_transaction` (
  `trx_id` int(11) NOT NULL AUTO_INCREMENT,
  `acc_id` int(11) DEFAULT NULL,
  `loc_id` int(11) DEFAULT NULL,
  `trx_value` float DEFAULT NULL,
  `trx_date` date DEFAULT NULL,
  `trx_type` varchar(1) DEFAULT 'd',
  `trx_desc` varchar(500) DEFAULT NULL,
  `trx_active` int(1) NOT NULL DEFAULT 1,
  `trx_createDate` datetime DEFAULT current_timestamp(),
  `trx_createUser` varchar(50) DEFAULT NULL,
  `trx_updateDate` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `trx_updateUser` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`trx_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xpn_transaction`
--

LOCK TABLES `xpn_transaction` WRITE;
/*!40000 ALTER TABLE `xpn_transaction` DISABLE KEYS */;
INSERT INTO `xpn_transaction` VALUES (1,11100,1,50000000,'2022-01-27','d','[EXP]saldo pembukaan',1,'2022-01-28 09:49:21','administrator',NULL,NULL),(2,51200,1,200000,'2022-01-27','c','[EXP]beli pulpen',1,'2022-01-28 09:49:21','administrator',NULL,NULL),(3,51000,1,3000000,'2022-01-27','c','[EXP]bayar calo',1,'2022-01-28 09:54:11','administrator',NULL,NULL),(4,52000,1,5000000,'2022-01-27','c','[EXP]gojek ke singapore',1,'2022-01-28 09:55:12','administrator',NULL,NULL),(5,11100,2,23000000,'2022-01-28','c','[EXP]saldo awal',1,'2022-01-28 14:02:59','administrator',NULL,NULL),(6,11100,2,40000000,'2022-01-27','c','[EXP]saldo pembukaan',1,'2022-01-28 14:03:50','administrator',NULL,NULL),(7,21200,1,80000000,'2022-01-27','c','[EXP]hutang rentenir',1,'2022-02-04 11:31:47','administrator',NULL,NULL),(8,11100,1,300000000,'2022-03-22','d','[EXP]Saldo Awal Hari',1,'2022-03-22 14:03:06','administrator',NULL,NULL);
/*!40000 ALTER TABLE `xpn_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xpn_user`
--

DROP TABLE IF EXISTS `xpn_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xpn_user` (
  `usr_id` varchar(50) NOT NULL,
  `usr_name` varchar(500) DEFAULT NULL,
  `usr_password` varchar(50) DEFAULT NULL,
  `usr_token` varchar(500) DEFAULT NULL,
  `usr_active` int(1) NOT NULL DEFAULT 0,
  `usr_createDate` datetime DEFAULT current_timestamp(),
  `usr_createUser` varchar(50) DEFAULT NULL,
  `usr_updateDate` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `usr_updateUser` varchar(50) DEFAULT NULL,
  `usr_lastLoginDate` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `usr_lastLoginDevice` varchar(500) DEFAULT NULL,
  `usr_lastLoginIP` varchar(100) DEFAULT NULL,
  `lvl_id` int(11) DEFAULT NULL,
  `loc_id` int(11) DEFAULT 0,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xpn_user`
--

LOCK TABLES `xpn_user` WRITE;
/*!40000 ALTER TABLE `xpn_user` DISABLE KEYS */;
INSERT INTO `xpn_user` VALUES ('administrator','administrator','admin123','I4yOR0x5Ncqxs4DQhEH7ABUrPYyIbK8qqzUwEfUW9uuAcaloClUgd4IQMqQginw5WAOUd9D5qYXllVKursu0NASPmoYYdaK017kw',1,'2022-01-18 10:52:20',NULL,'2022-04-27 09:07:57',NULL,'2022-04-27 09:07:57','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36','192.168.1.75',1,0),('hani','hani','hani123','4DqS4i03LYJ3fNPj3DiFECwuNUUwd1B6D6GfbaPbIwVcZOsTkvKY5gA1YwThFTHg3WBc4t3K3bvbSha4qJDDax8autTWuRxlFygJ',1,'2022-02-24 15:14:15','administrator','2022-03-21 11:24:39','liasundari','2022-03-21 11:24:39','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36','127.0.0.1',3,2),('liasundari','Lia Sundari','lia123','RsV1L6s1eEku7IjFnwZrvsOO0PPhTxePIJoHTK7XeF00mQgnaKHLDqiBEzDOvhfkZiv4ZHbBzK7rtezR8gcAwRcFtzmVA6kF02St',1,'2022-02-11 10:03:13','administrator','2022-04-07 09:16:21','administrator','2022-04-07 09:16:21','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36','127.0.0.1',2,2),('test','Testing Staff','12345','IvGyFy3QPUlWjLlYt9zU7D5uEFncfpRYQ0VUq39XMjwYUI5eLazabMHcMHMiEcfgmuQlvS14KlWMbcmssEVQfys9iWKBHVnZ9nA3',1,'2022-02-23 11:23:07','administrator','2022-02-24 15:09:51','administrator','2022-02-24 15:09:51','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36','127.0.0.1',2,2);
/*!40000 ALTER TABLE `xpn_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xpn_userlevel`
--

DROP TABLE IF EXISTS `xpn_userlevel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xpn_userlevel` (
  `lvl_id` int(11) NOT NULL AUTO_INCREMENT,
  `lvl_name` varchar(500) DEFAULT NULL,
  `lvl_desc` varchar(500) DEFAULT NULL,
  `lvl_active` int(1) NOT NULL DEFAULT 1,
  `lvl_createDate` datetime DEFAULT current_timestamp(),
  `lvl_createUser` varchar(50) DEFAULT NULL,
  `lvl_updateDate` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `lvl_updateUser` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`lvl_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xpn_userlevel`
--

LOCK TABLES `xpn_userlevel` WRITE;
/*!40000 ALTER TABLE `xpn_userlevel` DISABLE KEYS */;
INSERT INTO `xpn_userlevel` VALUES (1,'administrator','administrator',1,NULL,NULL,NULL,NULL),(2,'manager','Manager',1,'2022-02-10 15:24:53','administrator','2022-02-24 15:04:43','administrator'),(3,'staff','Staff Admin',1,'2022-02-11 10:10:22','liasundari','2022-02-24 15:04:43',NULL);
/*!40000 ALTER TABLE `xpn_userlevel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'expense'
--
/*!50003 DROP PROCEDURE IF EXISTS `getActiveAccount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getActiveAccount`(accId int, locId int)
BEGIN
    IF accId is not null THEN
       SELECT   *
       FROM     xpn_account
       WHERE    acc_id  = accId AND loc_id = locId AND acc_active = 1
       ORDER BY acc_id ASC;
    ELSE
       SELECT   *
       FROM     xpn_account
       WHERE    loc_id = locId AND acc_active = 1
       ORDER BY acc_id ASC;
    END IF;
  END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-24 13:29:24
