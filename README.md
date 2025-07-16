<img src="public/logo.webp" height=125>

# Visiorganize
### *(vision + organize)*
The ultimate organization tool for software developers!

<div align="center">
  <a href="https://shipwrecked.hackclub.com/?t=ghrm" target="_blank">
    <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/739361f1d440b17fc9e2f74e49fc185d86cbec14_badge.png" 
         alt="This project is part of Shipwrecked, the world's first hackathon on an island!" 
         style="width: 35%;">
  </a>
</div>

## Concepts
Some useful concepts before you begin installing and using Visiorganize are described here.
### Projects
The highest level of organization. A user can have infinite Projects, and can share them.
### Resources
Any type of resource used in programming. Currently this is focused on text, but I'm working on adding more resource types at a later date.
### Tags
Optional extra things you can add to a resource, to help organize them inside of projects. The replacement to the old folders system (which is available on an old branch).

## Using
It's suggested to use this app through (https://visi.axionspire.net)[visi.axionspire.net], and you can log in through a GitHub account. Alternatively, if you're a fellow teen or an organizer in Hack Club, you can use your Hack Club Slack login.
### Self-hosting Setup
Here's some steps for self-hosting. Note that, at present, I do not provide a pre-built Docker image.
1. Clone the repo and create a file called .env.local in the project root. In there, put `MONGODB_URL=[your MongoDB URL]`. This makes the image build more likely to succeed, due to strange behavior with the MongoDB system used in this app.
2. Build a Docker image for the app. I suggest running `docker build -t visiorganize:release-v2.0.0 --build-arg IMAGE_TAG="release-v2.0.0"`. The image tag argument gets displayed on the settings page of the app, and the initial tag is what you use to set the app up.