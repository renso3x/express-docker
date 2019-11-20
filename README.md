## App Info

- Express
- MongoDB
- Docker
- Mocha
- Chai

## Guide

```bash
# Build docker image
docker-compose up

# Run the unit test
npm run test
```

## Generate Seed

- `http://localhost:3001/seed/`
- Generates Organization and Members


## Sample Request

```
POST: http://localhost:3001/orgs/:orgName/comments - :orgName = xendit
{
  "comment": "This is my first comment for xendit",
  "memberId": "5dd39ded9422670013609a03"
}
```
```
GET: `localhost:3001/orgs/:orgName/comments`  - :orgName = xendit
```

```
GET: `http://localhost:3001/orgs/:orgName/members` - :orgName = xendit
```

```
DELETE: `localhost:3001/orgs/:orgName/comments/:id` - :orgName = xendit, :id = commentId
```



