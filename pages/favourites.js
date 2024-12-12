import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import ArtworkCard from '../components/ArtworkCard';
import { Container, Row, Col } from 'react-bootstrap';

const Favourites = () => {
  // Access the favourites list from the atom
  const [favouritesList] = useAtom(favouritesAtom);

  // Prevent rendering if favouritesList is not yet available
  if (!favouritesList) return null;

  return (
    <Container>
      <h1 className="my-4">My Favourites</h1>
      {favouritesList.length > 0 ? (
        <Row className="gy-4">
          {favouritesList.map((objectID) => (
            <Col lg={3} md={4} sm={6} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>Nothing here, try adding some new artwork to the list.</p>
      )}
    </Container>
  );
};

export default Favourites;

