import { Outlet } from "react-router-dom";
import Header from "./Header";
import Section from "./Section";

export default function Layout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}
