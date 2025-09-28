Summary
---------------------------------------------------------

- Purpose: A small React single-page app for managing rent/tenant records and finances (rent entries, electricity bills, tenant lists, financial reports).

- Tech stack:
  - React (CRA) + React Router
  - Material UI (MUI) for UI
  - @tanstack/react-query for data fetching & caching
  - axios for API calls
  - react-hook-form + yup for form validation
  - notistack for notifications
  - moment for date helpers
  - LocalStorage used for simple client persistence

- Project layout (high level):
  - public/ — static assets and HTML template
  - src/
    - Rent/ — domain code: pages (Dashboard, Home, RentDetails, RentForm) and small components (FloorCard, FinancialReport, GetAmount, UpdateValues)
    - shared/ — reusable UI and infra:
      - api/client.js — axios instance with auth interceptor
      - customDialog/ — global modal helper
      - context/auth-context.js & hooks/useAuth.js — simple auth state backed to localStorage
      - FormElements and UiElements — input and dialog components
      - navigation/routes & appRoutes — route definitions
      - utils/Storage.js — localStorage wrapper
      - theme/globalTheme.js — MUI theme
    - query-hooks/ — React Query hooks that call service functions
    - Rent/service/index.js — functions that call backend endpoints via axios client

- Auth & persistence:
  - Google OAuth / demo-user flows referenced (login API at /google and /demo-user).
  - Auth token saved in localStorage (StorageKeys.USER_INFO); axios adds Bearer token to requests via interceptor.

- Data fetching & API:
  - Uses React Query hooks for fetching tenants, tenant form data, amounts by month/year, paginated rent entries (useInfiniteQuery), and financial totals.
  - Service layer maps to endpoints like /all-flats, /tenants/formData, /amount, /add-rent-entry, /recent-entries, /update-summary.
  - Base API URL is read from REACT_APP_API_URL.

- Notable UX features:
  - Global custom dialog system (showDialog / hideDialog).
  - Financial report modal from Dashboard.
  - Loading/notification handling via MUI LoadingButton and notistack.
  - Error boundary with SomethingWentWrong fallback.

- How to run (from repo):
  - Provide .env with REACT_APP_API_URL and REACT_APP_GOOGLE_CLIENT_ID
  - npm install
  - npm start (scripts defined in package.json)
