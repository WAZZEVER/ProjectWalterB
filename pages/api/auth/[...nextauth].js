import NextAuth from 'next-auth'
import DiscordProvider from "next-auth/providers/discord";
const scopes = ['identify', 'email', 'guilds'].join(' ')

export default NextAuth({
providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {params: {scope: scopes}},
    })
  ],
  secret: 'IamVeryHandsome',
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
      }

      if (profile) {
        token.id = profile.id
        token.discriminator = profile.discriminator
      }

      return token
    },

    async session({ session, token, user }) {
      session.user.id = token.sub
      return session
    }
  }
})