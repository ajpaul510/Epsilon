--
--  TODO:
--      1. Normalize User_info table.
--          Maybe create seperate tables for
--          f_name/l_name, phone_num, email, phone.
--
--      2.If we have time, what about WAL (write ahead logging)? Can we setup the path to log files
--        in our current directory?
--
--          "SHOW varibles" this SQL command will show all global varibles, including path to log files.
--              change those file paths to current directory.

DROP DATABASE if exists Epsilon;

CREATE DATABASE Epsilon;

USE Epsilon;

CREATE TABLE User_Accounts (
    user_id INT NOT NULL auto_increment,
    username VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    primary key(user_id, username)
)ENGINE=InnoDB;

CREATE TABLE User_Info (
    user_id INT NOT NULL auto_increment,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    phone CHAR(10),
    image_path VARCHAR(1024),
    PRIMARY KEY(user_id),
    FOREIGN KEY(user_id) REFERENCES User_Accounts(user_id) ON DELETE CASCADE
)ENGINE=InnoDB;

CREATE TABLE User_Posts (
    user_id INT not null,
    post_id INT not null auto_increment,
    image_path VARCHAR(1024),
    likes INT,
    dislikes INT,
    PRIMARY KEY(post_id),
    FOREIGN KEY(user_id) REFERENCES User_Info(user_id) ON DELETE CASCADE
)ENGINE=InnoDB;
