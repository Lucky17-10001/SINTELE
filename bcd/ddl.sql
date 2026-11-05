DROP DATABASE IF EXISTS sintele;

CREATE DATABASE sintele;

USE sintele;

CREATE TABLE aluno (
<<<<<<< HEAD
    id_aluno INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE professor (
    id_professor INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(200) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    especialidade VARCHAR(68) NOT NULL
=======
    id_aluno int primary key not null auto_increment,
    nome varchar(40) not null,
    email varchar(200) not null,
    senha varchar(100) not null
);

CREATE TABLE professor (
    id_professor int primary key not null,
    email varchar(100) not null,
    nome varchar(100) not null,
    especialidade varchar(68) not null
);

CREATE TABLE aulas (
    id_aula int primary key not null,
    titulo varchar(40) not null,
    descricao varchar(100),
    materia varchar(70),
    duracao DATE not null default(CURDATE()),
    id_professor int not null
);

CREATE TABLE atividade (
    id_atividade int primary key auto_increment not null,
    titulo varchar(80) not null,
    descricao text not null,
    data_entrega date not null default(CURDATE())
);

CREATE TABLE video (
    id_video int primary key auto_increment not null,
    video_url text not null
>>>>>>> dd23b2a4f20f7a33cafec235f9d2efc5b43f7490
);

CREATE TABLE materia (
    id_materia INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(80) NOT NULL,
    descricao TEXT NOT NULL,
    capitulo VARCHAR(30) NOT NULL,
    id_professor INT NOT NULL,

    FOREIGN KEY (id_professor)
        REFERENCES professor(id_professor)
);

CREATE TABLE aulas (
    id_aula INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(80) NOT NULL,
    descricao TEXT,
    data_aula DATE NOT NULL,
    id_materia INT NOT NULL,

    FOREIGN KEY (id_materia)
        REFERENCES materia(id_materia)
);

CREATE TABLE atividade (
    id_atividade INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(80) NOT NULL,
    descricao TEXT NOT NULL,
    data_entrega DATE NOT NULL,
    id_professor INT NOT NULL,

    FOREIGN KEY (id_professor)
        REFERENCES professor(id_professor)
);

CREATE TABLE entrega (
    id_entrega INT PRIMARY KEY AUTO_INCREMENT,
    id_aluno INT NOT NULL,
    id_atividade INT NOT NULL,
    resposta TEXT NOT NULL,
    nota DECIMAL(5,2),
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_aluno)
        REFERENCES aluno(id_aluno),

    FOREIGN KEY (id_atividade)
        REFERENCES atividade(id_atividade),

    UNIQUE (id_aluno, id_atividade)
);

CREATE TABLE video (
    id_video INT PRIMARY KEY AUTO_INCREMENT,
    video_url TEXT NOT NULL,
    id_aula INT NOT NULL,

    FOREIGN KEY (id_aula)
        REFERENCES aulas(id_aula)
);

CREATE TABLE contato (
    id_contato INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

SHOW TABLES;

DESCRIBE aluno;
DESCRIBE professor;
DESCRIBE materia;
DESCRIBE aulas;
DESCRIBE atividade;
DESCRIBE entrega;
DESCRIBE video;
DESCRIBE contato;