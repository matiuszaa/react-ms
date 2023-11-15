import { Nav, Navbar } from "react-bootstrap";
import "./NavBar.css";

function NavBar() {
  return (
    <Navbar fixed="top" className="navbar-background" variant="dark">
      <table className="navbar-table">
        <thead>
          <tr>
            <td>
              <div className="title-tile">
                <a href="/" className="title-text">
                  LARPEX
                </a>
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Nav className="mr-auto navbar-tile">
                <Nav.Link className="border-right" href="/">
                  <span className="ref-tile">Strona Główna</span>
                </Nav.Link>
                <Nav.Link className="border-right" href="/events">
                  <span className="ref-tile">Wydarzenia</span>
                </Nav.Link>
                <Nav.Link className="border-right" href="/create-event">
                  <span className="ref-tile">Utwórz wydarzenie</span>
                </Nav.Link>
                <Nav.Link className="border-right" href="/events-panel">
                  <span className="ref-tile">Panel wydarzeń</span>
                </Nav.Link>
                <Nav.Link
                  className="border-right"
                  href="/events-organiser-panel"
                >
                  <div className="ref-tile">Organizacja wydarzeń</div>
                </Nav.Link>
              </Nav>
            </td>
          </tr>
        </tbody>
      </table>
    </Navbar>
  );
}

export default NavBar;
