CREATE TABLE users(
    id INT AUTO_INCREMENT,
    username VARCHAR(80),
    password VARCHAR(20),
    category INT,
    status INT,
    UNIQUE(username),
    PRIMARY KEY(id)
);

CREATE TABLE engineers(
    id INT AUTO_INCREMENT,
    name VARCHAR(80),
    date_of_birth DATE,
    email VARCHAR(80),
    phone_number VARCHAR(20),
    location VARCHAR(40),
    skill VARCHAR(255),
    showcase VARCHAR(255),
    description VARCHAR(255),
    date_created DATE,
    date_updated DATE,
    created_by VARCHAR(80),
    gender INT,
    PRIMARY KEY(id)
);

CREATE TABLE companies(
    id INT AUTO_INCREMENT,
    name VARCHAR(80),
    email VARCHAR(80),
    phone_number VARCHAR(20),
    location VARCHAR(40),
    required_skill VARCHAR(255),
    description VARCHAR(255),
    logo VARCHAR(255),
    date_created DATE,
    date_updated DATE,
    created_by VARCHAR(80),
    PRIMARY KEY(id)
);

CREATE TABLE tokens(
	id INT AUTO_INCREMENT,
	token VARCHAR(255),
    status INT,
	UNIQUE(token),
    status INT,
	PRIMARY KEY(id)
);

CREATE TABLE projects(
    id INT AUTO_INCREMENT,
	name VARCHAR(255),
    skill VARCHAR(255),
	description VARCHAR(255),
    id_engineer INT,
    id_company INT,
    done INT,
    price INT,
	PRIMARY KEY(id)
);

