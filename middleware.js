import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req) {
  const res = new Response();

  const supabase = createMiddlewareClient({ req, res });

  await supabase.auth.getSession();

  return res;
}

export const config = {
  matcher: ['/premium-test', '/yearbook', '/your-protected-routes'],
};
