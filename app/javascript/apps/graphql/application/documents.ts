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


export type MixinGroup = {
   __typename?: 'MixinGroup',
  category: Scalars['String'],
  codeId: Scalars['String'],
  conversationId: Scalars['String'],
  createdAt: Scalars['ISO8601DateTime'],
  creator: User,
  id: Scalars['ID'],
  name: Scalars['String'],
  participantUuids: Array<Scalars['String']>,
  users: Array<User>,
};

export type MultisigAccount = {
   __typename?: 'MultisigAccount',
  accountHash: Scalars['String'],
  createdAt: Scalars['ISO8601DateTime'],
  creator: User,
  id: Scalars['ID'],
  introduction?: Maybe<Scalars['String']>,
  memberUuids: Array<Scalars['String']>,
  members: Array<User>,
  name: Scalars['String'],
  threshold: Scalars['Int'],
};

export type MultisigAccountConnection = {
   __typename?: 'MultisigAccountConnection',
  edges?: Maybe<Array<Maybe<MultisigAccountEdge>>>,
  nodes?: Maybe<Array<Maybe<MultisigAccount>>>,
  pageInfo: PageInfo,
};

export type MultisigAccountEdge = {
   __typename?: 'MultisigAccountEdge',
  cursor: Scalars['String'],
  node?: Maybe<MultisigAccount>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createMultisigAccount?: Maybe<CreateMultisigAccountPayload>,
};


export type MutationCreateMultisigAccountArgs = {
  input: CreateMultisigAccountInput
};

export type PageInfo = {
   __typename?: 'PageInfo',
  endCursor?: Maybe<Scalars['String']>,
  hasNextPage: Scalars['Boolean'],
  hasPreviousPage: Scalars['Boolean'],
  startCursor?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  currentGroup?: Maybe<MixinGroup>,
  currentUser?: Maybe<User>,
  multisigAccount?: Maybe<MultisigAccount>,
  multisigAccounts: MultisigAccountConnection,
};


export type QueryCurrentGroupArgs = {
  conversationId?: Maybe<Scalars['String']>
};


export type QueryMultisigAccountArgs = {
  id: Scalars['ID']
};


export type QueryMultisigAccountsArgs = {
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
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

export type CurrentGroupQueryVariables = {
  conversationId?: Maybe<Scalars['String']>
};


export type CurrentGroupQuery = (
  { __typename?: 'Query' }
  & { currentGroup: Maybe<(
    { __typename?: 'MixinGroup' }
    & Pick<MixinGroup, 'conversationId' | 'name' | 'participantUuids'>
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'avatar' | 'mixinUuid'>
    )>, creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'avatar' | 'mixinUuid'>
    ) }
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

export type MultisigAccountQueryVariables = {
  id: Scalars['ID']
};


export type MultisigAccountQuery = (
  { __typename?: 'Query' }
  & { multisigAccount: Maybe<(
    { __typename?: 'MultisigAccount' }
    & Pick<MultisigAccount, 'id' | 'accountHash' | 'name' | 'introduction' | 'memberUuids' | 'threshold'>
    & { members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'avatar' | 'mixinUuid' | 'mixinId'>
    )> }
  )> }
);

export type MultisigAccountsQueryVariables = {};


export type MultisigAccountsQuery = (
  { __typename?: 'Query' }
  & { multisigAccounts: (
    { __typename?: 'MultisigAccountConnection' }
    & { edges: Maybe<Array<Maybe<(
      { __typename?: 'MultisigAccountEdge' }
      & { node: Maybe<(
        { __typename?: 'MultisigAccount' }
        & Pick<MultisigAccount, 'id' | 'accountHash' | 'name' | 'introduction' | 'memberUuids' | 'threshold'>
        & { members: Array<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'avatar' | 'name' | 'mixinUuid' | 'mixinId'>
        )> }
      )> }
    )>>> }
  ) }
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
export const CurrentGroup = gql`
    query CurrentGroup($conversationId: String) {
  currentGroup(conversationId: $conversationId) {
    conversationId
    name
    participantUuids
    users {
      id
      name
      avatar
      mixinUuid
    }
    creator {
      id
      name
      avatar
      mixinUuid
    }
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
export const MultisigAccount = gql`
    query MultisigAccount($id: ID!) {
  multisigAccount(id: $id) {
    id
    accountHash
    name
    introduction
    memberUuids
    threshold
    members {
      id
      name
      avatar
      mixinUuid
      mixinId
    }
  }
}
    `;
export const MultisigAccounts = gql`
    query MultisigAccounts {
  multisigAccounts {
    edges {
      node {
        id
        accountHash
        name
        introduction
        memberUuids
        threshold
        members {
          id
          avatar
          name
          mixinUuid
          mixinId
        }
      }
    }
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
    