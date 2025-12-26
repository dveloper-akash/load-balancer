# Load Balancer (Node.js)

This project is a simple custom **HTTP load balancer** built using Node.js and Express.

It distributes incoming requests across multiple backend worker servers using a **round-robin algorithm**, performs **periodic health checks**, and exposes a **metrics endpoint** for monitoring.

The purpose of this project is to understand how load balancers work internally, including proxying, health checks, and request routing.

---

## Features

- Single entry point for client traffic (port 80)
- Multiple backend worker servers
- Round-robin request distribution
- Periodic health checks
- Automatic avoidance of unhealthy workers
- Metrics endpoint for observability

---

## Project Structure

```pgsql
load-balancer/
│
├── src/
│ ├── server.js # Load balancer entry point
│ ├── workers.js # Worker registry and round-robin logic
│ ├── health.js # Periodic health check logic
│ ├── proxy.js # Request proxying logic
│ │
│ └── controllers/
│ └── metricsController.js # Metrics collection and /metrics endpoint
│
├── worker-service/
│ └── worker-server.js # Backend worker server
│
├── package.json
└── README.md
```

---

## How It Works

1. A client sends an HTTP request to the load balancer.
2. The load balancer selects the next healthy worker using round-robin scheduling.
3. The request is proxied to the selected worker.
4. The worker processes the request and sends a response.
5. The load balancer streams the response back to the client.

Separately:

- Health checks run independently at a fixed interval.  
- Only health checks determine whether a worker is alive.  
- Individual request failures do not affect worker health.

---

## Prerequisites

- Node.js 18 or later
- npm

---

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

---

## Running the Project Locally

### 1. Start the worker servers

Open **three separate terminals** and run:

```bash
npm run worker1
npm run worker2
npm run worker3
```

Each worker runs the same code but listens on a different port.

---

### 2. Start the load balancer

in another terminal:

```bash
npm run start
```

The load balancer listens on port 80.

---

### 3. Test load balancing

Send requests to the load balancer:

```bash
curl http://localhost
curl http://localhost
curl http://localhost
```

You should see responses alternating between workers.

---

### 4. View metrics

```bash
curl http://localhost/metrics
```

Example output:

```nginx
requests_total 3
requests_failed 0
requests_active 0
worker_3001_alive 1
worker_3002_alive 1
worker_3003_alive 1
worker_3001_requests 1
worker_3002_requests 1
worker_3003_requests 1
```

---

## Health Checks

- Health checks run at a fixed interval
- They hit a dedicated `/health` endpoint on each worker
- HTTP response streams are properly consumed to avoid socket-related issues
- Health checks are the only authority for determining worker liveness

This approach prevents false positives and unstable worker state.

---

## Why This Project Exists

This project is intentionally built without external proxies in order to:

- Learn how HTTP proxying works internally
- Understand round-robin scheduling
- Explore health checks and failure handling
- Learn about streams, sockets, and connection reuse in Node.js
- See how real infrastructure problems appear even in small systems









