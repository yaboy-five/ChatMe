# ChatMe
## Messaging App

A basic real-time messaging app using Node.js, Express, Socket.io, and SQL Server for storage.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create the database**
   - Open SQL Server Management Studio (SSMS) or Azure Data Studio.
   - Run the script in `schema.sql` to create the `MessagingApp` database and `Messages` table.

3. **Configure environment variables**
   - Edit `.env` with your SQL Server credentials:
     ```
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_SERVER=localhost
     DB_NAME=MessagingApp
     DB_PORT=1433
     PORT=3000
     ```

4. **Run the app**
   ```bash
   npm start
   ```

5. **Open in browser**
   - Go to `http://localhost:3000`
   - Open it in multiple tabs/browsers to test real-time messaging.

## Notes

- `trustServerCertificate: true` in `db.js` is for local development only — remove it in production and use proper certificates.
- This is a bare-bones broadcast chat (everyone sees every message) with no authentication or rooms. Good next steps if you want to extend it: usernames, private rooms/channels, message timestamps in the UI, and login/auth.
