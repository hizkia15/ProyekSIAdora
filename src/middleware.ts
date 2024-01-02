import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/Kasir") &&
      req.nextauth.token?.role !== "kasir" &&
      req.nextauth.token?.role !== "pemilik"
    ) {
      return NextResponse.rewrite(new URL("/NotAuthorized", req.url));
    } else if (
      (req.nextUrl.pathname.startsWith("/Transaksi") ||
        req.nextUrl.pathname.startsWith("/Supplier")) &&
      req.nextauth.token?.role !== "ttk" &&
      req.nextauth.token?.role !== "pemilik"
    ) {
      return NextResponse.rewrite(new URL("/NotAuthorized", req.url));
    } else if (
      (req.nextUrl.pathname.startsWith("/Laporan") ||
        req.nextUrl.pathname.startsWith("/PengaturanUser") ||
        req.nextUrl.pathname.startsWith("/Dashboard") ||
        req.nextUrl.pathname.startsWith("/Produk")) &&
      req.nextauth.token?.role !== "pemilik"
    ) {
      return NextResponse.rewrite(new URL("/NotAuthorized", req.url));
    } else if (
      req.nextUrl.pathname.startsWith("/login") &&
      req.nextauth.token !== undefined
    ) {
      if (req.nextauth.token?.role === "pemilik") {
        return NextResponse.redirect(new URL("/Dashboard", req.url));
      } else if (req.nextauth.token?.role === "ttk") {
        return NextResponse.redirect(
          new URL("/Supplier/DataSupplier", req.url)
        );
      } else if (req.nextauth.token?.role === "kasir") {
        return NextResponse.redirect(new URL("/Kasir", req.url));
      }
    } else {
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      // authorized: ({ token }) => !!token,
      authorized({ req, token }) {
        if (req.nextUrl.pathname.startsWith("/login")) {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!NotAuthorized|image|api).{1,})"],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {}
