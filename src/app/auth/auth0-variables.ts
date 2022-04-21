interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'SlGvYhOIEiI0AwzVagu4z9z0o5OvbrM4',
  domain: 'michal-burzynski.eu.auth0.com',
  callbackURL: 'http://localhost:4200/callback',
  apiUrl: 'https://timesheet-api/',
};
