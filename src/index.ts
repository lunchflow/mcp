/**
 * Lunch Flow MCP Server
 *
 * Provides access to Lunch Flow financial data through the Model Context Protocol.
 * To run your server, run "npm run dev"
 *
 * Get your API key from https://lunchflow.app/destinations
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { initClient } from '@ts-rest/core';
import { apiDestinationContract } from './contracts/api-destination-contract.js';

// Config schema that maps to smithery.yaml
export const configSchema = z.object({
  apiKey: z
    .string()
    .describe(
      'Your Lunch Flow API key from https://lunchflow.app/destinations'
    ),
  apiUrl: z
    .string()
    .default('https://lunchflow.app/api/v1')
    .describe('API endpoint URL')
    .optional()
});

export default function createServer({
  config
}: {
  config: z.infer<typeof configSchema>;
}) {
  const server = new McpServer({
    name: 'Lunch Flow',
    version: '0.1.0'
  });

  // Initialize ts-rest client with the API contract
  const apiClient = initClient(apiDestinationContract, {
    baseUrl: config.apiUrl ?? 'https://lunchflow.app/api/v1',
    baseHeaders: {
      'X-API-Key': config.apiKey
    }
  });

  // Tool 1: List all connected accounts
  server.registerTool(
    'lunchflow_list_accounts',
    {
      title: 'List Accounts',
      description:
        'Get a list of all connected accounts for the authenticated user. Returns account details including name, institution, provider, currency, and status.',
      inputSchema: {},
      annotations: {
        title: 'List Accounts',
        readOnlyHint: true
      }
    },
    async () => {
      try {
        const response = await apiClient.listAccounts();

        if (response.status !== 200) {
          return {
            content: [
              {
                type: 'text',
                text: `Error: ${response.status} - ${JSON.stringify(response.body)}`
              }
            ],
            isError: true
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(response.body, null, 2)
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing tool: ${error instanceof Error ? error.message : String(error)}`
            }
          ],
          isError: true
        };
      }
    }
  );

  // Tool 2: Get transactions for a specific account
  server.registerTool(
    'lunchflow_get_account_transactions',
    {
      title: 'Get Account Transactions',
      description:
        'Get transactions for a specific bank account. Returns transaction history including date, amount, description, merchant, and category information.',
      inputSchema: {
        accountId: z
          .number()
          .int()
          .positive()
          .describe(
            'The numeric ID of the bank account to get transactions for'
          )
      },
      annotations: {
        title: 'Get Account Transactions',
        readOnlyHint: true
      }
    },
    async ({ accountId }) => {
      try {
        const response = await apiClient.getAccountTransactions({
          params: { accountId: String(accountId) }
        });

        if (response.status === 404) {
          return {
            content: [
              {
                type: 'text',
                text: `Error: Account with ID ${accountId} not found`
              }
            ],
            isError: true
          };
        }

        if (response.status !== 200) {
          return {
            content: [
              {
                type: 'text',
                text: `Error: ${response.status} - ${JSON.stringify(response.body)}`
              }
            ],
            isError: true
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(response.body, null, 2)
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing tool: ${error instanceof Error ? error.message : String(error)}`
            }
          ],
          isError: true
        };
      }
    }
  );

  // Tool 3: Get balance for a specific account
  server.registerTool(
    'lunchflow_get_account_balance',
    {
      title: 'Get Account Balance',
      description:
        'Get the current balance for a specific bank account. Returns available and current balance information.',
      inputSchema: {
        accountId: z
          .number()
          .int()
          .positive()
          .describe('The numeric ID of the bank account to get the balance for')
      },
      annotations: {
        title: 'Get Account Balance',
        readOnlyHint: true
      }
    },
    async ({ accountId }) => {
      try {
        const response = await apiClient.getAccountBalance({
          params: { accountId: String(accountId) }
        });

        if (response.status === 404) {
          return {
            content: [
              {
                type: 'text',
                text: `Error: Account with ID ${accountId} not found`
              }
            ],
            isError: true
          };
        }

        if (response.status !== 200) {
          return {
            content: [
              {
                type: 'text',
                text: `Error: ${response.status} - ${JSON.stringify(response.body)}`
              }
            ],
            isError: true
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(response.body, null, 2)
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing tool: ${error instanceof Error ? error.message : String(error)}`
            }
          ],
          isError: true
        };
      }
    }
  );

  return server.server;
}
