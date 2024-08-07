# Financial Management Dashboard

## Overview

This project is a Financial Management Dashboard consisting of two main widgets: the Summary Widget and the Invoices Widget. The Summary Widget tracks the customer's financial status by reading transaction data from the customer's bank account and displaying the total monetary amount. The Invoices Widget allows users to manage their invoices by creating new ones and editing existing ones. The invoice status (PAID or NOT PAID) is automatically determined based on matching bank transactions.

## Features

### Summary Widget:

Displays the total monetary amount in the bank account.
Shows the total in green if it exceeds a positive threshold, yellow if it is below the threshold but positive, and red if it is negative.
Displays the number of invoices created in the last 30 days.

### Invoices Widget:

Allows creation and editing of invoices with fields: client name, creation date, reference number, and amount.
Automatically determines and displays the invoice status (PAID or NOT PAID).
Integration:

Changes in the Invoices Widget automatically update the Summary Widget.
Responsive design ensures usability across different devices.

Install client and server packages

```
npm install
```

Concurrently start client and server.

```
npm start
```

Unit Testing Pseudo Code Found in testing-pseudo-code.txt
