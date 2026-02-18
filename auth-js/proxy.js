import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      console.log("-----------------------------------------------", token);
      return !!token;
    },
  },
});

export const config = {
  // 미들웨어를 적용할 경로
  matcher: ["/admin/:path*", "/mypage", "/product/query"],
};
