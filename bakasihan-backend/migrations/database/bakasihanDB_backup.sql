-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: bakasihan_db
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer_table_tbl`
--

DROP TABLE IF EXISTS `customer_table_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_table_tbl` (
  `id` int NOT NULL AUTO_INCREMENT,
  `table_no` int NOT NULL,
  `order_no` varchar(100) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_table_tbl`
--

LOCK TABLES `customer_table_tbl` WRITE;
/*!40000 ALTER TABLE `customer_table_tbl` DISABLE KEYS */;
INSERT INTO `customer_table_tbl` VALUES (1,1,'',1,'2024-09-22 05:55:15'),(2,2,'',1,'2024-09-22 06:31:30'),(3,3,'789',2,'2024-09-22 06:31:32'),(4,4,'',1,'2024-09-22 06:31:39'),(5,5,'',1,'2024-09-22 06:31:46');
/*!40000 ALTER TABLE `customer_table_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_category_tbl`
--

DROP TABLE IF EXISTS `items_category_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items_category_tbl` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_category_tbl`
--

LOCK TABLES `items_category_tbl` WRITE;
/*!40000 ALTER TABLE `items_category_tbl` DISABLE KEYS */;
INSERT INTO `items_category_tbl` VALUES (1,'ingredients','2024-10-19 17:15:01'),(2,'test','2024-10-19 17:16:30'),(3,'drinks','2024-11-02 17:06:46');
/*!40000 ALTER TABLE `items_category_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_tbl`
--

DROP TABLE IF EXISTS `items_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items_tbl` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_category_id` int NOT NULL,
  `item_picture` text NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `quantity` int NOT NULL,
  `remaining_quantity` int NOT NULL,
  `price` int NOT NULL,
  `total_amount` int DEFAULT NULL,
  `purchase_date` date NOT NULL,
  `ctime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_tbl`
--

LOCK TABLES `items_tbl` WRITE;
/*!40000 ALTER TABLE `items_tbl` DISABLE KEYS */;
INSERT INTO `items_tbl` VALUES (2,3,'images/Screenshot from 2024-06-10 15-27-41.png','red horse(100ml)',100,9,75,7500,'2024-11-02','2024-11-02 17:10:12'),(3,3,'images/Screenshot from 2024-07-20 09-47-06.png','testing',10,0,100,1000,'2024-11-02','2024-11-02 18:04:10');
/*!40000 ALTER TABLE `items_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_tbl`
--

DROP TABLE IF EXISTS `order_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_tbl` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_no` varchar(100) NOT NULL,
  `orders` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `table_no` int DEFAULT NULL,
  `order_type` varchar(100) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `total_amount` int NOT NULL,
  `customer_cash` int DEFAULT NULL,
  `customer_change` int DEFAULT NULL,
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'unpaid',
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_tbl`
--

LOCK TABLES `order_tbl` WRITE;
/*!40000 ALTER TABLE `order_tbl` DISABLE KEYS */;
INSERT INTO `order_tbl` VALUES (15,'867','[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":4},{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":4}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":5,\"category_id\":2,\"product_image\":\"images/cjFC.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":120,\"status\":1,\"quantity\":4}]}]',NULL,'take out','test',1280,NULL,NULL,'unpaid','2024-10-06 06:40:27'),(16,'789','[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":5,\"category_id\":2,\"product_image\":\"images/cjFC.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":120,\"status\":1,\"quantity\":1}]}]',3,'dine in','test_customer',1440,100,100,'paid','2024-10-06 09:53:32'),(17,'756','[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1}]}]',NULL,'take out','test',100,NULL,NULL,'unpaid','2024-10-12 08:01:21'),(18,'140','[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":1}]}]',NULL,'take out','test',200,200,0,'paid','2024-10-12 08:09:40'),(19,'264','[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1}]}]',NULL,'take out','test',100,NULL,NULL,'unpaid','2024-10-12 08:27:45'),(20,'500','[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1}]}]',NULL,'take out','test',200,NULL,NULL,'unpaid','2024-10-12 08:31:18'),(21,'948','[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":1}]}]',NULL,'take out','test',200,NULL,NULL,'unpaid','2024-10-12 08:38:42'),(22,'645','[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":5,\"category_id\":2,\"product_image\":\"images/cjFC.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":120,\"status\":1,\"quantity\":1}]}]',NULL,'take out','tesr',320,3000,2680,'paid','2024-10-12 08:51:40'),(23,'227','[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":1}]}]',NULL,'take out','anotherTest',200,1000,800,'paid','2024-10-12 10:53:38'),(24,'415','[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":5,\"category_id\":2,\"product_image\":\"images/cjFC.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":120,\"status\":1,\"quantity\":1}]}]',NULL,'take out','testing rani',320,1000,680,'paid','2024-10-12 11:00:41'),(25,'739','[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":10,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"bakasi\",\"product_description\":\"nilarang\",\"price\":100,\"status\":1,\"quantity\":1}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":1}]}]',NULL,'take out','test customer',200,200,0,'paid','2024-11-02 10:52:09'),(26,'739','[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":10,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"bakasi\",\"product_description\":\"nilarang\",\"price\":100,\"status\":1,\"quantity\":1}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":1}]}]',NULL,'take out','test customer',200,200,0,'paid','2024-11-02 10:59:49'),(27,'739','[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":10,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"bakasi\",\"product_description\":\"nilarang\",\"price\":100,\"status\":1,\"quantity\":1}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":1}]}]',NULL,'take out','test customer',200,200,0,'paid','2024-11-02 11:01:05'),(28,'29','[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":12,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-06-10 15-27-41.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":125,\"status\":1,\"quantity\":1}]}]',NULL,'take out','test',225,225,0,'paid','2024-11-02 11:03:04'),(29,'29','[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":12,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-06-10 15-27-41.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":125,\"status\":1,\"quantity\":1}]}]',NULL,'take out','test',225,225,0,'paid','2024-11-02 11:04:54'),(30,'749','[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":12,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-06-10 15-27-41.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":125,\"status\":1,\"quantity\":1}]}]',NULL,'take out','test',125,NULL,NULL,'unpaid','2024-11-02 11:10:29'),(31,'926','[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":1}]}]',NULL,'take out','test',100,100,0,'paid','2024-11-02 11:18:06'),(32,'116','[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":1}]}]',NULL,'take out','test',100,100,0,'paid','2024-11-02 11:23:56'),(33,'779','[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":10,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"bakasi\",\"product_description\":\"nilarang\",\"price\":100,\"status\":1,\"quantity\":1}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":7}]}]',NULL,'take out','test',800,1000,200,'paid','2024-11-02 11:55:28'),(34,'233','[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":12,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-06-10 15-27-41.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":125,\"status\":1,\"quantity\":1}]}]',NULL,'take out','test',125,200,75,'paid','2024-11-02 12:00:45');
/*!40000 ALTER TABLE `order_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_categories_tbl`
--

DROP TABLE IF EXISTS `product_categories_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_categories_tbl` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categories_tbl`
--

LOCK TABLES `product_categories_tbl` WRITE;
/*!40000 ALTER TABLE `product_categories_tbl` DISABLE KEYS */;
INSERT INTO `product_categories_tbl` VALUES (1,'Food','2024-09-22 06:46:44'),(2,'Drinks','2024-09-22 06:46:51');
/*!40000 ALTER TABLE `product_categories_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_tbl`
--

DROP TABLE IF EXISTS `products_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_tbl` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `product_image` text NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_description` varchar(100) NOT NULL,
  `price` int NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_tbl`
--

LOCK TABLES `products_tbl` WRITE;
/*!40000 ALTER TABLE `products_tbl` DISABLE KEYS */;
INSERT INTO `products_tbl` VALUES (10,1,'images/Screenshot from 2024-08-14 13-02-25.png','bakasi','nilarang',100,1,'2024-11-02 10:37:02'),(11,2,'images/Screenshot from 2024-07-20 09-47-06.png','testing','testing ni sha',100,2,'2024-11-02 10:37:20'),(12,2,'images/Screenshot from 2024-06-10 15-27-41.png','red horse(100ml)','beer',125,1,'2024-11-02 10:38:20'),(13,1,'images/Screenshot from 2024-08-14 13-02-25.png','test','test',100,1,'2024-11-02 11:53:08');
/*!40000 ALTER TABLE `products_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `refresh_token` text NOT NULL,
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
INSERT INTO `refresh_token` VALUES (30,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMwNTMwNzEyLCJleHAiOjE3MzExMzU1MTJ9.Y4LX3DqeILMMhJ3_tp1XLrn-QZkcvNehAJKA1Uvzolw','2024-11-02 06:58:32');
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tbl`
--

DROP TABLE IF EXISTS `user_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tbl` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tbl`
--

LOCK TABLES `user_tbl` WRITE;
/*!40000 ALTER TABLE `user_tbl` DISABLE KEYS */;
INSERT INTO `user_tbl` VALUES (1,'test2','$2a$10$95ilntIPlDSc1Mb6Ow/2Nezs7.ku1tX6yq2/EI.NWcMgpkteqpmNW','active','2024-09-08 08:30:30',NULL);
/*!40000 ALTER TABLE `user_tbl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-02 20:05:03
