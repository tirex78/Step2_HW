CREATE DATABASE kinopoisk
WITH
    ENCODING = 'UTF8' CONNECTION
LIMIT = -1;

-- Таблица Фильмы

CREATE TABLE
    IF NOT EXISTS movie (
        id serial NOT NULL,
        title character varying(150) NOT NULL,
        description text,
        year_release date,
        budget numeric,
        marketing numeric,
        director_id integer,
        script_id integer,
        producer_id integer,
        operator_id integer,
        composer_id integer,
        artist_id integer,
        mounting_id integer,
        rus_premiere date,
        world_premiere date,
        dvd_release date,
        age integer,
        time character varying(5),
        CONSTRAINT pk_movie PRIMARY KEY (id),
        CONSTRAINT fk_director_id FOREIGN KEY (director_id) REFERENCES person (id),
        CONSTRAINT fk_script_id FOREIGN KEY (script_id) REFERENCES person (id),
        CONSTRAINT fk_producer_id FOREIGN KEY (producer_id) REFERENCES person (id),
        CONSTRAINT fk_operator_id FOREIGN KEY (operator_id) REFERENCES person (id),
        CONSTRAINT fk_composer_id FOREIGN KEY (composer_id) REFERENCES person (id),
        CONSTRAINT fk_mounting_id FOREIGN KEY (mounting_id) REFERENCES person (id),
        CONSTRAINT fk_artist_id FOREIGN KEY (artist_id) REFERENCES person (id)
    );

-- Таблица Персоны

CREATE TABLE
    IF NOT EXISTS person (
        id serial NOT NULL,
        first_name character varying(50),
        last_name character varying(50),
        job character varying(50),
        creer text,
        height numeric,
        date_of_birth date,
        CONSTRAINT pk_person PRIMARY KEY (id)
    );

-- Таблица В главных ролях

CREATE TABLE
    IF NOT EXISTS staring (
        id serial NOT NULL,
        person_id integer,
        movie_id integer,
        CONSTRAINT pk_staring PRIMARY KEY (id),
        CONSTRAINT fk_movie_id FOREIGN KEY (movie_id) REFERENCES movie (id),
        CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES person (id)
    );

-- Таблица Роли дублировали

CREATE TABLE
    IF NOT EXISTS role_duplicated (
        person_id integer,
        movie_id integer,
        dubler_id integer,
        --dubler_id кого дублировал
        CONSTRAINT fk_staring FOREIGN KEY (dubler_id) REFERENCES staring(id),
        CONSTRAINT fk_movie_id FOREIGN KEY (movie_id) REFERENCES movie(id),
        CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES person(id)
    );

-- Таблица Жанров

CREATE TABLE
    IF NOT EXISTS ganre (
        id serial NOT NULL,
        title character varying(50) NOT NULL,
        CONSTRAINT pk_ganre PRIMARY KEY (id)
    );

-- Таблица Жанры_Фильмы

CREATE TABLE
    IF NOT EXISTS ganre_movie (
        movie_id integer NOT NULL,
        ganre_id integer NOT NULL,
        CONSTRAINT fk_movie_id FOREIGN KEY (movie_id) REFERENCES movie (id),
        CONSTRAINT fk_ganre_id FOREIGN KEY (ganre_id) REFERENCES ganre (id)
    );

-- Таблица Просмотров

CREATE TABLE
    IF NOT EXISTS audience (
        movie_id integer,
        country_name character varying(100),
        viewers numeric,
        CONSTRAINT fk_movie_id FOREIGN KEY (movie_id) REFERENCES movie (id)
    );