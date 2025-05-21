import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Slack from "next-auth/providers/slack";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "https://raw.githubusercontent.com/aelithron/visiorganize/refs/heads/main/public/logo.webp",
  },
  providers: providers(),
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
});

function providers() {
  const providers = []
  if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
    providers.push(GitHub({
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        }
      }
    }));
  }
  if (process.env.AUTH_SLACK_ID && process.env.AUTH_SLACK_SECRET) {
    providers.push(Slack({
      profile(profile) {
        return {
          id: profile["https://slack.com/user_id"],
          name: profile.name,
          email: profile.email,
          image: profile["https://slack.com/user_image_512"],
        }
      }
    }));
  }
  return providers;
}