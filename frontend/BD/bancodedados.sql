-- 1) (Re)criar o banco
DROP DATABASE IF EXISTS personal_trainer;
CREATE DATABASE personal_trainer;
USE personal_trainer;

-- 2) Tabela alunos (sem dependências)
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    sexo ENUM('M', 'F', 'Outro') NOT NULL,
    altura DECIMAL(5,2) NOT NULL COMMENT 'Em m',
    peso DECIMAL(5,2) NOT NULL COMMENT 'Em kg',
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    objetivo VARCHAR(100) NOT NULL COMMENT 'Ex: perder peso, ganhar massa',
    data_inicio DATE NOT NULL,
    foto_path VARCHAR(255) NULL COMMENT 'Para upload de foto (extra)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3) Tabela fichas (FK → alunos)
CREATE TABLE fichas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    data_criacao DATE NOT NULL,
    arquivada BOOLEAN DEFAULT FALSE COMMENT 'Fichas antigas podem ser arquivadas',
    observacoes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);

-- 4) Tabela exercicios (FK → fichas)
CREATE TABLE exercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ficha_id INT NOT NULL,
    nome_exercicio VARCHAR(100) NOT NULL,
    series INT NOT NULL,
    repeticoes INT NOT NULL,
    carga DECIMAL(5,2) NULL COMMENT 'Em kg',
    observacoes TEXT NULL,
    dia_semana ENUM('Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo') NOT NULL,
    ordem INT NULL COMMENT 'Ordem de execução',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ficha_id) REFERENCES fichas(id) ON DELETE CASCADE
);

-- 5) Tabela avaliacoes_fisicas (FK → alunos)
CREATE TABLE avaliacoes_fisicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    data_avaliacao DATE NOT NULL,
    peso DECIMAL(5,2) NOT NULL COMMENT 'Em kg',
    imc DECIMAL(5,2) NULL COMMENT 'Calculado automaticamente',
    braco_direito DECIMAL(5,2) NULL COMMENT 'Circunferência em cm',
    braco_esquerdo DECIMAL(5,2) NULL COMMENT 'Circunferência em cm',
    perna_direita DECIMAL(5,2) NULL COMMENT 'Circunferência em cm',
    perna_esquerda DECIMAL(5,2) NULL COMMENT 'Circunferência em cm',
    peitoral DECIMAL(5,2) NULL COMMENT 'Circunferência em cm',
    abdomen DECIMAL(5,2) NULL COMMENT 'Circunferência em cm',
    observacoes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);

-- 6) Tabela usuarios (sem dependências)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('admin','professor') NOT NULL DEFAULT 'professor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 7) Triggers para cálculo automático do IMC (altura em metros)
DELIMITER //
DROP TRIGGER IF EXISTS calcular_imc_insert;
//
CREATE TRIGGER calcular_imc_insert
BEFORE INSERT ON avaliacoes_fisicas
FOR EACH ROW
BEGIN
    DECLARE alt DECIMAL(5,2);
    SELECT altura INTO alt FROM alunos WHERE id = NEW.aluno_id;
    SET NEW.imc = NEW.peso / POW(alt, 2);
END;
//

DROP TRIGGER IF EXISTS calcular_imc_update;
//
CREATE TRIGGER calcular_imc_update
BEFORE UPDATE ON avaliacoes_fisicas
FOR EACH ROW
BEGIN
    DECLARE alt DECIMAL(5,2);
    SELECT altura INTO alt FROM alunos WHERE id = NEW.aluno_id;
    SET NEW.imc = NEW.peso / POW(alt, 2);
END;
//
DELIMITER ;

-- 8) Dados iniciais de teste
INSERT INTO alunos (nome, data_nascimento, sexo, altura, peso, telefone, email, objetivo, data_inicio) VALUES
('João Paulo','1990-05-15','M',1.75,78.5,'(11) 99999-9999','joao@email.com','Hipertrofia','2025-01-10'),
('Maria Silva','1985-08-22','F',1.65,62.0,'(11) 88888-8888','maria@email.com','Emagrecimento','2025-02-15'),
('Carlos Oliveira','1992-03-30','M',1.80,85.0,'(11) 77777-7777','carlos@email.com','Condicionamento Físico','2025-03-01');

INSERT INTO fichas (aluno_id, titulo, data_criacao, observacoes) VALUES
(1,'Treino A - Hipertrofia','2025-01-15','Foco em membros superiores'),
(1,'Treino B - Hipertrofia','2025-01-15','Foco em membros inferiores'),
(2,'Treino Emagrecimento','2025-02-20','Treino circuito');

INSERT INTO exercicios (ficha_id, nome_exercicio, series, repeticoes, carga, dia_semana, ordem) VALUES
(1,'Supino Reto',4,12,20.0,'Segunda',1),
(1,'Remada Curvada',3,10,25.0,'Segunda',2),
(2,'Agachamento Livre',4,10,30.0,'Quarta',1),
(3,'Esteira',1,30,NULL,'Terça',1),
(3,'Bicicleta Ergométrica',1,20,NULL,'Terça',2);

INSERT INTO avaliacoes_fisicas (aluno_id, data_avaliacao, peso, braco_direito, braco_esquerdo, peitoral, abdomen) VALUES
(1,'2025-01-10',78.5,32.5,32.0,95.0,85.0),
(1,'2025-02-10',76.0,33.0,32.5,96.0,83.0),
(2,'2025-02-15',62.0,28.0,28.0,85.0,75.0);



