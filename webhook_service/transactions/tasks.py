import time
from celery import shared_task
from django.utils import timezone
from .models import Transaction

@shared_task(bind=True, max_retries=3)
def process_transaction(self, transaction_id):
    time.sleep(30)

    txn = Transaction.objects.get(transaction_id=transaction_id)
    txn.status = "PROCESSED"
    txn.processed_at = timezone.now()
    txn.save()
