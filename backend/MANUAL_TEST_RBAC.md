# Manual RBAC Verification

This project does not currently have a first-party test suite. Use these steps after running Alembic migrations and starting the API.

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

The current API has no create/update/delete endpoints to make admin-only, so no existing route should reject a valid `patient`, `doctor`, `clinic`, or `admin` user by role.

When an admin-only endpoint is added with `Depends(require_roles([UserRole.ADMIN]))`, verify:

```sql
UPDATE users SET role = 'patient' WHERE email = 'patient@example.com';
```

Then call that endpoint with the user's token.

Expected result: `403 Forbidden`.

Update the same user to admin and retry:

```sql
UPDATE users SET role = 'admin' WHERE email = 'patient@example.com';
```

Expected result: the request succeeds if the token is otherwise valid.

## 6. Swagger

Open `http://localhost:8000/docs`, use the Authorize button with the Bearer token, and call `GET /v1/clinics/{clinic_id}/doctors`.
