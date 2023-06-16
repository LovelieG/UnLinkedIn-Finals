-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 15, 2023 at 06:04 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `backend_finals`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications_tbl`
--

CREATE TABLE `applications_tbl` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `resume_id` int(11) NOT NULL,
  `is_approved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `companies_tbl`
--

CREATE TABLE `companies_tbl` (
  `id` int(11) NOT NULL,
  `jobs_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employees_tbl`
--

CREATE TABLE `employees_tbl` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees_tbl`
--

INSERT INTO `employees_tbl` (`id`, `first_name`, `last_name`, `username`, `password`, `company_name`) VALUES
(1, 'Ma. Lovelie25', 'Gaspar', 'lovelieG1', '02102003', 'Jabiii '),
(2, 'Ma. Lovelie256', 'Gaspar', 'lovelieG1', '02102003', 'GalitSakin'),
(3, 'Ma. Lovelie2567', 'Gaspar', 'lovelieG12', '02102003', 'GalitSakin'),
(4, 'Ma. Lovelie2567', 'Gaspar', 'lovelieG123', '02102003', 'GalitSakin');

-- --------------------------------------------------------

--
-- Table structure for table `jobs_tbl`
--

CREATE TABLE `jobs_tbl` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `slots` int(11) NOT NULL,
  `emp_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jobs_tbl`
--

INSERT INTO `jobs_tbl` (`id`, `name`, `description`, `slots`, `emp_ID`) VALUES
(2, 'Janitor', 'Cleaning toilets', 1, 2),
(3, 'Janitor', 'Cleaning toilets', 5, 2),
(4, 'Janitor', 'Cleaning toilets', 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `resumes_tbl`
--

CREATE TABLE `resumes_tbl` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `contact_number` varchar(11) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `course` varchar(255) NOT NULL,
  `university` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `resumes_tbl`
--

INSERT INTO `resumes_tbl` (`id`, `first_name`, `last_name`, `birthdate`, `contact_number`, `gender`, `course`, `university`, `email`, `password`) VALUES
(1, 'AldrinJan', 'Quitalig', '1997-10-13', '09457040803', 'Male', 'BSIT', 'CEU', 'aldrin_quitalig1@gmail.com', 'test'),
(3, 'AldrinJan1', '123 ', '1997-10-13', '09457040803', 'Male', 'BSIT', 'CEU', 'aldrin_quitalig12@gmail.com', 'test'),
(4, 'AldrinJan1', 'Quitalig', '1997-10-13', '09457040803', 'Male', 'BSIT', 'CEU', 'aldrin_quitalig12@gmail.com', 'test'),
(5, 'AldrinJan1', 'Quitalig', '1997-10-13', '09457040803', 'Male', 'BSIT', 'CEU', 'aldrin_quitalig12@gmail.com', 'test'),
(6, 'AldrinJan1', 'Quitalig', '1997-10-13', '09457040803', 'Male', 'BSIT', 'CEU', 'aldrin_quitalig12@gmail.com', 'test'),
(7, 'AldrinJan1', 'Quitalig', '1997-10-13', '09457040803', 'Male', 'BSIT', 'CEU', 'aldrin_quitalig12@gmail.com', 'test'),
(8, 'AldrinJan1', 'Quitalig', '1997-10-13', '09457040803', 'Male', 'BSIT', 'CEU', 'aldrin_quitalig121@gmail.com', 'test'),
(9, 'AldrinJan1', 'Quitalig', '1997-10-13', '09457040803', 'Male', 'BSIT', 'CEU', 'aldrin_quitalig1213@gmail.com', 'test');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications_tbl`
--
ALTER TABLE `applications_tbl`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobApplicationForeignKey` (`job_id`),
  ADD KEY `userApplicationForeignKey` (`resume_id`);

--
-- Indexes for table `companies_tbl`
--
ALTER TABLE `companies_tbl`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobCompaniesForeignKey` (`jobs_id`);

--
-- Indexes for table `employees_tbl`
--
ALTER TABLE `employees_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs_tbl`
--
ALTER TABLE `jobs_tbl`
  ADD PRIMARY KEY (`id`),
  ADD KEY `JobEmployeeForeignKey` (`emp_ID`);

--
-- Indexes for table `resumes_tbl`
--
ALTER TABLE `resumes_tbl`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications_tbl`
--
ALTER TABLE `applications_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `companies_tbl`
--
ALTER TABLE `companies_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employees_tbl`
--
ALTER TABLE `employees_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `jobs_tbl`
--
ALTER TABLE `jobs_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `resumes_tbl`
--
ALTER TABLE `resumes_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications_tbl`
--
ALTER TABLE `applications_tbl`
  ADD CONSTRAINT `jobApplicationForeignKey` FOREIGN KEY (`job_id`) REFERENCES `jobs_tbl` (`id`),
  ADD CONSTRAINT `resumeApplicationForeignKey` FOREIGN KEY (`resume_id`) REFERENCES `resumes_tbl` (`id`);

--
-- Constraints for table `companies_tbl`
--
ALTER TABLE `companies_tbl`
  ADD CONSTRAINT `jobCompaniesForeignKey` FOREIGN KEY (`jobs_id`) REFERENCES `jobs_tbl` (`id`);

--
-- Constraints for table `jobs_tbl`
--
ALTER TABLE `jobs_tbl`
  ADD CONSTRAINT `JobEmployeeForeignKey` FOREIGN KEY (`emp_ID`) REFERENCES `employees_tbl` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
