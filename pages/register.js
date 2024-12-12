import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Form, Button, Alert } from "react-bootstrap";
import { registerUser } from "@/lib/authenticate";

export default function Register() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            // Attempt to register the user
            await registerUser(user, password, password2);
            
            // Redirect to login page after successful registration
            router.push('/login');
        } catch (err) {
            // Set error message if registration fails
            setError(err.message);
        }
    }

    return (
        <>
            <Card bg="light">
                <Card.Body>
                    <h2>Register</h2>
                    Register for an account:
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
                <Form.Group>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control 
                        type="password" 
                        id="password2" 
                        name="password2" 
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Button variant="primary" className="pull-right" type="submit">Register</Button>
            </Form>
        </>
    );
}