# Next.js Dashboard Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Installation

To get started with the project locally, follow these steps:

1. Clone the repository:
```
   bash
   git clone https://github.com/chayoto777/my-nextjs-app.git
   ```

2. Navigate into the project directory:
```
   bash
   cd your-project
   ```

3. Install the dependencies:

```
   bash
   npm install

   # or

   yarn install

   # or

   pnpm install

   # or

   bun install
```

4. Run the development server:

```
   bash
   npm run dev

   # or

   yarn dev

   # or

   pnpm dev

   # or

   bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Using the App

The application is designed with mock login functionality. **To access the dashboard, you must use the following credentials:**

```
- **Username**: `admin`
- **Password**: `password123`
```

These are mock user credentials meant for testing and development purposes only.

Upon successful login, you'll be able to interact with the dashboard, which fetches user data from a mock API (JSONPlaceholder).

### Mock API

The user data is fetched from the public API provided by [JSONPlaceholder](https://jsonplaceholder.typicode.com/users). This is a free online REST API used for testing and prototyping.

- The API used in this project: `https://jsonplaceholder.typicode.com/users`
- The dashboard fetches mock user data, and you can search for users or view a paginated list of users (showing 3 users per page).

The users fetched from this API are used to demonstrate pagination, search functionality, and UI elements in the dashboard.

### Login Flow

The login functionality is basic and checks for the specific username and password (`admin` and `password123`). If you do not use these credentials, you will not be able to access the dashboard.

- If you log in successfully, the login state is stored in the browser's `localStorage`, allowing you to stay logged in until you manually log out.
- If you attempt to access the dashboard without logging in, you will be redirected back to the login page.

### How to Logout

- You can log out by clicking the "Logout" button in the top-right corner of the dashboard.
- Logging out will remove the login state from `localStorage` and redirect you back to the login page.
