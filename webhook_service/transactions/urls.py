from django.urls import path
from .views import health_check, webhook_transaction, transaction_status

urlpatterns = [
    path("", health_check),
    path("api/v1/webhooks/transactions", webhook_transaction),
    path("api/v1/transactions/<str:transaction_id>", transaction_status),
]
