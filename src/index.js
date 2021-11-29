import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import env from './env';
import './styles/index.css';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './views/Home';
import UserDetail from './views/UserDetail';

const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  request: operation => {
    operation.setContext({
      headers: {
        'x-api-key': env.GRAPHQL_API_KEY,
      }
    })
  }
});

const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;

const App = () => {
  const { loading, error, data, refetch } = useQuery(ALL_USERS_QUERY);
  const [usersById, setUsersById] = useState(null);

  useEffect(() => {
    const users = data ? data.allUsers : null;
    if (users !== null) {
      setUsersById(users.reduce((acc, user) => {
        acc[user.email] = user;
        return acc;
      }, {}));
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home users={data && data.allUsers} refetchAllUsersQuery={refetch} />} />
        <Route path="/user/:userEmail" element={<UserDetail usersById={usersById} refetchAllUsersQuery={refetch} />} />
        {/* redirect to home if no match */}
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  )
}


const Root = () => (
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));