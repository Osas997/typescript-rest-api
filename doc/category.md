# CATEGORY API SPEC

## Get Category

Endpoint : GET `/api/category`

Response body:

```json
{
  "data": [
    {
      "name": "Tech",
      "slug": "tech"
    },
    {
      "name": "Food",
      "slug": "food"
    }
  ]
}
```

## Create Category

Endpoint : POST `/api/category`

Request Header:

```json
{
  "authorization": "Bearer 34242423"
}
```

Request body:

```json
{
  "name": "Vlog"
}
```

Response body (if successful):

```json
{
  "data": {
    "name": "Vlog"
  }
}
```

Response body (if failed):

```json
{
  "errors": ["token invalid"]
}
```

## Update Category

Endpoint : PUT `/api/category/{slug}`

Request Header:

```json
{
  "authorization": "Bearer 34242423"
}
```

Request Body:

```json
{
  "name": "Gaming"
}
```

Response body (if successful):

```json
{
  "data": {
    "name": "Gaming"
  }
}
```

Response body (if failed):

```json
{
  "error": "Invalid token"
}
```

## Delete Post

Endpoint : DELETE `/api/category/{slug}`

Request Header:

```json
{
  "authorization": "Bearer 34242423"
}
```

Response body (if successful):

```json
{
  "message": "Berhasil hapus post"
}
```

Response body (if failed):

```json
{
  "error": "Invalid token"
}
```
