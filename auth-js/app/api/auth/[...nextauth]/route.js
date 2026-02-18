import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user name" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          const res = await fetch("http://localhost:8080/api/accounts/signin", {
            method: "POST",
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });
          const user = await res.json();
          if (res.ok && user) {
            // 서버로부터 받은 accessToken과 refreshToken을 user 객체에 추가했다고 가정
            return user;
          }
          return null;
        } catch (error) {
          console.error("Credentials authorize error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile, user }) {
      console.log("jwt................");

      // 최초 로그인 시 (credentials 또는 kakao)
      if (account) {
        // 자체 로그인 (credentials)
        if (account.provider === "credentials" && user) {
          token.id = user.email;
          token.role = user.role;
          token.email = user.email;
          token.name = user.nickname;

          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.accessTokenExpires = Date.now() + 60 * 60 * 1000; // 1시간으로 설정
          token.provider = "credentials";
          return token;
        }
        // 카카오 로그인
        if (account.provider === "kakao" && profile) {
          try {
            // 백엔드 API를 호출하여 이메일로 사용자 정보와 토큰을 받아옴
            const res = await fetch(
              "http://localhost:8080/api/accounts/social",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  email: profile.kakao_account.email,
                }),
              },
            );

            const backendUser = await res.json();

            if (res.ok && backendUser) {
              token.id = backendUser.email;
              token.role = backendUser.role;
              token.email = backendUser.email;
              token.name = backendUser.nickname;

              token.accessToken = backendUser.accessToken;
              token.refreshToken = backendUser.refreshToken;
              token.accessTokenExpires = Date.now() + 60 * 60 * 1000; // 1시간으로 설정
              token.provider = "kakao";
              return token;
            }
          } catch (error) {
            console.error("Kakao login fetch error:", error);
            return null;
          }
        }
      }

      console.log("=====================================================");

      const remainTime = token.accessTokenExpires - Date.now();

      console.log("remain time " + remainTime);

      console.log("=====================================================");
      console.log("-----------------------------------------------------");

      if (remainTime < 0) {
        return refreshAccessToken(token);
      } else {
        return token;
      }
    },

    async session({ session, token }) {
      console.log("session().......................");
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
  },

  pages: {
    signIn: "/account/signin",
    signOut: "/account/signout",
  },
};

async function refreshAccessToken(token) {
  console.log("refreshAccessToken");
  try {
    const res = await fetch("http://localhost:8080/api/accounts/refresh", {
      method: "POST",
      body: JSON.stringify({
        email: token.email,
        refreshToken: token.refreshToken,
      }),

      headers: { "Content-Type": "application/json" },
    });

    const refreshedUser = await res.json();
    if (!res.ok) {
      throw new Error("Failed to refresh token");
    }

    token.id = refreshedUser.email;
    token.role = refreshedUser.role;
    token.email = refreshedUser.email;
    token.name = refreshedUser.nickname;
    token.accessToken = refreshedUser.accessToken;
    token.refreshToken = refreshedUser.refreshToken;

    token.accessTokenExpires = Date.now() + 60 * 60 * 1000; // 1시간으로 재설정
    return token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
