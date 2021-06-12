
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `delivery_mineiro` DEFAULT CHARACTER SET utf8 ;
USE `delivery_mineiro` ;

-- -----------------------------------------------------
-- Table `delivery_mineiro`.`tipo_conta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delivery_mineiro`.`tipo_conta` (
	`id_tipo_conta` INT NOT NULL,
    `nome` VARCHAR(45) NOT NULL,
	PRIMARY KEY (`id_tipo_conta`))
ENGINE = InnoDB;

INSERT INTO `delivery_mineiro`.`tipo_conta`
VALUES (0, "Administrador");
INSERT INTO `delivery_mineiro`.`tipo_conta`
VALUES (1, "Usuario");
INSERT INTO `delivery_mineiro`.`tipo_conta`
VALUES (2, "Empresa");

-- -----------------------------------------------------
-- Table `delivery_mineiro`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delivery_mineiro`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `senha_confirmada` VARCHAR(45) NOT NULL,
  `id_tipo_conta` INT NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `endereco` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_tipo_conta`),
  INDEX `fk_usuario_tipo_conta_idx` (`id_tipo_conta` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_tipo_conta`
    FOREIGN KEY (`id_tipo_conta`)
    REFERENCES `delivery_mineiro`.`tipo_conta` (`id_tipo_conta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `delivery_mineiro`.`empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delivery_mineiro`.`empresa` (
  `id_empresa` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `senha_confirmada` VARCHAR(45) NOT NULL,
  `id_tipo_conta` INT NOT NULL,
  `data` DATE NOT NULL,
  `cnpj` VARCHAR(14) NOT NULL,
  `valor` DECIMAL(4) NOT NULL,
  `endereco` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_empresa`, `id_tipo_conta`),
  INDEX `fk_empresa_tipo_conta_idx` (`id_tipo_conta` ASC) VISIBLE,
  CONSTRAINT `fk_empresa_tipo_conta`
    FOREIGN KEY (`id_tipo_conta`)
    REFERENCES `delivery_mineiro`.`tipo_conta` (`id_tipo_conta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `delivery_mineiro`.`historico_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delivery_mineiro`.`historico_usuario` (
  `id_historico` INT NOT NULL AUTO_INCREMENT,
  `data` DATE NOT NULL,
  `valor` DECIMAL(4) NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_historico`, `id_usuario`),
  INDEX `fk_historico_usuario_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_historico_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `delivery_mineiro`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `delivery_mineiro`.`historico_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delivery_mineiro`.`historico_empresa` (
  `id_historico` INT NOT NULL AUTO_INCREMENT,
  `data` DATE NOT NULL,
  `valor` DECIMAL(4) NOT NULL,
  `id_empresa` INT NOT NULL,
  PRIMARY KEY (`id_historico`, `id_empresa`),
  INDEX `fk_historico_empresa_idx` (`id_empresa` ASC) VISIBLE,
  CONSTRAINT `fk_historico_empresa`
    FOREIGN KEY (`id_empresa`)
    REFERENCES `delivery_mineiro`.`empresa` (`id_empresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `delivery_mineiro`.`lista_pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delivery_mineiro`.`lista_pedidos` (
  `id_lista_pedidos` INT NOT NULL AUTO_INCREMENT,
  `data` DATE NOT NULL,
  `valor` DECIMAL(4) NOT NULL,
  `id_empresa` INT,
  `id_usuario` INT,
  PRIMARY KEY (`id_lista_pedidos`, `id_empresa`, `id_usuario`),
  INDEX `fk_lista_pedidos_idx` (`id_empresa`, `id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_lista_pedidos`
    FOREIGN KEY (`id_empresa`)
    REFERENCES `delivery_mineiro`.`empresa` (`id_empresa`),
    FOREIGN KEY (`id_usuario`)
    REFERENCES `delivery_mineiro`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

#drop database `delivery_mineiro`;
#select * from `delivery_mineiro`.`tipo_conta` ;