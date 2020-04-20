import React from "react";
import { NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

// HAMBURGER NAV ITEMS (HOME)
// Used this object structure to create the sidebar menu items:
/*  {
      title: "Messages",
      contents: [
      {
        destination: "/sendMessage",
        label: "Send A Message",
      },
    } 
*/
function Sidebar({ items }) {
  return (
    <Menu>
      {items.map(({ title, contents }) => (
        <div className="hamburger-nav">
          {title}
          {contents.map(({ destination, label }) => (
            <li>
              <NavLink
                key={label}
                className="menu-item"
                to={destination}
                style={{ cursor: "pointer" }}
              >
                {label}
              </NavLink>
            </li>
          ))}{" "}
        </div>
      ))}
    </Menu>

    // <Menu>
    //   {items.map(({ label, destination }) => (
    //     <NavLink
    //       key={label}
    //       className="menu-item"
    //       to={destination}
    //       style={{ cursor: "pointer" }}
    //     >
    //       {label}
    //     </NavLink>
    //   ))}
    // </Menu>
  );
}

export default Sidebar;
