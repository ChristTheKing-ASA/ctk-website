import { UserButton } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div style={{ position: "fixed", top: "0.5rem", right: "0.5rem", zIndex: 9999 }}>
        <UserButton />
      </div>
      {children}
    </>
  );
}
