# Второй вариант
    movie - таблица с фильмами
    ganre - таблица с жанрами
    movie_ganre - связующая таблица жанров с фильмами


## Запуск сервера
**npm run dev** - режим разработки

**movie.js** - тестовая база данных

----
## **API сервера**
# Фильмы 

  ## 1. Вывод всех фильмов
  - GET - /api/movies

```sql
-- запрос на все фильмы
SELECT
  m.id,
  m.title,
  m.year_release,
  g.title as ganre
  FROM movie m 
  INNER JOIN movie_ganre mg ON m.id = mg.movie_id
  INNER JOIN ganre g ON mg.ganre_id = g.id
```
  вернет
  ```json
  {
    "status": 200,
      "item": 5,
      "data": [
          {
              "id": 1,
              "title": "Зеленая Миля",
              "year": "1999",
              "ganres": [
                  "Драма",
                  "Фентези",
                  "Криминал"
              ]
          }
      ]
  }
  ```
  ## 2. Добавление фильма
  - POST - /api/movies

```sql
-- запрос на добавление фильма
INSERT INTO movie (title, year_release) VALUES ($1, $2) RETURNING *
-- запрос на добавление жанров
INSERT INTO movie_ganre (movie_id, ganre_id) VALUES ($1, $2)
```
  принимает объект
  ```json
  {
    "title":"Новый фильм с жанром",
    "year":"2022",
    "ganres":"1,2,3"
}
  ```
  ## 3. Обновление фильма
  - PATCH - /api/movies?id=1
  
```sql
-- обновление фильма
UPDATE movie SET title = $1, year_release = $2 WHERE id = $3 RETURNING *
-- удаление всех жанров у фильма
DELETE FROM movie_ganre WHERE movie_id = $1
-- добавление новых жанров
INSERT INTO movie_ganre (movie_id, ganre_id) VALUES ($1, $2)
```
  принимает объект
  ```json
  {
    "title":"Переименованное кино",
    "year":"1234",
    "ganres":"5,4,7"
}
  ```
  ## 4. Удаление фильма
  - DELETE - /api/movies?id=1
```sql
-- запрос на удаление фильма
DELETE FROM movie WHERE id = $1
```
  # Жанры
  ## 1. Вывод всех жанров
  - GET - /api/ganres

```sql
-- запрос на все жанры
SELECT id, title  FROM ganre
```
  вернет
  ```json
  {
    "status": 200,
    "item": 9,
    "data": [
        {
            "id": 1,
            "title": "Драма"
        },
        {
            "id": 2,
            "title": "Фентези"
        },
    ]
  }
  ```
   ## 2. Добавление жанра
  - POST - /api/ganres

```sql
-- запрос на добавление жанра
INSERT INTO ganre (title) VALUES ($1) RETURNING *
```
  принимает объект
  ```json
  {
    "title":"Новый жанр"
  }
  ```
  ## 3. Обновление жанра
  - PATCH - /api/ganres?id=1
  
```sql
-- запрос на обновление жанра
UPDATE ganre SET title = $1 WHERE id = $2 RETURNING *
```
  принимает объект
  ```json
  {
  "title":"переименованный жанр"
  }
  ```
  ## 4. Удаление жанра
  - DELETE - /api/ganres?id=1

```sql
-- запрос на удаление жанра
DELETE FROM ganre WHERE id = $1 RETURNING *
```