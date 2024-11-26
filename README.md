# event-monitoring-dashboard

## An event monitoring dashboard POC aimed at reducing loads on DBs and providing live updates with a frontend

## How to setup:

- clone this repository
- create a free cluster on mongodb atlas
- cd into `backend` and create a `.env` file with the following lines:
  - `PORT=4000`
  - `MONGODB_URI=mongodb+srv://<yourMongoDbClusterUsername>:<yourMongoDbClusterPassword>@<yourMongoDbClusterName>.u2mnt.mongodb.net/?retryWrites=true&w=majority&appName=system-monitor`
  - `CORS_ORIGIN=http://localhost:3000`
- cd to `backend` and run `npm run dev` - this will run on post
- cd into `frontend` and run `npm start`

## Preview of this dashboard

## Folder structure

├── /frontend # React application (management console)
├── /backend # Node.js services
│ ├── /api # API service
│ ├── /processor # Event processing service
│ └── /simulator # Event simulator (for testing)

## What this app is:

1. Frontend (React Management Console):

- Create-react-app with TypeScript
- Tailwind CSS for styling
- Socket.io-client for WebSocket
- Simple dashboard with:
  - Real-time event list
  - Status indicators
  - Basic metrics display

2. Backend (Node):

- Express server with TypeScript
- MongoDB (using Mongoose)
- Socket.io for WebSocket
- Basic API endpoints:
  - GET /events
  - GET /status
  - POST /events (for simulator)

3. Event Collection Simulator:

- Simple event generator service
- Basic event types:
  - API calls
  - System status
  - Performance metrics
