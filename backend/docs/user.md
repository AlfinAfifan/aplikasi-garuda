# User API

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
    "email": "admin@gmail.com",
    "password": "123",
    "nama": "admin",
    "id_lembaga": ,
    "role": "admin",
    "nta": "112342",
    "tmpt_lahir": "trenggalek",
    "tgl_lahir": "2024-07-01",
    "alamat": "",
    "agama": "islam",
    "jabatan": "pembina"
}
```

Response Body Success :
```json
{
    "data": {
        "email": "admin@gmail.com",
        "nama": "admin"
    }
}
```

Response Body Error :
```json
{
    "errors": "Email is already"
}
```