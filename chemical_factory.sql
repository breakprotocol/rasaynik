-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2018 at 04:14 PM
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
('101', 'vishal', '2017-01-01', '2017-09-08', '2018-01-09', 'lts', 'cash', 'abc', 'sc', NULL, ''),
('102', 'vishal', '2017-01-01', '2017-09-08', '2018-01-09', 'lts', 'cash', 'abc', 'sc', NULL, ''),
('103', 'vishal', '2017-01-01', '2017-09-08', '2018-01-09', 'lts', 'cash', 'abc', 'sc', NULL, ''),
('104', 'vishal', '2017-01-01', '2017-09-08', '2018-01-09', 'lts', 'cash', 'abc', 'sc', NULL, ''),
('105', 'vishal', '2017-01-01', '2017-09-08', '2018-01-09', 'lts', 'cash', 'abc', 'sc', NULL, ''),
('106', 'vishal', '2017-01-01', '2017-09-08', '2018-01-09', 'lts', 'cash', 'abc', 'sc', NULL, ''),
('107', 'vishal', '2017-01-01', '2017-09-08', '2018-01-09', 'lts', 'cash', 'abc', 'sc', NULL, ''),
('108', 'vishal', '2017-01-01', '2017-09-08', '2018-01-09', 'lts', 'cash', 'abc', 'sc', NULL, ''),
('109', 'vishal', '2017-01-01', '2017-09-08', '2018-01-09', 'lts', 'cash', 'abc', 'sc', NULL, ''),
('110', 'vishal', '2017-01-01', '2017-09-08', '2018-01-09', 'lts', 'cash', 'abc', 'sc', NULL, ''),
('111', 'vishal', '2017-01-01', '2017-09-08', '2018-01-09', 'lts', 'cash', 'abc', 'sc', NULL, ''),
('112', 'vishal', '2017-01-01', '2017-09-08', '2018-01-09', 'lts', 'cash', 'abc', 'sc', NULL, '1000');

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
('103', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('103', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('101', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('101', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('102', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('102', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('104', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('104', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('105', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('105', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('106', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('106', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('107', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('107', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('108', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('108', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('109', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('109', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('109', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('109', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('109', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('109', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('110', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('110', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('110', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('110', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('110', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('110', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('111', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('111', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('112', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL),
('112', '101', 'abc', 'def', '25', 'ltr', '2500', '2500', 'good', NULL);

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
(2, 'def', '2018-01-15');

-- --------------------------------------------------------

--
-- Table structure for table `store_room`
--

CREATE TABLE `store_room` (
  `id` int(255) NOT NULL,
  `raw_materials` int(255) DEFAULT NULL,
  `quantity` int(255) DEFAULT NULL,
  `entry_date` date DEFAULT NULL,
  `last_modified` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `store_room`
--
ALTER TABLE `store_room`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
