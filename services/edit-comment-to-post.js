const fs = require('fs');

function editCommentToPost(postId, userToken, commentId, newText) {
    const dbFile = 'db.json';

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

    // Найти комментарий по ID
    const comment = post.post.comments.find(c => c.id === commentId);

    if (!comment) {
        return {status: 404, message: 'Комментарий не найден'};
    }

    // Проверить, может ли пользователь редактировать комментарий (например, проверить авторство)
    if (comment.user.token !== userToken) {
        return {status: 403, message: 'Недостаточно прав для редактирования комментария'};
    }

    // Обновить текст комментария
    comment.text = newText;
    comment.updatedAt = Date.now();

    // Сохранить обновленный пост в базе данных
    fs.writeFileSync(dbFile, JSON.stringify(posts, null, 2));
    return {status: 200, message: 'Комментарий успешно отредактирован', updatedPost: post.post};
}

module.exports = {editCommentToPost};
