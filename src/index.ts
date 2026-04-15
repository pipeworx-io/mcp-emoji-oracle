interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * emoji-oracle MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Consult the Emoji Oracle. Ask any question and receive a cryptic emoji prophecy 
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'emoji_oracle_consult',
    description: 'Consult the Emoji Oracle. Ask any question and receive a cryptic emoji prophecy with a vibe check. Optionally request an interpretation.',
    inputSchema: {
      type: 'object' as const,
      properties: {"question": {"type": "string", "description": "Your question for the Emoji Oracle"}, "interpret": {"type": "boolean", "description": "If true, the Oracle provides a mystical interpretation"}, "emoji_count": {"type": "number", "description": "Number of emojis (1-5, default 3)"}},
      required: ["question"],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('emoji-oracle API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'emoji_oracle_consult':
      return callApi('https://api.stupidapis.com/emoji-oracle/consult', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
