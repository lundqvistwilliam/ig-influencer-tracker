'use client';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const DynamicBreadcrumbs = () => {
  const pathname = usePathname();

  // Convert pathname to breadcrumb items
  const getPathElements = () => {
    // Remove first empty string from split
    const pathElements = pathname.split('/').filter(item => item);

    // Transform path elements to be more readable
    return pathElements.map(element => ({
      href: '/' + element,
      label: element
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }));
  };

  const breadcrumbs = getPathElements();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbs.map((crumb, index) => (
          <>
            <BreadcrumbSeparator className="hidden md:block" key={index} />
            <BreadcrumbItem key={crumb.href}>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href}>
                  {crumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumbs;