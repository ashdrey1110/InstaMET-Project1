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
    let randomCommenter = Math.floor(Math.random()*posts.length);
    let randomCaption = captionGenerator();
    let randomComment = randomCommentGenerator();
    let randomTroll = randomTrollGenerator();


    let newPost = document.createElement('div');
    newPost.className = 'post';
    newPost.innerHTML = `
    <br>
    <div class="profile-header">
      <img class="profile-pic" src="${post.image}">
      <div class="username">${post.fullName}</div>
      <div class="location-date">Gallery ${post.gallery} &#x2022; ${post.date}</div>
    </div>
    
    <img class="post-photo" src="${post.image}" alt="user's picture">
    <div class="buttons">
      <button class="heart-button" id="${post.id}"><i class="fas fa-heart"></i></button>
      <button class="comment-button"><i class="fa-solid fa-comment"></i></button>
      <a href="${post.wiki}"><button class="wiki-page"><i class="fa-solid fa-circle-info"></i></button></a>
    </div>
    <div class="liked-by">Liked by <strong>${posts[randomLiker].fullName}</strong> and <strong>others</strong></div>
    <div class="caption"><strong>${post.fullName}</strong> "${post.title}," (${post.medium}), ${post.bio}. ${randomCaption}</div>
    <div class="comments">
      <button class="comment-header">View comments</button>
      <div class="comment hidden"><strong>${posts[randomCommenter].fullName}</strong> ${randomComment} </div>
      <div class="comment hidden"><strong>art_troll_21</strong> ${randomTroll} </div>
    </div>
    <br>`;
    currentPosts.appendChild(newPost);
  }
}


// Event Listeners

document.addEventListener("DOMContentLoaded", async () => {
  await loadPosts();
  document.querySelector(".loading").classList.toggle("hidden");
  document.querySelector("#loadMore").classList.toggle("hide-load");
  like();
  commenting();
  openComments();
  submitComment();
});


loadMoreBtn.addEventListener("click", async (event) => {
  document.querySelector("#loadMore").classList.toggle("hide-load");
  // show loader
  let loading = document.createElement('img');
  loading.class = "loading";
  loading.src = "/images/IMG_9337.GIF";
  loading.style.width = '20%';
  document.querySelector(".content").appendChild(loading);
  await loadPosts();
  document.querySelector("#loadMore").classList.toggle("hide-load");
  document.querySelector(".content").removeChild(loading);
  like();
  commenting();
  openComments();
  submitComment();
});





// Functions for liking, commenting, opening wiki

function like() {
  document.querySelectorAll(".heart-button").forEach(likeButton => {
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("liked");
    });
  });
}



function commenting() {
  document.querySelectorAll(".comment-button").forEach(commentButton => {
    commentButton.addEventListener("click", () => {
      let newComment = document.createElement('div');
      newComment.className = 'comment';
      newComment.innerHTML = `
        <strong>currentuser</strong> <input type="text" class="new-comment"> <button class="submit-comment"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
      `;
      let post = commentButton.closest(".post");
      let comments = post.querySelector(".comments");
      comments.appendChild(newComment);
    })
  })
}


function submitComment(){
  document.addEventListener("click", (event) => {
    if(event.target.classList.contains("submit-comment")){
      let post = event.target.closest(".post");
      let commentInput = post.querySelector(".new-comment");

      if(commentInput && commentInput.value.trim() !==""){
        let uploadedComment = document.createElement('div');
        uploadedComment.className = "comment hidden";
        uploadedComment.innerHTML = `
        <strong>currentuser</strong> ${commentInput.value.trim()}
        `;
        let comments = post.querySelector(".comments");
        comments.appendChild(uploadedComment);
        commentInput.value = "";
      }
    }
  })
}



function openComments(){
  document.querySelectorAll(".comment-header").forEach(commentHeader => {
    commentHeader.addEventListener("click", () => {
      //unhide comments
      let comments = commentHeader.closest(".post").querySelectorAll(".comment");
      comments.forEach(comment => comment.classList.toggle("hidden"));
    })
  })
}







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

function randomCommentGenerator(){
  let option = [
    'Beautiful!',
    'omg i loooove this',
    'im literally obsessed',
    'this is soooo good',
    'Wow, cool post! Check out the link in my bio!',
    'Check your DMs...',
    'yassss queen!!!! you SLAYED this',
    'this is so mother',
    'big ups bro',
    'bruh this is crazy',
    'Is this AI?',
    'wow no tag?',
    'this is so MET core',
    'slay'
  ];
  return option[Math.floor(Math.random()*option.length)];
}

function randomTrollGenerator() {
  let option = [
    'mid',
    'ugly',
    'L',
    'my 5 year old could do this',
    'yikes...',
    'no talent',
    'dumb',
    'And they put this in a museum? ...yikes'
  ]
  return option[Math.floor(Math.random()*option.length)];
}