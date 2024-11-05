'use client';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

const CurrentPageBreadcrumb = () => {
  const pathname = usePathname();

  const getCurrentPageName = () => {
    // Get the last segment of the path
    const segments = pathname.split('/').filter(Boolean);
    const currentPage = segments[segments.length - 1] || 'Home';

    // Transform to readable format (e.g., "user-profile" -> "User Profile")
    return currentPage
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>{getCurrentPageName()}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CurrentPageBreadcrumb;