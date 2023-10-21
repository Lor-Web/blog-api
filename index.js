const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Подключаем библиотеку CORS
const app = express();
const port = 3000;
const dbFile = 'db.json';
const usersFile = 'users.json';
const multer = require('multer');
const sharp = require('sharp'); // Подключаем библиотеку sharp
const upload = multer({dest: 'uploads/'}); // Папка для сохранения загруженных изображений

const {loginUser} = require('./services/login');
const {registerUser} = require('./services/register');
const {addPost} = require('./services/add-post');
const {getPosts} = require('./services/get-posts');
const {getPost} = require('./services/get-post');
const {editPost} = require("./services/edit-post");
const {deletePost} = require('./services/delete-post');
const {toggleLike} = require('./services/toggle-like');
const {addCommentToPost} = require('./services/add-comment-to-post');
const {editCommentToPost} = require("./services/edit-comment-to-post");
const {deleteCommentToPost} = require('./services/delete-comment-to-post');
const {getTags} = require('./services/get-tags');
const {getPostsForTag} = require('./services/get-posts-for-tag');
const {getUser} = require('./services/get-user');
const {editUserProfile} = require('./services/edit-user-profile');

app.use(express.json());
app.use(cors()); // Используем CORS

// Указать каталог, в котором находятся статические файлы (изображения)
app.use(express.static('uploads'));

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
    // Проверить наличие файла db.json и создать его, если он не существует
    if (!fs.existsSync(dbFile)) {
        fs.writeFileSync(dbFile, '[]');
    }
    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, '[]');
    }
});

// Авторизация пользователя
app.post('/auth/login', (req, res) => {
    const {login, password} = req.body;
    const result = loginUser(login, password);
    res.status(result.status).json({message: result.message, user: result.user});
});


// Регистрация нового пользователя
app.post('/auth/register', (req, res) => {
    const {login, password} = req.body;
    const result = registerUser(login, password);
    res.status(result.status).json({message: result.message, user: result.newUser});
});

// Добавление нового поста
app.post('/blog/posts', (req, res) => {
    const {title, content, tags} = req.body;
    const userToken = req.header('Authorization');
    const result = addPost(userToken, title, content, tags);
    res.status(result.status).json({message: result.message, post: result.post, user: result.user});
})

// Получение всех постов
app.get('/blog/posts', (req, res) => {
    // Извлечение параметров из параметров запроса (query parameters)
    const page = parseInt(req.query.page) || 1; // Номер страницы (по умолчанию 1)
    const postsPerPage = parseInt(req.query.postsPerPage) || 10; // Количество постов на странице (по умолчанию 10)

    const result = getPosts(page, postsPerPage);
    res.status(result.status).json({
        message: result.message,
        posts: result.posts,
        pagination: {currentPage: result.currentPage, totalPages: result.totalPages}
    });
});

// Получение поста по ID
app.get('/blog/posts/:postId', (req, res) => {
    const postId = req.params.postId; // Получаем ID поста из параметра запроса
    const result = getPost(postId);

    if (result.status === 200) {
        res.status(result.status).json({message: result.message, post: result.post});
    } else {
        res.status(result.status).json({message: result.message});
    }
});

// Редактирование поста по ID
app.put('/blog/posts/:postId', (req, res) => {
    const postId = req.params.postId;
    const {title, content, tags} = req.body;
    const userToken = req.header('Authorization');

    const result = editPost(userToken, postId, title, content, tags);

    if (result.status === 401) {
        res.status(result.status).json({message: result.message});
    } else if (result.status === 404) {
        res.status(result.status).json({message: result.message});
    } else if (result.status === 403) {
        res.status(result.status).json({message: result.message});
    } else {
        res.status(result.status).json({message: result.message, post: result.post});
    }
});

// Удаление поста по ID
app.delete('/blog/posts/:postId', (req, res) => {
    const postId = req.params.postId;
    const userToken = req.header('Authorization');
    const result = deletePost(postId, userToken);

    if (result.status === 401) {
        res.status(result.status).json({message: result.message});
    } else if (result.status === 404) {
        res.status(result.status).json({message: result.message});
    } else if (result.status === 403) {
        res.status(result.status).json({message: result.message});
    } else {
        res.status(result.status).json({message: result.message});
    }
});

// Изменить рейтнг
app.post('/blog/posts/:postId/toggle-like', (req, res) => {
    const postId = req.params.postId;
    const userToken = req.header('Authorization');
    const result = toggleLike(postId, userToken);

    if (result.status === 404) {
        res.status(result.status).json({message: result.message});
    } else {
        res.status(result.status).json({
            message: result.message,
            likes: result.likes,
            dislikes: result.dislikes,
            likedBy: result.likedBy,
            dislikedBy: result.dislikedBy
        });
    }
});

// Добваить комментарий к посту
app.post('/blog/posts/:postId/add-comment', (req, res) => {
    const postId = req.params.postId;
    const userToken = req.header('Authorization');
    const {text} = req.body;
    const result = addCommentToPost(postId, userToken, text);

    if (result.status === 401) {
        res.status(result.status).json({message: result.message});
    } else if (result.status === 404) {
        res.status(result.status).json({message: result.message});
    } else {
        res.status(result.status).json({message: result.message, updatedPost: result.updatedPost});
    }
});

// Отредактировать комментарий у поста
app.put('/blog/posts/:postId/edit-comment/:commentId', (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const userToken = req.header('Authorization');
    const {newText} = req.body;
    const result = editCommentToPost(postId, userToken, commentId, newText);

    if (result.status === 401) {
        res.status(result.status).json({message: result.message})
    } else if (result.status === 404) {
        res.status(result.status).json({message: result.message})
    } else if (result.status === 403) {
        res.status(result.status).json({message: result.message})
    } else {
        res.status(result.status).json({message: result.message, updatedPost: result.updatedPost})
    }
});

// Удалить комментарий
app.delete('/blog/posts/:postId/delete-comment/:commentId', (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const userToken = req.header('Authorization');
    const result = deleteCommentToPost(postId, userToken, commentId);

    if (result.status === 401) {
        res.status(result.status).json({message: result.message});
    } else if (result.status === 404) {
        res.status(result.status).json({message: result.message});
    } else if (result.status === 403) {
        res.status(result.status).json({message: result.message});
    } else {
        res.status(result.status).json({message: result.message, updatedPost: result.updatedPost});
    }
});

// Получить все теги
app.get('/blog/tags', (req, res) => {
    const result = getTags();

    res.status(result.status).json({message: result.message, tags: result.allTags})
});

// Получить посты по тегу
app.get('/blog/posts/by-tag/:tag', (req, res) => {
    const tag = req.params.tag;
    const result = getPostsForTag(tag);

    res.status(result.status).json({message: result.message, posts: result.posts});
});

// Загрузка изображений
app.post('/upload/image', upload.single('image'), async (req, res) => {
    // Масштабируем и сжимаем изображение
    const imagePath = req.file.path;
    const scaledImagePath = `uploads/scaled-${req.file.filename}.jpeg`;

    await sharp(imagePath)
        .resize(800, 600)
        .jpeg({quality: 70}) // Установите качество JPEG (меньше значение - меньший вес)
        .toFile(scaledImagePath);

    // Удалите исходный файл после масштабирования и сжатия
    fs.unlinkSync(imagePath);

    // Верните путь до урезанной и сжатой версии изображения
    res.status(200).json({
        message: 'Изображение успешно загружено, масштабировано и сжато',
        imagePath: `scaled-${req.file.filename}.jpeg`
    });
});

// Получить профиль пользователя
app.get('/users/profile', (req, res) => {
    const userToken = req.header('Authorization'); // Получите токен из заголовков
    const result = getUser(userToken);

    if (result.status === 404) {
        res.status(result.status).json({message: result.message});
    } else if (result.status === 500) {
        res.status(result.status).json({message: result.message});
    } else {
        res.status(result.status).json({message: result.message, user: result.user, posts: result.posts});
    }
})

// Редактировать профиль пользователя
app.put('/users/profile-edit', (req, res) => {
    const userToken = req.header('Authorization'); // Получите токен из заголовков
    const updatedUserData = req.body; // Получите обновленные данные пользователя из запроса
    const result = editUserProfile(userToken, updatedUserData);

    if (result.status === 404) {
        res.status(result.status).json({message: result.message});
    } else {
        res.status(result.status).json({message: result.message, updatedUser: result.updatedUser});
    }
});
