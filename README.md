<h1 align="center">
  <img alt="Mesavip" title="Mesavip" src=".github/logo-transparent.png" width="300px" />
</h1>

<h3 align="center"> Mesavip helps you making reservations in your favorite restaurants. </h3>

<br>
<p align="center">
 
  <a href="https://mesavip.netlify.app" target="_blank" style="text-decoration:none" color="red">
    <img src="https://img.shields.io/badge/mesavip website-473B4A?style=for-the-badge&logo=netlify">
  </a>
  
  <a href="https://github.com/danielmarques12/mesavip-web" target="_blank">
    <img src="https://img.shields.io/badge/react frontend-473B4A?style=for-the-badge&logo=react">
  </a>
  
  <a href="https://www.figma.com/file/mv6AkW8Z2HLsKrvG2FXLuI/MESAVIP?node-id=0%3A1" target="_blank">
    <img src="https://img.shields.io/badge/mesavip Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white&color=473B4A">
  </a>
  
  <a href="https://raw.githubusercontent.com/danielmarques12/mesavip-api-tsc/main/.github/database.png" target="_blank">
    <img src="https://img.shields.io/badge/database model-316192?style=for-the-badge&logo=postgresql&logoColor=white&color=473B4A">
  </a>
  
  <a href="https://www.notion.so/Queries-0697a2735333468a85ab69a96ec10a90" target="_blank">
    <img src="https://img.shields.io/badge/database main queries-316192?style=for-the-badge&logo=notion&logoColor=white&color=473B4A">
  </a>
  
</p>

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
