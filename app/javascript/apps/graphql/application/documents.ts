export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  ISO8601DateTime: any,
};


export type Mutation = {
   __typename?: 'Mutation',
  testField: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  currentUser?: Maybe<User>,
};

export type User = {
   __typename?: 'User',
  accessToken: Scalars['String'],
  avatar?: Maybe<Scalars['String']>,
  createdAt: Scalars['ISO8601DateTime'],
  id: Scalars['Int'],
  mixinId: Scalars['ID'],
  mixinUuid: Scalars['String'],
  name: Scalars['String'],
};

export type CurrentUserQueryVariables = {};


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'mixinId' | 'mixinUuid' | 'avatar'>
  )> }
);

import gql from 'graphql-tag';

export const CurrentUser = gql`
    query CurrentUser {
  currentUser {
    name
    mixinId
    mixinUuid
    avatar
  }
}
    `;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    