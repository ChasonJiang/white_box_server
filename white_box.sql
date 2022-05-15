-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: white_box
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `uid` varchar(20) NOT NULL,
  `pwd` varchar(128) NOT NULL,
  `token` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `buygame`
--

DROP TABLE IF EXISTS `buygame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buygame` (
  `uid` varchar(50) NOT NULL,
  `gid` int NOT NULL,
  `buytime` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`,`gid`),
  KEY `keys_gid_idx` (`gid`),
  CONSTRAINT `keys_buygame_gid` FOREIGN KEY (`gid`) REFERENCES `game` (`gid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `keys_buygame_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `cid` varchar(128) NOT NULL,
  `uid` varchar(20) NOT NULL,
  `comment_content` text NOT NULL,
  `time` tinytext NOT NULL,
  PRIMARY KEY (`cid`),
  KEY `comment_fk_uid_idx` (`uid`),
  CONSTRAINT `comment_fk_uid` FOREIGN KEY (`uid`) REFERENCES `account` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comment_subcomment_map`
--

DROP TABLE IF EXISTS `comment_subcomment_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_subcomment_map` (
  `cid` varchar(128) NOT NULL,
  `sub_cid` varchar(128) NOT NULL,
  PRIMARY KEY (`cid`,`sub_cid`),
  KEY `sub_cid` (`sub_cid`),
  CONSTRAINT `comment_subcomment_map_fk_cid` FOREIGN KEY (`cid`) REFERENCES `comment` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `followgame`
--

DROP TABLE IF EXISTS `followgame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followgame` (
  `uid` varchar(50) NOT NULL,
  `gid` int NOT NULL,
  `followtime` date DEFAULT NULL,
  PRIMARY KEY (`uid`,`gid`),
  KEY `keys_gid_idx` (`gid`),
  CONSTRAINT `keys_gid` FOREIGN KEY (`gid`) REFERENCES `game` (`gid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `keYs_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `gid` int NOT NULL AUTO_INCREMENT,
  `gameName` varchar(45) DEFAULT NULL,
  `imgUrl` longtext,
  `gameType` varchar(45) DEFAULT NULL,
  `nowPrice` float DEFAULT NULL,
  `oldPrice` float DEFAULT NULL,
  `Minimum` float DEFAULT NULL,
  `imgshow` longtext,
  `gameLable` varchar(45) DEFAULT NULL,
  `Minimumprice` float DEFAULT NULL,
  `score` float DEFAULT NULL,
  `onlineNumber` float DEFAULT NULL,
  `favorableRate` float DEFAULT NULL,
  `OnlineMaxYesterday` float DEFAULT NULL,
  `averageOlnine` float DEFAULT NULL,
  `playerNumber` float DEFAULT NULL,
  `onlineTime` float DEFAULT NULL,
  `text` varchar(1000) DEFAULT NULL,
  `Issuedate` varchar(45) DEFAULT NULL,
  `Developers` varchar(45) DEFAULT NULL,
  `publisher` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`gid`),
  UNIQUE KEY `gid_UNIQUE` (`gid`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `pid` varchar(128) NOT NULL,
  `uid` varchar(20) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `post_content` longtext NOT NULL,
  `time` tinytext NOT NULL,
  `topic` json NOT NULL,
  `is_paper` tinyint(1) DEFAULT '0',
  `num_approval` int unsigned DEFAULT '0',
  `num_comment` int unsigned DEFAULT '0',
  `cover` longtext,
  PRIMARY KEY (`pid`),
  KEY `post_fk_uid_idx` (`uid`),
  CONSTRAINT `post_fk_uid` FOREIGN KEY (`uid`) REFERENCES `account` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post_comment_map`
--

DROP TABLE IF EXISTS `post_comment_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_comment_map` (
  `pid` varchar(128) NOT NULL,
  `cid` varchar(128) NOT NULL,
  PRIMARY KEY (`pid`,`cid`),
  KEY `post_comment_map_cid_idx` (`cid`),
  CONSTRAINT `post_comment_map_cid` FOREIGN KEY (`cid`) REFERENCES `comment` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_comment_map_pid` FOREIGN KEY (`pid`) REFERENCES `post` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post_topic_map`
--

DROP TABLE IF EXISTS `post_topic_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_topic_map` (
  `pid` varchar(128) NOT NULL,
  `tid` int unsigned NOT NULL,
  PRIMARY KEY (`pid`,`tid`),
  KEY `post_topic_map_fk_tid_idx` (`tid`),
  CONSTRAINT `post_topic_map_fk_pid` FOREIGN KEY (`pid`) REFERENCES `post` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_topic_map_fk_tid` FOREIGN KEY (`tid`) REFERENCES `topic` (`tid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recommendation`
--

DROP TABLE IF EXISTS `recommendation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommendation` (
  `pid` varchar(128) NOT NULL,
  `hot` int unsigned NOT NULL,
  PRIMARY KEY (`pid`),
  CONSTRAINT `recommendation_fk_pid` FOREIGN KEY (`pid`) REFERENCES `post` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sub_comment`
--

DROP TABLE IF EXISTS `sub_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_comment` (
  `sub_cid` varchar(128) NOT NULL,
  `userInfo` json NOT NULL,
  `reply_to` json NOT NULL,
  `comment_content` text NOT NULL,
  `time` tinytext NOT NULL,
  PRIMARY KEY (`sub_cid`),
  CONSTRAINT `sub_comment_fk_sub_cid` FOREIGN KEY (`sub_cid`) REFERENCES `comment_subcomment_map` (`sub_cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic` (
  `tid` int unsigned NOT NULL,
  `name` varchar(40) NOT NULL,
  `icon` longtext,
  `introduction` longtext,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `topic_follow`
--

DROP TABLE IF EXISTS `topic_follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_follow` (
  `tid` int unsigned NOT NULL,
  `uid` varchar(20) NOT NULL,
  PRIMARY KEY (`tid`,`uid`),
  KEY `topic_follow_fk_uid_idx` (`uid`),
  CONSTRAINT `topic_follow_fk_tid` FOREIGN KEY (`tid`) REFERENCES `topic` (`tid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `topic_follow_fk_uid` FOREIGN KEY (`uid`) REFERENCES `account` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `level` tinyint unsigned NOT NULL DEFAULT '0',
  `avatar` longtext NOT NULL,
  `birth_day` tinytext NOT NULL,
  `sex` char(4) NOT NULL DEFAULT '未知',
  `signature` varchar(150) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `num_fans` int unsigned NOT NULL DEFAULT '0',
  `num_follow` int unsigned NOT NULL DEFAULT '0',
  `num_collection` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`uid`),
  CONSTRAINT `user_fk_uid` FOREIGN KEY (`uid`) REFERENCES `account` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-15 23:07:29
