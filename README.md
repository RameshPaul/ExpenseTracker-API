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
  -H 'content-type: multipart/form-data' \
  -F proof=@IMG_1577.jpg \
  -F gg_spreadsheetId=<google spreadsheet id> \
  -F gg_folderId=<google folder id> \
  -F type=TRANSPORT \
  -F 'recipient=Boutique truc' \
  -F 'description=Déjeuner' \
  -F amount=24.34 \
  -F 'currency=£' \
  -F date=2017-07-17
```

## Permissions

The Google Spreadsheet file and the Google Drive folder must be shared with the `GOOGLE_CLIENT_EMAIL` of your environment variables file.

## Environment variables

By default, the file `google-expense-tracker.env` of your home directory is used at the build step to inject environment variables.

It contains:

```
GOOGLE_PRIVATE_KEY=<your google private key base64 encoded>
GOOGLE_CLIENT_EMAIL=<your google client email>
```