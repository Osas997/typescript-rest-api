# POST API SPEC

## Get All Post

Endpoint : GET `/api/posts`

Response body:

```json
{
  "data": [
    {
      "title": "wurung",
      "body": "kabeh moto wes podo weruh",
      "image": "https://api/dasdas.png",
      "slug": "wurung",
      "created_at": "4 minutes ago",
      "author": {
        "name": "fahmoy",
        "username": "ciwis"
      },
      "categories": [
        {
          "name": "Tech"
        },
        {
          "name": "Gaming"
        }
      ]
    }
  ]
}
```

## Get Post By Author

Endpoint : GET `/api/posts/{username}`

Response body:

```json
{
  "data": [
    {
      "title": "wurung",
      "body": "kabeh moto wes podo weruh",
      "image": "https://api/dasdas.png",
      "slug": "wurung",
      "created_at": "4 minutes ago",
      "author": {
        "name": "fahmoy",
        "username": "ciwis"
      },
      "categories": [
        {
          "name": "Tech"
        },
        {
          "name": "Gaming"
        }
      ]
    }
  ]
}
```

## Get Post By Category

Endpoint : GET `/api/all-posts?category={slug}`

Response body:

```json
{
  "data": [
    {
      "title": "wurung",
      "body": "kabeh moto wes podo weruh",
      "image": "https://api/dasdas.png",
      "slug": "wurung",
      "created_at": "4 minutes ago",
      "author": {
        "name": "fahmoy",
        "username": "ciwis"
      },
      "categories": [
        {
          "name": "Tech"
        },
        {
          "name": "Gaming"
        }
      ]
    }
  ]
}
```

## Get Detail Post

Endpoint : GET `/api/posts/{slug}`

Response body:

```json
{
  "data": {
    "title": "wurung",
    "body": "kabeh moto wes podo weruh",
    "image": "https://api/dasdas.png",
    "slug": "wurung",
    "created_at": "4 minutes ago",
    "author": {
      "name": "fahmoy",
      "username": "ciwis"
    },
    "categories": [
      {
        "name": "Tech"
      },
      {
        "name": "Gaming"
      }
    ]
  }
}
```

## Create Post

Endpoint : POST `/api/post`

Request Header:

```json
{
  "authorization": "Bearer 34242423"
}
```

Request body:

```json
{
  "title": "wurung",
  "body": "kabeh moto wes podo weruh",
  "image": image.jpg,
  "categories": [1,2,3]
}
```

Response body (if successful):

```json
{
  "data": {
    "title": "wurung",
    "body": "kabeh moto wes podo weruh",
    "image": image.jpg,
    "categories": [
        {
        "name": "Tech"
        },
        {
        "name": "Gaming"
    }
    ]
  }
}
```

Response body (if failed):

```json
{
  "errors": [
    "token invalid"
    "title is required"
  ]
}
```

## Get User Post

Endpoint : GET `/api/user/posts`

Request Header:

```json
{
  "authorization": "Bearer 34242423"
}
```

Response body (if successful):

```json
{
  "data": [
    {
      "title": "wurung",
      "body": "kabeh moto wes podo weruh",
      "image": "https://api/dasdas.png",
      "slug": "wurung",
      "created_at": "4 minutes ago",
      "author": {
        "name": "fahmoy",
        "username": "ciwis"
      },
      "categories": [
        {
          "name": "Tech"
        },
        {
          "name": "Gaming"
        }
      ]
    }
  ]
}
```

Response body (if failed):

```json
{
  "error": "Invalid token"
}
```

## Update Post

Endpoint : PUT `/api/post/{slug}`

Request Header:

```json
{
  "authorization": "Bearer 34242423"
}
```

Request Body:

```json
{
 "title": "wurung",
  "body": "kabeh moto wes podo weruh",
  "image": image.jpg, // boleh null
  "categories": [1,2,3]
}
```

Response body (if successful):

```json
{
  "data": {
    "title": "wurung",
    "body": "kabeh moto wes podo weruh",
    "image": image.jpg,
    "categories": [
        {
        "name": "Tech"
        },
        {
        "name": "Gaming"
    }
    ]
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

Endpoint : DELETE `/api/post/{slug}`

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
