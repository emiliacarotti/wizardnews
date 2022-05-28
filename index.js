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
    console.log('hello')
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
           </div>`
          )
          .join("")}
        </div>
    </body>
    </html>`
    res.send(html)
})


const { PORT = 1337 } = process.env;

app.listen(PORT, ()=>{
    console.log("Server is running . . .")
})