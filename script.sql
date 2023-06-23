DROP TABLE tb_usuario_grupo;
DROP TABLE tb_permissao;
DROP TABLE tb_membro;
DROP TABLE tb_dizimo;
DROP TABLE tb_oferta;
DROP TABLE tb_congregacao;
DROP TABLE tb_obreiro;
DROP TABLE tb_documento;
DROP TABLE tb_usuario;
DROP TABLE tb_grupo;
DROP TABLE tb_sede;
DROP TABLE tb_funcao;
DROP TABLE tb_pessoa;
DROP TABLE tb_tela;
DROP TABLE tb_tipo_documento;

DROP SEQUENCE seq_tb_pessoa_id;
DROP SEQUENCE seq_tb_membro_id;
DROP SEQUENCE seq_tb_obreiro_id;
DROP SEQUENCE seq_tb_funcao_id;
DROP SEQUENCE seq_tb_usuario_id;
DROP SEQUENCE seq_tb_grupo_id;
DROP SEQUENCE seq_tb_tela_id;
DROP SEQUENCE seq_tb_congregacao_id;
DROP SEQUENCE seq_tb_sede_id;
DROP SEQUENCE seq_tb_dizimo_id;
DROP SEQUENCE seq_tb_oferta_id;
DROP SEQUENCE seq_tb_documento_id;
DROP SEQUENCE seq_tb_tipo_documento_id;

-----------------------------------------------------------------------------------------------------------------------

CREATE TABLE tb_pessoa (
  id_pessoa NUMBER NOT NULL,
  nome VARCHAR2(60),
  cpf NUMBER(11) NOT NULL,
  rg NUMBER(9),
  sexo VARCHAR2(1) CHECK (sexo IN ('M', 'F')),
  email VARCHAR2(100),
  ddd NUMBER(2),
  telefone NUMBER(9),
  endereco VARCHAR2(100),
  num_endereco NUMBER,
  bairro VARCHAR2(60),
  complemento VARCHAR2(60),
  cidade VARCHAR2(60),
  uf VARCHAR2(2),
  cep NUMBER(8)
);

CREATE TABLE tb_membro (
  id_membro NUMBER NOT NULL,
  id_pessoa NUMBER,
  id_congregacao NUMBER
);

CREATE TABLE tb_obreiro (
  id_obreiro NUMBER NOT NULL,
  id_pessoa NUMBER,
  id_funcao NUMBER
);

CREATE TABLE tb_funcao (
  id_funcao NUMBER NOT NULL,
  descricao_funcao VARCHAR2(60)
);

CREATE TABLE tb_usuario (
  id_usuario NUMBER NOT NULL,
  id_pessoa NUMBER,
  usuario VARCHAR2(60),
  senha VARCHAR2(60)
);

CREATE TABLE tb_usuario_grupo (
  id_usuario NUMBER NOT NULL,
  id_grupo NUMBER NOT NULL
);

CREATE TABLE tb_grupo (
  id_grupo NUMBER NOT NULL,
  descricao_grupo VARCHAR2(60)
);

CREATE TABLE tb_permissao (
  id_grupo NUMBER NOT NULL,
  id_tela NUMBER NOT NULL,
  ler VARCHAR2(1) CHECK (ler IN ('S', 'N')),
  gravar VARCHAR2(1) CHECK (gravar IN ('S', 'N')),
  editar VARCHAR2(1) CHECK (editar IN ('S', 'N')),
  remover VARCHAR2(1) CHECK (remover IN ('S', 'N'))
);

CREATE TABLE tb_tela (
  id_tela NUMBER NOT NULL,
  descricao_tela VARCHAR(60)
);

CREATE TABLE tb_congregacao (
  id_congregacao NUMBER NOT NULL,
  id_sede NUMBER,
  id_obreiro NUMBER,
  nome VARCHAR2(60),
  endereco VARCHAR2(60),
  num_endereco NUMBER,
  complemento VARCHAR2(60),
  bairro VARCHAR2(60),
  cidade VARCHAR2(60),
  uf VARCHAR2(2),
  cep VARCHAR2(60),
  data_fundacao DATE
);

CREATE TABLE tb_sede (
  id_sede NUMBER NOT NULL,
  descricao_sede VARCHAR2(60)
);

CREATE TABLE tb_dizimo (
  id_dizimo NUMBER NOT NULL,
  id_pessoa NUMBER,
  id_congregacao NUMBER,
  data_entrada DATE,
  tipo_entrada VARCHAR2(40),
  valor NUMBER
);

CREATE TABLE tb_oferta (
  id_oferta NUMBER NOT NULL,
  id_pessoa NUMBER,
  id_congregacao NUMBER,
  data_entrada DATE,
  tipo_entrada VARCHAR2(40),
  valor NUMBER
);

CREATE TABLE tb_documento (
  id_documento NUMBER NOT NULL,
  id_tipo_documento NUMBER,
  id_usuario NUMBER,
  autor VARCHAR2(60),
  titulo VARCHAR2(60),
  url VARCHAR2(60)
);

CREATE TABLE tb_tipo_documento (
  id_tipo_documento NUMBER NOT NULL,
  descricao_tipo_documento VARCHAR2(60)
);

-----------------------------------------------------------------------------------------------------------------------

-- Constraints PKs
ALTER TABLE tb_pessoa 
  ADD CONSTRAINT pk_tb_pessoa 
  PRIMARY KEY (id_pessoa);

ALTER TABLE tb_membro 
  ADD CONSTRAINT pk_tb_membro 
  PRIMARY KEY (id_membro);

ALTER TABLE tb_obreiro 
  ADD CONSTRAINT pk_tb_obreiro 
  PRIMARY KEY (id_obreiro);

ALTER TABLE tb_funcao 
  ADD CONSTRAINT pk_tb_funcao 
  PRIMARY KEY (id_funcao);

ALTER TABLE tb_usuario 
  ADD CONSTRAINT pk_tb_usuario 
  PRIMARY KEY (id_usuario);

ALTER TABLE tb_usuario_grupo 
  ADD CONSTRAINT pk_tb_usuario_grupo 
  PRIMARY KEY (id_usuario, id_grupo);

ALTER TABLE tb_grupo 
  ADD CONSTRAINT pk_tb_grupo 
  PRIMARY KEY (id_grupo);

ALTER TABLE tb_permissao
  ADD CONSTRAINT pk_tb_permissao
  PRIMARY KEY (id_grupo, id_tela);

ALTER TABLE tb_tela
  ADD CONSTRAINT pk_tb_tela
  PRIMARY KEY (id_tela);

ALTER TABLE tb_congregacao 
  ADD CONSTRAINT pk_tb_congregacao 
  PRIMARY KEY (id_congregacao);

ALTER TABLE tb_sede 
  ADD CONSTRAINT pk_tb_sede
  PRIMARY KEY (id_sede);

ALTER TABLE tb_dizimo 
  ADD CONSTRAINT tb_dizimo_pk 
  PRIMARY KEY (id_dizimo);

ALTER TABLE tb_oferta 
  ADD CONSTRAINT pk_tb_oferta 
  PRIMARY KEY (id_oferta);

ALTER TABLE tb_documento 
  ADD CONSTRAINT pk_tb_documento 
  PRIMARY KEY (id_documento);

ALTER TABLE tb_tipo_documento 
  ADD CONSTRAINT pk_tipo_documento 
  PRIMARY KEY (id_tipo_documento);

-----------------------------------------------------------------------------------------------------------------------

-- Constraints FKs
ALTER TABLE tb_membro 
  ADD CONSTRAINT fk_tb_membro_tb_usuario 
  FOREIGN KEY (id_pessoa)
  REFERENCES tb_pessoa (id_pessoa);

ALTER TABLE tb_membro 
  ADD CONSTRAINT fk_tb_membro_tb_congregacao 
  FOREIGN KEY (id_congregacao)
  REFERENCES tb_congregacao (id_congregacao);

ALTER TABLE tb_obreiro
  ADD CONSTRAINT fk_tb_obreiro_tb_pessoa 
  FOREIGN KEY (id_pessoa)
  REFERENCES tb_pessoa (id_pessoa);

ALTER TABLE tb_usuario 
  ADD CONSTRAINT fk_tb_usuario_tb_pessoa 
  FOREIGN KEY (id_pessoa)
  REFERENCES tb_pessoa (id_pessoa);

ALTER TABLE tb_usuario_grupo
  ADD CONSTRAINT fk_tb_usuario_grupo_tb_usuario 
  FOREIGN KEY (id_usuario)
  REFERENCES tb_usuario (id_usuario);

ALTER TABLE tb_usuario_grupo
  ADD CONSTRAINT fk_tb_usuario_grupo_tb_grupo 
  FOREIGN KEY (id_grupo)
  REFERENCES tb_grupo (id_grupo);

ALTER TABLE tb_permissao
  ADD CONSTRAINT fk_tb_permissao_tb_grupo 
  FOREIGN KEY (id_grupo)
  REFERENCES tb_grupo (id_grupo);

ALTER TABLE tb_permissao
  ADD CONSTRAINT fk_tb_permissao_tb_tela 
  FOREIGN KEY (id_tela)
  REFERENCES tb_tela (id_tela);

ALTER TABLE tb_congregacao
  ADD CONSTRAINT fk_tb_congregacao_tb_sede
  FOREIGN KEY (id_sede)
  REFERENCES tb_sede (id_sede);

ALTER TABLE tb_congregacao
  ADD CONSTRAINT fk_tb_congregacao_tb_obreiro
  FOREIGN KEY (id_obreiro)
  REFERENCES tb_obreiro (id_obreiro);

ALTER TABLE tb_dizimo
  ADD CONSTRAINT fk_tb_dizimo_tb_pessoa
  FOREIGN KEY (id_pessoa)
  REFERENCES tb_pessoa (id_pessoa);

ALTER TABLE tb_dizimo
  ADD CONSTRAINT fk_tb_dizimo_tb_congregacao
  FOREIGN KEY (id_congregacao)
  REFERENCES tb_congregacao (id_congregacao);

ALTER TABLE tb_oferta
  ADD CONSTRAINT fk_tb_oferta_tb_pessoa
  FOREIGN KEY (id_pessoa)
  REFERENCES tb_pessoa (id_pessoa);

ALTER TABLE tb_oferta
  ADD CONSTRAINT fk_tb_oferta_tb_congregacao
  FOREIGN KEY (id_congregacao)
  REFERENCES tb_congregacao (id_congregacao);

ALTER TABLE tb_documento
  ADD CONSTRAINT fk_tb_documento_tb_usuario
  FOREIGN KEY (id_usuario)
  REFERENCES tb_usuario (id_usuario);

ALTER TABLE tb_documento
  ADD CONSTRAINT fk_tb_documento_tb_tipo_documento
  FOREIGN KEY (id_tipo_documento)
  REFERENCES tb_tipo_documento (id_tipo_documento);

-----------------------------------------------------------------------------------------------------------------------

-- Sequences
CREATE SEQUENCE seq_tb_pessoa_id;
CREATE SEQUENCE seq_tb_membro_id;
CREATE SEQUENCE seq_tb_obreiro_id;
CREATE SEQUENCE seq_tb_funcao_id;
CREATE SEQUENCE seq_tb_usuario_id;
CREATE SEQUENCE seq_tb_grupo_id;
CREATE SEQUENCE seq_tb_tela_id;
CREATE SEQUENCE seq_tb_congregacao_id;
CREATE SEQUENCE seq_tb_sede_id;
CREATE SEQUENCE seq_tb_dizimo_id;
CREATE SEQUENCE seq_tb_oferta_id;
CREATE SEQUENCE seq_tb_documento_id;
CREATE SEQUENCE seq_tb_tipo_documento_id;

-----------------------------------------------------------------------------------------------------------------------

-- Inserts tb_tipo_documento
INSERT INTO tb_tipo_documento VALUES (seq_tb_tipo_documento_id.NEXTVAL, 'Financeiro');
INSERT INTO tb_tipo_documento VALUES (seq_tb_tipo_documento_id.NEXTVAL, 'Administrativo');
INSERT INTO tb_tipo_documento VALUES (seq_tb_tipo_documento_id.NEXTVAL, 'Estoque');

-- Inserts tb_tela
INSERT INTO tb_tela VALUES (seq_tb_tela_id.NEXTVAL, 'Cadastro');
INSERT INTO tb_tela VALUES (seq_tb_tela_id.NEXTVAL, 'Login');
INSERT INTO tb_tela VALUES (seq_tb_tela_id.NEXTVAL, 'Registro');

-- Inserts tb_pessoa
INSERT INTO tb_pessoa VALUES (seq_tb_pessoa_id.NEXTVAL, 'João Silva', '12345678900', '999999999', 'M', 'joao.silva@example.com', '11', '923456789', 'Rua Principal', 123, 'Centro', 'Ap. 102', 'São Paulo', 'SP', '01234567');
INSERT INTO tb_pessoa VALUES (seq_tb_pessoa_id.NEXTVAL, 'Maria Santos', '98765432100', '888888888', 'F', 'maria.santos@example.com', '11', '987654321', 'Avenida das Flores', 456, 'Vila Nova', NULL, 'Rio de Janeiro', 'RJ', '98765432');
INSERT INTO tb_pessoa VALUES (seq_tb_pessoa_id.NEXTVAL, 'José Oliveira', '11122233300', '777777777', 'M', 'jose.oliveira@example.com', '11', '911222333', 'Rua dos Girassóis', 789, 'Jardim América', 'Casa 5', 'São Paulo', 'SP', '11111222');
INSERT INTO tb_pessoa VALUES (seq_tb_pessoa_id.NEXTVAL, 'Ana Souza', '44455566600', '666666666', 'F', 'ana.souza@example.com', '11', '944555666', 'Avenida Atlântica', 987, 'Vila Nova', 'Ap. 501', 'Rio de Janeiro', 'RJ', '44444555');
INSERT INTO tb_pessoa VALUES (seq_tb_pessoa_id.NEXTVAL, 'Pedro Fernandes', '77788899900', '555555555', 'M', 'pedro.fernandes@example.com', '11', '977888999', 'Rua dos Coqueiros', 654, 'Barra da Tijuca', 'Casa 10', 'Rio de Janeiro', 'RJ', '77777888');
INSERT INTO tb_pessoa VALUES (seq_tb_pessoa_id.NEXTVAL, 'Carolina Oliveira', '55566677700', '111111111', 'F', 'carolina.oliveira@example.com', '11', '955666777', 'Rua das Palmeiras', 321, 'Cidade Nova', 'Casa 20', 'São Paulo', 'SP', '55555666');
INSERT INTO tb_pessoa VALUES (seq_tb_pessoa_id.NEXTVAL, 'Ricardo Santos', '88899911100', '222222222', 'M', 'ricardo.santos@example.com', '11', '988999111', 'Avenida Principal', 987, 'Centro', 'Ap. 501', 'Rio de Janeiro', 'RJ', '88888999');
INSERT INTO tb_pessoa VALUES (seq_tb_pessoa_id.NEXTVAL, 'Fernanda Lima', '44433322200', '555555555', 'F', 'fernanda.lima@example.com', '11', '944333222', 'Rua das Flores', 654, 'Jardins', NULL, 'São Paulo', 'SP', '44444333');
INSERT INTO tb_pessoa VALUES (seq_tb_pessoa_id.NEXTVAL, 'Gustavo Alves', '77766655500', '999999999', 'M', 'gustavo.alves@example.com', '11', '977666555', 'Avenida Atlântica', 123, 'Copacabana', 'Ap. 1001', 'Rio de Janeiro', 'RJ', '77777666');
INSERT INTO tb_pessoa VALUES (seq_tb_pessoa_id.NEXTVAL, 'Mariana Ferreira', '22233344400', '888888888', 'F', 'mariana.ferreira@example.com', '11', '922333444', 'Rua dos Coqueiros', 789, 'Barra da Tijuca', 'Casa 5', 'Rio de Janeiro', 'RJ', '22222333');

-- Inserts tb_funcao
INSERT INTO tb_funcao VALUES (seq_tb_funcao_id.NEXTVAL, 'Secretaria');
INSERT INTO tb_funcao VALUES (seq_tb_funcao_id.NEXTVAL, 'Assistente social');
INSERT INTO tb_funcao VALUES (seq_tb_funcao_id.NEXTVAL, 'Pastor');
INSERT INTO tb_funcao VALUES (seq_tb_funcao_id.NEXTVAL, 'Diácono');
INSERT INTO tb_funcao VALUES (seq_tb_funcao_id.NEXTVAL, 'Missionário');

-- Inserts tb_sede
INSERT INTO tb_sede VALUES (seq_tb_sede_id.NEXTVAL, 'Ministério Central de São Paulo');
INSERT INTO tb_sede VALUES (seq_tb_sede_id.NEXTVAL, 'Ministério Central do Rio de Janeiro');

-- Inserts tb_grupo
INSERT INTO tb_grupo VALUES (seq_tb_grupo_id.NEXTVAL, 'Usuário');
INSERT INTO tb_grupo VALUES (seq_tb_grupo_id.NEXTVAL, 'Administrador');
INSERT INTO tb_grupo VALUES (seq_tb_grupo_id.NEXTVAL, 'Secretaria');
INSERT INTO tb_grupo VALUES (seq_tb_grupo_id.NEXTVAL, 'Obreiro');

-- Inserts tb_permissao
INSERT INTO tb_permissao VALUES (1, 2, 'S', 'S', 'N', 'N');
INSERT INTO tb_permissao VALUES (2, 1, 'S', 'S', 'S', 'S');
INSERT INTO tb_permissao VALUES (3, 2, 'S', 'S', 'S', 'N');
INSERT INTO tb_permissao VALUES (4, 3, 'S', 'S', 'S', 'N');

-- Inserts tb_usuario
INSERT INTO tb_usuario VALUES (seq_tb_usuario_id.NEXTVAL, 1, 'joao.silva', '123456');
INSERT INTO tb_usuario VALUES (seq_tb_usuario_id.NEXTVAL, 2, 'maria.santos', '123456');
INSERT INTO tb_usuario VALUES (seq_tb_usuario_id.NEXTVAL, 3, 'jose.oliveira', '123456');
INSERT INTO tb_usuario VALUES (seq_tb_usuario_id.NEXTVAL, 4, 'ana.souza', '123456');
INSERT INTO tb_usuario VALUES (seq_tb_usuario_id.NEXTVAL, 5, 'pedro.fernandes', '123456');
INSERT INTO tb_usuario VALUES (seq_tb_usuario_id.NEXTVAL, 6, 'carolina.oliveira', '123456');
INSERT INTO tb_usuario VALUES (seq_tb_usuario_id.NEXTVAL, 7, 'ricardo.santos', '123456');
INSERT INTO tb_usuario VALUES (seq_tb_usuario_id.NEXTVAL, 8, 'fernanda.lima', '123456');

-- Inserts tb_usuario_grupo
INSERT INTO tb_usuario_grupo VALUES (1, 1);
INSERT INTO tb_usuario_grupo VALUES (1, 2);
INSERT INTO tb_usuario_grupo VALUES (2, 2);
INSERT INTO tb_usuario_grupo VALUES (3, 3);
INSERT INTO tb_usuario_grupo VALUES (4, 4);
INSERT INTO tb_usuario_grupo VALUES (5, 3);
INSERT INTO tb_usuario_grupo VALUES (6, 4);
INSERT INTO tb_usuario_grupo VALUES (6, 2);
INSERT INTO tb_usuario_grupo VALUES (7, 1);
INSERT INTO tb_usuario_grupo VALUES (7, 4);
INSERT INTO tb_usuario_grupo VALUES (8, 4);

-- Inserts tb_obreiro
INSERT INTO tb_obreiro VALUES (seq_tb_obreiro_id.NEXTVAL, 2, 1);
INSERT INTO tb_obreiro VALUES (seq_tb_obreiro_id.NEXTVAL, 3, 2);
INSERT INTO tb_obreiro VALUES (seq_tb_obreiro_id.NEXTVAL, 4, 3);
INSERT INTO tb_obreiro VALUES (seq_tb_obreiro_id.NEXTVAL, 6, 4);
INSERT INTO tb_obreiro VALUES (seq_tb_obreiro_id.NEXTVAL, 7, 5);

-- Inserts tb_congregacao
INSERT INTO tb_congregacao VALUES (seq_tb_congregacao_id.NEXTVAL, 1, 1, 'Congregação Central', 'Avenida Principal', 100, 'Centro', 'Sala 101', 'São Paulo', 'SP', '12345678', TO_DATE('2002-07-21', 'YYYY-MM-DD'));
INSERT INTO tb_congregacao VALUES (seq_tb_congregacao_id.NEXTVAL, 2, 2, 'Congregação do Rio', 'Rua das Flores', 200, 'Copacabana', NULL, 'Rio de Janeiro', 'RJ', '98765432', TO_DATE('2008-11-09', 'YYYY-MM-DD'));
INSERT INTO tb_congregacao VALUES (seq_tb_congregacao_id.NEXTVAL, 1, 3, 'Congregação da Paz', 'Avenida do Sol', 300, 'Jardim América', NULL, 'São Paulo', 'SP', '54321876', TO_DATE('2022-03-25', 'YYYY-MM-DD'));
INSERT INTO tb_congregacao VALUES (seq_tb_congregacao_id.NEXTVAL, 2, 4, 'Congregação da Esperança', 'Rua dos Coqueiros', 400, 'Barra da Tijuca', NULL, 'Rio de Janeiro', 'RJ', '12345678', TO_DATE('1988-05-10', 'YYYY-MM-DD'));
INSERT INTO tb_congregacao VALUES (seq_tb_congregacao_id.NEXTVAL, 2, 5, 'Congregação do Amor', 'Rua Principal', 500, 'Vila Nova', NULL, 'Rio de Janeiro', 'RJ', '98765432', TO_DATE('2015-10-12', 'YYYY-MM-DD'));

-- Inserts tb_membro
INSERT INTO tb_membro VALUES (seq_tb_membro_id.NEXTVAL, 1, 2);
INSERT INTO tb_membro VALUES (seq_tb_membro_id.NEXTVAL, 2, 2);
INSERT INTO tb_membro VALUES (seq_tb_membro_id.NEXTVAL, 4, 4);
INSERT INTO tb_membro VALUES (seq_tb_membro_id.NEXTVAL, 5, 5);
INSERT INTO tb_membro VALUES (seq_tb_membro_id.NEXTVAL, 3, 1);
INSERT INTO tb_membro VALUES (seq_tb_membro_id.NEXTVAL, 6, 3);
INSERT INTO tb_membro VALUES (seq_tb_membro_id.NEXTVAL, 7, 3);

-- Inserts tb_dizimo
INSERT INTO tb_dizimo VALUES (seq_tb_dizimo_id.NEXTVAL, 1, 1, TO_DATE('2023-05-01', 'YYYY-MM-DD'), 'Dinheiro', 100.00);
INSERT INTO tb_dizimo VALUES (seq_tb_dizimo_id.NEXTVAL, 2, 2, TO_DATE('2023-05-05', 'YYYY-MM-DD'), 'Cheque', 250.50);
INSERT INTO tb_dizimo VALUES (seq_tb_dizimo_id.NEXTVAL, 3, 3, TO_DATE('2023-05-10', 'YYYY-MM-DD'), 'Transferência', 500.00);
INSERT INTO tb_dizimo VALUES (seq_tb_dizimo_id.NEXTVAL, 4, 2, TO_DATE('2023-05-15', 'YYYY-MM-DD'), 'Cartão de Crédito', 150.75);
INSERT INTO tb_dizimo VALUES (seq_tb_dizimo_id.NEXTVAL, 6, 3, TO_DATE('2023-05-20', 'YYYY-MM-DD'), 'PIX', 200.00);

-- Inserts tb_oferta
INSERT INTO tb_oferta VALUES (seq_tb_oferta_id.NEXTVAL, 1, 1, TO_DATE('2023-05-01', 'YYYY-MM-DD'), 'Dinheiro', 1000.00);
INSERT INTO tb_oferta VALUES (seq_tb_oferta_id.NEXTVAL, 2, 2, TO_DATE('2023-05-05', 'YYYY-MM-DD'), 'Dinheiro', 2500.50);
INSERT INTO tb_oferta VALUES (seq_tb_oferta_id.NEXTVAL, 2, 2, TO_DATE('2023-05-10', 'YYYY-MM-DD'), 'Dinheiro', 5000.50);

-- Inserts tb_documento
INSERT INTO tb_documento VALUES (seq_tb_documento_id.NEXTVAL, 1, 3, 'José Francisco Albanez', 'Contrato de espicificação de aluguel', 'https://localhost');
INSERT INTO tb_documento VALUES (seq_tb_documento_id.NEXTVAL, 2, 2, 'Marcos Castro Oliveira', 'Registro de produto de fornecedor', 'https://localhost');
INSERT INTO tb_documento VALUES (seq_tb_documento_id.NEXTVAL, 3, 1, 'Maria Josefina', 'Alvará do Bombeiro Civil Regional', 'https://localhost');

-----------------------------------------------------------------------------------------------------------------------

-- Selects
SELECT * FROM tb_usuario_grupo;
SELECT * FROM tb_permissao;
SELECT * FROM tb_membro;
SELECT * FROM tb_dizimo;
SELECT * FROM tb_oferta;
SELECT * FROM tb_congregacao;
SELECT * FROM tb_obreiro;
SELECT * FROM tb_documento;
SELECT * FROM tb_usuario;
SELECT * FROM tb_grupo;
SELECT * FROM tb_sede;
SELECT * FROM tb_funcao;
SELECT * FROM tb_pessoa;
SELECT * FROM tb_tela;
SELECT * FROM tb_tipo_documento;