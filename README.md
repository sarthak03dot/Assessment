# WebHook Service
# Transaction Webhook Processing Service (Backend)

A **Django + Django REST Framework + Celery–based backend service** built as part of the **Fullstack Engineer Assessment**.

This service receives **transaction webhooks**, responds immediately with **202 Accepted**, and processes transactions asynchronously in the background using **Celery**, following real-world webhook handling best practices.

---

## Key Features

###  Webhook Handling

- Accepts transaction webhooks via REST API
- Responds immediately with **202 Accepted**
- Ensures response time under **500ms**

###  Asynchronous Background Processing

- Uses **Celery** for background transaction processing
- Simulates external API processing delay
- Updates transaction status after processing
###  Idempotency

- `transaction_id` is unique
- Duplicate webhook calls are safely ignored
- Prevents duplicate processing

###  Persistent Storage

- Uses **SQLite** for persistence
- Stores transaction details, status, and timestamps

###  Health Check

- Simple health endpoint to verify service availability

---

## 🛠 Tech Stack

| Technology            | Purpose               |
| --------------------- | --------------------- |
| Python                | Backend language      |
| Django                | Web framework         |
| Django REST Framework | API layer             |
| Celery                | Background processing |
| Redis                 | Celery message broker |
| SQLite                | Database              |
| Gunicorn / Uvicorn    | Application server    |

---

##  Project Structure

```txt
webhook_service/
├── transactions/
│   ├── migrations/
│   ├── admin.py
│   ├── apps.py
│   ├── models.py        # Transaction model
│   ├── serializers.py  # DRF serializers
│   ├── tasks.py        # Celery background tasks
│   ├── tests.py
│   ├── urls.py         # App-level routes
│   └── views.py        # API views
├── webhook_service/
│   ├── celery.py       # Celery configuration
│   ├── settings.py
│   ├── urls.py         # Project-level routes
│   ├── asgi.py
│   └── wsgi.py
├── db.sqlite3
├── manage.py
└── README.md
```

## Setup Instructions

### Clone Repository

    git clone https://github.com/sarthak03dot/Assessment/webhook_service.git
    cd webhook_service

### Create Virtual Environment

    python -m venv venv
    source venv/bin/activate      # Linux / Mac
    venv\Scripts\activate         # Windows

### Install Dependencies

    pip install -r requirements.txt

### Run Migrations

    python manage.py migrate

### Start Redis (Required for Celery)

```bash
#Terminal 1
    redis-server

### Start Celery Worker - Terminal 2

    celery -A webhook_service worker -l info

### Start Django Server - Terminal 3

    python manage.py runserver
```

- Server will start at:

```bash
    http://127.0.0.1:8000
```

## API Endpoints

### Health Check

    GET /

    {
    "status": "HEALTHY"
    }

## Receive Transaction Webhook

    POST /api/v1/webhooks/transactions/
    Request Body

    {
    "transaction_id": "txn_abc123",
    "source_account": "acc_user_1",
    "destination_account": "acc_merchant_1",
    "amount": 1500,
    "currency": "INR"
    }

    Response (202 Accepted)

    {
    "message": "Transaction accepted for processing"
    }

## Get Transaction Status

    GET /api/v1/transactions/{transaction_id}/

    {
    "transaction_id": "txn_abc123",
    "source_account": "acc_user_1",
    "destination_account": "acc_merchant_1",
    "amount": "1500.00",
    "currency": "INR",
    "status": "PROCESSED",
    "created_at": "2025-12-15T21:16:00Z",
    "processed_at": "2025-12-15T21:16:30Z"
    }

## Background Processing Flow

    Webhook request received

    Transaction stored with status PROCESSING

    Celery task triggered

    Task simulates processing delay

    Status updated to PROCESSED

## Idempotency Strategy

    transaction_id has a unique constraint

    Duplicate webhook payloads are detected

    Existing transactions are not reprocessed

## Testing

    Send Webhook

    curl -X POST http://127.0.0.1:8000/api/v1/webhooks/transactions/ \
    -H "Content-Type: application/json" \
    -d '{
    "transaction_id": "txn_test_001",
    "source_account": "acc_user_1",
    "destination_account": "acc_merchant_1",
    "amount": 500,
    "currency": "INR"
    }'

### Check Status

    curl http://127.0.0.1:8000/api/v1/transactions/txn_test_001/

## Deployment

- The backend can be deployed on:

-     Render

-     Railway

-     Fly.io

-     AWS EC2

-     Docker-based platforms

#### Thank You

```bash
    Thank you for reviewing this backend submission.
    Looking forward to your feedback!
```




# Voice Agent Analytics Dashboard (Frontend)

- A modern React + TypeScript analytics dashboard built as part of the Frontend Development Assessment.
The application simulates a SaaS-style call analytics platform where users can view, customize, and persist analytics data in a safe and user-friendly way.

- The UI and experience are inspired by modern analytics products such as superbryn.com.


**Live URL:**
```bash

    https://<your-project-name>.vercel.app
```

**GitHub Repository**

- Repository URL:
```bash
  https://github.com/sarthak03dot/Assessment
``` 


### Features


**Analytics Dashboard**

- Call Duration Analysis (Area Chart)

- Sad Path Analysis (Pie Chart)

- Clean and modern SaaS-style UI

- Email-Based Personalization

- Users must enter an email before modifying analytics

- Email is used to identify and persist user-specific data

- Editable Analytics

- Users can edit call duration values directly

- Real-time chart updates based on user input

**Overwrite Protection**

- Previously saved values are fetched from the database

- Users can review and edit existing values before overwriting

- Prevents accidental data loss

**Data Persistence**

- Supabase is used as a backend service

- Analytics data is stored against the user’s email

- Uses UPSERT logic to safely handle duplicates

** Tech Stack**
- Technology	Purpose
- React	UI Development
- TypeScript	Type Safety
- Tailwind CSS	Styling
- Recharts	Data Visualization
- Supabase	Database & Persistence
- Vite	Build Tool


### Vercel	Deployment
**Key Design Decisions**


- Email-based identification instead of full authentication to keep the app lightweight

- Editable overwrite modal to ensure transparency and better UX

- UPSERT strategy for reliable data updates without duplicates

- Component-based architecture for scalability and maintainability

### Project Structure
    src/
    ├── components/
    │   ├── charts/
    │   │   ├── CallDurationChart.tsx
    │   │   └── SadPathChart.tsx
    │   ├── EmailModal.tsx
    │   └── OverwriteConfirmModal.tsx
    ├── data/
    │   └── dummyData.ts
    ├── api/
    │   └── supabase.ts
    ├── pages/
    │   └── Dashboard.tsx
    ├── App.tsx
    └── main.tsx

### Setup Instructions
**Clone the Repository**
```bash
git clone https://github.com/sarthak03dot/Assessment.git
cd Assessment
```
**Install Dependencies**
```bash
npm install
```
**Configure Environment Variables**

- Create a .env file in the root directory:
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
``` 
**Run the Project Locally**
```bash
npm run dev
```

### Supabase Database Schema
create table chart_data (
  email text primary key,
  values jsonb not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);


Row Level Security (RLS) is disabled for simplicity in this assessment.

###  Deployment

- The project is deployed using Vercel:

- Connect GitHub repository to Vercel

- Add environment variables

### Deploy

    Assessment Requirements Mapping
    Requirement	Status
    ReactJS + TypeScript	
    Analytics charts	
    Dummy data	
    Editable chart values	
    Email-based persistence	
    Overwrite confirmation	
    Supabase integration	
    Hosted frontend	

🙌 Thank You

Thank you for reviewing this submission.
Looking forward to your feedback!