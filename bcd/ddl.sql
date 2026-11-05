DROP DATABASE IF EXISTS sintele;

CREATE DATABASE sintele;

use sintele;

CREATE TABLE aluno (
    id_aluno int primary key not null auto_increment,
    nome varchar(40) not null,
    email varchar(200) not null,
    senha varchar(100) not null
);

CREATE TABLE aulas (
    id_aula int primary key not null,
    titulo varchar(40) not null,
    descricao varchar(100),
    materia varchar(70),
    duracao DATE not null default(CURDATE()),
    id_professor int not null
);

CREATE TABLE professor (
    id_professor int primary key not null,
    email varchar(100) not null,
    nome varchar(100) not null,
    especialidade varchar(68) not null
);
CREATE TABLE atividade (
    id_atividade int primary key auto_increment not null,
    titulo varchar(80) not null,
    descricao text,
    data_entrega date not null default(CURDATE())
);
CREATE TABLE video (
    id_video int primary key auto_increment not null,
    video_url text not null
)

describe aulas;
describe professor;
<<<<<<< HEAD
=======
describe aluno;

>>>>>>> 32bb3eb2d65ceceb774c89f0f92c6db67709d66a
show tables;