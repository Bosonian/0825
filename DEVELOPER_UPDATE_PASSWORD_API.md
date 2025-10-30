# Password Authentication API - Developer Update

**Date:** October 30, 2025
**Status:** ✅ Deployed and Tested
**Security Fix:** Critical - Password removed from frontend code

---

## Summary

Your security concern has been addressed. The research password has been removed from the frontend code and all authentication now happens through a secure backend API.

### What Changed

**Before (Security Issue):**
- Password `'Neuro25'` was hardcoded in frontend code
- Anyone could view source and see the password
- Local password verification in development mode

**After (Secure):**
- ✅ No password in frontend code
- ✅ All verification happens on backend
- ✅ Secure password hashing with salt
- ✅ Rate limiting (5 attempts per IP per 5 minutes)
- ✅ Session token generation (4-hour sessions)

---

## API Specification

### Endpoint
```
POST https://europe-west3-igfap-452720.cloudfunctions.net/authenticate-research-access
```

### Request Format
```json
{
  "password": "user_input_password"
}
```

**Headers:**
```
Content-Type: application/json
```

### Success Response (200 OK)
```json
{
  "success": true,
  "session_token": "7345910a6f56adedccc6466232764d0b76beb3ac088111a8d2a2c68d198b7c50",
  "expires_at": "2025-10-30T17:46:15.570653Z",
  "message": "Authentication successful",
  "session_duration": 14400
}
```

### Error Response (401 Unauthorized)
```json
{
  "success": false,
  "message": "Invalid password",
  "rate_limit_remaining": 4
}
```

### Rate Limit Response (429 Too Many Requests)
```json
{
  "success": false,
  "message": "Too many attempts. Please try again later.",
  "rate_limit_remaining": 0
}
```

---

## Security Features

1. **Backend Password Verification**
   - Password never stored in frontend
   - Secure SHA-256 hashing with salt
   - HMAC comparison prevents timing attacks

2. **Rate Limiting**
   - Maximum 5 attempts per IP address
   - 5-minute window (300 seconds)
   - Automatic lockout after exceeded attempts

3. **Session Management**
   - Secure session token generation
   - 4-hour session duration (14400 seconds)
   - Token format: 64-character hexadecimal

4. **CORS Protection**
   - Allowed origins:
     - `https://igfap.eu` (production)
     - `https://bosonian.github.io` (GitHub Pages)
     - `http://localhost:5173` (development)
     - `http://localhost:4173` (preview)
     - `http://localhost:3000` (testing)

---

## Testing

### Test with cURL

**Correct Password:**
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"password": "Neuro25"}' \
  https://europe-west3-igfap-452720.cloudfunctions.net/authenticate-research-access
```

**Wrong Password:**
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"password": "WrongPassword"}' \
  https://europe-west3-igfap-452720.cloudfunctions.net/authenticate-research-access
```

### Test in Application

1. Open: http://localhost:5173/0825/
2. Activate research mode (Shift+R or click activation area)
3. Enter password: `Neuro25`
4. Check browser DevTools → Network tab for API call
5. Verify authentication succeeds and app navigates to triage

**Verified Working:** ✅ Tested on October 30, 2025

---

## Integration Notes

### Frontend Implementation

The frontend now always calls the backend API:

```javascript
const response = await fetch(API_URLS.AUTHENTICATE, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    password: password.trim(),
  }),
});

const data = await response.json();

if (data.success) {
  // Store session token
  this.sessionToken = data.session_token;
  this.sessionExpiry = new Date(data.expires_at);
  // Proceed with authentication
}
```

### Session Token Usage

Store the `session_token` from successful authentication for subsequent requests (if needed for other protected endpoints).

---

## Deployment Information

**Backend Cloud Function:**
- Name: `authenticate-research-access`
- Region: `europe-west3`
- Runtime: Python 3.11
- Memory: 256MB
- Timeout: 60 seconds
- Status: ✅ Active and deployed

**Frontend PWA:**
- Status: ✅ Deployed to GitHub Pages
- Build: Completed and pushed
- Branch: `main`

**Git Commits:**
1. `760de6b` - Backend: Add simplified password verification API
2. `b86fc80` - Frontend: Remove password from frontend code
3. `02d9108` - Build PWA with security fixes

---

## Current Password

**Research Password:** `Neuro25`

This password is now stored securely:
- Backend environment variable: `RESEARCH_PASSWORD_HASH`
- Hashed with salt: `igfap_research_2024`
- Hash stored in Cloud Function configuration (not in code)

To change the password, update the Cloud Function environment variables and redeploy.

---

## Support

If you need to:
- Change the password
- Add additional allowed origins
- Modify rate limiting
- Extend session duration
- Add additional security features

Contact: Deepak Bos <bosdeepak@gmail.com>

---

**Developer Feedback Addressed:**
> "Password field is set directly on front end and front end can be accessed via browser.
> So password can be stolen. We have to fetch the password from backend or we can design
> api at backend that will match the password received from the front end."

✅ **Implemented:** Backend API with password verification as requested.
