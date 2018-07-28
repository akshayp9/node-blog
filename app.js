// Setup
var express = require('express');
var mongoose = require('mongoose')
var app = express();
var bodyParser = require('body-parser')

//middleWare for Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

//MiddleWare for EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// Routes
app.get("/", (req, res) => {
   res.render('index');
});
app.post('/addpost', (req, res) => {
    var postData = new Post(req.body);
    postData.save().then( result => {
        res.redirect('/');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});
app.get("/", (req, res) => {
   Post.find({}, (err, posts) => {
      res.render('index', { posts: posts})
   });
});


mongoose.connect("mongodb://localhost:27017/node-blog")
var postSchema = new mongoose.Schema({ body: String });
var Post = mongoose.model('Post', postSchema);

// Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
})
