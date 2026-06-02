export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export interface ClientContext {
  environment: Environment;
}
