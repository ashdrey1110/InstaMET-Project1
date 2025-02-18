// Retrieve MET info
import { getTenArtworks } from "./METgetter.js";

// create variables for elements
const currentPosts = document.querySelector(".content");
const loadMoreBtn = document.querySelector("#loadMore");

// create fxn to load 10 posts to html

async function loadPosts() {
  let posts = await getTenArtworks();
  
  
  //load content for each post
  for(let post of posts){
    let randomLiker = Math.floor(Math.random()*posts.length);
    let randomCaption = captionGenerator();


    let newPost = document.createElement('div');
    newPost.className = 'post';
    newPost.innerHTML = `
    <br>
    <div class="username">${post.fullName}</div>
    <div class="location-date">Gallery ${post.gallery} &#x2022; ${post.date}</div>
    <img class="post-photo" src="${post.image}" alt="user's picture">
    <div class="heart-button"><i class="fas fa-heart"></i></div>
    <div class="liked-by">Liked by <strong>${posts[randomLiker].fullName}</strong> and <strong>others</strong></div>
    <div class="caption"><div class="username">${post.fullName}</div> "${post.title}," (${post.medium}), ${post.bio}. ${randomCaption}</div>
    <div class="comments">View comments</div>
    <br>`;
    currentPosts.appendChild(newPost);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadPosts();
})

loadMoreBtn.addEventListener("click", async (event) => {
  await loadPosts();
})

function captionGenerator(){
  let options = [
    'barely even tried on this one..',
    'this was such a difficult one to do, thanks to everyone who supported me!!',
    'this one is for the girliessss!!!',
    'throwback lol',
    '<3333',
    'idk how i feel abt this one but im posting anyway ahh !',
    'lotta people have been saying this is AI but its NOT',
    "I'd like to see DA VINCI try this one",
    "I was feeling really inspired this week. Thanks to everyone who has been supprting me on this journey!",
    "S/o to my boy van Gogh for helping me with this one",
    "i feel like no one is making art like this anymore...",
    "this generation will never understand how we used to do it",
    "i've been on my grind lately",
    'been in the kitchen cookin this one up..',
    "Been in the studio a lot recently and I can't wait to share everything I've been working on",
    's/o to my fans for supporting my art fr',
    'building my empire',
    'something is coming real soon',
    '#blessed'
    ];
    return options[Math.floor(Math.random()*options.length)];
}
