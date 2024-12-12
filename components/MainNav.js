import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData'; // Import the addToHistory function
import { readToken, removeToken } from '../lib/authenticate'; // Import functions to handle token

function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // State for navbar expansion
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // Hook into searchHistoryAtom

  // Check if the user is logged in by reading the token
  const token = readToken(); // This should read the token from localStorage or any other storage mechanism

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();

    // Construct query string for search
    const queryString = `title=true&q=${searchField}`;

    // Add to search history in the database and update the atom value
    setSearchHistory(await addToHistory(queryString));

    // Redirect to the artwork search page with the query string
    router.push(`/artwork?${queryString}`);

    setIsExpanded(false); // Collapse the navbar after searching
  };

  // Function to toggle the navbar
  const toggleNavbar = () => {
    setIsExpanded(!isExpanded); // Toggle navbar on click
  };

  // Function to close the navbar
  const closeNavbar = () => {
    setIsExpanded(false); // Close the navbar
  };

  // Function to log the user out
  const logout = () => {
    setIsExpanded(false); // Collapse the navbar
    removeToken(); // Remove token from storage
    router.push('/login'); // Redirect to the login page
  };

  return (
    <>
      <Navbar
        fixed="top"
        expand="lg"
        className="navbar-dark bg-primary"
        expanded={isExpanded} // Bind expanded state to Navbar
      >
        <Container>
          <Navbar.Brand>Paras Singh</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={toggleNavbar} // Toggle navbar on click
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/"} onClick={closeNavbar}>Home</Nav.Link>
              </Link>

              {/* Only show Advanced Search if the user is logged in */}
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/search"} onClick={closeNavbar}>Advanced Search</Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            {/* Only show Search form if the user is logged in */}
            {token && (
              <Form className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                />
                <Button type="submit" variant="info">Search</Button>
              </Form>
            )}
            &nbsp;
            <Nav>
              {/* If logged in, show User Name dropdown with logout */}
              {token ? (
                <NavDropdown title="User Name" id="user-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item active={router.pathname === "/favourites"} onClick={closeNavbar}>Favourites</NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item active={router.pathname === "/history"} onClick={closeNavbar}>Search History</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                // If not logged in, show Register and Login links
                <Nav className="ms-auto">
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link active={router.pathname === "/register"} onClick={closeNavbar}>Register</Nav.Link>
                  </Link>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link active={router.pathname === "/login"} onClick={closeNavbar}>Login</Nav.Link>
                  </Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default MainNav;
