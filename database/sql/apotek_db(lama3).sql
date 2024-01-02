-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2023 at 03:42 PM
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
  `id_jenis_item` int(11) NOT NULL,
  `id_supplier` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`id_item`, `nama`, `stok`, `stok_min`, `status`, `id_rak`, `id_satuan`, `id_jenis_item`, `id_supplier`) VALUES
(2567, 'ABATE', 0, 0, 1, 1, 1, 1, 1),
(2568, 'ACARBOSE 100MG', 0, 0, 1, 1, 2, 1, 1),
(2569, 'ACARBOSE 50 MG', 0, 0, 1, 1, 2, 1, 1),
(2570, 'ACETYLCYSTEINE ', 0, 0, 1, 1, 3, 1, 1),
(2571, 'ACIFAR CR 5GR', 0, 0, 1, 1, 4, 1, 1),
(2572, 'ACNE FELDINE 11', 0, 0, 1, 1, 6, 1, 1),
(2573, 'ACNOL LOTION 10', 0, 0, 1, 1, 1, 1, 1),
(2574, 'ACTIFED EXP 60 ', 0, 0, 1, 1, 5, 1, 1),
(2575, 'ACTIFED SYR 60 ', 0, 0, 1, 1, 5, 1, 1),
(2576, 'ACTIFED SYR 60 ', 0, 0, 1, 1, 5, 1, 1),
(2577, 'ACYCLOVIR 200 M', 0, 0, 1, 1, 2, 1, 1),
(2578, 'ACYCLOVIR 400 M', 0, 0, 1, 1, 2, 1, 1),
(2579, 'ACYCLOVIR CR', 0, 0, 1, 1, 4, 1, 1),
(2580, 'ADALAT OROS 30', 0, 0, 1, 1, 2, 1, 1),
(2581, 'ADEM SARI', 0, 0, 1, 1, 7, 1, 1),
(2582, 'AKURAT TEST PAC', 0, 0, 1, 1, 1, 1, 1),
(2583, 'ALADINA 2', 0, 0, 1, 1, 1, 1, 1),
(2584, 'ALAT NEBULIZER', 0, 0, 1, 1, 1, 1, 1),
(2585, 'ALBOTHYL CONC 5', 0, 0, 1, 1, 5, 1, 1),
(2586, 'ALCO DROPS', 0, 0, 1, 1, 5, 1, 1),
(2587, 'ALCO PLUS DMP', 0, 0, 1, 1, 5, 1, 1),
(2588, 'ALCO PLUS SYR 1', 0, 0, 1, 1, 5, 1, 1),
(2589, 'ALEGI 2', 0, 0, 1, 1, 2, 1, 1),
(2590, 'ALINAMIN FORTE', 0, 0, 1, 1, 2, 1, 1),
(2591, 'ALKOHOL 70%', 0, 0, 1, 1, 5, 1, 1),
(2592, 'ALKOHOL 70% 1 L', 0, 0, 1, 1, 5, 1, 1),
(2593, 'ALKOHOL SWAB', 0, 0, 1, 1, 8, 1, 1),
(2594, 'ALLERIN SYR 120', 0, 0, 1, 1, 5, 1, 1),
(2595, 'ALLERIN SYR 60 ', 0, 0, 1, 1, 5, 1, 1),
(2596, 'ALLERON 2', 0, 0, 1, 1, 2, 1, 1),
(2597, 'ALLOPURINOL 100', 0, 0, 1, 1, 2, 1, 1),
(2598, 'ALLOPURINOL 300', 0, 0, 1, 1, 2, 1, 1),
(2599, 'ALLORIS 2', 0, 0, 1, 1, 2, 1, 1),
(2600, 'ALOCLAIR GARGLE', 0, 0, 1, 1, 5, 1, 1),
(2601, 'ALOCLAIR GEL (O', 0, 0, 1, 1, 4, 1, 1),
(2602, 'ALOFAR 100 MG', 0, 0, 1, 1, 2, 1, 1),
(2603, 'ALPARA 2', 0, 0, 1, 1, 2, 1, 1),
(2604, 'ALPENTIN 100 MG', 0, 0, 1, 1, 3, 1, 1),
(2605, 'AMBEVEN 2 9', 0, 0, 1, 1, 3, 1, 1),
(2606, 'AMBROXOL SYR', 0, 0, 1, 1, 5, 1, 1),
(2607, 'AMBROXOL 2', 0, 0, 1, 1, 2, 1, 1),
(2608, 'AMINOPHILLYN 20', 0, 0, 1, 1, 2, 1, 1),
(2609, 'AMLODIPIN  5 MG', 0, 0, 1, 1, 2, 1, 1),
(2610, 'AMLODIPIN 10 MG', 0, 0, 1, 1, 2, 1, 1),
(2611, 'AMLODIPIN 10 MG', 0, 0, 1, 1, 2, 1, 1),
(2612, 'AMOXICILLIN 500', 0, 0, 1, 1, 2, 1, 1),
(2613, 'AMOXICILLIN SYR', 0, 0, 1, 1, 5, 1, 1),
(2614, 'AMOXSAN 250 MG', 0, 0, 1, 1, 3, 1, 1),
(2615, 'AMOXSAN 500 MG', 0, 0, 1, 1, 3, 1, 1),
(2616, 'AMOXSAN DROP', 0, 0, 1, 1, 5, 1, 1),
(2617, 'AMOXSAN F SYR', 0, 0, 1, 1, 5, 1, 1),
(2618, 'AMOXSAN SYR', 0, 0, 1, 1, 5, 1, 1),
(2619, 'AMPICILLIN 500 ', 0, 0, 1, 1, 3, 1, 1),
(2620, 'ANACETIN SYR', 0, 0, 1, 1, 5, 1, 1),
(2621, 'ANADEX 2', 0, 0, 1, 1, 2, 1, 1),
(2622, 'ANAKONIDIN OBH ', 0, 0, 1, 1, 5, 1, 1),
(2623, 'ANAKONIDIN SYR ', 0, 0, 1, 1, 5, 1, 1),
(2624, 'ANAKONIDIN SYR ', 0, 0, 1, 1, 5, 1, 1),
(2625, 'ANDALAN FE', 0, 0, 1, 1, 9, 1, 1),
(2626, 'ANDALAN LAKTASI', 0, 0, 1, 1, 9, 1, 1),
(2627, 'ANDALAN PIL KB', 0, 0, 1, 1, 9, 1, 1),
(2628, 'ANTALGIN 9', 0, 0, 1, 1, 2, 1, 1),
(2629, 'ANTANGIN CAIR', 0, 0, 1, 1, 7, 1, 1),
(2630, 'ANTANGIN CAIR A', 0, 0, 1, 1, 7, 1, 1),
(2631, 'ANTANGIN PERMEN', 0, 0, 1, 1, 7, 1, 1),
(2632, 'ANTANGIN 2', 0, 0, 1, 1, 2, 1, 1),
(2633, 'ANTASIDA DOEN 2', 0, 0, 1, 1, 2, 1, 1),
(2634, 'ANTASIDA SYR', 0, 0, 1, 1, 5, 1, 1),
(2635, 'ANTIMO ANAK', 0, 0, 1, 1, 7, 1, 1),
(2636, 'ANTIMO 2', 0, 0, 1, 1, 2, 1, 1),
(2637, 'ANTIS SPRAY 55 ', 0, 0, 1, 1, 5, 1, 1),
(2638, 'APIALYS DROPS', 0, 0, 1, 1, 5, 1, 1),
(2639, 'APIALYS SYR', 0, 0, 1, 1, 5, 1, 1),
(2640, 'APOLAR CR', 0, 0, 1, 1, 4, 1, 1),
(2641, 'APOLAR N CR', 0, 0, 1, 1, 4, 1, 1),
(2642, 'APPETON GUMMIES', 0, 0, 1, 1, 8, 1, 1),
(2643, 'APPETON GUMMIES', 0, 0, 1, 1, 7, 1, 1),
(2644, 'APTOR 2', 0, 0, 1, 1, 2, 1, 1),
(2645, 'AQUA BOTOL K', 0, 0, 1, 1, 5, 1, 1),
(2646, 'ARCOXIA 120 MG', 0, 0, 1, 1, 2, 1, 1),
(2647, 'ARCOXIA 90MG', 0, 0, 1, 1, 2, 1, 1),
(2648, 'ARDIUM 2', 0, 0, 1, 1, 2, 1, 1),
(2649, 'ASAM MEFENAMAT ', 0, 0, 1, 1, 2, 1, 1),
(2650, 'ASAM TRANEKSAMA', 0, 0, 1, 1, 2, 1, 1),
(2651, 'ASCARDIA  80 MG', 0, 0, 1, 1, 2, 1, 1),
(2652, 'ASETON', 0, 0, 1, 1, 5, 1, 1),
(2653, 'ASIFIT', 0, 0, 1, 1, 8, 1, 1),
(2654, 'ASMA SOLON 2', 0, 0, 1, 1, 9, 1, 1),
(2655, 'ASPILETS 2', 0, 0, 1, 1, 2, 1, 1),
(2656, 'ASPILETS THROMB', 0, 0, 1, 1, 2, 1, 1),
(2657, 'ASTHIN FORCE 4 ', 0, 0, 1, 1, 2, 1, 1),
(2658, 'ATORVASTATIN 10', 0, 0, 1, 1, 2, 1, 1),
(2659, 'ATORVASTATIN 20', 0, 0, 1, 1, 2, 1, 1),
(2660, 'ATORVASTATIN 40', 0, 0, 1, 1, 2, 1, 1),
(2661, 'AZITROMYCIN 500', 0, 0, 1, 1, 2, 1, 1),
(2662, 'BABY COUGHT SYR', 0, 0, 1, 1, 5, 1, 1),
(2663, 'BALPIRIK MERAH', 0, 0, 1, 1, 1, 1, 1),
(2664, 'BALSEM GELIGA 1', 0, 0, 1, 1, 1, 1, 1),
(2665, 'BALSEM GELIGA 2', 0, 0, 1, 1, 1, 1, 1),
(2666, 'BALSEM GELIGA 4', 0, 0, 1, 1, 1, 1, 1),
(2667, 'BALSEM LANG 10G', 0, 0, 1, 1, 1, 1, 1),
(2668, 'BALSEM LANG 20G', 0, 0, 1, 1, 1, 1, 1),
(2669, 'BALSEM LANG 40G', 0, 0, 1, 1, 1, 1, 1),
(2670, 'BALSEM MACAN', 0, 0, 1, 1, 1, 1, 1),
(2671, 'BALSEM TJING TJ', 0, 0, 1, 1, 1, 1, 1),
(2672, 'BALSEM TJING TJ', 0, 0, 1, 1, 1, 1, 1),
(2673, 'BALSEM TRESNO J', 0, 0, 1, 1, 1, 1, 1),
(2674, 'BALSEM TRESNO J', 0, 0, 1, 1, 1, 1, 1),
(2675, 'BAQUINOR 500 MG', 0, 0, 1, 1, 2, 1, 1),
(2676, 'BATUGIN ELIXIR ', 0, 0, 1, 1, 5, 1, 1),
(2677, 'BATUGIN ELIXIR ', 0, 0, 1, 1, 5, 1, 1),
(2678, 'BAYCUTEN N CR 5', 0, 0, 1, 1, 4, 1, 1),
(2679, 'BECOM C 2 / 2', 0, 0, 1, 1, 2, 1, 1),
(2680, 'BECOM ZET', 0, 0, 1, 1, 2, 1, 1),
(2681, 'BENOSON CR 15 G', 0, 0, 1, 1, 4, 1, 1),
(2682, 'BENOSON CR 5 GR', 0, 0, 1, 1, 4, 1, 1),
(2683, 'BENOSON G CR 10', 0, 0, 1, 1, 4, 1, 1),
(2684, 'BENOSON M CR 5 ', 0, 0, 1, 1, 4, 1, 1),
(2685, 'BENOSON N CR 15', 0, 0, 1, 1, 4, 1, 1),
(2686, 'BENOSON N CR 5 ', 0, 0, 1, 1, 4, 1, 1),
(2687, 'BENZOLAC 2.5%', 0, 0, 1, 1, 4, 1, 1),
(2688, 'BENZOLAC 5%', 0, 0, 1, 1, 4, 1, 1),
(2689, 'BENZOLAC CL', 0, 0, 1, 1, 4, 1, 1),
(2690, 'BEPHANTEN CR 20', 0, 0, 1, 1, 4, 1, 1),
(2691, 'BETADINE GARGLE', 0, 0, 1, 1, 5, 1, 1),
(2692, 'BETADINE GARGLE', 0, 0, 1, 1, 5, 1, 1),
(2693, 'BETADINE HYGIEN', 0, 0, 1, 1, 5, 1, 1),
(2694, 'BETADINE OINT  ', 0, 0, 1, 1, 4, 1, 1),
(2695, 'BETADINE OINT 1', 0, 0, 1, 1, 4, 1, 1),
(2696, 'BETADINE SOL  5', 0, 0, 1, 1, 5, 1, 1),
(2697, 'BETADINE SOL 15', 0, 0, 1, 1, 5, 1, 1),
(2698, 'BETADINE SOL 30', 0, 0, 1, 1, 5, 1, 1),
(2699, 'BETADINE SOL 60', 0, 0, 1, 1, 5, 1, 1),
(2700, 'BETADINE SPRAY', 0, 0, 1, 1, 5, 1, 1),
(2701, 'BETADINE VAG + ', 0, 0, 1, 1, 8, 1, 1),
(2702, 'BETADINE VAG 10', 0, 0, 1, 1, 5, 1, 1),
(2703, 'BETAHISTINE 6MG', 0, 0, 1, 1, 2, 1, 1),
(2704, 'BETAMETASON CR', 0, 0, 1, 1, 4, 1, 1),
(2705, 'BETASON CR 5GR', 0, 0, 1, 1, 4, 1, 1),
(2706, 'BETASON N CR K', 0, 0, 1, 1, 4, 1, 1),
(2707, 'BEVALEX CR', 0, 0, 1, 1, 4, 1, 1),
(2708, 'BIC NAT/SODIUM ', 0, 0, 1, 1, 2, 1, 1),
(2709, 'BINTANG 7 PUYER', 0, 0, 1, 1, 7, 1, 1),
(2710, 'BIO ATP', 0, 0, 1, 1, 2, 1, 1),
(2711, 'BIO CREAM', 0, 0, 1, 1, 4, 1, 1),
(2712, 'BIO VISION', 0, 0, 1, 1, 9, 1, 1),
(2713, 'BIOGESIC 2', 0, 0, 1, 1, 9, 1, 1),
(2714, 'BIOLYSIN KID 2', 0, 0, 1, 1, 5, 1, 1),
(2715, 'BIOLYSIN SMART ', 0, 0, 1, 1, 5, 1, 1),
(2716, 'BIOLYSIN SMART ', 0, 0, 1, 1, 5, 1, 1),
(2717, 'BIOLYSIN SYR  6', 0, 0, 1, 1, 5, 1, 1),
(2718, 'BIOLYSIN SYR 10', 0, 0, 1, 1, 5, 1, 1),
(2719, 'BIOLYSIN 2', 0, 0, 1, 1, 9, 1, 1),
(2720, 'BIOPLACENTON CR', 0, 0, 1, 1, 4, 1, 1),
(2721, 'BIOTHICOL 500 M', 0, 0, 1, 1, 2, 1, 1),
(2722, 'BISOLVON EXTRA ', 0, 0, 1, 1, 5, 1, 1),
(2723, 'BISOLVON EXTRA ', 0, 0, 1, 1, 5, 1, 1),
(2724, 'BISOLVON KIDS S', 0, 0, 1, 1, 5, 1, 1),
(2725, 'BISOLVON SOL 50', 0, 0, 1, 1, 5, 1, 1),
(2726, 'BISOLVON 2 10\'', 0, 0, 1, 1, 9, 1, 1),
(2727, 'BISOPROLOL 2,5 ', 0, 0, 1, 1, 2, 1, 1),
(2728, 'BISOPROLOL 5 MG', 0, 0, 1, 1, 2, 1, 1),
(2729, 'BLOOD LANCETS 1', 0, 0, 1, 1, 8, 1, 1),
(2730, 'BLUE ONE TEST P', 0, 0, 1, 1, 1, 1, 1),
(2731, 'BODREX EXTRA  4', 0, 0, 1, 1, 9, 1, 1),
(2732, 'BODREX FLU & BA', 0, 0, 1, 1, 9, 1, 1),
(2733, 'BODREX FLU&BATU', 0, 0, 1, 1, 9, 1, 1),
(2734, 'BODREX MIGRA', 0, 0, 1, 1, 9, 1, 1),
(2735, 'BODREX 2', 0, 0, 1, 1, 9, 1, 1),
(2736, 'BODREXIN SYR DE', 0, 0, 1, 1, 5, 1, 1),
(2737, 'BODREXIN SYR F&', 0, 0, 1, 1, 5, 1, 1),
(2738, 'BODREXIN SYR F&', 0, 0, 1, 1, 5, 1, 1),
(2739, 'BODREXIN 2 @4', 0, 0, 1, 1, 9, 1, 1),
(2740, 'BODREXIN 2 @6', 0, 0, 1, 1, 8, 1, 1),
(2741, 'BODREXIN 2 \'16', 0, 0, 1, 1, 8, 1, 1),
(2742, 'BORAGINOL N OIN', 0, 0, 1, 1, 4, 1, 1),
(2743, 'BORAGINOL N SUP', 0, 0, 1, 1, 1, 1, 1),
(2744, 'BORAGINOL S OIN', 0, 0, 1, 1, 4, 1, 1),
(2745, 'BORAGINOL S SUP', 0, 0, 1, 1, 1, 1, 1),
(2746, 'BORAX GLYCERIN', 0, 0, 1, 1, 5, 1, 1),
(2747, 'BREAST PADS', 0, 0, 1, 1, 8, 1, 1),
(2748, 'BREATHY NASAL D', 0, 0, 1, 1, 5, 1, 1),
(2749, 'BRONCHITIN SYR', 0, 0, 1, 1, 5, 1, 1),
(2750, 'BUFACOMB CR 5 G', 0, 0, 1, 1, 4, 1, 1),
(2751, 'BUFACORT N CR 5', 0, 0, 1, 1, 4, 1, 1),
(2752, 'BUFFECT FORTE S', 0, 0, 1, 1, 5, 1, 1),
(2753, 'BUFFECT SYR', 0, 0, 1, 1, 5, 1, 1),
(2754, 'BUNNY BREAST PU', 0, 0, 1, 1, 8, 1, 1),
(2755, 'BUSCOPAN PLUS', 0, 0, 1, 1, 2, 1, 1),
(2756, 'BUSCOPAN 2', 0, 0, 1, 1, 2, 1, 1),
(2757, 'BYE BYE FEVER A', 0, 0, 1, 1, 1, 1, 1),
(2758, 'BYE BYE FEVER B', 0, 0, 1, 1, 1, 1, 1),
(2759, 'C. CATARLENT ED', 0, 0, 1, 1, 5, 1, 1),
(2760, 'C. CATARLENT ED', 0, 0, 1, 1, 5, 1, 1),
(2761, 'C. CENFRESH ED', 0, 0, 1, 1, 5, 1, 1),
(2762, 'C. CENFRESH MDS', 0, 0, 1, 1, 9, 1, 1),
(2763, 'C. CONVER ED', 0, 0, 1, 1, 5, 1, 1),
(2764, 'C. EYEFRESH ED ', 0, 0, 1, 1, 5, 1, 1),
(2765, 'C. EYEFRESH MDS', 0, 0, 1, 1, 9, 1, 1),
(2766, 'C. EYEFRESH MIL', 0, 0, 1, 1, 9, 1, 1),
(2767, 'C. FLOXA MDS', 0, 0, 1, 1, 9, 1, 1),
(2768, 'C. HYALUB ED 5 ', 0, 0, 1, 1, 5, 1, 1),
(2769, 'C. HYALUB MDS', 0, 0, 1, 1, 9, 1, 1),
(2770, 'C. LYTEERS', 0, 0, 1, 1, 5, 1, 1),
(2771, 'C. LYTEERS MDS', 0, 0, 1, 1, 9, 1, 1),
(2772, 'C. MYCETINE EO', 0, 0, 1, 1, 4, 1, 1),
(2773, 'C. MYCOS EO', 0, 0, 1, 1, 4, 1, 1),
(2774, 'C. MYCOS EYE DR', 0, 0, 1, 1, 5, 1, 1),
(2775, 'C. POLIDEX ED', 0, 0, 1, 1, 5, 1, 1),
(2776, 'C. TIMOL 0.5% E', 0, 0, 1, 1, 5, 1, 1),
(2777, 'C. TOBROSON MDS', 0, 0, 1, 1, 9, 1, 1),
(2778, 'C. VASACON A ED', 0, 0, 1, 1, 5, 1, 1),
(2779, 'C. VITROLENTA 5', 0, 0, 1, 1, 5, 1, 1),
(2780, 'C. XITROL ED 5 ', 0, 0, 1, 1, 5, 1, 1),
(2781, 'C. XITROL EO', 0, 0, 1, 1, 4, 1, 1),
(2782, 'C. XITROL MDS', 0, 0, 1, 1, 9, 1, 1),
(2783, 'CACING KALUNG K', 0, 0, 1, 1, 9, 1, 1),
(2784, 'CAL-95', 0, 0, 1, 1, 2, 1, 1),
(2785, 'CALADINE BABY P', 0, 0, 1, 1, 5, 1, 1),
(2786, 'CALADINE BABY P', 0, 0, 1, 1, 5, 1, 1),
(2787, 'CALADINE CR', 0, 0, 1, 1, 4, 1, 1),
(2788, 'CALADINE LOTION', 0, 0, 1, 1, 5, 1, 1),
(2789, 'CALADINE LOTION', 0, 0, 1, 1, 5, 1, 1),
(2790, 'CALADINE POWDER', 0, 0, 1, 1, 5, 1, 1),
(2791, 'CALADINE POWDER', 0, 0, 1, 1, 5, 1, 1),
(2792, 'CALLUSOL', 0, 0, 1, 1, 5, 1, 1),
(2793, 'CANDESARTAN 16 ', 0, 0, 1, 1, 2, 1, 1),
(2794, 'CANDESARTAN 8 M', 0, 0, 1, 1, 2, 1, 1),
(2795, 'CANESTEN CR 10G', 0, 0, 1, 1, 4, 1, 1),
(2796, 'CANESTEN CR 5GR', 0, 0, 1, 1, 4, 1, 1),
(2797, 'CAPTOPRIL 12.5 ', 0, 0, 1, 1, 2, 1, 1),
(2798, 'CAPTOPRIL 25 MG', 0, 0, 1, 1, 2, 1, 1),
(2799, 'CAPTOPRIL 50 MG', 0, 0, 1, 1, 2, 1, 1),
(2800, 'CARBIDU 0,5MG 2', 0, 0, 1, 1, 2, 1, 1),
(2801, 'CARBIDU 0,75 MG', 0, 0, 1, 1, 2, 1, 1),
(2802, 'CARDIO ASPIRIN', 0, 0, 1, 1, 2, 1, 1),
(2803, 'CARDISMO 20 MG', 0, 0, 1, 1, 2, 1, 1),
(2804, 'CARMED 10% KRIM', 0, 0, 1, 1, 4, 1, 1),
(2805, 'CARMED CR 20%', 0, 0, 1, 1, 4, 1, 1),
(2806, 'CARMED LOTION 1', 0, 0, 1, 1, 5, 1, 1),
(2807, 'CARMED LOTION 5', 0, 0, 1, 1, 5, 1, 1),
(2808, 'CARMINT 30\'', 0, 0, 1, 1, 6, 1, 1),
(2809, 'CATAFLAM 25', 0, 0, 1, 1, 2, 1, 1),
(2810, 'CATAFLAM 50', 0, 0, 1, 1, 2, 1, 1),
(2811, 'CATAFLAM FAST 5', 0, 0, 1, 1, 7, 1, 1),
(2812, 'CAVIPLEX CDEZ 2', 0, 0, 1, 1, 2, 1, 1),
(2813, 'CAVIPLEX SYR', 0, 0, 1, 1, 5, 1, 1),
(2814, 'CAVIPLEX 2', 0, 0, 1, 1, 2, 1, 1),
(2815, 'CAVIT D3 2', 0, 0, 1, 1, 2, 1, 1),
(2816, 'CAZETIN DROPS', 0, 0, 1, 1, 5, 1, 1),
(2817, 'CDR EFF 15\'S', 0, 0, 1, 1, 6, 1, 1),
(2818, 'CDR EFF SWEET', 0, 0, 1, 1, 6, 1, 1),
(2819, 'CDR FORTOS', 0, 0, 1, 1, 6, 1, 1),
(2820, 'CEDOCARD 10 MG', 0, 0, 1, 1, 2, 1, 1),
(2821, 'CEDOCARD 5 MG', 0, 0, 1, 1, 2, 1, 1),
(2822, 'CEFADROXIL 500 ', 0, 0, 1, 1, 3, 1, 1),
(2823, 'CEFADROXIL F SY', 0, 0, 1, 1, 5, 1, 1),
(2824, 'CEFADROXIL SYR', 0, 0, 1, 1, 5, 1, 1),
(2825, 'CEFAT 500 MG', 0, 0, 1, 1, 3, 1, 1),
(2826, 'CEFAT FORTE SYR', 0, 0, 1, 1, 5, 1, 1),
(2827, 'CEFAT SYR', 0, 0, 1, 1, 5, 1, 1),
(2828, 'CEFIXIME 100 MG', 0, 0, 1, 1, 3, 1, 1),
(2829, 'CEFIXIME 200 MG', 0, 0, 1, 1, 3, 1, 1),
(2830, 'CEFIXIME SYR', 0, 0, 1, 1, 5, 1, 1),
(2831, 'CELEBREX 100 MG', 0, 0, 1, 1, 3, 1, 1),
(2832, 'CELEBREX 200 MG', 0, 0, 1, 1, 3, 1, 1),
(2833, 'CELESTAMIN SYR ', 0, 0, 1, 1, 5, 1, 1),
(2834, 'CELESTAMIN SYR ', 0, 0, 1, 1, 5, 1, 1),
(2835, 'CELESTAMIN 2', 0, 0, 1, 1, 2, 1, 1),
(2836, 'CEN2IO CR', 0, 0, 1, 1, 4, 1, 1),
(2837, 'CEREBROFORT GOL', 0, 0, 1, 1, 5, 1, 1),
(2838, 'CEREBROFORT GOL', 0, 0, 1, 1, 5, 1, 1),
(2839, 'CEREBROFORT GUM', 0, 0, 1, 1, 7, 1, 1),
(2840, 'CERINI SYR', 0, 0, 1, 1, 5, 1, 1),
(2841, 'CERINI 2', 0, 0, 1, 1, 2, 1, 1),
(2842, 'CETIRIZINE 10MG', 0, 0, 1, 1, 2, 1, 1),
(2843, 'CETIRIZINE SYR ', 0, 0, 1, 1, 5, 1, 1),
(2844, 'CETOP ZINK', 0, 0, 1, 1, 2, 1, 1),
(2845, 'CHARM BF MAXI W', 0, 0, 1, 1, 10, 1, 1),
(2846, 'CHARM BF MAXI W', 0, 0, 1, 1, 10, 1, 1),
(2847, 'CHARM BF NON WI', 0, 0, 1, 1, 10, 1, 1),
(2848, 'CHARM SAFE NIGH', 0, 0, 1, 1, 10, 1, 1),
(2849, 'CHLORAMFECORT C', 0, 0, 1, 1, 4, 1, 1),
(2850, 'CHLORAMFECORT H', 0, 0, 1, 1, 4, 1, 1),
(2851, 'CINDALA GEL', 0, 0, 1, 1, 4, 1, 1),
(2852, 'CINOLON CR 10 G', 0, 0, 1, 1, 4, 1, 1),
(2853, 'CINOLON N CR 10', 0, 0, 1, 1, 4, 1, 1),
(2854, 'CINOLON N CR 5 ', 0, 0, 1, 1, 4, 1, 1),
(2855, 'CIPACING', 0, 0, 1, 1, 7, 1, 1),
(2856, 'CIPROFLOXACIN 5', 0, 0, 1, 1, 2, 1, 1),
(2857, 'CITICOLINE 500 ', 0, 0, 1, 1, 2, 1, 1),
(2858, 'CITOCETINE SYR', 0, 0, 1, 1, 5, 1, 1),
(2859, 'CLINDAMICYN 300', 0, 0, 1, 1, 3, 1, 1),
(2860, 'CLINDAMYCIN 150', 0, 0, 1, 1, 3, 1, 1),
(2861, 'CLONIDINE 0.15 ', 0, 0, 1, 1, 2, 1, 1),
(2862, 'CLOPIDOGREL 2', 0, 0, 1, 1, 2, 1, 1),
(2863, 'CO-AMOXICLAVE 6', 0, 0, 1, 1, 2, 1, 1),
(2864, 'COHISTAN SYR 10', 0, 0, 1, 1, 5, 1, 1),
(2865, 'COHISTAN SYR 60', 0, 0, 1, 1, 5, 1, 1),
(2866, 'COLDREXIN SYR', 0, 0, 1, 1, 5, 1, 1),
(2867, 'COLFIN SYR', 0, 0, 1, 1, 5, 1, 1),
(2868, 'COMBANTRIN 250 ', 0, 0, 1, 1, 9, 1, 1),
(2869, 'COMBANTRIN SYR ', 0, 0, 1, 1, 5, 1, 1),
(2870, 'COMBIVENT UDV', 0, 0, 1, 1, 12, 1, 1),
(2871, 'COMTUSI SYR 100', 0, 0, 1, 1, 5, 1, 1),
(2872, 'COMTUSI SYR 60 ', 0, 0, 1, 1, 5, 1, 1),
(2873, 'CONCOR 2.5 MG', 0, 0, 1, 1, 2, 1, 1),
(2874, 'CONCOR 5 MG', 0, 0, 1, 1, 2, 1, 1),
(2875, 'CONTREX 2', 0, 0, 1, 1, 9, 1, 1),
(2876, 'CONTREXIN 2', 0, 0, 1, 1, 9, 1, 1),
(2877, 'COOLFEVER ANAK', 0, 0, 1, 1, 1, 1, 1),
(2878, 'COOLFEVER DEWAS', 0, 0, 1, 1, 1, 1, 1),
(2879, 'COOLING 5', 0, 0, 1, 1, 5, 1, 1),
(2880, 'COOLING 5 PLUS ', 0, 0, 1, 1, 5, 1, 1),
(2881, 'COPAL 25 GR', 0, 0, 1, 1, 4, 1, 1),
(2882, 'COPARCETIN SYR', 0, 0, 1, 1, 5, 1, 1),
(2883, 'CORDARONE 200 M', 0, 0, 1, 1, 2, 1, 1),
(2884, 'CORTIDEX 2', 0, 0, 1, 1, 2, 1, 1),
(2885, 'COTRIMOXAZOLE 4', 0, 0, 1, 1, 2, 1, 1),
(2886, 'COTRIMOXAZOLE S', 0, 0, 1, 1, 5, 1, 1),
(2887, 'COTTON BUD BABY', 0, 0, 1, 1, 7, 1, 1),
(2888, 'COTTON BUD HUKI', 0, 0, 1, 1, 7, 1, 1),
(2889, 'COTTON BUDS BAB', 0, 0, 1, 1, 10, 1, 1),
(2890, 'COTTON BUDS CHA', 0, 0, 1, 1, 10, 1, 1),
(2891, 'COTTON BUDS HUK', 0, 0, 1, 1, 10, 1, 1),
(2892, 'COUNTERPAIN 15 ', 0, 0, 1, 1, 4, 1, 1),
(2893, 'COUNTERPAIN 30 ', 0, 0, 1, 1, 4, 1, 1),
(2894, 'COUNTERPAIN 5 G', 0, 0, 1, 1, 4, 1, 1),
(2895, 'COUNTERPAIN 60 ', 0, 0, 1, 1, 4, 1, 1),
(2896, 'COUNTERPAIN COO', 0, 0, 1, 1, 4, 1, 1),
(2897, 'CTM 9', 0, 0, 1, 1, 9, 1, 1),
(2898, 'CURCUMA DHA+PRE', 0, 0, 1, 1, 5, 1, 1),
(2899, 'CURCUMA DHA+PRE', 0, 0, 1, 1, 5, 1, 1),
(2900, 'CURCUMA EMULSIO', 0, 0, 1, 1, 5, 1, 1),
(2901, 'CURCUMA PLUS IM', 0, 0, 1, 1, 5, 1, 1),
(2902, 'CURCUMA PLUS SY', 0, 0, 1, 1, 5, 1, 1),
(2903, 'CURCUMA 2', 0, 0, 1, 1, 2, 1, 1),
(2904, 'CURLIV PLUS', 0, 0, 1, 1, 5, 1, 1),
(2905, 'CURVIT EMULSION', 0, 0, 1, 1, 5, 1, 1),
(2906, 'CURVIT SYR 60 M', 0, 0, 1, 1, 5, 1, 1),
(2907, 'CURVIT 2', 0, 0, 1, 1, 9, 1, 1),
(2908, 'CUSSONC BABY KR', 0, 0, 1, 1, 6, 1, 1),
(2909, 'CUSSONS BABY OI', 0, 0, 1, 1, 5, 1, 1),
(2910, 'CUSSONS BABY PO', 0, 0, 1, 1, 5, 1, 1),
(2911, 'CUSSONS BABY PO', 0, 0, 1, 1, 6, 1, 1),
(2912, 'CUSSONS SABUN B', 0, 0, 1, 1, 11, 1, 1),
(2913, 'DAKTARIN CR 10 ', 0, 0, 1, 1, 4, 1, 1),
(2914, 'DAKTARIN CR 5 G', 0, 0, 1, 1, 4, 1, 1),
(2915, 'DAKTARIN POWDER', 0, 0, 1, 1, 5, 1, 1),
(2916, 'DAMABEN 10 MG', 0, 0, 1, 1, 2, 1, 1),
(2917, 'DAPYRIN 2', 0, 0, 1, 1, 2, 1, 1),
(2918, 'DARSI CAP 12\'S', 0, 0, 1, 1, 8, 1, 1),
(2919, 'DARSI PIL', 0, 0, 1, 1, 8, 1, 1),
(2920, 'DARYAN TULLE', 0, 0, 1, 1, 1, 1, 1),
(2921, 'DECADRYL SYR B', 0, 0, 1, 1, 5, 1, 1),
(2922, 'DECADRYL SYR K', 0, 0, 1, 1, 5, 1, 1),
(2923, 'DECOLGEN SYR', 0, 0, 1, 1, 5, 1, 1),
(2924, 'DECOLGEN 2', 0, 0, 1, 1, 9, 1, 1),
(2925, 'DECOLSIN CAPS', 0, 0, 1, 1, 9, 1, 1),
(2926, 'DECOLSIN SYR 60', 0, 0, 1, 1, 5, 1, 1),
(2927, 'DEGIROL \'10 2', 0, 0, 1, 1, 9, 1, 1),
(2928, 'DEMACOLIN 2', 0, 0, 1, 1, 2, 1, 1),
(2929, 'DERMAFIX 10 X 1', 0, 0, 1, 1, 1, 1, 1),
(2930, 'DERMAFIX 10 X 2', 0, 0, 1, 1, 1, 1, 1),
(2931, 'DERMAFIX T (TYP', 0, 0, 1, 1, 1, 1, 1),
(2932, 'DERMATIX ULTRA ', 0, 0, 1, 1, 4, 1, 1),
(2933, 'DERMOVATE CR 10', 0, 0, 1, 1, 4, 1, 1),
(2934, 'DERMOVATE CR 5 ', 0, 0, 1, 1, 4, 1, 1),
(2935, 'DERMOVATE OINT ', 0, 0, 1, 1, 4, 1, 1),
(2936, 'DESOLEX CR 10GR', 0, 0, 1, 1, 4, 1, 1),
(2937, 'DESOXIMETASONE ', 0, 0, 1, 1, 4, 1, 1),
(2938, 'DETTOL LIG 1 L', 0, 0, 1, 1, 5, 1, 1),
(2939, 'DETTOL LIG 245 ', 0, 0, 1, 1, 5, 1, 1),
(2940, 'DETTOL LIG 495 ', 0, 0, 1, 1, 5, 1, 1),
(2941, 'DETTOL LIG 50 M', 0, 0, 1, 1, 5, 1, 1),
(2942, 'DETTOL LIG 95 M', 0, 0, 1, 1, 5, 1, 1),
(2943, 'DEXAMETHASONE 0', 0, 0, 1, 1, 2, 1, 1),
(2944, 'DEXAMETHASONE 0', 0, 0, 1, 1, 2, 1, 1),
(2945, 'DEXANTA SYR', 0, 0, 1, 1, 5, 1, 1),
(2946, 'DEXANTA 2', 0, 0, 1, 1, 9, 1, 1),
(2947, 'DEXKETOPROFEN 2', 0, 0, 1, 1, 2, 1, 1),
(2948, 'DEXTAMINE SYR', 0, 0, 1, 1, 5, 1, 1),
(2949, 'DEXTAMINE 2', 0, 0, 1, 1, 2, 1, 1),
(2950, 'DEXTEEM PLUS', 0, 0, 1, 1, 2, 1, 1),
(2951, 'DEXTRAL CAP 150', 0, 0, 1, 1, 9, 1, 1),
(2952, 'DEXTRAL SYR 60M', 0, 0, 1, 1, 5, 1, 1),
(2953, 'DIANE 35', 0, 0, 1, 1, 8, 1, 1),
(2954, 'DIAPERS PEREKAT', 0, 0, 1, 1, 1, 1, 1),
(2955, 'DIAPET \'10', 0, 0, 1, 1, 9, 1, 1),
(2956, 'DIAPET NR 2', 0, 0, 1, 1, 9, 1, 1),
(2957, 'DIAPET SYR', 0, 0, 1, 1, 5, 1, 1),
(2958, 'DIGENTA CR 10 G', 0, 0, 1, 1, 4, 1, 1),
(2959, 'DIGOXIN 0.25 MG', 0, 0, 1, 1, 2, 1, 1),
(2960, 'DIMENHIDRINATE', 0, 0, 1, 1, 2, 1, 1),
(2961, 'DIONICOL 500 MG', 0, 0, 1, 1, 2, 1, 1),
(2962, 'DIPROGENTA CR 5', 0, 0, 1, 1, 4, 1, 1),
(2963, 'DIPROGENTA OINT', 0, 0, 1, 1, 4, 1, 1),
(2964, 'DIPROGENTA OINT', 0, 0, 1, 1, 4, 1, 1),
(2965, 'DIPROSONE OV CR', 0, 0, 1, 1, 4, 1, 1),
(2966, 'DIVOLTAR 50 MG', 0, 0, 1, 1, 2, 1, 1),
(2967, 'DOBRIZOL CAPS', 0, 0, 1, 1, 3, 1, 1),
(2968, 'DOLO NEUROBION', 0, 0, 1, 1, 2, 1, 1),
(2969, 'DOMPERIDON 10 M', 0, 0, 1, 1, 2, 1, 1),
(2970, 'DOUBLE SPIKE IN', 0, 0, 1, 1, 1, 1, 1),
(2971, 'DOXYCYCLINE 100', 0, 0, 1, 1, 3, 1, 1),
(2972, 'DRAMAMINE 2', 0, 0, 1, 1, 2, 1, 1),
(2973, 'DULCOLACTOL SYR', 0, 0, 1, 1, 5, 1, 1),
(2974, 'DULCOLAX \'10', 0, 0, 1, 1, 8, 1, 1),
(2975, 'DULCOLAX \'4', 0, 0, 1, 1, 9, 1, 1),
(2976, 'DULCOLAX SUPP A', 0, 0, 1, 1, 1, 1, 1),
(2977, 'DULCOLAX SUPP C', 0, 0, 1, 1, 1, 1, 1),
(2978, 'DUMIN SYR', 0, 0, 1, 1, 5, 1, 1),
(2979, 'DUMIN 2', 0, 0, 1, 1, 2, 1, 1),
(2980, 'DUREX PLAY 100M', 0, 0, 1, 1, 6, 1, 1),
(2981, 'DUREX PLAY 50ML', 0, 0, 1, 1, 6, 1, 1),
(2982, 'EFISOL LOZ', 0, 0, 1, 1, 9, 1, 1),
(2983, 'EGOJI CHEWY GUM', 0, 0, 1, 1, 7, 1, 1),
(2984, 'ELKANA CL EMULS', 0, 0, 1, 1, 5, 1, 1),
(2985, 'ELKANA SYR', 0, 0, 1, 1, 5, 1, 1),
(2986, 'ELKANA 2', 0, 0, 1, 1, 2, 1, 1),
(2987, 'ELLGY PLUS 50GR', 0, 0, 1, 1, 4, 1, 1),
(2988, 'ELOCON CR 10 GR', 0, 0, 1, 1, 4, 1, 1),
(2989, 'ELOCON CR 5 GR', 0, 0, 1, 1, 4, 1, 1),
(2990, 'ELOX CR 10 GR', 0, 0, 1, 1, 4, 1, 1),
(2991, 'ELOX CR 5 GR', 0, 0, 1, 1, 4, 1, 1),
(2992, 'EM 3UL', 0, 0, 1, 1, 8, 1, 1),
(2993, 'ENATIN CAP', 0, 0, 1, 1, 3, 1, 1),
(2994, 'ENBATIC 7ET', 0, 0, 1, 1, 7, 1, 1),
(2995, 'ENERVON C \'30', 0, 0, 1, 1, 6, 1, 1),
(2996, 'ENERVON C \'4', 0, 0, 1, 1, 9, 1, 1),
(2997, 'ENERVON C ACTIV', 0, 0, 1, 1, 6, 1, 1),
(2998, 'ENERVON C ACTIV', 0, 0, 1, 1, 9, 1, 1),
(2999, 'ENERVON C SYR B', 0, 0, 1, 1, 5, 1, 1),
(3000, 'ENKASARI HERBAL', 0, 0, 1, 1, 5, 1, 1),
(3001, 'ENTROSTOP', 0, 0, 1, 1, 9, 1, 1),
(3002, 'ENTROSTOP ANAK', 0, 0, 1, 1, 7, 1, 1),
(3003, 'ENZYPLEX 2', 0, 0, 1, 1, 9, 1, 1),
(3004, 'EPERISONE 2', 0, 0, 1, 1, 2, 1, 1),
(3005, 'EPEXOL 30 MG 2', 0, 0, 1, 1, 2, 1, 1),
(3006, 'EPEXOL DROPS', 0, 0, 1, 1, 5, 1, 1),
(3007, 'EPEXOL SYR', 0, 0, 1, 1, 5, 1, 1),
(3008, 'EPISAN SUSP 100', 0, 0, 1, 1, 5, 1, 1),
(3009, 'ERLAMYCETIN EAR', 0, 0, 1, 1, 6, 1, 1),
(3010, 'ERLAMYCETIN EO', 0, 0, 1, 1, 4, 1, 1),
(3011, 'ERLAMYCETIN PLU', 0, 0, 1, 1, 6, 1, 1),
(3012, 'ERPHAFLAM 50 MG', 0, 0, 1, 1, 2, 1, 1),
(3013, 'ESPERSON 5 GR', 0, 0, 1, 1, 4, 1, 1),
(3014, 'ESPERSON CR 15G', 0, 0, 1, 1, 4, 1, 1),
(3015, 'ESTER C 30\'', 0, 0, 1, 1, 6, 1, 1),
(3016, 'ESTER C KIDS 30', 0, 0, 1, 1, 6, 1, 1),
(3017, 'ESTER C 2 4\'', 0, 0, 1, 1, 9, 1, 1),
(3018, 'ETAFLUSIN SYR', 0, 0, 1, 1, 8, 1, 1),
(3019, 'EVER E 250 IU \'', 0, 0, 1, 1, 5, 1, 1),
(3020, 'EYEVIT 2', 0, 0, 1, 1, 2, 1, 1),
(3021, 'FAKTU SUPP', 0, 0, 1, 1, 1, 1, 1),
(3022, 'FAMOCID 20 MG', 0, 0, 1, 1, 3, 1, 1),
(3023, 'FARMACROL F SYR', 0, 0, 1, 1, 5, 1, 1),
(3024, 'FARSIFEN 200 MG', 0, 0, 1, 1, 2, 1, 1),
(3025, 'FARSIFEN 400 MG', 0, 0, 1, 1, 2, 1, 1),
(3026, 'FARSIFEN PLUS 2', 0, 0, 1, 1, 2, 1, 1),
(3027, 'FARTOLIN EXP', 0, 0, 1, 1, 5, 1, 1),
(3028, 'FASIDOL 500 MG ', 0, 0, 1, 1, 2, 1, 1),
(3029, 'FASIDOL FORTE S', 0, 0, 1, 1, 5, 1, 1),
(3030, 'FASIDOL FORTE 2', 0, 0, 1, 1, 2, 1, 1),
(3031, 'FASIDOL SYR', 0, 0, 1, 1, 5, 1, 1),
(3032, 'FASOLON CR 10GR', 0, 0, 1, 1, 4, 1, 1),
(3033, 'FASOLON CR 5GR', 0, 0, 1, 1, 4, 1, 1),
(3034, 'FATIGON SPIRIT', 0, 0, 1, 1, 9, 1, 1),
(3035, 'FATIGON 2', 0, 0, 1, 1, 9, 1, 1),
(3036, 'FEMINAX 2', 0, 0, 1, 1, 9, 1, 1),
(3037, 'FENOFIBRATE 200', 0, 0, 1, 1, 3, 1, 1),
(3038, 'FG TROCHES', 0, 0, 1, 1, 2, 1, 1),
(3039, 'FISHERMAN (HIJA', 0, 0, 1, 1, 7, 1, 1),
(3040, 'FITKOM 2', 0, 0, 1, 1, 6, 1, 1),
(3041, 'FLAGYSTATIN SUP', 0, 0, 1, 1, 1, 1, 1),
(3042, 'FLAMAR 50', 0, 0, 1, 1, 2, 1, 1),
(3043, 'FLAMAR GEL', 0, 0, 1, 1, 4, 1, 1),
(3044, 'FLUCADEX PE SIR', 0, 0, 1, 1, 5, 1, 1),
(3045, 'FLUCADEX PE 2LE', 0, 0, 1, 1, 2, 1, 1),
(3046, 'FLUCADEX SYR', 0, 0, 1, 1, 5, 1, 1),
(3047, 'FLUCADEX 2 9', 0, 0, 1, 1, 2, 1, 1),
(3048, 'FLUGESIC 2', 0, 0, 1, 1, 9, 1, 1),
(3049, 'FLUIMUCIL 100 7', 0, 0, 1, 1, 7, 1, 1),
(3050, 'FLUIMUCIL 200 C', 0, 0, 1, 1, 3, 1, 1),
(3051, 'FLUIMUCIL 200 7', 0, 0, 1, 1, 7, 1, 1),
(3052, 'FLUMIN SYR', 0, 0, 1, 1, 5, 1, 1),
(3053, 'FLUTAMOL 2', 0, 0, 1, 1, 2, 1, 1),
(3054, 'FLUTROP 2', 0, 0, 1, 1, 2, 1, 1),
(3055, 'FOLAMIL GENIO', 0, 0, 1, 1, 6, 1, 1),
(3056, 'FOLAVIT 2', 0, 0, 1, 1, 2, 1, 1),
(3057, 'FOLIC ACID 1MG', 0, 0, 1, 1, 6, 1, 1),
(3058, 'FORMYCO CR', 0, 0, 1, 1, 4, 1, 1),
(3059, 'FORUMEN EAR DRO', 0, 0, 1, 1, 5, 1, 1),
(3060, 'FRESHCARE PATCH', 0, 0, 1, 1, 10, 1, 1),
(3061, 'FUNDAMIN E', 0, 0, 1, 1, 2, 1, 1),
(3062, 'FUNGIDERM CR 10', 0, 0, 1, 1, 4, 1, 1),
(3063, 'FUNGIDERM CR 5 ', 0, 0, 1, 1, 4, 1, 1),
(3064, 'FUROSEMIDE 40 M', 0, 0, 1, 1, 2, 1, 1),
(3065, 'GABAPENTIN 300M', 0, 0, 1, 1, 3, 1, 1),
(3066, 'GASTRAN', 0, 0, 1, 1, 2, 1, 1),
(3067, 'GASTRUCID SYR', 0, 0, 1, 1, 5, 1, 1),
(3068, 'GASTRUCID 2', 0, 0, 1, 1, 9, 1, 1),
(3069, 'GAZERO 7ET', 0, 0, 1, 1, 7, 1, 1),
(3070, 'GELIGA CAIR 30M', 0, 0, 1, 1, 5, 1, 1),
(3071, 'GELIGA CAIR 60M', 0, 0, 1, 1, 5, 1, 1),
(3072, 'GEMFIBROZIL 300', 0, 0, 1, 1, 3, 1, 1),
(3073, 'GENOINT SALEP M', 0, 0, 1, 1, 4, 1, 1),
(3074, 'GENOINT SK 15GR', 0, 0, 1, 1, 4, 1, 1),
(3075, 'GENOINT TETES M', 0, 0, 1, 1, 5, 1, 1),
(3076, 'GENTAMYCIN SK', 0, 0, 1, 1, 4, 1, 1),
(3077, 'GENTASOLON CR 5', 0, 0, 1, 1, 4, 1, 1),
(3078, 'GENTIAN VIOLET ', 0, 0, 1, 1, 6, 1, 1),
(3079, 'GG 2(GLISERIL G', 0, 0, 1, 1, 2, 1, 1),
(3080, 'GLIBENCLAMIDE 5', 0, 0, 1, 1, 2, 1, 1),
(3081, 'GLIMEPIRID 1 MG', 0, 0, 1, 1, 2, 1, 1),
(3082, 'GLIMEPIRID 2 MG', 0, 0, 1, 1, 2, 1, 1),
(3083, 'GLIMEPIRID 3 MG', 0, 0, 1, 1, 2, 1, 1),
(3084, 'GLIMEPIRID 4 MG', 0, 0, 1, 1, 2, 1, 1),
(3085, 'GLUCOPHAGE 500 ', 0, 0, 1, 1, 2, 1, 1),
(3086, 'GLUCOPHAGE XR 5', 0, 0, 1, 1, 2, 1, 1),
(3087, 'GLUCOSAMINE MPL', 0, 0, 1, 1, 2, 1, 1),
(3088, 'GLUCOSAMINE MPL', 0, 0, 1, 1, 2, 1, 1),
(3089, 'GLUCOVANCE 250/', 0, 0, 1, 1, 2, 1, 1),
(3090, 'GLUCOVANCE 500/', 0, 0, 1, 1, 2, 1, 1),
(3091, 'GLUCOVANCE 500/', 0, 0, 1, 1, 2, 1, 1),
(3092, 'GLUDEPATIC 500', 0, 0, 1, 1, 2, 1, 1),
(3093, 'GLYCERINE 30 ML', 0, 0, 1, 1, 6, 1, 1),
(3094, 'GOTIK 5ML', 0, 0, 1, 1, 6, 1, 1),
(3095, 'GRAFACHLOR 2', 0, 0, 1, 1, 2, 1, 1),
(3096, 'GRAFADON 500 MG', 0, 0, 1, 1, 2, 1, 1),
(3097, 'GRAFALIN 4 MG', 0, 0, 1, 1, 2, 1, 1),
(3098, 'GRANTUSIF 2', 0, 0, 1, 1, 2, 1, 1),
(3099, 'GRATHAZON 2 0,5', 0, 0, 1, 1, 2, 1, 1),
(3100, 'GRAZEO 10 MG', 0, 0, 1, 1, 2, 1, 1),
(3101, 'GRAZEO 20MG', 0, 0, 1, 1, 2, 1, 1),
(3102, 'GRISEOFULVIN 12', 0, 0, 1, 1, 2, 1, 1),
(3103, 'GUANISTREP SYR', 0, 0, 1, 1, 5, 1, 1),
(3104, 'GURAH FIT MADU', 0, 0, 1, 1, 5, 1, 1),
(3105, 'H C T 25MG(HIDR', 0, 0, 1, 1, 2, 1, 1),
(3106, 'H2O2 TETES TELI', 0, 0, 1, 1, 5, 1, 1),
(3107, 'HABBAT\'S 100\'', 0, 0, 1, 1, 5, 1, 1),
(3108, 'HABBATUSAUDA AJ', 0, 0, 1, 1, 6, 1, 1),
(3109, 'HABBATUSSAUDA A', 0, 0, 1, 1, 5, 1, 1),
(3110, 'HABBATUSSAUDA A', 0, 0, 1, 1, 6, 1, 1),
(3111, 'HAEMOCAIN CR', 0, 0, 1, 1, 4, 1, 1),
(3112, 'HALMEZIN SYR', 0, 0, 1, 1, 5, 1, 1),
(3113, 'HANSAPLAST 12OP', 0, 0, 1, 1, 9, 1, 1),
(3114, 'HANSAPLAST JUMB', 0, 0, 1, 1, 1, 1, 1),
(3115, 'HANSAPLAST KIDS', 0, 0, 1, 1, 1, 1, 1),
(3116, 'HANSAPLAST LOZZ', 0, 0, 1, 1, 1, 1, 1),
(3117, 'HANSAPLAST TRAN', 0, 0, 1, 1, 9, 1, 1),
(3118, 'HCG TEST PACK', 0, 0, 1, 1, 1, 1, 1),
(3119, 'HEMAVITON ACTIO', 0, 0, 1, 1, 9, 1, 1),
(3120, 'HEMAVITON CARDI', 0, 0, 1, 1, 8, 1, 1),
(3121, 'HEMAVITON STAMI', 0, 0, 1, 1, 9, 1, 1),
(3122, 'HEMORID CAPS', 0, 0, 1, 1, 9, 1, 1),
(3123, 'HERBAKOF SYR 10', 0, 0, 1, 1, 5, 1, 1),
(3124, 'HERBAKOF SYR 60', 0, 0, 1, 1, 5, 1, 1),
(3125, 'HEROCYN BABY PO', 0, 0, 1, 1, 5, 1, 1),
(3126, 'HEROCYN POWDER ', 0, 0, 1, 1, 6, 1, 1),
(3127, 'HEROCYN POWDER ', 0, 0, 1, 1, 6, 1, 1),
(3128, 'HEXADOL GARGLE ', 0, 0, 1, 1, 5, 1, 1),
(3129, 'HEXADOL GARGLE ', 0, 0, 1, 1, 5, 1, 1),
(3130, 'HEXOS', 0, 0, 1, 1, 7, 1, 1),
(3131, 'HISTAPAN', 0, 0, 1, 1, 2, 1, 1),
(3132, 'HISTIGO 6MG', 0, 0, 1, 1, 2, 1, 1),
(3133, 'HOBAHSTRO 60\'', 0, 0, 1, 1, 6, 1, 1),
(3134, 'HOT IN CR 120 M', 0, 0, 1, 1, 5, 1, 1),
(3135, 'HOT IN CR AROMA', 0, 0, 1, 1, 4, 1, 1),
(3136, 'HOT IN CR AROMA', 0, 0, 1, 1, 5, 1, 1),
(3137, 'HOT IN CR STRON', 0, 0, 1, 1, 5, 1, 1),
(3138, 'HOT IN CR STRON', 0, 0, 1, 1, 5, 1, 1),
(3139, 'HOT IN CR STRON', 0, 0, 1, 1, 4, 1, 1),
(3140, 'HOT IN CR STRON', 0, 0, 1, 1, 4, 1, 1),
(3141, 'HOT IN CR 4 120', 0, 0, 1, 1, 4, 1, 1),
(3142, 'HOT IN CR 4 60 ', 0, 0, 1, 1, 4, 1, 1),
(3143, 'HOTIN DCL 30GR', 0, 0, 1, 1, 4, 1, 1),
(3144, 'HOTIN DCL 60 GR', 0, 0, 1, 1, 4, 1, 1),
(3145, 'HUFABETHAMIN SY', 0, 0, 1, 1, 5, 1, 1),
(3146, 'HUFADON SYR', 0, 0, 1, 1, 5, 1, 1),
(3147, 'HUFAGESIC DROPS', 0, 0, 1, 1, 6, 1, 1),
(3148, 'HUFAGESIC SYR', 0, 0, 1, 1, 5, 1, 1),
(3149, 'HUFAGRIP BOOSTE', 0, 0, 1, 1, 5, 1, 1),
(3150, 'HUFAGRIP BP SYR', 0, 0, 1, 1, 5, 1, 1),
(3151, 'HUFAGRIP FORTE ', 0, 0, 1, 1, 2, 1, 1),
(3152, 'HUFAGRIP PILEK ', 0, 0, 1, 1, 5, 1, 1),
(3153, 'HUFAGRIP SYR (K', 0, 0, 1, 1, 5, 1, 1),
(3154, 'HUFAGRIP TMP(PA', 0, 0, 1, 1, 5, 1, 1),
(3155, 'HUFAMAG PLUS SY', 0, 0, 1, 1, 5, 1, 1),
(3156, 'HUFAMAG PLUS 2', 0, 0, 1, 1, 2, 1, 1),
(3157, 'HUKI BOTOL DOT ', 0, 0, 1, 1, 5, 1, 1),
(3158, 'HUKI BOTOL DOT ', 0, 0, 1, 1, 5, 1, 1),
(3159, 'HUKI KARET DOT ', 0, 0, 1, 1, 1, 1, 1),
(3160, 'HUKI KARET DOT ', 0, 0, 1, 1, 1, 1, 1),
(3161, 'HUKI KARET DOT ', 0, 0, 1, 1, 1, 1, 1),
(3162, 'HUKI KARET DOT ', 0, 0, 1, 1, 10, 1, 1),
(3163, 'HUKI KARET DOT ', 0, 0, 1, 1, 10, 1, 1),
(3164, 'HUKI KARET DOT ', 0, 0, 1, 1, 10, 1, 1),
(3165, 'HUKI LIQUID CLE', 0, 0, 1, 1, 7, 1, 1),
(3166, 'HYDROCORTISON 1', 0, 0, 1, 1, 4, 1, 1),
(3167, 'HYDROCORTISON 2', 0, 0, 1, 1, 4, 1, 1),
(3168, 'HYPAFIX 5 CM X ', 0, 0, 1, 1, 8, 1, 1),
(3169, 'HYPAFIX 5 X 5M', 0, 0, 1, 1, 8, 1, 1),
(3170, 'IBUPROFEN 400 M', 0, 0, 1, 1, 2, 1, 1),
(3171, 'ICHTYOL 15G', 0, 0, 1, 1, 6, 1, 1),
(3172, 'IFREE PATCH HAI', 0, 0, 1, 1, 8, 1, 1),
(3173, 'IKADERM CR', 0, 0, 1, 1, 4, 1, 1),
(3174, 'IKADRYL SYR 100', 0, 0, 1, 1, 5, 1, 1),
(3175, 'IKADRYL SYR 60 ', 0, 0, 1, 1, 5, 1, 1),
(3176, 'ILLIADIN 0.5% D', 0, 0, 1, 1, 6, 1, 1),
(3177, 'ILLIADIN ANAK', 0, 0, 1, 1, 6, 1, 1),
(3178, 'IMBOOST EFFERVE', 0, 0, 1, 1, 9, 1, 1),
(3179, 'IMBOOST FORCE S', 0, 0, 1, 1, 5, 1, 1),
(3180, 'IMBOOST FORCE S', 0, 0, 1, 1, 5, 1, 1),
(3181, 'IMBOOST FORCE 2', 0, 0, 1, 1, 2, 1, 1),
(3182, 'IMBOOST SYR 120', 0, 0, 1, 1, 5, 1, 1),
(3183, 'IMBOOST SYR 60 ', 0, 0, 1, 1, 5, 1, 1),
(3184, 'IMBOOST 2', 0, 0, 1, 1, 2, 1, 1),
(3185, 'IMODIUM', 0, 0, 1, 1, 2, 1, 1),
(3186, 'IMUNOS', 0, 0, 1, 1, 2, 1, 1),
(3187, 'IMUNPED SIRUP 6', 0, 0, 1, 1, 5, 1, 1),
(3188, 'INCIDAL OD', 0, 0, 1, 1, 3, 1, 1),
(3189, 'INERSON CR 15 G', 0, 0, 1, 1, 4, 1, 1),
(3190, 'INPEPSA SYR 100', 0, 0, 1, 1, 5, 1, 1),
(3191, 'INSTO B', 0, 0, 1, 1, 6, 1, 1),
(3192, 'INSTO K', 0, 0, 1, 1, 6, 1, 1),
(3193, 'INTERHISTIN 2', 0, 0, 1, 1, 2, 1, 1),
(3194, 'INTUNAL FORTE', 0, 0, 1, 1, 2, 1, 1),
(3195, 'INTUNAL SYR', 0, 0, 1, 1, 5, 1, 1),
(3196, 'INZA 2', 0, 0, 1, 1, 9, 1, 1),
(3197, 'INZANA', 0, 0, 1, 1, 9, 1, 1),
(3198, 'IRBESARTAN 150 ', 0, 0, 1, 1, 2, 1, 1),
(3199, 'IRBESARTAN 300 ', 0, 0, 1, 1, 2, 1, 1),
(3200, 'ISOPRINOSINE 2', 0, 0, 1, 1, 2, 1, 1),
(3201, 'ISOSORBIDE DINI', 0, 0, 1, 1, 2, 1, 1),
(3202, 'ITRABAT SYR 100', 0, 0, 1, 1, 5, 1, 1),
(3203, 'ITRAMOL SYR', 0, 0, 1, 1, 5, 1, 1),
(3204, 'JAMKORAT MADU', 0, 0, 1, 1, 5, 1, 1),
(3205, 'JESSCOOL', 0, 0, 1, 1, 1, 1, 1),
(3206, 'JF SULFUR SABUN', 0, 0, 1, 1, 11, 1, 1),
(3207, 'JJ BABY CREAM 5', 0, 0, 1, 1, 4, 1, 1),
(3208, 'JJ BABY OIL 50 ', 0, 0, 1, 1, 5, 1, 1),
(3209, 'JJ BABY POWDER ', 0, 0, 1, 1, 5, 1, 1),
(3210, 'K S R', 0, 0, 1, 1, 2, 1, 1),
(3211, 'K. DUREX EXTRA ', 0, 0, 1, 1, 8, 1, 1),
(3212, 'K. DUREX EXTRA ', 0, 0, 1, 1, 8, 1, 1),
(3213, 'K. DUREX FETHER', 0, 0, 1, 1, 8, 1, 1),
(3214, 'K. DUREX LOVE 3', 0, 0, 1, 1, 10, 1, 1),
(3215, 'K. DUREX TOGETH', 0, 0, 1, 1, 8, 1, 1),
(3216, 'K. FIESTA BANAN', 0, 0, 1, 1, 8, 1, 1),
(3217, 'K. FIESTA DOTTE', 0, 0, 1, 1, 8, 1, 1),
(3218, 'K. FIESTA PARTY', 0, 0, 1, 1, 8, 1, 1),
(3219, 'K. FIESTA STRAW', 0, 0, 1, 1, 8, 1, 1),
(3220, 'K. FIESTA ULTRA', 0, 0, 1, 1, 8, 1, 1),
(3221, 'K. FIESTA ULTRA', 0, 0, 1, 1, 8, 1, 1),
(3222, 'K. SUTRA \'12 (M', 0, 0, 1, 1, 8, 1, 1),
(3223, 'K. SUTRA \'3 (ME', 0, 0, 1, 1, 9, 1, 1),
(3224, 'K. SUTRA BIRU 3', 0, 0, 1, 1, 9, 1, 1),
(3225, 'K. SUTRA OK 12\'', 0, 0, 1, 1, 8, 1, 1),
(3226, 'K. SUTRA OK \'3 ', 0, 0, 1, 1, 9, 1, 1),
(3227, 'K.P. LANG 120 M', 0, 0, 1, 1, 8, 1, 1),
(3228, 'K.P. LANG 15 ML', 0, 0, 1, 1, 5, 1, 1),
(3229, 'K.P. LANG 30 ML', 0, 0, 1, 1, 5, 1, 1),
(3230, 'K.P. LANG 60 ML', 0, 0, 1, 1, 5, 1, 1),
(3231, 'K.P. SIDOLA 100', 0, 0, 1, 1, 5, 1, 1),
(3232, 'K.P. SIDOLA 30 ', 0, 0, 1, 1, 5, 1, 1),
(3233, 'K.P. SIDOLA 55 ', 0, 0, 1, 1, 5, 1, 1),
(3234, 'KADITIC 50MG 2', 0, 0, 1, 1, 2, 1, 1),
(3235, 'KAFLAM 50', 0, 0, 1, 1, 2, 1, 1),
(3236, 'KALCINOL N K', 0, 0, 1, 1, 4, 1, 1),
(3237, 'KALIUM DIKLOFEN', 0, 0, 1, 1, 2, 1, 1),
(3238, 'KALMETHASONE 2', 0, 0, 1, 1, 2, 1, 1),
(3239, 'KALMICETIN OINT', 0, 0, 1, 1, 4, 1, 1),
(3240, 'KALNEX 500 MG', 0, 0, 1, 1, 2, 1, 1),
(3241, 'KALPANAX CAIR (', 0, 0, 1, 1, 6, 1, 1),
(3242, 'KALPANAX CR', 0, 0, 1, 1, 4, 1, 1),
(3243, 'KALPANAX SALEP', 0, 0, 1, 1, 4, 1, 1),
(3244, 'KANDISTATIN DRO', 0, 0, 1, 1, 6, 1, 1),
(3245, 'KANNA 15 GR', 0, 0, 1, 1, 5, 1, 1),
(3246, 'KANNA 30 GR', 0, 0, 1, 1, 5, 1, 1),
(3247, 'KANTUNG ASI (IS', 0, 0, 1, 1, 8, 1, 1),
(3248, 'KANTUNG ASI (IS', 0, 0, 1, 1, 10, 1, 1),
(3249, 'KAPAS 100 GR', 0, 0, 1, 1, 1, 1, 1),
(3250, 'KAPAS 25 GR', 0, 0, 1, 1, 1, 1, 1),
(3251, 'KAPAS 250 GR', 0, 0, 1, 1, 1, 1, 1),
(3252, 'KAPAS 50 GR', 0, 0, 1, 1, 1, 1, 1),
(3253, 'KAPAS 500 GR', 0, 0, 1, 1, 1, 1, 1),
(3254, 'KAPAS BOLA MEDI', 0, 0, 1, 1, 7, 1, 1),
(3255, 'KAPAS BOLA WELL', 0, 0, 1, 1, 7, 1, 1),
(3256, 'KAPAS FACIAL KE', 0, 0, 1, 1, 7, 1, 1),
(3257, '3UL TUNTAS', 0, 0, 1, 1, 8, 1, 1),
(3258, 'KASSA STERIL KA', 0, 0, 1, 1, 8, 1, 1),
(3259, 'KASSA STERIL ON', 0, 0, 1, 1, 8, 1, 1),
(3260, 'KEJIBELING', 0, 0, 1, 1, 9, 1, 1),
(3261, 'KEMBANG BULAN', 0, 0, 1, 1, 6, 1, 1),
(3262, 'KENACORT A CR', 0, 0, 1, 1, 4, 1, 1),
(3263, 'KENACORT 2', 0, 0, 1, 1, 2, 1, 1),
(3264, 'KENALOG IN ORAB', 0, 0, 1, 1, 4, 1, 1),
(3265, 'KENDARON 200 MG', 0, 0, 1, 1, 2, 1, 1),
(3266, 'KENSHIN', 0, 0, 1, 1, 9, 1, 1),
(3267, 'KETESSE 2', 0, 0, 1, 1, 2, 1, 1),
(3268, 'KETOCONAZOLE 20', 0, 0, 1, 1, 2, 1, 1),
(3269, 'KETOCONAZOLE CR', 0, 0, 1, 1, 4, 1, 1),
(3270, 'KETOCONAZOLE CR', 0, 0, 1, 1, 4, 1, 1),
(3271, 'KETOCONAZOLE CR', 0, 0, 1, 1, 4, 1, 1),
(3272, 'KETOMED SS', 0, 0, 1, 1, 6, 1, 1),
(3273, 'KETRICIN ORABAS', 0, 0, 1, 1, 4, 1, 1),
(3274, 'KIRANTI', 0, 0, 1, 1, 5, 1, 1),
(3275, 'KLODERMA CR 10 ', 0, 0, 1, 1, 4, 1, 1),
(3276, 'KLODERMA CR 5 G', 0, 0, 1, 1, 4, 1, 1),
(3277, 'KLODERMA OINT 5', 0, 0, 1, 1, 4, 1, 1),
(3278, 'KOMIX HERBAL 15', 0, 0, 1, 1, 5, 1, 1),
(3279, 'KOMIX JAHE', 0, 0, 1, 1, 7, 1, 1),
(3280, 'KOMIX JERUK NIP', 0, 0, 1, 1, 7, 1, 1),
(3281, 'KOMIX KIDS', 0, 0, 1, 1, 7, 1, 1),
(3282, 'KOMIX MINT', 0, 0, 1, 1, 7, 1, 1),
(3283, 'KOMIX OBH', 0, 0, 1, 1, 7, 1, 1),
(3284, 'KONIDIN 2', 0, 0, 1, 1, 9, 1, 1),
(3285, 'KOTAK P 3 K', 0, 0, 1, 1, 8, 1, 1),
(3286, 'KOYO CAP CABE', 0, 0, 1, 1, 7, 1, 1),
(3287, 'KOYO HANSAPLAST', 0, 0, 1, 1, 7, 1, 1),
(3288, 'KOYO SALONPAS', 0, 0, 1, 1, 7, 1, 1),
(3289, 'KOYO SALONPAS H', 0, 0, 1, 1, 7, 1, 1),
(3290, 'KOYO SALONPAS P', 0, 0, 1, 1, 7, 1, 1),
(3291, 'KULDON SARIAWAN', 0, 0, 1, 1, 9, 1, 1),
(3292, 'KUNYIT ASAM', 0, 0, 1, 1, 7, 1, 1),
(3293, 'LACOLDIN SYR 60', 0, 0, 1, 1, 5, 1, 1),
(3294, 'LACOLDIN 2', 0, 0, 1, 1, 2, 1, 1),
(3295, 'LACTACYD LIQ BI', 0, 0, 1, 1, 5, 1, 1),
(3296, 'LACTACYD LIQ PI', 0, 0, 1, 1, 5, 1, 1),
(3297, 'LACTO B', 0, 0, 1, 1, 7, 1, 1),
(3298, 'LACTULAX SYR 12', 0, 0, 1, 1, 5, 1, 1),
(3299, 'LACTULAX SYR 60', 0, 0, 1, 1, 5, 1, 1),
(3300, 'L-ACYS', 0, 0, 1, 1, 3, 1, 1),
(3301, 'LAFALOS CR', 0, 0, 1, 1, 4, 1, 1),
(3302, 'LAFALOS PLUS CR', 0, 0, 1, 1, 4, 1, 1),
(3303, 'LAFLANAC 25 MG', 0, 0, 1, 1, 2, 1, 1),
(3304, 'LAGESIL SYR KEC', 0, 0, 1, 1, 5, 1, 1),
(3305, 'LAMANDEL BOTOL', 0, 0, 1, 1, 5, 1, 1),
(3306, 'LAMANDEL 15', 0, 0, 1, 1, 8, 1, 1),
(3307, 'LAMBUCID SYR 10', 0, 0, 1, 1, 5, 1, 1),
(3308, 'LAMBUCID SYR 60', 0, 0, 1, 1, 5, 1, 1),
(3309, 'LAMESON  4 MG', 0, 0, 1, 1, 2, 1, 1),
(3310, 'LAMESON  8 MG', 0, 0, 1, 1, 2, 1, 1),
(3311, 'LAMESON 16 MG', 0, 0, 1, 1, 2, 1, 1),
(3312, 'LANADEXON 2', 0, 0, 1, 1, 2, 1, 1),
(3313, 'LANCAR ASI', 0, 0, 1, 1, 8, 1, 1),
(3314, 'LANSOPRAZOLE 30', 0, 0, 1, 1, 3, 1, 1),
(3315, 'LAPIBAL 500', 0, 0, 1, 1, 2, 1, 1),
(3316, 'LAPIFED 2', 0, 0, 1, 1, 2, 1, 1),
(3317, 'LAPISIV SYR', 0, 0, 1, 1, 5, 1, 1),
(3318, 'LAPRAZ 3UL', 0, 0, 1, 1, 3, 1, 1),
(3319, 'LAR BOTOL BESAR', 0, 0, 1, 1, 5, 1, 1),
(3320, 'LAR K3 BOTOL K', 0, 0, 1, 1, 5, 1, 1),
(3321, 'LAR K3 KALENG', 0, 0, 1, 1, 6, 1, 1),
(3322, 'LAR. CAP BADAK ', 0, 0, 1, 1, 5, 1, 1),
(3323, 'LASAL EXP SYR', 0, 0, 1, 1, 5, 1, 1),
(3324, 'LASAL SYR', 0, 0, 1, 1, 5, 1, 1),
(3325, 'LASERIN MADU 10', 0, 0, 1, 1, 5, 1, 1),
(3326, 'LASERIN MADU 30', 0, 0, 1, 1, 5, 1, 1),
(3327, 'LASERIN MADU 60', 0, 0, 1, 1, 5, 1, 1),
(3328, 'LASERIN SYR 100', 0, 0, 1, 1, 5, 1, 1),
(3329, 'LASERIN SYR 30 ', 0, 0, 1, 1, 5, 1, 1),
(3330, 'LASERIN SYR 60 ', 0, 0, 1, 1, 5, 1, 1),
(3331, 'LASIX', 0, 0, 1, 1, 2, 1, 1),
(3332, 'LAXADINE SYR 60', 0, 0, 1, 1, 5, 1, 1),
(3333, 'LAXING 10\'', 0, 0, 1, 1, 9, 1, 1),
(3334, 'L-BIO SAC', 0, 0, 1, 1, 7, 1, 1),
(3335, 'LELAP KAPLET', 0, 0, 1, 1, 9, 1, 1),
(3336, 'LERZIN CAPS', 0, 0, 1, 1, 3, 1, 1),
(3337, 'LERZIN SYR', 0, 0, 1, 1, 5, 1, 1),
(3338, 'LEUKOPLAST 1,25', 0, 0, 1, 1, 1, 1, 1),
(3339, 'LEUKOPLAST 1.25', 0, 0, 1, 1, 1, 1, 1),
(3340, 'LEVOFLOXACIN 2', 0, 0, 1, 1, 2, 1, 1),
(3341, 'LIDOCAINE COMPO', 0, 0, 1, 1, 12, 1, 1),
(3342, 'LIFREE DIAPERS ', 0, 0, 1, 1, 1, 1, 1),
(3343, 'LIFREE DIAPERS ', 0, 0, 1, 1, 1, 1, 1),
(3344, 'LIFREE DIAPERS ', 0, 0, 1, 1, 1, 1, 1),
(3345, 'LINCOMYCIN 500 ', 0, 0, 1, 1, 3, 1, 1),
(3346, 'LIPITOR 20 MG', 0, 0, 1, 1, 2, 1, 1),
(3347, 'LISINOPRIL 5 MG', 0, 0, 1, 1, 2, 1, 1),
(3348, 'LISTERINE CITRU', 0, 0, 1, 1, 5, 1, 1),
(3349, 'LISTERINE CITRU', 0, 0, 1, 1, 5, 1, 1),
(3350, 'LISTERINE COOL ', 0, 0, 1, 1, 5, 1, 1),
(3351, 'LISTERINE COOLM', 0, 0, 1, 1, 5, 1, 1),
(3352, 'LISTERINE ORIGI', 0, 0, 1, 1, 5, 1, 1),
(3353, 'LIVRON B PLEX', 0, 0, 1, 1, 9, 1, 1),
(3354, 'LO HAN KO', 0, 0, 1, 1, 1, 1, 1),
(3355, 'LODECON FORTE', 0, 0, 1, 1, 2, 1, 1),
(3356, 'LODIA 2', 0, 0, 1, 1, 2, 1, 1),
(3357, 'LOKEV', 0, 0, 1, 1, 3, 1, 1),
(3358, 'LORATADIN 10 MG', 0, 0, 1, 1, 2, 1, 1),
(3359, 'L-ZINC SYRUP 10', 0, 0, 1, 1, 5, 1, 1),
(3360, 'M B K BIASA', 0, 0, 1, 1, 7, 1, 1),
(3361, 'M B K SUPER', 0, 0, 1, 1, 7, 1, 1),
(3362, 'M. GANDAPURA IK', 0, 0, 1, 1, 5, 1, 1),
(3363, 'M. GANDAPURA IK', 0, 0, 1, 1, 5, 1, 1),
(3364, 'M. GANDAPURA IK', 0, 0, 1, 1, 5, 1, 1),
(3365, 'M. IKAN \'20', 0, 0, 1, 1, 7, 1, 1),
(3366, 'M. IKAN 50\'', 0, 0, 1, 1, 5, 1, 1),
(3367, 'M. SERE 100 ML', 0, 0, 1, 1, 5, 1, 1),
(3368, 'M. SERE 30ML', 0, 0, 1, 1, 5, 1, 1),
(3369, 'M. TAWON CC', 0, 0, 1, 1, 5, 1, 1),
(3370, 'M. TAWON DD', 0, 0, 1, 1, 5, 1, 1),
(3371, 'M. TAWON EE', 0, 0, 1, 1, 5, 1, 1),
(3372, 'M. TAWON FF', 0, 0, 1, 1, 5, 1, 1),
(3373, 'M. TELON CAP LA', 0, 0, 1, 1, 5, 1, 1),
(3374, 'M. TELON CAP LA', 0, 0, 1, 1, 5, 1, 1),
(3375, 'M. TELON PLUS M', 0, 0, 1, 1, 5, 1, 1),
(3376, 'M. TELON PLUS M', 0, 0, 1, 1, 5, 1, 1),
(3377, 'M. TELON PLUS M', 0, 0, 1, 1, 5, 1, 1),
(3378, 'M. URUT CAP LAN', 0, 0, 1, 1, 5, 1, 1),
(3379, 'M. URUT CAP LAN', 0, 0, 1, 1, 5, 1, 1),
(3380, 'M.A  FRESH CARE', 0, 0, 1, 1, 6, 1, 1),
(3381, 'M.A  SAFE CARE ', 0, 0, 1, 1, 6, 1, 1),
(3382, 'M.A PLOSSA', 0, 0, 1, 1, 6, 1, 1),
(3383, 'M.A PLOSSA (KEC', 0, 0, 1, 1, 5, 1, 1),
(3384, 'M.A. KA10 10 ML', 0, 0, 1, 1, 6, 1, 1),
(3385, 'M.A. KA10 14 ML', 0, 0, 1, 1, 6, 1, 1),
(3386, 'M.A. KA10 28 ML', 0, 0, 1, 1, 6, 1, 1),
(3387, 'M.A. KA10 3 ML', 0, 0, 1, 1, 6, 1, 1),
(3388, 'M.A. KA10 5 ML', 0, 0, 1, 1, 6, 1, 1),
(3389, 'M.A. LANG 12ML', 0, 0, 1, 1, 6, 1, 1),
(3390, 'M.A. LANG NO 2 ', 0, 0, 1, 1, 6, 1, 1),
(3391, 'M.A. LANG NO 3 ', 0, 0, 1, 1, 6, 1, 1),
(3392, 'MADU KURMA MANG', 0, 0, 1, 1, 5, 1, 1),
(3393, 'MADU LEBAH LIAR', 0, 0, 1, 1, 5, 1, 1),
(3394, 'MADU NUSANTARA ', 0, 0, 1, 1, 5, 1, 1),
(3395, 'MADU NUSANTARA ', 0, 0, 1, 1, 5, 1, 1),
(3396, 'MADU PAHIT PLUS', 0, 0, 1, 1, 5, 1, 1),
(3397, 'MADU SYAMIL ANA', 0, 0, 1, 1, 5, 1, 1),
(3398, 'MADU SYAMIL FAM', 0, 0, 1, 1, 5, 1, 1),
(3399, 'MADU TJ JOYBEE ', 0, 0, 1, 1, 5, 1, 1),
(3400, 'MADU TJ MURNI 1', 0, 0, 1, 1, 5, 1, 1),
(3401, 'MADU TJ MURNI 2', 0, 0, 1, 1, 5, 1, 1),
(3402, 'MADU TJ 7ET', 0, 0, 1, 1, 7, 1, 1),
(3403, 'MADURASA', 0, 0, 1, 1, 7, 1, 1),
(3404, 'MAGTRAL FORTE S', 0, 0, 1, 1, 5, 1, 1),
(3405, 'MAGTRAL SYR 120', 0, 0, 1, 1, 5, 1, 1),
(3406, 'MAMY POKO L30', 0, 0, 1, 1, 10, 1, 1),
(3407, 'MAMY POKO M34', 0, 0, 1, 1, 10, 1, 1),
(3408, 'MAMY POKO M50', 0, 0, 1, 1, 10, 1, 1),
(3409, 'MAMY POKO NB-S ', 0, 0, 1, 1, 10, 1, 1),
(3410, 'MAMY POKO S40', 0, 0, 1, 1, 10, 1, 1),
(3411, 'MARKS POWDER', 0, 0, 1, 1, 6, 1, 1),
(3412, 'MASKER ANAK 50\'', 0, 0, 1, 1, 8, 1, 1),
(3413, 'MASKER ANAK SAT', 0, 0, 1, 1, 1, 1, 1),
(3414, 'MASKER BLACK ON', 0, 0, 1, 1, 8, 1, 1),
(3415, 'MASKER DINAKU 5', 0, 0, 1, 1, 8, 1, 1),
(3416, 'MASKER DINAKU H', 0, 0, 1, 1, 8, 1, 1),
(3417, 'MASKER DUCKBILL', 0, 0, 1, 1, 10, 1, 1),
(3418, 'MASKER DUCKBILL', 0, 0, 1, 1, 8, 1, 1),
(3419, 'MASKER DUCKBILL', 0, 0, 1, 1, 8, 1, 1),
(3420, 'MASKER HIJAB ON', 0, 0, 1, 1, 8, 1, 1),
(3421, 'MASKER KF94', 0, 0, 1, 1, 10, 1, 1),
(3422, 'MASKER KF94 ANA', 0, 0, 1, 1, 7, 1, 1),
(3423, 'MASKER KF94 ANA', 0, 0, 1, 1, 7, 1, 1),
(3424, 'MASKER KIFAMED ', 0, 0, 1, 1, 7, 1, 1),
(3425, 'MASKER MEDICAL ', 0, 0, 1, 1, 8, 1, 1),
(3426, 'MASKER MEDICAL ', 0, 0, 1, 1, 1, 1, 1),
(3427, 'MASKER ONEMED 5', 0, 0, 1, 1, 8, 1, 1),
(3428, 'MASKER SATUAN', 0, 0, 1, 1, 1, 1, 1),
(3429, 'MASKER SENSI DU', 0, 0, 1, 1, 7, 1, 1),
(3430, 'MASKER THANKFUL', 0, 0, 1, 1, 7, 1, 1),
(3431, 'MASKER THANKFUL', 0, 0, 1, 1, 7, 1, 1),
(3432, 'MAXIMUS', 0, 0, 1, 1, 8, 1, 1),
(3433, 'MECOBALAMIN 500', 0, 0, 1, 1, 3, 1, 1),
(3434, 'MEDICREPE 10 CM', 0, 0, 1, 1, 1, 1, 1),
(3435, 'MEDICREPE 7,5 C', 0, 0, 1, 1, 1, 1, 1),
(3436, 'MEDIFLEX CR 30 ', 0, 0, 1, 1, 4, 1, 1),
(3437, 'MEDIKLIN GEL', 0, 0, 1, 1, 4, 1, 1),
(3438, 'MEDIKLIN \'TR\' G', 0, 0, 1, 1, 4, 1, 1),
(3439, 'MEFINAL 250 MG', 0, 0, 1, 1, 2, 1, 1),
(3440, 'MEFINAL 500 MG', 0, 0, 1, 1, 2, 1, 1),
(3441, 'MEFUROSAN CR', 0, 0, 1, 1, 4, 1, 1),
(3442, 'MEGAZING 2', 0, 0, 1, 1, 2, 1, 1),
(3443, 'MELANOX CR', 0, 0, 1, 1, 4, 1, 1),
(3444, 'MELOXICAM 15 MG', 0, 0, 1, 1, 2, 1, 1),
(3445, 'MELOXICAM 7.5 M', 0, 0, 1, 1, 2, 1, 1),
(3446, 'MERISLON 12MG', 0, 0, 1, 1, 2, 1, 1),
(3447, 'MERISLON 6 MG', 0, 0, 1, 1, 2, 1, 1),
(3448, 'MERTIGO 2', 0, 0, 1, 1, 2, 1, 1),
(3449, 'METFORMIN 500 M', 0, 0, 1, 1, 2, 1, 1),
(3450, 'METFORMIN 850 M', 0, 0, 1, 1, 2, 1, 1),
(3451, 'METHYCOBALT 500', 0, 0, 1, 1, 3, 1, 1),
(3452, 'METHYL PREDNISO', 0, 0, 1, 1, 2, 1, 1),
(3453, 'METHYL PREDNISO', 0, 0, 1, 1, 2, 1, 1),
(3454, 'METHYL PREDNISO', 0, 0, 1, 1, 2, 1, 1),
(3455, 'METRONIDAZOLE 5', 0, 0, 1, 1, 2, 1, 1),
(3456, 'MICONAZOLE CR', 0, 0, 1, 1, 4, 1, 1),
(3457, 'MICROGYNON LIBI', 0, 0, 1, 1, 8, 1, 1),
(3458, 'MICROLAX', 0, 0, 1, 1, 4, 1, 1),
(3459, 'MICROPORE 1,5 C', 0, 0, 1, 1, 1, 1, 1),
(3460, 'MICROPORE 2,5 C', 0, 0, 1, 1, 1, 1, 1),
(3461, 'MICROPORE 5 CM ', 0, 0, 1, 1, 1, 1, 1),
(3462, 'MILTON', 0, 0, 1, 1, 7, 1, 1),
(3463, 'MINOSEP GARGLE ', 0, 0, 1, 1, 5, 1, 1),
(3464, 'MIRASIC 500 MG', 0, 0, 1, 1, 2, 1, 1),
(3465, 'MITELLA', 0, 0, 1, 1, 1, 1, 1),
(3466, 'MIXAGRIP FLU&BA', 0, 0, 1, 1, 9, 1, 1),
(3467, 'MIXAGRIP 2', 0, 0, 1, 1, 9, 1, 1),
(3468, 'MOFACORT CR 5 G', 0, 0, 1, 1, 4, 1, 1),
(3469, 'MOLACORT 2 0.5 ', 0, 0, 1, 1, 2, 1, 1),
(3470, 'MOLACORT 2 0.75', 0, 0, 1, 1, 2, 1, 1),
(3471, 'MOLAGIT 2', 0, 0, 1, 1, 2, 1, 1),
(3472, 'MOLAKRIM 30 GR', 0, 0, 1, 1, 4, 1, 1),
(3473, 'MOLEX FLU', 0, 0, 1, 1, 2, 1, 1),
(3474, 'MOLOCO B12', 0, 0, 1, 1, 2, 1, 1),
(3475, 'MOMETASONE CR 0', 0, 0, 1, 1, 4, 1, 1),
(3476, 'MOMETASONE CR 5', 0, 0, 1, 1, 4, 1, 1),
(3477, 'MOMILEN DIAPER ', 0, 0, 1, 1, 4, 1, 1),
(3478, 'MOMILEN DIAPER ', 0, 0, 1, 1, 4, 1, 1),
(3479, 'MOMILEN IMUSIVE', 0, 0, 1, 1, 5, 1, 1),
(3480, 'MOMILEN NURSING', 0, 0, 1, 1, 4, 1, 1),
(3481, 'MOMILEN NURSING', 0, 0, 1, 1, 4, 1, 1),
(3482, 'MUCERA DROP', 0, 0, 1, 1, 5, 1, 1),
(3483, 'MUCERA SYR', 0, 0, 1, 1, 5, 1, 1),
(3484, 'MUCOHEXIN 2', 0, 0, 1, 1, 2, 1, 1),
(3485, 'MUCOPECT DROPS', 0, 0, 1, 1, 5, 1, 1),
(3486, 'MUCOPECT DWS SY', 0, 0, 1, 1, 5, 1, 1),
(3487, 'MUCOPECT PED SY', 0, 0, 1, 1, 5, 1, 1),
(3488, 'MUCOPECT 2', 0, 0, 1, 1, 2, 1, 1),
(3489, 'MUCOS DROPS', 0, 0, 1, 1, 5, 1, 1),
(3490, 'MUCOS SYR', 0, 0, 1, 1, 5, 1, 1),
(3491, 'MUCOSTA 2', 0, 0, 1, 1, 2, 1, 1),
(3492, 'MUPIROCIN OINT ', 0, 0, 1, 1, 4, 1, 1),
(3493, 'MY BABY KIDS SH', 0, 0, 1, 1, 5, 1, 1),
(3494, 'MY BABY KIDS SH', 0, 0, 1, 1, 5, 1, 1),
(3495, 'MYCO Z  CR', 0, 0, 1, 1, 4, 1, 1),
(3496, 'MYCORAL CR K', 0, 0, 1, 1, 4, 1, 1),
(3497, 'MYCORAL 2 200 M', 0, 0, 1, 1, 2, 1, 1),
(3498, 'MYCOSTATIN ORAL', 0, 0, 1, 1, 5, 1, 1),
(3499, 'MYLANTA SYR 150', 0, 0, 1, 1, 5, 1, 1),
(3500, 'MYLANTA SYR 50 ', 0, 0, 1, 1, 5, 1, 1),
(3501, 'MYLANTA 2', 0, 0, 1, 1, 9, 1, 1),
(3502, 'MYONAL', 0, 0, 1, 1, 2, 1, 1),
(3503, 'MYONEP 2', 0, 0, 1, 1, 2, 1, 1),
(3504, 'MYWELL VIT. D3 ', 0, 0, 1, 1, 5, 1, 1),
(3505, 'NACL 0.9% 100 M', 0, 0, 1, 1, 6, 1, 1),
(3506, 'NACL 500 ML', 0, 0, 1, 1, 6, 1, 1),
(3507, 'NALGESTAN', 0, 0, 1, 1, 2, 1, 1),
(3508, 'NANO-NANO 5\'', 0, 0, 1, 1, 7, 1, 1),
(3509, 'NANO-NANO JOY-C', 0, 0, 1, 1, 7, 1, 1),
(3510, 'NANO-NANO MILKY', 0, 0, 1, 1, 7, 1, 1),
(3511, 'NAPACIN 2', 0, 0, 1, 1, 9, 1, 1),
(3512, 'NASAL ASPIRATOR', 0, 0, 1, 1, 1, 1, 1),
(3513, 'NASPRO 2', 0, 0, 1, 1, 9, 1, 1),
(3514, 'NATRIUM DIKLOFE', 0, 0, 1, 1, 2, 1, 1),
(3515, 'NATUR E 100 IU ', 0, 0, 1, 1, 8, 1, 1),
(3516, 'NATUR E 100 IU ', 0, 0, 1, 1, 8, 1, 1),
(3517, 'NATUR E 300 IU ', 0, 0, 1, 1, 8, 1, 1),
(3518, 'NATUR E 300 IU ', 0, 0, 1, 1, 8, 1, 1),
(3519, 'NATUR SLIM', 0, 0, 1, 1, 7, 1, 1),
(3520, 'NEBACETIN OINT ', 0, 0, 1, 1, 4, 1, 1),
(3521, 'NEBACETIN POWDE', 0, 0, 1, 1, 5, 1, 1),
(3522, 'NEO HORMOVITON', 0, 0, 1, 1, 9, 1, 1),
(3523, 'NEO KAOLANA', 0, 0, 1, 1, 5, 1, 1),
(3524, 'NEO KAOMINAL SY', 0, 0, 1, 1, 5, 1, 1),
(3525, 'NEO PROVIGOR', 0, 0, 1, 1, 8, 1, 1),
(3526, 'NEO RHEMACYL', 0, 0, 1, 1, 2, 1, 1),
(3527, 'NEO RHEMACYL NE', 0, 0, 1, 1, 2, 1, 1),
(3528, 'NEO RHEUMACYL C', 0, 0, 1, 1, 4, 1, 1),
(3529, 'NEOZEP FORTE', 0, 0, 1, 1, 9, 1, 1),
(3530, 'NEPHROLIT', 0, 0, 1, 1, 3, 1, 1),
(3531, 'NERISONA COMBI ', 0, 0, 1, 1, 4, 1, 1),
(3532, 'NEURALGIN', 0, 0, 1, 1, 2, 1, 1),
(3533, 'NEUROBION 5000', 0, 0, 1, 1, 2, 1, 1),
(3534, 'NEUROBION 2 PUT', 0, 0, 1, 1, 2, 1, 1),
(3535, 'NEURODEX 2', 0, 0, 1, 1, 2, 1, 1),
(3536, 'NEUROFENAC PLUS', 0, 0, 1, 1, 2, 1, 1),
(3537, 'NEUROPYRON V', 0, 0, 1, 1, 2, 1, 1),
(3538, 'NEUROSANBE', 0, 0, 1, 1, 2, 1, 1),
(3539, 'NEUROSANBE 5000', 0, 0, 1, 1, 2, 1, 1),
(3540, 'NEUROSANBE PLUS', 0, 0, 1, 1, 2, 1, 1),
(3541, 'NEUROVIT E 2', 0, 0, 1, 1, 2, 1, 1),
(3542, 'NEW DIA2', 0, 0, 1, 1, 9, 1, 1),
(3543, 'NEXIUM 20MG', 0, 0, 1, 1, 2, 1, 1),
(3544, 'NEXIUM 40MG', 0, 0, 1, 1, 2, 1, 1),
(3545, 'NIFURAL SYR', 0, 0, 1, 1, 5, 1, 1),
(3546, 'NIKNAK TALK', 0, 0, 1, 1, 5, 1, 1),
(3547, 'NIPEDIPIN 10 MG', 0, 0, 1, 1, 2, 1, 1),
(3548, 'NISAGON CR', 0, 0, 1, 1, 4, 1, 1),
(3549, 'NITROKAF CAP', 0, 0, 1, 1, 3, 1, 1),
(3550, 'NIZORAL CR 5 GR', 0, 0, 1, 1, 4, 1, 1),
(3551, 'NODROF 2', 0, 0, 1, 1, 2, 1, 1),
(3552, 'NONEMI 2', 0, 0, 1, 1, 2, 1, 1),
(3553, 'NORIT', 0, 0, 1, 1, 6, 1, 1),
(3554, 'NORVASK 10 MG', 0, 0, 1, 1, 2, 1, 1),
(3555, 'NORVASK 5 MG', 0, 0, 1, 1, 2, 1, 1),
(3556, 'NOURISHSKIN ULT', 0, 0, 1, 1, 8, 1, 1),
(3557, 'NOVALGIN 2', 0, 0, 1, 1, 2, 1, 1),
(3558, 'NUFADEX 0,75 MG', 0, 0, 1, 1, 2, 1, 1),
(3559, 'NUFADEX 0.5 MG', 0, 0, 1, 1, 2, 1, 1),
(3560, 'NURUTENZ MADU', 0, 0, 1, 1, 5, 1, 1),
(3561, 'NUTRADON SYR', 0, 0, 1, 1, 5, 1, 1),
(3562, 'NUTRAFOR CHOL', 0, 0, 1, 1, 9, 1, 1),
(3563, 'NUTRIMAX B COMP', 0, 0, 1, 1, 6, 1, 1),
(3564, 'NUTRIMAX C&C 10', 0, 0, 1, 1, 5, 1, 1),
(3565, 'NUTRIMAX C+PLUS', 0, 0, 1, 1, 6, 1, 1),
(3566, 'NUTRIMAX CMAX 1', 0, 0, 1, 1, 6, 1, 1),
(3567, 'NUTRIMAX NUTRI ', 0, 0, 1, 1, 6, 1, 1),
(3568, 'NUTRIMAX OMEGA ', 0, 0, 1, 1, 6, 1, 1),
(3569, 'NUTRIMAX VIT D3', 0, 0, 1, 1, 6, 1, 1),
(3570, 'O B H COMBI', 0, 0, 1, 1, 5, 1, 1),
(3571, 'O B H COMBI PLU', 0, 0, 1, 1, 5, 1, 1),
(3572, 'O B H COMBI PLU', 0, 0, 1, 1, 5, 1, 1),
(3573, 'O B H COMBI PLU', 0, 0, 1, 1, 5, 1, 1),
(3574, 'O B H ITRASAL', 0, 0, 1, 1, 5, 1, 1),
(3575, 'O B H NELCO PE ', 0, 0, 1, 1, 5, 1, 1),
(3576, 'O B H NELCO PE ', 0, 0, 1, 1, 5, 1, 1),
(3577, 'O B P', 0, 0, 1, 1, 5, 1, 1),
(3578, 'OB COMBI BATUK ', 0, 0, 1, 1, 5, 1, 1),
(3579, 'OB HERBAL 100 M', 0, 0, 1, 1, 5, 1, 1),
(3580, 'OB HERBAL 60 ML', 0, 0, 1, 1, 5, 1, 1),
(3581, 'OB HERBAL JUNIO', 0, 0, 1, 1, 5, 1, 1),
(3582, 'OBAT BATUK IBU ', 0, 0, 1, 1, 5, 1, 1),
(3583, 'OBAT BATUK IBU ', 0, 0, 1, 1, 5, 1, 1),
(3584, 'OBIMIN AF', 0, 0, 1, 1, 2, 1, 1),
(3585, 'OCUSON 2', 0, 0, 1, 1, 2, 1, 1),
(3586, 'OMEPRAZOLE 20 M', 0, 0, 1, 1, 3, 1, 1),
(3587, 'OMEPROS \'30', 0, 0, 1, 1, 6, 1, 1),
(3588, 'ONDANSENTRON 4 ', 0, 0, 1, 1, 2, 1, 1),
(3589, 'ONDANSENTRON 8 ', 0, 0, 1, 1, 2, 1, 1),
(3590, 'OPISTAN 500 MG', 0, 0, 1, 1, 2, 1, 1),
(3591, 'ORALIT', 0, 0, 1, 1, 7, 1, 1),
(3592, 'OSFIT DHA', 0, 0, 1, 1, 2, 1, 1),
(3593, 'OSG KAKAK TUA', 0, 0, 1, 1, 6, 1, 1),
(3594, 'OSKADON SP 2', 0, 0, 1, 1, 9, 1, 1),
(3595, 'OSKADON 2', 0, 0, 1, 1, 9, 1, 1),
(3596, 'OSTEOCAL 2', 0, 0, 1, 1, 2, 1, 1),
(3597, 'OSTEOKOM 2', 0, 0, 1, 1, 2, 1, 1),
(3598, 'OTO DIAPERS DEW', 0, 0, 1, 1, 10, 1, 1),
(3599, 'OTOPAIN AD', 0, 0, 1, 1, 6, 1, 1),
(3600, 'OXYCAN 500 CC', 0, 0, 1, 1, 6, 1, 1),
(3601, 'OXYCAN 600 CC (', 0, 0, 1, 1, 6, 1, 1),
(3602, 'OXYTETRACYCLIN ', 0, 0, 1, 1, 4, 1, 1),
(3603, 'OXYTETRACYCLINE', 0, 0, 1, 1, 4, 1, 1),
(3604, 'P K (BUNGKUS)', 0, 0, 1, 1, 1, 1, 1),
(3605, 'PABANOX CR', 0, 0, 1, 1, 4, 1, 1),
(3606, 'PAGODA PAST B', 0, 0, 1, 1, 1, 1, 1),
(3607, 'PAGODA SYR 100 ', 0, 0, 1, 1, 5, 1, 1),
(3608, 'PANADOL BIRU 2', 0, 0, 1, 1, 9, 1, 1),
(3609, 'PANADOL CHEWABL', 0, 0, 1, 1, 9, 1, 1),
(3610, 'PANADOL COLD & ', 0, 0, 1, 1, 9, 1, 1),
(3611, 'PANADOL DROPS', 0, 0, 1, 1, 5, 1, 1),
(3612, 'PANADOL EXTRA', 0, 0, 1, 1, 9, 1, 1),
(3613, 'PANADOL SYR 30 ', 0, 0, 1, 1, 5, 1, 1),
(3614, 'PANADOL SYR 60 ', 0, 0, 1, 1, 5, 1, 1),
(3615, 'PANTOPRAZOLE 20', 0, 0, 1, 1, 2, 1, 1),
(3616, 'PANTOPRAZOLE 40', 0, 0, 1, 1, 2, 1, 1),
(3617, 'PANTOZOL 20 MG', 0, 0, 1, 1, 2, 1, 1),
(3618, 'PANTOZOL 40 MG', 0, 0, 1, 1, 2, 1, 1),
(3619, 'PAPAVERIN 2', 0, 0, 1, 1, 2, 1, 1),
(3620, 'PARACETAMOL DRO', 0, 0, 1, 1, 5, 1, 1),
(3621, 'PARACETAMOL SIR', 0, 0, 1, 1, 5, 1, 1),
(3622, 'PARACETAMOL 2', 0, 0, 1, 1, 2, 1, 1),
(3623, 'PARAFLU 2', 0, 0, 1, 1, 2, 1, 1),
(3624, 'PARAM KOCOK AIR', 0, 0, 1, 1, 5, 1, 1),
(3625, 'PARAM KOCOK AIR', 0, 0, 1, 1, 5, 1, 1),
(3626, 'PARAMEX FLU&BAT', 0, 0, 1, 1, 9, 1, 1),
(3627, 'PARAMEX NYERI O', 0, 0, 1, 1, 9, 1, 1),
(3628, 'PARAMEX 2', 0, 0, 1, 1, 9, 1, 1),
(3629, 'PARASOL CR', 0, 0, 1, 1, 4, 1, 1),
(3630, 'PARASOL LOT SPF', 0, 0, 1, 1, 4, 1, 1),
(3631, 'PARASOL LOT SPF', 0, 0, 1, 1, 4, 1, 1),
(3632, 'PARATUSIN SYR', 0, 0, 1, 1, 5, 1, 1),
(3633, 'PARATUSIN 2', 0, 0, 1, 1, 9, 1, 1),
(3634, 'PARIET 10 MG', 0, 0, 1, 1, 2, 1, 1),
(3635, 'PARIET 20 MG', 0, 0, 1, 1, 2, 1, 1),
(3636, 'Pedialyte', 0, 0, 1, 1, 5, 1, 1),
(3637, 'PEDITOX', 0, 0, 1, 1, 5, 1, 1),
(3638, 'PEDYALITE', 0, 0, 1, 1, 5, 1, 1),
(3639, 'PENYAMBUNG PUTI', 0, 0, 1, 1, 1, 1, 1),
(3640, 'PENYANGGA TANGA', 0, 0, 1, 1, 1, 1, 1),
(3641, 'PERBAN B', 0, 0, 1, 1, 1, 1, 1),
(3642, 'PERBAN K', 0, 0, 1, 1, 1, 1, 1),
(3643, 'PERBAN S', 0, 0, 1, 1, 1, 1, 1),
(3644, 'PERMETRIN 5% CR', 0, 0, 1, 1, 4, 1, 1),
(3645, 'PHARMATON FORMU', 0, 0, 1, 1, 9, 1, 1),
(3646, 'PHARMATON VIT', 0, 0, 1, 1, 9, 1, 1),
(3647, 'PHAROLIT', 0, 0, 1, 1, 7, 1, 1),
(3648, 'PIKANG CUANG SA', 0, 0, 1, 1, 4, 1, 1),
(3649, 'PIL BINARI', 0, 0, 1, 1, 7, 1, 1),
(3650, 'PIL KITA', 0, 0, 1, 1, 9, 1, 1),
(3651, 'PIL MERIT', 0, 0, 1, 1, 7, 1, 1),
(3652, 'PIMTRACOL SYR 6', 0, 0, 1, 1, 5, 1, 1),
(3653, 'PIPET KACA 10 C', 0, 0, 1, 1, 1, 1, 1),
(3654, 'PIPET KACA 17 C', 0, 0, 1, 1, 1, 1, 1),
(3655, 'PIPET PLASTIK', 0, 0, 1, 1, 1, 1, 1),
(3656, 'PIROFEL GEL', 0, 0, 1, 1, 4, 1, 1),
(3657, 'PIROKSIKAM 10 M', 0, 0, 1, 1, 3, 1, 1),
(3658, 'PIROKSIKAM 20 M', 0, 0, 1, 1, 3, 1, 1),
(3659, 'PISPOT SODOK', 0, 0, 1, 1, 1, 1, 1),
(3660, 'PLANO2', 0, 0, 1, 1, 9, 1, 1),
(3661, 'PLANTACID F SYR', 0, 0, 1, 1, 5, 1, 1),
(3662, 'PLANTACID FORTE', 0, 0, 1, 1, 2, 1, 1),
(3663, 'PLANTACID SYR 1', 0, 0, 1, 1, 5, 1, 1),
(3664, 'PLESTER BULAT', 0, 0, 1, 1, 1, 1, 1),
(3665, 'PLESTERIN ANTI ', 0, 0, 1, 1, 10, 1, 1),
(3666, 'PLESTERIN KIDS', 0, 0, 1, 1, 1, 1, 1),
(3667, 'PLESTERIN ROLL ', 0, 0, 1, 1, 10, 1, 1),
(3668, 'POCARI SWEAT 50', 0, 0, 1, 1, 5, 1, 1),
(3669, 'POLDAN MIG 2', 0, 0, 1, 1, 9, 1, 1),
(3670, 'POLIDENT CR B', 0, 0, 1, 1, 4, 1, 1),
(3671, 'POLIDENT CR K', 0, 0, 1, 1, 4, 1, 1),
(3672, 'POLYCROL FORTE ', 0, 0, 1, 1, 5, 1, 1),
(3673, 'POLYCROL FORTE ', 0, 0, 1, 1, 2, 1, 1),
(3674, 'POLYCROL SYR 10', 0, 0, 1, 1, 5, 1, 1),
(3675, 'POLYSILANE SYR ', 0, 0, 1, 1, 5, 1, 1),
(3676, 'POLYSILANE SYR ', 0, 0, 1, 1, 5, 1, 1),
(3677, 'POLYSILANE 2', 0, 0, 1, 1, 2, 1, 1),
(3678, 'POMPA SUSU', 0, 0, 1, 1, 1, 1, 1),
(3679, 'POMPA SUSU DODO', 0, 0, 1, 1, 1, 1, 1),
(3680, 'PONSTAN 500 MG', 0, 0, 1, 1, 2, 1, 1),
(3681, 'PRAXION DROP', 0, 0, 1, 1, 5, 1, 1),
(3682, 'PRAXION F SYR', 0, 0, 1, 1, 5, 1, 1),
(3683, 'PRAXION SYR', 0, 0, 1, 1, 5, 1, 1),
(3684, 'PREDNISON 5 MG', 0, 0, 1, 1, 2, 1, 1),
(3685, 'PREGABALIN 75 M', 0, 0, 1, 1, 2, 1, 1),
(3686, 'PRIMADEX FORTE ', 0, 0, 1, 1, 2, 1, 1),
(3687, 'PRIMPERAN 10 MG', 0, 0, 1, 1, 2, 1, 1),
(3688, 'PRIMPERAN 5 MG', 0, 0, 1, 1, 2, 1, 1),
(3689, 'PROCOLD FLU&BAT', 0, 0, 1, 1, 9, 1, 1),
(3690, 'PROCOLD 2', 0, 0, 1, 1, 9, 1, 1);
INSERT INTO `item` (`id_item`, `nama`, `stok`, `stok_min`, `status`, `id_rak`, `id_satuan`, `id_jenis_item`, `id_supplier`) VALUES
(3691, 'PROLACTA FOR BA', 0, 0, 1, 1, 3, 1, 1),
(3692, 'PROMAG', 0, 0, 1, 1, 9, 1, 1),
(3693, 'PROMAG CAIR 7 M', 0, 0, 1, 1, 7, 1, 1),
(3694, 'PRONICY', 0, 0, 1, 1, 2, 1, 1),
(3695, 'PROPANOLOL 10 M', 0, 0, 1, 1, 2, 1, 1),
(3696, 'PROPANOLOL 40 M', 0, 0, 1, 1, 2, 1, 1),
(3697, 'PROPEPSA SYR', 0, 0, 1, 1, 5, 1, 1),
(3698, 'PROPEPSA SYR 20', 0, 0, 1, 1, 5, 1, 1),
(3699, 'PROPOLIS MELIA', 0, 0, 1, 1, 5, 1, 1),
(3700, 'PRORIS F SYR', 0, 0, 1, 1, 5, 1, 1),
(3701, 'PRORIS SYR', 0, 0, 1, 1, 5, 1, 1),
(3702, 'PRORIS 2', 0, 0, 1, 1, 2, 1, 1),
(3703, 'PROSPAN COUGH S', 0, 0, 1, 1, 5, 1, 1),
(3704, 'PROSTAKUR CAPS', 0, 0, 1, 1, 9, 1, 1),
(3705, 'PROTECAL', 0, 0, 1, 1, 6, 1, 1),
(3706, 'PROVE D3 1000 I', 0, 0, 1, 1, 2, 1, 1),
(3707, 'PROVE D3 5000 I', 0, 0, 1, 1, 2, 1, 1),
(3708, 'PURE BABY INHAL', 0, 0, 1, 1, 6, 1, 1),
(3709, 'PURE BABY RASH ', 0, 0, 1, 1, 4, 1, 1),
(3710, 'RADIN 2', 0, 0, 1, 1, 2, 1, 1),
(3711, 'RAMIPRIL 2,5 MG', 0, 0, 1, 1, 2, 1, 1),
(3712, 'RAMIPRIL 5 MG', 0, 0, 1, 1, 2, 1, 1),
(3713, 'RANITIDINE 150 ', 0, 0, 1, 1, 2, 1, 1),
(3714, 'RANTIN 150 MG', 0, 0, 1, 1, 2, 1, 1),
(3715, 'RAPET WANGI', 0, 0, 1, 1, 8, 1, 1),
(3716, 'RECOLFAR 0.5 MG', 0, 0, 1, 1, 2, 1, 1),
(3717, 'REDOXON EFF 10\'', 0, 0, 1, 1, 6, 1, 1),
(3718, 'REDOXON 2LET KU', 0, 0, 1, 1, 9, 1, 1),
(3719, 'RENADINAC 50 MG', 0, 0, 1, 1, 2, 1, 1),
(3720, 'RENALYTE', 0, 0, 1, 1, 5, 1, 1),
(3721, 'RENOVIT 30\'', 0, 0, 1, 1, 6, 1, 1),
(3722, 'RENOVIT GOLD 30', 0, 0, 1, 1, 6, 1, 1),
(3723, 'RENOVIT GOLD 9 ', 0, 0, 1, 1, 9, 1, 1),
(3724, 'RENOVIT 9 4\'', 0, 0, 1, 1, 9, 1, 1),
(3725, 'RHELAFEN SYR 60', 0, 0, 1, 1, 5, 1, 1),
(3726, 'RHEMAFAR 4 MG', 0, 0, 1, 1, 2, 1, 1),
(3727, 'RHINOFED', 0, 0, 1, 1, 2, 1, 1),
(3728, 'RHINOS JR SYR', 0, 0, 1, 1, 5, 1, 1),
(3729, 'RHINOS NEO DROP', 0, 0, 1, 1, 5, 1, 1),
(3730, 'RHINOS SR CAPS', 0, 0, 1, 1, 3, 1, 1),
(3731, 'RIVANOL 100 ML', 0, 0, 1, 1, 5, 1, 1),
(3732, 'RIVANOL 300 ML', 0, 0, 1, 1, 5, 1, 1),
(3733, 'ROHTO', 0, 0, 1, 1, 5, 1, 1),
(3734, 'ROHTO COOL', 0, 0, 1, 1, 5, 1, 1),
(3735, 'RYVEL SYR', 0, 0, 1, 1, 5, 1, 1),
(3736, 'SABUN ASEPSO', 0, 0, 1, 1, 11, 1, 1),
(3737, 'SABUN DETTOL', 0, 0, 1, 1, 11, 1, 1),
(3738, 'SAGESTAM CR', 0, 0, 1, 1, 4, 1, 1),
(3739, 'SAKATONIK ABC', 0, 0, 1, 1, 6, 1, 1),
(3740, 'SALBUTAMOL 2 MG', 0, 0, 1, 1, 2, 1, 1),
(3741, 'SALBUTAMOL 4 MG', 0, 0, 1, 1, 2, 1, 1),
(3742, 'SALEP 2-4', 0, 0, 1, 1, 4, 1, 1),
(3743, 'SALEP 88', 0, 0, 1, 1, 1, 1, 1),
(3744, 'SALEP BISON', 0, 0, 1, 1, 1, 1, 1),
(3745, 'SALEP 3IDA', 0, 0, 1, 1, 1, 1, 1),
(3746, 'SALEP PAGODA', 0, 0, 1, 1, 1, 1, 1),
(3747, 'SALONPAS GEL 15', 0, 0, 1, 1, 4, 1, 1),
(3748, 'SALONPAS GEL 30', 0, 0, 1, 1, 4, 1, 1),
(3749, 'SALONPAS LINIME', 0, 0, 1, 1, 5, 1, 1),
(3750, 'SALONPAS LINIME', 0, 0, 1, 1, 5, 1, 1),
(3751, 'SALYCYL TALK IK', 0, 0, 1, 1, 5, 1, 1),
(3752, 'SALYCYL TALK IK', 0, 0, 1, 1, 5, 1, 1),
(3753, 'SALYSIL KF', 0, 0, 1, 1, 6, 1, 1),
(3754, 'SAMURAT 4\'', 0, 0, 1, 1, 9, 1, 1),
(3755, 'SANADRYL DMP SY', 0, 0, 1, 1, 5, 1, 1),
(3756, 'SANADRYL DMP SY', 0, 0, 1, 1, 5, 1, 1),
(3757, 'SANADRYL EXP SY', 0, 0, 1, 1, 5, 1, 1),
(3758, 'SANADRYL EXP SY', 0, 0, 1, 1, 5, 1, 1),
(3759, 'SANAFLU 2', 0, 0, 1, 1, 9, 1, 1),
(3760, 'SAN-B-PLEX', 0, 0, 1, 1, 5, 1, 1),
(3761, 'SANCORTMYCIN OI', 0, 0, 1, 1, 4, 1, 1),
(3762, 'SANGOBION CAPS', 0, 0, 1, 1, 9, 1, 1),
(3763, 'SANGOBION DROPS', 0, 0, 1, 1, 5, 1, 1),
(3764, 'SANGOBION KIDS ', 0, 0, 1, 1, 5, 1, 1),
(3765, 'SANGOBION VITAT', 0, 0, 1, 1, 5, 1, 1),
(3766, 'SANGOBION VITAT', 0, 0, 1, 1, 5, 1, 1),
(3767, 'SANMAG SYR', 0, 0, 1, 1, 5, 1, 1),
(3768, 'SANMOL DROPS', 0, 0, 1, 1, 5, 1, 1),
(3769, 'SANMOL FORTE SY', 0, 0, 1, 1, 5, 1, 1),
(3770, 'SANMOL FORTE 2', 0, 0, 1, 1, 2, 1, 1),
(3771, 'SANMOL SYR', 0, 0, 1, 1, 5, 1, 1),
(3772, 'SANMOL 2', 0, 0, 1, 1, 2, 1, 1),
(3773, 'SANORINE HIJAU ', 0, 0, 1, 1, 5, 1, 1),
(3774, 'SANPRIMA FORTE ', 0, 0, 1, 1, 2, 1, 1),
(3775, 'SANPRIMA SYR', 0, 0, 1, 1, 5, 1, 1),
(3776, 'SANPRIMA 2', 0, 0, 1, 1, 2, 1, 1),
(3777, 'SARI KURMA AL J', 0, 0, 1, 1, 5, 1, 1),
(3778, 'SARI KURMA ANGK', 0, 0, 1, 1, 5, 1, 1),
(3779, 'SARI KURMA PREM', 0, 0, 1, 1, 5, 1, 1),
(3780, 'SARI KURMA TJ 2', 0, 0, 1, 1, 5, 1, 1),
(3781, 'SARIDON 2', 0, 0, 1, 1, 9, 1, 1),
(3782, 'SARUNG TANGAN 2', 0, 0, 1, 1, 13, 1, 1),
(3783, 'SARUNG TANGAN 8', 0, 0, 1, 1, 8, 1, 1),
(3784, 'SARUNG TANGAN P', 0, 0, 1, 1, 13, 1, 1),
(3785, 'SCABIMITE CR 10', 0, 0, 1, 1, 4, 1, 1),
(3786, 'SCABIMITE CR 30', 0, 0, 1, 1, 4, 1, 1),
(3787, 'SCANDEXON 2', 0, 0, 1, 1, 2, 1, 1),
(3788, 'SCOPMA PLUS 2', 0, 0, 1, 1, 2, 1, 1),
(3789, 'SCOPMA 2', 0, 0, 1, 1, 2, 1, 1),
(3790, 'SCOTT ORIGINAL', 0, 0, 1, 1, 5, 1, 1),
(3791, 'SCOTT VITA 200 ', 0, 0, 1, 1, 5, 1, 1),
(3792, 'SCOTT VITA 400 ', 0, 0, 1, 1, 5, 1, 1),
(3793, 'SELANG OKSIGEN ', 0, 0, 1, 1, 1, 1, 1),
(3794, 'SELANG OKSIGEN ', 0, 0, 1, 1, 1, 1, 1),
(3795, 'SENSITIF', 0, 0, 1, 1, 1, 1, 1),
(3796, 'SENSITIF COMPC', 0, 0, 1, 1, 1, 1, 1),
(3797, 'SERETIDE DISKUS', 0, 0, 1, 1, 6, 1, 1),
(3798, 'SGM 0-6 BULAN 1', 0, 0, 1, 1, 8, 1, 1),
(3799, 'SGM 1+ VANILA 9', 0, 0, 1, 1, 1, 1, 1),
(3800, 'SGM 3+ VANILA 9', 0, 0, 1, 1, 1, 1, 1),
(3801, 'SGM 6-12 BULAN ', 0, 0, 1, 1, 8, 1, 1),
(3802, 'SIKAT PEMBERSIH', 0, 0, 1, 1, 1, 1, 1),
(3803, 'SILADEX ATT 60 ', 0, 0, 1, 1, 5, 1, 1),
(3804, 'SILADEX BATUK P', 0, 0, 1, 1, 5, 1, 1),
(3805, 'SILADEX ME 60 M', 0, 0, 1, 1, 5, 1, 1),
(3806, 'SILEX SYR', 0, 0, 1, 1, 5, 1, 1),
(3807, 'SIMARC 2 MG 2', 0, 0, 1, 1, 2, 1, 1),
(3808, 'SIMVASTATIN 10 ', 0, 0, 1, 1, 2, 1, 1),
(3809, 'SIMVASTATIN 20 ', 0, 0, 1, 1, 2, 1, 1),
(3810, 'SIRPLUS 100 ML', 0, 0, 1, 1, 5, 1, 1),
(3811, 'SKIZON CR 10 GR', 0, 0, 1, 1, 4, 1, 1),
(3812, 'SKYGOAT SUSU KA', 0, 0, 1, 1, 8, 1, 1),
(3813, 'SMECTA', 0, 0, 1, 1, 7, 1, 1),
(3814, 'SOFTEX PEMBALUT', 0, 0, 1, 1, 10, 1, 1),
(3815, 'SP. THROCES 2', 0, 0, 1, 1, 9, 1, 1),
(3816, 'SPASMINAL 2', 0, 0, 1, 1, 2, 1, 1),
(3817, 'SPEDIFEN 400', 0, 0, 1, 1, 2, 1, 1),
(3818, 'SPIROLA 2 25 MG', 0, 0, 1, 1, 2, 1, 1),
(3819, 'SPIRONOLACTONE ', 0, 0, 1, 1, 2, 1, 1),
(3820, 'STANZA 500 MG', 0, 0, 1, 1, 2, 1, 1),
(3821, 'STIMUNO 3', 0, 0, 1, 1, 9, 1, 1),
(3822, 'STIMUNO SYR 100', 0, 0, 1, 1, 5, 1, 1),
(3823, 'STIMUNO SYR 60 ', 0, 0, 1, 1, 5, 1, 1),
(3824, 'STMJ', 0, 0, 1, 1, 7, 1, 1),
(3825, 'STOP COLD', 0, 0, 1, 1, 9, 1, 1),
(3826, 'STOP X', 0, 0, 1, 1, 4, 1, 1),
(3827, 'STREPSIL 6\'', 0, 0, 1, 1, 7, 1, 1),
(3828, 'STREPSIL 8\'', 0, 0, 1, 1, 7, 1, 1),
(3829, 'STUGERON', 0, 0, 1, 1, 2, 1, 1),
(3830, 'SUCRALFATE 100 ', 0, 0, 1, 1, 5, 1, 1),
(3831, 'SUKAMORI', 0, 0, 1, 1, 8, 1, 1),
(3832, 'SUMAGESIC', 0, 0, 1, 1, 2, 1, 1),
(3833, 'SUNCREAM', 0, 0, 1, 1, 5, 1, 1),
(3834, 'SUPER TETRA', 0, 0, 1, 1, 3, 1, 1),
(3835, 'SUPERHOID SUPP', 0, 0, 1, 1, 1, 1, 1),
(3836, 'SURBEX T 2', 0, 0, 1, 1, 9, 1, 1),
(3837, 'SURBEX Z 2', 0, 0, 1, 1, 9, 1, 1),
(3838, 'SUSU BERUANG K', 0, 0, 1, 1, 6, 1, 1),
(3839, 'SYNALTEN CR', 0, 0, 1, 1, 4, 1, 1),
(3840, '2UNG OKSIGEN', 0, 0, 1, 1, 14, 1, 1),
(3841, 'TAHESTA CUKA', 0, 0, 1, 1, 5, 1, 1),
(3842, 'TAY PIN SAN', 0, 0, 1, 1, 7, 1, 1),
(3843, 'TEH ANGKAK', 0, 0, 1, 1, 8, 1, 1),
(3844, 'TEH DAUN JATI C', 0, 0, 1, 1, 7, 1, 1),
(3845, 'TELOR KODOK', 0, 0, 1, 1, 7, 1, 1),
(3846, 'TEMPRA DROPS', 0, 0, 1, 1, 5, 1, 1),
(3847, 'TEMPRA FORTE 60', 0, 0, 1, 1, 5, 1, 1),
(3848, 'TEMPRA SYR 100 ', 0, 0, 1, 1, 5, 1, 1),
(3849, 'TEMPRA SYR 30 M', 0, 0, 1, 1, 5, 1, 1),
(3850, 'TEMPRA SYR 60 M', 0, 0, 1, 1, 5, 1, 1),
(3851, 'TENSIVASK 2', 0, 0, 1, 1, 2, 1, 1),
(3852, 'TENSOCREPE K', 0, 0, 1, 1, 1, 1, 1),
(3853, 'TENSOCREPE S', 0, 0, 1, 1, 1, 1, 1),
(3854, 'TEOSAL 2', 0, 0, 1, 1, 2, 1, 1),
(3855, 'TERA F', 0, 0, 1, 1, 2, 1, 1),
(3856, 'TERMOREX PLUS 6', 0, 0, 1, 1, 5, 1, 1),
(3857, 'TERMOREX SYR', 0, 0, 1, 1, 5, 1, 1),
(3858, 'TETRACYCLIN 250', 0, 0, 1, 1, 3, 1, 1),
(3859, 'THECORT CR', 0, 0, 1, 1, 4, 1, 1),
(3860, 'THERAGRAN M', 0, 0, 1, 1, 2, 1, 1),
(3861, 'THERMOMETER DIG', 0, 0, 1, 1, 1, 1, 1),
(3862, 'THERMOMETER SAF', 0, 0, 1, 1, 1, 1, 1),
(3863, 'THIAMPHENICOL 5', 0, 0, 1, 1, 3, 1, 1),
(3864, 'THIAMYCIN 500 M', 0, 0, 1, 1, 3, 1, 1),
(3865, 'THYROZOL 10 MG', 0, 0, 1, 1, 2, 1, 1),
(3866, 'TIE TA YOU GIN', 0, 0, 1, 1, 5, 1, 1),
(3867, 'TIRIZ DROPS', 0, 0, 1, 1, 5, 1, 1),
(3868, 'TIRIZ 2', 0, 0, 1, 1, 2, 1, 1),
(3869, 'TISSUE 250 PLY', 0, 0, 1, 1, 10, 1, 1),
(3870, 'TISSUE 50 PLY', 0, 0, 1, 1, 10, 1, 1),
(3871, 'TISSUE BASAH', 0, 0, 1, 1, 10, 1, 1),
(3872, 'TISSUE MAGIC', 0, 0, 1, 1, 8, 1, 1),
(3873, 'TOLAK ANGIN BEB', 0, 0, 1, 1, 7, 1, 1),
(3874, 'TOLAK ANGIN CAI', 0, 0, 1, 1, 7, 1, 1),
(3875, 'TOLAK ANGIN CAI', 0, 0, 1, 1, 7, 1, 1),
(3876, 'TOLAK ANGIN FLU', 0, 0, 1, 1, 7, 1, 1),
(3877, 'TOLAK ANGIN PER', 0, 0, 1, 1, 7, 1, 1),
(3878, 'TOLAK LINU CAIR', 0, 0, 1, 1, 7, 1, 1),
(3879, 'TONG KANG SHUAN', 0, 0, 1, 1, 4, 1, 1),
(3880, 'TONIKUM BAYER 1', 0, 0, 1, 1, 5, 1, 1),
(3881, 'TONIKUM BAYER 3', 0, 0, 1, 1, 5, 1, 1),
(3882, 'TOPCORT', 0, 0, 1, 1, 4, 1, 1),
(3883, 'TRANSPULMIN BAB', 0, 0, 1, 1, 4, 1, 1),
(3884, 'TRANSPULMIN BAB', 0, 0, 1, 1, 4, 1, 1),
(3885, 'TRANSPULMIN KID', 0, 0, 1, 1, 4, 1, 1),
(3886, 'TRANSPULMIN KID', 0, 0, 1, 1, 4, 1, 1),
(3887, 'TREMENZA SYR', 0, 0, 1, 1, 5, 1, 1),
(3888, 'TREMENZA 2', 0, 0, 1, 1, 2, 1, 1),
(3889, 'TRIAMINIC BATUK', 0, 0, 1, 1, 5, 1, 1),
(3890, 'TRIAMINIC EXP S', 0, 0, 1, 1, 5, 1, 1),
(3891, 'TRIAMINIC PILEK', 0, 0, 1, 1, 5, 1, 1),
(3892, 'TRICHODAZOL 500', 0, 0, 1, 1, 2, 1, 1),
(3893, 'TRINORDIOL', 0, 0, 1, 1, 9, 1, 1),
(3894, 'TRISELA', 0, 0, 1, 1, 2, 1, 1),
(3895, 'TROMBOPHOB GEL', 0, 0, 1, 1, 4, 1, 1),
(3896, 'TROMBOPHOB OINT', 0, 0, 1, 1, 4, 1, 1),
(3897, 'TROPICANA SLIM ', 0, 0, 1, 1, 8, 1, 1),
(3898, 'TROPICANA SLIM ', 0, 0, 1, 1, 8, 1, 1),
(3899, 'TUZALOS', 0, 0, 1, 1, 2, 1, 1),
(3900, 'ULTILOX FORTE S', 0, 0, 1, 1, 5, 1, 1),
(3901, 'ULTILOX SYR', 0, 0, 1, 1, 5, 1, 1),
(3902, 'ULTRACAP', 0, 0, 1, 1, 9, 1, 1),
(3903, 'ULTRACILIN SALE', 0, 0, 1, 1, 4, 1, 1),
(3904, 'ULTRAFIX 5 CM X', 0, 0, 1, 1, 8, 1, 1),
(3905, 'ULTRAFLU', 0, 0, 1, 1, 9, 1, 1),
(3906, 'ULTRAMILK COKLA', 0, 0, 1, 1, 1, 1, 1),
(3907, 'ULTRAMILK FULLC', 0, 0, 1, 1, 1, 1, 1),
(3908, 'ULTRAMILK KARAM', 0, 0, 1, 1, 1, 1, 1),
(3909, 'ULTRAMILK MIMI ', 0, 0, 1, 1, 1, 1, 1),
(3910, 'ULTRAMILK MIMI ', 0, 0, 1, 1, 1, 1, 1),
(3911, 'ULTRAMILK MIMI ', 0, 0, 1, 1, 1, 1, 1),
(3912, 'ULTRAMILK MIMI ', 0, 0, 1, 1, 1, 1, 1),
(3913, 'ULTRAMILK STRAW', 0, 0, 1, 1, 1, 1, 1),
(3914, 'ULTRAMILK TARO ', 0, 0, 1, 1, 1, 1, 1),
(3915, 'ULTRAPROCT OINT', 0, 0, 1, 1, 4, 1, 1),
(3916, 'ULTRAPROCT SUPP', 0, 0, 1, 1, 1, 1, 1),
(3917, 'ULTRAVITA', 0, 0, 1, 1, 2, 1, 1),
(3918, 'UNDER PADS', 0, 0, 1, 1, 1, 1, 1),
(3919, 'UPIXON 15 CC', 0, 0, 1, 1, 5, 1, 1),
(3920, 'URESIK 2', 0, 0, 1, 1, 2, 1, 1),
(3921, 'URINAL PRIA', 0, 0, 1, 1, 1, 1, 1),
(3922, 'URINAL WANITA', 0, 0, 1, 1, 1, 1, 1),
(3923, 'URISPAS 2', 0, 0, 1, 1, 2, 1, 1),
(3924, 'UROGETIX 100 MG', 0, 0, 1, 1, 2, 1, 1),
(3925, 'UROTRACTIN', 0, 0, 1, 1, 3, 1, 1),
(3926, 'VAGISTIN OVULA', 0, 0, 1, 1, 1, 1, 1),
(3927, 'VALSARTAN 80 MG', 0, 0, 1, 1, 2, 1, 1),
(3928, 'VECTRINE CAP', 0, 0, 1, 1, 3, 1, 1),
(3929, 'VECTRINE SYR', 0, 0, 1, 1, 5, 1, 1),
(3930, 'VEGETA', 0, 0, 1, 1, 7, 1, 1),
(3931, 'VEGETA HERBAL', 0, 0, 1, 1, 7, 1, 1),
(3932, 'VENARON', 0, 0, 1, 1, 3, 1, 1),
(3933, 'VENTOLIN 2 MG', 0, 0, 1, 1, 2, 1, 1),
(3934, 'VENTOLIN INH', 0, 0, 1, 1, 6, 1, 1),
(3935, 'VENTOLIN NEBULE', 0, 0, 1, 1, 12, 1, 1),
(3936, 'VERILE ACNE BLE', 0, 0, 1, 1, 4, 1, 1),
(3937, 'VERILE ACNE GEL', 0, 0, 1, 1, 4, 1, 1),
(3938, 'VERMIN \' 30 (15', 0, 0, 1, 1, 6, 1, 1),
(3939, 'VERMIN \'12 (15 ', 0, 0, 1, 1, 6, 1, 1),
(3940, 'VERMOX 500 MG', 0, 0, 1, 1, 9, 1, 1),
(3941, 'VESPERUM SIRUP', 0, 0, 1, 1, 5, 1, 1),
(3942, 'VICE 2 \'2', 0, 0, 1, 1, 9, 1, 1),
(3943, 'VICKS F 44 120 ', 0, 0, 1, 1, 5, 1, 1),
(3944, 'VICKS F 44 30 M', 0, 0, 1, 1, 5, 1, 1),
(3945, 'VICKS F 44 30 M', 0, 0, 1, 1, 5, 1, 1),
(3946, 'VICKS F 44 60 M', 0, 0, 1, 1, 5, 1, 1),
(3947, 'VICKS F 44 60 M', 0, 0, 1, 1, 5, 1, 1),
(3948, 'VICKS INHALER', 0, 0, 1, 1, 1, 1, 1),
(3949, 'VICKS VAP. 10 G', 0, 0, 1, 1, 6, 1, 1),
(3950, 'VICKS VAP. 25 G', 0, 0, 1, 1, 4, 1, 1),
(3951, 'VICKS VAP. 50 G', 0, 0, 1, 1, 6, 1, 1),
(3952, 'VIDORAN UHT MIL', 0, 0, 1, 1, 1, 1, 1),
(3953, 'VIDORAN UHT MIL', 0, 0, 1, 1, 1, 1, 1),
(3954, 'VIGEL 60 GR', 0, 0, 1, 1, 4, 1, 1),
(3955, 'VIRGIN OIL 80ML', 0, 0, 1, 1, 5, 1, 1),
(3956, 'VISANCORT CR 10', 0, 0, 1, 1, 4, 1, 1),
(3957, 'VISINE 6 ML', 0, 0, 1, 1, 6, 1, 1),
(3958, 'VIT A IPI', 0, 0, 1, 1, 6, 1, 1),
(3959, 'VIT B COMP IPI', 0, 0, 1, 1, 6, 1, 1),
(3960, 'VIT B1 IPI', 0, 0, 1, 1, 6, 1, 1),
(3961, 'VIT B12 IPI', 0, 0, 1, 1, 6, 1, 1),
(3962, 'VIT B6 / PYRIDO', 0, 0, 1, 1, 2, 1, 1),
(3963, 'VIT C IPI', 0, 0, 1, 1, 6, 1, 1),
(3964, 'VIT D3 IPI 1000', 0, 0, 1, 1, 6, 1, 1),
(3965, 'VIT K', 0, 0, 1, 1, 2, 1, 1),
(3966, 'VIT. C 1000 SID', 0, 0, 1, 1, 8, 1, 1),
(3967, 'VITACID 0.025% ', 0, 0, 1, 1, 4, 1, 1),
(3968, 'VITACID 0.05% C', 0, 0, 1, 1, 4, 1, 1),
(3969, 'VITACID 0.1% CR', 0, 0, 1, 1, 4, 1, 1),
(3970, 'VITACIMIN 9', 0, 0, 1, 1, 9, 1, 1),
(3971, 'VITAL AD', 0, 0, 1, 1, 6, 1, 1),
(3972, 'VITALONG C BOTO', 0, 0, 1, 1, 6, 1, 1),
(3973, 'VITALONG C 9', 0, 0, 1, 1, 9, 1, 1),
(3974, 'VITAQUIN CR', 0, 0, 1, 1, 4, 1, 1),
(3975, 'VITOMATA MADU', 0, 0, 1, 1, 5, 1, 1),
(3976, 'VOLTADEX 50 MG ', 0, 0, 1, 1, 2, 1, 1),
(3977, 'VOLTAREN 25 MG ', 0, 0, 1, 1, 2, 1, 1),
(3978, 'VOLTAREN 50 MG ', 0, 0, 1, 1, 2, 1, 1),
(3979, 'VOLTAREN GEL  5', 0, 0, 1, 1, 4, 1, 1),
(3980, 'VOLTAREN GEL 10', 0, 0, 1, 1, 4, 1, 1),
(3981, 'VOLTAREN GEL 20', 0, 0, 1, 1, 4, 1, 1),
(3982, 'VOLTAREN GEL 50', 0, 0, 1, 1, 4, 1, 1),
(3983, 'VOMETA DROPS', 0, 0, 1, 1, 5, 1, 1),
(3984, 'VOMETA FLASH 2', 0, 0, 1, 1, 2, 1, 1),
(3985, 'VOMETA SYR 60 M', 0, 0, 1, 1, 5, 1, 1),
(3986, 'VOMITAS FDT', 0, 0, 1, 1, 2, 1, 1),
(3987, 'VOSEA SYR', 0, 0, 1, 1, 5, 1, 1),
(3988, 'VOSEA 2', 0, 0, 1, 1, 2, 1, 1),
(3989, 'W W Z', 0, 0, 1, 1, 1, 1, 1),
(3990, 'WAISAN', 0, 0, 1, 1, 7, 1, 1),
(3991, 'WALIKUKUN 30ML', 0, 0, 1, 1, 5, 1, 1),
(3992, 'WALIKUKUN 60ML', 0, 0, 1, 1, 5, 1, 1),
(3993, 'WELLMOVE CAPS 5', 0, 0, 1, 1, 9, 1, 1),
(3994, 'WIROS 20 MG', 0, 0, 1, 1, 2, 1, 1),
(3995, 'WOODS ATT 100ML', 0, 0, 1, 1, 5, 1, 1),
(3996, 'WOODS ATT 60 ML', 0, 0, 1, 1, 5, 1, 1),
(3997, 'WOODS EXP 100ML', 0, 0, 1, 1, 5, 1, 1),
(3998, 'WOODS EXP 60 ML', 0, 0, 1, 1, 5, 1, 1),
(3999, 'WOODS HERBAL', 0, 0, 1, 1, 5, 1, 1),
(4000, 'WOODS LOZENGES ', 0, 0, 1, 1, 7, 1, 1),
(4001, 'XEPAZYM', 0, 0, 1, 1, 9, 1, 1),
(4002, 'XONCE', 0, 0, 1, 1, 9, 1, 1),
(4003, 'YASMIN', 0, 0, 1, 1, 8, 1, 1),
(4004, 'YOU C1000', 0, 0, 1, 1, 5, 1, 1),
(4005, 'Y-RINS K', 0, 0, 1, 1, 6, 1, 1),
(4006, 'YUSIMOX 500 MG ', 0, 0, 1, 1, 2, 1, 1),
(4007, 'YUSIMOX FORTE S', 0, 0, 1, 1, 5, 1, 1),
(4008, 'YUSIMOX SYR', 0, 0, 1, 1, 5, 1, 1),
(4009, 'ZAITUN MUSTIKA ', 0, 0, 1, 1, 5, 1, 1),
(4010, 'ZAITUN TURSINA ', 0, 0, 1, 1, 5, 1, 1),
(4011, 'ZAM-BUK OINT 25', 0, 0, 1, 1, 6, 1, 1),
(4012, 'ZAM-BUK OINT 8 ', 0, 0, 1, 1, 6, 1, 1),
(4013, 'ZEGAVIT', 0, 0, 1, 1, 2, 1, 1),
(4014, 'ZEGREN 2 50MG', 0, 0, 1, 1, 2, 1, 1),
(4015, 'ZENIREX 60 ML', 0, 0, 1, 1, 5, 1, 1),
(4016, 'ZENSODERM 10 GR', 0, 0, 1, 1, 4, 1, 1),
(4017, 'ZESTMAG MADU', 0, 0, 1, 1, 5, 1, 1),
(4018, 'ZINC 2', 0, 0, 1, 1, 2, 1, 1),
(4019, 'ZINCPRO SYR 60M', 0, 0, 1, 1, 5, 1, 1),
(4020, 'ZINK SIRUP 60 M', 0, 0, 1, 1, 5, 1, 1),
(4021, 'ZINKID SYR 100 ', 0, 0, 1, 1, 5, 1, 1),
(4022, 'ZYLORIC 100', 0, 0, 1, 1, 2, 1, 1),
(4023, 'ZYLORIC 300', 0, 0, 1, 1, 2, 1, 1),
(4024, 'HOT IN DCL 120 ', 0, 0, 1, 1, 4, 1, 1),
(4025, 'BURNAZIN CR', 0, 0, 1, 1, 4, 1, 1),
(4026, 'HOT IN CR BOTOL', 0, 0, 1, 1, 5, 1, 1),
(4027, 'OBAT BATUK IBU ', 0, 0, 1, 1, 5, 1, 1),
(4028, 'DIPROGENTA CR 1', 0, 0, 1, 1, 4, 1, 1),
(4029, 'REDOXON FORTIMU', 0, 0, 1, 1, 6, 1, 1),
(4030, 'SENSODYNE BIRU', 0, 0, 1, 1, 4, 1, 1),
(4031, 'SELSUN BLUE 60 ', 0, 0, 1, 1, 5, 1, 1),
(4032, 'VITALONG C + ZI', 0, 0, 1, 1, 6, 1, 1),
(4033, 'HOT IN CR GO 10', 0, 0, 1, 1, 5, 1, 1),
(4034, 'IMUNOS 2', 0, 0, 1, 1, 2, 1, 1),
(4035, 'PARASOL LOT SPF', 0, 0, 1, 1, 5, 1, 1),
(4036, 'INSTO DRY EYES', 0, 0, 1, 1, 6, 1, 1),
(4037, 'INSTO COOL', 0, 0, 1, 1, 6, 1, 1),
(4038, 'MADU TJ PANAS D', 0, 0, 1, 1, 5, 1, 1),
(4039, 'MADU KURMA TJ 1', 0, 0, 1, 1, 5, 1, 1),
(4040, 'MEDICATED OIL', 0, 0, 1, 1, 5, 1, 1),
(4041, 'DRAGON MENTHOL', 0, 0, 1, 1, 6, 1, 1),
(4042, 'M. TELON MY BAB', 0, 0, 1, 1, 5, 1, 1),
(4043, 'GENALTEN CR 5 G', 0, 0, 1, 1, 4, 1, 1),
(4044, 'VIT. C 50 MG 9', 0, 0, 1, 1, 2, 1, 1),
(4045, 'HABBATUSSAUDA O', 0, 0, 1, 1, 6, 1, 1),
(4046, 'DERMAFIX T 5 X ', 0, 0, 1, 1, 1, 1, 1),
(4047, 'DERMAFIX T 10 X', 0, 0, 1, 1, 1, 1, 1),
(4048, 'DERMAFIX T 10 X', 0, 0, 1, 1, 1, 1, 1),
(4049, 'TRISELA SIRUP', 0, 0, 1, 1, 5, 1, 1),
(4050, 'VIGEL 30 GR', 0, 0, 1, 1, 4, 1, 1),
(4051, 'BREATHY NASAL S', 0, 0, 1, 1, 6, 1, 1),
(4052, 'NEURALGIN RHEMA', 0, 0, 1, 1, 2, 1, 1),
(4053, 'MADU HITAM BIMA', 0, 0, 1, 1, 5, 1, 1),
(4054, 'MADU JADIED', 0, 0, 1, 1, 5, 1, 1),
(4055, 'MADU MAGO', 0, 0, 1, 1, 5, 1, 1),
(4056, 'INNOLIFE VERPLU', 0, 0, 1, 1, 5, 1, 1),
(4057, 'INNOLIFE VERPLU', 0, 0, 1, 1, 5, 1, 1),
(4058, 'GOLD G GAMAT', 0, 0, 1, 1, 5, 1, 1),
(4059, 'REFAQUIN CR 15 ', 0, 0, 1, 1, 4, 1, 1),
(4060, 'CESSA BIRU', 0, 0, 1, 1, 6, 1, 1),
(4061, 'ZORALIN CR 10 G', 0, 0, 1, 1, 4, 1, 1),
(4062, 'MADU TJ HITAM', 0, 0, 1, 1, 5, 1, 1),
(4063, 'HAU FUNG SAN', 0, 0, 1, 1, 5, 1, 1),
(4064, 'VIT E IPI', 0, 0, 1, 1, 6, 1, 1),
(4065, 'RINGER LAKTAT (', 0, 0, 1, 1, 5, 1, 1),
(4066, 'MINIASPI 80 MG', 0, 0, 1, 1, 2, 1, 1),
(4067, 'NUTRIMAX BILBER', 0, 0, 1, 1, 6, 1, 1),
(4068, 'DREAM Z', 0, 0, 1, 1, 6, 1, 1),
(4069, 'NUTRIMAX CMAX 3', 0, 0, 1, 1, 15, 1, 1),
(4070, 'NUTRIMAX COMPLE', 0, 0, 1, 1, 6, 1, 1),
(4071, 'MINOSEP GARGLE ', 0, 0, 1, 1, 5, 1, 1),
(4072, 'JARUM INSULIN', 0, 0, 1, 1, 1, 1, 1),
(4073, 'PTU', 0, 0, 1, 1, 2, 1, 1),
(4074, 'VI2UMIN 130 ML', 0, 0, 1, 1, 5, 1, 1),
(4075, 'SABUN PEPAYA', 0, 0, 1, 1, 11, 1, 1),
(4076, 'ADMINISTRASI KL', 0, 0, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `jenis`
--

CREATE TABLE `jenis` (
  `id_jenis` int(11) NOT NULL,
  `nama` varchar(15) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jenis`
--

INSERT INTO `jenis` (`id_jenis`, `nama`, `status`) VALUES
(1, 'UMUM', 1),
(2, 'KERAS', 1);

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

--
-- Dumping data for table `kota`
--

INSERT INTO `kota` (`id_kota`, `nama_kota`, `kode_kota`, `status`) VALUES
(1, 'KAB. BOGOR', 'CBI', 1),
(2, 'KAB. SUKABUMI', 'SBM', 1),
(3, 'KAB. CIANJUR', 'CJR', 1),
(4, 'KAB. BANDUNG', 'SOR', 1),
(5, 'KAB. GARUT', 'GRT', 1),
(6, 'KAB. TASIKMALAY', 'SPA', 1),
(7, 'KAB. CIAMIS', 'CMS', 1),
(8, 'KAB. KUNINGAN', 'KNG', 1),
(9, 'KAB. CIREBON', 'SBR', 1),
(10, 'KAB. MAJALENGKA', 'MJL', 1),
(11, 'KAB. SUMEDANG', 'SMD', 1),
(12, 'KAB. INDRAMAYU', 'IDM', 1),
(13, 'KAB. SUBANG', 'SNG', 1),
(14, 'KAB. PURWAKARTA', 'PWK', 1),
(15, 'KAB. KARAWANG', 'KWG', 1),
(16, 'KAB. BEKASI', 'CKR', 1),
(17, 'KAB. BANDUNG BA', 'NPH', 1),
(18, 'KAB. PANGANDARA', 'PGD', 1),
(19, 'KOTA BOGOR', 'BGR', 1),
(20, 'KOTA SUKABUMI', 'SKB', 1),
(21, 'KOTA BANDUNG', 'BDG', 1),
(22, 'KOTA CIREBON', 'CBN', 1),
(23, 'KOTA BEKASI', 'BKS', 1),
(24, 'KOTA DEPOK', 'DPK', 1),
(25, 'KOTA CIMAHI', 'CMH', 1),
(26, 'KOTA TASIKMALAY', 'TSM', 1),
(27, 'KOTA BANJAR', 'BJR', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rak`
--

CREATE TABLE `rak` (
  `id_rak` int(11) NOT NULL,
  `nama_rak` varchar(15) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rak`
--

INSERT INTO `rak` (`id_rak`, `nama_rak`, `status`) VALUES
(1, 'R1', 1),
(2, 'R2', 1),
(3, 'R3', 1),
(4, 'R4', 1),
(5, 'R5', 1),
(6, 'R6', 1),
(7, 'R7', 1),
(8, 'R8', 1),
(9, 'R9', 1),
(10, 'B1', 1),
(11, 'B2', 1),
(12, 'B3', 1),
(13, 'B4', 1),
(14, 'B5', 1);

-- --------------------------------------------------------

--
-- Table structure for table `satuan`
--

CREATE TABLE `satuan` (
  `id_satuan` int(11) NOT NULL,
  `nama` varchar(15) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `satuan`
--

INSERT INTO `satuan` (`id_satuan`, `nama`, `status`) VALUES
(1, 'PCS', 1),
(2, 'TABLET', 1),
(3, 'KAPSUL', 1),
(4, 'TUBE', 1),
(5, 'BOTOL', 1),
(6, 'FLS', 1),
(7, 'SACH', 1),
(8, 'BOX', 1),
(9, 'STRIP', 1),
(10, 'PAK', 1),
(11, 'BAR', 1),
(12, 'AMPL', 1),
(13, 'PSG', 1),
(14, 'TABUNG', 1),
(15, 'DUS', 1);

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

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id_supplier`, `kode_supplier`, `nama_supplier`, `alamat`, `id_kota`, `no_hp`, `status`) VALUES
(1, 'ALD', 'ALIDA', 'Jalan Sukaasih', 21, 813090909, 1);

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_pembelian`
--

CREATE TABLE `transaksi_pembelian` (
  `no_faktur` varchar(50) NOT NULL,
  `tanggal` date NOT NULL,
  `margin` float NOT NULL,
  `idUser` int(11) NOT NULL,
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
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_stok_opname`
--

CREATE TABLE `transaksi_stok_opname` (
  `no_opname` varchar(50) NOT NULL,
  `tanggal` date NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `role` varchar(10) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `salt` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`idUser`, `username`, `password`, `role`, `status`, `salt`) VALUES
(1, 'budi123', 'budi123', 'pemilik', 1, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_transaksi_pembelian`
--
ALTER TABLE `detail_transaksi_pembelian`
  ADD PRIMARY KEY (`no_detail_pembelian`),
  ADD KEY `fk_detail_no_faktur` (`no_faktur`);

--
-- Indexes for table `detail_transaksi_penjualan`
--
ALTER TABLE `detail_transaksi_penjualan`
  ADD PRIMARY KEY (`no_detail_penjualan`),
  ADD KEY `fk_detail_transaksi_penjualan` (`no_transaksi`);

--
-- Indexes for table `detail_transaksi_stok_opname`
--
ALTER TABLE `detail_transaksi_stok_opname`
  ADD PRIMARY KEY (`no_detail_opname`),
  ADD KEY `fk_detail_no_opname` (`no_opname`);

--
-- Indexes for table `history_harga_jual`
--
ALTER TABLE `history_harga_jual`
  ADD PRIMARY KEY (`id_history`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id_item`),
  ADD KEY `fk_rak_item` (`id_rak`),
  ADD KEY `fk_satuan_item` (`id_satuan`),
  ADD KEY `fk_jenis_item` (`id_jenis_item`),
  ADD KEY `fk_supplier_item` (`id_supplier`);

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
  ADD KEY `fk_user_pembelian` (`idUser`);

--
-- Indexes for table `transaksi_penjualan`
--
ALTER TABLE `transaksi_penjualan`
  ADD PRIMARY KEY (`no_transaksi`),
  ADD KEY `fk_user_penjualan` (`idUser`);

--
-- Indexes for table `transaksi_stok_opname`
--
ALTER TABLE `transaksi_stok_opname`
  ADD PRIMARY KEY (`no_opname`),
  ADD KEY `fk_user_opname` (`idUser`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_transaksi_stok_opname`
--
ALTER TABLE `detail_transaksi_stok_opname`
  MODIFY `no_detail_opname` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `history_harga_jual`
--
ALTER TABLE `history_harga_jual`
  MODIFY `id_history` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4077;

--
-- AUTO_INCREMENT for table `jenis`
--
ALTER TABLE `jenis`
  MODIFY `id_jenis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `kota`
--
ALTER TABLE `kota`
  MODIFY `id_kota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `rak`
--
ALTER TABLE `rak`
  MODIFY `id_rak` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `satuan`
--
ALTER TABLE `satuan`
  MODIFY `id_satuan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id_supplier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_transaksi_pembelian`
--
ALTER TABLE `detail_transaksi_pembelian`
  ADD CONSTRAINT `fk_detail_no_faktur` FOREIGN KEY (`no_faktur`) REFERENCES `transaksi_pembelian` (`no_faktur`);

--
-- Constraints for table `detail_transaksi_penjualan`
--
ALTER TABLE `detail_transaksi_penjualan`
  ADD CONSTRAINT `fk_detail_transaksi_penjualan` FOREIGN KEY (`no_transaksi`) REFERENCES `transaksi_penjualan` (`no_transaksi`);

--
-- Constraints for table `detail_transaksi_stok_opname`
--
ALTER TABLE `detail_transaksi_stok_opname`
  ADD CONSTRAINT `fk_detail_no_opname` FOREIGN KEY (`no_opname`) REFERENCES `transaksi_stok_opname` (`no_opname`);

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `fk_jenis_item` FOREIGN KEY (`id_jenis_item`) REFERENCES `jenis` (`id_jenis`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rak_item` FOREIGN KEY (`id_rak`) REFERENCES `rak` (`id_rak`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_satuan_item` FOREIGN KEY (`id_satuan`) REFERENCES `satuan` (`id_satuan`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_supplier_item` FOREIGN KEY (`id_supplier`) REFERENCES `supplier` (`id_supplier`) ON UPDATE CASCADE;

--
-- Constraints for table `supplier`
--
ALTER TABLE `supplier`
  ADD CONSTRAINT `fk_kota_supplier` FOREIGN KEY (`id_kota`) REFERENCES `kota` (`id_kota`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaksi_pembelian`
--
ALTER TABLE `transaksi_pembelian`
  ADD CONSTRAINT `fk_supplier_pembelian` FOREIGN KEY (`id_supplier`) REFERENCES `user` (`idUser`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_pembelian` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON UPDATE NO ACTION;

--
-- Constraints for table `transaksi_penjualan`
--
ALTER TABLE `transaksi_penjualan`
  ADD CONSTRAINT `fk_user_penjualan` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `transaksi_stok_opname`
--
ALTER TABLE `transaksi_stok_opname`
  ADD CONSTRAINT `fk_user_opname` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
