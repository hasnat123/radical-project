# Radical Dev Challenge


Hello, this is my full-stack application built with Laravel (backend) and Next.js (frontend) to complete the Radical Dev Challenge. I'm super sorry for not being able to provide a fully hosted application, I had everything set up and working but of course something went wrong last minute. I know it's tedious having to clone repositories instead, but hopefully my instructions are decent enough to be able to get things running without any issues :) Also, if you end up using my Google Books API key found in the example .env file and the books fail to load after getting the app running, it is most likely due to the APIs rate limiting. To solve this, you can wait a bit until the daily limit is reset, or you can create your own Google Books API key which only takes a couple of minutes, the link for which can be found below in the instructions.

P.S. I deployed the client side seperately on Vercel which you can have a look at here: https://radical-practice-53q1t31f7-hasnats-projects-81eeb542.vercel.app/


## Prerequisites

- [Node.js](https://nodejs.org/) >= 14.x
- [npm](https://www.npmjs.com/) >= 6.x
- [PHP](https://www.php.net/) >= 8.0
- [Composer](https://getcomposer.org/)
- [MySQL](https://www.mysql.com/) or other database

## Setup Instructions

### Backend (Laravel)

1. Clone the repository:
   
   ```sh
   git clone https://github.com/your-username/your-repo.git

2. Navigate to the server directory:
   
   ```sh
   cd server

3. Install dependencies:

   ```sh
   composer install

4. Copy the example environment file and set your environment variables:

   ```sh
   cp .env.example .env
 
  - Feel free to use the Google books API key provided in example environment file, otherwise get your own here: https://developers.google.com/books/docs/overview
    


5. Generate the application key and insert into env file:

   ```sh
   php artisan key:generate

6. Run migrations:

   ```sh
   php artisan migrate

7. Start the development server:

   ```sh
   php artisan serve

### Frontend (Next.js)

1. Navigate to the client directory:

   ```sh
   cd ../frontend

2. Install dependencies:

   ```sh
   npm install

3. Start the development server:

   ```sh
   npm run dev

## Running the Application

* The Laravel backend will be running on http://localhost:8000.
+ The Next.js frontend will be running on http://localhost:3000.
