import validObjectIDList from '@/public/data/validObjectIDList.json';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Row, Col, Card, Pagination } from 'react-bootstrap';
import ArtworkCard from '../../components/ArtworkCard';
import Error from 'next/error';

// following the specifications
const PER_PAGE = 12;

const Artwork = () => {
  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();

  // Extracting query string from URL
  let finalQuery = router.asPath.split('?')[1];

  // SWR request to fetch search results based on query
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

  // Pagination functions
  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    if (page < artworkList.length) setPage(page + 1);
  };

  // Effect to process data from SWR and handle pagination
  useEffect(() => {
    if (data && data.objectIDs) {
      // Filter valid objectIDs
      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs.includes(x)
      );

      // Paginate filtered results
      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtworkList(results);
      setPage(1); // Reset to the first page after processing results
    }
  }, [data]);

  // Error handling
  if (error) return <Error statusCode={404} />;
  if (!artworkList) return null;

  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                <p>Try searching for something else</p>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Artwork;
