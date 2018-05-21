--
--  TODO:
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
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    primary key(user_id, username)
)ENGINE=InnoDB;

CREATE TABLE User_Info (
    user_id INT NOT NULL auto_increment,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
    phone CHAR(10),
    image_path VARCHAR(1024),
    PRIMARY KEY(user_id),
    FOREIGN KEY(user_id) REFERENCES User_Accounts(user_id) ON DELETE CASCADE
)ENGINE=InnoDB;

CREATE TABLE User_Posts (
    user_id INT NOT NULL,
    post_id INT NOT NULL AUTO_INCREMENT,
    image_path VARCHAR(1024),
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(post_id),
    FOREIGN KEY(user_id) REFERENCES User_Info(user_id) ON DELETE CASCADE
)ENGINE=InnoDB;

CREATE TABLE User_Comments (
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    com_id INT NOT NULL AUTO_INCREMENT,
    comment char(255) NOT NULL,
    reply_to_com INT,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(com_id),
    FOREIGN KEY(post_id) REFERENCES User_Posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES User_Info(user_id) ON DELETE CASCADE
)ENGINE=InnoDB;

CREATE TABLE User_Following (
    user_id INT NOT NULL,
    following_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES User_Info(user_id) ON DELETE CASCADE,
    FOREIGN KEY(following_id) REFERENCES User_Info(user_id) ON DELETE CASCADE
)ENGINE=InnoDB;
