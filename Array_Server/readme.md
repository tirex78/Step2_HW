# Первый вариант
    с хранением массива ссылок(идентификаторов) на отдельную таблицу с жанрами в виде массива

## Запуск сервера
**npm run dev** - режим разработки

**db.js** - тестовая база данных

----
## **API сервера**
# Фильмы 

  ## 1. Вывод всех фильмов
  - GET - /api/movies
```sql
--получение всех фильмов с жанрами 
  SELECT m.id, m.title, m.year,
  ARRAY(SELECT g.title
  FROM   unnest(m.ganres) WITH ORDINALITY AS a(id, ord)
  JOIN   ganre g USING (id)
  ORDER  BY a.ord) AS ganres
  FROM   movie m
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
INSERT INTO movie (title, year, ganres) VALUES ($1, $2, $3) RETURNING *
```
  принимает объект
  ```json
  {
    "title":"Новый фильм с жанром",
    "year":"2022",
    "ganres":"{1,2,3}"
}
  ```
  ## 3. Обновление фильма
  - PATCH - /api/movies?id=1
  ```sql
  -- запрос на обновление фильма
  UPDATE movie SET title = $1, year = $2, ganres = $3 WHERE id = $4 RETURNING *
  ```
  принимает объект
  ```json
  {
    "title":"Переименованное кино",
    "year":"1234",
    "ganres":"{5,4,7}"
}
  ```
  ## 4. Удаление фильма
  - DELETE - /api/movies?id=1
```sql
-- запрос на удаление фильма
DELETE FROM movie WHERE id = $1 RETURNING *
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
-- запос на добавление жанра
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
  -- запос на обновление жанра
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