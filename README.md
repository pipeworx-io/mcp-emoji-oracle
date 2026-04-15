# mcp-emoji-oracle

emoji-oracle MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `emoji_oracle_consult` | Consult the Emoji Oracle. Ask any question and receive a cryptic emoji prophecy with a vibe check. Optionally request an interpretation. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "emoji-oracle": {
      "url": "https://gateway.pipeworx.io/emoji-oracle/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use emoji-oracle
```

## License

MIT
