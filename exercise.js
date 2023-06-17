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
    postData.map(post => {
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

const userMoreThanThreeComment = getResult.filter(user => user.comments.length > 3)

const reformatUsersData = getResult.map(userData => {
    const {comments, posts, ...newData} = userData;

    return {
        ...newData,
        commentsCount: comments.length,
        postsCount: posts.length
    }
})

const mostPostsUser = getResult.reduce((accumulator, currentValue) => {
    return accumulator.postsCount > currentValue.postsCount ?  accumulator : currentValue
})

const mostCommentsUser = getResult.reduce((accumulator, currentValue) => {
    return accumulator.commentsCount > currentValue.commentsCount ?  accumulator : currentValue
})

const sortByPostsCount = reformatUsersData.sort((a, b) => (a.postsCount > b.postsCount ? -1 : 0))

const getPostDataId = async () => {
    const [post, comments] = await Promise.all([
        getData('posts/1'),
        getData('comments?postId=1')
    ]);

    return {
        ...post,
        comments
    };
}

//requirement 2
// console.dir(getUsers, {depth: null})

//requirement 3
// console.dir(getResult, {depth: null})

//requirement 4
// console.dir(userMoreThanThreeComment, {depth: null})

//requirement 5
// console.dir(reformatUsersData, {depth: null})

//requirement 6
// console.dir(mostPostsUser, {depth: null})
// console.dir(mostCommentsUser, {depth: null})

//requirement 7
// console.dir(sortByPostsCount, {depth: null})

//requirement 8
// console.dir(await getPostDataId(), {depth: null})
