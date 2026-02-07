import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  FeatureCard,
  TeamCard,
  PartnerCard,
} from "@/components/ui/Card";

describe("Card Component", () => {
  it("should render children correctly", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("should render as a div by default", () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild;
    expect(card?.nodeName).toBe("DIV");
  });

  it("should render as a link when href is provided", () => {
    render(<Card href="/test">Link Card</Card>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test");
  });

  it("should apply hoverable styles when hoverable is true", () => {
    const { container } = render(<Card hoverable>Hoverable</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("hover:shadow-lg");
    expect(card.className).toContain("hover:-translate-y-1");
  });

  it("should apply custom className", () => {
    const { container } = render(<Card className="custom-card">Custom</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("custom-card");
  });
});

describe("CardHeader Component", () => {
  it("should render children correctly", () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText("Header content")).toBeInTheDocument();
  });

  it("should have border styling", () => {
    const { container } = render(<CardHeader>Header</CardHeader>);
    const header = container.firstChild as HTMLElement;
    expect(header.className).toContain("border-b");
  });
});

describe("CardContent Component", () => {
  it("should render children correctly", () => {
    render(<CardContent>Body content</CardContent>);
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("should have padding styles", () => {
    const { container } = render(<CardContent>Content</CardContent>);
    const content = container.firstChild as HTMLElement;
    expect(content.className).toContain("px-6");
    expect(content.className).toContain("py-5");
  });
});

describe("CardFooter Component", () => {
  it("should render children correctly", () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("should have background and border styling", () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    const footer = container.firstChild as HTMLElement;
    expect(footer.className).toContain("bg-cream-50");
    expect(footer.className).toContain("border-t");
  });
});

describe("FeatureCard Component", () => {
  it("should render title and description", () => {
    render(
      <FeatureCard
        title="Test Feature"
        description="This is a test description"
      />
    );
    expect(screen.getByText("Test Feature")).toBeInTheDocument();
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
  });

  it("should render icon when provided", () => {
    render(
      <FeatureCard
        title="With Icon"
        description="Has an icon"
        icon={<span data-testid="test-icon">Icon</span>}
      />
    );
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("should render as a link when href is provided", () => {
    render(
      <FeatureCard
        title="Link Feature"
        description="Clickable feature"
        href="/feature"
      />
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/feature");
  });

  it("should show Learn More text when href is provided", () => {
    render(
      <FeatureCard
        title="Learn More Feature"
        description="With link"
        href="/test"
      />
    );
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("should not show Learn More text when href is not provided", () => {
    render(
      <FeatureCard title="No Link Feature" description="Without link" />
    );
    expect(screen.queryByText("Learn More")).not.toBeInTheDocument();
  });
});

describe("TeamCard Component", () => {
  it("should render name and title", () => {
    render(<TeamCard name="John Doe" title="Pastor" />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Pastor")).toBeInTheDocument();
  });

  it("should render short bio when provided", () => {
    render(
      <TeamCard
        name="Jane Smith"
        title="Deacon"
        shortBio="A dedicated servant of the church"
      />
    );
    expect(screen.getByText("A dedicated servant of the church")).toBeInTheDocument();
  });

  it("should render image when provided", () => {
    render(
      <TeamCard
        name="Test Person"
        title="Role"
        image="/images/test.jpg"
      />
    );
    const img = screen.getByAltText("Test Person");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/test.jpg");
  });

  it("should render initials when no image is provided", () => {
    render(<TeamCard name="John Doe" title="Title" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("should render as a link when href is provided", () => {
    render(
      <TeamCard name="Link Person" title="Role" href="/about/team/link-person" />
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/about/team/link-person");
  });
});

describe("PartnerCard Component", () => {
  it("should render name and description", () => {
    render(
      <PartnerCard
        name="Test Partner"
        category="Local"
        shortDescription="Supporting the community"
      />
    );
    expect(screen.getByText("Test Partner")).toBeInTheDocument();
    expect(screen.getByText("Supporting the community")).toBeInTheDocument();
  });

  it("should render subtitle when provided", () => {
    render(
      <PartnerCard
        name="Partner Name"
        subtitle="Partner Subtitle"
        category="National"
        shortDescription="Description"
      />
    );
    expect(screen.getByText("Partner Subtitle")).toBeInTheDocument();
  });

  it("should render category badge", () => {
    render(
      <PartnerCard
        name="Local Partner"
        category="Local"
        shortDescription="Description"
      />
    );
    expect(screen.getByText("Local")).toBeInTheDocument();
  });

  it("should apply correct category colors", () => {
    const { container, rerender } = render(
      <PartnerCard
        name="Local Partner"
        category="Local"
        shortDescription="Description"
      />
    );
    let badge = screen.getByText("Local");
    expect(badge.className).toContain("bg-sage-100");

    rerender(
      <PartnerCard
        name="National Partner"
        category="National"
        shortDescription="Description"
      />
    );
    badge = screen.getByText("National");
    expect(badge.className).toContain("bg-navy-100");

    rerender(
      <PartnerCard
        name="Global Partner"
        category="Global"
        shortDescription="Description"
      />
    );
    badge = screen.getByText("Global");
    expect(badge.className).toContain("bg-gold-100");
  });

  it("should render as a link when href is provided", () => {
    render(
      <PartnerCard
        name="Link Partner"
        category="Global"
        shortDescription="Description"
        href="/missions/link-partner"
      />
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/missions/link-partner");
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });
});
