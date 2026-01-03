# Authentication Implementation Guide
# Kimlik Doğrulama Uygulama Rehberi

**Version:** 0.2.0  
**Date:** 2025-12-04  
**Status:** ✅ Backend Complete, 🚧 Frontend In Progress

---

## 🎯 Implementation Overview / Uygulama Genel Bakış

### ✅ Completed / Tamamlandı

#### Backend (NestJS)

**1. JWT Strategy** (`apps/api/src/modules/auth/strategies/jwt.strategy.ts`)
- Validates JWT tokens
- Extracts user payload
- Checks user status
- Returns user object for request

**2. Local Strategy** (`apps/api/src/modules/auth/strategies/local.strategy.ts`)
- Validates email/password
- Used for login endpoint
- Returns user object

**3. Auth Guards**
- `JwtAuthGuard` - Protects routes requiring authentication
- `LocalAuthGuard` - Handles login authentication
- Public decorator for public routes

**4. Auth Service** (`apps/api/src/modules/auth/auth.service.ts`)
- `validateUser()` - Validate email/password with bcrypt
- `login()` - Generate JWT tokens
- `register()` - Create new user with hashed password
- `refreshToken()` - Refresh access token
- `generateTokens()` - Create access & refresh tokens

**5. Auth Controller** (`apps/api/src/modules/auth/auth.controller.ts`)
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Token refresh
- `GET /auth/profile` - Get current user (protected)
- `POST /auth/logout` - Logout

**6. DTOs**
- `LoginDto` - Login request validation
- `RegisterDto` - Registration request validation

**7. Decorators**
- `@Public()` - Mark routes as public
- `@CurrentUser()` - Extract current user from request

---

## 🔧 Configuration / Yapılandırma

### Environment Variables (.env)

```env
JWT_SECRET=your-super-secret-jwt-key-12345
JWT_EXPIRATION=7d
```

### Module Setup

```typescript
JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: { expiresIn: '15m' },
  }),
  inject: [ConfigService],
})
```

---

## 📝 API Usage / API Kullanımı

### 1. Register New User

**Endpoint:** `POST /api/v1/auth/register`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 900,
  "user": {
    "id": "clxy...",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "tenantId": "clxy..."
  }
}
```

### 2. Login

**Endpoint:** `POST /api/v1/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepass123"
}
```

**Response:** (Same as register)

### 3. Get Profile (Protected)

**Endpoint:** `GET /api/v1/auth/profile`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response:**
```json
{
  "user": {
    "id": "clxy...",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "tenantId": "clxy..."
  }
}
```

### 4. Refresh Token

**Endpoint:** `POST /api/v1/auth/refresh`

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 900
}
```

---

## 🛡️ Protecting Routes / Rotaları Koruma

### In Controllers

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CurrentUser } from './auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Get('stores')
async getStores(@CurrentUser() user: any) {
  // user.userId, user.email, user.tenantId available
  return this.storesService.findAll(user.tenantId);
}
```

### Public Routes

```typescript
import { Public } from './auth/decorators/public.decorator';

@Public()
@Get('public-data')
async getPublicData() {
  // No authentication required
}
```

---

## 🔒 Security Features / Güvenlik Özellikleri

### 1. Password Hashing
- **Algorithm:** bcrypt
- **Cost Factor:** 12
- **Salt:** Auto-generated per password

```typescript
const hashedPassword = await bcrypt.hash(password, 12);
const isValid = await bcrypt.compare(password, hashedPassword);
```

### 2. JWT Tokens
- **Algorithm:** HS256 (symmetric)
- **Access Token:** 15 minutes
- **Refresh Token:** 7 days
- **Payload:** userId, email, tenantId, role

### 3. Token Security
- Tokens stored in httpOnly cookies (recommended for production)
- No sensitive data in JWT payload
- Token expiration checked on every request
- User status validated on token validation

### 4. Multi-Tenant Isolation
- Every request includes tenantId from JWT
- Database queries automatically filtered by tenantId
- Users can only access their tenant's data

---

## 🚀 Frontend Integration / Frontend Entegrasyonu

### Next Steps (To Be Implemented)

1. **Login Page** (`apps/web/src/app/login/page.tsx`)
   - Email/password form
   - Form validation
   - Error handling
   - Redirect after login

2. **Register Page** (`apps/web/src/app/register/page.tsx`)
   - Registration form
   - Password strength indicator
   - Email validation
   - Auto-login after registration

3. **Auth Context** (`apps/web/src/contexts/auth-context.tsx`)
   - Store tokens in localStorage/cookies
   - Provide user state globally
   - Auto-refresh tokens
   - Logout functionality

4. **Protected Routes** (`apps/web/src/middleware.ts`)
   - Check authentication before rendering
   - Redirect to login if not authenticated
   - Include token in API requests

5. **API Client Update** (`apps/web/src/lib/api.ts`)
   - Add token to headers
   - Handle 401 errors
   - Auto-refresh on token expiration

---

## 🧪 Testing / Test

### Manual Testing with cURL

**Register:**
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

**Get Profile:**
```bash
curl -X GET http://localhost:3001/api/v1/auth/profile \
  -H "Authorization: Bearer <your_token_here>"
```

---

## 📊 Database Schema / Veritabanı Şeması

### User Table

```prisma
model User {
  id        String   @id @default(cuid())
  tenantId  String
  email     String   @unique
  password  String   // bcrypt hashed
  firstName String
  lastName  String
  role      UserRole @default(USER)
  status    UserStatus @default(ACTIVE)
  lastLoginAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 🎯 Next Steps / Sonraki Adımlar

1. ✅ Backend authentication complete
2. 🚧 Frontend login/register pages
3. 🚧 Auth context provider
4. 🚧 Protected routes middleware
5. 🚧 Token refresh mechanism
6. 🚧 Password reset flow
7. 🚧 Email verification
8. 🚧 Two-factor authentication (2FA)

---

**Created:** 2025-12-04  
**Last Updated:** 2025-12-04  
**Maintainer:** RentOrgin Dev Team


















