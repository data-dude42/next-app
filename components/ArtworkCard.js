import useSWR from 'swr';
import Link from 'next/link';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';

const ArtworkCard = ({ objectID }) => {
  // Fetch data with SWR
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img 
        variant="top" 
        src={data.primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} 
      />
      <Card.Body>
        <Card.Title>{data.title || 'N/A'}</Card.Title>
        <Card.Text>
          Date: {data.objectDate || 'N/A'} <br />
          Classification: {data.classification || 'N/A'} <br />
          Medium: {data.medium || 'N/A'}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
          <Button variant="primary">{objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCard;
