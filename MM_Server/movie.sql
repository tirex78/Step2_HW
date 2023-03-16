CREATE DATABASE mm_movies
WITH
    ENCODING = 'UTF8' CONNECTION
LIMIT = -1;

CREATE TABLE
    public.ganre (
        id serial NOT NULL,
        title character varying(50) NOT NULL,
        CONSTRAINT pk_ganre_id PRIMARY KEY (id)
    );

CREATE TABLE
    public.movie (
        id serial NOT NULL,
        title character varying(100) NOT NULL,
        year_release numeric,
        CONSTRAINT pk_movie_id PRIMARY KEY (id)
    );

CREATE TABLE
    public.movie_ganre (
        movie_id integer,
        ganre_id integer,
        CONSTRAINT fk_move_id FOREIGN KEY (movie_id) REFERENCES movie (id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_ganre_id FOREIGN KEY (ganre_id) REFERENCES ganre (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

INSERT INTO
    public.ganre (title)
VALUES ('Драма'), ('Фентези'), ('Криминал'), ('Комедия'), ('Мелодрама'), ('История'), ('Триллер'), ('Фентези'), ('Криминал');

INSERT INTO
    public.movie (title, year_release)
VALUES ('Зеленая Миля', 1999), ('Нюрнберг', 2023), ('Всё везде и сразу', 2021), ('Вавилон', 2022), ('Переименованное кино', 1234);

INSERT INTO public.movie_ganre
VALUES (1, 1), (1, 2), (1, 3), (2, 4), (2, 6), (3, 2), (3, 3);