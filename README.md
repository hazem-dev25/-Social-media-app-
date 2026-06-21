# AI Chat-Driven Social Media Backend

A polished TypeScript backend built for a modern social network, designed to showcase a robust AI chat engine alongside production-ready features such as authentication, realtime messaging, Redis token management, GraphQL, and media handling.

## What This Project Delivers

- A scalable backend foundation for social experiences
- Secure account and profile management
- Post and comment workflows with media attachments
- Realtime Socket.IO room-based chat
- AI-powered multimodal assistant routing user prompts to text, image, video, or speech flows
- Fast static delivery for generated assets

## Why It Stands Out

This project is centered on an AI chat experience that does more than answer questions. It detects intent, routes requests into the right media workflow, and stores context in MongoDB. The result is a backend that treats AI as a first-class feature rather than an add-on.

## Core Capabilities

- Sign-up, login, email verification, and session management
- JWT access + refresh token lifecycle with Redis revocation
- Profile creation and shareable profile URLs
- Post creation with attachments and visibility control
- Comment creation, update, retrieval, and deletion
- Socket.IO chat rooms with authenticated handshake
- AI chat prompt handling for text, image, video, and speech
- Express + GraphQL API support
- Media upload and static asset serving
- Firebase Cloud Messaging notification support

## AI Chat Highlights

The AI chat module is the project’s strongest narrative:

- Single endpoint: `POST /AiChatModel`
- Authenticated user prompt processing
- Intent classification for `text`, `image`, `video`, and `speech`
- Dynamic workflow selection per prompt type
- Media generation with external APIs and asset persistence
- Conversation state persisted to MongoDB

## Architecture Overview

```text
src/
  app.controller.ts        # Express app bootstrap, GraphQL and Socket.IO integration
  main.ts                  # Application entry point
  common/
    ai-orchestrator/       # AI orchestration and prompt routing
    exception/             # Custom error and success response helpers
    interface/             # Shared TypeScript interfaces
    middelware/            # Auth, validation, upload middleware
    security/              # JWT helpers
    service/               # Redis, Firebase, and Socket services
    utils/SendEmail/       # Email workflows and templates
  config/
    env.service.ts         # Environment loader
  database/
    connection.ts          # MongoDB connection setup
    models/                # Mongoose schemas
    repository/            # Generic repository layer
  modules/
    AI_chat/               # AI chat controller/service
    auth/                  # Authentication controller/service
    comments/              # Comment controller/service
    gql/                   # GraphQL schema and resolvers
    posts/                 # Post controller/service
    socket.io/             # REST socket helpers and service logic
    users/                 # User profile controller/service
```

## Tech Stack

- Node.js + TypeScript
- Express
- MongoDB / Mongoose
- Redis
- Socket.IO
- GraphQL
- Zod
- JWT
- Multer
- Nodemailer
- Firebase Admin SDK
- Groq SDK
- Hugging Face / Bytez integration

## Installation

```bash
npm install
```

## Environment Setup

Create `.env.dev` or `.env.prod` and configure:

- `DB_URL`
- `PORT`
- `MODE`
- `ADMIN_JWT`
- `USER_JWT`
- `REFRESH_ADMIN_JWT`
- `REFRESH_USER_JWT`
- `APP_EMAIL`
- `APP_PASSWORD`
- `AI_API`
- `GROQ_API`
- `IMAGE_API`
- `REDIS_URL`
- `HF_TOKEN`

> Firebase credentials are required for push notification support.

## Run

```bash
npm run start:dev
```

## API Summary

### Authentication

- `POST /signup` — Create user account
- `POST /verify_email` — Confirm email address
- `POST /login` — Authenticate and retrieve access/refresh tokens
- `POST /forgetPassword` — Send password reset email
- `PATCH /resetPassword` — Reset password
- `GET /get_all_users` — List users
- `GET /get_user_by_id` — Get authenticated profile
- `PATCH /update_user_by_id` — Update profile
- `DELETE /delete_user_by_id` — Delete account
- `POST /refresh_token` — Refresh access token
- `POST /revokeToken` — Revoke session token
- `POST /view_profile` — Track profile views

### User Profile

- `GET /get_user_profile` — Get profile data
- `POST /create_user` — Create/update profile with optional image upload
- `GET /create_profile_url/:username` — Generate public profile link
- `POST /send_notification/:userid` — Send Firebase notification

### Posts

- `POST /createPost` — Create a post with attachments
- `GET /getPosts/:userid` — Retrieve posts
- `PATCH /updatePost/:id` — Update post
- `DELETE /deletePost/:id` — Delete post

### Comments

- `POST /addComments` — Add a comment
- `GET /getAllComments` — Retrieve all comments
- `GET /getCommentsbyPost/:id` — Comments for a post
- `PATCH /updateComment/:id` — Update comment
- `DELETE /deleteComment/:id` — Delete comment

### AI Chat

- `POST /AiChatModel` — Authenticated endpoint for intelligent prompt handling

### Socket.IO

- Authenticated socket handshake via `socket.handshake.auth.token`
- `room` event — Create/join chat room
- `send_message` event — Broadcast room chat

REST socket helpers:

- `GET /get_room_id/:id`
- `GET /get_messages/:id`

### GraphQL

- `POST /qraphql` — GraphQL entrypoint

## Assets

- `public/images` — Generated image assets
- `public/audio` — Generated audio assets

## Why This Project Works

It pairs real-world social platform requirements with an AI-first backend design. The architecture is production-aware, the APIs are intuitive, and the AI chat workflow is built to serve as the platform’s flagship capability.

## License

ISC

