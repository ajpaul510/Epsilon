
DROP DATABASE if exists Epsilon;

CREATE DATABASE Epsilon;

USE Epsilon;

CREATE TABLE User_Accounts (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    primary key(user_id)
);


CREATE TABLE User_Info (
    user_id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
    image_path VARCHAR(1024),
    FOREIGN KEY(user_id) REFERENCES User_Accounts(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE User_Posts (
    user_id INT,
    post_id INT NOT NULL AUTO_INCREMENT,
    image_path VARCHAR(1024),
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(post_id),
    FOREIGN KEY(user_id) REFERENCES User_Info(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE User_Comments (
    user_id INT,
    post_id INT,
    com_id INT NOT NULL AUTO_INCREMENT,
    comment varchar(300) NOT NULL,
    reply_to_com INT,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(com_id),
    FOREIGN KEY(post_id) REFERENCES User_Posts(post_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES User_Info(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE User_Following (
    user_id INT,
    following_id INT,
    FOREIGN KEY(user_id) REFERENCES User_Info(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(following_id) REFERENCES User_Info(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);
