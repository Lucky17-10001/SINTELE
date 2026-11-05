DROP DATABASE IF EXISTS sintele;
CREATE DATABASE sintele;
USE sintele;

CREATE TABLE aluno (
    id_aluno INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE professor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(200) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    especialidade VARCHAR(68) NOT NULL
);

CREATE TABLE aulas (
    id int primary key not null,
    titulo varchar(40) not null,
    descricao varchar(100),
    materia varchar(70),
    duracao DATE not null default(CURDATE()),
    id_professor int not null
);

CREATE TABLE atividade (
    id int primary key auto_increment not null,
    titulo varchar(80) not null,
    descricao text not null,
    data_entrega date not null default(CURDATE())
);

CREATE TABLE video (
    id int primary key auto_increment not null,
    video_url text not null
);

CREATE TABLE materia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(80) NOT NULL,
    descricao TEXT NOT NULL,
    capitulo VARCHAR(30) NOT NULL,
    id_professor INT NOT NULL,
    FOREIGN KEY (id_professor) REFERENCES professor(id)
);

CREATE TABLE aulas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(80) NOT NULL,
    descricao TEXT,
    data_aula DATE NOT NULL,
    id_materia INT NOT NULL,
    FOREIGN KEY (id_materia) REFERENCES materia(id)
);

CREATE TABLE atividade (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(80) NOT NULL,
    descricao TEXT NOT NULL,
    data_entrega DATE NOT NULL,
    id_professor INT NOT NULL,
    FOREIGN KEY (id_professor) REFERENCES professor(id)
);

CREATE TABLE entrega (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_aluno INT NOT NULL,
    id_atividade INT NOT NULL,
    resposta TEXT NOT NULL,
    nota DECIMAL(5,2),
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_aluno) REFERENCES aluno(id),
    FOREIGN KEY (id_atividade) REFERENCES atividade(id)
);

CREATE TABLE video (
    id INT PRIMARY KEY AUTO_INCREMENT,
    video_url TEXT NOT NULL,
    id_aula INT NOT NULL,
    FOREIGN KEY (id_aula) REFERENCES aulas(id)
);

CREATE TABLE contato (
    id INT PRIMARY KEY AUTO_INCREMENT,
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