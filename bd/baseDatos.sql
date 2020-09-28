DROP TABLE orders_products;
DROP TABLE products;
DROP TABLE orders;
DROP TABLE users;

CREATE DATABASE  IF NOT EXISTS `delilah`;
USE `delilah`;

CREATE TABLE IF NOT EXISTS `delilah`.`users` (
    id              INT unsigned auto_increment primary key,
    fullName        VARCHAR(80) NOT NULL,
    user            VARCHAR(80) NOT NULL,
    email           VARCHAR(40) NOT NULL,
    password        VARCHAR(250) NOT NULL,
    numberPhone     VARCHAR(30) NOT NULL,
    address         VARCHAR(150) NOT NULL,
    active          BOOLEAN  DEFAULT TRUE,
    isAdmin         BOOLEAN  DEFAULT FALSE,
    dateCreate      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    dateUpdate      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)ENGINE=InnoDB; 

CREATE TABLE IF NOT EXISTS `delilah`.`Products` (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    productName     VARCHAR(50) NOT NULL,
    description     VARCHAR(255) NOT NULL,
    photo           VARCHAR(255) NOT NULL,
    stock           BOOLEAN NOT NULL DEFAULT TRUE,
    price           INT NOT NULL,
    dateCreate      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    dateUpdate      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP      
)ENGINE = InnoDB; 

CREATE TABLE IF NOT EXISTS `delilah`.`orders` (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userId          INT UNSIGNED NOT NULL,
    total           INT NOT NULL,
    payment         ENUM('Efectivo','Cash') NOT NULL DEFAULT 'Efectivo',
    status          ENUM('a Confirmar','Preparacion', 'En camino', 'Cancelado') NOT NULL DEFAULT 'a Confirmar',
    dateCreate      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    dateUpdate      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY(userId) REFERENCES users(id)       
)ENGINE = InnoDB; 

CREATE TABLE IF NOT EXISTS `delilah`.`orders_Products` (
    orderIdProductId INT PRIMARY KEY AUTO_INCREMENT,
    orderID          INT NOT NULL,
    productID        INT NOT NULL,
    quantityProd     INT NOT NULL,
    priceTotal       INT NOT NULL,
    dateCreate       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    dateUpdate       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY(orderID) REFERENCES orders(id),
    FOREIGN KEY(productID) REFERENCES products(id)
) ENGINE = InnoDB;

INSERT INTO `delilah`.`users`(id, fullName,user,email,password,numberPhone,address,active,isAdmin,dateCreate,dateUpdate )
VALUES(null,'Jorge Mario Benjumea','JorgeM','jorgembenjumea@gmail.com','marionosi','31922806451','Calle 14 n 112 31',TRUE, TRUE,'2020-05-29 01:03:26','2020-05-29 01:03:26'),
(null,"Maik Benjume^2","MaikPichuChuchu", "Maik@gmail.com","marionosi", "310 ","Calle 14 n 112 31",TRUE, FALSE,'2020-05-29 01:03:26','2020-05-29 01:03:26'),
(null,"Santiago Cuartas","Santi", "santiCuartas@gmail.com","marionosi", "310 344 22 32 ","Calle 15 n 112 31",TRUE, FALSE,'2020-05-29 01:03:26','2020-05-29 01:03:26'),
(null,"Dora Bibiana","BibiB", "bibiBonita@gmail.com","marionosi", "310 788 43 22 ","Calle 16 n 112 31",TRUE, FALSE,'2020-05-29 01:03:26','2020-05-29 01:03:26'),
(null,"Juliana Benjumea", "JuliProfe", "Julianita@gmail.com", "marionosi","319 319 ", "Calle 17 n 112 31" ,TRUE, FALSE,'2020-05-29 01:03:26','2020-05-29 01:03:26');

INSERT INTO `delilah`.`Products`(id,productName,description,photo,stock,price,dateCreate,dateUpdate)
VALUES(null,'Hamburgueza Americana','Rica Hamburguesa con Doble jamon','http://hamburguesa/foto',3,12000,'2020-05-29 01:03:26','2020-05-29 01:03:26'),
(null,'Arroz con Pollo','El mejor arroz con pollo de la ciudad','http://arrroz/foto',4,3000,'2020-05-29 01:03:26','2020-05-29 01:03:26'),(null,'Gaseosa','Productos postobon','http://gaseosa/foto',12,1200,'2020-05-29 01:03:26','2020-05-29 01:03:26'),
(null,"Perro Super  Caliente", "Delicioso perro Super caliente con salchicha americana", "http://Perro/foto", 10,  6000,"2020-05-29 01:03:26",'2020-05-29 01:03:26'),
(null,'Jugo Natural','Super Jugo en Agua','http://JugoEnAgua/',2,3400,'2020-05-29 11:03:26','2020-05-29 01:03:26');

INSERT INTO `delilah`.`orders`(id,userId, total, payment, status)
VALUES(null,2,3400,'efectivo','Preparacion'),(null,2,3400,'efectivo','Preparacion'),
(null,3,3400,'efectivo','Preparacion'),(null,3,3400,'efectivo','Preparacion'),
(null,4,9500,'efectivo','Preparacion'),(null,4,4400,'efectivo','a Confirmar'),
(null,5,1400,'efectivo','a Confirmar'),(null,5,5400,'efectivo','Preparacion');

