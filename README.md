# URL Shortener

A URL shortener built with Node.js, TypeScript, Express, PostgreSQL, Prisma, and JWT authentication.

## Requirements

- Node.js 20.19+, 22.12+, or 24+
- Docker with Docker Compose

## Run locally

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Create your local environment file:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Edit `.env` and set `DB_USER`, `DB_PASSWORD`, and `DB_NAME`. Generate a secret for `JWT_SECRET`:

   ```powershell
   node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
   ```

   Copy the generated value into `.env`. Keep this file private; it is ignored by Git.

4. Start PostgreSQL:

   ```powershell
   docker compose up -d
   ```

5. Apply database migrations and generate the Prisma Client:

   ```powershell
   npx prisma migrate deploy
   npx prisma generate
   ```

6. Build and start the API:

   ```powershell
   npm run build
   npm start
   ```

The API listens on `http://localhost:3000` by default. Set `PORT` in `.env` to use another port.

## API routes

All request bodies use JSON.

### Register

`POST /auth/register`

```json
{
  "username": "alex",
  "email": "alex@example.com",
  "password": "a-secure-password"
}
```

Returns the user and a JWT access token.

### Log in

`POST /auth/login`

```json
{
  "email": "alex@example.com",
  "password": "a-secure-password"
}
```

Returns the user and a JWT access token.

### Create a short URL

`POST /urls` requires a valid access token in the `Authorization` header:

```http
Authorization: Bearer <token>
```

```json
{
  "originalUrl": "https://example.com/articles/hello"
}
```

Returns the short code and its relative path.

### Redirect

`GET /:shortCode` redirects to the original URL. This route is public and does not require a token.
