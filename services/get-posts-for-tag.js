const fs = require('fs');
const {getRefreshUser} = require('../utils/refresh-user');


function getPostsForTag(tag) {
    const dbFile = 'db.json';

    // Найти посты в базе данных
    const posts = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    const refreshPosts = posts.map(post => {
        return {
            post:{ ...post.post},
            user: {...getRefreshUser(post.user.token)}
        }
    })

    // Фильтровать посты по тегу
    const postsWithMatchingTag = refreshPosts.filter(post => post.post.tags.includes(tag));

    // Отправить массив постов с указанным тегом в ответе
    return {status: 200, message: 'Посты по тегу успешно получены', posts: postsWithMatchingTag};
}

module.exports = {getPostsForTag};
