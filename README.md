# Forcite Helmets POC

Deposit payment Proof of Concept for Forcite Helmets

- Uses a webhook to listen for new orders
  - New orders containing a pre-order item have status set to awaiting payment as they are not yet paid in full
  - Balance payment orders update the status of the related order to be awaiting fulfillment
- Has a web app that shows all awaiting payment orders
  - Shows the outstanding balance
  - Allows creation of a new checkout, all details pre-filled to send to the customer
