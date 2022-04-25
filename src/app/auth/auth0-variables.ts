interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  audience: string;
  apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'SlGvYhOIEiI0AwzVagu4z9z0o5OvbrM4',
  domain: 'michal-burzynski.eu.auth0.com',
  callbackURL: 'http://localhost:4200/callback',
  audience: 'https://timesheet-api/',
  apiUrl: 'http://localhost:8080',
};

export const ACCESS_TOKEN = 'access_token';
export const ID_TOKEN = 'id_token';
export const EXPIRES_AT = 'expires_at';
export const SCOPES = 'scopes';
