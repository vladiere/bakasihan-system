-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2024 at 09:50 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bakasihan_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer_table_tbl`
--

CREATE TABLE `customer_table_tbl` (
  `id` int(11) NOT NULL,
  `table_no` int(11) NOT NULL,
  `order_no` varchar(100) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `ctime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer_table_tbl`
--

INSERT INTO `customer_table_tbl` (`id`, `table_no`, `order_no`, `status`, `ctime`) VALUES
(1, 1, '', 1, '2024-09-21 21:55:15'),
(2, 2, '', 1, '2024-09-21 22:31:30'),
(3, 3, '', 1, '2024-09-21 22:31:32'),
(4, 4, '', 1, '2024-09-21 22:31:39'),
(6, 5, NULL, 1, '2024-11-06 06:30:55');

-- --------------------------------------------------------

--
-- Table structure for table `items_category_tbl`
--

CREATE TABLE `items_category_tbl` (
  `id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `ctime` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items_category_tbl`
--

INSERT INTO `items_category_tbl` (`id`, `category_name`, `ctime`) VALUES
(3, 'drinks', '2024-11-02 17:06:46');

-- --------------------------------------------------------

--
-- Table structure for table `items_tbl`
--

CREATE TABLE `items_tbl` (
  `id` int(11) NOT NULL,
  `item_category_id` int(11) NOT NULL,
  `item_picture` text NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `remaining_quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `total_amount` int(11) DEFAULT NULL,
  `purchase_date` date NOT NULL,
  `ctime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items_tbl`
--

INSERT INTO `items_tbl` (`id`, `item_category_id`, `item_picture`, `item_name`, `quantity`, `remaining_quantity`, `price`, `total_amount`, `purchase_date`, `ctime`) VALUES
(6, 2, 'images/swr_icon_bg_removed.png', 'test', 77, 70, 12, 1200, '2024-11-06', '2024-11-06 09:03:21'),
(7, 3, 'images/SWR-2.png', 'test', 11, 11, 20, 220, '2024-11-06', '2024-11-06 10:30:48'),
(8, 3, 'images/clown-transformed.jpeg', 'red horse(100ml)', 101, 98, 75, 7575, '2024-11-06', '2024-11-06 12:15:40'),
(9, 3, 'images/screenshot.png', 'test', 13, 13, 10, 130, '2024-11-06', '2024-11-06 12:17:22');

-- --------------------------------------------------------

--
-- Table structure for table `order_tbl`
--

CREATE TABLE `order_tbl` (
  `id` int(11) NOT NULL,
  `order_no` varchar(100) NOT NULL,
  `orders` longtext NOT NULL,
  `table_no` int(11) DEFAULT NULL,
  `order_type` varchar(100) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `total_amount` int(11) NOT NULL,
  `customer_cash` int(11) DEFAULT NULL,
  `customer_change` int(11) DEFAULT NULL,
  `status` varchar(100) DEFAULT 'unpaid',
  `ctime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_tbl`
--

INSERT INTO `order_tbl` (`id`, `order_no`, `orders`, `table_no`, `order_type`, `customer_name`, `total_amount`, `customer_cash`, `customer_change`, `status`, `ctime`) VALUES
(15, '867', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":4},{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":4}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":5,\"category_id\":2,\"product_image\":\"images/cjFC.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":120,\"status\":1,\"quantity\":4}]}]', NULL, 'take out', 'test', 1280, NULL, NULL, 'unpaid', '2024-10-05 22:40:27'),
(16, '789', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":5,\"category_id\":2,\"product_image\":\"images/cjFC.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":120,\"status\":1,\"quantity\":1}]}]', 3, 'dine in', 'test_customer', 1440, 100, 100, 'paid', '2024-10-06 01:53:32'),
(17, '756', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 100, NULL, NULL, 'unpaid', '2024-10-12 00:01:21'),
(18, '140', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 200, 200, 0, 'paid', '2024-10-12 00:09:40'),
(19, '264', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 100, NULL, NULL, 'unpaid', '2024-10-12 00:27:45'),
(20, '500', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 200, NULL, NULL, 'unpaid', '2024-10-12 00:31:18'),
(21, '948', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 200, NULL, NULL, 'unpaid', '2024-10-12 00:38:42'),
(22, '645', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":5,\"category_id\":2,\"product_image\":\"images/cjFC.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":120,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'tesr', 320, 3000, 2680, 'paid', '2024-10-12 00:51:40'),
(23, '227', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'anotherTest', 200, 1000, 800, 'paid', '2024-10-12 02:53:38'),
(24, '415', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":4,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-09-04 16-27-17.png\",\"product_name\":\"bangus\",\"product_description\":\"lami nga bangus\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":6,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"asdfa\",\"product_description\":\"asdf\",\"price\":100,\"status\":1,\"quantity\":1}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":5,\"category_id\":2,\"product_image\":\"images/cjFC.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":120,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'testing rani', 320, 1000, 680, 'paid', '2024-10-12 03:00:41'),
(25, '739', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":10,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"bakasi\",\"product_description\":\"nilarang\",\"price\":100,\"status\":1,\"quantity\":1}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test customer', 200, 200, 0, 'paid', '2024-11-02 02:52:09'),
(26, '739', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":10,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"bakasi\",\"product_description\":\"nilarang\",\"price\":100,\"status\":1,\"quantity\":1}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test customer', 200, 200, 0, 'paid', '2024-11-02 02:59:49'),
(27, '739', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":10,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"bakasi\",\"product_description\":\"nilarang\",\"price\":100,\"status\":1,\"quantity\":1}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test customer', 200, 200, 0, 'paid', '2024-11-02 03:01:05'),
(28, '29', '[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":12,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-06-10 15-27-41.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":125,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 225, 225, 0, 'paid', '2024-11-02 03:03:04'),
(29, '29', '[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":12,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-06-10 15-27-41.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":125,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 225, 225, 0, 'paid', '2024-11-02 03:04:54'),
(30, '749', '[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":12,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-06-10 15-27-41.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":125,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 125, 1000, 875, 'paid', '2024-11-02 03:10:29'),
(31, '926', '[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 100, 100, 0, 'paid', '2024-11-02 03:18:06'),
(32, '116', '[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 100, 100, 0, 'paid', '2024-11-02 03:23:56'),
(33, '779', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":10,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"bakasi\",\"product_description\":\"nilarang\",\"price\":100,\"status\":1,\"quantity\":1}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":11,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-07-20 09-47-06.png\",\"product_name\":\"testing\",\"product_description\":\"testing ni sha\",\"price\":100,\"status\":1,\"quantity\":7}]}]', NULL, 'take out', 'test', 800, 1000, 200, 'paid', '2024-11-02 03:55:28'),
(34, '233', '[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":12,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-06-10 15-27-41.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":125,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 125, 200, 75, 'paid', '2024-11-02 04:00:45'),
(35, '237', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":10,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"bakasi\",\"product_description\":\"nilarang\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":13,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"test\",\"product_description\":\"test\",\"price\":100,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 200, 200, 0, 'paid', '2024-11-04 04:45:22'),
(36, '626', '[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":12,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-06-10 15-27-41.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":125,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 125, 150, 25, 'paid', '2024-11-04 04:48:00'),
(37, '326', '[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":12,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-06-10 15-27-41.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":125,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 125, 200, 75, 'paid', '2024-11-04 05:14:45'),
(38, '713', '[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":12,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-06-10 15-27-41.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":125,\"status\":1,\"quantity\":1}]},{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":13,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"test\",\"product_description\":\"test\",\"price\":100,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 225, 300, 75, 'paid', '2024-11-04 05:20:21'),
(39, '694', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":13,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"test\",\"product_description\":\"test\",\"price\":100,\"status\":1,\"quantity\":1}]},{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":12,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-06-10 15-27-41.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":125,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 225, 2000, 1775, 'paid', '2024-11-04 08:01:44'),
(40, '97', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":10,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"bakasi\",\"product_description\":\"nilarang\",\"price\":100,\"status\":1,\"quantity\":3},{\"id\":13,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"test\",\"product_description\":\"test\",\"price\":100,\"status\":1,\"quantity\":2}]}]', NULL, 'take out', 'test', 500, 500, 0, 'paid', '2024-11-04 08:02:52'),
(41, '801', '[{\"id\":1,\"category_name\":\"Food\",\"products\":[{\"id\":10,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"bakasi\",\"product_description\":\"nilarang\",\"price\":100,\"status\":1,\"quantity\":1},{\"id\":13,\"category_id\":1,\"product_image\":\"images/Screenshot from 2024-08-14 13-02-25.png\",\"product_name\":\"test\",\"product_description\":\"test\",\"price\":100,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'testing', 200, 200, 0, 'paid', '2024-11-04 08:20:55'),
(42, '765', '[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":12,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-06-10 15-27-41.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":125,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 125, 1000, 875, 'paid', '2024-11-06 07:59:39'),
(43, '357', '[{\"id\":2,\"category_name\":\"Drinks\",\"products\":[{\"id\":12,\"category_id\":2,\"product_image\":\"images/Screenshot from 2024-06-10 15-27-41.png\",\"product_name\":\"red horse(100ml)\",\"product_description\":\"beer\",\"price\":125,\"status\":1,\"quantity\":2}]},{\"id\":10,\"category_name\":\"food\",\"products\":[{\"id\":14,\"category_id\":10,\"product_image\":\"images/screenshot-3.png\",\"product_name\":\"testFood\",\"product_description\":\"this is a test\",\"price\":100,\"status\":1,\"quantity\":1}]}]', NULL, 'take out', 'test', 350, NULL, NULL, 'unpaid', '2024-11-07 02:32:25'),
(44, '980', '[{\"id\":10,\"category_name\":\"food\",\"products\":[{\"id\":22,\"category_id\":10,\"product_image\":\"images/user-4.png\",\"product_name\":\"test\",\"product_description\":\"test\",\"price\":100,\"status\":1,\"quantity\":3},{\"id\":19,\"category_id\":10,\"product_image\":\"images/user-2.png\",\"product_name\":\"test23\",\"product_description\":\"test\",\"price\":123,\"status\":1,\"quantity\":6}]}]', NULL, 'take out', 'test', 1038, 2000, 962, 'paid', '2024-11-28 06:53:13'),
(45, '173', '[{\"id\":10,\"category_name\":\"food\",\"products\":[{\"id\":16,\"category_id\":10,\"product_image\":\"images/dataPlanners-1.png\",\"product_name\":\"test\",\"product_description\":\"test\",\"price\":123,\"status\":1,\"quantity\":1},{\"id\":18,\"category_id\":10,\"product_image\":\"images/user-1.png\",\"product_name\":\"test23\",\"product_description\":\"test\",\"price\":123,\"status\":1,\"quantity\":1}]}]', 1, 'dine in', 'test', 246, 300, 54, 'paid', '2024-11-28 07:09:33'),
(46, '827', '[{\"id\":10,\"category_name\":\"food\",\"products\":[{\"id\":25,\"category_id\":10,\"product_image\":\"images/user.png\",\"product_name\":\"testing\",\"product_description\":\"test\",\"price\":1243,\"status\":1,\"quantity\":1},{\"id\":24,\"category_id\":10,\"product_image\":\"images/key-1.png\",\"product_name\":\"test\",\"product_description\":\"test\",\"price\":23,\"status\":1,\"quantity\":3}]}]', NULL, 'take out', 'test', 1312, 2000, 688, 'paid', '2024-11-28 08:32:22');

-- --------------------------------------------------------

--
-- Table structure for table `products_tbl`
--

CREATE TABLE `products_tbl` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_image` text NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_description` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products_tbl`
--

INSERT INTO `products_tbl` (`id`, `category_id`, `product_image`, `product_name`, `product_description`, `price`, `status`, `created_at`) VALUES
(12, 2, 'images/Screenshot from 2024-06-10 15-27-41.png', 'red horse(100ml)', 'beer', 125, 1, '2024-11-02 02:38:20'),
(14, 10, 'images/screenshot-3.png', 'testFood', 'this is a test', 100, 1, '2024-11-07 00:17:33'),
(24, 10, 'images/key-1.png', 'test', 'test', 23, 1, '2024-11-28 08:25:02'),
(25, 10, 'images/user.png', 'testing', 'test', 1243, 1, '2024-11-28 08:27:41');

-- --------------------------------------------------------

--
-- Table structure for table `product_categories_tbl`
--

CREATE TABLE `product_categories_tbl` (
  `id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_categories_tbl`
--

INSERT INTO `product_categories_tbl` (`id`, `category_name`, `created_at`) VALUES
(2, 'Drinks', '2024-09-21 22:46:51'),
(10, 'food', '2024-11-07 00:17:09');

-- --------------------------------------------------------

--
-- Table structure for table `pullout_inventory_tbl`
--

CREATE TABLE `pullout_inventory_tbl` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_amount` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pullout_inventory_tbl`
--

INSERT INTO `pullout_inventory_tbl` (`id`, `product_id`, `item_id`, `quantity`, `total_amount`, `created_at`, `updated_at`) VALUES
(1, 16, 6, 23, 1200, '2024-11-28 04:49:25', '2024-11-28 04:49:25'),
(2, 19, 6, 1, 12, '2024-11-28 05:28:22', '2024-11-28 05:28:22'),
(3, 20, 6, 3, 36, '2024-11-28 05:37:26', '2024-11-28 05:37:26'),
(4, 22, 6, 1, 12, '2024-11-28 05:37:56', '2024-11-28 05:37:56'),
(5, 23, 6, 3, 36, '2024-11-28 05:39:00', '2024-11-28 05:39:00'),
(6, 24, 6, 2, 24, '2024-11-28 08:25:02', '2024-11-28 08:25:02'),
(7, 25, 6, 20, 240, '2024-11-28 08:27:41', '2024-11-28 08:27:41');

-- --------------------------------------------------------

--
-- Table structure for table `refresh_token`
--

CREATE TABLE `refresh_token` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `refresh_token` text NOT NULL,
  `ctime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `refresh_token`
--

INSERT INTO `refresh_token` (`id`, `user_id`, `refresh_token`, `ctime`) VALUES
(39, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNzUxMTk5LCJleHAiOjE3MzMzNTU5OTl9.vQRNPun5S3DEpaxCUdbCcjv2HGrFrcJekn3SLbx7OIo', '2024-11-27 23:46:39');

-- --------------------------------------------------------

--
-- Table structure for table `userinfo_tbl`
--

CREATE TABLE `userinfo_tbl` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `ctime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userinfo_tbl`
--

INSERT INTO `userinfo_tbl` (`id`, `user_id`, `first_name`, `last_name`, `gender`, `ctime`) VALUES
(1, 1, 'test123', 'test', 'male', '2024-11-06 09:08:19'),
(3, 5, 'test', 'test', 'male', '2024-11-07 01:31:37');

-- --------------------------------------------------------

--
-- Table structure for table `user_tbl`
--

CREATE TABLE `user_tbl` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'New Account',
  `role` enum('admin','super_admin') NOT NULL DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_tbl`
--

INSERT INTO `user_tbl` (`id`, `username`, `password`, `status`, `role`, `created_at`, `updated_at`) VALUES
(1, 'test2', '$2a$10$96hHU9zzY0A0686MnlP4GOAnrDM.UAxcP8PVeax1VjKCvZ7mXexHi', 'online', 'super_admin', '2024-09-08 00:30:30', NULL),
(5, 'test', '$2a$10$Rs9vy860lBEFnQICue8luuC2ROvblI1XgXXFvWWJ3CZKS7ZH.9yMe', 'offline', 'admin', '2024-11-07 01:31:37', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer_table_tbl`
--
ALTER TABLE `customer_table_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items_category_tbl`
--
ALTER TABLE `items_category_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items_tbl`
--
ALTER TABLE `items_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_tbl`
--
ALTER TABLE `order_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products_tbl`
--
ALTER TABLE `products_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_categories_tbl`
--
ALTER TABLE `product_categories_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pullout_inventory_tbl`
--
ALTER TABLE `pullout_inventory_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userinfo_tbl`
--
ALTER TABLE `userinfo_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_tbl`
--
ALTER TABLE `user_tbl`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer_table_tbl`
--
ALTER TABLE `customer_table_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `items_category_tbl`
--
ALTER TABLE `items_category_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `items_tbl`
--
ALTER TABLE `items_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `order_tbl`
--
ALTER TABLE `order_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `products_tbl`
--
ALTER TABLE `products_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `product_categories_tbl`
--
ALTER TABLE `product_categories_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pullout_inventory_tbl`
--
ALTER TABLE `pullout_inventory_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `refresh_token`
--
ALTER TABLE `refresh_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `userinfo_tbl`
--
ALTER TABLE `userinfo_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_tbl`
--
ALTER TABLE `user_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
