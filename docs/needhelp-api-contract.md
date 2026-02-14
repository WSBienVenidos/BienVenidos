# Need Help API Contract (Frontend Placeholder)

This document defines the frontend contract for saving "need help" posts.
The frontend is already wired to these placeholders via `frontend/src/lib/needHelpApi.ts`.

## Mode switch

- `NEXT_PUBLIC_NEEDHELP_MODE=mock` (default): no backend required, returns local mock response.
- `NEXT_PUBLIC_NEEDHELP_MODE=api`: calls backend endpoints below.

## Auth

- Cookie-based auth (`bv_token`) is expected.
- Frontend sends requests with `credentials: include`.

## Endpoints

### Create post

- `POST /api/need-help/posts`
- Request body:

```json
{
  "categories": ["alimentos", "vivienda"],
  "details": "Necesitamos apoyo con alimentos y vivienda",
  "age": "32",
  "familyMembers": "4",
  "familyDetails": [{ "age": "32", "sex": "femenino" }, { "age": "12", "sex": "masculino" }],
  "sex": "femenino",
  "nativeCountry": "Mexico",
  "speaksEnglish": "un_poco",
  "occupation": "Ama de casa",
  "city": "Salt Lake City",
  "arrivalDate": "2026-02-01"
}
```

- Success response (suggested):

```json
{
  "id": "uuid",
  "categories": ["alimentos", "vivienda"],
  "details": "Necesitamos apoyo con alimentos y vivienda",
  "age": "32",
  "familyMembers": "4",
  "familyDetails": [{ "age": "32", "sex": "femenino" }, { "age": "12", "sex": "masculino" }],
  "sex": "femenino",
  "nativeCountry": "Mexico",
  "speaksEnglish": "un_poco",
  "occupation": "Ama de casa",
  "city": "Salt Lake City",
  "arrivalDate": "2026-02-01",
  "createdAt": "2026-02-14T12:00:00.000Z"
}
```

### List my posts

- `GET /api/need-help/posts/mine`
- Success response:

```json
[
  {
    "id": "uuid",
    "categories": ["alimentos"],
    "details": "Necesito apoyo esta semana",
    "createdAt": "2026-02-14T12:00:00.000Z"
  }
]
```

## Error shape expected by frontend

The frontend reads `body.error` when available:

```json
{ "error": "Unauthorized" }
```

```json
{ "error": "Validation failed", "fields": { "details": "required" } }
```
