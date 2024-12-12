import MainNav from './MainNav';
import Container from 'react-bootstrap/Container';

function Layout({ children }) {
  return (
    <>
      <MainNav />
      <br />
      <Container>{children}</Container>
      <br />
    </>
  );
}

export default Layout;
