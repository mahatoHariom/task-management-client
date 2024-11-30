import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64  h-full p-4 border">
      <ul>
        <li className="p-2 hover:bg-gray-600">Tasks</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
