-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lesson_db
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `email_21` (`email`),
  UNIQUE KEY `email_22` (`email`),
  UNIQUE KEY `email_23` (`email`),
  UNIQUE KEY `email_24` (`email`),
  UNIQUE KEY `email_25` (`email`),
  UNIQUE KEY `email_26` (`email`),
  UNIQUE KEY `email_27` (`email`),
  UNIQUE KEY `email_28` (`email`),
  UNIQUE KEY `email_29` (`email`),
  UNIQUE KEY `email_30` (`email`),
  UNIQUE KEY `email_31` (`email`),
  UNIQUE KEY `email_32` (`email`),
  UNIQUE KEY `email_33` (`email`),
  UNIQUE KEY `email_34` (`email`),
  UNIQUE KEY `email_35` (`email`),
  UNIQUE KEY `email_36` (`email`),
  UNIQUE KEY `email_37` (`email`),
  UNIQUE KEY `email_38` (`email`),
  UNIQUE KEY `email_39` (`email`),
  UNIQUE KEY `email_40` (`email`),
  UNIQUE KEY `email_41` (`email`),
  UNIQUE KEY `email_42` (`email`),
  UNIQUE KEY `email_43` (`email`),
  UNIQUE KEY `email_44` (`email`),
  UNIQUE KEY `email_45` (`email`),
  UNIQUE KEY `email_46` (`email`),
  UNIQUE KEY `email_47` (`email`),
  UNIQUE KEY `email_48` (`email`),
  UNIQUE KEY `email_49` (`email`),
  UNIQUE KEY `email_50` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('student1@example.com','$2b$10$HD1Z3.jIGxaANMwZPEzWzetlqK4Y88DJUGWgOYPXmooVDKxXg0Tsm','2026-11-08 13:39:16','2026-11-08 13:39:16',1),('student23@example.com','$2b$10$ZCcPc/4IaB.VefjWvx9yYuofCQjAbh.13s42XOxedhsr9Y5zpbvqi','2026-11-08 13:41:20','2026-11-08 13:41:20',2),('student2232221311@example.com','$2b$10$B3X5jzM0NaZ7/HkQ6qAPC.yllVICKGKBBoIcrCOczDdST0vpmHSpG','2026-11-08 13:51:08','2026-11-08 13:51:08',3),('lolka23@example.com','$2b$10$HWj5OqxvfP3TcvkVeiPVdOknoKWdypnxqijS7iaZgNDMx9unLEVcO','2026-11-08 13:55:06','2026-11-08 13:55:06',4),('lolka2343@example.com','$2b$10$EXgbqg64CHM/dgn/.ek0J.HxEb2iEC5YZFp/hpga9haT8yiCu6g4K','2026-11-08 13:56:08','2026-11-08 13:56:08',5),('lolka234334243@example.com','$2b$10$y/9q13p4KvETG.NaRqb84eieVjIuF5jNEAOPL1WrWq21wbOMPrjSy','2026-11-08 13:57:38','2026-11-08 13:57:38',6),('lolka23433424354534@example.com','$2b$10$n423ZqMueKDBAHda0n0xnuuYs4nKA8bsScUF4I/WZHNzNqxko55sK','2026-11-08 13:59:06','2026-11-08 13:59:06',7),('lolka234334243545432424334@example.com','$2b$10$bJc4PXM0GJHh1A4xeyWtO.qXR6T3bzibncWBxYzO1.RhJFrxLSkdy','2026-11-08 14:03:19','2026-11-08 14:03:19',8),('lolka234334243545432424334331232@example.com','$2b$10$Np9aHVfqaSRIFEx6yZhBfebvGnElMCkiYAQ84E9fdfROqdiJPofQS','2026-11-08 14:05:38','2026-11-08 14:05:38',9),('lolka2343342435454324243343312325334543@example.com','$2b$10$jKaPY7iEorF9R2jBJnWsy.9BzOXVONoxeRQFf.I7R4tur9rYduq1.','2026-11-08 14:06:18','2026-11-08 14:06:18',10),('lolka234334243545432424334331232533454434234233@example.com','$2b$10$p4m5933csuFvcYY6gc3T2OgERSPlhNZSONJjoTtXGZtivfkdam2uq','2026-11-08 14:08:38','2026-11-08 14:08:38',11),('lolka2343342435454324243343312325334544342342543534533@example.com','$2b$10$X6S8en7qeiwUWw/2qAFSDOEL1U7U3EnBuFh.26Su7wuClMHem20TW','2026-11-08 14:16:26','2026-11-08 14:16:26',12),('lolka23433424354543242433433123253345443423425435345432423433@example.com','$2b$10$hB8Sxn53P7ZyGc45jJukwevOZGqawGFxauLWKWxux50EVEoo/x4cS','2026-11-08 14:23:12','2026-11-08 14:23:12',13);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-08 16:40:22
