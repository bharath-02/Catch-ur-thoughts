import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export default function Register() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value});
    }

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result);
        },
        variables: values
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit} noValidate>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username...."
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email...."
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password...."
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password...."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id email username createdAt token
        }
    }
`