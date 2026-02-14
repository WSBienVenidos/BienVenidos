# Offer Help API Contract (Frontend Placeholder)

The frontend is wired in:
- `frontend/src/lib/offerHelpApi.ts`
- `frontend/src/app/offerhelp/page.tsx`

## Mode switch

- `NEXT_PUBLIC_OFFERHELP_MODE=mock` (default): stores messages in browser localStorage.
- `NEXT_PUBLIC_OFFERHELP_MODE=api`: calls backend endpoints below.

## Auth

- Cookie-based auth (`bv_token`).
- Requests use `credentials: include`.

## Endpoints

### Create helper message

- `POST /api/offer-help/messages`
- Request body:

```json
{
  "targetPostId": "p1",
  "targetPostTitle": "Necesito apoyo con alimentos esta semana",
  "targetCategory": "Alimentos",
  "helperName": "Maria",
  "helperContact": "801-555-0100",
  "message": "Puedo ayudarte con una despensa y transporte."
}
```

- Success response:

```json
{
  "id": "uuid",
  "targetPostId": "p1",
  "targetPostTitle": "Necesito apoyo con alimentos esta semana",
  "targetCategory": "Alimentos",
  "helperName": "Maria",
  "helperContact": "801-555-0100",
  "message": "Puedo ayudarte con una despensa y transporte.",
  "createdAt": "2026-02-14T12:00:00.000Z"
}
```

### List my helper messages

- `GET /api/offer-help/messages/mine`
- Success response:

```json
[
  {
    "id": "uuid",
    "targetPostId": "p1",
    "helperName": "Maria",
    "message": "Puedo ayudarte con una despensa y transporte.",
    "createdAt": "2026-02-14T12:00:00.000Z"
  }
]
```

### List messages for one Need Help post (for owner view)

- `GET /api/offer-help/messages/by-post/{postId}`
- Purpose: show incoming helper messages for a specific Need Help post on the `/users` page.
- Success response:

```json
[
  {
    "id": "uuid",
    "targetPostId": "post-uuid",
    "helperName": "Maria",
    "helperContact": "801-555-0100",
    "message": "Puedo ayudarte con una despensa y transporte.",
    "createdAt": "2026-02-14T12:00:00.000Z"
  }
]
```

## Error shape expected by frontend

```json
{ "error": "Unauthorized" }
```

```json
{ "error": "Validation failed", "fields": { "message": "required" } }
```
