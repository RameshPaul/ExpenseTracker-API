# ExpenseTracker API

## Installation

```
yarn install
```

## Build and run

```
yarn build && yarn start
```

## Motivations

During my internship abroad, I must write down all my expenses for reimbursement purposes.
Each expense must be associated with proof (usually the invoice).

This API allows me to automate this process of writing each expense by:

- Upload the proof (file) on Google Drive
- Create a shareable link for this file
- Add a row for the expense (with all information) on a Google Spreadsheet

with only one API call.

## Example

```
curl -X POST \
  http://localhost:8080/expense \
  -H 'content-type: application/json' \
  -d '{
    "gg_spreadsheetId": "<google spreadsheet id>",
    "gg_folderId": "<google folder id>",
    "type": "EATING",
    "recipient": "Pret A Manger",
    "description": "Déjeuner",
    "amount": "8.32",
    "currency": "£",
    "date": "2017/07/16",
    "proof": "R0lGODlhPQBEAPeoAJos..."
  }'
```

## Permissions

The Google Spreadsheet file and the Google Drive folder must be shared with the `GOOGLE_CLIENT_EMAIL` of your environment variables file.

## Environment variables

By default, the file `google-expense-tracker.env` of your home directory is used at the build step to inject environment variables.

It contains:

```
GOOGLE_PRIVATE_KEY=<your google private key>
GOOGLE_CLIENT_EMAIL=<your google client email>
```