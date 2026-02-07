import { UserButton } from "@clerk/nextjs";
import KeystaticApp from "./keystatic";

export default function Layout() {
  return (
    <>
      <div style={{ position: "fixed", top: "0.5rem", right: "0.5rem", zIndex: 9999 }}>
        <UserButton />
      </div>
      <KeystaticApp />
    </>
  );
}
