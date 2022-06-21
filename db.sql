-- Roles_usuarios
CREATE TABLE roles_usuario(codigo_rol INT(04) NOT NULL PRIMARY KEY, nombre_rol VARCHAR(50) NOT NULL, descripcion_rol VARCHAR(50) NOT NULL);   
INSERT INTO roles_usuario(codigo_rol,nombre_rol,descripcion_rol) VALUES (0001,'Administrador','Gestiona la empresa y sistema')

--Personas
CREATE TABLE personas(dni_persona INT(09) NOT NULL PRIMARY KEY, nombre_persona VARCHAR(50) NOT NULL, apellido_paterno VARCHAR(50) NOT NULL, apellido_materno VARCHAR(50) NOT NULL, telefono int(9) NOT NULL , correo_electronico varchar(50) NOT NULL, direccion_persona varchar(50) NOT NULL);
INSERT INTO personas(dni_persona,nombre_persona,apellido_paterno,apellido_materno,telefono,correo_electronico,direccion_persona) VALUES (70472530,'Renzo','Bustamante','Nestares',970489298,'renzodylan@hotmail.com','av. Pacifico');
--usuarios
CREATE TABLE usuarios(usuario INT(09) NOT NULL AUTO_INCREMENT PRIMARY KEY, dni_persona INT(09) NOT NULL, codigo_rol INT(04) NOT NULL,
nombre_usuario VARCHAR(20) NOT NULL, pass VARCHAR(200) NOT NULL, estado_usuario VARCHAR(50) NOT NULL,
CONSTRAINT fk_rol FOREIGN KEY(codigo_rol) REFERENCES roles_usuario(codigo_rol),
CONSTRAINT fk_per FOREIGN KEY(dni_persona) REFERENCES personas(dni_persona));
INSERT INTO usuarios(dni_persona,codigo_rol,nombre_usuario,contrasena,estado_usuario) VALUES(70472530,0001,'renzoBN','4571536','Activo');

