const fs = require('fs');
const {getRefreshUser} = require('../utils/refresh-user');

function getPosts(page, postsPerPage) {
    const dbFile = 'db.json';
    const posts = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    const refreshPosts = posts.map(post => {
        return {
            post:{ ...post.post},
            user: {...getRefreshUser(post.user.token)}
        }
    })

    const totalPosts = refreshPosts.length;

    // Вычисляем начальный и конечный индексы для постов на указанной странице
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    // Выбираем посты для текущей страницы
    const pagedPosts = refreshPosts.slice(startIndex, endIndex);

    // Вычисляем общее количество страниц
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    return {status: 200, message: 'Посты успешно получены', posts: pagedPosts, currentPage: page, totalPages};
}

module.exports = {getPosts};
