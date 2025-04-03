## Events monitoring dashboard with a real-time simulator. 
This is aimed at reducing loads on databases by providing live healthcheck updates of the different systems in an architecture.

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
![serverMonitoringDashboard](https://github.com/user-attachments/assets/27fa0a64-f28c-4207-82c2-ec226a61a3b6)


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
