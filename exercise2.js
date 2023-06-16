import fetch from 'node-fetch';

const getData = async (type) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${type}`);

    return await response.json();
}

const getUsers = await getData('users');
const getPosts = await getData('posts');
const getComments = await getData('comments');

const filterPosts = (userId) => {
    const postData = getPosts.filter(data => data.userId === userId);

    return postData.map(post => post)
}

const filterComments = (postId) => {
    const commentData = getComments.filter(data => data.postId === postId);

    return commentData.map(comment => comment)
}

const getResult = getUsers.map(user => {
    let comments = [];
    const postData = filterPosts(user.id);
    const commentData = postData.map(post => {
        comments = [
            ...comments,
            ...filterComments(post.id)
        ]
    })

    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        comments: comments,
        posts: postData
    }
})

console.dir(getResult, {depth: null})
