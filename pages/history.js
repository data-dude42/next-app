import { useAtom } from 'jotai'; 
import { useRouter } from 'next/router';
import { searchHistoryAtom } from '../store';
import { removeFromHistory } from '../lib/userData'; 
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from '@/styles/History.module.css'; 

function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); 
  const router = useRouter();

  // If searchHistory is not yet loaded, return null
  if (!searchHistory) return null;

  // Function to parse search queries
  const parsedHistory = [];
  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  // Function when a history item is clicked
  const historyClicked = (e, index) => {
    e.preventDefault();
    router.push(`/artwork?${searchHistory[index]}`); // Navigate to artwork page with the selected search query
  };

  // Function to remove a history item
  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation(); // Stop event propagation to prevent other events from triggering
    // Remove history item asynchronously
    const updatedHistory = await removeFromHistory(searchHistory[index]);
    setSearchHistory(updatedHistory); // Update the searchHistory atom with the updated list
  };

  return (
    <div className="container mt-5">
      <h2>Search History</h2>
      {parsedHistory.length === 0 ? (
        <Card className="mt-4">
          <Card.Body>
            <Card.Text>Nothing here, try searching for some artwork.</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup className="mt-4">
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem}
              onClick={(e) => historyClicked(e, index)} // Handle click to navigate
            >
              {Object.keys(historyItem).map(key => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)} // Handle removal
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default History;
