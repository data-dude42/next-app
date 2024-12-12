import useSWR from 'swr';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { favouritesAtom } from '../store';
import { addToFavourites, removeFromFavourites } from '../lib/userData'; 

const ArtworkCardDetail = ({ objectID }) => {
  // Fetch data with SWR
  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
  );

  // Manage favourites list using Jotai
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  // Manage button state
  const [showAdded, setShowAdded] = useState(false);

  // Update button state based on favourites list
  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  // Handle favourites button click
  const favouritesClicked = async () => {
    if (showAdded) {
      // Remove from favourites
      const updatedFavourites = await removeFromFavourites(objectID);
      setFavouritesList(updatedFavourites);
    } else {
      // Add to favourites
      const updatedFavourites = await addToFavourites(objectID);
      setFavouritesList(updatedFavourites);
    }
  };

  // Handle API errors
  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card style={{ width: '24rem' }}>
      {data.primaryImage && (
        <Card.Img variant="top" src={data.primaryImage} />
      )}
      <Card.Body>
        <Card.Title>{data.title || 'N/A'}</Card.Title>
        <Card.Text>
          Date: {data.objectDate || 'N/A'} <br />
          Classification: {data.classification || 'N/A'} <br />
          Medium: {data.medium || 'N/A'}
          <br /><br />
          Artist: {data.artistDisplayName || 'N/A'}{' '}
          {data.artistDisplayName && data.artistWikidata_URL && (
            <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>
          )}
          <br />
          Credit Line: {data.creditLine || 'N/A'} <br />
          Dimensions: {data.dimensions || 'N/A'}
        </Card.Text>
        {/* Add Favourite Button */}
        <Button
          variant={showAdded ? 'primary' : 'outline-primary'}
          onClick={favouritesClicked}
        >
          {showAdded ? '+ Favourite (added)' : '+ Favourite'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;
