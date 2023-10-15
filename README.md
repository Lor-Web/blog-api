# Мой Проект Blog API

Этот проект представляет собой API для блога, который позволяет пользователям создавать, редактировать и удалять посты, а также взаимодействовать с ними, добавляя лайки и дизлайки. Также есть возможность регистрации и авторизации пользователей.

## Основные маршруты API

### Регистрация пользователя

- **Метод**: POST
- **Маршрут**: /auth/register
- **Запрос**:

```json
{
  "login": "example_user",
  "password": "secure_password"
}
```

### Ответ

```json
{
  "message": "Пользователь успешно зарегистрирован",
  "user": {
    "login": "example_user",
    "userName": "example_user",
    "avatar": "",
    "about": "",
    "birthday": "",
    "token": "unique_token_user",
  },
}
```

### Вход для пользователя

- **Метод**: POST
- **Маршрут**: /auth/login
- **Запрос**:

```json
{
  "login": "example_user",
  "password": "secure_password"
}
```

### Ответ

```json
{
  "message": "Авторизация успешна",
}
```

### Добавление нового поста

- **Метод**: POST
- **Маршрут**: /blog/posts
- **Запрос**:

```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "user_token",
  },
  "body": {
    "title": "title_post",
    "content": "content_post",
    "tags": "tags_post",
  },
}
```

### Ответ

```json
{
  "message": "Пост успешно добавлен",
  "post": "result_post",
  "user": "author_post",
}
```

### Получение всех постов

- **Метод**: GET
- **Маршрут**: /blog/posts?page=${page}&postsPerPage=${postsPerPage}
- **Запрос**:

### Ответ

```json
{
  "message": "Посты успешно получены",
  "posts": "result_posts",
  "currentPage": "current_page",
  "totalPages": "total_pages",
}
```

### Получение поста по ID

- **Метод**: GET
- **Маршрут**: /blog/posts/${postId}
- **Запрос**:

### Ответ

```json
{
  "message": "Пост успешно найден",
  "post": "result_post",
}
```

### Редактирование поста по ID

- **Метод**: PUT
- **Маршрут**: /blog/posts/${postId}
- **Запрос**:

```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "user_token",
  },
  "body": {
    "title": "title_post",
    "content": "content_post",
    "tags": "tags_post",
  },
}
```

### Ответ

```json
{
  "message": "Пост успешно отредактирован",
  "post": "result_updated_post",
}
```

### Удаление поста по ID

- **Метод**: DELETE
- **Маршрут**: /blog/posts/${postId}
- **Запрос**:

```json
{
  "headers": {
    "Authorization": "user_token",
  },
}
```

### Ответ

```json
{
  "message": "Пост успешно удален",
}
```

### Добваить комментарий к посту

- **Метод**: POST
- **Маршрут**: /blog/posts/${postId}/add-comment
- **Запрос**:

```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "user_token",
  },
  "body": {
    "text": "text_comment",
  },
}
```

### Ответ

```json
{
  "message": "Комментарий успешно добавлен",
  "updatedPost": "updated_post",
}
```

### Отредактировать комментарий у поста

- **Метод**: PUT
- **Маршрут**: /blog/posts/${postId}/edit-comment/${commentId}
- **Запрос**:

```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "user_token",
  },
  "body": {
    "newText": "new_text_comment",
  },
}
```

### Ответ

```json
{
  "message": "Комментарий успешно отредактирован",
  "updatedPost": "updated_post",
}
```

### Удалить комментарий

- **Метод**: PUT
- **Маршрут**: /blog/posts/${postId}/delete-comment/${commentId}
- **Запрос**:

```json
{
  "headers": {
    "Authorization": "user_token",
  },
}
```

### Ответ

```json
{
  "message": "Комментарий успешно удален",
  "updatedPost": "updated_post",
}
```

### Получить все теги

- **Метод**: GET
- **Маршрут**: /blog/tags
- **Запрос**:

### Ответ

```json
{
  "message": "Все теги успешно получены",
  "allTags": "all_tags",
}
```

### Получить посты по тегу

- **Метод**: GET
- **Маршрут**: /blog/posts/by-tag/${tag}
- **Запрос**:

### Ответ

```json
{
  "message": "Посты по тегу успешно получены",
  "posts": "all_posts_by_tag",
}
```

### Получить профиль пользователя

- **Метод**: GET
- **Маршрут**: /users/profile
- **Запрос**:

```json
{
  "headers": {
    "Authorization": "user_token",
  }
}
```

### Ответ

```json
{
  "message": "Данные пользователя получены",
  "user": "user_data",
  "posts": "user_posts",
}
```

### Редактировать профиль пользователя

- **Метод**: PUT
- **Маршрут**: /users/profile-edit
- **Запрос**:

```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "user_token",
  },
  "body": {
    "userName": "user_name",
    "about": "user_about",
    "birthday": "user_birthday",
    "avatar": "user_avatar_src",
  },
}
```

### Ответ

```json
{
  "message": "Профиль пользователя успешно обновлен",
  "updatedUser": "updated_user",
}
```
