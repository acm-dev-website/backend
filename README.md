# backend

# coding style

camal case typing:
    let myVar = 32;

const variables are captilized 
    const PORT = 3000;

Use semicolons after lines

arrow functions must have ()

# Migration to env var
If you're still using config.json, please replace it with .env or other environment config if running from a hosting platform.
1. Copy `.env.example` to `.env` (Do not rename)
2. Fill in the missing value. The example file will be prefilled with insensitive data. If any sensitive data is there, refer to our team chat channel to obtain it.
3. Run the software as usual.