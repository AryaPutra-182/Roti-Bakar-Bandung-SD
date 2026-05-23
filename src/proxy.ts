import { NextRequest, NextResponse } from 'next/server';

// Proteksi auth ditangani client-side di admin/page.tsx
export function proxy(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
