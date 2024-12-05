import { neon, neonConfig, Pool } from '@neondatabase/serverless';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-serverless';

import ws from 'ws';

let connectionString = process.env.DATABASE_URL ?? '';

// Configuring Neon for local development
if (process.env.NODE_ENV === 'development') {
  connectionString = 'postgres://postgres:postgres@db.localtest.me:5432/main';
  neonConfig.fetchEndpoint = (host) => {
    const [protocol, port] = host === 'db.localtest.me' ? ['http', 4444] : ['https', 443];
    return `${protocol}://${host}:${port}/sql`;
  };
  const connectionStringUrl = new URL(connectionString);
  neonConfig.useSecureWebSocket = connectionStringUrl.hostname !== 'db.localtest.me';
  neonConfig.wsProxy = (host) => (host === 'db.localtest.me' ? `${host}:4444/v1` : '');
  neonConfig.webSocketConstructor = ws;
}

//export const sql = neon(connectionString);

const pool = new Pool({ connectionString });

const db = drizzle(pool);

export { connectionString, db };
