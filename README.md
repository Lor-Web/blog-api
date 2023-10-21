# Мой Проект Blog API

Этот проект представляет собой API для блога, который позволяет пользователям создавать, редактировать и удалять посты, а также взаимодействовать с ними, добавляя лайки и дизлайки. Также есть возможность регистрации и авторизации пользователей.

Все возможные запросы можно увидеть в [Wiki Blog Api](https://github.com/Lor-Web/blog-api/wiki)

## Как начать пользоваться

1. Клонируем репозиторий - `git clone`
2. Устанавливаем зависимости - `npm i`
3. Запускаем сервер - `node index.js` _сервер будет доступен на localhost:3000_
4. Пример запроса:


```js
async function getPostsByPage(page, postsPerPage) {
    const response = await fetch('http://localhost:3000/' + `blog/posts?page=${page}&postsPerPage=${postsPerPage}`);

    if (response.status === 200) {
        const data = await response.json();
        const {posts, currentPage, totalPages} = data;
    } else {
        // Обработка ошибки
        console.error('Произошла ошибка при получении постов');
    }
}
```
















