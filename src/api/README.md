# API Integration

This folder contains all the API integration code for the voting application.

## Structure

```
src/api/
├── constants.ts          # API base URL and constants
├── index.ts             # Main exports for all API services and interfaces
├── interfaces/          # TypeScript interfaces for API requests/responses
│   ├── auth.ts         # Authentication interfaces
│   ├── user.ts         # User registration interfaces
│   ├── section.ts      # Section/Pauta interfaces
│   └── vote.ts         # Voting interfaces
├── services/           # API service classes
│   ├── httpService.ts  # Base HTTP service for making requests
│   ├── authApi.ts      # Authentication API service
│   ├── userApi.ts      # User registration API service
│   ├── sectionApi.ts   # Section/Pauta API service
│   └── voteApi.ts      # Voting API service
└── README.md           # This file
```

## API Endpoints

The application integrates with the following API endpoints:

- **Authentication**: `POST /auth` - User login
- **User Registration**: `POST /user` - Create new user account
- **Sections**: 
  - `POST /section` - Create new section/pauta
  - `GET /section?userId={id}` - Get all sections for a user
- **Voting**: `POST /votes` - Submit a vote on a section

## Usage

### Importing API Services

```typescript
import { authApi, userApi, sectionApi, voteApi } from '../../api';
```

### Authentication

```typescript
// Login
const userData = await authApi.authenticateUser({
  email: 'user@example.com',
  password: 'password'
});

// User data is automatically stored in localStorage
```

### User Registration

```typescript
// Create new user
const newUser = await userApi.createUser({
  name: 'John Doe',
  cpf: '123.456.789-00',
  email: 'john@example.com',
  password: 'password'
});
```

### Sections/Pautas

```typescript
// Create new section
const newSection = await sectionApi.createSection({
  name: 'Section Name',
  description: 'Section description',
  expiration: 60 // minutes
});

// Get all sections for a user
const sections = await sectionApi.getAllSections(userId);
```

### Voting

```typescript
// Submit a vote
await voteApi.voteOnSection({
  sectionId: 1,
  userId: 1,
  vote: true // true for yes, false for no
});
```

## Error Handling

All API services include proper error handling:

- HTTP errors are caught and re-thrown
- 401 Unauthorized errors automatically redirect to login
- Error messages are displayed to users via snackbar notifications

## Configuration

The API base URL is configured in `constants.ts`:

```typescript
export const API_URL = 'http://localhost:8081';
```

Change this value to point to your API server. 