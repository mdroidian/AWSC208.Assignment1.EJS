const axios = require('axios');

// homepage
const index = async(req,res) => {
    let isAuthenticated = req.oidc.isAuthenticated();
    res.render("index", { 
        title: "AWSC208 Quiz 1",
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
        const apiResponse = await axios.get('http://localhost:5000/private',
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

module.exports = {
    index,
    contact,
    secured,
  }