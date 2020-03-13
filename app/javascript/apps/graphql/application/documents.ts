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

export type CreateMultisigAccountInput = {
  conversationId?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  introduction?: Maybe<Scalars['String']>,
  threshold: Scalars['Int'],
  memberUuids: Array<Scalars['String']>,
  clientMutationId?: Maybe<Scalars['String']>,
};

export type CreateMultisigAccountPayload = {
   __typename?: 'CreateMultisigAccountPayload',
  clientMutationId?: Maybe<Scalars['String']>,
  errors?: Maybe<Scalars['String']>,
  multisigAccount?: Maybe<MultisigAccount>,
};


export type MultisigAccount = {
   __typename?: 'MultisigAccount',
  createdAt: Scalars['ISO8601DateTime'],
  creator: User,
  hash: Scalars['String'],
  id: Scalars['ID'],
  introduction?: Maybe<Scalars['String']>,
  memberUuids: Array<Scalars['String']>,
  name: Scalars['String'],
  threshold: Scalars['Int'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createMultisigAccount?: Maybe<CreateMultisigAccountPayload>,
};


export type MutationCreateMultisigAccountArgs = {
  input: CreateMultisigAccountInput
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
  id: Scalars['ID'],
  mixinId: Scalars['String'],
  mixinUuid: Scalars['String'],
  name: Scalars['String'],
};

export type CreateMultisigAccountMutationVariables = {
  input: CreateMultisigAccountInput
};


export type CreateMultisigAccountMutation = (
  { __typename?: 'Mutation' }
  & { createMultisigAccount: Maybe<(
    { __typename?: 'CreateMultisigAccountPayload' }
    & Pick<CreateMultisigAccountPayload, 'errors'>
    & { multisigAccount: Maybe<(
      { __typename?: 'MultisigAccount' }
      & Pick<MultisigAccount, 'id' | 'name'>
    )> }
  )> }
);

export type CurrentUserQueryVariables = {};


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'mixinId' | 'mixinUuid' | 'avatar'>
  )> }
);

import gql from 'graphql-tag';

export const CreateMultisigAccount = gql`
    mutation CreateMultisigAccount($input: CreateMultisigAccountInput!) {
  createMultisigAccount(input: $input) {
    multisigAccount {
      id
      name
    }
    errors
  }
}
    `;
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
    