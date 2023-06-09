CREATE DATABASE IF NOT EXISTS buscaefz5hnbxjjhmj9b;

USE buscaefz5hnbxjjhmj9b;

SELECT
  *
FROM
  equipos;

CREATE TABLE
  IF NOT EXISTS tasks (
    id INT NOT NULL AUTO_INCREMENT,
    tittle VARCHAR(100) NOT NULL,
    description TEXT,
    PRIMARY KEY (id)
  );

CREATE TABLE
  usuarios (
    nombre_empleado VARCHAR(255),
    usuario VARCHAR(50),
    cedula NUMERIC(20, 0) PRIMARY KEY,
    cargo VARCHAR(100),
    proceso VARCHAR(100),
    centro_costo VARCHAR(50)
  );

CREATE TABLE
  equipos (
    nombre_equipo VARCHAR(50),
    categoria VARCHAR(50),
    serial VARCHAR(20) PRIMARY KEY,
    sistema_operativo VARCHAR(50),
    modelo VARCHAR(50),
    fabricante VARCHAR(50),
    procesador VARCHAR(50),
    ram VARCHAR(50),
    tipo_almacenamiento VARCHAR(50),
    capacidad_almacenamiento VARCHAR(50),
    propiedad VARCHAR(50),
    salud VARCHAR(50),
    fecha_ultimo_mantenimiento DATE
  );

CREATE TABLE
  gestion_equipos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_cedula NUMERIC(20, 0),
    equipo_serial VARCHAR(20),
    fecha_movimiento DATE,
    tipo_movimiento VARCHAR(50),
    ubicacion VARCHAR(100),
    link_acta VARCHAR(255),
    FOREIGN KEY (usuario_cedula) REFERENCES usuarios (cedula),
    FOREIGN KEY (equipo_serial) REFERENCES equipos (serial)
  );

SELECT
  *
FROM
  usuarios;

CREATE TABLE
  peripherals (
    id INT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    propiety VARCHAR(10) NOT NULL,
    serial VARCHAR(50),
    assignation VARCHAR(10) NOT NULL,
    salud VARCHAR(50) NOT NULL
  );

ALTER TABLE usuarios ADD FOREIGN KEY (proceso) REFERENCES proceso (nombreProceso),
ADD FOREIGN KEY (centro_costo) REFERENCES ccostos (centroCosto);

CREATE INDEX idx_nombreProceso ON proceso (nombreProceso);

CREATE INDEX idx_centroCosto ON ccostos (centroCosto);

ALTER TABLE usuarios ADD CONSTRAINT fk_usuarios_ccostos FOREIGN KEY (centro_costo) REFERENCES ccostos (centroCosto) ON UPDATE CASCADE;

-- Agregar el campo lider_id a la tabla usuarios
ALTER TABLE usuarios
ADD COLUMN lider_id INTEGER;

-- Crear la relación entre las tablas usuarios y lider
ALTER TABLE usuarios ADD CONSTRAINT fk_lider FOREIGN KEY (lider_id) REFERENCES lider (id);

-- Actualizar los valores de lider_id en la tabla usuarios para que coincidan con los líderes existentes en la tabla lider
UPDATE usuarios
SET
  lider_id = (
    SELECT
      id
    FROM
      lider
    WHERE
      nombre = usuarios.lider
  );

-- Mostrar el nombre del líder asignado a cada usuario en lugar de su ID utilizando una consulta JOIN
SELECT
  usuarios.*,
  lider.nombre AS nombre_lider
FROM
  usuarios
  INNER JOIN lider ON usuarios.lider_id = lider.id;

CREATE TABLE
  printers (
    serial INT PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    propiety VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL
  );