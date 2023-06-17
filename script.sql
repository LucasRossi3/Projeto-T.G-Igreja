CREATE TABLE tb_pessoa (
  pessoa_id NUMBER NOT NULL,
  nome VARCHAR2(60),
  cpf NUMBER(11) NOT NULL,
  rg NUMBER(9),
  sexo VARCHAR2(1) CHECK (sexo IN ('M', 'F')),
  email VARCHAR2(100),
  dd NUMBER(2),
  celular NUMBER(9),
  endereco VARCHAR2(100),
  num_endereco NUMBER,
  bairro VARCHAR2(60),
  complemento VARCHAR2(60),
  cidade VARCHAR2(60),
  uf VARCHAR2(2),
  cep NUMBER(8)
);

CREATE TABLE tb_membro (
  membro_id NUMBER NOT NULL,
  pessoa_id NUMBER NOT NULL,
  congregacao_id NUMBER NOT NULL
);

CREATE TABLE tb_obreiro (
  obreiro_id NUMBER NOT NULL,
  pessoa_id NUMBER NOT NULL,
  funcao_id NUMBER NOT NULL
);

CREATE TABLE tb_funcao (
  funcao_id NUMBER NOT NULL,
  descricao_funcao VARCHAR2(60)
);

CREATE TABLE tb_usuario (
  usuario_id NUMBER NOT NULL,
  pessoa_id NUMBER NOT NULL,
  nome VARCHAR2(60),
  senha VARCHAR2(60),
);

CREATE TABLE tb_usuario_grupo (
  usuario_id NUMBER NOT NULL,
  grupo_id NUMBER NOT NULL
);

CREATE TABLE tb_grupo (
  grupo_id NUMBER NOT NULL,
  descricao_grupo VARCHAR2(60)
);

CREATE TABLE tb_congregacao (
  congregacao_id NUMBER NOT NULL,
  sede_id NUMBER NOT NULL,
  obreiro_id NUMBER,
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
  sede_id NUMBER NOT NULL,
  congregacao_id NUMBER,
  descricao_sede VARCHAR2(60)
);

CREATE TABLE tb_dizimo (
  dizimo_id NUMBER NOT NULL,
  pessoa_id NUMBER,
  congregacao_id NUMBER,
  data_entrada DATE,
  tipo_entrada VARCHAR2(40),
  valor NUMBER
);

CREATE TABLE tb_oferta (
  oferta_id NUMBER NOT NULL,
  pessoa_id NUMBER,
  congregacao_id NUMBER,
  data_entrada DATE,
  tipo_entrada VARCHAR2(40),
  valor NUMBER
);

CREATE TABLE tb_documento (
  documento_id NUMBER NOT NULL,
  documento_tipo_id NUMBER,
  usuario_id NUMBER,
  autor VARCHAR2(60),
  titulo VARCHAR2(60),
  corpo_documento VARCHAR2(60)
);

CREATE TABLE tb_documento_tipo (
  documento_tipo_id NUMBER NOT NULL,
  descricao_documento_tipo VARCHAR2(60)
);

-----------------------------------------------------------------------------------------------------------------------

-- Constraints PKs
ALTER TABLE tb_pessoa 
  ADD CONSTRAINT pk_tb_pessoa 
  PRIMARY KEY (pessoa_id);

ALTER TABLE tb_membro 
  ADD CONSTRAINT pk_tb_membro 
  PRIMARY KEY (membro_id);

ALTER TABLE tb_obreiro 
  ADD CONSTRAINT pk_tb_obreiro 
  PRIMARY KEY (obreiro_id);

ALTER TABLE tb_funcao 
  ADD CONSTRAINT pk_tb_funcao 
  PRIMARY KEY (funcao_id);

ALTER TABLE tb_usuario 
  ADD CONSTRAINT pk_tb_usuario 
  PRIMARY KEY (usuario_id);

ALTER TABLE tb_usuario_grupo 
  ADD CONSTRAINT pk_tb_usuario_grupo 
  PRIMARY KEY (usuario_id, grupo_id);

ALTER TABLE tb_grupo 
  ADD CONSTRAINT pk_tb_grupo 
  PRIMARY KEY (grupo_id);

ALTER TABLE tb_congregacao 
  ADD CONSTRAINT pk_tb_congregacao 
  PRIMARY KEY (congregacao_id);

ALTER TABLE tb_sede 
  ADD CONSTRAINT pk_tb_sede
  PRIMARY KEY (sede_id);

ALTER TABLE tb_dizimo 
  ADD CONSTRAINT tb_dizimo_pk 
  PRIMARY KEY (dizimo_id);

ALTER TABLE tb_oferta 
  ADD CONSTRAINT pk_tb_oferta 
  PRIMARY KEY (oferta_id);

ALTER TABLE tb_documento 
  ADD CONSTRAINT pk_tb_documento 
  PRIMARY KEY (documento_id);

ALTER TABLE tb_documento_tipo 
  ADD CONSTRAINT pk_documento_tipo 
  PRIMARY KEY (documento_tipo_id);

-----------------------------------------------------------------------------------------------------------------------

-- Constraints FKs
ALTER TABLE tb_usuario 
  ADD CONSTRAINT tb_usuario_tb_pessoa_fk
  FOREIGN KEY (pessoa_id)
  REFERENCES tb_pessoa (pessoa_id);

ALTER TABLE tb_usuarios_grupos
  ADD CONSTRAINT tb_usuarios_grupos_us_fk
  FOREIGN KEY (usuario_id)
  REFERENCES tb_usuario (usuario_id);

ALTER TABLE tb_usuarios_grupos
  ADD CONSTRAINT tb_usuarios_grupos_gp_fk
  FOREIGN KEY (grupo_id)
  REFERENCES tb_grupos (grupo_id);

ALTER TABLE tb_membro 
  ADD CONSTRAINT tb_membro_tb_usuario_fk 
  FOREIGN KEY (pessoa_id)
  REFERENCES tb_pessoa(pessoa_id);

ALTER TABLE tb_membro 
  ADD CONSTRAINT tb_membro_tb_congregacao_fk 
  FOREIGN KEY (congregacao_id)
  REFERENCES tb_congregacao(congregacao_id);

ALTER TABLE tb_obreiro
  ADD CONSTRAINT tb_obreiro_tb_pessoa_fk 
  FOREIGN KEY (pessoa_id)
  REFERENCES tb_pessoa(pessoa_id);

ALTER TABLE tb_obreiro
ADD CONSTRAINT tb_obreiro_tb_congregacao_fk 
FOREIGN KEY (congregacao_id)
REFERENCES tb_congregacao(congregacao_id);

ALTER TABLE tb_dizimo
ADD CONSTRAINT tb_dizimo_tb_congregacao_fk
FOREIGN KEY (congregacao_id)
REFERENCES tb_congregacao (congregacao_id);

ALTER TABLE tb_dizimo
ADD CONSTRAINT tb_dizimo_tb_pessoa_fk
FOREIGN KEY (pessoa_id)
REFERENCES tb_pessoa(pessoa_id);
-----------------------------------------------------------------------------------------------------------------------

-- Inserts para tb_pessoa
INSERT INTO tb_pessoa VALUES (1, 'Centro', 'Ap. 102', 'João Silva', 'São Paulo', '123.456.789-00', 'SP', '123456789', '01234-567', 'M', '99999999999', 'joao.silva@example.com', 'Rua Principal', 123);
INSERT INTO tb_pessoa VALUES (2, 'Vila Nova', NULL, 'Maria Santos', 'Rio de Janeiro', '987.654.321-00', 'RJ', '987654321', '98765-432', 'F', '88888888888', 'maria.santos@example.com', 'Avenida das Flores', 456);
INSERT INTO tb_pessoa VALUES (3, 'Jardim América', 'Casa 5', 'José Oliveira', 'São Paulo', '111.222.333-00', 'SP', '111222333', '11111-222', 'M', '77777777777', 'jose.oliveira@example.com', 'Rua dos Girassóis', 789);
INSERT INTO tb_pessoa VALUES (4, 'Copacabana', 'Ap. 501', 'Ana Souza', 'Rio de Janeiro', '444.555.666-00', 'RJ', '444555666', '44444-555', 'F', '66666666666', 'ana.souza@example.com', 'Avenida Atlântica', 987);
INSERT INTO tb_pessoa VALUES (5, 'Barra da Tijuca', 'Casa 10', 'Pedro Fernandes', 'Rio de Janeiro', '777.888.999-00', 'RJ', '777888999', '77777-888', 'M', '55555555555', 'pedro.fernandes@example.com', 'Rua dos Coqueiros', 654);
INSERT INTO tb_pessoa VALUES (6, 'Cidade Nova', 'Casa 20', 'Carolina Oliveira', 'São Paulo', '555.666.777-00', 'SP', '555666777', '55555-666', 'F', '11111111111', 'carolina.oliveira@example.com', 'Rua das Palmeiras', 321);
INSERT INTO tb_pessoa VALUES (7, 'Centro', 'Ap. 501', 'Ricardo Santos', 'Rio de Janeiro', '888.999.111-00', 'RJ', '888999111', '88888-999', 'M', '22222222222', 'ricardo.santos@example.com', 'Avenida Principal', 987);
INSERT INTO tb_pessoa VALUES (8, 'Jardins', 'Casa 12', 'Fernanda Lima', 'São Paulo', '444.333.222-00', 'SP', '444333222', '44444-333', 'F', '55555555555', 'fernanda.lima@example.com', 'Rua das Flores', 654);
INSERT INTO tb_pessoa VALUES (9, 'Copacabana', 'Ap. 1001', 'Gustavo Alves', 'Rio de Janeiro', '777.666.555-00', 'RJ', '777666555', '77777-666', 'M', '99999999999', 'gustavo.alves@example.com', 'Avenida Atlântica', 123);
INSERT INTO tb_pessoa VALUES (10, 'Barra da Tijuca', 'Casa 5', 'Mariana Ferreira', 'Rio de Janeiro', '222.333.444-00', 'RJ', '222333444', '22222-333', 'F', '88888888888', 'mariana.ferreira@example.com', 'Rua dos Coqueiros', 789);

-- Inserts para tb_usuario
INSERT INTO tb_usuario VALUES (1, 1, 'joao.silva', 'senha123');
INSERT INTO tb_usuario VALUES (2, 2, 'maria.santos', 'abcde456');
INSERT INTO tb_usuario VALUES (3, 3, 'jose.oliveira', '987654');
INSERT INTO tb_usuario VALUES (4, 4, 'ana.souza', 'senha12345');
INSERT INTO tb_usuario VALUES (5, 5, 'pedro.fernandes', 'abcdef');
INSERT INTO tb_usuario VALUES (6, 6, 'carolina.oliveira', 'senha789');
INSERT INTO tb_usuario VALUES (7, 7, 'ricardo.santos', 'abc123');
INSERT INTO tb_usuario VALUES (8, 8, 'fernanda.lima', 'senha987');

-- Inserts para tb_grupos
INSERT INTO tb_grupos VALUES (1, 'Administração');
INSERT INTO tb_grupos VALUES (2, 'Voluntariados');
INSERT INTO tb_grupos VALUES (3, 'Ministério de Ensino');
INSERT INTO tb_grupos VALUES (4, 'Acolhimento');
INSERT INTO tb_grupos VALUES (5, 'Financeiro');

-- Inserts para tb_usuarios_grupos
INSERT INTO tb_usuarios_grupos VALUES (1, 1);
INSERT INTO tb_usuarios_grupos VALUES (1, 2);
INSERT INTO tb_usuarios_grupos VALUES (2, 2);
INSERT INTO tb_usuarios_grupos VALUES (3, 3);
INSERT INTO tb_usuarios_grupos VALUES (4, 4);
INSERT INTO tb_usuarios_grupos VALUES (5, 3);
INSERT INTO tb_usuarios_grupos VALUES (2, 4);
INSERT INTO tb_usuarios_grupos VALUES (5, 5);
INSERT INTO tb_usuarios_grupos VALUES (4, 5);
INSERT INTO tb_usuarios_grupos VALUES (3, 5);
INSERT INTO tb_usuarios_grupos VALUES (2, 5);

-- Inserts para tb_congregacao
INSERT INTO tb_congregacao VALUES (1, 'Congregação Central', 'Avenida Principal', 100, 'Sala 101', 'Centro', 'São Paulo', 'SP', '12345-678');
INSERT INTO tb_congregacao VALUES (2, 'Congregação do Rio', 'Rua das Flores', 200, NULL, 'Copacabana', 'Rio de Janeiro', 'RJ', '98765-432');
INSERT INTO tb_congregacao VALUES (3, 'Congregação da Paz', 'Avenida do Sol', 300, 'Casa 5', 'Jardim América', 'São Paulo', 'SP', '54321-876');
INSERT INTO tb_congregacao VALUES (4, 'Congregação da Esperança', 'Rua dos Coqueiros', 400, 'Ap. 201', 'Barra da Tijuca', 'Rio de Janeiro', 'RJ', '12345-678');
INSERT INTO tb_congregacao VALUES (5, 'Congregação do Amor', 'Rua Principal', 500, 'Casa 10', 'Vila Nova', 'Rio de Janeiro', 'RJ', '98765-432');

-- Inserts para tb_membroS
INSERT INTO tb_membro VALUES (1, 2, 2);
INSERT INTO tb_membro VALUES (2, 4, 5);
INSERT INTO tb_membro VALUES (3, 1, 1);
INSERT INTO tb_membro VALUES (4, 6, 3);
INSERT INTO tb_membro VALUES (5, 3, 3);
INSERT INTO tb_membro VALUES (6, 7, 4);
INSERT INTO tb_membro VALUES (7, 4, 2);
INSERT INTO tb_membro VALUES (8, 3, 1);
INSERT INTO tb_membro VALUES (9, 2, 5);
INSERT INTO tb_membro VALUES (10, 9, 2);
INSERT INTO tb_membro VALUES (11, 10, 5);

-- Inserts para tb_obreiro
INSERT INTO tb_obreiro VALUES (1, 2, 5, 'Pastor');
INSERT INTO tb_obreiro VALUES (2, 3, 1, 'Diácono');
INSERT INTO tb_obreiro VALUES (3, 4, 2, 'Presbítero');
INSERT INTO tb_obreiro VALUES (4, 6, 3, 'Evangelista');
INSERT INTO tb_obreiro VALUES (5, 7, 4, 'Missionário');

-- Inserts para tb_dizimo
INSERT INTO tb_dizimo VALUES (1, 1, 1, TO_DATE('2023-05-01', 'YYYY-MM-DD'), 'Dinheiro', 100.00);
INSERT INTO tb_dizimo VALUES (2, 2, 2, TO_DATE('2023-05-05', 'YYYY-MM-DD'), 'Cheque', 250.50);
INSERT INTO tb_dizimo VALUES (3, 3, 3, TO_DATE('2023-05-10', 'YYYY-MM-DD'), 'Transferência', 500.00);
INSERT INTO tb_dizimo VALUES (4, 4, 2, TO_DATE('2023-05-15', 'YYYY-MM-DD'), 'Cartão de Crédito', 150.75);
INSERT INTO tb_dizimo VALUES (5, 6, 3, TO_DATE('2023-05-20', 'YYYY-MM-DD'), 'PIX', 200.00);
