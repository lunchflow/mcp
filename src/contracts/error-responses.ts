/**
 * Standardized API error response helpers
 * Ensures consistent error format across all API endpoints
 * These are the source of truth for all API error schemas
 */

import { z } from 'zod';

// Specific error response schemas - these are the source of truth
export const UnauthorizedErrorSchema = z.object({
  error: z.literal('Unauthorized'),
  message: z.literal('API key is required. Please provide x-api-key header.')
});

export const InvalidApiKeyErrorSchema = z.object({
  error: z.literal('Forbidden'),
  message: z.literal('Invalid API key.')
});

export const AccountNotFoundErrorSchema = z.object({
  error: z.literal('Not Found'),
  message: z.literal('Account not found.')
});

export const InternalServerErrorSchema = z.object({
  error: z.literal('Internal Server Error'),
  message: z.string() // Context-specific message
});

// Generic error response schema (fallback)
export const ErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string()
});

// Export TypeScript types
export type UnauthorizedError = z.infer<typeof UnauthorizedErrorSchema>;
export type InvalidApiKeyError = z.infer<typeof InvalidApiKeyErrorSchema>;
export type AccountNotFoundError = z.infer<typeof AccountNotFoundErrorSchema>;
export type InternalServerError = z.infer<typeof InternalServerErrorSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export function createErrorResponse(
  status: 401 | 403 | 404 | 500,
  error: string,
  message: string
) {
  return {
    status,
    body: {
      error,
      message
    }
  } as const;
}

// Pre-defined error responses that match the API contract schemas exactly
export const ApiErrors = {
  unauthorized: (): { status: 401; body: UnauthorizedError } => ({
    status: 401 as const,
    body: {
      error: 'Unauthorized' as const,
      message: 'API key is required. Please provide x-api-key header.' as const
    }
  }),

  invalidApiKey: (): { status: 403; body: InvalidApiKeyError } => ({
    status: 403 as const,
    body: {
      error: 'Forbidden' as const,
      message: 'Invalid API key.' as const
    }
  }),

  accountNotFound: (): { status: 404; body: AccountNotFoundError } => ({
    status: 404 as const,
    body: {
      error: 'Not Found' as const,
      message: 'Account not found.' as const
    }
  }),

  internalError: (
    context: string
  ): { status: 500; body: InternalServerError } => ({
    status: 500 as const,
    body: {
      error: 'Internal Server Error' as const,
      message: `An unexpected error occurred while ${context}.`
    }
  })
};

// Validation helpers to ensure runtime responses match contract schemas
export const validateErrorResponse = {
  unauthorized: (data: unknown) => UnauthorizedErrorSchema.parse(data),
  invalidApiKey: (data: unknown) => InvalidApiKeyErrorSchema.parse(data),
  accountNotFound: (data: unknown) => AccountNotFoundErrorSchema.parse(data),
  internalError: (data: unknown) => InternalServerErrorSchema.parse(data)
};
