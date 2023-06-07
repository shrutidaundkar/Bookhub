import { Container, Navbar, Nav } from "react-bootstrap";
const Sidebar = () => {
  return (
    <Navbar className="sidebar">
      <Container className="sidebar-container">
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="options">
            <div>
              <h3 className="logo">BookHub</h3>
            </div>
            <Nav.Link className="options-link" href="/">
              Books
            </Nav.Link>
            <Nav.Link className="options-link" href="/authors">
              Authors
            </Nav.Link>
            <Nav.Link className="options-link" href="/statistics">
              Statistics
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Sidebar;
