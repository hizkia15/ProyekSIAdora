-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2023 at 10:21 AM
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
-- Database: `apotek_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksi_pembelian`
--

CREATE TABLE `detail_transaksi_pembelian` (
  `no_faktur` varchar(50) NOT NULL,
  `id_item` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `subtotal` float NOT NULL,
  `harga_per_satuan` float NOT NULL,
  `no_detail_pembelian` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksi_penjualan`
--

CREATE TABLE `detail_transaksi_penjualan` (
  `no_transaksi` varchar(50) NOT NULL,
  `id_item` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `jenis_pelanggan` varchar(5) NOT NULL,
  `subtotal` float NOT NULL,
  `harga_per_satuan` float NOT NULL,
  `no_detail_penjualan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksi_stok_opname`
--

CREATE TABLE `detail_transaksi_stok_opname` (
  `no_detail_opname` int(11) NOT NULL,
  `no_opname` varchar(50) NOT NULL,
  `stok_fisik` int(11) NOT NULL,
  `stok_sistem` int(11) NOT NULL,
  `selisih` int(11) NOT NULL,
  `id_item` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `history_harga_jual`
--

CREATE TABLE `history_harga_jual` (
  `id_history` int(11) NOT NULL,
  `harga` int(11) NOT NULL,
  `tgl_awal` date DEFAULT NULL,
  `tgl_akhir` date DEFAULT NULL,
  `id_item` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id_item` int(11) NOT NULL,
  `nama` varchar(15) NOT NULL,
  `stok` int(11) NOT NULL,
  `stok_min` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `id_rak` int(11) NOT NULL,
  `id_satuan` int(11) NOT NULL,
  `id_jenis_item` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jenis`
--

CREATE TABLE `jenis` (
  `id_jenis` int(11) NOT NULL,
  `nama` varchar(15) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `kota`
--

CREATE TABLE `kota` (
  `id_kota` int(11) NOT NULL,
  `nama_kota` varchar(15) NOT NULL,
  `kode_kota` varchar(5) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `rak`
--

CREATE TABLE `rak` (
  `id_rak` int(11) NOT NULL,
  `nama_rak` varchar(15) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `satuan`
--

CREATE TABLE `satuan` (
  `id_satuan` int(11) NOT NULL,
  `nama` varchar(15) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id_supplier` int(11) NOT NULL,
  `kode_supplier` varchar(5) NOT NULL,
  `nama_supplier` varchar(15) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `id_kota` int(11) NOT NULL,
  `no_hp` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_pembelian`
--

CREATE TABLE `transaksi_pembelian` (
  `no_faktur` varchar(50) NOT NULL,
  `tanggal` date NOT NULL,
  `margin` float NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_supplier` int(11) NOT NULL,
  `total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_penjualan`
--

CREATE TABLE `transaksi_penjualan` (
  `no_transaksi` varchar(50) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `total` float DEFAULT NULL,
  `biaya_racik` int(11) NOT NULL,
  `diskon` float NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_stok_opname`
--

CREATE TABLE `transaksi_stok_opname` (
  `no_opname` varchar(50) NOT NULL,
  `tanggal` date NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `role` varchar(10) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_transaksi_pembelian`
--
ALTER TABLE `detail_transaksi_pembelian`
  ADD PRIMARY KEY (`no_detail_pembelian`),
  ADD KEY `fk_detail_item_pembelian` (`id_item`),
  ADD KEY `fk_detail_no_faktur` (`no_faktur`);

--
-- Indexes for table `detail_transaksi_penjualan`
--
ALTER TABLE `detail_transaksi_penjualan`
  ADD PRIMARY KEY (`no_detail_penjualan`),
  ADD KEY `fk_detail_item_penjualan` (`id_item`),
  ADD KEY `fk_detail_transaksi_penjualan` (`no_transaksi`);

--
-- Indexes for table `detail_transaksi_stok_opname`
--
ALTER TABLE `detail_transaksi_stok_opname`
  ADD PRIMARY KEY (`no_detail_opname`),
  ADD KEY `fk_detail_item_opname` (`id_item`),
  ADD KEY `fk_detail_no_opname` (`no_opname`);

--
-- Indexes for table `history_harga_jual`
--
ALTER TABLE `history_harga_jual`
  ADD PRIMARY KEY (`id_history`),
  ADD KEY `fk_item_history` (`id_item`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id_item`),
  ADD KEY `fk_rak_item` (`id_rak`),
  ADD KEY `fk_satuan_item` (`id_satuan`),
  ADD KEY `fk_jenis_item` (`id_jenis_item`);

--
-- Indexes for table `jenis`
--
ALTER TABLE `jenis`
  ADD PRIMARY KEY (`id_jenis`);

--
-- Indexes for table `kota`
--
ALTER TABLE `kota`
  ADD PRIMARY KEY (`id_kota`);

--
-- Indexes for table `rak`
--
ALTER TABLE `rak`
  ADD PRIMARY KEY (`id_rak`);

--
-- Indexes for table `satuan`
--
ALTER TABLE `satuan`
  ADD PRIMARY KEY (`id_satuan`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id_supplier`),
  ADD KEY `fk_kota_supplier` (`id_kota`);

--
-- Indexes for table `transaksi_pembelian`
--
ALTER TABLE `transaksi_pembelian`
  ADD PRIMARY KEY (`no_faktur`),
  ADD KEY `fk_supplier_pembelian` (`id_supplier`),
  ADD KEY `fk_user_pembelian` (`id_user`);

--
-- Indexes for table `transaksi_penjualan`
--
ALTER TABLE `transaksi_penjualan`
  ADD PRIMARY KEY (`no_transaksi`),
  ADD KEY `fk_user_penjualan` (`id_user`);

--
-- Indexes for table `transaksi_stok_opname`
--
ALTER TABLE `transaksi_stok_opname`
  ADD PRIMARY KEY (`no_opname`),
  ADD KEY `fk_user_opname` (`id_user`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_transaksi_stok_opname`
--
ALTER TABLE `detail_transaksi_stok_opname`
  MODIFY `no_detail_opname` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rak`
--
ALTER TABLE `rak`
  MODIFY `id_rak` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `satuan`
--
ALTER TABLE `satuan`
  MODIFY `id_satuan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id_supplier` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_transaksi_pembelian`
--
ALTER TABLE `detail_transaksi_pembelian`
  ADD CONSTRAINT `fk_detail_item_pembelian` FOREIGN KEY (`id_item`) REFERENCES `item` (`id_item`),
  ADD CONSTRAINT `fk_detail_no_faktur` FOREIGN KEY (`no_faktur`) REFERENCES `transaksi_pembelian` (`no_faktur`);

--
-- Constraints for table `detail_transaksi_penjualan`
--
ALTER TABLE `detail_transaksi_penjualan`
  ADD CONSTRAINT `fk_detail_item_penjualan` FOREIGN KEY (`id_item`) REFERENCES `item` (`id_item`),
  ADD CONSTRAINT `fk_detail_transaksi_penjualan` FOREIGN KEY (`no_transaksi`) REFERENCES `transaksi_penjualan` (`no_transaksi`);

--
-- Constraints for table `detail_transaksi_stok_opname`
--
ALTER TABLE `detail_transaksi_stok_opname`
  ADD CONSTRAINT `fk_detail_item_opname` FOREIGN KEY (`id_item`) REFERENCES `item` (`id_item`),
  ADD CONSTRAINT `fk_detail_no_opname` FOREIGN KEY (`no_opname`) REFERENCES `transaksi_stok_opname` (`no_opname`);

--
-- Constraints for table `history_harga_jual`
--
ALTER TABLE `history_harga_jual`
  ADD CONSTRAINT `fk_item_history` FOREIGN KEY (`id_item`) REFERENCES `item` (`id_item`) ON UPDATE NO ACTION;

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `fk_jenis_item` FOREIGN KEY (`id_jenis_item`) REFERENCES `jenis` (`id_jenis`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rak_item` FOREIGN KEY (`id_rak`) REFERENCES `rak` (`id_rak`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_satuan_item` FOREIGN KEY (`id_satuan`) REFERENCES `satuan` (`id_satuan`) ON UPDATE CASCADE;

--
-- Constraints for table `supplier`
--
ALTER TABLE `supplier`
  ADD CONSTRAINT `fk_kota_supplier` FOREIGN KEY (`id_kota`) REFERENCES `kota` (`id_kota`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `transaksi_pembelian`
--
ALTER TABLE `transaksi_pembelian`
  ADD CONSTRAINT `fk_supplier_pembelian` FOREIGN KEY (`id_supplier`) REFERENCES `user` (`id_user`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_pembelian` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON UPDATE NO ACTION;

--
-- Constraints for table `transaksi_penjualan`
--
ALTER TABLE `transaksi_penjualan`
  ADD CONSTRAINT `fk_user_penjualan` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `transaksi_stok_opname`
--
ALTER TABLE `transaksi_stok_opname`
  ADD CONSTRAINT `fk_user_opname` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
