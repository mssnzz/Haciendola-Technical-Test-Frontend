import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { profile } from "@/app/services/authentication"; // Ajusta la ruta según tu estructura de archivos

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
  });
  console.log("token", token);

  if (!token) {
    // If no token is found, redirect to login page with a callback URL
    const loginUrl = new URL("/authentication/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const userProfile = await profile(token.accessToken);

    if (userProfile.error) {
      throw new Error("Profile fetch error");
    }
  } catch (error) {
    console.error("Profile fetch error:", error);
    const logoutUrl = new URL("/api/auth/signout", request.url);
    logoutUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(logoutUrl);
  }

  // If token and profile check pass, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
