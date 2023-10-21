const fs = require('fs');

function getPost(postId) {
    const dbFile = 'db.json';
    const posts = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    const post = posts.find(p => p.post.id === postId);

    if (post) {
        return {status: 200, message: 'Пост успешно найден', post};
    } else {
        return {status: 404, message: 'Пост не найден'};
    }
}

module.exports = {getPost};
