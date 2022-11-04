const Blog = require('../model/blog')


const blog_index = (req, res) => {
    let isAuthenticated = req.oidc.isAuthenticated();
    
    if(isAuthenticated) {
        Blog.find().sort({
            createdAt: -1
        }).then(result => {
            res.render("posts", {
                posts: result,
                title: "Page",
                isAuthenticated: isAuthenticated
            })
            // console.log(result)
            // console.log(isAuthenticated)
            })
        } 
}

const show_posts = async(req, res) => {
    let isAuthenticated = req.oidc.isAuthenticated();
    res.render("posts", {
        title: "Posts",
        isAuthenticated: isAuthenticated,
    })
}

const create_blog_post = async(req, res) => {
    console.log("Data ", req.body);
    const blog = new Blog(req.body);
    blog.save()
    .then(result => {
        res.redirect('/posts');
    })
    .catch(e => {
        console.log(e);
    });
}

const edit_post = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('edit', {
                post: result,
                title: 'Edit Post',
                isAuthenticated: req.oidc.isAuthenticated(),
                user: req.oidc.user,});
            })
            .catch(e => {
                console.log(e);
                res.render('404', {title: 'Post Not Found'});
            });
    }

const update_post = async (req, res) => {
    const _id = req.params.id;
    const doc = await Blog.findOne({_id});
    console.log(req.body);
    doc.overwrite({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    })

    await doc.save()
        .then(() => {
            res.redirect('/posts');
        })
        .catch(e => {
            console.log("Error ", Error);
        })
}

const delete_post = async (req, res) => {
    const _id = req.params.id;
    const doc = await Blog.findOne({_id});

    await doc.delete()
    .then(() => {
        res.redirect('/posts');
    })
    .catch(e => {
        console.log("Error ", Error);
    })
}

module.exports = {
create_blog_post,
show_posts,
blog_index,
edit_post,
update_post,
delete_post,
}