const axios = require('axios');
const Blog = require('../model/blog')


// homepage
const index = async(req,res) => {
    let isAuthenticated = req.oidc.isAuthenticated();
    res.render("index", { 
        title: "AWSC208 Assignment 1",
        isAuthenticated: isAuthenticated
     });

    // server side (?) so doesn't work :(
    // const myToastEl = document.getElementById('toast')
    // const myToast = bootstrap.Toast.getInstance(myToastEl)
    // myToast.show()
}

const logginedin = async(req, res) => {
    let isAuthenticated = req.oidc.isAuthenticated();
    res.render("loggedin", { 
        title: "Logged in",
        isAuthenticated: isAuthenticated
    });
    
}

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

const login = async(req, res) => {
    let isAuthenticated = req.oidc.isAuthenticated();
    if (isAuthenticated){
        res.redirect("/loggedin")
    } else {
        res.redirect("/login")
    }
}

// not admin
const not_admin = async(req,res) => {
    let isAuthenticated = req.oidc.isAuthenticated();
    res.render("not_admin", { 
        title: "Not Admin",
        isAuthenticated: isAuthenticated
     });
}

// contact us page
const contact = async(req, res) => {
    let data = {}
    let isAuthenticated = req.oidc.isAuthenticated();
    try {
        const apiResponse = await axios.get('http://localhost:5000/contact')
        data = apiResponse.data
    } catch (e) {
        console.log(e);
    }
    res.render("contact", { 
        title: "Contact Us",
        isAuthenticated: isAuthenticated,
        data
    });
};



// secured page
const secured = async(req, res) => {
    let data = {}
    const { token_type, access_token } = req.oidc.accessToken;

    try{
        // calling the server to get the data, make sure you get the data before moving forward(async, await)
        const apiResponse = await axios.get('http://localhost:5000/secured',
        {
            headers: {
                authorization: `${token_type} ${access_token}`
            }
        });
        data = apiResponse.data;
    }catch(e) {
        console.log(e);
    }

    // when there is not error, you will be redirected to the secured page with the data you get fromt the api
    res.render('secured', {
        title: "Secured Page",
        isAuthenticated: req.oidc.isAuthenticated(),
        data
    });
};

// secured page
const admin = async(req, res) => {
    let data = {}
    const { token_type, access_token } = req.oidc.accessToken;

    try{
        // calling the server to get the data, make sure you get the data before moving forward(async, await)
        const apiResponse = await axios.get('http://localhost:5000/admin',
        {
            headers: {
                authorization: `${token_type} ${access_token}`
            }
        });
        data = apiResponse.data;

        res.render('admin', {
            title: "Admin Page",
            isAuthenticated: req.oidc.isAuthenticated(),
            data
        });

    }catch(e) {
        res.redirect('/not_admin');
        console.log(e);
    }
    // when there is not error, you will be redirected to the secured page with the data you get fromt the api


};

module.exports = {
    index,
    login,
    logginedin,
    contact,
    secured,
    admin,
    not_admin,
    create_blog_post,
    show_posts,
    blog_index,
    edit_post,
    update_post,
}