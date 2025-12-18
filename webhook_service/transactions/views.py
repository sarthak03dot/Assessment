from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils import timezone

from .models import Transaction
from .serializers import TransactionSerializer
from .tasks import process_transaction



@api_view(["GET"])
def health_check(request):
    return Response({"status": "HEALTHY", "current_time": timezone.now()})


# @api_view(["POST"])
# def webhook_transaction(request):
#     serializer = TransactionSerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)

#     txn, created = Transaction.objects.get_or_create(
#         transaction_id=serializer.validated_data["transaction_id"],
#         defaults=serializer.validated_data,
#     )

#     if created:
#         process_transaction.delay(txn.transaction_id)

#     return Response(status=202)


@api_view(["POST"])
def webhook_transaction(request):
    serializer = TransactionSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    txn, created = Transaction.objects.get_or_create(
        transaction_id=serializer.validated_data["transaction_id"],
        defaults=serializer.validated_data,
    )

    if created:
        process_transaction.delay(txn.transaction_id)
        message = "Transaction received and processing started"
    else:
        message = "Transaction already exists"

    return Response(
        {
            "success": True,
            "transaction_id": txn.transaction_id,
            "created": created,
            "message": message,
        },
        status=202,
    )
    
    

@api_view(["GET"])
def transaction_status(request, transaction_id):
    txn = get_object_or_404(Transaction, transaction_id=transaction_id)
    return Response(TransactionSerializer(txn).data)
