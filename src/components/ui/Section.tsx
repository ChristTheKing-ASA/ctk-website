import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: "white" | "cream" | "navy" | "gradient";
  id?: string;
}

const backgrounds = {
  white: "bg-white",
  cream: "bg-cream-50",
  navy: "bg-navy-900 text-white",
  gradient: "bg-gradient-to-b from-cream-50 to-white",
};

export function Section({ children, className, background = "white", id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 lg:py-24", backgrounds[background], className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {subtitle && (
        <p className="text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-navy-600 text-lg max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}

// Page Header - for top of inner pages
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumb?: { label: string; href: string }[];
  backgroundImage?: string;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  description,
  breadcrumb,
  backgroundImage,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative bg-navy-900 text-white py-16 lg:py-24 overflow-hidden",
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.2),transparent_50%)]" />
      </div>

      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-navy-900/80" />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-navy-300">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              {breadcrumb.map((item, index) => (
                <li key={item.href} className="flex items-center gap-2">
                  <span>/</span>
                  {index === breadcrumb.length - 1 ? (
                    <span className="text-gold-400">{item.label}</span>
                  ) : (
                    <a href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Content */}
        <div className="max-w-3xl">
          {subtitle && (
            <p className="text-gold-400 font-semibold text-sm uppercase tracking-wider mb-3">
              {subtitle}
            </p>
          )}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-xl text-navy-200 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
