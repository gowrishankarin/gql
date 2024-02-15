import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Header from "./components/Header";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache,
})

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId='662810150378-m7hu53jiga2gi652j0cou1d4c2l8pdl9.apps.googleusercontent.com'>
        <ApolloProvider client={client}>
          <Router>
            <Header />
            <div className="container">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/projects/:id' element={<Project />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            </div>
          </Router>
        </ApolloProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
