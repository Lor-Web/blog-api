const fs = require('fs');

function deletePost(postId, userToken) {
    const dbFile = 'db.json';
    const usersFile = 'users.json';

    // Проверяем, существует ли пользователь с указанным токеном
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    const user = users.find(u => u.token === userToken);

    if (!user) {
        return {status: 401, message: 'Пользователь не авторизован'};
    }

    // Поиск поста по ID
    const posts = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    const postIndex = posts.findIndex(p => p.post.id === postId);

    if (postIndex === -1) {
        return {status: 404, message: 'Пост не найден'};
    }

    const post = posts[postIndex];

    // Проверяем, имеет ли пользователь право удалять пост
    if (post.user.login !== user.login) {
        return {status: 403, message: 'Нет прав на удаление поста'};
    }

    // Удаляем пост из массива
    posts.splice(postIndex, 1);

    // Перезаписываем файл с обновленными данными
    fs.writeFileSync(dbFile, JSON.stringify(posts, null, 2));
    return {status: 200, message: 'Пост успешно удален'};
}

module.exports = {deletePost};
