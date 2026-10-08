DROP DATABASE IF EXISTS usuarios;

CREATE DATABASE ;

USE pedidos;

CREATE TABLE aluno (
    id_aluno int primary key not null auto_increment,
    nome varchar(40) not null,
    email varchar(200) not null,
    senha varchar(100) not null,
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

alter table aluno add constraint eh foreign key (id_aluno) references aluno(id);
alter table professor add constraint possui foreign key (id_professor) references professores(id);

describe alunos;
describe aulas;
describe professores;
show tables;