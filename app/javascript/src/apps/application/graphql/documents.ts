import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ISO8601DateTime: any;
};

export type Asset = {
   __typename?: 'Asset';
  assetId: Scalars['String'];
  chainId: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  iconUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mixinId: Scalars['String'];
  name: Scalars['String'];
  priceBtc?: Maybe<Scalars['Float']>;
  priceUsd?: Maybe<Scalars['Float']>;
  symbol: Scalars['String'];
};

export type AssetConnection = {
   __typename?: 'AssetConnection';
  edges?: Maybe<Array<Maybe<AssetEdge>>>;
  nodes?: Maybe<Array<Maybe<Asset>>>;
  pageInfo: PageInfo;
};

export type AssetEdge = {
   __typename?: 'AssetEdge';
  cursor: Scalars['String'];
  node?: Maybe<Asset>;
};

export type CreateMultisigAccountInput = {
  conversationId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  introduction?: Maybe<Scalars['String']>;
  threshold: Scalars['Int'];
  memberUuids: Array<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateMultisigAccountPayload = {
   __typename?: 'CreateMultisigAccountPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  multisigAccount?: Maybe<MultisigAccount>;
};

export type CreateMultisigPaymentInput = {
  conversationId?: Maybe<Scalars['String']>;
  accountId: Scalars['ID'];
  amount: Scalars['Float'];
  assetId: Scalars['String'];
  memo?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateMultisigPaymentPayload = {
   __typename?: 'CreateMultisigPaymentPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  multisigPayment?: Maybe<MultisigPayment>;
};

export type CreateMultisigRequestInput = {
  conversationId?: Maybe<Scalars['String']>;
  action: Scalars['String'];
  accountId: Scalars['ID'];
  transactionId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateMultisigRequestPayload = {
   __typename?: 'CreateMultisigRequestPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  multisigRequest: MultisigRequest;
  multisigTransaction: MultisigTransaction;
};

export type CreateMultisigTransactionInput = {
  conversationId?: Maybe<Scalars['String']>;
  accountId: Scalars['ID'];
  amount: Scalars['Float'];
  assetId: Scalars['String'];
  memo?: Maybe<Scalars['String']>;
  receiverUuid: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateMultisigTransactionPayload = {
   __typename?: 'CreateMultisigTransactionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  multisigTransaction?: Maybe<MultisigTransaction>;
};


export type MixinGroup = {
   __typename?: 'MixinGroup';
  category: Scalars['String'];
  codeId: Scalars['String'];
  conversationId: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  creator: User;
  id: Scalars['ID'];
  name: Scalars['String'];
  participantUuids: Array<Scalars['String']>;
  users: Array<User>;
};

export type MultisigAccount = {
   __typename?: 'MultisigAccount';
  accountHash: Scalars['String'];
  assets: Array<Asset>;
  createdAt: Scalars['ISO8601DateTime'];
  creator: User;
  id: Scalars['ID'];
  introduction?: Maybe<Scalars['String']>;
  memberUuids: Array<Scalars['String']>;
  members: Array<User>;
  multisigPayments: Array<MultisigPayment>;
  name: Scalars['String'];
  threshold: Scalars['Int'];
  utxos: Array<MultisigUtxo>;
};

export type MultisigAccountConnection = {
   __typename?: 'MultisigAccountConnection';
  edges?: Maybe<Array<Maybe<MultisigAccountEdge>>>;
  nodes?: Maybe<Array<Maybe<MultisigAccount>>>;
  pageInfo: PageInfo;
};

export type MultisigAccountEdge = {
   __typename?: 'MultisigAccountEdge';
  cursor: Scalars['String'];
  node?: Maybe<MultisigAccount>;
};

export type MultisigPayment = {
   __typename?: 'MultisigPayment';
  amount: Scalars['Float'];
  asset: Asset;
  assetId: Scalars['String'];
  codeId: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  creator: User;
  id: Scalars['ID'];
  memo?: Maybe<Scalars['String']>;
  multisigAccount: MultisigAccount;
  receivers: Array<Scalars['String']>;
  status: Scalars['String'];
  threshold: Scalars['Int'];
  traceId: Scalars['String'];
};

export type MultisigRequest = {
   __typename?: 'MultisigRequest';
  action?: Maybe<Scalars['String']>;
  amount: Scalars['Float'];
  assetId: Scalars['String'];
  codeId: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  memo?: Maybe<Scalars['String']>;
  rawTransaction: Scalars['String'];
  receivers: Array<Scalars['String']>;
  requestId: Scalars['String'];
  senders: Array<Scalars['String']>;
  signers: Array<Scalars['String']>;
  state: Scalars['String'];
  threshold: Scalars['Int'];
  transactionHash: Scalars['String'];
  userId: Scalars['String'];
};

export type MultisigTransaction = {
   __typename?: 'MultisigTransaction';
  amount: Scalars['Float'];
  asset: Asset;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  memo?: Maybe<Scalars['String']>;
  multisigAccount: MultisigAccount;
  multisigRequests: MultisigRequest;
  rawTransaction?: Maybe<Scalars['String']>;
  receiverUuids: Array<Scalars['String']>;
  receivers: Array<User>;
  senderUuids: Array<Scalars['String']>;
  senders: Array<User>;
  signerUuids: Array<Scalars['String']>;
  signers: Array<User>;
  status?: Maybe<Scalars['String']>;
  threshold: Scalars['Int'];
  transactionHash?: Maybe<Scalars['String']>;
  user: User;
};

export type MultisigTransactionConnection = {
   __typename?: 'MultisigTransactionConnection';
  edges?: Maybe<Array<Maybe<MultisigTransactionEdge>>>;
  nodes?: Maybe<Array<Maybe<MultisigTransaction>>>;
  pageInfo: PageInfo;
};

export type MultisigTransactionEdge = {
   __typename?: 'MultisigTransactionEdge';
  cursor: Scalars['String'];
  node?: Maybe<MultisigTransaction>;
};

export type MultisigUtxo = {
   __typename?: 'MultisigUtxo';
  amount: Scalars['Float'];
  asset: Asset;
  assetId: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  members: Array<Scalars['String']>;
  memo?: Maybe<Scalars['String']>;
  outputIndex: Scalars['Int'];
  signedBy?: Maybe<Scalars['String']>;
  signedTx?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  threshold: Scalars['Int'];
  transactionHash: Scalars['String'];
  type: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createMultisigAccount?: Maybe<CreateMultisigAccountPayload>;
  createMultisigPayment?: Maybe<CreateMultisigPaymentPayload>;
  createMultisigRequest?: Maybe<CreateMultisigRequestPayload>;
  createMultisigTransaction?: Maybe<CreateMultisigTransactionPayload>;
  verifyMultisigPayment?: Maybe<VerifyMultisigPaymentPayload>;
  verifyMultisigRequest?: Maybe<VerifyMultisigRequestPayload>;
};


export type MutationCreateMultisigAccountArgs = {
  input: CreateMultisigAccountInput;
};


export type MutationCreateMultisigPaymentArgs = {
  input: CreateMultisigPaymentInput;
};


export type MutationCreateMultisigRequestArgs = {
  input: CreateMultisigRequestInput;
};


export type MutationCreateMultisigTransactionArgs = {
  input: CreateMultisigTransactionInput;
};


export type MutationVerifyMultisigPaymentArgs = {
  input: VerifyMultisigPaymentInput;
};


export type MutationVerifyMultisigRequestArgs = {
  input: VerifyMultisigRequestInput;
};

export type PageInfo = {
   __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  assets: AssetConnection;
  currentGroup?: Maybe<MixinGroup>;
  currentUser?: Maybe<User>;
  multisigAccount?: Maybe<MultisigAccount>;
  multisigAccounts: MultisigAccountConnection;
  multisigTransactions: MultisigTransactionConnection;
};


export type QueryAssetsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCurrentGroupArgs = {
  conversationId?: Maybe<Scalars['String']>;
};


export type QueryMultisigAccountArgs = {
  id: Scalars['ID'];
};


export type QueryMultisigAccountsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryMultisigTransactionsArgs = {
  accountId: Scalars['ID'];
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type User = {
   __typename?: 'User';
  accessToken: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  mixinId: Scalars['String'];
  mixinUuid: Scalars['String'];
  name: Scalars['String'];
};

export type VerifyMultisigPaymentInput = {
  conversationId?: Maybe<Scalars['String']>;
  codeId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type VerifyMultisigPaymentPayload = {
   __typename?: 'VerifyMultisigPaymentPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  multisigPayment?: Maybe<MultisigPayment>;
};

export type VerifyMultisigRequestInput = {
  conversationId?: Maybe<Scalars['String']>;
  codeId: Scalars['String'];
  transactionId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type VerifyMultisigRequestPayload = {
   __typename?: 'VerifyMultisigRequestPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  multisigRequest?: Maybe<MultisigRequest>;
  multisigTransaction?: Maybe<MultisigTransaction>;
};

export type CreateMultisigAccountMutationVariables = {
  input: CreateMultisigAccountInput;
};


export type CreateMultisigAccountMutation = (
  { __typename?: 'Mutation' }
  & { createMultisigAccount?: Maybe<(
    { __typename?: 'CreateMultisigAccountPayload' }
    & Pick<CreateMultisigAccountPayload, 'errors'>
    & { multisigAccount?: Maybe<(
      { __typename?: 'MultisigAccount' }
      & Pick<MultisigAccount, 'id' | 'name'>
    )> }
  )> }
);

export type CreateMultisigPaymentMutationVariables = {
  input: CreateMultisigPaymentInput;
};


export type CreateMultisigPaymentMutation = (
  { __typename?: 'Mutation' }
  & { createMultisigPayment?: Maybe<(
    { __typename?: 'CreateMultisigPaymentPayload' }
    & Pick<CreateMultisigPaymentPayload, 'errors'>
    & { multisigPayment?: Maybe<(
      { __typename?: 'MultisigPayment' }
      & Pick<MultisigPayment, 'id' | 'codeId' | 'status'>
    )> }
  )> }
);

export type CreateMultisigRequestMutationVariables = {
  input: CreateMultisigRequestInput;
};


export type CreateMultisigRequestMutation = (
  { __typename?: 'Mutation' }
  & { createMultisigRequest?: Maybe<(
    { __typename?: 'CreateMultisigRequestPayload' }
    & { multisigRequest: (
      { __typename?: 'MultisigRequest' }
      & Pick<MultisigRequest, 'action' | 'codeId' | 'requestId' | 'state' | 'signers' | 'transactionHash'>
    ), multisigTransaction: (
      { __typename?: 'MultisigTransaction' }
      & Pick<MultisigTransaction, 'id' | 'signerUuids' | 'status'>
    ) }
  )> }
);

export type CreateMultisigTransactionMutationVariables = {
  input: CreateMultisigTransactionInput;
};


export type CreateMultisigTransactionMutation = (
  { __typename?: 'Mutation' }
  & { createMultisigTransaction?: Maybe<(
    { __typename?: 'CreateMultisigTransactionPayload' }
    & Pick<CreateMultisigTransactionPayload, 'errors'>
    & { multisigTransaction?: Maybe<(
      { __typename?: 'MultisigTransaction' }
      & Pick<MultisigTransaction, 'id' | 'status' | 'amount' | 'memo' | 'rawTransaction' | 'threshold' | 'createdAt'>
      & { senders: Array<(
        { __typename?: 'User' }
        & Pick<User, 'avatar' | 'mixinUuid' | 'name'>
      )>, receivers: Array<(
        { __typename?: 'User' }
        & Pick<User, 'avatar' | 'mixinUuid' | 'name'>
      )>, signers: Array<(
        { __typename?: 'User' }
        & Pick<User, 'avatar' | 'mixinUuid' | 'name'>
      )> }
    )> }
  )> }
);

export type VerifyMultisigPaymentMutationVariables = {
  input: VerifyMultisigPaymentInput;
};


export type VerifyMultisigPaymentMutation = (
  { __typename?: 'Mutation' }
  & { verifyMultisigPayment?: Maybe<(
    { __typename?: 'VerifyMultisigPaymentPayload' }
    & { multisigPayment?: Maybe<(
      { __typename?: 'MultisigPayment' }
      & Pick<MultisigPayment, 'id' | 'codeId' | 'status'>
    )> }
  )> }
);

export type VerifyMultisigRequestMutationVariables = {
  input: VerifyMultisigRequestInput;
};


export type VerifyMultisigRequestMutation = (
  { __typename?: 'Mutation' }
  & { verifyMultisigRequest?: Maybe<(
    { __typename?: 'VerifyMultisigRequestPayload' }
    & { multisigRequest?: Maybe<(
      { __typename?: 'MultisigRequest' }
      & Pick<MultisigRequest, 'state'>
    )>, multisigTransaction?: Maybe<(
      { __typename?: 'MultisigTransaction' }
      & Pick<MultisigTransaction, 'id' | 'signerUuids' | 'status'>
    )> }
  )> }
);

export type AssetsQueryVariables = {};


export type AssetsQuery = (
  { __typename?: 'Query' }
  & { assets: (
    { __typename?: 'AssetConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'AssetEdge' }
      & { node?: Maybe<(
        { __typename?: 'Asset' }
        & Pick<Asset, 'assetId' | 'symbol' | 'name' | 'iconUrl'>
      )> }
    )>>> }
  ) }
);

export type CurrentGroupQueryVariables = {
  conversationId?: Maybe<Scalars['String']>;
};


export type CurrentGroupQuery = (
  { __typename?: 'Query' }
  & { currentGroup?: Maybe<(
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
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'mixinId' | 'mixinUuid' | 'avatar'>
  )> }
);

export type MultisigAccountQueryVariables = {
  id: Scalars['ID'];
};


export type MultisigAccountQuery = (
  { __typename?: 'Query' }
  & { multisigAccount?: Maybe<(
    { __typename?: 'MultisigAccount' }
    & Pick<MultisigAccount, 'id' | 'accountHash' | 'name' | 'introduction' | 'memberUuids' | 'threshold'>
    & { members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'avatar' | 'mixinUuid' | 'mixinId'>
    )>, utxos: Array<(
      { __typename?: 'MultisigUtxo' }
      & Pick<MultisigUtxo, 'id' | 'type' | 'userId' | 'assetId' | 'transactionHash' | 'outputIndex' | 'amount' | 'threshold' | 'members' | 'state' | 'memo' | 'signedBy' | 'signedTx'>
    )>, assets: Array<(
      { __typename?: 'Asset' }
      & Pick<Asset, 'assetId' | 'name' | 'symbol' | 'iconUrl'>
    )>, multisigPayments: Array<(
      { __typename?: 'MultisigPayment' }
      & Pick<MultisigPayment, 'status' | 'codeId' | 'traceId' | 'amount' | 'memo'>
      & { asset: (
        { __typename?: 'Asset' }
        & Pick<Asset, 'assetId' | 'name' | 'symbol' | 'iconUrl'>
      ), creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'avatar' | 'mixinUuid' | 'mixinId'>
      ) }
    )> }
  )>, assets: (
    { __typename?: 'AssetConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'AssetEdge' }
      & { node?: Maybe<(
        { __typename?: 'Asset' }
        & Pick<Asset, 'assetId' | 'name' | 'symbol' | 'iconUrl'>
      )> }
    )>>> }
  ) }
);

export type MultisigAccountsQueryVariables = {};


export type MultisigAccountsQuery = (
  { __typename?: 'Query' }
  & { multisigAccounts: (
    { __typename?: 'MultisigAccountConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'MultisigAccountEdge' }
      & { node?: Maybe<(
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

export type MultisigTransactionsQueryVariables = {
  accountId: Scalars['ID'];
};


export type MultisigTransactionsQuery = (
  { __typename?: 'Query' }
  & { multisigTransactions: (
    { __typename?: 'MultisigTransactionConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'MultisigTransactionEdge' }
      & { node?: Maybe<(
        { __typename?: 'MultisigTransaction' }
        & Pick<MultisigTransaction, 'id' | 'amount' | 'memo' | 'rawTransaction' | 'threshold' | 'createdAt' | 'signerUuids' | 'receiverUuids' | 'status'>
        & { asset: (
          { __typename?: 'Asset' }
          & Pick<Asset, 'assetId' | 'iconUrl' | 'name' | 'symbol'>
        ), user: (
          { __typename?: 'User' }
          & Pick<User, 'avatar' | 'mixinUuid' | 'name'>
        ), senders: Array<(
          { __typename?: 'User' }
          & Pick<User, 'avatar' | 'mixinUuid' | 'name'>
        )>, receivers: Array<(
          { __typename?: 'User' }
          & Pick<User, 'avatar' | 'mixinUuid' | 'name'>
        )>, signers: Array<(
          { __typename?: 'User' }
          & Pick<User, 'avatar' | 'mixinUuid' | 'name'>
        )> }
      )> }
    )>>> }
  ) }
);


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
export const CreateMultisigPayment = gql`
    mutation CreateMultisigPayment($input: CreateMultisigPaymentInput!) {
  createMultisigPayment(input: $input) {
    multisigPayment {
      id
      codeId
      status
    }
    errors
  }
}
    `;
export const CreateMultisigRequest = gql`
    mutation CreateMultisigRequest($input: CreateMultisigRequestInput!) {
  createMultisigRequest(input: $input) {
    multisigRequest {
      action
      codeId
      requestId
      state
      signers
      transactionHash
    }
    multisigTransaction {
      id
      signerUuids
      status
    }
  }
}
    `;
export const CreateMultisigTransaction = gql`
    mutation CreateMultisigTransaction($input: CreateMultisigTransactionInput!) {
  createMultisigTransaction(input: $input) {
    multisigTransaction {
      id
      status
      amount
      memo
      rawTransaction
      threshold
      createdAt
      senders {
        avatar
        mixinUuid
        name
      }
      receivers {
        avatar
        mixinUuid
        name
      }
      signers {
        avatar
        mixinUuid
        name
      }
    }
    errors
  }
}
    `;
export const VerifyMultisigPayment = gql`
    mutation VerifyMultisigPayment($input: VerifyMultisigPaymentInput!) {
  verifyMultisigPayment(input: $input) {
    multisigPayment {
      id
      codeId
      status
    }
  }
}
    `;
export const VerifyMultisigRequest = gql`
    mutation VerifyMultisigRequest($input: VerifyMultisigRequestInput!) {
  verifyMultisigRequest(input: $input) {
    multisigRequest {
      state
    }
    multisigTransaction {
      id
      signerUuids
      status
    }
  }
}
    `;
export const Assets = gql`
    query Assets {
  assets {
    edges {
      node {
        assetId
        symbol
        name
        iconUrl
      }
    }
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
    utxos {
      id
      type
      userId
      assetId
      transactionHash
      outputIndex
      amount
      threshold
      members
      state
      memo
      signedBy
      signedTx
    }
    assets {
      assetId
      name
      symbol
      iconUrl
    }
    multisigPayments {
      status
      codeId
      traceId
      amount
      memo
      asset {
        assetId
        name
        symbol
        iconUrl
      }
      creator {
        id
        name
        avatar
        mixinUuid
        mixinId
      }
    }
  }
  assets(first: 100) {
    edges {
      node {
        assetId
        name
        symbol
        iconUrl
      }
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
export const MultisigTransactions = gql`
    query MultisigTransactions($accountId: ID!) {
  multisigTransactions(accountId: $accountId) {
    edges {
      node {
        id
        amount
        memo
        rawTransaction
        threshold
        createdAt
        signerUuids
        receiverUuids
        status
        asset {
          assetId
          iconUrl
          name
          symbol
        }
        user {
          avatar
          mixinUuid
          name
        }
        senders {
          avatar
          mixinUuid
          name
        }
        receivers {
          avatar
          mixinUuid
          name
        }
        signers {
          avatar
          mixinUuid
          name
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
    