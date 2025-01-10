// frontend/src/app/api/auth/[...nextauth].ts
// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';

// export default NextAuth({
//   providers: [
//     Providers.Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     Providers.GitHub({
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async session(session, user) {
//       session.userId = user.id;
//       return session;
//     },
//     async signIn(user, account, profile) {
//       // Vous pouvez ajouter des logiques supplémentaires ici si nécessaire
//       return true;
//     },
//   },
// });
