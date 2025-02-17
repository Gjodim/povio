# povio
Povio Assignment - Automated QA

## Prerequisites
- Node.js (version 16 or higher)
- npm (usually comes with Node.js)
- Playwright (will be installed via `npm install`)

## Local Setup
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file in the root directory.
4. Copy the contents of `.env.example` into `.env` and replace the placeholder values with your actual credentials.
5. Run the project locally.

## Environment Variables
#### (see file .env.example)
The following environment variables are required in the `.env` file:

- `SIGNIN_USERNAME`: Your sign-in username.
- `SIGNIN_PASSWORD`: Your sign-in password.


Example `.env` file:
```env
SIGNIN_USERNAME=your_username@example.com
SIGNIN_PASSWORD=your_password
```

## Running tests (Located at repository root)
1. Run tests in UI mode: `npx playwright test --ui`.
2. Run all tests using terminal: `npx playwright test`.
- report open in browser after fail on each run.
- for successful run report, execute in terminal: `npx playwright show-report`.
3. Run a folder of tests: `npx playwright test ${folderName}`.
- example: `npx playwright test signed-in`.
4. Run a single test: `npx playwright test tests/${nameOfTest}`.
- example `npx playwright test tests/home-page-spec.ts`.
5. Run all on chrome (logged in tests excluded): `npm run test chrome`.
6. Run all on firefox (logged in tests excluded): `npm run test firefox`.
7. Run all on safari (logged in tests excluded): `npm run test safari`.
8. Run logged in tests (chrome): `npm run test test:loggedIn:chrome`.
9. Run tests in headed mode `npx playwright test --headed`.

## Running Tests in CI/CD
To run tests in a CI/CD pipeline, add the following secrets to your GitHub repository:

```markdown
   - `SIGNIN_USERNAME`
   - `SIGNIN_PASSWORD`
```

### Artifacts
Artifacts are available in CI/CD under each run.