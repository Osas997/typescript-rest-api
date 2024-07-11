# USER API SPEC

## Register User

Endpoint : POST `/api/register`

Request body:

```json
{
  "username": "ciwis",
  "password": "password",
  "name": "fahmoy"
}
```

Response body (if successful):

```json
{
  "data": {
    "username": "ciwis",
    "password": "password"
  }
}
```

Response body (if failed):

```json
{
  "error": "Username already exists"
}
```

## Login User

Endpoint : POST `/api/login`

Request body:

```json
{
  "username": "ciwis",
  "password": "password"
}
```

Response body (if successful):

```json
{
  "data": {
    "username": "ciwis",
    "password": "password",
    "token": "423423424232"
  }
}
```

Response body (if failed):

```json
{
  "error": "Invalid username or password"
}
```

## Refresh Token

Endpoint : POST `/api/refresh`

Request body:

```json
{
  "refreshToken": "423423424232"
}
```

Response body (if successful):

```json
{
  "data": {
    "username": "ciwis",
    "password": "password",
    "token": "423423424232"
  }
}
```

Response body (if failed):

```json
{
  "error": "Invalid token"
}
```

## Get User

Endpoint : GET `/api/current`

Request Header:

```json
{
  "authorization": "Bearer 34242423"
}
```

Response body (if successful):

```json
{
  "data": {
    "username": "ciwis",
    "password": "password",
    "name": "fahmoy"
  }
}
```

Response body (if failed):

```json
{
  "error": "Invalid token"
}
```

## Update User

Endpoint : PATCH `/api/current`

Request Header:

```json
{
  "authorization": "Bearer 34242423"
}
```

Request Body:

```json
{
  "name": "fahmoy", //tidak wajib
  "password": "password" //tidak wajib
}
```

Response body (if successful):

```json
{
  "data": {
    "password": "password",
    "name": "fahmoy"
  }
}
```

Response body (if failed):

```json
{
  "error": "Invalid token"
}
```

## Logout User

Endpoint : POST `/api/logout`

Request Header:

```json
{
  "authorization": "Bearer 34242423"
}
```

Response body (if successful):

```json
{
  "message": "Berhasil Logout"
}
```

Response body (if failed):

```json
{
  "error": "Invalid token"
}
```
