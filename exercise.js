import getData from './getData.js';

const [
    users,
    posts,
    comments
] = await Promise.all([
    getData('users'),
    getData('posts'),
    getData('comments')
]);

const filterPosts = (userId) => {
    return posts.filter(data => data.userId === userId);
}

const filterComments = (email) => {
    return comments.filter(data => data.email === email);
}

const userFormat = users.map(user => {
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        comments: filterComments(user.email),
        posts: filterPosts(user.id)
    }
})

const userMoreThanThreeComment = userFormat.filter(user => user.comments.length > 3)

const reformatUsersData = userFormat.map(userData => {
    const {comments, posts, ...newData} = userData;

    return {
        ...newData,
        commentsCount: comments.length,
        postsCount: posts.length
    }
})

const mostPostsUser = userFormat.reduce((accumulator, currentValue) => {
    return accumulator.postsCount > currentValue.postsCount ?  accumulator : currentValue
})

const mostCommentsUser = userFormat.reduce((accumulator, currentValue) => {
    return accumulator.commentsCount > currentValue.commentsCount ?  accumulator : currentValue
})

const sortByPostsCount = reformatUsersData.sort((a, b) => (a.postsCount > b.postsCount ? -1 : 0))

const getPostDataId = async (id) => {
    const [post, comments] = await Promise.all([
        getData(`posts/${id}`),
        getData(`comments?postId=${id}`)
    ]);

    return {
        ...post,
        comments
    };
}

//requirement 2
// console.dir(users, {depth: null})

//requirement 3
// console.dir(userFormat, {depth: null})

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


const person = {
    id: 1,
    name: "John Doe",
};

const job = {job: 'NodeJs Developer'};
const mergePerson = {...person, ...job};
console.log(mergePerson);

// You can use this to pick/omit fields from object
const post = {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
};

const {userId, id, ...postSelected} = post; // post object should contain only title and body
console.log(postSelected);