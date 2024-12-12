import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '../store'; 
import { getFavourites, getHistory } from '../lib/userData'; 

const PUBLIC_PATHS = ['/register', '/login']; 

function RouteGuard({ children }) {
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if the user is authenticated
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('token');

  // Update atoms with user's favourites and history
  const updateAtoms = async () => {
    if (isAuthenticated) {
      const userFavourites = await getFavourites(); // Fetch favourites from API
      const userHistory = await getHistory(); // Fetch history from API

      setFavourites(userFavourites);
      setSearchHistory(userHistory);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      updateAtoms().then(() => setLoading(false));
    } else if (!PUBLIC_PATHS.includes(router.pathname)) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router.pathname]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching the user's data
  }

  return <>{children}</>;
}

export default RouteGuard;

