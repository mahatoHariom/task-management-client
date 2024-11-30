"use client";

import { ModeToggle } from "../global/theme-toggle";

const Navbar = () => {
  return (
    <div className="  p-4 flex justify-between border-b">
      <h1 className="text-xl">Dashboard</h1>
      <ModeToggle />
    </div>
  );
};
export default Navbar;
