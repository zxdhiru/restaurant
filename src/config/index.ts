import dotenv from "dotenv";

dotenv.config(); // Load environment variables

interface RateLimitConfig {
  windowMs: number;
  max: number;
}

interface SessionConfig {
  secret: string;
  resave: boolean;
  saveUninitialized: boolean;
  cookie: {
    maxAge: number;
  };
}

interface EmailConfig {
  service: string;
  user: string;
  pass: string;
  from: string;
  port: number;
  secure: boolean;
}

interface RedisConfig {
  host: string;
  port: number;
  password: string;
}

interface ElasticsearchConfig {
  node: string;
  auth: {
    username: string;
    password: string;
  };
}

interface Config {
  port: number;
  host: string;
  environment: string;
  apiVersion: string;
  apiUrl: string;
  baseUrl: string;
  dbUrl: string;
  jwtSecret: string;
  jwtExpiration: string;
  logLevel: string;
  corsOrigin: string;
  apiPrefix: string;
  rateLimit: RateLimitConfig;
  session: SessionConfig;
  email: EmailConfig;
  redis: RedisConfig;
  elasticsearch: ElasticsearchConfig;
  swagger: {
    enabled: boolean;
  };
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || "localhost",
  environment: process.env.NODE_ENV || "development",
  apiVersion: process.env.API_VERSION || "v1",
  apiUrl: process.env.API_URL || "http://localhost:3000",
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  dbUrl: process.env.DB_URL || "mongodb://localhost:27017/myapp",
  jwtSecret: process.env.JWT_SECRET || "your_jwt-secret",
  jwtExpiration: process.env.JWT_EXPIRATION || "1h",
  logLevel: process.env.LOG_LEVEL || "info",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  apiPrefix: process.env.API_PREFIX || "/api",
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: Number(process.env.RATE_LIMIT_MAX) || 100, // limit each IP
  },
  session: {
    secret: process.env.SESSION_SECRET || "your_session_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: Number(process.env.SESSION_COOKIE_MAX_AGE) || 24 * 60 * 60 * 1000, // 1 day
    },
  },
  email: {
    service: process.env.EMAIL_SERVICE || "gmail",
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
    from: process.env.EMAIL_FROM || "",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true", // Ensure boolean parsing
  },
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || "",
  },
  elasticsearch: {
    node: process.env.ELASTICSEARCH_NODE || "http://localhost:9200",
    auth: {
      username: process.env.ELASTICSEARCH_USERNAME || "",
      password: process.env.ELASTICSEARCH_PASSWORD || "",
    },
  },
  swagger: {
    enabled: process.env.SWAGGER_ENABLED === "true", // Convert string to boolean
  },
};

export default config;
