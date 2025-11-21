# Lunch Flow MCP Server

> Connect your bank accounts to Claude and other AI assistants. Access financial data from **20,000+ banks across 40+ countries** through natural language.

Query balances, transactions, and spending patterns without leaving your conversation - powered by your [Lunch Flow](https://lunchflow.app) account.

Built with the [Model Context Protocol](https://modelcontextprotocol.io) and [Smithery SDK](https://smithery.ai/docs)

## Features

This MCP server provides three tools for accessing your financial data:

- **lunchflow_list_accounts** - Get all your connected bank accounts
- **lunchflow_get_account_transactions** - Get transaction history for a specific account
- **lunchflow_get_account_balance** - Get current balance for a specific account

Note: these match [Lunch Flow's API](https://docs.lunchflow.app/api-reference).

## Quick Start

### Prerequisites

1. **Lunch Flow account**: Sign up at [lunchflow.app](https://lunchflow.app)
2. **Connect your banks**: Link your accounts through Lunch Flow
3. **API key**: Get yours at [lunchflow.app/destinations](https://lunchflow.app/destinations)

### Installation

Install via Smithery:
```bash
smithery install @lunchflow/mcp
```

Or clone and run locally:
```bash
git clone https://github.com/lunchflow/mcp.git
cd mcp
npm install
npm run dev
```

## Configuration

### For Smithery Deployment

Add to `smithery.yaml`:
```yaml
runtime: typescript
```

## Usage Examples

Once configured, you can ask Claude questions like:

- "What are my connected bank accounts?"
- "Show me my transactions from last week"
- "What's my current checking account balance?"
- "How much did I spend on groceries this month?"
- "Compare my spending between Chase and Wells Fargo"

Claude will use the MCP tools to fetch real-time data from your Lunch Flow account.

## Development

### Building

```bash
npm run build
```

### Local Testing

```bash
npm run dev
```

The development server will start and you can test the MCP tools locally.

## Bank Coverage

Lunch Flow supports 20,000+ banks across 40+ countries.

[View full coverage →](https://lunchflow.app/coverage)

## Security & Privacy

- ✅ Read-only access to your financial data
- ✅ API keys are securely encrypted
- ✅ No credentials stored in the MCP server
- ✅ All data fetched from your Lunch Flow account
- ✅ Open source for transparency

[Learn more about security →](https://docs.lunchflow.app/security)

## Support

- **Discord**: [Join our community](https://discord.gg/TJn5mMV4jZ)
- **Email**: [hello@lunchflow.app](mailto:hello@lunchflow.app)

## License

MIT License - see [LICENSE](LICENSE) for details

## Learn More

- [Lunch Flow](https://lunchflow.app) - Connect your bank accounts
- [Smithery](https://smithery.ai) - MCP server hosting platform
- [Model Context Protocol](https://modelcontextprotocol.io) - MCP specification
- [API Documentation](https://docs.lunchflow.app/api-reference) - Lunch Flow API docs
