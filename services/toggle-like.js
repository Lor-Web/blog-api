const fs = require('fs');

function toggleLike(postId, userToken) {
    const dbFile = 'db.json';

    // Найти пост по ID в базе данных
    const posts = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    const post = posts.find(p => p.post.id === postId);

    if (!post) {
        return {status: 404, message: 'Пост не найден'};
    }

    // Проверить, может ли пользователь добавить или убрать лайк или дизлайк
    if (post.post.likedBy.includes(userToken)) {
        // Пользователь уже лайкнул пост, уберите лайк
        post.post.likes--;
        post.post.likedBy = post.post.likedBy.filter(token => token !== userToken);

        // Добавить дизлайк
        post.post.dislikes++;
        post.post.dislikedBy.push(userToken);
    } else if (post.post.dislikedBy.includes(userToken)) {
        // Пользователь уже дизлайкнул пост, уберите дизлайк
        post.post.dislikes--;
        post.post.dislikedBy = post.post.dislikedBy.filter(token => token !== userToken);

        // Добавить лайк
        post.post.likes++;
        post.post.likedBy.push(userToken);
    } else {
        // Пользователь не лайкнул и не дизлайкнул пост, добавьте дизлайк
        post.post.likes++;
        post.post.likedBy.push(userToken);
    }

    // Сохранить обновленный пост в базе данных
    fs.writeFileSync(dbFile, JSON.stringify(posts, null, 2));
    return {
        status: 200,
        message: 'Рейтинг успешно изменен',
        likes: post.post.likes,
        dislikes: post.post.dislikes,
        likedBy: post.post.likedBy,
        dislikedBy: post.post.dislikedBy
    }
}

module.exports = {toggleLike};
