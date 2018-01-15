-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2018 at 05:40 PM
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
-- Table structure for table `po_request`
--

CREATE TABLE `po_request` (
  `request_id` int(255) NOT NULL,
  `raw_materials` varchar(100) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `quantity_check` varchar(10) DEFAULT NULL,
  `quality_check` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `po_request`
--

INSERT INTO `po_request` (`request_id`, `raw_materials`, `created_date`, `product_name`, `quantity_check`, `quality_check`) VALUES
(1, 'abc', '2017-12-14', 'abc', NULL, NULL),
(2, 'a,b,c', '2017-12-20', 'methyl', NULL, NULL);

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
-- Indexes for table `po_request`
--
ALTER TABLE `po_request`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `product_request`
--
ALTER TABLE `product_request`
  ADD PRIMARY KEY (`request_id`);

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
-- AUTO_INCREMENT for table `po_request`
--
ALTER TABLE `po_request`
  MODIFY `request_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
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
