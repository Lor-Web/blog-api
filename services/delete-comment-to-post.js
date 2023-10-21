const fs = require('fs');

function deleteCommentToPost(postId, userToken, commentId) {
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
    const commentIndex = post.post.comments.findIndex(c => c.id === commentId);

    if (commentIndex === -1) {
        return {status: 404, message: 'Комментарий не найден'};
    }

    // Проверить, может ли пользователь удалить комментарий (например, проверить авторство)
    if (post.post.comments[commentIndex].user.token !== userToken) {
        return {status: 403, message: 'Недостаточно прав для удаления комментария'};
    }

    // Удалить комментарий
    post.post.comments.splice(commentIndex, 1);

    // Сохранить обновленный пост в базе данных
    fs.writeFileSync(dbFile, JSON.stringify(posts, null, 2));
    return {status: 200, message: 'Комментарий успешно удален', updatedPost: post.post};
}

module.exports = {deleteCommentToPost};
