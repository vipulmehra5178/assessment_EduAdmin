import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", //1.Redirects unauthenticated users to login page.

  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
  //2.Ensures dashboard is accessible only when user is logged in.

};

