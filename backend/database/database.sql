CREATE DATABASE administracion;

CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email VARCHAR(40),
    password VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS income_and_expenses(
    id SERIAL PRIMARY KEY,
    concepto VARCHAR(40),
    monto INT NOT NULL,
    fecha TIMESTAMP,
    tipo VARCHAR(10) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES users (user_id)
);


INSERT INTO users(name, email, password) VALUES
    ('Facundo', 'facu@gmail.com', '123456'),
    ('Nicolas' , 'nicolas@gmail.com', 'abcdefg');

INSERT INTO income_and_expenses(concepto, monto, fecha, tipo, user_id) VALUES
    ('Pago servicio de luz', 500, '2020/10/10', 'egreso', 2),
    ('Pago servicio de gas', 1500, '2020/10/10', 'egreso', 1);
