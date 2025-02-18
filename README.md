# Project 1: InstaMET

For this Project 1, I have created an app that resembles Instagram, but instead of seeing posts from your friends, you will see "posts" from famous artists throughout history. We don't always have access to the MET Museum of Art (especially if you live on the West Coast like I do), but now you can enter through your computer screen!

## Basic Functionality Overview
- View an artist's name in the username
- View an artist's work in an Instagram-style post
- View the artist's profile picture
- View the post's comments and likes
- "Like" a post
- Leave a comment
- Go to the wiki page for an artist
- View the artist's caption, which includes the title of the work, the artist's short bio, and a random funny caption

## Details
This project contains the following:
- `index.html`: the HTML for this app
- `images`: folder containing any images referenced in the app
- `scripts`: folder containing all scripts to run the app
    - `main.js`: the main script, which connects other script files
    - `METgetter.js`: the script that captures info from the MET API and stores it in an array of 10 art pieces
- `styles`: folder containing the style.css
    - `style.css`: file dictating the style of the app

## Some notes on this version

It turns out that the MET API is huge, containing over 490k works, and going through all of that would have considerably slowed down this app. So, in order to fasten things up and smoothly run this app for the purpose of learning and presentation, only the European Paintings department is included. This department of the MET contains over 2,000 pieces and most information is available, such as the artist's name, bio, location, and date the work was made. Unfortunately, while traveling through ancient periods and art, such as in the Egyptian Wing, much of this information is not available.

