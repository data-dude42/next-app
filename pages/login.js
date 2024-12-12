import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { authenticateUser } from '@/lib/authenticate';
import { getFavourites, getHistory } from '@/lib/userData';

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [, setFavouritesList] = useAtom(favouritesAtom);
    const [, setSearchHistory] = useAtom(searchHistoryAtom);

    const router = useRouter();

    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            // Attempt to authenticate the user
            await authenticateUser(user, password);

            // If authentication is successful, update atoms
            await updateAtoms();

            // Redirect to favourites page
            router.push('/favourites');
        } catch (err) {
            // Set error message if authentication fails
            setError(err.message);
        }
    }


    return (
        <>
            <Card bg="light">
                <Card.Body>
                    <h2>Login</h2>
                    Enter your login information below:
                </Card.Body>
            </Card>
            <br />
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>User:</Form.Label>
                    <Form.Control
                        type="text"
                        id="userName"
                        name="userName"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Button variant="primary" className="pull-right" type="submit">Login</Button>
            </Form>
        </>
    );
}