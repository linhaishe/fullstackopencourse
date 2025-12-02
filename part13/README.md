# PART 13

course content: https://fullstackopen.com/en/part13

project github: https://github.com/linhaishe/part13-fullstack

1. docker部署Postgres Images数据库
2. 一个后端服务bloglist-backend
3. sequelize操作postgresSQL数据库

# SQL Base

## 1. SELECT / FROM

```sql
# Select query for all columns
SELECT * 
FROM mytable;

# Select query for a specific columns
SELECT column, another_column, …
FROM mytable;
```

## 2. WHERE / conditions

```sql
SELECT column, another_column, …
FROM mytable
WHERE condition
    AND/OR another_condition
    AND/OR …;

SELECT * FROM movies WHERE id = 6;

SELECT title, year
FROM movies
ORDER BY year ASC
LIMIT 5;
```

| Operator            | Condition                                            | SQL Example                           |
| ------------------- | ---------------------------------------------------- | ------------------------------------- |
| =, !=, <, <=, >, >= | Standard numerical operators                         | col_name **!=** 4                     |
| BETWEEN … AND …     | Number is within range of two values (inclusive)     | col_name **BETWEEN** 1.5 **AND** 10.5 |
| NOT BETWEEN … AND … | Number is not within range of two values (inclusive) | col_name **NOT BETWEEN** 1 **AND** 10 |
| IN (…)              | Number exists in a list                              | col_name **IN** (2, 4, 6)             |
| NOT IN (…)          | Number does not exist in a list                      | col_name **NOT IN** (1, 3, 5)         |

| Operator   | Condition                                                    | Example                                                      |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| =          | Case sensitive exact string comparison (*notice the single equals*) | col_name **=** "abc"                                         |
| != or <>   | Case sensitive exact string inequality comparison            | col_name **!=** "abcd"                                       |
| LIKE       | Case insensitive exact string comparison                     | col_name **LIKE** "ABC"                                      |
| NOT LIKE   | Case insensitive exact string inequality comparison          | col_name **NOT LIKE** "ABCD"                                 |
| %          | Used anywhere in a string to match a sequence of zero or more characters (only with LIKE or NOT LIKE) | col_name **LIKE** "%AT%" (matches "AT", "ATTIC", "CAT" or even "BATS") |
| _          | Used anywhere in a string to match a single character (only with LIKE or NOT LIKE) | col_name **LIKE** "AN_" (matches "AND", but not "AN")        |
| IN (…)     | String exists in a list                                      | col_name **IN** ("A", "B", "C")                              |
| NOT IN (…) | String does not exist in a list                              | col_name **NOT IN** ("D", "E", "F")                          |

## 3. conditions / DISTINCT

```sql
# Select query with unique results
# DISTINCT keyword will blindly remove duplicate rows
SELECT DISTINCT column, another_column, …
FROM mytable
WHERE condition(s);
```

```sql
# Select query with ordered results
SELECT column, another_column, …
FROM mytable
WHERE condition(s)
ORDER BY column ASC/DESC;
```

```sql
# Select query with limited rows
SELECT column, another_column, …
FROM mytable
WHERE condition(s)
ORDER BY column ASC/DESC
LIMIT num_limit OFFSET num_offset;
# and the optional OFFSET will specify where to begin counting the number rows from
# OFFSET 后五个
```

## 4. ORDER BY / LIMIT / OFFSET

 the `INNER JOIN` we used last lesson might not be sufficient because the resulting table only contains data that belongs in both of the tables.

```sql
# Select query with INNER JOIN on multiple tables
SELECT column, another_table_column, …
FROM mytable
INNER JOIN another_table 
    ON mytable.id = another_table.id
WHERE condition(s)
ORDER BY column, … ASC/DESC
LIMIT num_limit OFFSET num_offset;
```

## 5. OUTER JOINS

If the two tables have asymmetric data, which can easily happen when data is entered in different stages, then we would have to use a `LEFT JOIN`, `RIGHT JOIN` or `FULL JOIN` instead to ensure that the data you need is not left out of the results.

**LEFT/RIGHT/FULL JOIN**

```sql
SELECT column, another_column, …
FROM mytable
LEFT/RIGHT/FULL JOIN another_table 
    ON mytable.id = another_table.matching_id
WHERE condition(s)
ORDER BY column, … ASC/DESC
LIMIT num_limit OFFSET num_offset;
```

 joining table A to table B

- a `LEFT JOIN` simply includes rows from A regardless of whether a matching row is found in B
- The `RIGHT JOIN` is the same, but reversed, keeping rows in B regardless of whether a match is found in A.
- Finally, a `FULL JOIN` simply means that rows from both tables are kept, regardless of whether a matching row exists in the other table.

```sql
# no diff
SELECT DISTINCT building_name
FROM buildings
JOIN employees
ON buildings.building_name = employees.building;

# with diff and all
SELECT DISTINCT role, building_name	
FROM buildings
LEFT JOIN employees
ON buildings.building_name = employees.building
```

## 6. **NULLs**

```sql
# Select query with constraints on NULL values
SELECT column, another_column, …
FROM mytable
WHERE column IS/IS NOT NULL
AND/OR another_condition
AND/OR …;
```

```sql
SELECT buildings.building_name
FROM buildings
LEFT JOIN employees
ON buildings.building_name = employees.building
WHERE employees.building IS NULL;
```

## 7. **AS**

 a descriptive *alias* using the `AS` keyword.新增一列

```sql
# Example query with expressions 
SELECT particle_speed / 2.0 AS half_particle_speed
FROM physics_data
WHERE ABS(particle_position) * 10.0 > 500;

# Select query with expression aliases
SELECT col_expression AS expr_description, …
FROM mytable;

# Example query with both column and table name aliases
SELECT column AS better_column_name, …
FROM a_long_widgets_table_name AS mywidgets
INNER JOIN widget_sales
ON mywidgets.id = widget_sales.widget_id;
```

```sql
# List all movies and their combined sales in millions of dollars 
SELECT 
    movies.title,
    (boxoffice.domestic_sales + boxoffice.international_sales)/1000000 AS total_sales_million
FROM movies
INNER JOIN boxoffice
ON movies.id = boxoffice.movie_id
ORDER BY total_sales_million DESC;
```

![image-20251029180435063](https://s2.loli.net/2025/11/11/3zCL8TROnJadiuW.png)

```sql
SELECT 
    movies.title,
    boxoffice.rating,
    ROUND(boxoffice.rating / 10 * 100, 0) AS rating_percent
FROM movies
INNER JOIN boxoffice
ON movies.id = boxoffice.movie_id
ORDER BY rating_percent DESC;

```

## 8. HAVING / GROUP BY

In addition to the simple expressions that we introduced last lesson, SQL also supports the use of aggregate expressions (or functions) that allow you to summarize information about a group of rows of data.

```sql
# Select query with aggregate functions over all rows
SELECT AGG_FUNC(column_or_expression) AS aggregate_description, …
FROM mytable
WHERE constraint_expression;
```

| Function                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **COUNT(*****)**, **COUNT(***column***)**                    | A common function used to counts the number of rows in the group if no column name is specified. Otherwise, count the number of rows in the group with non-NULL values in the specified column. |
| **MIN(***column***)**                                        | Finds the smallest numerical value in the specified column for all rows in the group. |
| **MAX(***column***)**                                        | Finds the largest numerical value in the specified column for all rows in the group. |
| **AVG(***column*)                                            | Finds the average numerical value in the specified column for all rows in the group. |
| **SUM(***column***)**                                        | Finds the sum of all numerical values in the specified column for the rows in the group. |
| Docs: [MySQL](https://dev.mysql.com/doc/refman/5.6/en/group-by-functions.html), [Postgres](http://www.postgresql.org/docs/9.4/static/functions-aggregate.html), [SQLite](http://www.sqlite.org/lang_aggfunc.html), [Microsoft SQL Server](https://msdn.microsoft.com/en-us/library/ms173454.aspx) |                                                              |

```sql
# Select query with aggregate functions over groups
SELECT AGG_FUNC(column_or_expression) AS aggregate_description, …
FROM mytable
WHERE constraint_expression
GROUP BY column;

# sample
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;
```

The `GROUP BY` clause works by grouping rows that have the same value in the column specified.

**不能在 `WHERE` 里直接用 `MAX()`**

聚合函数要么用在 `SELECT`、`HAVING`，要么用子查询

```sql
SELECT *
FROM employees
WHERE years_employed = (
    SELECT MAX(years_employed) FROM employees
);

SELECT *
FROM employees
ORDER BY years_employed DESC
LIMIT 1;
```

Luckily, SQL allows us to do this by adding an additional `HAVING` clause which is used specifically with the `GROUP BY` clause to allow us to filter grouped rows from the result set.

```sql
# Select query with HAVING constraint
SELECT group_by_column, AGG_FUNC(column_expression) AS aggregate_result_alias, …
FROM mytable
WHERE condition
GROUP BY column
HAVING group_condition;
```

```sql
SELECT role, COUNT(role) AS total
FROM employees
WHERE role IN ('Artist')
GROUP BY role

SELECT role, SUM(years_employed) AS total
FROM employees
GROUP BY role
HAVING role IN ('Engineer')
```

```sql
# Complete SELECT query
SELECT DISTINCT column, AGG_FUNC(column_or_expression), …
FROM mytable
    JOIN another_table
      ON mytable.column = another_table.column
    WHERE constraint_expression
    GROUP BY column
    HAVING constraint_expression
    ORDER BY column ASC/DESC
    LIMIT count OFFSET COUNT;
```

```sql
# Find the total domestic and international sales that can be attributed to each director

SELECT 
    movies.director,
    SUM(boxoffice.domestic_sales) AS total_domestic_sales,
    SUM(boxoffice.international_sales) AS total_international_sales,
    SUM(boxoffice.domestic_sales + boxoffice.international_sales) AS total_sales
FROM movies
INNER JOIN boxoffice
ON movies.id = boxoffice.movie_id
GROUP BY movies.director;

```

## 9. INSERT INTO

In SQL, the *database schema* is what describes the structure of each table, and the datatypes that each column of the table can contain.

```sql
# Insert statement with specific columns
INSERT INTO mytable
(column, another_column, …)
VALUES (value_or_expr, another_value_or_expr, …),
      (value_or_expr_2, another_value_or_expr_2, …)
  
# Insert statement with values for all columns
INSERT INTO mytable
VALUES (value_or_expr, another_value_or_expr, …),
       (value_or_expr_2, another_value_or_expr_2, …)
       
# sample
INSERT INTO boxoffice
(movie_id, rating, sales_in_millions)
VALUES (1, 9.9, 283742034 / 1000000);
```

## 10. UPDATE

```sql
# Update statement with values
UPDATE mytable
SET column = value_or_expr, 
    other_column = another_value_or_expr, 
    …
WHERE condition;
```

```sql
UPDATE employees
SET salary = salary + 500
WHERE name = 'Bob';
```

⚠️ Most people working with SQL **will** make mistakes updating data at one point or another. Whether it's updating the wrong set of rows in a production database, or accidentally leaving out the `WHERE` clause (which causes the update to apply to *all* rows), you need to be extra careful when constructing `UPDATE` statements.

One helpful tip is to always write the constraint first and test it in a `SELECT` query to make sure you are updating the right rows, and only then writing the column/value pairs to update.

## 11. DELETE

```sql
# Delete statement with condition
DELETE FROM mytable
WHERE condition;
```

## 12. CREATE

```sql
# Create table statement w/ optional table constraint and default value
CREATE TABLE IF NOT EXISTS mytable (
    column DataType TableConstraint DEFAULT default_value,
    another_column DataType TableConstraint DEFAULT default_value,
    …
);
```

```sql
# Movies table schema
CREATE TABLE movies (
    id INTEGER PRIMARY KEY,
    title TEXT,
    director TEXT,
    year INTEGER, 
    length_minutes INTEGER # 最后不能有逗号...
);
```



| Data type                                                    | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `INTEGER`, `BOOLEAN`                                         | The integer datatypes can store whole integer values like the count of a number or an age. In some implementations, the boolean value is just represented as an integer value of just 0 or 1. |
| `FLOAT`, `DOUBLE`, `REAL`                                    | The floating point datatypes can store more precise numerical data like measurements or fractional values. Different types can be used depending on the floating point precision required for that value. |
| `CHARACTER(num_chars)`, `VARCHAR(num_chars)`, `TEXT`         | The text based datatypes can store strings and text in all sorts of locales. The distinction between the various types generally amount to underlaying efficiency of the database when working with these columns.Both the CHARACTER and VARCHAR (variable character) types are specified with the max number of characters that they can store (longer values may be truncated), so can be more efficient to store and query with big tables. |
| `DATE`, `DATETIME`                                           | SQL can also store date and time stamps to keep track of time series and event data. They can be tricky to work with especially when manipulating data across timezones. |
| `BLOB`                                                       | Finally, SQL can store binary data in blobs right in the database. These values are often opaque to the database, so you usually have to store them with the right metadata to requery them. |
| Docs: [MySQL](http://dev.mysql.com/doc/refman/5.6/en/data-types.html), [Postgres](http://www.postgresql.org/docs/9.4/static/datatype.html), [SQLite](https://www.sqlite.org/datatype3.html), [Microsoft SQL Server](https://msdn.microsoft.com/en-us/library/ms187752.aspx) |                                                              |

### Table constraints

We aren't going to dive too deep into table constraints in this lesson, but each column can have additional table constraints on it which limit what values can be inserted into that column. This is not a comprehensive list, but will show a few common constraints that you might find useful.

| Constraint           | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| `PRIMARY KEY`        | This means that the values in this column are unique, and each value can be used to identify a single row in this table. |
| `AUTOINCREMENT`      | For integer values, this means that the value is automatically filled in and incremented with each row insertion. Not supported in all databases. |
| `UNIQUE`             | This means that the values in this column have to be unique, so you can't insert another row with the same value in this column as another row in the table. Differs from the `PRIMARY KEY` in that it doesn't have to be a key for a row in the table. |
| `NOT NULL`           | This means that the inserted value can not be `NULL`.        |
| `CHECK (expression)` | This allows you to run a more complex expression to test whether the values inserted are valid. For example, you can check that values are positive, or greater than a specific size, or start with a certain prefix, etc. |
| `FOREIGN KEY`        | This is a consistency check which ensures that each value in this column corresponds to another value in a column in another table.  For example, if there are two tables, one listing all Employees by ID, and another listing their payroll information, the `FOREIGN KEY` can ensure that every row in the payroll table corresponds to a valid employee in the master Employee list. |

## 13. ALTER

```sql
# Altering table to add new column(s)
ALTER TABLE mytable
ADD column DataType OptionalTableConstraint 
    DEFAULT default_value;
    
# Altering table to remove column(s)
ALTER TABLE mytable
DROP column_to_be_deleted;

# Altering table name
ALTER TABLE mytable
RENAME TO new_table_name;

ALTER TABLE movies
ADD COLUMN Language TEXT
DEFAULT 'English'
```

## 14. DROP

```sql
# Drop table statement
DROP TABLE IF EXISTS mytable;
```

# Document databases

The schema of the database exists only in the program code, which interprets the data in a specific way, e.g. by identifying that some of the fields are references to objects in another collection.

MongoDB also does not care what fields the entities stored in the collections have. Therefore MongoDB leaves it entirely up to the programmer to ensure that the correct information is being stored in the database.

One of the advantages is the flexibility that schema agnosticism brings: since the schema does not need to be defined at the database level, application development may be faster in certain cases, and easier, with less effort needed in defining and modifying the schema in any case. 

Problems with not having a schema are related to error-proneness: everything is left up to the programmer. The database itself has no way of checking whether the data in it is *honest*,

The reason why the the previous sections of the course used MongoDB is precisely because of its schema-less nature, which has made it easier to use the database for someone with little knowledge of relational databases. For most of the use cases of this course, I personally would have chosen to use a relational database.

# Application database

 There are many options, but we will be using the currently most popular Open Source solution [PostgreSQL](https://www.postgresql.org/). 

Note that if you only need the database, and are not planning to deploy the app to Fly.io, it is also possible to [just create the database to Fly.io](https://fly.io/docs/mpg/).or render https://render.com/docs/postgresql

基本都在收费，render有一个30天的免费试用，用来练手我看是可以的

1. 在fly.io/others和heroku创建Postgres云数据库 / 或者尝试本地构建数据库，通过docker 跑服务
2. 用 [sequelize](https://sequelize.org/master/) / prisma中间件使用数据库

| 项目     | Prisma                         | PostgreSQL                        |
| -------- | ------------------------------ | --------------------------------- |
| 类型     | ORM（对象关系映射工具）        | 关系型数据库                      |
| 作用     | 用代码操作数据库、做查询、迁移 | 存储数据、事务处理、提供 SQL 接口 |
| 类似工具 | Sequelize、TypeORM、Drizzle    | MySQL、MariaDB、SQLite            |
| 运行位置 | 在你的 Node.js 服务端          | 独立服务（本地/云端）             |

# docker with Postgres Image

Start Postgres [Docker image](https://hub.docker.com/_/postgres) with the command

```bash
# build postgres database in docker
# option 1
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
# option 2
docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres
# option 3 (prefer)
docker run --name hello-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres

# 走bash command 操作数据库 command 4
docker exec -it hello-postgres psql -U postgres postgres
# Defined in this way, the data stored in the database is persisted only as long as the container exists. 
```

`--name some-postgres`：给容器起名叫 `some-postgres`，方便后续通过名字管理（例如 `docker stop some-postgres`、`docker exec -it some-postgres bash`）。

`-e POSTGRES_PASSWORD=mysecretpassword`：设置 PostgreSQL 的管理员密码。

`-d`：后台运行（detached mode）。

`postgres`：镜像名。

**特点：**

- 容器会自动在内部开放 PostgreSQL 默认端口（5432），但**没有映射到宿主机**。
- 因此，你不能直接在宿主机通过 `localhost:5432` 访问数据库。
- 适合容器间通信（比如另一个容器连接到它）。

Command 2没有 `--name`，Docker 会自动分配一个随机容器名。

`-e POSTGRES_PASSWORD=mysecretpassword`：同样设置密码。

`-p 5432:5432`：将容器内的 5432 端口映射到宿主机的 5432 端口。

没有 `-d`，所以它会**前台运行**（除非你加上 `-d`）。

**特点：**

- 可以在宿主机上直接用命令连接数据库：

  ```bash
  psql -h localhost -U postgres
  ```

- 每次重启容器后名称可能不同（不方便管理）。

`docker exec -it hello-postgres psql -U postgres postgres`

| 部分             | 作用                                                         |
| ---------------- | ------------------------------------------------------------ |
| `docker exec`    | 在**已运行的容器**里执行一个命令。                           |
| `-it`            | 组合两个参数： - `-i` = 交互模式 (interactive) - `-t` = 分配一个伪终端 (tty)，让你能输入命令。 |
| `hello-postgres` | 这是你要进入的容器名（比如用 `docker ps` 能看到的 `NAMES` 列）。 |
| `psql`           | PostgreSQL 自带的命令行客户端，用来和数据库交互。            |
| `-U postgres`    | 指定连接数据库的用户（这里是默认管理员用户 `postgres`）。    |
| `postgres`       | 最后这个是**要连接的数据库名**（通常默认数据库也叫 `postgres`）。 |

-----

有很多操作Postgres 的可视化工具，也可以走命令。

There are many ways to do this, there are several different graphical user interfaces, such as [pgAdmin](https://www.pgadmin.org/). However, we will be using Postgres [psql](https://www.postgresql.org/docs/current/app-psql.html) command-line tool.

```bash
\d # which tells you the contents of the database:
```

在命令里就可以走Sql语法来增删改查数据库了。

## Connecting to a Database build in docker

Usage: https://www.postgresql.org/docs/current/app-psql.html

install devs

```bash
npm install express dotenv pg sequelize
```

 [sequelize](https://sequelize.org/master/) is the library through which we use Postgres. 

https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships

用这个中间件操作/链接数据库

```bash
docker run --name hello-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres

DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/postgres

# entry bash and into cli
docker exec -it hello-postgres bash
psql -U postgres

# 进入数据库 CLI
docker exec -it hello-postgres psql -U postgres
```

```sql
# blogs table schema
CREATE TABLE blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL, 
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs
(id, author, url, title)
VALUES (1, 'chen ruo', 'https://dashboard.heroku.com/', 'book2');

curl -X GET http://localhost:3001/api/users
curl -X GET http://localhost:3001/api/blogs

curl -X POST http://localhost:3001/api/blogs \
  -H "Content-Type: application/json" \
  -d '{"author":"Alice","title":"New Blog","url":"https://example.com"}'

curl -X DELETE http://localhost:3001/api/blogs/4

curl -X PUT http://localhost:3001/api/blogs/9 \
  -H "Content-Type: application/json" \
  -d '{"author":"Butan","title":"New Blog4","url":"https://example.com", "likes": 19}'
  
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"username": "Alice", "name": "Alice-name", "email": "xusumu@gmail.com"}'
  
curl -X POST http://localhost:3001/api/users \
-H "Content-Type: application/json" \
-d '{"username": "Alice2", "name": "Alice-name2", "email": "xusumu@gmail.com"}'
  
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "Alice", "name": "Alice-name", "password": "secret"}'
  
  curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "Bob", "name": "Bob-name", "password": "secret"}'
  
curl -X POST http://localhost:3001/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBbGljZSIsImlhdCI6MTc2MTkxMDc4MCwiZXhwIjoxNzYyNTE1NTgwfQ.Gqq9CGDfH_4p-rXPFWvLcIlQOkDru9EjI6vstnWySN0" \
  -d '{"author":"XXXX3","title":"New Blog react3","url":"https://example.com", "year": 1996}'

curl -X DELETE http://localhost:3001/api/blogs/5 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsaWNlIiwiaWQiOjEsImlhdCI6MTc2MTg4OTA4NX0.-0Gd3LVWWXlom3PbqdjqR_Z4qAEKoKrTbGavKZPYxy8"
  
curl -X DELETE http://localhost:3001/api/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBbGljZSIsImlhdCI6MTc2MTkxMDc4MCwiZXhwIjoxNzYyNTE1NTgwfQ.Gqq9CGDfH_4p-rXPFWvLcIlQOkDru9EjI6vstnWySN0"
  
INSERT INTO user_marks (user_id, blog_id) values (1, 1);

curl -X PUT http://localhost:3001/api/readinglist/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsaWNlIiwiaWQiOjEsImlhdCI6MTc2MTkwMDI5NX0.jPlSRr88ttUz8mUY9W505w6BlhBfdi7meDLJpDFBdMY" \
  -d '{"read": true}'

```

 `express-async-errors` 是一个 **处理 Express 异步路由错误的库**，目的是让你 **不用每个 async 路由里都写 try/catch**，仍然可以让错误传到全局错误处理中间件。

#### 不用 `express-async-errors`，直接全局 try/catch

- Express 5 本身 **已经改进了 async 错误处理**
- 所以你 **可以直接写 async 路由**，抛出的异常会被 Express 5 自动传到错误处理中间件

```js
// 全局错误处理中间件
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: err.message })
})
```

```js
router.get("/", async (req, res) => {
  const users = await User.findAll({
    
    // Making a join query
    include: {
      model: Blog,
    },
  });
  res.json(users);
});
```

```sql
SELECT "User". "id", "User". "username", "User". "name", "Notes". "id" AS "Notes.id", "Notes". "content" AS "Notes.content", "Notes". "important" AS "Notes.important", "Notes". "date" AS "Notes.date", "Notes". "user_id" AS "Notes.UserId"
FROM "users" AS "User" LEFT OUTER JOIN "notes" AS "Notes" ON "User". "id" = "Notes". "user_id";
```

```js
const user = await User.findByPk(req.decodedToken.id)

// create a note without saving it yet
const note = Note.build({ ...req.body, date: new Date() })
 // put the user id in the userId property of the created note
note.userId = user.id
// store the note object in the database
await note.save()
```

# migrations

[migrations](https://sequelize.org/master/manual/migrations.html)

a migration is a single JavaScript file that describes some modification to a database. 

每次重启dev的时候，migrations里的文件会被操作一遍，但如果已经有记录操作过了，则不会再次操作。如果migrations有更新或者有新增才会重新被操作。

一个 **migration（迁移）** 就是一个 **JavaScript 文件**，里面写着对数据库的一次修改。也就是说，这个文件描述了数据库结构要怎么“变”。每次你对数据库结构有变动（不管是一项还是多项），你都应该新建一个 **独立的 migration 文件**。它在数据库里有一张专门的表（通常叫 `SequelizeMeta`），存放执行过的 migration 文件名。这样一来：数据库的变化是**可控的、有记录的**；每个改动都有相应的 JS 文件；这些文件可以放进 **版本控制系统（如 Git）**，方便团队协作和回溯。

![image-20251111213244036](https://s2.loli.net/2025/11/11/p53ERXoSmYOeGyP.png)

We could run the migrations from the command line using the [Sequelize command line tool](https://github.com/sequelize/cli). However, we choose to perform the migrations manually from the program code using the [Umzug](https://github.com/sequelize/umzug) library. Let's install the library

When defining migrations, it is essential to remember that unlike models, column and table names are written in snake case form:

```js
const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('notes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      important: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE
      },
    })
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    })
    await queryInterface.addColumn('notes', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('notes')
    await queryInterface.dropTable('users')
  },
}
```

So in migrations, the names of the tables and columns are written exactly as they appear in the database, while models use Sequelize's default camelCase naming convention.（emmmm例子里面不是下划线吗。。。

```
👀 Migrations up to date { files: [] }
```

会出现文件空数组的情况，是因为只执行新的迁移（未执行过的文件）。去查看SELECT * FROM migrations;的内容的时候，会看到表输出，说明表单执行过了。

## 重新运行迁移（比如修改了 migration 文件）

docker里的所有相关表格需要全部删除

方式 1：撤销所有迁移再重跑

```js
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate

// 或如果你用的是 Umzug 自己写的
await migrator.down({ to: 0 }); // 回滚所有
await migrator.up(); // 重新执行所有迁移
```

方式 2：手动清空 migrations 表

```sql
DELETE FROM migrations;

npm run migrate
```

一定要删除 migrations 表！

## 格式化数据库


## 方法 1：在 **psql** 里用 SQL

打开 `psql` 连接到你的数据库：

```
psql -U postgres -d postxxx
```

然后执行：

```
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

**说明：**

- `DROP SCHEMA public CASCADE;` 会删除 public schema 下的所有表、序列、约束等。
- `CREATE SCHEMA public;` 重建 schema，这样数据库就空了，可以重新建表。
- 非常适合快速重置数据库。

# token 失效

Keep in mind that actions requiring login should not be successful with an "expired token", i.e. with the same token after logging out. You may also choose to use some purpose-built npm library to handle sessions.

## 🧩 第一部分：解释这句话的意思

> “Keep in mind that actions requiring login should not be successful with an ‘expired token’, i.e. with the same token after logging out.”

意思是：

> 当用户 **登出(logout)** 之后，即使他仍然保留了原来的 **JWT token**，
>  也 **不应该再能调用任何需要登录权限的接口**。

换句话说：

- 你不能只让前端“忘掉 token”就完事。
- 还需要在服务端 **让这个 token 无效化（blacklist/删除）**。
- 否则，别人用相同 token 依然可以访问受保护的资源，**不安全**。

------

## 🔐 解决方案思路

登出后 token 自动失效有两种常见实现方式：

| 方式                       | 思路                                                         | 优点       | 缺点                                  |
| -------------------------- | ------------------------------------------------------------ | ---------- | ------------------------------------- |
| ✅ **存储 token（黑名单）** | 把登录生成的 token 存在数据库中（如 `UserToken` 表）。登出时删除。验证时先查数据库是否存在。 | 安全、简单 | 每次验证都要查数据库                  |
| ⏱️ **设置过期时间 (exp)**   | token 里写入 `exp` 时间，比如 1 小时后自动过期。             | 无需数据库 | 登出前 token 仍然有效（不能立刻失效） |

👉 所以最安全的做法是：
 **两者结合：**
 JWT 内置过期时间（比如 1 小时），
 同时在服务端维护一份有效 token 表。登出时从表中删掉。

------

## ⚙️ 第二部分：推荐的 npm 库

你有两种路线可以选 👇

### 🧩 路线 A — 继续用 JWT（你现在的方案）

保持 `jsonwebtoken`，但配合 “token 表 + 验证逻辑”：

```bash
npm install jsonwebtoken
```

加一个 token 校验中间件，比如：

```js
import jwt from "jsonwebtoken";
import { UserToken } from "../models/index.js";

export const authenticateToken = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (!authorization?.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "token missing" });
  }

  const token = authorization.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    // 🧠 检查 token 是否仍在数据库中（防止登出后继续使用）
    const validToken = await UserToken.findOne({ where: { userId: decoded.id, token } });
    if (!validToken) {
      return res.status(401).json({ error: "token expired or invalid" });
    }

    req.decodedToken = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "token invalid" });
  }
};
```

这样，登出后删除 token 就完全安全了 ✅。

------

### 🪄 路线 B — 使用 session 管理库

如果你不想自己维护 token 表，可以改用 **session 管理库**，让它自动处理登录状态和过期问题。

#### 常用推荐：

| 库名                  | 简介                                                         | 适合场景           |
| --------------------- | ------------------------------------------------------------ | ------------------ |
| **express-session**   | Express 官方推荐的 session 中间件，用 cookie+server 存储 session | 普通 Web 应用      |
| **connect-pg-simple** | 把 express-session 存在 PostgreSQL 里                        | 你当前的数据库场景 |
| **passport.js**       | 一整套认证框架，支持本地登录、JWT、OAuth 等多种策略          | 大型项目           |
| **iron-session**      | 无需数据库，session 加密存在 cookie 中                       | Next.js/简单后端   |

------

💡 简单推荐：
 如果你已经用 PostgreSQL，可以直接：

```bash
npm install express-session connect-pg-simple
```

然后在 `app.js` 中：

```js
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
const PgSession = connectPgSimple(session);

app.use(
  session({
    store: new PgSession({ conString: process.env.DATABASE_URL }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600 * 1000 } // 1 hour
  })
);
```

这样 Express 会自动帮你：

- 登录时建立 session
- 登出时销毁 session
- 过期自动失效
- 不用手动维护 token 表

# UserToken.init里的model name下划线默认查询数据库的名称为复数

Q： 我看输出的命令是这个    sql: 'SELECT "id", "user_id" AS "userId", "token" FROM "user_tokens" AS "user_token" WHERE "user_token"."user_id" = 1 LIMIT 1;', 但我没有user_tokens的相关命令

###### ChatGPT 说：

非常好观察 👀！这说明 Sequelize 正在执行

```sql
SELECT ... FROM "user_tokens"
```

也就是说，它**期望数据库里有一张叫 `user_tokens` 的表**。

------

### 🔍 原因

这是由你模型里的配置决定的 👇

```js
UserToken.init(
  {...},
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "user_token", // ✅ 注意这里！
  }
);
```

当你在 `modelName` 中写的是 `"user_token"` 并且启用了 `underscored: true`，
 Sequelize 会自动推导出表名是 **复数形式**，即：

```
user_token → user_tokens
```

> Sequelize 默认会对 `modelName` 自动复数化作为表名，除非你显式指定 `tableName`。

### ✅ 解决方案有两种

#### ✅ 方案 1：保持默认复数化

直接让数据库的表名改成 `user_tokens` 即可。
 也就是在 migration 里改成：

```js
await queryInterface.createTable("user_tokens", {  // ✅ 注意这里改成复数
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
```

这样模型和数据库就匹配了。

------

#### ✅ 方案 2：强制使用单数表名

如果你更想保持 `user_token`（单数），可以加上：

```js
UserToken.init(
  {...},
  {
    sequelize,
    tableName: "user_token", // ✅ 强制指定表名
    underscored: true,
    timestamps: false,
    modelName: "UserToken",
  }
);
```

这样 Sequelize 就不会复数化了。
