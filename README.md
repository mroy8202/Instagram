# Instagram

This project consists of a full-stack application that mimics Instagram's core functionality, including user authentication, post creation, liking, commenting, and more. It is built using React for the frontend and Node.js/Express for the backend.

## Features

- **User Authentication**: Secure login and registration using JWT, with encrypted passwords via bcrypt.
- **Post Creation**: Users can create, update, and delete posts.
- **Like & Comment**: Users can like, unlike, and comment on posts.
- **Secure Transactions**: All operations are protected by JWT-based authentication.
- **Media Upload**: Integration with Cloudinary for storing images.
- **Frontend**: A user-friendly interface built with React.js, Redux for state management, and TailwindCSS for styling.
- **Backend**: REST API built with Node.js, Express, and MongoDB for data storage.

## Tech Stack

- **Frontend**: React.js, Redux, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB, JWT, bcrypt
- **Database**: MongoDB
- **Other**: Cloudinary, Nodemailer

## Installation

### Prerequisites

- Node.js
- MongoDB
- Cloudinary API credentials

### Setup Instructions

1. Clone the repository.
   
2. Install dependencies for both the frontend and backend:

    **For Backend**:
    ```bash
    cd server
    npm install
    ```

    **For Frontend**:
    ```bash
    cd client
    npm install
    ```

3. Create a `.env` file in the root of the backend project with the following:

    ```bash
    JWT_SECRET=your_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

4. Run the development server:

    **For Backend**:
    ```bash
    cd server
    npm run dev
    ```

    **For Frontend**:
    ```bash
    cd client
    npm start
    ```

5. The application should now be running at `http://localhost:3000` for the frontend and `http://localhost:4000` for the backend.

## Routes

### Authentication

- **`POST /api/v1/auth/signup`**: Register a new user.
- **`POST /api/v1/auth/login`**: Login an existing user.
- **`POST /api/v1/auth/changePassword`**: Change user password.

### Post Routes

- **`POST /api/v1/post/createPost`**: Create a new post.
- **`POST /api/v1/post/createPost`**: Create a new post (another instance to emphasize).
- **`GET /api/v1/post/getMyPost`**: Get posts of the logged-in user.
- **`GET /api/v1/post/getHomepagePost`**: Get posts from users the logged-in user follows.
- **`DELETE /api/v1/post/deletePost/:id`**: Delete a specific post.
- **`PUT /api/v1/post/likePost`**: Like a post.
- **`PUT /api/v1/post/unlikePost`**: Unlike a post.
- **`GET /api/v1/post/viewLikes`**: View likes on a post.
- **`POST /api/v1/post/createComment`**: Add a comment to a post.