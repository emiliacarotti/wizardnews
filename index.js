//express
const express = require("express")
const app = express()

// Logging middleware
const morgan = require('morgan')
app.use(morgan('dev'));

// Parsing middleware
app.use(express.json());

// Static Files
app.use(express.static('public'));

const postBank = require("./postBank")

app.get('/',(req, res) => {
    const posts = postBank.list()
    
    const html = `<!DOCTYPE html>
    <html>
    <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
        <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
        ${posts
          .map(
            (post) => `
           <div class='news-item'>
           <p>
           <span class="news-position">${post.id}. ▲</span>${post.title}
           <small>(by ${post.name})</small>
           </p>
           <small class="news-info">
           ${post.upvotes} upvotes | ${post.date}
           </small>
           </div>
           <a href="/posts/${post.id}">See Post</a>`
          )
          .join("")}
        </div>
        
    </body>
    </html>`
    res.send(html)
})

app.get("/posts/:id", (req, res, next) => {
    const { id } = req.params;
    const post = postBank.find(id)
    if(!post.id){
      next();
    }else{
        console.log(post)
        const output = `<!DOCTYPE html>
        <html>
        <head>
            <title>Wizard News</title>
            <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
            <div class="news-list">
            <header><img src="/logo.png"/>Wizard News</header>
               <div class='news-item'>
               <p>
               <span class="news-position">${post.id}. ▲</span>${post.title}
               <small>(by ${post.name})</small>
               <p>${post.content}</p>
               </p>
               <small class="news-info">
               ${post.upvotes} upvotes | ${post.date}
               </small>
               </div>
               <a href="/">Home</a>
            </div>
        </body>
        </html>`
        res.send(output)
    }
});

app.get("*", (req, res) => {
    const notFound = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
      </div>
    </body>
    </html>` 
    res.send(notFound)
  });



const { PORT = 1337 } = process.env;

app.listen(PORT, ()=>{
    console.log("Server is running . . .")
})