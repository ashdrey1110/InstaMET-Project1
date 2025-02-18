// Retrieve MET info
const { getTenArtworks } = require("./METgetter");

// create variable for post area
const currentPosts = document.querySelector('.content');

// create fxn to load 10 posts to html

async function loadPosts() {
  let posts = await getTenArtworks();
  
  //load content for each post
  for(let post of posts){
    let newPost = document.createElement('div');
    newPost.className = 'post';
    newPost.innerHTML = `
    <p>${post.title} is by ${post.fullName}</p>`;
    currentPosts.appendChild(newPost);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadPosts();
})
