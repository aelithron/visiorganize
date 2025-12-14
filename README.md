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
This app isn't currently hosted! You can run it yourself if you would like to, however.
### Self-hosting Setup
Here's some steps for self-hosting. Note that, at present, I do not provide a pre-built Docker image.
1. Add environment variables to your run method. An example (may or may not work) Kubernetes manifest is provided, as well as a Docker Compose file.
You need a MongoDB database, and must supply the `MONGODB_URI` (connection string) and `MONGODB_DB` (database name). That database must contain a "users" collection, which the app will use.
Also, you need an `AUTH_SECRET`, which you can generate with the command `openssl rand -base64 33` in Linux. Finally, you must add authentication variables for `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` as a [GitHub OAuth app](https://authjs.dev/guides/configuring-github#creating-an-oauth-app-in-github), and you can optionally add `AUTH_SLACK_ID` and `AUTH_SLACK_SECRET` as a Slack OAuth app (no instructions provided since I can't find a good link, search for it).
2. You can use either of the below methods to quickly deploy.
**Make sure to fill in the empty quotation marks with the environment variables from step 1!**
Also, optional variables are commented out, but you can uncomment them to use them.
#### With Docker Compose
Copy the following Compose file to your server or computer, and name it `compose.yaml`:
```yaml
services:
  visiorganize:
    image: ghcr.io/aelithron/visiorganize:latest
    container_name: visiorganize
    restart: unless-stopped
    environment:
      MONGODB_URI: ""
      MONGODB_DB: ""
      AUTH_SECRET: ""
      AUTH_URL: ""
      AUTH_GITHUB_ID: ""
      AUTH_GITHUB_SECRET: ""
      # AUTH_SLACK_ID: ""
      # AUTH_SLACK_SECRET: ""
    ports:
      - 3000:3000
```
Then, simply run `docker compose up -d` in the directory of the file!
#### With `docker run`
Run the following command on your server or computer:
```bash
docker run -d \
  --name visiorganize \
  -p 3000:3000 \
  -e MONGODB_URI="" \
  -e MONGODB_DB="" \
  -e AUTH_SECRET="" \
  -e AUTH_URL="" \
  # -e DISCORD_ID="" \
  # -e DISCORD_SECRET="" \
  # -e SLACK_ID="" \
  # -e SLACK_SECRET="" \
  # -e GITHUB_ID="" \
  # -e GITHUB_SECRET="" \
  --restart unless-stopped \
  ghcr.io/aelithron/visiorganize:latest
```
- Note: If you want to use something else to deploy, the Docker image can be found on the Packages tab (or simply pulled as `ghcr.io/aelithron/visiorganize:latest`). Make sure to include the environment variables!
#### A Note
The Visiorganize landing page is at [visiorganize-landing](https://github.com/aelithron/visiorganize-landing), and is not in this repository!

## Screenshot
![IMG](https://hc-cdn.hel1.your-objectstorage.com/s/v3/ee511e230468fc2d94722848a945d69453473a00_visiorganize_showcase.png)

## Extras
Want a little fun? `shift+backspace+t` on any app page! (if you're on mobile, add `?cat` at the end of any page's url)
a little extra? click what appears :3c
