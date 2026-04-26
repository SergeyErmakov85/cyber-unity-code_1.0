import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbEntry {
  label: string;
  href?: string;
}

interface LessonBreadcrumbsProps {
  items: BreadcrumbEntry[];
}

const LessonBreadcrumbs = ({ items }: LessonBreadcrumbsProps) => (
  <Breadcrumb className="mb-4">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
            Главная
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {items.map((item, i) => (
        <span key={i} className="contents">
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {item.href ? (
              <BreadcrumbLink asChild>
                <Link to={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="text-primary">{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        </span>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
);

export default LessonBreadcrumbs;
