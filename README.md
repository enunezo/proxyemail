# Local SMTP OTP System

This project simulates a local SMTP server that receives emails with OTP codes, saves them to files, and provides a way to read the OTPs. It allows testing email workflows locally without using external email services.

---

## Features

- Runs a local SMTP server that accepts emails and saves them as text files.
- Generates random email addresses and OTPs for testing.
- Read saved emails to extract OTP codes.
- Use `ngrok` TCP tunnels to expose the local SMTP server to the internet for external testing.
- Send test emails using `swaks` or other SMTP clients.

---

## Requirements

- Node.js (v14+ recommended)
- npm
- ngrok (https://ngrok.com/)
- swaks (for sending test emails) — install via Homebrew on macOS: `brew install swaks`

---

## Setup

1. Install dependencies:
   ```bash
    npm install
2. Running the SMTP Server:
   Start the SMTP server on port 2525:
    ```bash
    node smtp.js

3. Generating and Sending Test Emails Locally
Run the script to send an email with a random email and OTP to your local SMTP server:
    ```bash
    node sendmail.js

It will listen for incoming emails and save them as .txt files in the correos/ directory.

  
4. Exposing the SMTP Server with ngrok
To test receiving emails from outside your local network:
Open a TCP tunnel to your SMTP server port:
    ```bash
    ngrok tcp 2525

5. Sending Emails Through the ngrok Tunnel
Use smtp-cli:
    ```bash
    brew install smtp-cli
    smtp-cli \
      --server 0.tcp.ngrok.io:13215 \
      --from prueba@demo.com \
      --to user_test@localhost \
      --subject "Testing OTP" \
      --body "Hello,\n\nYour OTP is: 456789\n\nThanks!"

Use swaks or any SMTP client to send emails through the ngrok tunnel:

    swaks --to user_test@localhost --from test@demo.com --server 0.tcp.ngrok.io --port 14839 --data "Subject: Test OTP\n\nHello, your OTP is: 123456"

7. Reading Saved OTP Emails
Run the OTP reader script to extract OTP codes from saved emails:

    ```bash
    node leerOtps.js

Gmail cannot send directly to your ngrok SMTP server due to port restrictions.

For production, consider proper email server setup with SPF/DKIM records and security measures.

