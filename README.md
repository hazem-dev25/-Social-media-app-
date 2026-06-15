# AI-Powered Social Media Backend

A production-minded TypeScript backend for a social media platform with authentication, user profiles, posts, comments, GraphQL user operations, Redis-backed token handling, Firebase notifications, Socket.IO events, file uploads, email workflows, and a standout multimodal AI chat experience.

The main highlight of this project is the AI chat module: it does more than answer text prompts. It detects whether a user wants normal chat, image generation, video generation, or speech output, then routes the request to the right AI workflow and stores the complete result in MongoDB.

## Project Highlights

- AI chat assistant powered by Groq chat completions.
- Prompt intent classification for `text`, `image`, `video`, and `speech`.
- Image generation through Hugging Face FLUX.1-schnell.
- Text-to-speech generation through Groq speech models.
- Text-to-video generation through Bytez.
- AI chat memory saved in MongoDB with prompt, message, media URL, status, and timestamps.
- JWT authentication with access tokens, refresh tokens, and role-based signing.
- Redis integration for token revocation and user profile caching.
- Email flows for welcome email, verification, forget password, and reset password events.
- Social user profiles with image upload support.
- Posts with attachments, tags, visibility controls, and friend-aware fetching.
- Comments with mentions and emoji support.
- Firebase Cloud Messaging notification support.
- GraphQL endpoint for user query and mutation operations.
- Socket.IO connection layer for realtime communication experiments.
- Centralized success and error response handling.
- Zod validation middleware for safer request payloads.
- Generic database repository pattern over Mongoose models.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js |
| Language | TypeScript |
| API Framework | Express |
| Database | MongoDB |
| ODM | Mongoose |
| Validation | Zod |
| Authentication | JWT, bcrypt |
| Cache / Revocation | Redis |
| Realtime | Socket.IO |
| GraphQL | graphql, graphql-http |
| File Uploads | Multer |
| Email | Nodemailer |
| Notifications | Firebase Admin SDK |
| AI Chat | Groq SDK |
| Image Generation | Hugging Face Inference API |
| Video Generation | Bytez |

## AI Chat Feature

The AI chat module is the core showcase feature of this project.

### How It Works

1. The user sends a prompt to `POST /AiChatModel`.
2. The route is protected by authentication middleware.
3. The service sends the prompt to a Groq-powered intent classifier.
4. The classifier returns structured JSON:

```json
{
  "type": "image | video | speech | text",
  "content": "cleaned prompt content"
}
```

5. The backend chooses the right workflow:

| Intent | Backend Action |
| --- | --- |
| `text` | Generates a short conversational AI response through Groq. |
| `image` | Calls Hugging Face FLUX.1-schnell, saves the generated image under `public/images`, and returns a media URL. |
| `video` | Calls the Bytez text-to-video model and stores the returned media URL. |
| `speech` | Calls Groq text-to-speech, saves a `.wav` file under `public/audio`, and returns a media URL. |

6. The assistant response is generated with conversation context.
7. The chat result is saved to MongoDB through the `AiModel` schema.

### AI Chat Data Saved

Each AI interaction stores:

- `prompt`: original user prompt.
- `message`: assistant response.
- `media`: generated image, video, or audio URL when available.
- `status`: detected intent type.
- `createdAt` and `updatedAt`: automatic timestamps.

### Example Request

```http
POST /AiChatModel
Authorization: Bearer <access_token>
Content-Type: application/json
```

```json
{
  "prompt": "Generate an image of a futuristic social media dashboard"
}
```

### Example Response Shape

```json
{
  "success": true,
  "message": "AI chat is running",
  "data": {
    "prompt": "Generate an image of a futuristic social media dashboard",
    "message": "Done. That dashboard looks clean.",
    "media": "http://localhost:3000/public/images/image-USER_ID.png",
    "status": "image"
  }
}
```

## Project Structure

```text
src/
  app.controller.ts              # Express app bootstrap, routes, GraphQL, Socket.IO
  main.ts                        # Application entry point
  common/
    ai-orchestrator/             # AI experiment/orchestration code
    enums/                       # Shared enums
    exception/                   # Custom exceptions and success responses
    interface/                   # Shared TypeScript interfaces
    middelware/                  # Auth, validation, error, and upload middleware
    security/                    # JWT generation and verification
    service/                     # Redis and Firebase services
    utils/SendEmail/             # Email service and email events
  config/
    env.service.ts               # Environment variable loader
  database/
    connection.ts                # MongoDB connection
    models/                      # Mongoose schemas
    repository/                  # Generic database repository
  modules/
    AI_chat/                     # Multimodal AI chat controller and service
    auth/                        # Signup, login, verification, tokens, profile views
    comments/                    # Comment CRUD
    gql/                         # GraphQL user schema, args, types, resolvers
    posts/                       # Post CRUD and visibility logic
    users/                       # Social profile, profile URLs, notifications
    GraphQl.ts                   # GraphQL schema composition
```

## API Overview

### Authentication

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/signup` | No | Create an auth account and trigger welcome/verification email flow. |
| `POST` | `/verify_email` | No | Verify user email with code flow. |
| `POST` | `/login` | No | Login and receive access and refresh tokens. |
| `POST` | `/forgetPassword` | Yes | Trigger forget-password email flow. |
| `PATCH` | `/resetPassword` | Yes | Reset password using email, password, and code. |
| `GET` | `/get_all_users` | No | Return all auth users without passwords. |
| `GET` | `/get_user_by_id` | Yes | Return the authenticated user. |
| `PATCH` | `/update_user_by_id` | Yes | Update authenticated user data. |
| `DELETE` | `/delete_user_by_id` | Yes | Delete authenticated user. |
| `POST` | `/refresh_token` | No | Generate a new access token from a refresh token. |
| `POST` | `/revokeToken` | Yes | Store revoked token state in Redis. |
| `POST` | `/view_profile` | Yes | Increment and return profile view data. |

### Users

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/get_user_profile` | Yes | Fetch user profile with Redis caching support. |
| `POST` | `/create_user` | Yes | Create social profile with optional profile image upload. |
| `GET` | `/create_profile_url/:username` | No | Generate a shareable profile URL. |
| `POST` | `/send_notification/:userid` | Yes | Save an FCM token and send a Firebase notification. |

### Posts

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/createPost` | Yes | Create a post with content, tags, visibility, and up to 5 attachments. |
| `GET` | `/getPosts/:userid` | Yes | Fetch posts based on ownership, friends, tags, and visibility. |
| `PATCH` | `/updatePost/:id` | Yes | Update a post. |
| `DELETE` | `/deletePost/:id` | Yes | Delete a post. |

Post visibility supports:

- `public`
- `private`
- `friends`

### Comments

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/addComments` | Yes | Add a comment to a post. |
| `GET` | `/getAllComments` | No | Return all comments. |
| `GET` | `/getCommentsbyPost/:id` | No | Return a comment populated with its post. |
| `PATCH` | `/updateComment/:id` | Yes | Update a comment. |
| `DELETE` | `/deleteComment/:id` | Yes | Delete a comment. |

### AI Chat

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/AiChatModel` | Yes | Run the multimodal AI chat workflow. |

### GraphQL

GraphQL is mounted at:

```text
/qraphql
```

Available operations include:

- `getAllUsers`
- `getUserById`
- `updateUser`
- `deleteUser`

### Static Media

Generated and uploaded media can be served from:

```text
/public/images
/public/audio
```

## Database Models

### Auth

Stores account-level data:

- name
- age
- email
- password hash
- gender
- role
- provider
- verification status
- profile view count
- timestamps

### User

Stores social profile data:

- auth user reference
- username
- age
- image
- about
- notification tokens
- friends
- timestamps

### Post

Stores social posts:

- user reference
- attachments
- content
- tags
- likes
- visibility
- timestamps

### Comment

Stores post comments:

- user reference
- post reference
- text
- mention
- emoji

### AI Chat

Stores AI conversations:

- prompt
- message
- media
- status
- timestamps

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB connection string
- Redis connection string
- Groq API key
- Hugging Face API token
- Bytez API key
- Gmail or SMTP app credentials for Nodemailer
- Firebase Admin SDK service account JSON for notifications

### Installation

```bash
npm install
```

### Environment Files

The project loads environment variables from:

```text
.env.dev
.env.prod
```

The selected file depends on `NODE_ENV`.

Create the environment file you need using this shape:

```env
PORT=3000
MODE=dev
DB_URL=mongodb+srv://...

USER_JWT=your_user_access_secret
ADMIN_JWT=your_admin_access_secret
REFRESH_USER_JWT=your_user_refresh_secret
REFRESH_ADMIN_JWT=your_admin_refresh_secret

APP_EMAIL=your_email@example.com
APP_PASSWORD=your_email_app_password

GROQ_API=your_groq_api_key
HF_TOKEN=your_huggingface_token
IMAGE_API=your_bytez_api_key
AI_API=optional_ai_key

REDIS_URL=redis://localhost:6379
```

Keep `.env.*`, Firebase service account JSON files, uploads, generated media, `node_modules`, and `dist` out of Git.

### Run In Development

```bash
npm run start:dev
```

### Run In Production Mode

```bash
npm run start:prod
```

Both scripts compile TypeScript in watch mode and run the compiled output from `dist/main.js`.

## Authentication Flow

1. User signs up through `/signup`.
2. Password is hashed with bcrypt before saving.
3. Email event is triggered after account creation.
4. User logs in through `/login`.
5. Backend returns an access token and refresh token.
6. Protected routes read `Authorization: Bearer <token>`.
7. Refresh tokens can generate new access tokens through `/refresh_token`.
8. Revoked tokens are tracked through Redis.

## File Upload Flow

- Profile images are uploaded through `/create_user`.
- Post attachments are uploaded through `/createPost`.
- Post uploads support up to 5 files using the `attachment` field.
- Generated AI images are written to `public/images`.
- Generated AI speech files are written to `public/audio`.

## Realtime Layer

The server initializes Socket.IO after the HTTP server starts. It currently listens for:

- `connection`
- `hi`
- `disconnect`

This provides a base for realtime chat, notifications, typing indicators, or live social updates.

## Error And Response Handling

The project uses:

- `SuccessResponse` for consistent successful API responses.
- Custom exception classes for bad requests, unauthorized access, and not-found cases.
- A global error middleware mounted after the routers.

## LinkedIn Project Summary

Built a TypeScript social media backend with a multimodal AI chat system as the main feature. The backend supports secure JWT auth, Redis token revocation, MongoDB data models, file uploads, posts, comments, GraphQL user operations, Firebase notifications, Socket.IO realtime events, and email workflows.

The AI chat system classifies each prompt into text, image, video, or speech intent, then routes it to the correct AI provider using Groq, Hugging Face, and Bytez. Each AI result is saved with conversation history, response text, generated media URL, and intent status.

## Future Improvements

- Add automated unit and integration tests.
- Add OpenAPI or Swagger documentation.
- Add pagination for posts, comments, and users.
- Move generated media URL host into environment configuration.
- Add stricter authorization checks for post and comment ownership.
- Add Docker Compose for MongoDB, Redis, and the API.
- Add CI checks for TypeScript compilation and linting.

## Author

Developed as a full backend project focused on practical social media features and a strong AI chat experience suitable for GitHub portfolio presentation and LinkedIn showcasing.
