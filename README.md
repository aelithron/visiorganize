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
It's suggested to use this app through [visi.axionspire.net](https://visi.axionspire.net), and you can log in through a GitHub account. Alternatively, if you're a fellow teen or an organizer in Hack Club, you can use your Hack Club Slack login.
### Self-hosting Setup
Here's some steps for self-hosting. Note that, at present, I do not provide a pre-built Docker image.
1. Clone the repo and create a file called .env.local in the project root. In there, put `MONGODB_URL=[your MongoDB URL]`. This makes the image build more likely to succeed, due to strange behavior with the MongoDB system used in this app.
2. Build a Docker image for the app. I suggest running `docker build -t visiorganize:release-v2.0.0 --build-arg IMAGE_TAG="release-v2.0.0"`. The image tag argument gets displayed on the settings page of the app, and the initial tag is what you use to set the app up.
3. Add environment variables to your run method. An example (may or may not work) Kubernetes manifest is provided, as well as a Docker Compose file.
You need a MongoDB database, and must supply the `MONGODB_URI` (connection string) and `MONGODB_DB` (database name). That database must contain a "users" collection, which the app will use.
Also, you need an `AUTH_SECRET`, which you can generate with the command `openssl rand -base64 33` in Linux. Finally, you must add authentication variables for `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` as a [GitHub OAuth app](https://authjs.dev/guides/configuring-github#creating-an-oauth-app-in-github), and you can optionally add `AUTH_SLACK_ID` and `AUTH_SLACK_SECRET` as a Slack OAuth app (no instructions provided since I can't find a good link, search for it).
4. Start the app and open it!
#### A Note
Visiorganize self-hosted won't act the same way as the visi.axionspire.net instance when browsing to it, as I run an instance of [visiorganize-landing](https://github.com/aelithron/visiorganize-landing) at the provided domain and run this code on another domain (app.visi.axionspire.net).

## Screenshot
![IMG](https://hc-cdn.hel1.your-objectstorage.com/s/v3/ee511e230468fc2d94722848a945d69453473a00_visiorganize_showcase.png)