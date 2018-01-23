-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 23, 2018 at 06:28 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chemical_factory`
--

-- --------------------------------------------------------

--
-- Table structure for table `product_request`
--

CREATE TABLE `product_request` (
  `request_id` int(255) NOT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `byproduct_name` varchar(100) DEFAULT NULL,
  `raw_materials` varchar(1000) DEFAULT NULL,
  `request_date` date DEFAULT NULL,
  `request_confirmation` varchar(10) DEFAULT NULL,
  `product_quantity` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_request`
--

CREATE TABLE `purchase_request` (
  `purchase_order_id` varchar(100) NOT NULL,
  `purchase_order_to` varchar(100) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  `qtn_Dt` varchar(100) DEFAULT NULL,
  `req_Dt` varchar(100) DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `payment` varchar(100) DEFAULT NULL,
  `transport` varchar(100) DEFAULT NULL,
  `delivery_schedule` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `totalAmt` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchase_request`
--

INSERT INTO `purchase_request` (`purchase_order_id`, `purchase_order_to`, `date`, `qtn_Dt`, `req_Dt`, `unit`, `payment`, `transport`, `delivery_schedule`, `status`, `totalAmt`) VALUES
('1', 'vishal', '2017-12-31T18:30:00.000Z', '2017-12-31T18:30:00.000Z', '2017-12-31T18:30:00.000Z', '1', '1', '1', '1', 'Complete', '1000'),
('2', 'pratik', '2018-12-31T18:30:00.000Z', '2018-12-31T18:30:00.000Z', '2018-01-01T18:30:00.000Z', 'a', 'a', 'a', 'a', 'Complete', '100');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_request_raw_materials`
--

CREATE TABLE `purchase_request_raw_materials` (
  `purchase_order_id` varchar(100) DEFAULT NULL,
  `raw_material_id` varchar(100) DEFAULT NULL,
  `raw_material_name` varchar(100) DEFAULT NULL,
  `raw_material_desc` varchar(100) DEFAULT NULL,
  `raw_material_qty` varchar(100) DEFAULT NULL,
  `raw_material_unit` varchar(100) DEFAULT NULL,
  `raw_material_rate` varchar(100) DEFAULT NULL,
  `raw_material_amt` varchar(100) DEFAULT NULL,
  `raw_material_quality` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchase_request_raw_materials`
--

INSERT INTO `purchase_request_raw_materials` (`purchase_order_id`, `raw_material_id`, `raw_material_name`, `raw_material_desc`, `raw_material_qty`, `raw_material_unit`, `raw_material_rate`, `raw_material_amt`, `raw_material_quality`, `status`) VALUES
('1', '1', 'abc', 'abc', '101', '10', '100', '100', '10', 'Complete'),
('2', '2', 'def', 'def', '10', '10', '10', '10', '10', 'Complete'),
('2', '1', 'abc', 'abc', '10', '0', '0', '0', '10', 'Complete'),
('2', '4', 'vishal', 'vishal', '0', '0', '0', '0', '10', 'Complete');

-- --------------------------------------------------------

--
-- Table structure for table `raw_materials`
--

CREATE TABLE `raw_materials` (
  `id` int(255) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `raw_materials`
--

INSERT INTO `raw_materials` (`id`, `name`, `created_date`) VALUES
(1, 'abc', '2018-01-14'),
(2, 'def', '2018-01-15'),
(3, 'abc', NULL),
(4, 'vishal', NULL),
(5, NULL, NULL),
(6, NULL, NULL),
(7, NULL, NULL),
(8, NULL, NULL),
(9, NULL, NULL),
(10, NULL, NULL),
(11, NULL, NULL),
(12, NULL, NULL),
(13, NULL, NULL),
(14, NULL, NULL),
(15, NULL, NULL),
(16, NULL, NULL),
(17, NULL, NULL),
(18, NULL, NULL),
(19, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `store_room`
--

CREATE TABLE `store_room` (
  `id` int(255) NOT NULL,
  `quantity` int(255) DEFAULT NULL,
  `entry_date` timestamp NULL DEFAULT NULL,
  `last_modified` timestamp NULL DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `unit` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `source_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `store_room`
--

INSERT INTO `store_room` (`id`, `quantity`, `entry_date`, `last_modified`, `name`, `description`, `unit`, `location`, `type`, `source_id`) VALUES
(1, 0, '2017-12-31 18:30:00', '2017-12-31 18:30:00', 'ab', 'ab', '1', 'a', 'a', '1'),
(2, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1', '1', '1', '', '1', ''),
(3, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1', '1', '1', '', '1', ''),
(4, 101, '2018-01-22 13:46:00', '2018-01-22 13:46:00', 'abc', 'abc', '10', '', 'raw_materials', '');

-- --------------------------------------------------------

--
-- Table structure for table `store_room_entry`
--

CREATE TABLE `store_room_entry` (
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `quantity` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `quality` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `source_id` varchar(100) NOT NULL,
  `id` int(100) NOT NULL,
  `unit` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `store_room_entry`
--

INSERT INTO `store_room_entry` (`name`, `description`, `quantity`, `location`, `type`, `quality`, `status`, `source_id`, `id`, `unit`) VALUES
('abc', 'abc', '101', '', 'raw_materials', '10', 'Complete', '1', 1, '10'),
('abc', 'abc', '101', '', 'raw_materials', '10', 'Complete', '1', 2, '10'),
('abc', 'abc', '101', '', 'raw_materials', '10', '', '1', 3, '10'),
('def', 'def', '10', '', 'raw_materials', '10', '', '2', 4, '10'),
('abc', 'abc', '10', '', 'raw_materials', '10', '', '2', 5, '0'),
('vishal', 'vishal', '0', '', 'raw_materials', '10', 'Complete', '2', 6, '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product_request`
--
ALTER TABLE `product_request`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `purchase_request`
--
ALTER TABLE `purchase_request`
  ADD PRIMARY KEY (`purchase_order_id`);

--
-- Indexes for table `raw_materials`
--
ALTER TABLE `raw_materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store_room`
--
ALTER TABLE `store_room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store_room_entry`
--
ALTER TABLE `store_room_entry`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product_request`
--
ALTER TABLE `product_request`
  MODIFY `request_id` int(255) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `raw_materials`
--
ALTER TABLE `raw_materials`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `store_room`
--
ALTER TABLE `store_room`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `store_room_entry`
--
ALTER TABLE `store_room_entry`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
