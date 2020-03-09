export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AdminLoginInput = {
  name: Scalars['String'],
  password: Scalars['String'],
  clientMutationId?: Maybe<Scalars['String']>,
};

export type AdminLoginPayload = {
   __typename?: 'AdminLoginPayload',
  clientMutationId?: Maybe<Scalars['String']>,
  msg?: Maybe<Scalars['String']>,
};

export type AdminLogoutInput = {
  clientMutationId?: Maybe<Scalars['String']>,
};

export type AdminLogoutPayload = {
   __typename?: 'AdminLogoutPayload',
  clientMutationId?: Maybe<Scalars['String']>,
  msg: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  adminLogin?: Maybe<AdminLoginPayload>,
  adminLogout?: Maybe<AdminLogoutPayload>,
};


export type MutationAdminLoginArgs = {
  input: AdminLoginInput
};


export type MutationAdminLogoutArgs = {
  input: AdminLogoutInput
};

export type Query = {
   __typename?: 'Query',
  testField: Scalars['String'],
};

export type AdminLoginMutationVariables = {
  input: AdminLoginInput
};


export type AdminLoginMutation = (
  { __typename?: 'Mutation' }
  & { adminLogin: Maybe<(
    { __typename?: 'AdminLoginPayload' }
    & Pick<AdminLoginPayload, 'msg'>
  )> }
);

export type AdminLogoutMutationVariables = {
  input: AdminLogoutInput
};


export type AdminLogoutMutation = (
  { __typename?: 'Mutation' }
  & { adminLogout: Maybe<(
    { __typename?: 'AdminLogoutPayload' }
    & Pick<AdminLogoutPayload, 'msg'>
  )> }
);

import gql from 'graphql-tag';

export const AdminLogin = gql`
    mutation AdminLogin($input: AdminLoginInput!) {
  adminLogin(input: $input) {
    msg
  }
}
    `;
export const AdminLogout = gql`
    mutation AdminLogout($input: AdminLogoutInput!) {
  adminLogout(input: $input) {
    msg
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
    