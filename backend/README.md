# Student Auth Backend

Backend built specifically to match the fields in `signup.jsx` and `signin.jsx`.

## Setup

```bash
npm install
cp .env.example .env
# fill in DATABASE_URL, SECRETPIN, and CLIENT_ORIGINS in .env
npm run dev
```

## Endpoints

Base URL: `/api/v1`

| Method | Path       | Auth       | Body |
|--------|-----------|------------|------|
| POST   | `/register` | Public   | `firstName, lastName, email, username, password` required. `middleName, address, phone, className, dob, gender` optional. `avatar` optional file (multipart/form-data). |
| POST   | `/login`    | Public   | `username, password` |
| POST   | `/logout`   | Public   | — |
| GET    | `/users`    | Protected | — (returns all students) |
| GET    | `/me`       | Protected | — (returns the logged-in user's profile) |

`GET /home` also exists at the root (`{"message": "welcome home"}`) as a health check.

## Frontend integration notes

### Signup (`signup.jsx`)

Because the form includes a file input for the avatar, the request must be sent as
`multipart/form-data` using `FormData`, **not** `JSON.stringify`. Example:

```js
const handleSubmit = async (event) => {
  event.preventDefault();

  const payload = new FormData();
  payload.append("firstName", formData.firstName);
  payload.append("middleName", formData.middleName);
  payload.append("lastName", formData.lastName);
  payload.append("email", formData.email);
  payload.append("address", formData.address);
  payload.append("phone", formData.phone);
  payload.append("className", formData.className);
  payload.append("dob", formData.dob);
  payload.append("gender", formData.gender);
  payload.append("username", formData.username);
  payload.append("password", formData.password);

  const avatarFile = document.getElementById("avatar").files[0];
  if (avatarFile) payload.append("avatar", avatarFile);

  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    body: payload, // do NOT set Content-Type manually; the browser sets the multipart boundary
  });

  const data = await res.json();
  // handle data.message / data.student
};
```

### Signin (`signin.jsx`)

```js
const handleSubmit = async (event) => {
  event.preventDefault();

  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // required to receive the httpOnly auth cookie
    body: JSON.stringify(formData), // { username, password }
  });

  const data = await res.json();
  // handle data.message / data.user / data.token
};
```

## Email on registration

When a student registers successfully, a "Registration Successful" email is
automatically sent to the email address they signed up with. This is handled
by `src/middlewares/email.js` using `nodemailer`, and is triggered from
`registerStudent` in the controller.

**If the email fails to send, registration still succeeds** — the error is
logged to the console but never blocks the signup response, so a misconfigured
SMTP setup can't break your signup flow.

### Setting up Gmail SMTP (easiest option for testing)

1. Use a Gmail account (or create one for this project).
2. Enable 2-Step Verification on that account: https://myaccount.google.com/security
3. Generate an **App Password**: https://myaccount.google.com/apppasswords
   (choose "Mail" as the app) — this gives you a 16-character password.
4. In your `.env`, set:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=the_16_character_app_password
   SMTP_FROM=your_email@gmail.com
   ```

   **Do not use your normal Gmail password** — Google blocks that. It must be an App Password.

### Using a different email provider

Any SMTP provider works (SendGrid, Mailgun, Outlook, your own mail server, etc.) —
just set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` to match that
provider's SMTP credentials. No code changes needed.

## Notes

- Passwords are hashed with bcrypt before saving; never stored in plain text.
- Auth uses an httpOnly cookie named `token`. In production (`NODE_ENV=production`),
  the cookie is set with `secure: true` and `sameSite: "none"` so it works across
  your Vercel frontend and Render backend (different domains). Locally it uses
  `sameSite: "lax"` since `secure` cookies require HTTPS.
- `CLIENT_ORIGINS` in `.env` must exactly match your deployed frontend URL(s),
  comma-separated, no trailing slash.
