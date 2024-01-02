-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2023 at 07:32 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `si apotek adora`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(64) NOT NULL,
  `role` varchar(50) NOT NULL,
  `salt` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`idUser`, `username`, `password`, `role`, `salt`) VALUES
(1, 'budi1234', 'f56d755b6870a994e7aa8ae6440833ea33ac5ec70d2fd917d4bf66320dacda3c', 'pemilik', 'c35087f5-c39e-46c2-aa70-ff9031c5eaee'),
(2, 'Toni_123', 'd3c662d732ffc3f0b4c65782c55458d305d467b0d6eab5a67842f4b9c971c684', 'kasir', 'dc5abc5c-45c3-4ca9-8469-e491c4a61247'),
(3, 'Dea_4567', 'ca01bacb594a03c8198a1d3138906bd35c8f12f6706f31a0698e6581456261b2', 'ttk', '4bbecc72-1b95-45db-95ad-5978249cfd7a'),
(4, 'joni_984', '69958f44255cf84390a692b7b48c5e61b7e3787a02b097830bdccae493af8760', 'ttk', '0333bab0-675b-4a90-af5a-e0b8fd499efd'),
(5, 'asep_345', '28f3c9e4dc82c25fc1ba8ba7e9ad34e7244703f97fcd086dd99c2b820fb60098', 'ttk', '5176e6d4-ab91-40f5-aa57-b7ec91a2f9be'),
(6, 'ujang_90', 'd5b5bc908aabb59ace8118f3a9c0da29d3c533e00a27ff87503db42306fa1868', 'ttk', 'be55ac2b-dc6b-4e8d-8292-62971eb3bf99'),
(7, 'dina_123', 'e6eaf8ae573da5cb46c10290d129347b75a580a1fe33961e2b0ffec1d35dd38b', 'kasir', '2ccfa0c9-391f-4c4c-9105-e80e971c6217'),
(8, 'ronaldo1', 'ea4a99506b5b0edad40fe17ea63c1a9a3ae94326eb37d3d243e2c04ca3aae38e', 'ttk', 'f2900f01-6005-487c-8740-63d4f29bd424'),
(9, 'messi_12', '1424ec577743ed4f1c8e528cd1382091d2ab5ec2077adb2117696451494bf628', 'ttk', 'c493e20e-1241-461d-8bba-1dddedd0bb09'),
(10, 'henry_56', '760a8f0a1f76cb1a5e48bbeb40e71ff2c219d1863e58118b16a69cfc5aaa2f2b', 'kasir', 'd4258506-93dc-4e96-b3b6-7d38bc31c6c8'),
(11, 'cavani_1', '8b02f874627df1bc3b11b074b36d1544f2fa933d2211c7eb3aa15e48d671a9a7', 'ttk', '55e52bee-adfd-42b4-b9a8-091c84b7d7b6'),
(12, 'jhopkins', 'ce50e774cc615f6ec3335b936279c41cd27c9f5e11e48b47137eaa702f2e0b80', 'kasir', '938bb4b8-cb3b-4ea8-a0dd-efefeb5065e3'),
(13, 'neymarjr', 'cbf94aadcc78889197bc775cd44018fd01f87fcf0838a4d0cd148c2a6171b991', 'ttk', 'c4be2c4a-a6c1-43d0-a2c9-9fb6aec37794'),
(14, 'adfwf123', '52d61e5f261ed2a71c8c7381d849c0537ac82647d6dbd7ef87d3f26779a970aa', 'kasir', 'cb5c70a4-7482-4a5d-82c2-23fda7aa955c'),
(15, 'jocruyff', 'fafc1a6b616cabebc98bd67d204c6d1eb399b4510d8d55b1dbe8910843e3c97f', 'kasir', '7580b952-c058-43aa-9723-2091fcf04030'),
(16, 'annaWasa', '11c61f16e77fd95e921977237cd27f85a4d6ad623ec5650f07c69599c75a778f', 'kasir', 'ae259573-4b4c-45e0-a29b-e1b64ec5b783'),
(17, 'guardiol', '3d455a0cea2ad53fa1c5f957e40ade3dd67ce29923c09604bb8bf86f8a2818d1', 'kasir', '64fb3d96-d36b-4bbf-94a5-a2eebde8b6c2'),
(18, 'aaaaaaaa', 'a59ef34f2d24c3b9c8f6f94c00cf164e3e54779e21bf8dd94a80d5350a8c57dd', 'ttk', 'df553cb8-425b-44d1-89aa-07e0b26284b0'),
(19, 'pixies12', 'ce1def6eaa988aa2d6c71e7ede2a0b4262b20c10768e4b9abc95c24434f7ef43', 'kasir', 'f00b8c28-d2e5-43fe-bfe9-461b1e84be5f'),
(20, 'jobssteve', '38c618821a2c3f9d6050af55006f09de9e189c74a5c5f856ed2dedaa201ae9e0', 'kasir', '92d5387e-b409-45b2-92a3-efa879365193'),
(21, 'budisar1', '2b503a97829e394ab6279f9388a6e0c574a75510d3c6c4ccbfc835ea3a612adf', 'kasir', 'a8c39d40-e5d5-45a7-852d-7e4f31f0e777');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
