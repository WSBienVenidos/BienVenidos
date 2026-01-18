# Bien Venidos Backend (Java)

This is a simple Spring Boot backend that stores user credentials (hashed) in Supabase Postgres.

## Framework
- Spring Boot 3 (Java 17)
- Spring Web, Spring Data JPA, Spring Security
- PostgreSQL driver
- JWT auth (Bearer token)

## Setup
1) Run the SQL to create the table:
   - `src/main/resources/db/create_tables.sql`
2) Create a `.env` (copy from `.env.example`) and fill in your Supabase database connection values.
3) Run:

```bash
mvn spring-boot:run
```

## Endpoints
- `GET  /api/health`
- `POST /api/auth/signup`  body: `{ "email": "...", "password": "..." }`
- `POST /api/auth/login`   body: `{ "email": "...", "password": "..." }`
- `GET  /api/auth/me`      header: `Authorization: Bearer <token>`
