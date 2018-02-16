-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 16, 2018 at 09:58 PM
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
  `request_date` date DEFAULT NULL,
  `request_status` varchar(10) DEFAULT NULL,
  `product_quantity` int(255) DEFAULT NULL,
  `location` varchar(100) NOT NULL,
  `client_order` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_request`
--

INSERT INTO `product_request` (`request_id`, `product_name`, `request_date`, `request_status`, `product_quantity`, `location`, `client_order`) VALUES
(17, 'abc', '2018-02-16', 'Complete', 10, 'plant1', 'def'),
(18, 'abc', '2018-02-16', 'CREATED', 10, 'plant1', 'def'),
(19, 'abc', '2018-02-16', 'CREATED', 10, 'plant1', 'def'),
(20, 'abc', '2018-02-16', 'CREATED', 10, 'plant1', 'def'),
(21, 'abc', '2018-02-16', 'Complete', 10, 'plant1', 'def');

-- --------------------------------------------------------

--
-- Table structure for table `product_request_raw_materials`
--

CREATE TABLE `product_request_raw_materials` (
  `product_request_id` varchar(100) NOT NULL,
  `raw_material_id` varchar(100) NOT NULL,
  `raw_material_name` varchar(100) NOT NULL,
  `raw_material_qty` varchar(100) NOT NULL,
  `raw_material_unit` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_request_raw_materials`
--

INSERT INTO `product_request_raw_materials` (`product_request_id`, `raw_material_id`, `raw_material_name`, `raw_material_qty`, `raw_material_unit`) VALUES
('17', '1', 'abc', '10', 'lts'),
('17', '1', 'abc', '10', 'lts'),
('17', '5', 'abc', '10', 'lts'),
('20', '1', 'abc', '10', 'lts'),
('21', '1', 'abc', '10', 'lts'),
('21', '4', 'abc', '10', 'lts');

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
('1', 'abc', '2017-12-31T18:30:00.000Z', '2017-12-31T18:30:00.000Z', '2018-12-31T18:30:00.000Z', '1', '1', '1', '1', 'Complete', '1000'),
('2', 'abc', '2017-12-31T18:30:00.000Z', '2017-12-31T18:30:00.000Z', '2017-12-31T18:30:00.000Z', '1', '1', '1', '1', 'Complete', '1000');

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
('1', '1', 'abc', 'abc', '10', '100', '100', '1000', '10', 'Complete'),
('2', '5', 'vishal', 'vishal', '10', 'l', '100', '1000', '10', 'Complete');

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
(1, 'abc', NULL),
(2, 'mc', NULL),
(3, 'bca', NULL),
(4, 'vba', NULL),
(5, 'vishal', NULL);

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
  `source_id` varchar(100) NOT NULL,
  `min_to_maintain` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `store_room`
--

INSERT INTO `store_room` (`id`, `quantity`, `entry_date`, `last_modified`, `name`, `description`, `unit`, `location`, `type`, `source_id`, `min_to_maintain`) VALUES
(30, 9920, '2018-02-16 13:40:07', '2018-02-16 16:16:10', 'abc', 'abc', '100', '', 'raw_materials', '1', ''),
(31, -60, '2018-02-16 14:27:41', '2018-02-16 16:16:02', 'vishal', 'vishal', 'l', '', 'raw_materials', '5', '');

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
('abc', 'abc', '10', '', 'raw_materials', '10', 'CREATED', '1', 134, '100'),
('abc', 'abc', '10', '', 'raw_materials', '10', 'Complete', '1', 135, '100'),
('vishal', 'vishal', '10', '', 'raw_materials', '10', 'Complete', '5', 136, 'l');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `user_name` varchar(100) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `access_level` int(10) NOT NULL,
  `comments` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`user_name`, `user_pass`, `access_level`, `comments`) VALUES
('a', '$2y$10$VmN2NMYdGtnvdmUWHIslVON6R.S7MasCrenTb/cmO/Z/r05bwmNnS', 0, ''),
('abc', '$2y$10$ChNshTy9xLnOlI5jE/SIR.f6iJhq/9VL2SHzr7Vy6xJKBMmtQ4kvi', 1, ''),
('amruta', '$2y$10$5TrCJBZYhsyNWjk2rMAx...TzTm2xtbMzgPv/zVmFgyb9QwJ9Py5.', 3, ''),
('kamath', '$2y$10$vb/VF8kuhrqsoS8rQsAuj.fwtZvxHjvj0PopMr.riL9Ndx7KZTl1y', 0, ''),
('p', '$2y$10$5l7oNpdCUI0uS.4ASeUDFOc/djmvRypwjti3P2mZsXkW54SYuoXUW', 2, ''),
('pr', '$2y$10$aAhobV/xhNNxKmv89zVIh.suuN99.eZFx/cCo/2iXGMZV48vv5R.K', 4, ''),
('pratik', '$2y$10$UliPUKkcTZAmTf02RCxeA.PyIO2ZQCiY1URyQ7n/pUPlw95HsieeK', 0, ''),
('vishal', '$2y$10$Cs06m6fFf/2kzab05NHwP.6oW2VcYB2dV5D7iVL15.rvL8U7.d706', 1, '');

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
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product_request`
--
ALTER TABLE `product_request`
  MODIFY `request_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `raw_materials`
--
ALTER TABLE `raw_materials`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `store_room`
--
ALTER TABLE `store_room`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `store_room_entry`
--
ALTER TABLE `store_room_entry`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
