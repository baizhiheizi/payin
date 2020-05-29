import ApolloClient, { InMemoryCache } from 'apollo-boost';

const cache = new InMemoryCache();
const csrfToken: any = document.querySelector("meta[name='csrf-token']") || {};

export function apolloClient(baseUrl?: string, token?: string) {
  return new ApolloClient({
    cache,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token || csrfToken.content,
    },
    uri: `${baseUrl || ''}/graphql`,
  });
}
