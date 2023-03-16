CREATE DATABASE movies
WITH
    ENCODING = 'UTF8' CONNECTION
LIMIT = -1;

CREATE TABLE
    public.ganre (
        id serial NOT NULL PRIMARY KEY,
        title character varying(50) NOT NULL
    );

CREATE TABLE
    public.movie (
        id serial NOT NULL PRIMARY KEY,
        title character varying(100) NOT NULL,
        year numeric,
        ganres integer [],
    )
INSERT INTO ganre
VALUES ("Драма"), ("Фентези"), ("Криминал"), ("Комедия"), ("Мелодрама"), ("История"), ("Триллер"), ("Фентези"), ("Криминал");

INSERT INTO ganre
VALUES ("Зеленая Миля" 1999{1, 2, 3}), ("Нюрнберг" 2023{6}), ("Всё везде и сразу" 2021{4, 5}), ("Вавилон" 2022{8, 9}), (
        "Переименованное кино" 1234{5,
        4,
        7}
    );