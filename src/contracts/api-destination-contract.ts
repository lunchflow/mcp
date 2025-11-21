import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  UnauthorizedErrorSchema,
  InvalidApiKeyErrorSchema,
  AccountNotFoundErrorSchema,
  InternalServerErrorSchema
} from './error-responses';

const c = initContract();

// Schemas for API responses
const Account = z.object({
  id: z.number(),
  name: z.string(),
  institution_name: z.string(),
  institution_logo: z.string(),
  provider: z.enum([
    'gocardless',
    'quiltt',
    'finverse',
    'pluggy',
    'lunchmoney',
    'simplefin',
    'stripe',
    'akahu'
  ]),
  currency: z.string().optional(),
  status: z.enum(['ACTIVE', 'DISCONNECTED', 'ERROR']).optional()
});

const AccountsResponse = z.object({
  accounts: z.array(Account)
});

const Transaction = z.object({
  id: z.string(),
  account_id: z.number(),
  date: z.string(),
  amount: z.number(),
  currency: z.string(),
  description: z.string(),
  merchant_name: z.string().optional(),
  category: z.string().optional(),
  pending: z.boolean().optional()
});

const TransactionsResponse = z.object({
  transactions: z.array(Transaction)
});

const Balance = z.object({
  available: z.number(),
  current: z.number(),
  currency: z.string()
});

const BalancesResponse = z.object({
  balance: Balance
});

export const apiDestinationContract = c.router(
  {
    listAccounts: {
      method: 'GET',
      path: '/accounts',
      responses: {
        200: AccountsResponse
      },
      summary: 'List accounts',
      description:
        'Returns a list of all connected accounts for the authenticated user'
    },
    getAccountTransactions: {
      method: 'GET',
      path: '/accounts/:accountId/transactions',
      pathParams: z.object({
        accountId: z.string().transform(Number)
      }),
      responses: {
        200: TransactionsResponse,
        404: AccountNotFoundErrorSchema
      },
      summary: 'Get account transactions',
      description: 'Returns transactions for the specified account'
    },
    getAccountBalance: {
      method: 'GET',
      path: '/accounts/:accountId/balance',
      pathParams: z.object({
        accountId: z.string().transform(Number)
      }),
      responses: {
        200: BalancesResponse,
        404: AccountNotFoundErrorSchema
      },
      summary: 'Get account balance',
      description: 'Returns the balance for the specified account'
    }
  },
  {
    commonResponses: {
      401: UnauthorizedErrorSchema,
      403: InvalidApiKeyErrorSchema,
      500: InternalServerErrorSchema
    }
  }
);

// Export types for convenience
export type Account = z.infer<typeof Account>;
export type AccountsResponse = z.infer<typeof AccountsResponse>;
export type Transaction = z.infer<typeof Transaction>;
export type TransactionsResponse = z.infer<typeof TransactionsResponse>;
export type Balance = z.infer<typeof Balance>;
export type BalancesResponse = z.infer<typeof BalancesResponse>;
export type ApiDestinationContract = typeof apiDestinationContract;
