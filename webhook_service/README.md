# 🔁 Transaction Webhook Processing Service (Backend)

A **Django + Django REST Framework + Celery–based backend service** built as part of the **Fullstack Engineer Assessment**.

This service receives **transaction webhooks**, responds immediately with **202 Accepted**, and processes transactions asynchronously in the background using **Celery**, following real-world webhook handling best practices.

---

## ✨ Key Features

### 🔔 Webhook Handling

- Accepts transaction webhooks via REST API
- Responds immediately with **202 Accepted**
- Ensures response time under **500ms**

### ⏳ Asynchronous Background Processing

- Uses **Celery** for background transaction processing
- Simulates external API processing delay
- Updates transaction status after processing

### ♻️ Idempotency

- `transaction_id` is unique
- Duplicate webhook calls are safely ignored
- Prevents duplicate processing

### 🗄 Persistent Storage

- Uses **SQLite** for persistence
- Stores transaction details, status, and timestamps

### 🩺 Health Check

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

## 📂 Project Structure

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
