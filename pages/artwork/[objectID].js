import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ArtworkCardDetail from '../components/ArtworkCardDetail';
import { Row, Col } from 'react-bootstrap';


export default function ArtworkDetailPage() {
  const router = useRouter();
  const { objectID } = router.query;

  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
  );

  if (error) return <div>Error fetching data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Row>
      <Col>
        <ArtworkCardDetail data={data} />
      </Col>
    </Row>
  );
}

