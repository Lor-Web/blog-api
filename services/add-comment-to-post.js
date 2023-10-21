const fs = require('fs');
const uuid = require('uuid');

function addCommentToPost(postId, userToken, text) {
    const dbFile = 'db.json'

    // Найти пост по ID в базе данных
    const posts = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    const post = posts.find(p => p.post.id === postId);

    // Проверяем, существует ли пользователь с указанным токеном
    const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    const user = users.find(u => u.token === userToken);

    if (!user) {
        return {status: 401, message: 'Пользователь не авторизован'};
    }

    if (!post) {
        return {status: 404, message: 'Пост не найден'};
    }

    // Создаем новый комментарий
    const newComment = {
        id: uuid.v4(), text, user: {
            login: user.login,
            token: user.token,
            avatar: user.avatar,
            userName: user.username,
            about: user.about,
            birthday: user.birthday,
        }, date: Date.now(),
    };

    // Добавляем комментарий к посту
    post.post.comments.push(newComment);

    // Сохранить обновленный пост в базе данных
    fs.writeFileSync(dbFile, JSON.stringify(posts, null, 2));
    return {status: 200, message: 'Комментарий успешно добавлен', updatedPost: post.post};
}

module.exports = {addCommentToPost};
