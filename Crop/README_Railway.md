# Deploying Crop (Node app) to Railway

This project is a Node.js app. These are quick steps to deploy it to Railway and make it work smoothly.

1. Prepare the repo
   - Commit your changes (including `serr.js`, `package.json`, and `Procfile`).

2. Add sensitive values on Railway
   - Open your Railway project -> Variables and add:
     - `ROBOFLOW_API_KEY` = <your_roboflow_api_key>
   - You do NOT need to add `PORT` — Railway provides it automatically.

3. Start command
   - Railway will run `npm start` by default. `package.json` already has:
     - "start": "node serr.js"
   - We also included a `Procfile` (`web: node serr.js`) to be explicit.

4. Node engine version
   - `package.json` includes an `engines.node` entry to request Node 18 on Railway.

5. Local testing
   - Create a local `.env` from `.env.example` and fill `ROBOFLOW_API_KEY`.
   - Run locally:

```powershell
npm install
node serr.js
```

   - Or (recommended):

```powershell
npm install
npm start
```

   - Visit `http://localhost:5000/` to see the health endpoint and `POST /analyze` for the API.

6. Notes & security
   - The Roboflow API key was referenced in the source as a fallback but you should set `ROBOFLOW_API_KEY` as an env var in Railway for security.
   - If you want to add build steps or a different start command, edit `package.json` scripts.

If you'd like, I can also:
- Add a GitHub Actions workflow that auto-deploys to Railway on push.
- Create a small health-check endpoint test and a minimal unit test.
