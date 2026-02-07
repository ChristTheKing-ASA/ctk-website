import KeystaticApp from "./keystatic";
import AdminAuthGate from "@/components/AdminAuthGate";

export default function Layout() {
  return (
    <AdminAuthGate>
      <KeystaticApp />
    </AdminAuthGate>
  );
}
