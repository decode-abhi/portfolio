function Navbar() {
  return (
    <header className="navbar">
      <a
        href="#hero"
        className="logo"
      >
        ABHI
      </a>

      <nav className="nav-links">
        <a href="#about">
          About
        </a>

        <a href="#skills">
          Skills
        </a>

        <a href="#projects">
          Projects
        </a>

        <a href="#contact">
          Contact
        </a>
      </nav>
    </header>
  );
}

export default Navbar;