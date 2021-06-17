<h1>
  <img alt="Mesavip" title="Mesavip" src=".github/logo.png" width="300px" />
</h1>

### Mesavip helps you making reservations in your favorite restaurants.

<div>
  <img src=".github/icons/react.svg" alt="react" width="20px">
  <a href="https://github.com/danielmarques12/mesavip-web">Front-end Repository</a>
  
</div>
<br>

[Mesavip Website](https://mesavip.netlify.app/)
###### It may take a few seconds to load, due to the Heroku free hosting (Sleeping Dynos 😴).

###### Personal project for studying and portfolio purposes.

### Instalation guide/details

```bash
# Create a PostgreSQL database and put the credentials in the .env file.

# Before perfoming any I/O operation, execute the command below in the database.
# (This will provide functions to the database to generate the uuids):
postgres=$ CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

# You can find the database model and the Insomnia requests collection inside the .github folder.

# To to install the dependencies
$ yarn

# To create the tables in the database
$ yarn knex migrate:latest

# To create the seeds in the database
$ yarn knex seed:run

# To start the api
$ yarn dev
```
