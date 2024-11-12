
export const metadata = {
  layout: 'auth', // This is a custom flag, for now, it's just a signal that you use for layout isolation
};

export default function AuthLayout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {children}
    </div>
  );
}