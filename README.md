<!-- Install node in the Local -->

1. install dependencies using  "npm install" command
2. create ".env" file in the root directory
3. Add this Below lines - postgres local DB connection & local env -> in ".env" file

# postgres local DB connection
DB_DATABASE=sanket_blog
DB_USERNAME=postgres
DB_PASSWORD=2304
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432

# local env
NODE_ENV=local
PORT=3000


4. Run "npm run migrate command"
5. Finally You can start the server using "npm start" command

