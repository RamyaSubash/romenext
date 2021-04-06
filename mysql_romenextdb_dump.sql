drop database if exists romenext;
create database romenext;

use romenext;

-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: romenext
-- ------------------------------------------------------
-- Server version	5.7.21-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `els_romenext_connections`
--

DROP TABLE IF EXISTS `els_romenext_connections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_connections` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `classification` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `minimum` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `end_rome_type` bigint(20) DEFAULT NULL,
  `metadata_id` bigint(20) DEFAULT NULL,
  `rome_rule` bigint(20) DEFAULT NULL,
  `start_rome_type` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`start_rome_type`) REFERENCES `els_romenext_types` (`id`),
  FOREIGN KEY (`rome_rule`) REFERENCES `els_romenext_rules` (`id`),
  FOREIGN KEY (`end_rome_type`) REFERENCES `els_romenext_types` (`id`),
  FOREIGN KEY (`metadata_id`) REFERENCES `els_romenext_metadata` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `els_romenext_decos`
--

DROP TABLE IF EXISTS `els_romenext_decos`;
CREATE TABLE `els_romenext_decos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `classification` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `friendly_name` varchar(255) DEFAULT NULL,
  `grouping` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `tagid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

LOCK TABLES `els_romenext_decos` WRITE;
/*!40000 ALTER TABLE `els_romenext_decos` DISABLE KEYS */;
INSERT INTO `els_romenext_decos` (`id`,`classification`,`created_date`,`friendly_name`,`grouping`,`modified_date`,`name`,`tagid`) VALUES 
(1,NULL,'2017-11-08 22:04:03',NULL,NULL,'2017-11-08 22:04:03','Logical',NULL),
(2,NULL,'2017-11-08 22:04:03',NULL,NULL,'2017-11-08 22:04:03','Physical',NULL),
(3,NULL,'2017-11-08 22:04:03',NULL,NULL,'2017-11-08 22:04:03','Textual',NULL),
(4,NULL,'2017-11-08 22:04:03',NULL,NULL,'2017-11-08 22:04:03','Geo',NULL),
(5,'TYPE','2017-11-08 22:07:54','Logical Design','LOGICALGROUP','2017-11-08 22:07:54','Logical',NULL),
(6,'INSTANCE','2017-11-08 22:07:54','Logical Display','LOGICALGROUP','2017-11-08 22:07:54','Logical',NULL),
(7,'TYPE','2017-11-08 22:08:21','Form Design','FORMGROUP','2017-11-08 22:08:21','FORMVIEW',NULL),
(8,'INSTANCE','2017-11-08 22:08:21','Form Display','FORMGROUP','2017-11-08 22:08:21','FORMVIEW',NULL),
(9,'TYPE','2017-11-08 22:08:41','Physical Design','PHYSICALGROUP','2017-11-08 22:08:41','Physical',NULL),
(10,'INSTANCE','2017-11-08 22:08:41','Physical Display','PHYSICALGROUP','2017-11-08 22:08:41','Physical',NULL),
(11,'INSTANCE','2017-11-08 22:09:33','Manage Hotels','HOTEL','2017-11-08 22:09:33','HOTELDECO','MANAGE_HOTEL_VIEW'),
(12,'INSTANCE','2017-11-08 22:09:33','Manage Kitchen','KITCHEN','2017-11-08 22:09:33','KITCHENDECO','MANAGE_HOTEL_VIEW'),
(13,'INSTANCE','2017-11-08 22:09:33','Manage Person','PERSON','2017-11-08 22:09:33','PERSONDECO','MANAGE_HOTEL_VIEW'),
(14,'INSTANCE','2017-11-08 22:09:33','Manage Reservation','RESERVATION','2017-11-08 22:09:33','RESERVATIONDECO','MANAGE_HOTEL_VIEW'),
(15,'INSTANCE','2017-11-08 22:10:44','Manage Walkin','WALKIN','2017-11-08 22:10:44','WALKINDECO','MANAGE_HOTEL_VIEW');
/*!40000 ALTER TABLE `els_romenext_decos` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `els_romenext_decos_properties`
--


DROP TABLE IF EXISTS `els_romenext_decos_properties`;
CREATE TABLE `els_romenext_decos_properties` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `default_value` varchar(255) DEFAULT NULL,
  `design` bit(1) DEFAULT NULL,
  `display` bit(1) DEFAULT NULL,
  `is_hidden` bit(1) DEFAULT NULL,
  `is_required` bit(1) DEFAULT NULL,
  `maximum_value` varchar(255) DEFAULT NULL,
  `minimum_value` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `must_be_unique` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `property_type` int(11) DEFAULT NULL,
  `rome_decorator` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_decorator`) REFERENCES `els_romenext_decos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

LOCK TABLES `els_romenext_decos_properties` WRITE;
/*!40000 ALTER TABLE `els_romenext_decos_properties` DISABLE KEYS */;
INSERT INTO `els_romenext_decos_properties` (`id`, `created_date`, `default_value`, `design`, `display`, `is_hidden`, `is_required`, `maximum_value`, `minimum_value`, `modified_date`, `must_be_unique`, `name`, `property_type`, `rome_decorator`) VALUES
(1, '2017-11-08 22:04:03', '0.0', b'1', b'1', b'0', b'1', 800, 0, '2017-11-08 22:04:03', b'0', 'x', 7, 5),
(2, '2017-11-08 22:04:03', '0.0', b'1', b'1', b'0', b'1', 800, 0, '2017-11-08 22:04:03', b'0', 'y', 7, 5),
(3, '2017-11-08 22:04:03', '0.0', b'1', b'1', b'0', b'1', 800, 0, '2017-11-08 22:04:03', b'0', 'z', 7, 5),
(4, '2017-11-08 22:04:03', '0.0', b'0', b'1', b'0', b'1', 800, 0, '2017-11-08 22:04:03', b'0', 'x', 7, 6),
(5, '2017-11-08 22:04:03', '0.0', b'0', b'1', b'0', b'1', 800, 0, '2017-11-08 22:04:03', b'0', 'y', 7, 6),
(6, '2017-11-08 22:04:03', 'sth', b'1', b'0', b'1', b'1', 800, 0, '2017-11-08 22:04:03', b'0', 'x', 13, 6),
(7, '2017-11-08 22:06:21', '0.0', b'1', b'1', b'0', b'1', 800, 0, '2017-11-08 22:06:21', b'0', 'x', 7, 5),
(8, '2017-11-08 22:06:21', '0.0', b'1', b'1', b'0', b'1', 800, 0, '2017-11-08 22:06:21', b'0', 'y', 7, 5),
(9, '2017-11-08 22:06:21', '0.0', b'1', b'1', b'0', b'1', 800, 0, '2017-11-08 22:06:21', b'0', 'z', 7, 5);
/*!40000 ALTER TABLE `els_romenext_decos_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `els_romenext_decos_version`
--

DROP TABLE IF EXISTS `els_romenext_decos_version`;
CREATE TABLE `els_romenext_decos_version` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `all_libraries` text,
  `button_script` text,
  `created_date` datetime DEFAULT NULL,
  `init_script` text,
  `init_version_fn` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `version_number` bigint(20) DEFAULT NULL,
  `rome_decorator` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_decorator`) REFERENCES `els_romenext_decos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

LOCK TABLES `els_romenext_decos_version` WRITE;
/*!40000 ALTER TABLE `els_romenext_decos_version` DISABLE KEYS */;
INSERT INTO `els_romenext_decos_version` (`id`, `all_libraries`, `button_script`, `created_date`, `init_script`, `init_version_fn`, `modified_date`, `name`, `version_number`, `rome_decorator`) VALUES
(1, '<script src=\'/webgui/assets/js/els/fns/design/logical/1/DesignLogicalRenderer.js\'></script><script src=\'/webgui/assets/js/els/fns/design/logical/1/DesignLogicalRendererCrud.js\'></script><script src=\'/webgui/assets/js/els/fns/design/logical/1/libs/DesignCytoscapeUtils.js\'></script><script src=\'/webgui/assets/js/els/fns/design/logical/1/old/fns-designview.js\'></script><script src=\'/webgui/assets/js/els/fns/design/logical/1/old/fns-type.js\'></script><script src=\'/webgui/assets/js/els/fns/design/logical/1/old/typegraph-view.js\'></script><script src=\'/webgui/assets/js/els/fns/design/logical/1/old/fns-rule.js\'></script><script src=\'/webgui/assets/js/els/fns/design/logical/1/old/fns-connection.js\'></script>', 'designLogicalRenderer.initView();', '2017-11-08 22:07:54', 'var designLogicalRenderer = new DesignLogicalRenderer(); designLogicalRenderer.initRenderer();', 'designLogicalRenderer.initBase', '2017-11-08 22:07:54', 'base', 1, 5),
(2, '<script src=\'/webgui/assets/js/els/fns/display/logical/1/DisplayLogicalRenderer.js\'></script><script src=\'/webgui/assets/js/els/fns/display/logical/1/DisplayLogicalRendererCrud.js\'></script><script src=\'/webgui/assets/js/els/fns/display/logical/1/libs/DisplayCytoscapeUtils.js\'></script><script src=\'/webgui/assets/js/els/fns/display/logical/1/old/graph-view.js\'></script><script src=\'/webgui/assets/js/els/fns/display/logical/1/old/node.js\'></script><script src=\'/webgui/assets/js/els/fns/display/logical/1/old/fns-edge.js\'></script><script src=\'/webgui/assets/js/els/fns/display/logical/1/old/fns-displayDrilldown-Up.js\'></script><script src=\'/webgui/assets/js/els/fns/display/logical/1/old/fns-displayview.js\'></script><script src=\'/webgui/assets/js/els/fns/display/logical/1/old/fns-node.js\'></script>', 'displayLogicalRenderer.initView();', '2017-11-08 22:07:54', 'var displayLogicalRenderer = new DisplayLogicalRenderer(); displayLogicalRenderer.initRenderer();', 'displayLogicalRenderer.initBase', '2017-11-08 22:07:54', 'base', 1, 6),
(3, '<script src=\'/webgui/assets/js/els/fns/design/formview/FormRenderer.js\'></script><script src=\'/webgui/assets/js/els/fns/design/formview/FormRendererCrud.js\'></script><script src=\'/webgui/assets/js/els/fns/design/formview/libs/FormRelationshipUtils.js\'></script><script src=\'/webgui/assets/js/els/fns/design/formview/libs/FormTypePropertyUtils.js\'></script> <script src=\'/webgui/assets/js/els/fns/design/formview/TypeHolder.js\'></script>    ', 'DesignFormRenderer.initView()', '2017-11-08 22:08:21', 'var DesignFormRenderer = new FormRenderer(); DesignFormRenderer.initRenderer();', 'DesignFormRenderer.initBase', '2017-11-08 22:08:21', 'base', 1, 7),
(4, '<script src=\'/webgui/assets/js/els/fns/display/formview/DisplayFormRenderer.js\'></script><script src=\'/webgui/assets/js/els/fns/display/formview/libs/DisplayFormUtils.js\'></script>', 'displayFormRenderer.initView()', '2017-11-08 22:08:21', 'var displayFormRenderer = new DisplayFormRenderer(); displayFormRenderer.initRenderer();', 'displayFormRenderer.initBase', '2017-11-08 22:08:21', 'base', 1, 8),
(5, '</script><script src=\'/webgui/assets/js/els/fns/design/physical/DesignPhysicalRenderer.js\'></script><script src=\'/webgui/assets/js/els/fns/design/physical/DesignPhysicalRendererCrud.js\'></script><script src=\'/webgui/assets/js/els/fns/design/physical/physical-vars.js\'></script><script src=\'/webgui/assets/js/els/fns/design/physical/utils/model/ModelPropertyUtils.js\'></script><script src=\'/webgui/assets/js/els/fns/design/physical/utils/model/ModelShapeUtils.js\'></script><script src=\'/webgui/assets/js/els/fns/design/physical/utils/PhysicalInterfaceUtils.js\'></script><script src=\'/webgui/assets/js/els/fns/design/physical/utils/RomeModelManager.js\'></script><script src=\'/webgui/assets/js/els/fns/design/physical/RenderInterface.js\'></script><script src=\'/webgui/assets/js/els/fns/design/physical/libs/menufunctions.js\'></script><script src=\'/webgui/assets/js/els/fns/design/physical/libs/menumanager.js\'></script>', 'designPhysicalRenderer.initView();', '2017-11-08 22:08:41', 'var designPhysicalRenderer = new DesignPhysicalRenderer(); designPhysicalRenderer.initRenderer();', 'designPhysicalRenderer.initBase', '2017-11-08 22:08:41', 'base', 1, 9),
(6, '<script src=\'/webgui/assets/js/els/fns/display/physical/utils/DisplayPhysicalInterfaceUtils.js\'></script><script src=\'/webgui/assets/js/els/fns/display/physical/utils/DisplayPhysicalRenderInterface.js\'></script><script src=\'/webgui/assets/js/els/fns/display/physical/DisplayPhysicalRenderer.js\'></script><script src=\'/webgui/assets/js/els/fns/display/physical/display-physical-vars.js\'></script>', 'displayPhysicalRenderer.initView();', '2017-11-08 22:08:41', 'var displayPhysicalRenderer = new DisplayPhysicalRenderer(); displayPhysicalRenderer.initRenderer();', 'displayPhysicalRenderer.initBase', '2017-11-08 22:08:41', 'base', 1, 10),
(7, '<script src=\'/webgui/assets/js/els/fns/display/formview/v2/DisplayFormRenderer.js\'></script><script src=\'/webgui/assets/js/els/fns/display/formview/v2/libs/DisplayFormUtils.js\'></script>', 'displayFormRenderer.initView()', '2017-11-08 22:09:04', 'var displayFormRenderer = new DisplayFormRenderer(); displayFormRenderer.initRenderer();', 'displayFormRenderer.initBase', '2017-11-08 22:09:04', 'base', 2, 8),
(8, '<script src=\'/webgui/assets/js/els/fns/display/decos/hotel/management/hotel/1/HotelManagerRender.js\'></script><script src=\'/webgui/assets/js/els/fns/display/decos/hotel/management/hotel/1/utils/HotelUtils.js\'></script><script src=\'/webgui/assets/js/els/fns/display/decos/hotel/management/hotel/1/utils/HotelFormUtils.js\'></script>', 'hotelManager_hotel.initView()', '2017-11-08 22:09:33', 'var hotelManager_hotel = new HotelManagerRender(); hotelManager_hotel.initRenderer();', 'hotelManager_hotel.initBase', '2017-11-08 22:09:33', 'base', 1, 11),
(9, '<script src=\'/webgui/assets/js/els/fns/display/decos/hotel/management/kitchen/1/KitchenManagerRender.js\'></script><script src=\'/webgui/assets/js/els/fns/display/decos/hotel/management/kitchen/1/utils/KitchenUtils.js\'></script>', 'kitchenManager_kitchen.initView()', '2017-11-08 22:09:33', 'var kitchenManager_kitchen = new KitchenManagerRender(); kitchenManager_kitchen.initRenderer();', 'kitchenManager_kitchen.initBase', '2017-11-08 22:09:33', 'base', 1, 12),
(10, '<script src=\'/webgui/assets/js/els/fns/display/decos/hotel/management/person/1/PersonManagerRender.js\'></script><script src=\'/webgui/assets/js/els/fns/display/decos/hotel/management/person/1/utils/PersonUtils.js\'></script>', 'personManager_person.initView()', '2017-11-08 22:09:33', 'var personManager_person = new PersonManagerRender(); personManager_person.initRenderer();', 'personManager_person.initBase', '2017-11-08 22:09:33', 'base', 1, 13),
(11, '<script src=\'/webgui/assets/js/els/fns/display/decos/reservation/1/ReservationManagerRender.js\'></script><script src=\'/webgui/assets/js/els/fns/display/decos/reservation/1/utils/ReservationUtils.js\'></script>', 'ReservationManager_reservation.initView()', '2017-11-08 22:09:33', 'var ReservationManager_reservation = new ReservationManagerRender(); ReservationManager_reservation.initRenderer();', 'ReservationManager_reservation.initBase', '2017-11-08 22:09:33', 'base', 1, 14),
(12, '<script src=\'/webgui/assets/js/els/fns/display/decos/walkin/1/WalkinManagerRender.js\'></script><script src=\'/webgui/assets/js/els/fns/display/decos/walkin/1/utils/WalkinUtils.js\'></script><script src=\'/webgui/assets/js/els/fns/display/decos/walkin/1/utils/WalkinNewUtils.js\'></script>', 'WalkinManager_walkin.initView()', '2017-11-08 22:10:44', 'var WalkinManager_walkin = new WalkinManagerRender(); WalkinManager_walkin.initRenderer();', 'WalkinManager_walkin.initBase', '2017-11-08 22:10:44', 'base', 1, 15);
/*!40000 ALTER TABLE `els_romenext_decos_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `els_romenext_metadata`
--


DROP TABLE IF EXISTS `els_romenext_metadata`;
CREATE TABLE `els_romenext_metadata` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  `user_group` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `romenext`.`els_romenext_metadata`
(`id`,`created_date`,`modified_date`,`name`,`token`,`uuid`,`user_group`) VALUES ('1', '2017-11-20 15:10:18', '2017-11-20 15:10:18', 
	'metadata1', 'metadata1', NULL, 'Group1');



--
-- Table structure for table `els_romenext_metadata_repo`
--

DROP TABLE IF EXISTS `els_romenext_metadata_repo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_metadata_repo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `metadata_id` bigint(20) DEFAULT NULL,
  `user_group` varchar(255) DEFAULT NULL,
  `neo4j_instance` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`neo4j_instance`) REFERENCES `els_romenext_neo4j_instances` (`id`),
  FOREIGN KEY (`metadata_id`) REFERENCES `els_romenext_metadata` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


INSERT INTO `romenext`.`els_romenext_metadata_repo`
(`id`, `created_date`, `description`, `ip`, `modified_date`, `name`, `password`, `token`, `username`,
`metadata_id`,`user_group`,`neo4j_instance`)
VALUES (2,now() ,'' , "http://192.168.1.41:7474", now(), 'metadata1_repo1', 'superman','' , 'neo4j', 1,'Group1',NULL);

--
-- Table structure for table `els_romenext_model`
--

DROP TABLE IF EXISTS `els_romenext_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_model` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `childEnabled` bit(1) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rome_type` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_type`) REFERENCES `els_romenext_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `els_romenext_model` (`id`, `childEnabled`, `created_date`, `modified_date`, `name`, `rome_type`) VALUES
(1, NULL, NULL, NULL, 'C', 110),
(2, NULL, NULL, NULL, 'B', 110),
(3, NULL, NULL, NULL, 'A', 110),
(4, NULL, NULL, NULL, 'A1', 109);

--
-- Table structure for table `els_romenext_model_part`
--

-- march 14

DROP TABLE IF EXISTS `els_romenext_model_part`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_model_part` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rome_model` bigint(20) DEFAULT NULL,
  `rome_model_property` bigint(20) DEFAULT NULL,
  `part_group` int(11) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_model`) REFERENCES `els_romenext_model` (`id`),
  FOREIGN KEY (`rome_model_property`) REFERENCES `els_romenext_model_property` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


/*!40000 ALTER TABLE `els_romenext_model_part` DISABLE KEYS */;
INSERT INTO `els_romenext_model_part` (`id`, `created_date`, `modified_date`, `name`, `rome_model`,`rome_model_property`,`part_group`,`value`)VALUES 
(1,'2016-08-26 14:38:01','2016-08-26 14:38:01','asdf',27,25,1,'100'),
(2,'2016-08-26 14:38:01','2016-08-26 14:38:01','asdf',27,24,1,'200'),
(3,'2016-08-29 16:44:36','2016-08-29 16:44:36','test1',29,30,1,'100'),
(4,'2016-08-29 16:44:36','2016-08-29 16:44:36','test1',29,31,1,'200'),
(5,'2016-08-29 16:44:36','2016-08-29 16:44:36','test1',29,32,1,'100'),
(6,'2016-08-29 16:44:36','2016-08-29 16:44:36','test1',29,33,1,'200'),
(7,'2016-08-29 16:46:04','2016-08-29 16:46:04','test2',29,30,2,'200'),
(8,'2016-08-29 16:46:04','2016-08-29 16:46:04','test2',29,31,2,'400'),
(9,'2016-08-29 16:46:04','2016-08-29 16:46:04','test2',29,32,2,'200'),
(10,'2016-08-29 16:46:04','2016-08-29 16:46:04','test2',29,33,2,'400'),
(11,'2016-08-29 16:53:16','2016-08-29 16:53:16','',31,41,1,'200'),
(12,'2016-08-29 16:53:16','2016-08-29 16:53:16','',31,42,1,'400'),
(13,'2016-08-30 12:09:21','2016-08-30 12:09:21','test1',33,43,1,'200'),
(14,'2016-08-30 12:09:21','2016-08-30 12:09:21','test1',33,44,1,'300'),
(15,'2016-08-31 16:55:13','2016-08-31 16:55:13','part1',34,48,1,'100'),
(16,'2016-08-31 16:55:13','2016-08-31 16:55:13','part1',34,49,1,'200'),
(17,'2016-08-31 16:55:13','2016-08-31 16:55:13','part1',34,45,1,'100'),
(18,'2016-08-31 16:55:13','2016-08-31 16:55:13','part1',34,46,1,'200'),(19,'2016-08-31 16:55:13','2016-08-31 16:55:13','part1',34,47,1,'Test2'),(20,'2016-08-31 16:55:37','2016-08-31 16:55:37','Part2',34,48,2,'200'),(21,'2016-08-31 16:55:37','2016-08-31 16:55:37','Part2',34,49,2,'400'),(22,'2016-08-31 16:55:37','2016-08-31 16:55:37','Part2',34,45,2,'200'),(23,'2016-08-31 16:55:37','2016-08-31 16:55:37','Part2',34,46,2,'400'),(24,'2016-08-31 16:55:37','2016-08-31 16:55:37','Part2',34,47,2,'Test3'),(25,'2016-09-02 16:41:21','2016-09-02 16:41:21','Part1',36,53,1,'200'),(26,'2016-09-02 16:41:21','2016-09-02 16:41:21','Part1',36,54,1,'300'),(27,'2016-09-02 16:41:21','2016-09-02 16:41:21','Part1',36,55,1,'400'),(28,'2016-09-02 16:41:21','2016-09-02 16:41:21','Part1',36,56,1,'500'),(29,'2016-09-02 16:41:21','2016-09-02 16:41:21','Part1',36,57,1,'nOtHANKS'),(30,'2016-09-02 16:41:21','2016-09-02 16:41:21','Part1',36,58,1,'yUP'),(31,'2016-09-06 17:32:37','2016-09-06 17:32:37','part1',38,59,1,'100'),(32,'2016-09-06 17:32:37','2016-09-06 17:32:37','part1',38,60,1,'200'),(33,'2016-09-06 17:32:37','2016-09-06 17:32:37','part1',38,59,1,'100'),(34,'2016-09-06 17:32:37','2016-09-06 17:32:37','part1',38,60,1,'200'),(35,'2016-09-06 17:32:46','2016-09-06 17:32:46','part2',38,59,2,'200'),(36,'2016-09-06 17:32:46','2016-09-06 17:32:46','part2',38,60,2,'400'),(37,'2016-09-06 17:32:46','2016-09-06 17:32:46','part2',38,59,2,'200'),(38,'2016-09-06 17:32:46','2016-09-06 17:32:46','part2',38,60,2,'400'),(39,'2016-09-06 17:32:58','2016-09-06 17:32:58','part1',39,61,1,'200'),(40,'2016-09-06 17:32:58','2016-09-06 17:32:58','part1',39,62,1,'400'),(41,'2016-09-06 17:32:58','2016-09-06 17:32:58','part1',39,61,1,'200'),(42,'2016-09-06 17:32:58','2016-09-06 17:32:58','part1',39,62,1,'400'),(43,'2016-09-06 17:33:08','2016-09-06 17:33:08','part2',39,61,2,'400'),(44,'2016-09-06 17:33:08','2016-09-06 17:33:08','part2',39,62,2,'800'),(45,'2016-09-06 17:33:08','2016-09-06 17:33:08','part2',39,61,2,'400'),(46,'2016-09-06 17:33:08','2016-09-06 17:33:08','part2',39,62,2,'800'),(47,'2016-09-19 10:26:16','2016-09-19 10:26:16','HEIGHT1_PART',46,67,NULL,'200'),(48,'2016-09-19 10:26:16','2016-09-19 10:26:16','HEIGHT2_PART',46,68,1,'300'),(49,'2016-09-19 10:26:16','2016-09-19 10:26:16','HEIGHT3_PART',46,69,1,'301'),(50,'2016-09-19 10:26:16','2016-09-19 10:26:16','HEIGHT4_PART',46,70,1,'302'),(51,'2016-09-19 10:26:16','2016-09-19 10:26:16','HEIGHT5_PART',46,71,1,'303'),(52,'2016-09-19 10:26:16','2016-09-19 10:26:16','HEIGHT1_PART',47,72,NULL,'200'),(53,'2016-09-19 10:26:16','2016-09-19 10:26:16','HEIGHT2_PART',47,73,1,'300'),(54,'2016-09-19 10:26:16','2016-09-19 10:26:16','HEIGHT3_PART',47,74,1,'301'),(55,'2016-09-19 10:26:16','2016-09-19 10:26:16','HEIGHT4_PART',47,75,1,'402'),(56,'2016-09-19 10:26:16','2016-09-19 10:26:16','HEIGHT5_PART',47,76,1,'403'),(57,NULL,NULL,'HEIGHT6_PART',47,77,1,'TTT'),(58,'2016-09-19 10:26:17','2016-09-19 10:26:17','HEIGHT1_PART',48,78,NULL,'200'),(59,'2016-09-19 10:26:17','2016-09-19 10:26:17','HEIGHT2_PART',48,79,1,'300'),(60,'2016-09-19 10:26:17','2016-09-19 10:26:17','HEIGHT3_PART',48,80,1,'301'),(61,'2016-09-19 10:26:17','2016-09-19 10:26:17','HEIGHT4_PART',48,81,1,'402'),(62,'2016-09-19 10:26:17','2016-09-19 10:26:17','HEIGHT5_PART',48,82,1,'403'),(63,NULL,NULL,'HEIGHT6_PART',48,83,1,'TTT'),(64,'2016-09-19 10:26:17','2016-09-19 10:26:17','HEIGHT1_PART',49,84,NULL,'200'),(65,'2016-09-19 10:26:17','2016-09-19 10:26:17','HEIGHT2_PART',49,85,1,'300'),(66,'2016-09-19 10:26:17','2016-09-19 10:26:17','HEIGHT3_PART',49,86,1,'301'),(67,'2016-09-19 10:26:17','2016-09-19 10:26:17','HEIGHT4_PART',49,87,1,'302'),(68,'2016-09-19 10:26:17','2016-09-19 10:26:17','HEIGHT5_PART',49,88,1,'303'),(69,'2016-09-19 10:26:17','2016-09-19 10:26:17','HEIGHT1_PART',50,89,NULL,'200'),(70,'2016-09-19 10:26:17','2016-09-19 10:26:17','HEIGHT2_PART',50,90,1,'300'),(71,'2016-09-19 10:26:17','2016-09-19 10:26:17','HEIGHT3_PART',50,91,1,'301'),(72,'2016-09-19 10:26:17','2016-09-19 10:26:17','HEIGHT4_PART',50,92,1,'302'),(73,'2016-09-19 10:26:17','2016-09-19 10:26:17','HEIGHT5_PART',50,93,1,'303'),(74,'2016-09-20 14:11:52','2016-09-20 14:11:52','Part1',54,94,1,'200'),(75,'2016-09-20 14:11:52','2016-09-20 14:11:52','Part1',54,95,1,'400'),(76,'2016-09-20 14:11:52','2016-09-20 14:11:52','Part1',54,96,1,'ANOTHER TEST'),(77,'2016-09-20 14:14:53','2016-09-20 14:14:53','part1',54,97,2,'200'),(78,'2016-09-20 14:14:53','2016-09-20 14:14:53','part1',54,98,2,'400'),(79,'2016-09-20 14:14:53','2016-09-20 14:14:53','part1',54,99,2,'PART1 TEXT'),(80,'2016-09-20 14:15:14','2016-09-20 14:15:14','part2',54,97,3,'300'),(81,'2016-09-20 14:15:14','2016-09-20 14:15:14','part2',54,98,3,'500'),(82,'2016-09-20 14:15:14','2016-09-20 14:15:14','part2',54,99,3,'SUPERMAN'),(83,'2016-09-28 16:01:49','2016-09-28 16:01:49','part1',59,100,1,'200'),(84,'2016-09-28 16:01:49','2016-09-28 16:01:49','part1',59,101,1,'200'),(85,'2016-09-28 16:01:49','2016-09-28 16:01:49','part1',59,102,1,'Nope'),(86,'2016-10-05 15:39:03','2016-10-05 15:39:03','part1',60,103,1,'400'),(87,'2016-10-05 15:39:03','2016-10-05 15:39:03','part1',60,104,1,'300'),(88,'2016-10-05 15:39:03','2016-10-05 15:39:03','part1',60,105,1,'TEST'),(89,'2016-10-05 15:39:32','2016-10-05 15:39:32','part2',60,103,2,'600'),(90,'2016-10-05 15:39:32','2016-10-05 15:39:32','part2',60,104,2,'400'),(91,'2016-10-05 15:39:32','2016-10-05 15:39:32','part2',60,105,2,'TEST1'),(92,'2016-10-05 16:00:50','2016-10-05 16:00:50','Part1',62,106,1,'300');
/*!40000 ALTER TABLE `els_romenext_model_part` ENABLE KEYS */;


--
-- Table structure for table `els_romenext_model_property`
--

DROP TABLE IF EXISTS `els_romenext_model_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_model_property` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `default_value` varchar(255) DEFAULT NULL,
  `is_required` bit(1) DEFAULT NULL,
  `maximum_value` varchar(255) DEFAULT NULL,
  `minimum_value` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `must_be_unique` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `parent_child` int(11) DEFAULT NULL,
  `property_type` int(11) DEFAULT NULL,
  `rome_model` bigint(20) DEFAULT NULL,
  `rome_type_property` bigint(20) DEFAULT NULL,
  `property_modifier_type` int(11) DEFAULT NULL,
  `property_position_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_type_property`) REFERENCES `els_romenext_type_properties` (`id`),
  FOREIGN KEY (`rome_model`) REFERENCES `els_romenext_model` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `els_romenext_model_property` WRITE;
/*!40000 ALTER TABLE `els_romenext_model_property` DISABLE KEYS */;
INSERT INTO `els_romenext_model_property`  (`id`, `created_date`, `default_value`, `is_required`, `maximum_value`,`minimum_value`,`modified_date`,`must_be_unique`,`name`,`parent_child`,`property_type`,`rome_model`,`rome_type_property`,`property_modifier_type`,`property_position_type`)VALUES
(1,'2016-06-17 11:56:48','2',1,NULL,NULL,'2016-06-17 11:56:48',0,'HEIGHT',3,3,3,NULL,NULL,NULL),
(2,'2016-06-17 12:04:50','2',1,NULL,NULL,'2016-06-17 12:04:50',0,'HEIGHT',3,3,4,NULL,NULL,NULL),
(3,'2016-06-17 12:05:07','2',1,NULL,NULL,'2016-06-17 12:05:07',0,'HEIGHT',3,3,5,NULL,NULL,NULL),
(4,'2016-06-17 12:05:39','2',1,NULL,NULL,'2016-06-17 12:05:39',0,'HEIGHT',3,3,6,NULL,NULL,NULL),
(5,'2016-06-17 12:06:02','2',1,NULL,NULL,'2016-06-17 12:06:02',0,'HEIGHT',3,3,7,NULL,NULL,NULL),
(6,'2016-06-17 12:06:46','2',1,NULL,NULL,'2016-06-17 12:06:46',0,'HEIGHT',3,3,8,NULL,NULL,NULL),
(7,'2016-06-17 12:09:43','2',1,NULL,NULL,'2016-06-17 12:09:43',0,'HEIGHT',3,3,9,NULL,NULL,NULL),(8,'2016-06-17 12:10:05','2',1,NULL,NULL,'2016-06-17 12:10:05',0,'HEIGHT',3,3,10,NULL,NULL,NULL),(9,'2016-06-17 12:11:28','2',1,NULL,NULL,'2016-06-17 12:11:28',0,'HEIGHT',3,3,11,NULL,NULL,NULL),(10,'2016-06-17 12:12:33','2',1,NULL,NULL,'2016-06-17 12:12:33',0,'HEIGHT',3,3,12,NULL,NULL,NULL),(11,'2016-06-17 12:13:22','2',1,NULL,NULL,'2016-06-17 12:13:22',0,'HEIGHT',3,3,13,NULL,NULL,NULL),(12,'2016-06-17 12:15:10','2',1,NULL,NULL,'2016-06-17 12:15:10',0,'HEIGHT',3,3,14,NULL,NULL,NULL),(13,'2016-06-17 12:16:27','2',1,NULL,NULL,'2016-06-17 12:16:27',0,'HEIGHT',3,3,15,NULL,NULL,NULL),(14,'2016-06-17 12:18:00','2',1,NULL,NULL,'2016-06-17 12:18:00',0,'HEIGHT',3,3,16,NULL,NULL,NULL),(15,'2016-06-17 12:18:18','2',1,NULL,NULL,'2016-06-17 12:18:18',0,'HEIGHT',3,3,17,NULL,NULL,NULL),(16,'2016-06-17 12:19:05','2',1,NULL,NULL,'2016-06-17 12:19:05',0,'HEIGHT',3,3,18,NULL,NULL,NULL),(17,'2016-06-17 12:22:49','2',1,NULL,NULL,'2016-06-17 12:22:49',0,'HEIGHT',3,3,19,NULL,NULL,NULL),(18,'2016-06-17 12:24:46','2',1,NULL,NULL,'2016-06-17 12:24:46',0,'HEIGHT',3,3,20,NULL,NULL,NULL),(19,'2016-06-17 12:25:23','2',1,NULL,NULL,'2016-06-17 12:25:23',0,'HEIGHT',3,3,21,NULL,NULL,NULL),(20,'2016-08-26 14:23:51','100',NULL,'2342','0','2016-08-26 14:23:51',NULL,'RightCL1',1,7,26,NULL,1,NULL),(21,'2016-08-26 14:24:19','123',NULL,'32432','0','2016-08-26 14:24:19',NULL,'CL2',1,7,26,NULL,1,NULL),(22,'2016-08-26 14:25:11','400',NULL,'234324','0','2016-08-26 14:26:39',NULL,'CL3',1,7,26,NULL,3,NULL),(23,'2016-08-26 14:25:29','30',NULL,'23432','0','2016-08-26 14:30:46',NULL,'CL4',1,7,26,NULL,3,NULL),(24,'2016-08-26 14:32:33','150',NULL,'100000','1','2016-08-26 14:38:49',NULL,'l41',1,7,27,NULL,1,NULL),(25,'2016-08-26 14:33:11','100',NULL,'1234324','1','2016-08-26 14:38:36',NULL,'Line2',1,7,27,NULL,1,NULL),(26,'2016-08-29 16:36:42','100',NULL,'','','2016-08-29 16:36:42',NULL,'X1',1,7,28,NULL,1,NULL),(27,'2016-08-29 16:36:50','150',NULL,'0','0','2016-08-29 16:38:34',NULL,'x2',1,7,28,NULL,1,NULL),(28,'2016-08-29 16:37:08','100',NULL,'','','2016-08-29 16:37:08',NULL,'y1',1,7,28,NULL,1,NULL),(29,'2016-08-29 16:37:19','100',NULL,'','','2016-08-29 16:37:19',NULL,'y2',1,7,28,NULL,3,NULL),(30,'2016-08-29 16:40:33','50',NULL,'','','2016-08-29 16:40:33',NULL,'x1',1,7,29,NULL,1,NULL),(31,'2016-08-29 16:40:40','120',NULL,'0','0','2016-08-29 16:42:59',NULL,'x2',1,7,29,NULL,1,NULL),(32,'2016-08-29 16:40:47','50',NULL,'0','0','2016-08-29 16:41:06',NULL,'y1',1,7,29,NULL,3,NULL),(33,'2016-08-29 16:41:01','150',NULL,'','','2016-08-29 16:41:01',NULL,'y2',1,7,29,NULL,3,NULL),(34,'2016-08-29 16:48:57','Hello',NULL,'','','2016-08-29 16:48:57',NULL,'Test1',1,13,30,NULL,13,NULL),(35,'2016-08-29 16:49:23','100',NULL,'','','2016-08-29 16:49:23',NULL,'x1',1,7,30,NULL,1,NULL),(36,'2016-08-29 16:49:29','200',NULL,'','','2016-08-29 16:49:29',NULL,'x2',1,7,30,NULL,1,NULL),(37,'2016-08-29 16:49:40','100',NULL,'','','2016-08-29 16:49:40',NULL,'y1',1,7,30,NULL,3,NULL),(38,'2016-08-29 16:49:49','200',NULL,'','','2016-08-29 16:49:49',NULL,'y2',1,7,30,NULL,3,NULL),(39,'2016-08-29 16:51:10','100',NULL,'','','2016-08-29 16:51:10',NULL,'x1',1,7,31,NULL,1,NULL),(40,'2016-08-29 16:51:17','200',NULL,'','','2016-08-29 16:51:17',NULL,'x2',1,7,31,NULL,1,NULL),(41,'2016-08-29 16:51:27','100',NULL,'','','2016-08-29 16:51:27',NULL,'y1',1,7,31,NULL,3,NULL),(42,'2016-08-29 16:51:35','200',NULL,'','','2016-08-29 16:51:35',NULL,'y2',1,7,31,NULL,3,NULL),(43,'2016-08-30 12:08:53','100',NULL,'','','2016-08-30 12:08:53',NULL,'x1',1,7,33,NULL,1,NULL),(44,'2016-08-30 12:08:58','200',NULL,'','','2016-08-30 12:08:58',NULL,'x2',1,7,33,NULL,1,NULL),(45,'2016-08-31 16:51:39','100',NULL,'','','2016-08-31 16:51:39',NULL,'x1',1,7,34,NULL,1,NULL),(46,'2016-08-31 16:51:45','200',NULL,'','','2016-08-31 16:51:45',NULL,'x2',1,7,34,NULL,1,NULL),(47,'2016-08-31 16:52:48','Test',NULL,'','','2016-08-31 16:52:48',NULL,'Text1',1,13,34,NULL,NULL,3),(48,'2016-08-31 16:53:10','100',NULL,'','','2016-08-31 16:53:10',NULL,'y1',1,7,34,NULL,3,NULL),(49,'2016-08-31 16:53:19','200',NULL,'','','2016-08-31 16:53:19',NULL,'y2',1,7,34,NULL,3,NULL),(50,'2016-09-02 16:11:17','199',NULL,'','','2016-09-02 16:11:17',NULL,'x1',1,7,35,NULL,1,NULL),(51,'2016-09-02 16:11:24','205',NULL,'0','0','2016-09-02 16:33:24',NULL,'x2',1,7,35,NULL,1,NULL),(52,'2016-09-02 16:34:12','400',NULL,'','','2016-09-02 16:34:12',NULL,'x3',1,7,35,NULL,1,NULL),(53,'2016-09-02 16:36:48','100',NULL,'','','2016-09-02 16:36:48',NULL,'x1',1,7,36,NULL,1,NULL),(54,'2016-09-02 16:36:55','200',NULL,'','','2016-09-02 16:36:55',NULL,'x2',1,7,36,NULL,1,NULL),(55,'2016-09-02 16:38:23','300',NULL,'','','2016-09-02 16:38:23',NULL,'x3',1,7,36,NULL,1,NULL),(56,'2016-09-02 16:38:30','400',NULL,'','','2016-09-02 16:38:30',NULL,'x4',1,7,36,NULL,1,NULL),(57,'2016-09-02 16:39:35','Hello',NULL,'','','2016-09-02 16:39:35',NULL,'Text1',1,13,36,NULL,NULL,1),(58,'2016-09-02 16:40:03','Bye',NULL,'','','2016-09-02 16:40:03',NULL,'Text2',1,13,36,NULL,NULL,3),(59,'2016-09-06 17:29:04','100',NULL,'','','2016-09-06 17:29:04',NULL,'c1',1,7,38,NULL,1,NULL),(60,'2016-09-06 17:29:10','200',NULL,'','','2016-09-06 17:29:10',NULL,'x2',1,7,38,NULL,1,NULL),(61,'2016-09-06 17:30:26','200',NULL,'','','2016-09-06 17:30:26',NULL,'c1',1,7,39,NULL,1,NULL),(62,'2016-09-06 17:30:33','400',NULL,'','','2016-09-06 17:30:33',NULL,'x2',1,7,39,NULL,1,NULL),(63,'2016-09-19 10:26:14','2',1,'100','0','2016-09-19 10:26:14',0,'HEIGHT',3,3,40,NULL,5,NULL),(64,'2016-09-19 10:26:14','2',1,'100','0','2016-09-19 10:26:14',0,'HEIGHT',3,3,41,NULL,5,NULL),(65,'2016-09-19 10:26:15','2',1,'100','0','2016-09-19 10:26:15',0,'HEIGHT',3,3,44,NULL,5,NULL),(66,'2016-09-19 10:26:15','2',1,'100','0','2016-09-19 10:26:15',0,'HEIGHT',3,3,45,NULL,5,NULL),(67,'2016-09-19 10:26:16','2',1,'100','0','2016-09-19 10:26:16',0,'HEIGHT1',3,3,46,NULL,5,NULL),(68,'2016-09-19 10:26:16','2',1,'101','0','2016-09-19 10:26:16',0,'HEIGHT2',3,3,46,NULL,5,NULL),(69,'2016-09-19 10:26:16','2',1,'102','0','2016-09-19 10:26:16',0,'HEIGHT3',3,3,46,NULL,5,NULL),(70,'2016-09-19 10:26:16','2',1,'103','0','2016-09-19 10:26:16',0,'HEIGHT4',3,3,46,NULL,5,NULL),(71,'2016-09-19 10:26:16','2',1,'104','0','2016-09-19 10:26:16',0,'HEIGHT5',3,3,46,NULL,5,NULL),(72,'2016-09-19 10:26:16','2',1,'100','0','2016-09-19 10:26:16',0,'HEIGHT1',3,3,47,NULL,5,NULL),(73,'2016-09-19 10:26:16','2',1,'101','0','2016-09-19 10:26:16',0,'HEIGHT2',3,3,47,NULL,5,NULL),(74,'2016-09-19 10:26:16','2',1,'102','0','2016-09-19 10:26:16',0,'HEIGHT3',3,3,47,NULL,5,NULL),(75,'2016-09-19 10:26:16','2',1,'103','0','2016-09-19 10:26:16',0,'HEIGHT4',3,3,47,NULL,5,NULL),(76,'2016-09-19 10:26:16','2',1,'104','0','2016-09-19 10:26:16',0,'HEIGHT5',3,3,47,NULL,5,NULL),(77,'2016-09-19 10:26:16','2',1,'105','0','2016-09-19 10:26:16',0,'HEIGHT6',3,3,47,NULL,5,NULL),(78,'2016-09-19 10:26:16','2',1,'100','0','2016-09-19 10:26:16',0,'HEIGHT1',3,3,48,NULL,5,NULL),(79,'2016-09-19 10:26:16','2',1,'101','0','2016-09-19 10:26:16',0,'HEIGHT2',3,3,48,NULL,5,NULL),(80,'2016-09-19 10:26:16','2',1,'102','0','2016-09-19 10:26:16',0,'HEIGHT3',3,3,48,NULL,5,NULL),(81,'2016-09-19 10:26:17','2',1,'103','0','2016-09-19 10:26:17',0,'HEIGHT4',3,3,48,NULL,5,NULL),(82,'2016-09-19 10:26:17','2',1,'104','0','2016-09-19 10:26:17',0,'HEIGHT5',3,3,48,NULL,5,NULL),(83,'2016-09-19 10:26:17','2',1,'105','0','2016-09-19 10:26:17',0,'HEIGHT6',3,3,48,NULL,5,NULL),(84,'2016-09-19 10:26:17','2',1,'100','0','2016-09-19 10:26:17',0,'HEIGHT1',3,3,49,NULL,5,NULL),(85,'2016-09-19 10:26:17','2',1,'101','0','2016-09-19 10:26:17',0,'HEIGHT2',3,3,49,NULL,5,NULL),(86,'2016-09-19 10:26:17','2',1,'102','0','2016-09-19 10:26:17',0,'HEIGHT3',3,3,49,NULL,5,NULL),(87,'2016-09-19 10:26:17','2',1,'103','0','2016-09-19 10:26:17',0,'HEIGHT4',3,3,49,NULL,5,NULL),(88,'2016-09-19 10:26:17','2',1,'104','0','2016-09-19 10:26:17',0,'HEIGHT5',3,3,49,NULL,5,NULL),(89,'2016-09-19 10:26:17','2',1,'100','0','2016-09-19 10:26:17',0,'HEIGHT1',3,3,50,NULL,5,NULL),(90,'2016-09-19 10:26:17','2',1,'101','0','2016-09-19 10:26:17',0,'HEIGHT2',3,3,50,NULL,5,NULL),(91,'2016-09-19 10:26:17','2',1,'102','0','2016-09-19 10:26:17',0,'HEIGHT3',3,3,50,NULL,5,NULL),(92,'2016-09-19 10:26:17','2',1,'103','0','2016-09-19 10:26:17',0,'HEIGHT4',3,3,50,NULL,5,NULL),(93,'2016-09-19 10:26:17','2',1,'104','0','2016-09-19 10:26:17',0,'HEIGHT5',3,3,50,NULL,5,NULL),(94,'2016-09-20 14:09:31','100',NULL,'','','2016-09-20 14:09:31',NULL,'x1',1,7,54,NULL,1,NULL),(95,'2016-09-20 14:09:39','200',NULL,'','','2016-09-20 14:09:39',NULL,'x2',1,7,54,NULL,1,NULL),(96,'2016-09-20 14:11:03','THIS IS TEST',NULL,'0','0','2016-09-20 14:11:21',NULL,'Test1',1,13,54,NULL,NULL,1),(97,'2016-09-20 14:12:59','100',NULL,'','','2016-09-20 14:12:59',NULL,'y1',3,7,54,NULL,3,NULL),(98,'2016-09-20 14:13:07','200',NULL,'0','0','2016-09-20 14:14:27',NULL,'y2',3,7,54,NULL,3,NULL),(99,'2016-09-20 14:13:26','INITIAL',NULL,'','','2016-09-20 14:13:26',NULL,'text2',3,13,54,NULL,NULL,3),(100,'2016-09-28 15:32:54','100',NULL,'','','2016-09-28 15:32:54',NULL,'x1',1,7,59,NULL,1,NULL),(101,'2016-09-28 15:33:09','100',NULL,'','','2016-09-28 15:33:09',NULL,'y1',1,7,59,NULL,3,NULL),(102,'2016-09-28 15:33:42','HelloXY',NULL,'','','2016-09-28 15:33:42',NULL,'Text1',1,13,59,NULL,NULL,5),(103,'2016-10-05 15:31:27','500',NULL,'','','2016-10-05 15:31:27',NULL,'x1',1,7,60,NULL,1,NULL),(104,'2016-10-05 15:32:33','200',NULL,'','','2016-10-05 15:32:33',NULL,'y1',1,7,60,NULL,3,NULL),(105,'2016-10-05 15:35:39','HELLO',NULL,'','','2016-10-05 15:35:39',NULL,'Name of shelf',1,13,60,NULL,NULL,1),(106,'2016-10-05 16:00:26','200',NULL,'','','2016-10-05 16:00:26',NULL,'x1',1,7,62,NULL,1,NULL);
/*!40000 ALTER TABLE `els_romenext_model_property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `els_romenext_model_shape`
--

DROP TABLE IF EXISTS `els_romenext_model_shape`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_model_shape` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `angle` double DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `default_value` varchar(255) DEFAULT NULL,
  `depth` double DEFAULT NULL,
  `shapeGroup` int(11) DEFAULT NULL,
  `group_shape` int(11) DEFAULT NULL,
  `rome_group_shape_parent` bigint(20) DEFAULT NULL,
  `height` double DEFAULT NULL,
  `isConstruction` bit(1) DEFAULT NULL,
  `isHidden` bit(1) DEFAULT NULL,
  `is_required` bit(1) DEFAULT NULL,
  `line_width` double DEFAULT NULL,
  `maximum_value` varchar(255) DEFAULT NULL,
  `minimum_value` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `must_be_unique` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `offset_units` int(11) DEFAULT NULL,
  `parentChildState` int(11) DEFAULT NULL,
  `property_type` int(11) DEFAULT NULL,
  `line_rgb` varchar(255) DEFAULT NULL,
  `shape` int(11) DEFAULT NULL,
  `shape_type` int(11) DEFAULT NULL,
  `width` double DEFAULT NULL,
  `x1` double DEFAULT NULL,
  `x2` double DEFAULT NULL,
  `x3` double DEFAULT NULL,
  `y1` double DEFAULT NULL,
  `y2` double DEFAULT NULL,
  `y3` double DEFAULT NULL,
  `z1` double DEFAULT NULL,
  `z2` double DEFAULT NULL,
  `z3` double DEFAULT NULL,
  `rome_model` bigint(20) DEFAULT NULL,
  `rome_model_property` bigint(20) DEFAULT NULL,
  `rome_shape_parent` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_shape_parent`) REFERENCES `els_romenext_model_shape` (`id`),
  FOREIGN KEY (`rome_model_property`) REFERENCES `els_romenext_model_property` (`id`),
  FOREIGN KEY (`rome_model`) REFERENCES `els_romenext_model` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `els_romenext_model_shape` WRITE;
/*!40000 ALTER TABLE `els_romenext_model_shape` DISABLE KEYS */;
INSERT INTO `els_romenext_model_shape` (`id`, `angle`, `created_date`, `default_value`, `depth`,`height`,`isConstruction`,`isHidden`,`is_required`,`line_width`,`maximum_value`,`minimum_value`,`modified_date`,`must_be_unique`,`name`,`offset_units`,`parentChildState`,`property_type`,`line_rgb`,`shape`,`width`,`x1`,`x2`,`x3`,`y1`,`y2`,`y3`,`z1`,`z2`,`z3`,`rome_model`,`rome_model_property`,`rome_shape_parent`,`shapeGroup`,`group_shape`,`rome_group_shape_parent`,`shape_type`)VALUES 
(1,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(2,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(3,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(4,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,3,NULL,NULL,NULL,NULL),(5,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL),(6,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL),(7,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL),(8,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,2,NULL,7,NULL,NULL,NULL,NULL),(9,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL),(10,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL),(11,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL),(12,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL),(13,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,3,NULL,NULL,1,3,NULL,NULL),(14,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,3,NULL,NULL,1,3,NULL,NULL),(15,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,3,NULL,NULL,1,3,NULL,NULL),(16,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,3,NULL,NULL,1,3,NULL,NULL),(17,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,NULL),(18,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,NULL),(19,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,NULL),(20,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,NULL),(21,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,4,NULL,NULL,1,3,NULL,NULL),(22,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,4,NULL,NULL,1,3,NULL,NULL),(23,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,4,NULL,NULL,1,3,NULL,NULL),(24,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,9,NULL,NULL,10,NULL,NULL,11,NULL,NULL,4,NULL,NULL,1,3,NULL,NULL),(25,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,5,NULL,NULL,NULL,NULL,NULL,NULL),(26,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,5,NULL,NULL,NULL,NULL,NULL,NULL),(27,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,5,NULL,NULL,NULL,NULL,NULL,NULL),(28,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,5,NULL,NULL,NULL,NULL,NULL,NULL),(29,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,5,NULL,NULL,1,3,NULL,NULL),(30,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,5,NULL,NULL,1,3,NULL,NULL),(31,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,5,NULL,NULL,1,3,NULL,NULL),(32,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,9,NULL,NULL,10,NULL,NULL,11,NULL,NULL,5,NULL,NULL,1,3,NULL,NULL),(33,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,6,NULL,NULL,NULL,NULL,NULL,NULL),(34,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,6,NULL,NULL,NULL,NULL,NULL,NULL),(35,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,6,NULL,NULL,NULL,NULL,NULL,NULL),(36,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,6,NULL,NULL,NULL,NULL,NULL,NULL),(37,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,6,NULL,NULL,1,3,NULL,NULL),(38,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,6,NULL,NULL,1,3,NULL,NULL),(39,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,6,NULL,NULL,1,3,NULL,NULL),(40,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,9,NULL,NULL,10,NULL,NULL,11,NULL,NULL,6,NULL,NULL,1,3,NULL,NULL),(41,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL,NULL,NULL),(42,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL,NULL,NULL),(43,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL,NULL,NULL),(44,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL,NULL,NULL),(45,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,7,NULL,NULL,1,3,NULL,NULL),(46,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,7,NULL,NULL,1,3,NULL,NULL),(47,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,7,NULL,NULL,1,3,NULL,NULL),(48,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,9,NULL,NULL,10,NULL,NULL,11,NULL,NULL,7,NULL,NULL,1,3,NULL,NULL),(49,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,NULL),(50,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,NULL),(51,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,NULL),(52,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,NULL),(53,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,8,NULL,NULL,1,3,NULL,NULL),(54,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,8,NULL,NULL,1,3,NULL,NULL),(55,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,8,NULL,NULL,1,3,NULL,NULL),(56,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,9,NULL,NULL,10,NULL,NULL,11,NULL,NULL,8,NULL,NULL,1,3,NULL,NULL),(57,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,9,NULL,NULL,NULL,NULL,NULL,NULL),(58,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,9,NULL,NULL,NULL,NULL,NULL,NULL),(59,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,9,NULL,NULL,NULL,NULL,NULL,NULL),(60,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,9,NULL,NULL,NULL,NULL,NULL,NULL),(61,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,9,NULL,NULL,1,3,NULL,NULL),(62,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,9,NULL,NULL,1,3,NULL,NULL),(63,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,9,NULL,NULL,1,3,NULL,NULL),(64,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,9,NULL,NULL,10,NULL,NULL,11,NULL,NULL,9,NULL,NULL,1,3,NULL,NULL),(65,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,10,NULL,NULL,NULL,NULL,NULL,NULL),(66,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,10,NULL,NULL,NULL,NULL,NULL,NULL),(67,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,10,NULL,NULL,NULL,NULL,NULL,NULL),(68,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,10,NULL,NULL,NULL,NULL,NULL,NULL),(69,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,10,NULL,NULL,1,3,NULL,NULL),(70,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,10,NULL,NULL,1,3,NULL,NULL),(71,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,10,NULL,NULL,1,3,NULL,NULL),(72,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,9,NULL,NULL,10,NULL,NULL,11,NULL,NULL,10,NULL,NULL,1,3,NULL,NULL),(73,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,11,NULL,NULL,NULL,NULL,NULL,NULL),(74,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,11,NULL,NULL,NULL,NULL,NULL,NULL),(75,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,11,NULL,NULL,NULL,NULL,NULL,NULL),(76,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,11,NULL,NULL,NULL,NULL,NULL,NULL),(77,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,11,NULL,NULL,1,3,NULL,NULL),(78,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,11,NULL,NULL,1,3,NULL,NULL),(79,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,11,NULL,NULL,1,3,NULL,NULL),(80,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,9,NULL,NULL,10,NULL,NULL,11,NULL,NULL,11,NULL,NULL,1,3,NULL,NULL),(81,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL),(82,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL),(83,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL),(84,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,12,NULL,NULL,NULL,NULL,NULL,NULL),(85,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,12,NULL,NULL,1,3,NULL,NULL),(86,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,12,NULL,NULL,1,3,NULL,NULL),(87,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,12,NULL,NULL,1,3,NULL,NULL),(88,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,9,NULL,NULL,10,NULL,NULL,11,NULL,NULL,12,NULL,NULL,1,3,NULL,NULL),(89,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,13,NULL,NULL,NULL,NULL,NULL,NULL),(90,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,13,NULL,NULL,NULL,NULL,NULL,NULL),(91,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,13,NULL,NULL,NULL,NULL,NULL,NULL),(92,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,13,NULL,NULL,NULL,NULL,NULL,NULL),(93,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,13,NULL,NULL,1,3,NULL,NULL),(94,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,13,NULL,NULL,1,3,NULL,NULL),(95,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,13,NULL,NULL,1,3,NULL,NULL),(96,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,9,NULL,NULL,10,NULL,NULL,11,NULL,NULL,13,NULL,NULL,1,3,NULL,NULL),(97,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,14,NULL,NULL,NULL,NULL,NULL,NULL),(98,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,14,NULL,NULL,NULL,NULL,NULL,NULL),(99,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,14,NULL,NULL,NULL,NULL,NULL,NULL),(100,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,14,NULL,NULL,NULL,NULL,NULL,NULL),(101,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,14,NULL,NULL,1,3,NULL,NULL),(102,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,14,NULL,NULL,1,3,NULL,NULL),(103,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,14,NULL,NULL,1,3,NULL,NULL),(104,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,NULL,9,NULL,NULL,10,NULL,NULL,11,NULL,NULL,14,NULL,NULL,1,3,NULL,NULL),(105,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,15,NULL,NULL,NULL,NULL,NULL,NULL),(106,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,15,NULL,NULL,NULL,NULL,NULL,NULL),(107,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,15,NULL,NULL,NULL,NULL,NULL,NULL),(108,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,15,NULL,NULL,NULL,NULL,NULL,NULL),(109,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,15,NULL,NULL,1,3,NULL,NULL),(110,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,15,NULL,NULL,1,3,NULL,NULL),(111,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,15,NULL,NULL,1,3,NULL,NULL),(112,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,5,NULL,9,NULL,NULL,10,NULL,NULL,11,NULL,NULL,15,NULL,NULL,1,3,NULL,NULL),(113,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,16,NULL,NULL,NULL,NULL,NULL,NULL),(114,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,16,NULL,NULL,NULL,NULL,NULL,NULL),(115,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,16,NULL,NULL,NULL,NULL,NULL,NULL),(116,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,16,NULL,NULL,NULL,NULL,NULL,NULL),(117,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,16,NULL,NULL,1,3,NULL,NULL),(118,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,16,NULL,NULL,1,3,NULL,NULL),(119,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,16,NULL,NULL,1,3,NULL,NULL),(120,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,5,NULL,9,NULL,NULL,10,NULL,NULL,11,NULL,NULL,16,NULL,NULL,1,3,NULL,NULL),(121,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,17,NULL,NULL,NULL,NULL,NULL,NULL),(122,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,17,NULL,NULL,NULL,NULL,NULL,NULL),(123,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,17,NULL,NULL,NULL,NULL,NULL,NULL),(124,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,17,NULL,NULL,NULL,NULL,NULL,NULL),(125,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,17,NULL,NULL,1,3,NULL,NULL),(126,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,17,NULL,NULL,1,3,NULL,NULL),(127,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,17,NULL,NULL,1,3,NULL,NULL),(128,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,5,NULL,9,NULL,NULL,10,NULL,NULL,11,NULL,NULL,17,NULL,NULL,1,3,NULL,NULL),(129,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,18,NULL,NULL,NULL,NULL,NULL,NULL),(130,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,18,NULL,NULL,NULL,NULL,NULL,NULL),(131,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,18,NULL,NULL,NULL,NULL,NULL,NULL),(132,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,18,NULL,NULL,NULL,NULL,NULL,NULL),(133,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,18,NULL,NULL,1,3,NULL,NULL),(134,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,18,NULL,NULL,1,3,NULL,NULL),(135,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,18,NULL,NULL,1,3,NULL,NULL),(136,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,5,NULL,9,NULL,NULL,10,NULL,NULL,11,NULL,NULL,18,NULL,NULL,1,3,NULL,NULL),(137,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,19,NULL,NULL,NULL,NULL,NULL,NULL),(138,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,19,NULL,NULL,NULL,NULL,NULL,NULL),(139,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,19,NULL,NULL,NULL,NULL,NULL,NULL),(140,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,19,NULL,NULL,NULL,NULL,NULL,NULL),(141,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,19,NULL,NULL,1,3,NULL,NULL),(142,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,19,NULL,NULL,1,3,NULL,NULL),(143,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,19,NULL,NULL,1,3,NULL,NULL),(144,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,5,NULL,19,NULL,NULL,20,NULL,NULL,21,NULL,NULL,19,NULL,NULL,1,3,NULL,NULL),(145,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,20,NULL,NULL,NULL,NULL,NULL,NULL),(146,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,20,NULL,NULL,NULL,NULL,NULL,NULL),(147,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,20,NULL,NULL,NULL,NULL,NULL,NULL),(148,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,20,NULL,NULL,NULL,NULL,NULL,NULL),(149,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,20,NULL,NULL,1,3,NULL,NULL),(150,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,20,NULL,NULL,1,3,NULL,NULL),(151,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,20,NULL,NULL,1,3,NULL,NULL),(152,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,5,NULL,19,NULL,NULL,20,NULL,NULL,21,NULL,NULL,20,NULL,NULL,1,3,NULL,NULL),(153,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,21,NULL,NULL,NULL,NULL,NULL,NULL),(154,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,21,NULL,NULL,NULL,NULL,NULL,NULL),(155,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,21,NULL,NULL,NULL,NULL,NULL,NULL),(156,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,21,NULL,NULL,NULL,NULL,NULL,NULL),(157,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,21,NULL,NULL,1,3,NULL,NULL),(158,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,21,NULL,NULL,1,3,NULL,NULL),(159,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,21,NULL,NULL,1,3,NULL,NULL),(160,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,5,NULL,19,NULL,NULL,20,NULL,NULL,21,NULL,NULL,21,NULL,NULL,1,3,NULL,NULL),(161,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,88,NULL,NULL,0,NULL,NULL,0,NULL,NULL,22,NULL,NULL,NULL,NULL,NULL,NULL),(162,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,0,NULL,NULL,-84,NULL,NULL,0,NULL,NULL,22,NULL,NULL,NULL,NULL,NULL,NULL),(163,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,0,NULL,NULL,-185,NULL,NULL,0,NULL,NULL,22,NULL,162,NULL,NULL,NULL,NULL),(164,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,535,NULL,NULL,0,NULL,NULL,0,NULL,NULL,22,NULL,161,NULL,NULL,NULL,NULL),(165,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,623,NULL,NULL,-84,NULL,NULL,0,NULL,NULL,22,NULL,162,1,5,NULL,NULL),(166,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,623,NULL,NULL,-84,NULL,NULL,0,NULL,NULL,22,NULL,164,1,5,NULL,NULL),(167,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,623,NULL,NULL,-269,NULL,NULL,0,NULL,NULL,22,NULL,163,1,5,NULL,NULL),(168,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,88,NULL,NULL,-84,NULL,NULL,0,NULL,NULL,22,NULL,161,1,5,NULL,NULL),(169,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,144,NULL,NULL,0,NULL,NULL,0,NULL,NULL,23,NULL,NULL,NULL,NULL,NULL,NULL),(170,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,23,NULL,169,NULL,NULL,NULL,NULL),(171,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,304,NULL,NULL,0,NULL,NULL,0,NULL,NULL,23,NULL,169,NULL,NULL,NULL,NULL),(172,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,0,NULL,NULL,-400,NULL,NULL,0,NULL,NULL,23,NULL,NULL,NULL,NULL,NULL,NULL),(173,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,0,NULL,NULL,-87,NULL,NULL,0,NULL,NULL,23,NULL,172,NULL,NULL,NULL,NULL),(174,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,NULL,144,448,NULL,-487,-487,NULL,NULL,NULL,NULL,23,NULL,173,1,5,NULL,NULL),(175,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,NULL,144,144,NULL,-487,-400,NULL,NULL,NULL,NULL,23,NULL,169,1,5,NULL,NULL),(176,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,NULL,144,448,NULL,-400,-400,NULL,NULL,NULL,NULL,23,NULL,172,1,5,NULL,NULL),(177,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,NULL,448,448,NULL,-487,-400,NULL,NULL,NULL,NULL,23,NULL,171,1,5,NULL,NULL),(178,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,88,NULL,NULL,0,NULL,NULL,0,NULL,NULL,22,NULL,NULL,2,5,NULL,NULL),(179,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,88,NULL,NULL,0,NULL,NULL,0,NULL,NULL,22,NULL,161,2,5,NULL,NULL),(180,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,88,NULL,NULL,-84,NULL,NULL,0,NULL,NULL,22,NULL,162,2,5,NULL,NULL),(181,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,1,0,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,22,NULL,NULL,2,5,NULL,NULL),(182,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,99.09091186523438,99.09091186523438,NULL,0,0,NULL,0,0,NULL,25,NULL,NULL,NULL,NULL,NULL,NULL),(183,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,200,200,NULL,0,0,NULL,0,0,NULL,25,NULL,182,NULL,NULL,NULL,NULL),(184,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,201,201,NULL,0,0,NULL,0,0,NULL,25,NULL,183,NULL,NULL,NULL,NULL),(185,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-100.90908813476562,-100.90908813476562,NULL,0,0,NULL,25,NULL,NULL,NULL,NULL,NULL,NULL),(186,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-200,-200,NULL,0,0,NULL,25,NULL,185,NULL,NULL,NULL,NULL),(187,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,99.09091186523438,500.0909118652344,NULL,-100.90908813476562,-100.90908813476562,NULL,0,0,NULL,25,NULL,185,1,1,NULL,NULL),(188,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,500.0909118652344,500.0909118652344,NULL,-100.90908813476562,-300.9090881347656,NULL,0,0,NULL,25,NULL,184,1,1,NULL,NULL),(189,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,500.0909118652344,99.09091186523438,NULL,-300.9090881347656,-300.9090881347656,NULL,0,0,NULL,25,NULL,186,1,1,NULL,NULL),(190,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,99.09091186523438,99.09091186523438,NULL,-300.9090881347656,-100.90908813476562,NULL,0,0,NULL,25,NULL,182,1,1,NULL,NULL),(191,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,123,99,NULL,0,0,NULL,0,0,NULL,26,21,NULL,NULL,NULL,NULL,NULL),(192,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,199,301,NULL,0,0,NULL,0,0,NULL,26,20,191,NULL,NULL,NULL,NULL),(193,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-30,-100,NULL,0,0,NULL,26,23,NULL,NULL,NULL,NULL,NULL),(194,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-430,-203,NULL,0,0,NULL,26,22,193,NULL,NULL,NULL,NULL),(195,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,123,322,NULL,-30,-30,NULL,NULL,NULL,NULL,26,NULL,194,1,5,NULL,NULL),(196,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,123,123,NULL,-30,-30,NULL,NULL,NULL,NULL,26,NULL,191,1,5,NULL,NULL),(197,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,123,322,NULL,-30,-30,NULL,NULL,NULL,NULL,26,NULL,193,1,5,NULL,NULL),(198,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,322,322,NULL,-30,-30,NULL,NULL,NULL,NULL,26,NULL,192,1,5,NULL,NULL),(199,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,123,322,NULL,-30,-30,NULL,NULL,NULL,NULL,26,NULL,194,2,5,NULL,NULL),(200,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,123,123,NULL,-30,-30,NULL,NULL,NULL,NULL,26,NULL,191,2,5,NULL,NULL),(201,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,123,322,NULL,-30,-30,NULL,NULL,NULL,NULL,26,NULL,193,2,5,NULL,NULL),(202,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,322,322,NULL,-30,-30,NULL,NULL,NULL,NULL,26,NULL,192,2,5,NULL,NULL),(203,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,123,322,NULL,-30,-30,NULL,NULL,NULL,NULL,26,NULL,194,3,5,NULL,NULL),(204,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,123,123,NULL,-30,-30,NULL,NULL,NULL,NULL,26,NULL,191,3,5,NULL,NULL),(205,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,123,322,NULL,-30,-30,NULL,NULL,NULL,NULL,26,NULL,193,3,5,NULL,NULL),(206,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,322,322,NULL,-30,-30,NULL,NULL,NULL,NULL,26,NULL,192,3,5,NULL,NULL),(207,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-99,-99,NULL,0,0,NULL,27,NULL,NULL,NULL,NULL,NULL,NULL),(208,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-310,-310,NULL,0,0,NULL,27,NULL,NULL,NULL,NULL,NULL,NULL),(209,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,195,NULL,0,0,NULL,0,0,NULL,27,25,NULL,NULL,NULL,NULL,NULL),(210,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,395,329,NULL,0,0,NULL,0,0,NULL,27,NULL,209,NULL,NULL,NULL,NULL),(211,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,100,100,NULL,-310,-310,NULL,NULL,NULL,NULL,27,NULL,208,1,5,NULL,NULL),(212,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,100,100,NULL,-310,-99,NULL,NULL,NULL,NULL,27,NULL,209,1,5,NULL,NULL),(213,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,100,100,NULL,-99,-99,NULL,NULL,NULL,NULL,27,NULL,207,1,5,NULL,NULL),(214,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,100,100,NULL,-310,-99,NULL,NULL,NULL,NULL,27,NULL,210,1,5,NULL,NULL),(215,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,98.88887023925781,NULL,0,0,NULL,0,0,NULL,28,26,NULL,NULL,NULL,NULL,NULL),(216,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,414,401.8888702392578,NULL,0,0,NULL,0,0,NULL,28,27,NULL,NULL,NULL,NULL,NULL),(217,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-103.09376525878906,-103.09376525878906,NULL,0,0,NULL,28,NULL,NULL,NULL,NULL,NULL,NULL),(218,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-295,-295,NULL,0,0,NULL,28,NULL,217,NULL,NULL,NULL,NULL),(219,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,100,100,NULL,-398.09376525878906,-103.09376525878906,NULL,NULL,NULL,NULL,28,NULL,215,1,1,NULL,NULL),(220,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,414,414,NULL,-103.09376525878906,-103.09376525878906,NULL,NULL,NULL,NULL,28,NULL,217,1,1,NULL,NULL),(221,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,414,414,NULL,-103.09376525878906,-398.09376525878906,NULL,NULL,NULL,NULL,28,NULL,216,1,1,NULL,NULL),(222,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,414,414,NULL,-398.09376525878906,-398.09376525878906,NULL,NULL,NULL,NULL,28,NULL,218,1,1,NULL,NULL),(223,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,50,97.88887023925781,NULL,0,0,NULL,0,0,NULL,29,30,NULL,NULL,NULL,NULL,NULL),(224,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,420,297.8888702392578,NULL,0,0,NULL,0,0,NULL,29,31,NULL,NULL,NULL,NULL,NULL),(225,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-50,-99.09376525878906,NULL,0,0,NULL,29,32,NULL,NULL,NULL,NULL,NULL),(226,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-311,-200,NULL,0,0,NULL,29,33,225,NULL,NULL,NULL,NULL),(227,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,50,420,NULL,-361,-361,NULL,NULL,NULL,NULL,29,NULL,226,1,5,NULL,NULL),(228,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,50,50,NULL,-361,-50,NULL,NULL,NULL,NULL,29,NULL,223,1,5,NULL,NULL),(229,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,50,420,NULL,-50,-50,NULL,NULL,NULL,NULL,29,NULL,225,1,5,NULL,NULL),(230,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,420,420,NULL,-361,-50,NULL,NULL,NULL,NULL,29,NULL,224,1,5,NULL,NULL),(231,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,104.88887023925781,NULL,0,0,NULL,0,0,NULL,30,35,NULL,NULL,NULL,NULL,NULL),(232,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,200,400.8888702392578,NULL,0,0,NULL,0,0,NULL,30,36,NULL,NULL,NULL,NULL,NULL),(233,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-100,-50.09376525878906,NULL,0,0,NULL,30,37,NULL,NULL,NULL,NULL,NULL),(234,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-350,-350,NULL,0,0,NULL,30,NULL,233,NULL,NULL,NULL,NULL),(235,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,100,100,NULL,-100,-100,NULL,NULL,NULL,NULL,30,NULL,231,1,1,NULL,NULL),(236,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,100,200,NULL,-100,-100,NULL,NULL,NULL,NULL,30,NULL,233,1,1,NULL,NULL),(237,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,200,200,NULL,-100,-100,NULL,NULL,NULL,NULL,30,NULL,232,1,1,NULL,NULL),(238,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,200,100,NULL,-400.09376525878906,-400.09376525878906,NULL,NULL,NULL,NULL,30,NULL,234,1,1,NULL,NULL),(239,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,NULL,200,NULL,NULL,-100,NULL,NULL,NULL,NULL,NULL,30,NULL,234,2,23,NULL,NULL),(240,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,NULL,200,NULL,NULL,-100,NULL,NULL,NULL,NULL,NULL,30,NULL,232,2,23,NULL,NULL),(241,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,NULL,200,NULL,NULL,-100,NULL,NULL,NULL,NULL,NULL,30,34,NULL,2,23,NULL,NULL),(242,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,99.88887023925781,99.88887023925781,NULL,0,0,NULL,0,0,NULL,31,NULL,NULL,NULL,NULL,NULL,NULL),(243,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,298,298,NULL,0,0,NULL,0,0,NULL,31,NULL,242,NULL,NULL,NULL,NULL),(244,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-100,-99.09376525878906,NULL,0,0,NULL,31,41,NULL,NULL,NULL,NULL,NULL),(245,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-200,-403.09376525878906,NULL,0,0,NULL,31,42,NULL,NULL,NULL,NULL,NULL),(246,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,99.88887023925781,99.88887023925781,NULL,-200,-100,NULL,NULL,NULL,NULL,31,NULL,242,1,1,NULL,NULL),(247,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,99.88887023925781,397.8888702392578,NULL,-100,-100,NULL,NULL,NULL,NULL,31,NULL,244,1,1,NULL,NULL),(248,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,397.8888702392578,397.8888702392578,NULL,-100,-200,NULL,NULL,NULL,NULL,31,NULL,243,1,1,NULL,NULL),(249,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,397.8888702392578,99.88887023925781,NULL,-200,-200,NULL,NULL,NULL,NULL,31,NULL,245,1,1,NULL,NULL),(250,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,97.88887023925781,NULL,0,0,NULL,0,0,NULL,33,43,NULL,NULL,NULL,NULL,NULL),(251,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,300,201,NULL,0,0,NULL,0,0,NULL,33,44,250,NULL,NULL,NULL,NULL),(252,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-100.09376525878906,-100.09376525878906,NULL,0,0,NULL,33,NULL,NULL,NULL,NULL,NULL,NULL),(253,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-296.09376525878906,-296.09376525878906,NULL,0,0,NULL,33,NULL,NULL,NULL,NULL,NULL,NULL),(254,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,103.88887023925781,NULL,0,0,NULL,0,0,NULL,34,45,NULL,NULL,NULL,NULL,NULL),(255,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,200,293,NULL,0,0,NULL,0,0,NULL,34,46,254,NULL,NULL,NULL,NULL),(256,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-100,-96.09376525878906,NULL,0,0,NULL,34,48,NULL,NULL,NULL,NULL,NULL),(257,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-200,-298.09376525878906,NULL,0,0,NULL,34,49,NULL,NULL,NULL,NULL,NULL),(258,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,100,100,NULL,-200,-100,NULL,NULL,NULL,NULL,34,NULL,257,1,5,NULL,NULL),(259,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,100,300,NULL,-200,-200,NULL,NULL,NULL,NULL,34,NULL,254,1,5,NULL,NULL),(260,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,300,300,NULL,-200,-100,NULL,NULL,NULL,NULL,34,NULL,256,1,5,NULL,NULL),(261,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,100,300,NULL,-100,-100,NULL,NULL,NULL,NULL,34,NULL,255,1,5,NULL,NULL),(262,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,NULL,300,NULL,NULL,-100,NULL,NULL,NULL,NULL,NULL,34,NULL,256,2,23,NULL,NULL),(263,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,NULL,300,NULL,NULL,-100,NULL,NULL,NULL,NULL,NULL,34,NULL,255,2,23,NULL,NULL),(264,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,NULL,300,NULL,NULL,-100,NULL,NULL,NULL,NULL,NULL,34,47,NULL,2,23,NULL,NULL),(265,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,100,98.19999694824219,NULL,0,0,NULL,0,0,NULL,34,45,NULL,NULL,NULL,NULL,NULL),(266,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,200,200,NULL,0,0,NULL,0,0,NULL,34,46,265,NULL,NULL,NULL,NULL),(267,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-98.80000305175781,-98.80000305175781,NULL,0,0,NULL,34,NULL,NULL,NULL,NULL,NULL,NULL),(268,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-299.8000030517578,-299.8000030517578,NULL,0,0,NULL,34,NULL,NULL,NULL,NULL,NULL,NULL),(269,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-498.8000030517578,-498.8000030517578,NULL,0,0,NULL,34,NULL,NULL,NULL,NULL,NULL,NULL),(270,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,100,300,NULL,-498.8000030517578,-498.8000030517578,NULL,0,0,NULL,34,NULL,269,3,5,NULL,NULL),(271,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,100,100,NULL,-498.8000030517578,-299.8000030517578,NULL,0,0,NULL,34,NULL,265,3,5,NULL,NULL),(272,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,100,300,NULL,-299.8000030517578,-299.8000030517578,NULL,0,0,NULL,34,NULL,268,3,5,NULL,NULL),(273,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,300,300,NULL,-498.8000030517578,-299.8000030517578,NULL,0,0,NULL,34,NULL,266,3,5,NULL,NULL),(274,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,23,0,300,0,NULL,-498.8000030517578,0,NULL,0,0,NULL,34,NULL,269,4,23,NULL,NULL),(275,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,23,0,300,0,NULL,-498.8000030517578,0,NULL,0,0,NULL,34,NULL,266,4,23,NULL,NULL),(276,45,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,23,0,300,0,NULL,-498.8000030517578,0,NULL,0,0,NULL,34,47,NULL,4,23,NULL,NULL),(277,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,199,101.19999694824219,NULL,0,0,NULL,0,0,NULL,35,50,NULL,NULL,NULL,NULL,NULL),(278,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,200,197,NULL,0,0,NULL,0,0,NULL,35,51,277,NULL,NULL,NULL,NULL),(279,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-97.80000305175781,-97.80000305175781,NULL,0,0,NULL,35,NULL,NULL,NULL,NULL,NULL,NULL),(280,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-299.8000030517578,-299.8000030517578,NULL,0,0,NULL,35,NULL,NULL,NULL,NULL,NULL,NULL),(281,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,199,199,NULL,-299.8000030517578,-97.80000305175781,NULL,NULL,NULL,NULL,35,NULL,280,1,5,NULL,NULL),(282,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,199,399,NULL,-299.8000030517578,-299.8000030517578,NULL,NULL,NULL,NULL,35,NULL,277,1,5,NULL,NULL),(283,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,399,399,NULL,-299.8000030517578,-97.80000305175781,NULL,NULL,NULL,NULL,35,NULL,279,1,5,NULL,NULL),(284,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,199,399,NULL,-97.80000305175781,-97.80000305175781,NULL,NULL,NULL,NULL,35,NULL,278,1,5,NULL,NULL),(285,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,400,101.19999694824219,NULL,0,0,NULL,0,0,NULL,35,52,NULL,NULL,NULL,NULL,NULL),(286,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,200,197,NULL,0,0,NULL,0,0,NULL,35,52,277,NULL,NULL,NULL,NULL),(287,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-97.80000305175781,-97.80000305175781,NULL,0,0,NULL,35,NULL,NULL,NULL,NULL,NULL,NULL),(288,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-299.8000030517578,-299.8000030517578,NULL,0,0,NULL,35,NULL,NULL,NULL,NULL,NULL,NULL),(289,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,NULL,199,199,NULL,-299.8000030517578,-97.80000305175781,NULL,NULL,NULL,NULL,35,NULL,280,1,5,NULL,NULL),(290,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,NULL,199,399,NULL,-299.8000030517578,-299.8000030517578,NULL,NULL,NULL,NULL,35,NULL,277,1,5,NULL,NULL),(291,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,NULL,399,399,NULL,-299.8000030517578,-97.80000305175781,NULL,NULL,NULL,NULL,35,NULL,279,1,5,NULL,NULL),(292,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,NULL,199,399,NULL,-97.80000305175781,-97.80000305175781,NULL,NULL,NULL,NULL,35,NULL,278,1,5,NULL,NULL),(293,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,102.19999694824219,NULL,0,0,NULL,0,0,NULL,36,53,NULL,NULL,NULL,NULL,NULL),(294,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,200,201,NULL,0,0,NULL,0,0,NULL,36,54,293,NULL,NULL,NULL,NULL),(295,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-100.80000305175781,-100.80000305175781,NULL,0,0,NULL,36,NULL,NULL,NULL,NULL,NULL,NULL),(296,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-298.8000030517578,-298.8000030517578,NULL,0,0,NULL,36,NULL,NULL,NULL,NULL,NULL,NULL),(297,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,100,100,NULL,-298.8000030517578,-100.80000305175781,NULL,NULL,NULL,NULL,36,NULL,296,1,5,NULL,NULL),(298,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,100,300,NULL,-298.8000030517578,-298.8000030517578,NULL,NULL,NULL,NULL,36,NULL,293,1,5,NULL,NULL),(299,90,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,300,300,NULL,-298.8000030517578,-100.80000305175781,NULL,NULL,NULL,NULL,36,NULL,295,1,5,NULL,NULL),(300,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,100,300,NULL,-100.80000305175781,-100.80000305175781,NULL,NULL,NULL,NULL,36,NULL,294,1,5,NULL,NULL),(301,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,102.19999694824219,102.19999694824219,NULL,0,0,NULL,0,0,NULL,36,NULL,NULL,NULL,NULL,NULL,NULL),(302,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,300,299.1999969482422,NULL,0,0,NULL,0,0,NULL,36,55,NULL,NULL,NULL,NULL,NULL),(303,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,400,401.1999969482422,NULL,0,0,NULL,0,0,NULL,36,56,NULL,NULL,NULL,NULL,NULL),(304,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-98.80000305175781,-98.80000305175781,NULL,0,0,NULL,36,NULL,NULL,NULL,NULL,NULL,NULL),(305,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-205,-205,NULL,0,0,NULL,36,NULL,304,NULL,NULL,NULL,NULL),(306,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,300,400,NULL,-303.8000030517578,-303.8000030517578,NULL,0,0,NULL,36,NULL,305,2,5,NULL,NULL),(307,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,300,300,NULL,-303.8000030517578,-98.80000305175781,NULL,0,0,NULL,36,NULL,302,2,5,NULL,NULL),(308,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,300,400,NULL,-98.80000305175781,-98.80000305175781,NULL,0,0,NULL,36,NULL,304,2,5,NULL,NULL),(309,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,400,400,NULL,-303.8000030517578,-98.80000305175781,NULL,0,0,NULL,36,NULL,303,2,5,NULL,NULL),(310,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,0,300,0,NULL,-298.8000030517578,0,NULL,0,0,NULL,36,NULL,296,3,23,NULL,NULL),(311,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,0,300,0,NULL,-298.8000030517578,0,NULL,0,0,NULL,36,NULL,294,3,23,NULL,NULL),(312,45,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,0,300,0,NULL,-298.8000030517578,0,NULL,0,0,NULL,36,57,NULL,3,23,NULL,NULL),(313,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,23,0,400,0,NULL,-303.8000030517578,0,NULL,0,0,NULL,36,NULL,305,4,23,NULL,NULL),(314,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,23,0,400,0,NULL,-303.8000030517578,0,NULL,0,0,NULL,36,NULL,303,4,23,NULL,NULL),(315,45,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,23,0,400,0,NULL,-303.8000030517578,0,NULL,0,0,NULL,36,58,NULL,4,23,NULL,NULL),(316,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,100.09091186523438,NULL,0,0,NULL,0,0,NULL,38,59,NULL,NULL,NULL,NULL,NULL),(317,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,200,301.0909118652344,NULL,0,0,NULL,0,0,NULL,38,60,NULL,NULL,NULL,NULL,NULL),(318,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-102.90908813476562,-102.90908813476562,NULL,0,0,NULL,38,NULL,NULL,NULL,NULL,NULL,NULL),(319,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-297.9090881347656,-297.9090881347656,NULL,0,0,NULL,38,NULL,NULL,NULL,NULL,NULL,NULL),(320,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,200,NULL,-297.9090881347656,-297.9090881347656,NULL,0,0,NULL,38,NULL,319,1,5,NULL,NULL),(321,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,100,NULL,-297.9090881347656,-102.90908813476562,NULL,0,0,NULL,38,NULL,316,1,5,NULL,NULL),(322,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,200,NULL,-102.90908813476562,-102.90908813476562,NULL,0,0,NULL,38,NULL,318,1,5,NULL,NULL),(323,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,200,200,NULL,-297.9090881347656,-102.90908813476562,NULL,0,0,NULL,38,NULL,317,1,5,NULL,NULL),(324,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,100,100.09091186523438,NULL,0,0,NULL,0,0,NULL,38,59,NULL,NULL,NULL,NULL,NULL),(325,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,200,301.0909118652344,NULL,0,0,NULL,0,0,NULL,38,60,NULL,NULL,NULL,NULL,NULL),(326,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-94.90908813476562,-94.90908813476562,NULL,0,0,NULL,38,NULL,NULL,NULL,NULL,NULL,NULL),(327,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-200.90908813476562,-200.90908813476562,NULL,0,0,NULL,38,NULL,NULL,NULL,NULL,NULL,NULL),(328,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-298.9090881347656,-298.9090881347656,NULL,0,0,NULL,38,NULL,NULL,NULL,NULL,NULL,NULL),(329,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,100,200,NULL,-298.9090881347656,-298.9090881347656,NULL,0,0,NULL,38,NULL,328,2,5,NULL,NULL),(330,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,100,100,NULL,-298.9090881347656,-200.90908813476562,NULL,0,0,NULL,38,NULL,324,2,5,NULL,NULL),(331,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,100,200,NULL,-200.90908813476562,-200.90908813476562,NULL,0,0,NULL,38,NULL,327,2,5,NULL,NULL),(332,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,200,200,NULL,-298.9090881347656,-200.90908813476562,NULL,0,0,NULL,38,NULL,325,2,5,NULL,NULL),(333,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,200,99.09091186523438,NULL,0,0,NULL,0,0,NULL,39,61,NULL,NULL,NULL,NULL,NULL),(334,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,400,205,NULL,0,0,NULL,0,0,NULL,39,62,333,NULL,NULL,NULL,NULL),(335,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-96.90908813476562,-96.90908813476562,NULL,0,0,NULL,39,NULL,NULL,NULL,NULL,NULL,NULL),(336,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-299.9090881347656,-0.909088134765625,NULL,0,0,NULL,39,NULL,NULL,NULL,NULL,NULL,NULL),(337,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,103.09091186523438,103.09091186523438,NULL,0,0,NULL,0,0,NULL,39,NULL,NULL,NULL,NULL,NULL,NULL),(338,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,200,101,NULL,0,0,NULL,0,0,NULL,39,61,337,NULL,NULL,NULL,NULL),(339,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,400,99,NULL,0,0,NULL,0,0,NULL,39,62,338,NULL,NULL,NULL,NULL),(340,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-101.90908813476562,-101.90908813476562,NULL,0,0,NULL,39,NULL,NULL,NULL,NULL,NULL,NULL),(341,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-99,-99,NULL,0,0,NULL,39,NULL,340,NULL,NULL,NULL,NULL),(342,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-98,-98,NULL,0,0,NULL,39,NULL,341,NULL,NULL,NULL,NULL),(343,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,303.0909118652344,703.0909118652344,NULL,-298.9090881347656,-298.9090881347656,NULL,0,0,NULL,39,NULL,342,1,5,NULL,NULL),(344,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,303.0909118652344,303.0909118652344,NULL,-298.9090881347656,-200.90908813476562,NULL,0,0,NULL,39,NULL,338,1,5,NULL,NULL),(345,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,303.0909118652344,703.0909118652344,NULL,-200.90908813476562,-200.90908813476562,NULL,0,0,NULL,39,NULL,341,1,5,NULL,NULL),(346,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,703.0909118652344,703.0909118652344,NULL,-298.9090881347656,-200.90908813476562,NULL,0,0,NULL,39,NULL,339,1,5,NULL,NULL),(347,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,200,600,NULL,-299.9090881347656,-299.9090881347656,NULL,0,0,NULL,39,NULL,336,2,5,NULL,NULL),(348,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,200,200,NULL,-299.9090881347656,-96.90908813476562,NULL,0,0,NULL,39,NULL,333,2,5,NULL,NULL),(349,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,200,600,NULL,-96.90908813476562,-96.90908813476562,NULL,0,0,NULL,39,NULL,335,2,5,NULL,NULL),(350,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,600,600,NULL,-299.9090881347656,-96.90908813476562,NULL,0,0,NULL,39,NULL,334,2,5,NULL,NULL),(351,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,40,63,NULL,NULL,NULL,NULL,NULL),(352,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,40,NULL,NULL,NULL,NULL,NULL,NULL),(353,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,40,NULL,NULL,NULL,NULL,NULL,NULL),(354,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,40,63,NULL,NULL,NULL,NULL,NULL),(355,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,41,NULL,NULL,NULL,NULL,NULL,NULL),(356,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,41,NULL,NULL,NULL,NULL,NULL,NULL),(357,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,41,NULL,NULL,NULL,NULL,NULL,NULL),(358,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,41,NULL,NULL,NULL,NULL,NULL,NULL),(359,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,3,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,41,NULL,NULL,1,3,NULL,NULL),(360,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,3,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,41,NULL,NULL,1,3,NULL,NULL),(361,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,3,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,41,NULL,NULL,1,3,NULL,NULL),(362,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,3,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,41,NULL,NULL,1,3,NULL,NULL),(363,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,43,NULL,NULL,NULL,NULL,NULL,NULL),(364,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,43,NULL,NULL,NULL,NULL,NULL,NULL),(365,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,43,NULL,NULL,NULL,NULL,NULL,NULL),(366,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,43,NULL,NULL,NULL,NULL,NULL,NULL),(367,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,44,NULL,NULL,NULL,NULL,NULL,NULL),(368,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,44,NULL,NULL,NULL,NULL,NULL,NULL),(369,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,44,NULL,NULL,NULL,NULL,NULL,NULL),(370,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,44,NULL,NULL,NULL,NULL,NULL,NULL),(371,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,NULL,NULL),(372,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,NULL,NULL),(373,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,NULL,NULL),(374,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,NULL,NULL),(375,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,45,NULL,NULL,1,3,NULL,NULL),(376,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,45,NULL,NULL,1,3,NULL,NULL),(377,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0.1,NULL,NULL,1,NULL,NULL,1.1,NULL,NULL,45,NULL,NULL,1,3,NULL,NULL),(378,NULL,NULL,NULL,NULL,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,5,NULL,19,NULL,NULL,20,NULL,NULL,21,NULL,NULL,45,NULL,NULL,1,3,NULL,NULL),(379,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,46,71,NULL,NULL,NULL,NULL,NULL),(380,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,46,NULL,NULL,NULL,NULL,NULL,NULL),(381,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,46,NULL,NULL,NULL,NULL,NULL,NULL),(382,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,46,71,NULL,NULL,NULL,NULL,NULL),(383,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,47,77,NULL,NULL,NULL,NULL,NULL),(384,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,47,NULL,NULL,NULL,NULL,NULL,NULL),(385,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,47,NULL,NULL,NULL,NULL,NULL,NULL),(386,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,47,77,NULL,NULL,NULL,NULL,NULL),(387,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,48,83,NULL,NULL,NULL,NULL,NULL),(388,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,48,NULL,NULL,NULL,NULL,NULL,NULL),(389,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,48,NULL,NULL,NULL,NULL,NULL,NULL),(390,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,48,83,NULL,NULL,NULL,NULL,NULL),(391,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,49,88,NULL,NULL,NULL,NULL,NULL),(392,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,49,NULL,NULL,NULL,NULL,NULL,NULL),(393,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,49,NULL,NULL,NULL,NULL,NULL,NULL),(394,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,49,88,NULL,NULL,NULL,NULL,NULL),(395,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,49,88,NULL,NULL,NULL,NULL,NULL),(396,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,49,NULL,NULL,NULL,NULL,NULL,NULL),(397,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,49,NULL,NULL,NULL,NULL,NULL,NULL),(398,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,49,88,NULL,NULL,NULL,NULL,NULL),(399,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,50,93,NULL,NULL,NULL,NULL,NULL),(400,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,50,NULL,NULL,NULL,NULL,NULL,NULL),(401,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,50,NULL,NULL,NULL,NULL,NULL,NULL),(402,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,50,93,NULL,NULL,NULL,NULL,NULL),(403,NULL,NULL,NULL,2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,2,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,53,NULL,NULL,NULL,NULL,NULL,NULL),(404,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,103.09091186523438,NULL,0,0,NULL,0,0,NULL,54,94,NULL,NULL,NULL,NULL,NULL),(405,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,200,198,NULL,0,0,NULL,0,0,NULL,54,95,404,NULL,NULL,NULL,NULL),(406,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-100.90908813476562,-100.90908813476562,NULL,0,0,NULL,54,NULL,NULL,NULL,NULL,NULL,NULL),(407,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-101,-101,NULL,0,0,NULL,54,NULL,406,NULL,NULL,NULL,NULL),(408,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-99,-99,NULL,0,0,NULL,54,NULL,407,NULL,NULL,NULL,NULL),(409,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,197,197,NULL,0,0,NULL,0,0,NULL,54,NULL,405,NULL,NULL,NULL,NULL),(410,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,300,NULL,-201.90908813476562,-201.90908813476562,NULL,0,0,NULL,54,NULL,407,1,5,NULL,NULL),(411,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,100,NULL,-201.90908813476562,-100.90908813476562,NULL,0,0,NULL,54,NULL,404,1,5,NULL,NULL),(412,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,300,NULL,-100.90908813476562,-100.90908813476562,NULL,0,0,NULL,54,NULL,406,1,5,NULL,NULL),(413,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,300,300,NULL,-201.90908813476562,-100.90908813476562,NULL,0,0,NULL,54,NULL,405,1,5,NULL,NULL),(414,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,0,497,0,NULL,-300.9090881347656,0,NULL,0,0,NULL,54,NULL,408,2,23,NULL,NULL),(415,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,0,497,0,NULL,-300.9090881347656,0,NULL,0,0,NULL,54,NULL,409,2,23,NULL,NULL),(416,45,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,0,497,0,NULL,-300.9090881347656,0,NULL,0,0,NULL,54,96,NULL,2,23,NULL,NULL),(417,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,98.09091186523438,98.09091186523438,NULL,0,0,NULL,0,0,NULL,54,NULL,NULL,NULL,NULL,NULL,NULL),(418,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,202.09091186523438,202.09091186523438,NULL,0,0,NULL,0,0,NULL,54,NULL,NULL,NULL,NULL,NULL,NULL),(419,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,300.0909118652344,-0.909088134765625,NULL,0,0,NULL,0,0,NULL,54,NULL,NULL,NULL,NULL,NULL,NULL),(420,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-100,-98.90908813476562,NULL,0,0,NULL,54,97,NULL,NULL,NULL,NULL,NULL),(421,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-200,-199.90908813476562,NULL,0,0,NULL,54,98,NULL,NULL,NULL,NULL,NULL),(422,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,0,0,NULL,-296.9090881347656,-296.9090881347656,NULL,0,0,NULL,54,NULL,NULL,NULL,NULL,NULL,NULL),(423,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,23,NULL,98.09091186523438,NULL,NULL,-100,NULL,NULL,NULL,NULL,NULL,54,NULL,420,3,23,NULL,NULL),(424,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,23,NULL,98.09091186523438,NULL,NULL,-100,NULL,NULL,NULL,NULL,NULL,54,NULL,417,3,23,NULL,NULL),(425,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,23,NULL,98.09091186523438,NULL,NULL,-100,NULL,NULL,NULL,NULL,NULL,54,99,NULL,3,23,NULL,NULL),(426,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,202.09091186523438,300.0909118652344,NULL,-296.9090881347656,-296.9090881347656,NULL,0,0,NULL,54,NULL,422,4,5,NULL,NULL),(427,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,202.09091186523438,202.09091186523438,NULL,-296.9090881347656,-200,NULL,0,0,NULL,54,NULL,418,4,5,NULL,NULL),(428,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,202.09091186523438,300.0909118652344,NULL,-200,-200,NULL,0,0,NULL,54,NULL,421,4,5,NULL,NULL),(429,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0,NULL,1,0,300.0909118652344,300.0909118652344,NULL,-296.9090881347656,-200,NULL,0,0,NULL,54,NULL,419,4,5,NULL,NULL),(430,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,103.09091186523438,103.09091186523438,NULL,0,0,NULL,0,0,NULL,55,NULL,NULL,NULL,NULL,NULL,NULL),(431,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,400.0909118652344,400.0909118652344,NULL,0,0,NULL,0,0,NULL,55,NULL,NULL,NULL,NULL,NULL,NULL),(432,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-100.90908813476562,-100.90908813476562,NULL,0,0,NULL,55,NULL,NULL,NULL,NULL,NULL,NULL),(433,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-298.9090881347656,-298.9090881347656,NULL,0,0,NULL,55,NULL,NULL,NULL,NULL,NULL,NULL),(434,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,147,147,NULL,0,0,NULL,0,0,NULL,55,NULL,430,NULL,NULL,NULL,NULL),(435,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-102,-102,NULL,0,0,NULL,55,NULL,433,NULL,NULL,NULL,NULL),(436,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,200.09091186523438,NULL,0,0,NULL,0,0,NULL,59,100,NULL,NULL,NULL,NULL,3),(437,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-100,-198.90908813476562,NULL,0,0,NULL,59,101,NULL,NULL,NULL,NULL,1),(438,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,100,NULL,0,0,NULL,0,0,NULL,59,NULL,NULL,1,1,NULL,NULL),(439,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,100,NULL,0,-100,NULL,0,0,NULL,59,NULL,436,1,1,NULL,NULL),(440,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,100,0,NULL,-100,-100,NULL,0,0,NULL,59,NULL,437,1,1,NULL,NULL),(441,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-100,0,NULL,0,0,NULL,59,NULL,NULL,1,1,NULL,NULL),(442,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,0,100,0,NULL,-100,0,NULL,0,0,NULL,59,NULL,437,2,23,NULL,NULL),(443,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,0,100,0,NULL,-100,0,NULL,0,0,NULL,59,NULL,436,2,23,NULL,NULL),(444,45,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,0,100,0,NULL,-100,0,NULL,0,0,NULL,59,102,NULL,2,23,NULL,NULL),(445,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,98.09091186523438,98.09091186523438,NULL,0,0,NULL,59,NULL,NULL,NULL,NULL,NULL,5),(446,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,102,102,NULL,0,0,NULL,59,NULL,445,NULL,NULL,NULL,5),(447,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,0,0,NULL,-98.90908813476562,-98.90908813476562,NULL,59,NULL,NULL,NULL,NULL,NULL,3),(448,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,0,0,NULL,-101,-101,NULL,59,NULL,447,NULL,NULL,NULL,3),(449,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-98.09091186523438,-98.09091186523438,NULL,-199.90908813476562,-98.90908813476562,NULL,59,NULL,445,3,1,NULL,NULL),(450,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-98.09091186523438,-200.09091186523438,NULL,-98.90908813476562,-98.90908813476562,NULL,59,NULL,447,3,1,NULL,NULL),(451,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-200.09091186523438,-200.09091186523438,NULL,-98.90908813476562,-199.90908813476562,NULL,59,NULL,446,3,1,NULL,NULL),(452,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-200.09091186523438,-98.09091186523438,NULL,-199.90908813476562,-199.90908813476562,NULL,59,NULL,448,3,1,NULL,NULL),(453,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,500,198.09091186523438,NULL,0,0,NULL,0,0,NULL,60,103,NULL,NULL,NULL,NULL,3),(454,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-200,-96.90908813476562,NULL,0,0,NULL,60,104,NULL,NULL,NULL,NULL,1),(455,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,500,NULL,-200,-200,NULL,0,0,NULL,60,NULL,454,1,1,NULL,NULL),(456,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,500,500,NULL,-200,0,NULL,0,0,NULL,60,NULL,453,1,1,NULL,NULL),(457,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,500,0,NULL,0,0,NULL,0,0,NULL,60,NULL,NULL,1,1,NULL,NULL),(458,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,0,-200,NULL,0,0,NULL,60,NULL,NULL,1,1,NULL,NULL),(459,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,0,500,0,NULL,-200,0,NULL,0,0,NULL,60,NULL,454,2,23,NULL,NULL),(460,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,0,500,0,NULL,-200,0,NULL,0,0,NULL,60,NULL,453,2,23,NULL,NULL),(461,45,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,23,0,500,0,NULL,-200,0,NULL,0,0,NULL,60,105,NULL,2,23,NULL,NULL),(462,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,200.09091186523438,200.09091186523438,NULL,0,0,NULL,60,NULL,NULL,NULL,NULL,NULL,5),(463,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,0,0,NULL,-99.90908813476562,-99.90908813476562,NULL,60,NULL,NULL,NULL,NULL,NULL,3),(464,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-200.09091186523438,-200.09091186523438,NULL,0,-99.90908813476562,NULL,60,NULL,462,3,1,NULL,NULL),(465,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-200.09091186523438,0,NULL,-99.90908813476562,-99.90908813476562,NULL,60,NULL,463,3,1,NULL,NULL),(466,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,0,0,NULL,-99.90908813476562,0,NULL,60,NULL,NULL,3,1,NULL,NULL),(467,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,502.0909118652344,502.0909118652344,NULL,0,0,NULL,0,0,NULL,60,NULL,NULL,NULL,NULL,NULL,5),(468,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,0,0,NULL,-102.90908813476562,-102.90908813476562,NULL,60,NULL,NULL,NULL,NULL,NULL,1),(469,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,502.0909118652344,502.0909118652344,NULL,0,0,NULL,0,-102.90908813476562,NULL,60,NULL,467,4,1,NULL,NULL),(470,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,502.0909118652344,0,NULL,0,0,NULL,-102.90908813476562,-102.90908813476562,NULL,60,NULL,468,4,1,NULL,NULL),(471,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,0,0,NULL,-102.90908813476562,0,NULL,60,NULL,NULL,4,1,NULL,NULL),(472,0,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,502.0909118652344,NULL,0,0,NULL,0,0,NULL,60,NULL,NULL,4,1,NULL,NULL),(473,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,98.09091186523438,98.09091186523438,NULL,0,0,NULL,0,0,NULL,61,NULL,NULL,NULL,NULL,NULL,5),(474,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,399.0909118652344,399.0909118652344,NULL,0,0,NULL,0,0,NULL,61,NULL,NULL,NULL,NULL,NULL,5),(475,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,0,0,NULL,-98.90908813476562,-98.90908813476562,NULL,61,NULL,NULL,NULL,NULL,NULL,1),(476,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,0,0,NULL,-299.9090881347656,-299.9090881347656,NULL,61,NULL,NULL,NULL,NULL,NULL,1),(477,90,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,200,203.09091186523438,NULL,0,0,NULL,0,0,NULL,62,106,NULL,NULL,NULL,NULL,3),(478,0,NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-100.90908813476562,-100.90908813476562,NULL,0,0,NULL,62,NULL,NULL,NULL,NULL,NULL,1),(479,90,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,0,0,0,NULL,-100.90908813476562,0,NULL,0,0,NULL,62,NULL,NULL,1,1,NULL,NULL),(480,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,0,200,NULL,0,0,NULL,0,0,NULL,62,NULL,NULL,1,1,NULL,NULL),(481,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,200,200,NULL,0,-100.90908813476562,NULL,0,0,NULL,62,NULL,477,1,1,NULL,NULL),(482,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,1,NULL,200,0,NULL,-100.90908813476562,-100.90908813476562,NULL,0,0,NULL,62,NULL,478,1,1,NULL,NULL);
/*!40000 ALTER TABLE `els_romenext_model_shape` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `els_romenext_mysql_group`
--

DROP TABLE IF EXISTS `els_romenext_mysql_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_mysql_group` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `D` bit(1) DEFAULT NULL,
  `I` bit(1) DEFAULT NULL,
  `S` bit(1) DEFAULT NULL,
  `U` bit(1) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `host` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `els_romenext_mysql_group` WRITE;
INSERT INTO `els_romenext_mysql_group` (`id`,`D`,`I`,`S`,`U`,`created_date`,`host`,`modified_date`,`name`) VALUES 
(1,1,1,1,1,now(),'%',now(),'ROMENEXTAdmin'),
(2,0,0,1,0,now(),'%',now(),'ROMENEXTR'),
(3,0,1,1,0,now(),'%',now(),'ROMENEXTRW'),
(4,0,1,1,1,now(),'%',now(),'ROMENEXTRWU'),
(5,0,1,1,1,now(),'%',now(),'ROMENEXTConfig') ;
UNLOCK TABLES;

--
-- Table structure for table `els_romenext_mysql_group_type`
--

DROP TABLE IF EXISTS `els_romenext_mysql_group_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_mysql_group_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `mysql_group` bigint(20) DEFAULT NULL,
  `rome_type` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_type`) REFERENCES `els_romenext_types` (`id`),
  FOREIGN KEY (`mysql_group`) REFERENCES `els_romenext_mysql_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

-- els_romenext_mysql_group_type has no records

--
-- Table structure for table `els_romenext_neo4j_instances`
--

DROP TABLE IF EXISTS `els_romenext_neo4j_instances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_neo4j_instances` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `username_password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `els_romenext_neo4j_instances`
--

LOCK TABLES `els_romenext_neo4j_instances` WRITE;
/*!40000 ALTER TABLE `els_romenext_neo4j_instances` DISABLE KEYS */;
INSERT INTO `els_romenext_neo4j_instances` (`id`,`description`,`url`,`username_password`) VALUES 
(1,'test_neo4j_server','http://192.168.1.41:7474','bmVvNGo6c3VwZXJtYW4='),
(2,'test_neo4j_server','http://192.168.1.41:7474','bmVvNGo6c3VwZXJtYW4=');
/*!40000 ALTER TABLE `els_romenext_neo4j_instances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `els_romenext_perm_metadata_group_join`
--

DROP TABLE IF EXISTS `els_romenext_perm_metadata_group_join`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_perm_metadata_group_join` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `createdDate` datetime DEFAULT NULL,
  `isOwner` bit(1) DEFAULT NULL,
  `modifiedDate` datetime DEFAULT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `metadata_id` bigint(20) DEFAULT NULL,
  `userGroup_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`metadata_id`) REFERENCES `els_romenext_metadata` (`id`),
  FOREIGN KEY (`userGroup_id`) REFERENCES `els_romenext_perm_user_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `els_romenext_perm_metadata_group_join` WRITE;
/*!40000 ALTER TABLE `els_romenext_perm_metadata_group_join` DISABLE KEYS */;
INSERT INTO `els_romenext_perm_metadata_group_join` (`id`,`createdDate`,`isOwner`,`modifiedDate`,`group_name`,`status`,`metadata_id`,`userGroup_id`) VALUES 
(1,'2016-09-06 14:01:56',0,NULL,NULL,1,1,1),
(2,'2016-09-06 14:01:56',0,NULL,NULL,1,1,3),
(3,'2016-09-06 14:29:58',0,NULL,NULL,1,1,1),
(4,'2016-09-06 14:30:04',0,NULL,NULL,1,1,1),
(5,'2016-09-06 17:18:12',0,NULL,NULL,1,1,4),
(6,'2016-09-20 14:03:05',0,NULL,NULL,1,1,5),
(7,'2016-09-23 14:19:16',0,NULL,NULL,1,1,5);
/*!40000 ALTER TABLE `els_romenext_perm_metadata_group_join` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `els_romenext_perm_user_group`
--

DROP TABLE IF EXISTS `els_romenext_perm_user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_perm_user_group` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `els_romenext_perm_user_group` WRITE;
/*!40000 ALTER TABLE `els_romenext_perm_user_group` DISABLE KEYS */;
INSERT INTO `els_romenext_perm_user_group` (`id`,`created_date`,`enabled`,`group_name`)VALUES 
(1,'2016-09-05 14:06:35',NULL,'Testgroup'),
(2,'2016-09-06 13:53:30',NULL,'AnotherGroup'),
(3,'2016-09-06 13:53:37',NULL,'BoopGroup'),
(4,'2016-09-06 17:17:34',NULL,'newGroup'),
(5,'2016-09-20 14:02:49',NULL,'group100');
/*!40000 ALTER TABLE `els_romenext_perm_user_group` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Table structure for table `els_romenext_perm_user_group_join`
--

DROP TABLE IF EXISTS `els_romenext_perm_user_group_join`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_perm_user_group_join` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isOwner` bit(1) DEFAULT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `userGroup_id` bigint(20) DEFAULT NULL,
  `createdDate` datetime DEFAULT NULL,
  `modifiedDate` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `els_romenext_users` (`id`),
   FOREIGN KEY (`userGroup_id`) REFERENCES `els_romenext_perm_user_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `els_romenext_perm_user_group_join` WRITE;
/*!40000 ALTER TABLE `els_romenext_perm_user_group_join` DISABLE KEYS */;
INSERT INTO `els_romenext_perm_user_group_join` (`id`,`isOwner`,`group_name`,`user_id`,`userGroup_id`,`createdDate`,`modifiedDate`,`status`)VALUES 
(17,0,NULL,1,1,'2016-09-06 14:29:42',NULL,1),
(18,0,NULL,2,1,'2016-09-06 14:29:42',NULL,1),
(19,0,NULL,3,4,'2016-09-06 17:17:46',NULL,1);
/*!40000 ALTER TABLE `els_romenext_perm_user_group_join` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `els_romenext_pref_grouptype_property`
--

DROP TABLE IF EXISTS `els_romenext_pref_grouptype_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_pref_grouptype_property` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `default_value` varchar(255) DEFAULT NULL,
  `design` bit(1) DEFAULT NULL,
  `display` bit(1) DEFAULT NULL,
  `is_hidden` bit(1) DEFAULT NULL,
  `is_required` bit(1) DEFAULT NULL,
  `maximum_value` varchar(255) DEFAULT NULL,
  `minimum_value` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `must_be_unique` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `property_type` int(11) DEFAULT NULL,
  `rome_type` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_type`) REFERENCES `els_romenext_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table `els_romenext_pref_grouptype_property_value`
--

DROP TABLE IF EXISTS `els_romenext_pref_grouptype_property_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_pref_grouptype_property_value` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `value` varchar(255) DEFAULT NULL,
  `rome_pref_property` bigint(20) DEFAULT NULL,
  `rome_group_type` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_group_type`) REFERENCES `els_romenext_mysql_group_type` (`id`),
  FOREIGN KEY (`rome_pref_property`) REFERENCES `els_romenext_pref_grouptype_property` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `els_romenext_rule_decorator_property_value`
--

DROP TABLE IF EXISTS `els_romenext_rule_decorator_property_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_rule_decorator_property_value` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `value` varchar(255) DEFAULT NULL,
  `rome_decorator_property` bigint(20) DEFAULT NULL,
  `rome_rule` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_decorator_property`) REFERENCES `els_romenext_decos_properties` (`id`),
  FOREIGN KEY (`rome_rule`) REFERENCES `els_romenext_rules` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `els_romenext_rule_properties`
--

DROP TABLE IF EXISTS `els_romenext_rule_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_rule_properties` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `default_value` varchar(255) DEFAULT NULL,
  `is_required` bit(1) DEFAULT NULL,
  `maximum_value` varchar(255) DEFAULT NULL,
  `minimum_value` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `must_be_unique` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `property_type` int(11) DEFAULT NULL,
  `rome_rule` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_rule`) REFERENCES `els_romenext_rules` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `els_romenext_rule_properties` (`id`,`created_date`,`default_value`,`is_required`,`maximum_value`,`minimum_value`,`modified_date`,`must_be_unique`,`name`,`property_type`,`rome_rule`) VALUES 
(1,'2017-08-15 14:29:42','rule1',0,10,1,'2017-08-15 14:29:42',0,'name',13,4),
(2,'2017-08-15 14:29:42','rule2',1,10,1,'2017-08-15 14:29:42',1,'name',13,8);


--
-- Table structure for table `els_romenext_rules`
--

DROP TABLE IF EXISTS `els_romenext_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_rules` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `classification` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rule_type` int(11) DEFAULT NULL,
  `metadata_id` bigint(20) DEFAULT NULL,
  `is_internal` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`metadata_id`) REFERENCES `els_romenext_metadata` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `els_romenext_rules` WRITE;
/*!40000 ALTER TABLE `els_romenext_rules` DISABLE KEYS */;
INSERT INTO `els_romenext_rules` (`id`,`classification`,`created_date`,`modified_date`,`name`,`metadata_id`,`is_internal`) VALUES 
(1,2,'2016-06-17 15:13:43','2016-06-17 15:13:43','Rule1',3,0),
(2,2,'2016-06-22 14:12:17','2016-06-22 14:12:17','ffff_MyTesRULE0',1,0),
(3,2,'2016-06-22 14:14:07','2016-06-22 14:14:07','ffff_MyTesRULE1',1,0),
(4,2,'2016-06-22 14:31:08','2016-06-22 14:31:08','ffff_MyTesRULE2',1,0),
(5,2,'2016-06-22 14:53:25','2016-06-22 14:53:25','MyTes_sadfaRULE0',1,0),
(6,2,'2016-06-22 14:53:40','2016-06-22 14:53:40','MyTes_MyTesRULE0',1,0),
(7,2,'2016-06-22 14:53:42','2016-06-22 14:53:42','MyTes_sadfaRULE1',1,0),
(8,2,'2016-06-22 14:53:47','2016-06-22 14:53:47','MyTes_MyTesRULE1',1,0);
/*!40000 ALTER TABLE `els_romenext_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `els_romenext_tabActions`
--

DROP TABLE IF EXISTS `els_romenext_tabActions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_tabActions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `action_label` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `onclick_script` text,
  `metadata_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`metadata_id`) REFERENCES `els_romenext_metadata` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `els_romenext_tabContainers`
--

DROP TABLE IF EXISTS `els_romenext_tabContainers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_tabContainers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `button_label` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `tab_name` varchar(255) DEFAULT NULL,
  `metadata_id` bigint(20) DEFAULT NULL,
  `tab_action` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`tab_action`) REFERENCES `els_romenext_tabActions` (`id`),
  FOREIGN KEY (`metadata_id`) REFERENCES `els_romenext_metadata` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `els_romenext_tabObject_properties`
--

DROP TABLE IF EXISTS `els_romenext_tabObject_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_tabObject_properties` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `rome_typeProperty` bigint(20) DEFAULT NULL,
  `tab_container` bigint(20) DEFAULT NULL,
  `tab_object` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_typeProperty`) REFERENCES `els_romenext_type_properties` (`id`),
  FOREIGN KEY (`tab_container`) REFERENCES `els_romenext_tabContainers` (`id`),
  FOREIGN KEY (`tab_object`) REFERENCES `els_romenext_tabObjects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `els_romenext_tabObjects`
--

DROP TABLE IF EXISTS `els_romenext_tabObjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_tabObjects` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rome_type` bigint(20) DEFAULT NULL,
  `tab_container` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_type`) REFERENCES `els_romenext_types` (`id`),
  FOREIGN KEY (`tab_container`) REFERENCES `els_romenext_tabContainers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `els_romenext_type_decorator_property_value`
--

DROP TABLE IF EXISTS `els_romenext_type_decorator_property_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_type_decorator_property_value` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `value` varchar(255) DEFAULT NULL,
  `rome_decorator_property` bigint(20) DEFAULT NULL,
  `rome_type` bigint(20) DEFAULT NULL,
  `rome_group_type` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_type`) REFERENCES `els_romenext_types` (`id`),
  FOREIGN KEY (`rome_decorator_property`) REFERENCES `els_romenext_decos_properties` (`id`),
  FOREIGN KEY (`rome_group_type`) REFERENCES `els_romenext_mysql_group_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `els_romenext_type_decorator_property_value` WRITE;
INSERT INTO `els_romenext_type_decorator_property_value` (`id`,`value`,`rome_decorator_property`,`rome_type`,`rome_group_type`) VALUES 
(1,'53',1,24,NULL),
(2,'-52.5',2,24,NULL),
(3,'0',3,24,NULL),
(4,'-133.5',1,25,NULL),
(5,'-62.5',2,25,NULL),
(6,'0',3,25,NULL),
(7,'-247.5',1,28,NULL),
(8,'-293',2,28,NULL),
(9,'0',3,28,NULL),
(10,'-475.5',1,29,NULL),
(11,'-109.5',2,29,NULL),
(12,'0',3,29,NULL),
(13,'0',1,3,NULL),
(14,'0',2,3,NULL),
(15,'0',3,3,NULL),
(16,'382.99110809947723',1,4,NULL);
UNLOCK TABLES;

--
-- Table structure for table `els_romenext_type_properties`
--

DROP TABLE IF EXISTS `els_romenext_type_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_type_properties` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `created_version` int(11) DEFAULT NULL,
  `default_value` varchar(255) DEFAULT NULL,
  `is_required` bit(1) DEFAULT NULL,
  `maximum_value` varchar(255) DEFAULT NULL,
  `minimum_value` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `modified_version` int(11) DEFAULT NULL,
  `must_be_unique` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `property_type` int(11) DEFAULT NULL,
  `property_subtype` int(11) DEFAULT NULL,
  `property_subtypeParams` varchar(255) DEFAULT NULL,
  `property_typeParams` varchar(255) DEFAULT NULL,
  `rome_type` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_type`) REFERENCES `els_romenext_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `els_romenext_type_properties` (`id`, `created_date`, `created_version`, `default_value`, `is_required`, `maximum_value`,
 `minimum_value`, `modified_date`, `modified_version`, `must_be_unique`, `name`, `property_type`, `property_subtype`, `property_subtypeParams`, 
 `property_typeParams`, `rome_type`) VALUES
(10, now(), NULL, '123345', 1, NULL, NULL, now(), NULL, 1, 'Name', 13, NULL, NULL, NULL, 109),
(11, now(), NULL, '123345', 0, NULL, NULL, now(), NULL, 1, 'Bay Type', 13, NULL, NULL, NULL, 109),
(13, now(), NULL, '123345', 0, NULL, NULL, now(), NULL, 1, 'Serial#', 13, NULL, NULL, NULL, 110);

--
-- Table structure for table `els_romenext_types`
--

DROP TABLE IF EXISTS `els_romenext_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_types` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `classification` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `is_internal` tinyint(1) DEFAULT NULL,
  `is_root_type` bit(1) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `restrictionStatus` int(11) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  `metadata_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`metadata_id`) REFERENCES `els_romenext_metadata` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `els_romenext_types` ( `classification`, `created_date`, `is_internal`, `is_root_type`, `modified_date`, `name`, `restrictionStatus`, `version`, `metadata_id`) VALUES 
( '17', now(), '1', '1', now(), '_WORKSPACE', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE2', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE3', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE4', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE5', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE6', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE7', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE8', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE9', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE10', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE11', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE12', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE13', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE14', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE15', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE16', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE17', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE18', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE19', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE20', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE21', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE22', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE23', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE24', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE25', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE26', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE27', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE28', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE29', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE30', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE31', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE32', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE33', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE34', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE35', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE36', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE37', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE38', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE39', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE40', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE41', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE42', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE43', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE44', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE45', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE46', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE47', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE48', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE49', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE50', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE51', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE52', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE53', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE54', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE55', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE56', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE57', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE58', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE59', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE60', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE61', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE62', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE63', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE64', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE65', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE66', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE67', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE68', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE69', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE70', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE71', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE72', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE73', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE74', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE75', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE76', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE77', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE78', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE79', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE80', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE81', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE82', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE83', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE84', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE85', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE86', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE87', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE88', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE89', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE90', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE91', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE92', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE93', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE94', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE95', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE96', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE97', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE98', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE99', '1', NULL, '1'),
( '1', now(), '1', '1', now(), '_TEMP_TYPE100', '1', NULL, '1');




--
-- Table structure for table `els_romenext_types_els_romenext_decos`
--

DROP TABLE IF EXISTS `els_romenext_types_els_romenext_decos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_types_els_romenext_decos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rome_decorator` bigint(20) DEFAULT NULL,
  `rome_type` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_type`) REFERENCES `els_romenext_types` (`id`),
  FOREIGN KEY (`rome_decorator`) REFERENCES `els_romenext_decos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `els_romenext_types_els_romenext_decos` WRITE;
/*!40000 ALTER TABLE `els_romenext_types_els_romenext_decos` DISABLE KEYS */;
INSERT INTO `els_romenext_types_els_romenext_decos` (`id`,`rome_decorator`,`rome_type`) VALUES 
(1,1,3),(2,2,3),(3,3,3),(4,4,3),(5,1,4),(6,2,4),(7,3,4),(8,4,4);
UNLOCK TABLES;

--
-- Table structure for table `els_romenext_user_log`
--

DROP TABLE IF EXISTS `els_romenext_user_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_user_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `last_login_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `user_uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `els_romenext_users`
--

DROP TABLE IF EXISTS `els_romenext_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pw` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `redirect_ip` varchar(255) DEFAULT NULL,
  `is_redirected` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `els_romenext_users` WRITE;
/*!40000 ALTER TABLE `els_romenext_users` DISABLE KEYS */;
INSERT INTO `els_romenext_users` (`id`,`pw`,`username`,`created_date`,`modified_date`,`status`,`name`,`redirect_ip`,`is_redirected`) VALUES 
(1,'user','myuser',now(),now(),'666','myuser','192.168.1.23',0),
(2,'test','Anotheruser',now(),now(),'666','Anotheruser','192.168.1.23',0),
(3,'test','Anotheruser',now(),now(),'666','Anotheruser','192.168.1.23',0);
UNLOCK TABLES;

--
-- Table structure for table `els_romenext_users_admin`
--

DROP TABLE IF EXISTS `els_romenext_users_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_users_admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pw` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `els_romenext_version`
--

DROP TABLE IF EXISTS `els_romenext_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_version` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `build` bigint(20) DEFAULT NULL,
  `changes` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `latest_sql_file` varchar(255) DEFAULT NULL,
  `major` bigint(20) DEFAULT NULL,
  `minor` bigint(20) DEFAULT NULL,
  `rev` bigint(20) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `els_romenext_version` (`id`,`build`,`changes`,`description`,`latest_sql_file`,`major`,`minor`,`rev`,`tag`,`created_date`) VALUES 
(1,0,'Initial Setup','The first system setup','1.0.0.SQL.rn',1,0,0,'RMNXT1002018','2018-03-20 22:04:03');


--
-- Table structure for table `els_romenext_workspace_dislay`
--

DROP TABLE IF EXISTS `els_romenext_workspace_dislay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `els_romenext_workspace_dislay` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_group` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `workspace` mediumtext,
  `rome_repo` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`rome_repo`) REFERENCES `els_romenext_metadata_repo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;







-- Deco properties




-- Deco version





 




/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-20 14:31:29
