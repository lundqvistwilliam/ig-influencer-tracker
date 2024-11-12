export const cookie = {
  name: 'session',
  duration: 30 * 24 * 60 * 60 * 1000, // 30 days
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/'
  }
};