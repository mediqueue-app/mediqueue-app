# Manual RBAC Verification

Automated RBAC coverage lives in `tests/test_admin_api.py`. Use this guide for manual verification after running Alembic migrations and starting the API.

## 1. Apply the migration

```bash
alembic upgrade head
```

Confirm existing users now have the safe default role:

```sql
SELECT id, email, role FROM users;
```

Newly registered users should also receive `patient` because `POST /v1/auth/register` does not accept a role field.

## 2. Verify unauthenticated requests return 401

```bash
curl -i http://localhost:8000/v1/clinics/1/doctors
```

Expected result: `401 Unauthorized` with a `WWW-Authenticate: Bearer` header.

## 3. Register and log in as a normal user

```bash
curl -i -X POST http://localhost:8000/v1/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"patient@example.com\",\"password\":\"Password123\",\"full_name\":\"Test Patient\"}"
```

```bash
curl -i -X POST http://localhost:8000/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=patient@example.com&password=Password123"
```

Copy the returned `access_token`.

## 4. Verify authenticated access succeeds

```bash
curl -i http://localhost:8000/v1/clinics/1/doctors \
  -H "Authorization: Bearer <access_token>"
```

Expected result: a successful response for an existing clinic, or `404 Clinic not found` if the clinic ID does not exist. Either result confirms authentication passed.

## 5. Verify role-restricted behavior

The admin-only endpoint is:

```http
GET /v1/admin/summary
```

It requires the `admin` role.

Set the test user to `patient`:

```sql
UPDATE users SET role = 'patient' WHERE email = 'patient@example.com';
```

Then call the endpoint with the user's token:

```bash
curl -i http://localhost:8000/v1/admin/summary \
  -H "Authorization: Bearer <access_token>"
```

Expected result: `403 Forbidden`.

Update the same user to admin and retry:

```sql
UPDATE users SET role = 'admin' WHERE email = 'patient@example.com';
```

Expected result: `200 OK` with aggregate counts:

```json
{
  "users": 1,
  "clinics": 16,
  "doctors": 44
}
```

Patient flows such as `POST /v1/match`, `GET /v1/clinics`, and auth endpoints remain available to non-admin users.

## 6. Swagger

Open `http://localhost:8000/docs`, use the Authorize button with the Bearer token, and call:

- `GET /v1/clinics/{clinic_id}/doctors`
- `GET /v1/admin/summary` (admin token only)

## 7. Automated tests

```powershell
cd backend
pytest tests/test_admin_api.py -v
```
