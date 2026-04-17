# MSK Suggestions Board - Vitrue Coding Task

## Running the Application

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm

### 1) Install dependencies

From the repository root:

```bash
cd server && npm install
cd ../client && npm install
```

### 2) Start the backend API

From `server/`:

```bash
npm run dev
```

Backend runs on `http://localhost:3000`.

### 3) Start the frontend

From `client/` (in a separate terminal):

```bash
npm run dev
```

Vite will print the local URL (typically `http://localhost:5173`).

### 4) Run backend tests

From `server/`:

```bash
npm test
```

## Assumptions

- The board is used in an admin-only internal context, so authentication and authorization are out of scope.
- Upstream source data is assumed to be valid and consistent enough for display without adding a client-side normalization layer.
- The status enum is fixed to the workflow values provided by the task data and UI.
- Suggestion statuses are intentionally reversible, so updates can move forward or backward between valid enum values.
- `overdue` is treated as an explicit status value, not a value auto-derived from date logic.
- Client-side filtering and sorting are sufficient for the current dataset size and expected usage.

## Architectural Decisions

- Built a lightweight Express backend to provide a clear API boundary between frontend and data operations.
- Used an in-memory data store (seeded from JSON) for task scope, keeping persistence concerns out of this implementation.
- Grouped suggestions under each employee in the response shape and UI, reflecting an employee-centric admin review flow.
- Proxied `/api` from Vite to Express during development to avoid hardcoded backend origins in frontend API calls.
- Centralized frontend API requests in a service module (`client/src/services/api.js`) to isolate network concerns from components.
- Used computed properties in `App.vue` for filtering, sorting, summary metrics, and empty-state logic to derive view state from a single source of truth.
- Split component styling into focused CSS modules under `client/src/styles/components` to improve maintainability over a single monolithic stylesheet.
- Tracked status update errors per suggestion ID so failures remain local to the affected row instead of blocking the full interface.

## Future Improvements

- Add schema validation at API boundaries (e.g. Zod/Joi) for request payloads and route params, including UUID validation for suggestion IDs.
- Validate seed/data records at startup and enforce a consistent error response shape (error codes plus field-level validation details).
- Add authentication/authorization so status changes are restricted to appropriate admin roles.
- Replace in-memory storage with a persistent database (and add migrations) so updates survive restarts.
- Add server-side filtering/sorting/pagination for larger datasets and lower payload sizes.
- Add observability basics (request logging, error monitoring, health checks) for easier debugging in real deployments.
- Add additional testing, particularly adding frontend test, tests for GET /api/employees and end to end flow validation.
- Containerize and add CI steps (lint/test/build) for consistent local/dev/prod workflows.
- Surface overdue suggestions more prominently, potentially with 
automated status transitions based on date logic.
- Add a suggestion creation flow so admins can log recommendations 
directly rather than only via VIDA.