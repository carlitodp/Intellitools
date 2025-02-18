import { MouseEvent } from "react";
import { useState } from "react";

interface Props {
  nav_links: string[];
}

function Navbar({ nav_links }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav">
            {nav_links.map((nav_link, index) => (
              <li key={index} className="nav-item">
                <a className={index == selectedIndex ? "nav-link active" : "nav-link"} aria-current="page" onClick={() => setSelectedIndex(index)}>
                  {nav_link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
