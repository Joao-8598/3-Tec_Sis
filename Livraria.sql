CREATE TABLE livros (
	id_livro int not null auto_increment,
    nome_livro varchar(100) not null,
    nome_autor varchar(100) not null,
    editora varchar(100) not null,
    categoria varchar(100) not null,
    preço decimal (5,2) not null,
    
    primary key (id_livro)
);

create table estoque (
	id_livro int not null,
    qtd_estoque int not null,
    
    primary key (id_livro)
);

create table vendedor (
    id_vendedor int not null,
    nome_vendedor varchar(255) not null,
    
    primary key (id_vendedor)
);

create table vendas (
	id_livro int not null,
    id_pedido int not null,
    id_vendedor int not null,
    qtd_vendida int not null,
    data_venda datetime not null,
    
    primary key	(id_vendedor, id_pedido)
);

create table autores (
	id_autor int not null auto_increment,
    nome_autor varchar(100) not null,
    sobrenome_autor varchar(100),
    idade int not null,
    estado varchar(100) not null,
    pais varchar(100) not null,
    
    primary key	(id_autor)
);

alter table vendas add constraint chaveEx_vendas_livros
foreign key (id_livro)
references livros (id_livro)
on delete no action
on update no action;

alter table estoque add constraint chaveEx_estoque_livros
foreign key (id_livro)
references livros (id_livro)
on delete no action
on update no action;

alter table vendas add constraint chaveEx_vendas_vendedores
foreign key (id_vendedor)
references vendedor (id_vendedor)
on delete no action
on update no action;

desc livros;

set foreign_key_checks = 0;

insert into livros values (
	null, "A Volta ao Mundo em 80 Dias", "Júlio Verne", "Principis", "Aventura", 21.99,
	null, "O Cortico", "Aluísio de Azevedo", "Panda Books", "Romance", 47.8, 
	null, "Dom Casmurro", "Machado de Assis", "Via Leitura", "Romance", 19.90, 
	null, "Memórias Póstumas de Brás Cubas", "Machado de Assis", "Antofágica", "Romance", 45,
	null, "Quincas Borba", "Machado de Assis", "L&PM Editores", "Romance", 48.5, 
	null, "Ícaro", "Gabriel Pedrosa", "Ateliê", "Poesia", 36, 
	null, "Os Lusíadas", "Luís Vaz de Camões", "Montecristo", "Poesia", 18.79, 
	null, "Outros Jeitos de Usar a Boca", "Rupi Kaur", "Planeta", "Poesia", 34.8,
	null, "Eu sou Malala", "Malala Yousafzai", "Companhia das Letras", "Biografia", 22.32, 
	null, "Minha História", "Michelle Obama", "Objetiva", "Biografia", 57.90, 
	null, "Diário de Anne Frank", "Anne Frank", "Cia da Letra", "Biografia", 34.9
);

insert into autores values (
    null, "Allan", "Paul", 43, "California", "EUA",
    null, "Júlio", "Verne", 77, "Loire-Atlantique", "FR",
    null, "Panda", "Books",25,  "São Paulo", "BR",
    null, "Via", "Leitura",
    null, "Machado", "de Assis",
    null, "L&PM", "Editores",
    null, "Poesia", null,
    null, "Montecristo", null,
    null, "Rupi", "Kaur",
    null, "Companhia", "das Letras",
    null, "Objetiva", null,
    null, "Cia", "da Letra"
);

desc vendas;

ALTER TABLE vendas MODIFY column data_venda DATE;

INSERT INTO vendedor 
VALUES
(1,'Paula Rabelo'),
(2,'Juliana Macedo'),
(3,'Roberto Barros'),
(4,'Barbara Jales');

INSERT INTO vendas VALUES 
(1, 3, 7, 1, 20201102),
(2, 4, 8, 2, 20201102),
(3, 4, 4, 3, 20201102),
(4, 1, 7, 1, 20201103),
(5, 1, 6, 3, 20201103),
(6, 1, 9, 2, 20201104),
(7, 4, 1, 3, 20201104),
(8, 1, 5, 2, 20201105),
(9, 1, 2, 1, 20201105),
(10, 3, 8, 2, 20201111),
(11, 1, 1, 4, 20201111),
(12, 2, 10, 10, 20201111);

INSERT INTO ESTOQUE VALUES
(1,  7),
(2,  10),
(3,  2),
(8,  4),
(10, 5),
(11, 3),
(12, 3);

select * from livros
where categoria = 'Biografia' and preço < 48;

delete from livros
where id_livro = 8;

update livros
set preço = 0.9 * preço
where id_livro > 0;
