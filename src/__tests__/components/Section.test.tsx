import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section, SectionHeader, PageHeader } from "@/components/ui/Section";

describe("Section Component", () => {
  it("should render children correctly", () => {
    render(<Section>Section content</Section>);
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("should have section element", () => {
    const { container } = render(<Section>Content</Section>);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("should apply white background by default", () => {
    const { container } = render(<Section>Content</Section>);
    const section = container.querySelector("section");
    expect(section?.className).toContain("bg-white");
  });

  it("should apply cream background when specified", () => {
    const { container } = render(<Section background="cream">Content</Section>);
    const section = container.querySelector("section");
    expect(section?.className).toContain("bg-cream-50");
  });

  it("should apply navy background when specified", () => {
    const { container } = render(<Section background="navy">Content</Section>);
    const section = container.querySelector("section");
    expect(section?.className).toContain("bg-navy-900");
    expect(section?.className).toContain("text-white");
  });

  it("should apply gradient background when specified", () => {
    const { container } = render(<Section background="gradient">Content</Section>);
    const section = container.querySelector("section");
    expect(section?.className).toContain("bg-gradient-to-b");
  });

  it("should accept custom className", () => {
    const { container } = render(<Section className="custom-section">Content</Section>);
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-section");
  });

  it("should accept id prop", () => {
    const { container } = render(<Section id="test-section">Content</Section>);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("id", "test-section");
  });

  it("should have responsive padding", () => {
    const { container } = render(<Section>Content</Section>);
    const section = container.querySelector("section");
    expect(section?.className).toContain("py-16");
    expect(section?.className).toContain("lg:py-24");
  });
});

describe("SectionHeader Component", () => {
  it("should render title", () => {
    render(<SectionHeader title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should render subtitle when provided", () => {
    render(<SectionHeader title="Title" subtitle="Subtitle" />);
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
  });

  it("should render description when provided", () => {
    render(
      <SectionHeader title="Title" description="This is a description" />
    );
    expect(screen.getByText("This is a description")).toBeInTheDocument();
  });

  it("should be centered by default", () => {
    const { container } = render(<SectionHeader title="Centered" />);
    const header = container.firstChild as HTMLElement;
    expect(header.className).toContain("text-center");
  });

  it("should not be centered when centered is false", () => {
    const { container } = render(
      <SectionHeader title="Not Centered" centered={false} />
    );
    const header = container.firstChild as HTMLElement;
    expect(header.className).not.toContain("text-center");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <SectionHeader title="Custom" className="custom-header" />
    );
    const header = container.firstChild as HTMLElement;
    expect(header.className).toContain("custom-header");
  });

  it("should have proper title styling", () => {
    render(<SectionHeader title="Styled Title" />);
    const title = screen.getByText("Styled Title");
    expect(title.tagName).toBe("H2");
    expect(title.className).toContain("font-display");
    expect(title.className).toContain("font-bold");
  });

  it("should have gold color for subtitle", () => {
    render(<SectionHeader title="Title" subtitle="Gold Subtitle" />);
    const subtitle = screen.getByText("Gold Subtitle");
    expect(subtitle.className).toContain("text-gold-600");
    expect(subtitle.className).toContain("uppercase");
  });
});

describe("PageHeader Component", () => {
  it("should render title", () => {
    render(<PageHeader title="Page Title" />);
    expect(screen.getByText("Page Title")).toBeInTheDocument();
  });

  it("should render subtitle when provided", () => {
    render(<PageHeader title="Title" subtitle="Page Subtitle" />);
    expect(screen.getByText("Page Subtitle")).toBeInTheDocument();
  });

  it("should render description when provided", () => {
    render(
      <PageHeader title="Title" description="Page description text" />
    );
    expect(screen.getByText("Page description text")).toBeInTheDocument();
  });

  it("should have navy background", () => {
    const { container } = render(<PageHeader title="Title" />);
    const header = container.firstChild as HTMLElement;
    expect(header.className).toContain("bg-navy-900");
    expect(header.className).toContain("text-white");
  });

  it("should render breadcrumb navigation", () => {
    render(
      <PageHeader
        title="Contact Us"
        breadcrumb={[
          { label: "Connect", href: "/connect" },
          { label: "Contact", href: "/connect/contact" },
        ]}
      />
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Connect")).toBeInTheDocument();
    // Check for breadcrumb Contact - the title will be "Contact Us"
    const breadcrumbNav = screen.getByRole("navigation", { name: /breadcrumb/i });
    expect(breadcrumbNav).toContainElement(screen.getByText("Contact"));
  });

  it("should have Home link in breadcrumb", () => {
    render(
      <PageHeader
        title="Page"
        breadcrumb={[{ label: "Section", href: "/section" }]}
      />
    );
    const homeLink = screen.getByText("Home");
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("should highlight last breadcrumb item", () => {
    render(
      <PageHeader
        title="Page"
        breadcrumb={[{ label: "Current Page", href: "/current" }]}
      />
    );
    const currentPage = screen.getByText("Current Page");
    expect(currentPage.className).toContain("text-gold-400");
  });

  it("should have proper h1 styling for title", () => {
    render(<PageHeader title="Main Title" />);
    const title = screen.getByText("Main Title");
    expect(title.tagName).toBe("H1");
    expect(title.className).toContain("font-display");
    expect(title.className).toContain("font-bold");
  });

  it("should have breadcrumb aria-label", () => {
    render(
      <PageHeader
        title="Page"
        breadcrumb={[{ label: "Section", href: "/section" }]}
      />
    );
    const nav = screen.getByRole("navigation", { name: /breadcrumb/i });
    expect(nav).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <PageHeader title="Title" className="custom-header" />
    );
    const header = container.firstChild as HTMLElement;
    expect(header.className).toContain("custom-header");
  });
});
