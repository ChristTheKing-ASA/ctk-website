import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  hoverable?: boolean;
}

export function Card({ children, className, href, hoverable = false }: CardProps) {
  const baseStyles = cn(
    "bg-white rounded-xl border border-navy-100 overflow-hidden",
    hoverable && "transition-[transform,box-shadow,border-color] duration-300 hover:shadow-lg hover:border-navy-200 hover:-translate-y-1",
    className
  );

  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, "block group")}>
        {children}
      </Link>
    );
  }

  return <div className={baseStyles}>{children}</div>;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("px-6 py-4 border-b border-navy-100", className)}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("px-6 py-5", className)}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("px-6 py-4 bg-cream-50 border-t border-navy-100", className)}>
      {children}
    </div>
  );
}

// Feature Card - for mission pillars, quick links, etc.
interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  href?: string;
  className?: string;
}

export function FeatureCard({ title, description, icon, href, className }: FeatureCardProps) {
  const content = (
    <>
      {icon && (
        <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center text-gold-600 mb-4 group-hover:bg-gold-200 transition-colors">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl font-semibold text-navy-900 mb-2 group-hover:text-gold-700 transition-colors">
        {title}
      </h3>
      <p className="text-navy-600 text-sm leading-relaxed">{description}</p>
      {href && (
        <div className="mt-4 flex items-center gap-1 text-gold-600 font-medium text-sm group-hover:gap-2 transition-[gap]">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "block p-6 bg-white rounded-xl border border-navy-100 group",
          "transition-[transform,box-shadow,border-color] duration-300 hover:shadow-lg hover:border-gold-200 hover:-translate-y-1",
          className
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "p-6 bg-white rounded-xl border border-navy-100",
        className
      )}
    >
      {content}
    </div>
  );
}

// Team Card - for clergy members
interface TeamCardProps {
  name: string;
  title: string;
  image?: string;
  shortBio?: string;
  href?: string;
  className?: string;
}

export function TeamCard({ name, title, image, shortBio, href, className }: TeamCardProps) {
  const content = (
    <>
      <div className="aspect-[4/5] bg-navy-100 relative overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-200 to-navy-300">
            <span className="text-4xl font-display font-bold text-navy-500">
              {name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-navy-900 group-hover:text-gold-700 transition-colors">
          {name}
        </h3>
        <p className="text-gold-600 text-sm font-medium">{title}</p>
        {shortBio && (
          <p className="mt-2 text-navy-600 text-sm line-clamp-2">{shortBio}</p>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "block bg-white rounded-xl border border-navy-100 overflow-hidden group",
          "transition-[transform,box-shadow,border-color] duration-300 hover:shadow-lg hover:border-gold-200",
          className
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-navy-100 overflow-hidden",
        className
      )}
    >
      {content}
    </div>
  );
}

// Partner Card - for mission partners
interface PartnerCardProps {
  name: string;
  subtitle?: string;
  category: string;
  shortDescription: string;
  href?: string;
  className?: string;
}

export function PartnerCard({ name, subtitle, category, shortDescription, href, className }: PartnerCardProps) {
  const categoryColors: Record<string, string> = {
    Local: "bg-sage-100 text-sage-700",
    National: "bg-navy-100 text-navy-700",
    Global: "bg-gold-100 text-gold-700",
  };

  const content = (
    <>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-navy-900 group-hover:text-gold-700 transition-colors">
            {name}
          </h3>
          {subtitle && (
            <p className="text-sm text-navy-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", categoryColors[category])}>
          {category}
        </span>
      </div>
      <p className="text-navy-600 text-sm leading-relaxed line-clamp-3">{shortDescription}</p>
      {href && (
        <div className="mt-4 flex items-center gap-1 text-gold-600 font-medium text-sm group-hover:gap-2 transition-[gap]">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "block p-5 bg-white rounded-xl border border-navy-100 group",
          "transition-[transform,box-shadow,border-color] duration-300 hover:shadow-lg hover:border-gold-200",
          className
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={cn("p-5 bg-white rounded-xl border border-navy-100", className)}>
      {content}
    </div>
  );
}
