const fs = require('fs');
const uuid = require('uuid');

function addPost(userToken, titlePost = '', contentPost = '', tagsPost = [], postImage = '') {
    const dbFile = 'db.json';

    // Проверяем, существует ли пользователь с указанным токеном
    const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    const user = users.find(u => u.token === userToken);

    if (!user) {
        return {status: 401, message: 'Пользователь не авторизован'};
    }

    // Продолжаем только, если пользователь существует
    const posts = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    const newPost = {
        post: {
            id: uuid.v4(),
            date: Date.now(),
            image: postImage,
            title: titlePost,
            body: contentPost,
            tags: tagsPost,
            likes: 0,
            dislikes: 0,
            likedBy: [],
            dislikedBy: [],
            comments: []
        }, user: {
            login: user.login,
            token: user.token,
            avatar: user.avatar,
            userName: user.userName,
            about: user.about,
            birthday: user.birthday,
        }
    };

    posts.push(newPost);
    fs.writeFileSync(dbFile, JSON.stringify(posts, null, 2));

    return {status: 201, message: 'Пост успешно добавлен'};
}

module.exports = {addPost};
