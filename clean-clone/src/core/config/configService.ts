import dotenv from "dotenv";

dotenv.config();

export interface SystemConfig {
  nodeEnv: string;
  port: number;
  usePostgres: boolean;
  postgresConfig: {
    host?: string;
    port?: number;
    database?: string;
    user?: string;
    password?: string;
    ssl?: boolean;
  };
  geminiApiKey?: string;
  secureEncryptionKey: string;
}

export class ConfigService {
  private static instance: ConfigService;
  private config: SystemConfig;

  private constructor() {
    this.config = this.loadAndValidate();
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  private loadAndValidate(): SystemConfig {
    const nodeEnv = process.env.NODE_ENV || "development";
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    
    // Check if PG variables are configured
    const pgHost = process.env.SQL_HOST || process.env.PGHOST;
    const pgPort = process.env.SQL_PORT ? parseInt(process.env.SQL_PORT, 10) : 5432;
    const pgDb = process.env.SQL_DB_NAME || process.env.PGDATABASE;
    const pgUser = process.env.SQL_USER || process.env.PGUSER;
    const pgPassword = process.env.SQL_PASSWORD || process.env.PGPASSWORD;

    const usePostgres = !!(pgHost && pgDb);

    // Dynamic secure encryption key with a secure fallback
    const secureEncryptionKey = process.env.SECURE_ENCRYPTION_KEY || "JUMO_UEOS_DHP_DEFAULT_SECURE_KEY_2026";

    if (nodeEnv === "production" && secureEncryptionKey === "JUMO_UEOS_DHP_DEFAULT_SECURE_KEY_2026") {
      console.warn("[WARN] CONFIG: Running in production mode with a default SECURE_ENCRYPTION_KEY! Hardening required.");
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;

    return {
      nodeEnv,
      port,
      usePostgres,
      postgresConfig: {
        host: pgHost,
        port: pgPort,
        database: pgDb,
        user: pgUser,
        password: pgPassword,
        ssl: process.env.PGSSL === "true" || nodeEnv === "production"
      },
      geminiApiKey,
      secureEncryptionKey
    };
  }

  public get<K extends keyof SystemConfig>(key: K): SystemConfig[K] {
    return this.config[key];
  }

  public getFullConfig(): SystemConfig {
    return { ...this.config };
  }

  public isProduction(): boolean {
    return this.config.nodeEnv === "production";
  }

  public isDevelopment(): boolean {
    return this.config.nodeEnv === "development";
  }
}

export const configService = ConfigService.getInstance();
