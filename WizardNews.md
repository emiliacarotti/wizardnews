# Wizard News

## What we will build:

1. A homepage similar to [Hacker News](https://news.ycombinator.com/), that lists all posts.
2. A Details page, that shows the complete news content.

Important note: Right now, there will be no persistent database in our application; we will simply be using a JavaScript array to hold objects in the server's RAM.

## Instructions

1. Setup a basic Express project with an empty `public` folder (no sub routes).
1. Download the postBank.js file and add it your root
1. Add `const postBank = require("./postBank")` to your index.js
1. Download the logo.png and style.css files and add them to your public folder
1. Create a get route in your index.js file for the root path.
1. Inside the route, get the posts by adding `const posts = postBank.list()`
1. After the previous line, create a new const variable that stores the following html. Wrap it in back ticks instead of quotes to use string interpolation.
   ```js
   <!DOCTYPE html>
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
   </html>
   ```
1. Send back the above html as the result
1. Create a second route at the `/posts/:id` path in the same file.
1. Add `next` to the parameters of that route, so next to req and res.
1. Get the post with the given id by calling the find function from postBank.
1. Check to see if the post doesn't exist by checking of it has an id (`if(!post.id){...}`). If it doesn't, call `next()`. The next function will go to the next matching path in your routes.
1. Create a function at the `*` route and send the following:

   ```js
   <!DOCTYPE html>
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
   </html>
   ```

1. if the post does exist, send back html that displays the single post with additional details. Feel free to reuse some of the previous html code for displaying a list of posts to achieve this. It should look similar to this:
   ![single post](singlePost.png)

1. Update your post mapping function to include a link to the post details route using `<a href="/posts/${post.id}">${post.title}</a>`.
1. Deploy your project on Heroku!
