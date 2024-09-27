

# Income-Expense Tracker

## Overview
This is an Income-Expense Tracker designed to help users manage their income and expenses. The application provides user authentication (register and login functionality) and a dashboard where users can add, view, and track their transactions.

### Key Features:
- User Registration and Login: Users can create an account, log in, and be redirected to their expense tracker dashboard.
- Expense Tracker Dashboard: After logging in, users can manage their expenses, view their balance, and track income/expenses.
- Backend Server: The application has a configured server connected to a database that stores users and their transactions.
- Database Structure: The database includes a `users` table and a `transactions` table.

## File Structure

### Frontend
1. Register
   - `register.html` – Registration page for new users.
   - `main.css` – Shared CSS for both register and login pages.
   - `register.js` – JavaScript functionality for handling registration.

2. Login
   - `login.html` – Login page for existing users.
   - `main.css` – Shared CSS for both login and register pages.
   - `login.js` – JavaScript functionality for handling login.

3. Income-Expense Tracker
   - `index.html` – The main page where users can view and manage their expenses after login.
   - `index.css` – CSS for styling the expense tracker interface.
   - `index.js` – JavaScript for managing the dynamic functionalities like adding transactions and updating the balance.

### Backend
- The server-side of the application is configured to handle requests and communicate with the database service. It manages user authentication and the CRUD operations for expenses.
- Routes: The necessary routes for user registration, login, and transaction management have been defined.
- Database(Mysql):
  - `users` table: Stores user information (e.g., username, password).
  - `transactions` table: Stores transaction details (e.g., amount, type, date, user ID).

## Installation

### Prerequisites:
- Node.js
- NPM (Node Package Manager)
- Database service (e.g., MySQL)

### Steps to Run the Project:
1. Clone the repository:
   ```bash
   
   ```

2. Navigate into the project directory:
   ```bash
   cd Income-Expense tracker
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```

4. Set up the database:
   - Configure your database and create the `users` and `transactions` tables as per the schema.
   - Update the database configuration in the backend to connect to your database service.

5. Run the server:
   ```bash
   npm start
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:5500
   ```
