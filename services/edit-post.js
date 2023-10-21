const fs = require('fs');

function editPost(userToken, postId, title, content, tags) {
    const usersFile = 'users.json';
    const dbFile = 'db.json';

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

    // Проверяем, имеет ли пользователь право редактировать пост
    if (post.user.login !== user.login) {
        return {status: 403, message: 'Нет прав на редактирование поста'};
    }

    // Обновляем информацию о посте
    post.post.title = title;
    post.post.body = content;
    post.post.tags = tags;
    post.post.editTime = Date.now();

    fs.writeFileSync(dbFile, JSON.stringify(posts, null, 2));
    return {status: 200, message: 'Пост успешно отредактирован', post}
}

module.exports = {editPost};
