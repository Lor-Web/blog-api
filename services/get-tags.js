const fs = require('fs');

function getTags() {
    const dbFile = 'db.json';

    // Найти посты в базе данных
    const posts = JSON.parse(fs.readFileSync(dbFile, 'utf8'));

    // Создать пустой массив для хранения всех тегов
    const allTags = [];

    if(!posts.length) {
        return {status: 200, message: 'Все теги успешно получены', allTags};
    }

    // Перебрать все посты и собрать все теги в массив
    posts.forEach(post => {
        post.post.tags.forEach(tag => {
            if (!allTags.includes(tag)) {
                allTags.push(tag);
            }
        });
    });

    return {status: 200, message: 'Все теги успешно получены', allTags};
}

module.exports = {getTags};
