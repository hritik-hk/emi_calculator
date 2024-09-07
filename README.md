# EMI Calculator API

This is a simple REST API for calculating EMI with a prepayment option.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Set up your PostgreSQL database and update the `.env` file with your database credentials.

   ```
   docker run --name my_postgres
   \ -e POSTGRES_PASSWORD=postgres
   \-e POSTGRES_DB=myroi
   \-p 5432:5432
   \-e POSTGRES_USER=admin
   postgres:latest

   ```

3. Create the database:

   ```
   createdb emi_calculator
   ```

4. Run the application:
   ```
   npm run dev
   ```

## API Endpoints

- POST `/api/calculate-emi`: Calculate EMI and store the result
- GET `/api/emis`: Get all EMI records
- GET `/api/emi/:id`: Get a specific EMI record by ID

## Example API Usage

Calculate EMI:

```
POST /api/calculate-emi
Content-Type: application/json

{
  "loanAmount": 500000,
  "interestRate": 8.5,
  "loanTenureMonths": 60,
  "prepayment": 20000
}
```

The API will return with the calculated EMI, prepayment details, and a month-wise breakdown of payments.
