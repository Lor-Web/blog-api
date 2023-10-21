const fs = require('fs');

function getPosts(page, postsPerPage) {
    const dbFile = 'db.json';
    const posts = JSON.parse(fs.readFileSync(dbFile, 'utf8'));

    const totalPosts = posts.length;

    // Вычисляем начальный и конечный индексы для постов на указанной странице
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    // Выбираем посты для текущей страницы
    const pagedPosts = posts.slice(startIndex, endIndex);

    // Вычисляем общее количество страниц
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    return {status: 200, message: 'Посты успешно получены', posts: pagedPosts, currentPage: page, totalPages};
}

module.exports = {getPosts};
