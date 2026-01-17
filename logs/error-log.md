# Error Log - Hata Günlüğü

**Purpose / Amaç:**  
All system errors, solutions, and outcomes are logged here. If an error repeats, previous solutions are reviewed and alternative approaches are generated.

Tüm sistem hataları, çözümleri ve sonuçları burada kayıt altına alınır. Bir hata tekrarlarsa, önceki çözümler gözden geçirilir ve alternatif yaklaşımlar üretilir.

---

## Error Format / Hata Formatı

Each error entry follows this structure:

```
### ERROR-XXX: [Brief Description]
**Date:** YYYY-MM-DD HH:MM  
**Module:** [Module Name]  
**Severity:** Critical | High | Medium | Low  
**Status:** Open | In Progress | Resolved | Recurred  

**Error Message:**
[Full error message and stack trace]

**Context:**
- User Action: [What user was doing]
- Environment: Development | Staging | Production
- Affected Users: [Count or specific users]
- Data Loss: Yes | No

**Root Cause:**
[Analysis of why the error occurred]

**Solution Attempted:**
[What was done to fix it]

**Outcome:**
- Fixed: Yes | No | Partially
- Verified: Yes | No
- Side Effects: [Any unintended consequences]

**Prevention Measures:**
[How to prevent this error in the future]

**Related Errors:** [Links to similar errors]
```

---

## Active Errors - Aktif Hatalar

*(Currently none - system in initial development)*

---

## Resolved Errors - Çözülmüş Hatalar

### ERROR-001: Example Template
**Date:** 2025-12-04 00:00  
**Module:** Template  
**Severity:** Low  
**Status:** Template  

**Error Message:**
```
This is a template entry for future error logging.
```

**Context:**
- User Action: N/A
- Environment: N/A
- Affected Users: 0
- Data Loss: No

**Root Cause:**
Template initialization.

**Solution Attempted:**
N/A

**Outcome:**
- Fixed: N/A
- Verified: N/A
- Side Effects: None

**Prevention Measures:**
Follow error logging format for all future errors.

**Related Errors:** None

---

## Recurring Errors - Tekrarlayan Hatalar

**Definition:** An error that appears more than once despite previous fix attempts.

### Format for Recurring Errors:

```
### ERROR-XXX: [Brief Description] - RECURRENCE #N
**Original Date:** YYYY-MM-DD  
**Recurrence Date:** YYYY-MM-DD  
**Times Occurred:** N

**Previous Solutions (Ineffective):**
1. [First attempt] - Why it failed
2. [Second attempt] - Why it failed

**New Analysis:**
[Fresh look at the problem]

**Alternative Solution:**
[New approach to fix]

**Status:** [Current state]
```

---

## Error Statistics - Hata İstatistikleri

### By Module / Modüle Göre
| Module | Total Errors | Resolved | Open | Recurring |
|--------|--------------|----------|------|-----------|
| Lease Management | 0 | 0 | 0 | 0 |
| Mall Relations | 0 | 0 | 0 | 0 |
| Location Analytics | 0 | 0 | 0 | 0 |
| Feasibility | 0 | 0 | 0 | 0 |
| Expense Tracking | 0 | 0 | 0 | 0 |
| Optimization | 0 | 0 | 0 | 0 |
| Space Management | 0 | 0 | 0 | 0 |
| Budget & Risk | 0 | 0 | 0 | 0 |
| AI Assistant | 0 | 0 | 0 | 0 |
| Translation | 0 | 0 | 0 | 0 |

### By Severity / Öneme Göre
| Severity | Count | Avg. Resolution Time |
|----------|-------|----------------------|
| Critical | 0 | - |
| High | 0 | - |
| Medium | 0 | - |
| Low | 0 | - |

---

## Common Error Patterns - Yaygın Hata Kalıpları

### Database Errors
*(To be populated as patterns emerge)*

**Common Causes:**
- Connection timeouts
- Query performance issues
- Migration conflicts
- Data type mismatches

**Standard Solutions:**
- Connection pooling optimization
- Query optimization with indexes
- Careful migration testing
- Strict type validation

---

### API Integration Errors
*(To be populated as patterns emerge)*

**Common Causes:**
- Third-party API downtime
- Rate limiting
- Authentication failures
- Timeout issues

**Standard Solutions:**
- Implement retry logic with exponential backoff
- Caching of API responses
- Circuit breaker pattern
- Graceful degradation

---

### Authentication Errors
*(To be populated as patterns emerge)*

**Common Causes:**
- Token expiration
- Invalid credentials
- Session conflicts
- Multi-tenant context mismatch

**Standard Solutions:**
- Token refresh mechanism
- Clear error messages for users
- Session management best practices
- Tenant ID validation at every endpoint

---

## Error Prevention Checklist - Hata Önleme Kontrol Listesi

Before deploying new features, verify:

- [ ] Input validation on all user inputs
- [ ] Error handling in all async operations
- [ ] Proper TypeScript types (no `any`)
- [ ] Database transactions for multi-step operations
- [ ] Tenant ID included in all queries (multi-tenant)
- [ ] Unit tests for critical business logic
- [ ] Integration tests for API endpoints
- [ ] Error messages are user-friendly (not technical jargon)
- [ ] All errors logged with sufficient context
- [ ] Rollback plan documented

---

## Critical Incident Response - Kritik Olay Müdahalesi

### Severity Definitions / Önem Tanımları

**Critical:**
- System is down or unusable
- Data loss or corruption
- Security breach
- Response Time: Immediate (0-1 hour)

**High:**
- Major feature broken
- Significant performance degradation
- Affects multiple users
- Response Time: 2-4 hours

**Medium:**
- Single feature broken
- Affects specific users
- Workaround available
- Response Time: 4-24 hours

**Low:**
- Minor UI issues
- Non-critical functionality
- Affects few users
- Response Time: 24-72 hours

---

## Lessons Learned - Öğrenilen Dersler

*(To be updated after significant incidents)*

### Template:
**Date:** YYYY-MM-DD  
**Incident:** [Brief description]  
**What Went Wrong:** [Analysis]  
**What We Learned:** [Key takeaways]  
**Changes Made:** [Process/code improvements]

---

## External Dependencies Status - Dış Bağımlılık Durumu

Track external service outages that caused errors:

| Date | Service | Duration | Impact | Mitigation |
|------|---------|----------|--------|------------|
| - | - | - | - | - |

---

**Maintenance Instructions:**

1. **Log every error immediately** - no matter how small
2. **Update status** as error is investigated/resolved
3. **Link related errors** to identify patterns
4. **Review recurring errors monthly** and generate new solutions
5. **Update statistics** weekly during active development

---

**Last Updated:** 2025-12-04  
**Next Review:** Weekly during development / Geliştirme süresince haftalık



### ERROR-001: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:57

  73 const responseTime = Date.now() - startTime;
  74 
  75 // Log interaction
→ 76 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
**Date:** 2025-12-05T23:44:23.908Z  
**Module:** ai-assistant  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```

Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:57

  73 const responseTime = Date.now() - startTime;
  74 
  75 // Log interaction
→ 76 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
```

**Stack Trace:**
```
PrismaClientKnownRequestError: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:57

  73 const responseTime = Date.now() - startTime;
  74 
  75 // Log interaction
→ 76 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
    at $n.handleRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:7315)
    at $n.handleAndLogRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6307)
    at async l (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:130:9633)
    at async AiAssistantService.executePrompt (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:25)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/ai-assistant/execute

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: Unauthorized
**Date:** 2025-12-05T23:58:57.204Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/auth/profile

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-003: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:57

  73 const responseTime = Date.now() - startTime;
  74 
  75 // Log interaction
→ 76 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
**Date:** 2025-12-05T23:59:00.950Z  
**Module:** ai-assistant  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```

Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:57

  73 const responseTime = Date.now() - startTime;
  74 
  75 // Log interaction
→ 76 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
```

**Stack Trace:**
```
PrismaClientKnownRequestError: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:57

  73 const responseTime = Date.now() - startTime;
  74 
  75 // Log interaction
→ 76 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
    at $n.handleRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:7315)
    at $n.handleAndLogRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6307)
    at async l (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:130:9633)
    at async AiAssistantService.executePrompt (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:25)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/ai-assistant/execute

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-004: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:57

  73 const responseTime = Date.now() - startTime;
  74 
  75 // Log interaction
→ 76 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
**Date:** 2025-12-06T00:05:22.675Z  
**Module:** ai-assistant  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```

Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:57

  73 const responseTime = Date.now() - startTime;
  74 
  75 // Log interaction
→ 76 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
```

**Stack Trace:**
```
PrismaClientKnownRequestError: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:57

  73 const responseTime = Date.now() - startTime;
  74 
  75 // Log interaction
→ 76 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
    at $n.handleRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:7315)
    at $n.handleAndLogRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6307)
    at async l (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:130:9633)
    at async AiAssistantService.executePrompt (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:25)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/ai-assistant/execute

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-001: Invalid email or password
**Date:** 2025-12-06T00:09:54.454Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at process.processImmediate (node:internal/timers:453:9)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: Invalid email or password
**Date:** 2025-12-06T00:10:03.131Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-003: Invalid email or password
**Date:** 2025-12-06T00:10:22.890Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at process.processImmediate (node:internal/timers:453:9)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-004: Invalid email or password
**Date:** 2025-12-06T00:10:29.870Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-001: Cannot GET /
**Date:** 2025-12-06T00:30:47.593Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /
```

**Stack Trace:**
```
NotFoundException: Cannot GET /
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: Cannot GET /favicon.ico
**Date:** 2025-12-06T00:30:47.606Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /favicon.ico
```

**Stack Trace:**
```
NotFoundException: Cannot GET /favicon.ico
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /favicon.ico

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-003: Cannot GET /
**Date:** 2025-12-06T00:30:49.857Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /
```

**Stack Trace:**
```
NotFoundException: Cannot GET /
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-004: Cannot GET /favicon.ico
**Date:** 2025-12-06T00:30:49.863Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /favicon.ico
```

**Stack Trace:**
```
NotFoundException: Cannot GET /favicon.ico
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /favicon.ico

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-005: ThrottlerException: Too Many Requests
**Date:** 2025-12-06T00:32:09.239Z  
**Module:** health  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
ThrottlerException: Too Many Requests
```

**Stack Trace:**
```
ThrottlerException: ThrottlerException: Too Many Requests
    at ThrottlerGuard.throwThrottlingException (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:242:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ThrottlerGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:184:7)
    at async ThrottlerGuard.canActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:132:9)
    at async GuardsConsumer.tryActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/guards/guards-consumer.js:16:17)
    at async canActivateFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:135:33)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:42:31
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/health

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-006: ThrottlerException: Too Many Requests
**Date:** 2025-12-06T00:32:09.248Z  
**Module:** health  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
ThrottlerException: Too Many Requests
```

**Stack Trace:**
```
ThrottlerException: ThrottlerException: Too Many Requests
    at ThrottlerGuard.throwThrottlingException (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:242:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ThrottlerGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:184:7)
    at async ThrottlerGuard.canActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:132:9)
    at async GuardsConsumer.tryActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/guards/guards-consumer.js:16:17)
    at async canActivateFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:135:33)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:42:31
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/health

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-007: ThrottlerException: Too Many Requests
**Date:** 2025-12-06T00:32:09.255Z  
**Module:** health  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
ThrottlerException: Too Many Requests
```

**Stack Trace:**
```
ThrottlerException: ThrottlerException: Too Many Requests
    at ThrottlerGuard.throwThrottlingException (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:242:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ThrottlerGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:184:7)
    at async ThrottlerGuard.canActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:132:9)
    at async GuardsConsumer.tryActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/guards/guards-consumer.js:16:17)
    at async canActivateFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:135:33)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:42:31
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/health

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-008: ThrottlerException: Too Many Requests
**Date:** 2025-12-06T00:32:09.262Z  
**Module:** health  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
ThrottlerException: Too Many Requests
```

**Stack Trace:**
```
ThrottlerException: ThrottlerException: Too Many Requests
    at ThrottlerGuard.throwThrottlingException (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:242:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ThrottlerGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:184:7)
    at async ThrottlerGuard.canActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:132:9)
    at async GuardsConsumer.tryActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/guards/guards-consumer.js:16:17)
    at async canActivateFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:135:33)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:42:31
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/health

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-009: ThrottlerException: Too Many Requests
**Date:** 2025-12-06T00:32:09.269Z  
**Module:** health  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
ThrottlerException: Too Many Requests
```

**Stack Trace:**
```
ThrottlerException: ThrottlerException: Too Many Requests
    at ThrottlerGuard.throwThrottlingException (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:242:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ThrottlerGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:184:7)
    at async ThrottlerGuard.canActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:132:9)
    at async GuardsConsumer.tryActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/guards/guards-consumer.js:16:17)
    at async canActivateFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:135:33)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:42:31
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/health

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-010: ThrottlerException: Too Many Requests
**Date:** 2025-12-06T00:32:09.276Z  
**Module:** health  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
ThrottlerException: Too Many Requests
```

**Stack Trace:**
```
ThrottlerException: ThrottlerException: Too Many Requests
    at ThrottlerGuard.throwThrottlingException (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:242:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ThrottlerGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:184:7)
    at async ThrottlerGuard.canActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:132:9)
    at async GuardsConsumer.tryActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/guards/guards-consumer.js:16:17)
    at async canActivateFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:135:33)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:42:31
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/health

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-011: ThrottlerException: Too Many Requests
**Date:** 2025-12-06T00:32:09.283Z  
**Module:** health  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
ThrottlerException: Too Many Requests
```

**Stack Trace:**
```
ThrottlerException: ThrottlerException: Too Many Requests
    at ThrottlerGuard.throwThrottlingException (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:242:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ThrottlerGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:184:7)
    at async ThrottlerGuard.canActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:132:9)
    at async GuardsConsumer.tryActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/guards/guards-consumer.js:16:17)
    at async canActivateFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:135:33)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:42:31
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/health

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-012: ThrottlerException: Too Many Requests
**Date:** 2025-12-06T00:32:09.289Z  
**Module:** health  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
ThrottlerException: Too Many Requests
```

**Stack Trace:**
```
ThrottlerException: ThrottlerException: Too Many Requests
    at ThrottlerGuard.throwThrottlingException (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:242:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ThrottlerGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:184:7)
    at async ThrottlerGuard.canActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:132:9)
    at async GuardsConsumer.tryActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/guards/guards-consumer.js:16:17)
    at async canActivateFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:135:33)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:42:31
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/health

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-013: ThrottlerException: Too Many Requests
**Date:** 2025-12-06T00:32:09.296Z  
**Module:** health  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
ThrottlerException: Too Many Requests
```

**Stack Trace:**
```
ThrottlerException: ThrottlerException: Too Many Requests
    at ThrottlerGuard.throwThrottlingException (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:242:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ThrottlerGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:184:7)
    at async ThrottlerGuard.canActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:132:9)
    at async GuardsConsumer.tryActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/guards/guards-consumer.js:16:17)
    at async canActivateFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:135:33)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:42:31
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/health

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-014: ThrottlerException: Too Many Requests
**Date:** 2025-12-06T00:32:09.302Z  
**Module:** health  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
ThrottlerException: Too Many Requests
```

**Stack Trace:**
```
ThrottlerException: ThrottlerException: Too Many Requests
    at ThrottlerGuard.throwThrottlingException (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:242:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ThrottlerGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:184:7)
    at async ThrottlerGuard.canActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:132:9)
    at async GuardsConsumer.tryActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/guards/guards-consumer.js:16:17)
    at async canActivateFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:135:33)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:42:31
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/health

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---






### ERROR-001: Cannot GET /tr
**Date:** 2025-12-10T21:51:07.951Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /tr
```

**Stack Trace:**
```
NotFoundException: Cannot GET /tr
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /tr

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: Cannot GET /
**Date:** 2025-12-10T21:51:12.065Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /
```

**Stack Trace:**
```
NotFoundException: Cannot GET /
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-003: Cannot GET /tr/projects
**Date:** 2025-12-10T21:51:14.122Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /tr/projects
```

**Stack Trace:**
```
NotFoundException: Cannot GET /tr/projects
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /tr/projects

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-004: User with this email already exists
**Date:** 2025-12-10T21:51:31.968Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
User with this email already exists
```

**Stack Trace:**
```
ConflictException: User with this email already exists
    at AuthService.register (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/auth.service.ts:101:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/register

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-005: Cannot GET /tr/projects
**Date:** 2025-12-10T21:54:46.148Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /tr/projects
```

**Stack Trace:**
```
NotFoundException: Cannot GET /tr/projects
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /tr/projects

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-006: Cannot GET /tr/contact
**Date:** 2025-12-10T21:54:49.273Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /tr/contact
```

**Stack Trace:**
```
NotFoundException: Cannot GET /tr/contact
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /tr/contact

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-007: Cannot GET /
**Date:** 2025-12-10T21:54:50.028Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /
```

**Stack Trace:**
```
NotFoundException: Cannot GET /
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-001: Cannot GET /
**Date:** 2025-12-10T21:55:49.738Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /
```

**Stack Trace:**
```
NotFoundException: Cannot GET /
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: Cannot GET /tr/contact
**Date:** 2025-12-10T21:55:51.575Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /tr/contact
```

**Stack Trace:**
```
NotFoundException: Cannot GET /tr/contact
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /tr/contact

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-003: Not allowed by CORS
**Date:** 2025-12-10T22:09:36.368Z  
**Module:** auth  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```
Not allowed by CORS
```

**Stack Trace:**
```
Error: Not allowed by CORS
    at origin (/Users/tugra/Desktop/rentorgin/apps/api/src/main.ts:53:18)
    at /Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:219:13
    at optionsCallback (/Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:199:9)
    at corsMiddleware (/Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:204:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at internalNext (/Users/tugra/Desktop/rentorgin/node_modules/helmet/index.cjs:531:6)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: OPTIONS /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-004: Not allowed by CORS
**Date:** 2025-12-10T22:10:33.565Z  
**Module:** auth  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```
Not allowed by CORS
```

**Stack Trace:**
```
Error: Not allowed by CORS
    at origin (/Users/tugra/Desktop/rentorgin/apps/api/src/main.ts:53:18)
    at /Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:219:13
    at optionsCallback (/Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:199:9)
    at corsMiddleware (/Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:204:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at internalNext (/Users/tugra/Desktop/rentorgin/node_modules/helmet/index.cjs:531:6)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: OPTIONS /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-005: Not allowed by CORS
**Date:** 2025-12-10T22:10:39.227Z  
**Module:** auth  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```
Not allowed by CORS
```

**Stack Trace:**
```
Error: Not allowed by CORS
    at origin (/Users/tugra/Desktop/rentorgin/apps/api/src/main.ts:53:18)
    at /Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:219:13
    at optionsCallback (/Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:199:9)
    at corsMiddleware (/Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:204:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at internalNext (/Users/tugra/Desktop/rentorgin/node_modules/helmet/index.cjs:531:6)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: OPTIONS /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-006: Not allowed by CORS
**Date:** 2025-12-10T22:10:40.171Z  
**Module:** auth  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```
Not allowed by CORS
```

**Stack Trace:**
```
Error: Not allowed by CORS
    at origin (/Users/tugra/Desktop/rentorgin/apps/api/src/main.ts:53:18)
    at /Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:219:13
    at optionsCallback (/Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:199:9)
    at corsMiddleware (/Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:204:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at internalNext (/Users/tugra/Desktop/rentorgin/node_modules/helmet/index.cjs:531:6)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: OPTIONS /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-007: Not allowed by CORS
**Date:** 2025-12-10T22:10:56.477Z  
**Module:** auth  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```
Not allowed by CORS
```

**Stack Trace:**
```
Error: Not allowed by CORS
    at origin (/Users/tugra/Desktop/rentorgin/apps/api/src/main.ts:53:18)
    at /Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:219:13
    at optionsCallback (/Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:199:9)
    at corsMiddleware (/Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:204:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at internalNext (/Users/tugra/Desktop/rentorgin/node_modules/helmet/index.cjs:531:6)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: OPTIONS /api/v1/auth/register

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-008: Not allowed by CORS
**Date:** 2025-12-10T22:12:40.464Z  
**Module:** auth  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```
Not allowed by CORS
```

**Stack Trace:**
```
Error: Not allowed by CORS
    at origin (/Users/tugra/Desktop/rentorgin/apps/api/src/main.ts:53:18)
    at /Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:219:13
    at optionsCallback (/Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:199:9)
    at corsMiddleware (/Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:204:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at internalNext (/Users/tugra/Desktop/rentorgin/node_modules/helmet/index.cjs:531:6)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: OPTIONS /api/v1/auth/register

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-009: User with this email already exists
**Date:** 2025-12-10T22:13:10.768Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
User with this email already exists
```

**Stack Trace:**
```
ConflictException: User with this email already exists
    at AuthService.register (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/auth.service.ts:101:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/register

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-010: Not allowed by CORS
**Date:** 2025-12-10T22:13:52.465Z  
**Module:** auth  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```
Not allowed by CORS
```

**Stack Trace:**
```
Error: Not allowed by CORS
    at origin (/Users/tugra/Desktop/rentorgin/apps/api/src/main.ts:53:18)
    at /Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:219:13
    at optionsCallback (/Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:199:9)
    at corsMiddleware (/Users/tugra/Desktop/rentorgin/node_modules/cors/lib/index.js:204:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at internalNext (/Users/tugra/Desktop/rentorgin/node_modules/helmet/index.cjs:531:6)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: OPTIONS /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-001: Cannot GET /tr/contact
**Date:** 2025-12-10T22:15:34.207Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /tr/contact
```

**Stack Trace:**
```
NotFoundException: Cannot GET /tr/contact
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /tr/contact

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: Cannot GET /tr/research
**Date:** 2025-12-10T22:15:42.321Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /tr/research
```

**Stack Trace:**
```
NotFoundException: Cannot GET /tr/research
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /tr/research

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-003: Cannot GET /
**Date:** 2025-12-10T22:15:43.088Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /
```

**Stack Trace:**
```
NotFoundException: Cannot GET /
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-004: Cannot GET /tr/research
**Date:** 2025-12-10T22:15:44.989Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /tr/research
```

**Stack Trace:**
```
NotFoundException: Cannot GET /tr/research
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /tr/research

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-005: Unauthorized
**Date:** 2025-12-10T22:15:52.806Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/auth/profile

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-006: Unauthorized
**Date:** 2025-12-10T22:31:27.780Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/auth/profile

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-007: Unauthorized
**Date:** 2025-12-10T22:31:27.784Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/auth/profile

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-008: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:57

  73 const responseTime = Date.now() - startTime;
  74 
  75 // Log interaction
→ 76 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
**Date:** 2025-12-10T22:32:35.463Z  
**Module:** ai-assistant  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```

Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:57

  73 const responseTime = Date.now() - startTime;
  74 
  75 // Log interaction
→ 76 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
```

**Stack Trace:**
```
PrismaClientKnownRequestError: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:57

  73 const responseTime = Date.now() - startTime;
  74 
  75 // Log interaction
→ 76 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
    at $n.handleRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:7315)
    at $n.handleAndLogRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6307)
    at async l (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:130:9633)
    at async AiAssistantService.executePrompt (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:25)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/ai-assistant/execute

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-001: Cannot GET /tr/research
**Date:** 2025-12-10T22:49:26.927Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /tr/research
```

**Stack Trace:**
```
NotFoundException: Cannot GET /tr/research
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /tr/research

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: Cannot GET /tr/research
**Date:** 2025-12-10T22:49:30.280Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /tr/research
```

**Stack Trace:**
```
NotFoundException: Cannot GET /tr/research
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /tr/research

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-003: Cannot GET /tr/team
**Date:** 2025-12-10T22:49:31.466Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /tr/team
```

**Stack Trace:**
```
NotFoundException: Cannot GET /tr/team
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /tr/team

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-004: Cannot GET /
**Date:** 2025-12-10T22:49:32.033Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /
```

**Stack Trace:**
```
NotFoundException: Cannot GET /
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-005: Unauthorized
**Date:** 2025-12-10T22:51:54.791Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/auth/profile

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---



### ERROR-001: Unauthorized
**Date:** 2025-12-11T20:16:48.745Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/auth/profile

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-001: Unauthorized
**Date:** 2025-12-11T20:53:27.287Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/auth/profile

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: Invalid email or password
**Date:** 2025-12-11T20:54:13.598Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-003: Invalid email or password
**Date:** 2025-12-11T20:54:13.924Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-004: Invalid email or password
**Date:** 2025-12-11T20:54:19.585Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-005: Invalid email or password
**Date:** 2025-12-11T20:54:19.935Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-001: Store with ID cmitjjtck000a8s2iv9fax7nn not found
**Date:** 2025-12-11T20:59:00.888Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Store with ID cmitjjtck000a8s2iv9fax7nn not found
```

**Stack Trace:**
```
NotFoundException: Store with ID cmitjjtck000a8s2iv9fax7nn not found
    at StoresService.findOne (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/stores/stores.service.ts:74:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmiyyvv1y0002cap8jhwdf4fr
- Tenant: cmiyyvv1t0000cap8cgznfbgs
- Action: GET /api/v1/stores/cmitjjtck000a8s2iv9fax7nn

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: Store with ID cmitjjtck000a8s2iv9fax7nn not found
**Date:** 2025-12-11T20:59:01.903Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Store with ID cmitjjtck000a8s2iv9fax7nn not found
```

**Stack Trace:**
```
NotFoundException: Store with ID cmitjjtck000a8s2iv9fax7nn not found
    at StoresService.findOne (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/stores/stores.service.ts:74:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmiyyvv1y0002cap8jhwdf4fr
- Tenant: cmiyyvv1t0000cap8cgznfbgs
- Action: GET /api/v1/stores/cmitjjtck000a8s2iv9fax7nn

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-003: Store with ID cmitjjtck000a8s2iv9fax7nn not found
**Date:** 2025-12-11T20:59:03.910Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Store with ID cmitjjtck000a8s2iv9fax7nn not found
```

**Stack Trace:**
```
NotFoundException: Store with ID cmitjjtck000a8s2iv9fax7nn not found
    at StoresService.findOne (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/stores/stores.service.ts:74:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmiyyvv1y0002cap8jhwdf4fr
- Tenant: cmiyyvv1t0000cap8cgznfbgs
- Action: GET /api/v1/stores/cmitjjtck000a8s2iv9fax7nn

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-004: Store with ID cmitjjtck000a8s2iv9fax7nn not found
**Date:** 2025-12-11T20:59:56.723Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Store with ID cmitjjtck000a8s2iv9fax7nn not found
```

**Stack Trace:**
```
NotFoundException: Store with ID cmitjjtck000a8s2iv9fax7nn not found
    at StoresService.findOne (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/stores/stores.service.ts:74:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmiyyvv1y0002cap8jhwdf4fr
- Tenant: cmiyyvv1t0000cap8cgznfbgs
- Action: GET /api/v1/stores/cmitjjtck000a8s2iv9fax7nn

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-005: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:57

  73 const responseTime = Date.now() - startTime;
  74 
  75 // Log interaction
→ 76 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
**Date:** 2025-12-11T21:00:11.146Z  
**Module:** ai-assistant  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```

Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:57

  73 const responseTime = Date.now() - startTime;
  74 
  75 // Log interaction
→ 76 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
```

**Stack Trace:**
```
PrismaClientKnownRequestError: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:57

  73 const responseTime = Date.now() - startTime;
  74 
  75 // Log interaction
→ 76 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
    at $n.handleRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:7315)
    at $n.handleAndLogRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6307)
    at async l (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:130:9633)
    at async AiAssistantService.executePrompt (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:76:25)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/ai-assistant/execute

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-001: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:57

  81 const responseTime = Date.now() - startTime;
  82 
  83 // Log interaction
→ 84 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
**Date:** 2025-12-11T21:24:46.947Z  
**Module:** ai-assistant  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```

Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:57

  81 const responseTime = Date.now() - startTime;
  82 
  83 // Log interaction
→ 84 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
```

**Stack Trace:**
```
PrismaClientKnownRequestError: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:57

  81 const responseTime = Date.now() - startTime;
  82 
  83 // Log interaction
→ 84 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
    at $n.handleRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:7315)
    at $n.handleAndLogRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6307)
    at async l (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:130:9633)
    at async AiAssistantService.executePrompt (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:25)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/ai-assistant/execute

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:57

  81 const responseTime = Date.now() - startTime;
  82 
  83 // Log interaction
→ 84 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
**Date:** 2025-12-11T21:24:49.573Z  
**Module:** ai-assistant  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```

Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:57

  81 const responseTime = Date.now() - startTime;
  82 
  83 // Log interaction
→ 84 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
```

**Stack Trace:**
```
PrismaClientKnownRequestError: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:57

  81 const responseTime = Date.now() - startTime;
  82 
  83 // Log interaction
→ 84 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
    at $n.handleRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:7315)
    at $n.handleAndLogRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6307)
    at async l (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:130:9633)
    at async AiAssistantService.executePrompt (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:25)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/ai-assistant/execute

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-003: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:57

  81 const responseTime = Date.now() - startTime;
  82 
  83 // Log interaction
→ 84 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
**Date:** 2025-12-11T21:24:52.255Z  
**Module:** ai-assistant  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```

Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:57

  81 const responseTime = Date.now() - startTime;
  82 
  83 // Log interaction
→ 84 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
```

**Stack Trace:**
```
PrismaClientKnownRequestError: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:57

  81 const responseTime = Date.now() - startTime;
  82 
  83 // Log interaction
→ 84 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
    at $n.handleRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:7315)
    at $n.handleAndLogRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6307)
    at async l (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:130:9633)
    at async AiAssistantService.executePrompt (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:25)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/ai-assistant/execute

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-004: Unauthorized
**Date:** 2025-12-11T21:44:52.813Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/auth/profile

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-005: Lease with ID 1 not found
**Date:** 2025-12-11T21:52:51.259Z  
**Module:** leases  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Lease with ID 1 not found
```

**Stack Trace:**
```
NotFoundException: Lease with ID 1 not found
    at LeasesService.findOne (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/leases/leases.service.ts:80:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmiyyvv1y0002cap8jhwdf4fr
- Tenant: cmiyyvv1t0000cap8cgznfbgs
- Action: GET /api/v1/leases/1

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-006: Lease with ID 1 not found
**Date:** 2025-12-11T21:52:52.297Z  
**Module:** leases  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Lease with ID 1 not found
```

**Stack Trace:**
```
NotFoundException: Lease with ID 1 not found
    at LeasesService.findOne (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/leases/leases.service.ts:80:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmiyyvv1y0002cap8jhwdf4fr
- Tenant: cmiyyvv1t0000cap8cgznfbgs
- Action: GET /api/v1/leases/1

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-007: Lease with ID 1 not found
**Date:** 2025-12-11T21:52:54.304Z  
**Module:** leases  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Lease with ID 1 not found
```

**Stack Trace:**
```
NotFoundException: Lease with ID 1 not found
    at LeasesService.findOne (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/leases/leases.service.ts:80:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmiyyvv1y0002cap8jhwdf4fr
- Tenant: cmiyyvv1t0000cap8cgznfbgs
- Action: GET /api/v1/leases/1

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-008: Lease with ID 1 not found
**Date:** 2025-12-11T21:52:58.313Z  
**Module:** leases  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Lease with ID 1 not found
```

**Stack Trace:**
```
NotFoundException: Lease with ID 1 not found
    at LeasesService.findOne (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/leases/leases.service.ts:80:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmiyyvv1y0002cap8jhwdf4fr
- Tenant: cmiyyvv1t0000cap8cgznfbgs
- Action: GET /api/v1/leases/1

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-009: 
Invalid `this.prisma.userSession.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/session/session.service.ts:17:51

  14   timestamp: new Date().toISOString(),
  15 };
  16 
→ 17 const session = await this.prisma.userSession.create(
Foreign key constraint violated: `user_sessions_tenantId_fkey (index)`
**Date:** 2025-12-11T21:53:52.764Z  
**Module:** session  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```

Invalid `this.prisma.userSession.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/session/session.service.ts:17:51

  14   timestamp: new Date().toISOString(),
  15 };
  16 
→ 17 const session = await this.prisma.userSession.create(
Foreign key constraint violated: `user_sessions_tenantId_fkey (index)`
```

**Stack Trace:**
```
PrismaClientKnownRequestError: 
Invalid `this.prisma.userSession.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/session/session.service.ts:17:51

  14   timestamp: new Date().toISOString(),
  15 };
  16 
→ 17 const session = await this.prisma.userSession.create(
Foreign key constraint violated: `user_sessions_tenantId_fkey (index)`
    at $n.handleRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:7315)
    at $n.handleAndLogRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6307)
    at async l (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:130:9633)
    at async SessionService.exportSession (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/session/session.service.ts:17:21)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/session/export

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---


### ERROR-001: Cannot GET /en/research
**Date:** 2025-12-12T17:27:41.154Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /en/research
```

**Stack Trace:**
```
NotFoundException: Cannot GET /en/research
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /en/research

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: Cannot GET /
**Date:** 2025-12-12T17:27:44.571Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /
```

**Stack Trace:**
```
NotFoundException: Cannot GET /
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-003: Cannot GET /en/contact
**Date:** 2025-12-12T17:29:19.330Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /en/contact
```

**Stack Trace:**
```
NotFoundException: Cannot GET /en/contact
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /en/contact

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-001: Invalid email or password
**Date:** 2025-12-12T17:32:45.285Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: Invalid email or password
**Date:** 2025-12-12T17:32:52.758Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-003: Invalid email or password
**Date:** 2025-12-12T17:33:02.740Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-001: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:57

  81 const responseTime = Date.now() - startTime;
  82 
  83 // Log interaction
→ 84 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
**Date:** 2025-12-12T17:35:13.688Z  
**Module:** ai-assistant  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```

Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:57

  81 const responseTime = Date.now() - startTime;
  82 
  83 // Log interaction
→ 84 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
```

**Stack Trace:**
```
PrismaClientKnownRequestError: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:57

  81 const responseTime = Date.now() - startTime;
  82 
  83 // Log interaction
→ 84 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
    at $n.handleRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:7315)
    at $n.handleAndLogRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6307)
    at async l (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:130:9633)
    at async AiAssistantService.executePrompt (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:25)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/ai-assistant/execute

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: Invalid email or password
**Date:** 2025-12-12T17:39:13.488Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-003: Invalid email or password
**Date:** 2025-12-12T17:39:13.498Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-004: Invalid email or password
**Date:** 2025-12-12T17:39:22.525Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-005: Invalid email or password
**Date:** 2025-12-12T17:39:22.816Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-006: Invalid email or password
**Date:** 2025-12-12T17:39:34.567Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-007: ThrottlerException: Too Many Requests
**Date:** 2025-12-12T17:39:34.577Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
ThrottlerException: Too Many Requests
```

**Stack Trace:**
```
ThrottlerException: ThrottlerException: Too Many Requests
    at ThrottlerGuard.throwThrottlingException (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:242:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ThrottlerGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:184:7)
    at async ThrottlerGuard.canActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:132:9)
    at async GuardsConsumer.tryActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/guards/guards-consumer.js:16:17)
    at async canActivateFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:135:33)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:42:31
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-008: ThrottlerException: Too Many Requests
**Date:** 2025-12-12T17:39:40.188Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
ThrottlerException: Too Many Requests
```

**Stack Trace:**
```
ThrottlerException: ThrottlerException: Too Many Requests
    at ThrottlerGuard.throwThrottlingException (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:242:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ThrottlerGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:184:7)
    at async ThrottlerGuard.canActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:132:9)
    at async GuardsConsumer.tryActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/guards/guards-consumer.js:16:17)
    at async canActivateFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:135:33)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:42:31
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-009: ThrottlerException: Too Many Requests
**Date:** 2025-12-12T17:40:16.793Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
ThrottlerException: Too Many Requests
```

**Stack Trace:**
```
ThrottlerException: ThrottlerException: Too Many Requests
    at ThrottlerGuard.throwThrottlingException (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:242:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ThrottlerGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:184:7)
    at async ThrottlerGuard.canActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:132:9)
    at async GuardsConsumer.tryActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/guards/guards-consumer.js:16:17)
    at async canActivateFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:135:33)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:42:31
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-001: Unauthorized
**Date:** 2025-12-12T18:08:02.576Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/auth/profile

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: 
Invalid `this.prisma.budget.findUnique()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/budget/budget.service.ts:24:47

  21  */
  22 async create(tenantId: string, createBudgetDto: CreateBudgetDto) {
  23   // Check if budget already exists for this period and scope
→ 24   const existing = await this.prisma.budget.findUnique({
         where: {
           tenantId_year_quarter_scope_scopeValue: {
             tenantId: "cmj35knsk00027zqu6booww7p",
             year: 2025,
             quarter: 1,
             scope: "COMPANY",
       +     scopeValue: String
           }
         }
       })

Argument `scopeValue` must not be null.
**Date:** 2025-12-12T18:09:25.125Z  
**Module:** budget  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```

Invalid `this.prisma.budget.findUnique()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/budget/budget.service.ts:24:47

  21  */
  22 async create(tenantId: string, createBudgetDto: CreateBudgetDto) {
  23   // Check if budget already exists for this period and scope
→ 24   const existing = await this.prisma.budget.findUnique({
         where: {
           tenantId_year_quarter_scope_scopeValue: {
             tenantId: "cmj35knsk00027zqu6booww7p",
             year: 2025,
             quarter: 1,
             scope: "COMPANY",
       +     scopeValue: String
           }
         }
       })

Argument `scopeValue` must not be null.
```

**Stack Trace:**
```
PrismaClientValidationError: 
Invalid `this.prisma.budget.findUnique()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/budget/budget.service.ts:24:47

  21  */
  22 async create(tenantId: string, createBudgetDto: CreateBudgetDto) {
  23   // Check if budget already exists for this period and scope
→ 24   const existing = await this.prisma.budget.findUnique({
         where: {
           tenantId_year_quarter_scope_scopeValue: {
             tenantId: "cmj35knsk00027zqu6booww7p",
             year: 2025,
             quarter: 1,
             scope: "COMPANY",
       +     scopeValue: String
           }
         }
       })

Argument `scopeValue` must not be null.
    at wn (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:29:1363)
    at $n.handleRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6958)
    at $n.handleAndLogRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6307)
    at async l (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:130:9633)
    at async BudgetService.create (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/budget/budget.service.ts:24:22)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmj35knsl00047zqucyehw0nn
- Tenant: cmj35knsk00027zqu6booww7p
- Action: POST /api/v1/budget

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---


### ERROR-001: Invalid email or password
**Date:** 2025-12-12T23:14:37.763Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: Invalid email or password
**Date:** 2025-12-12T23:15:01.386Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-003: Invalid email or password
**Date:** 2025-12-12T23:15:01.598Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-004: Invalid email or password
**Date:** 2025-12-12T23:17:29.647Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-005: Invalid email or password
**Date:** 2025-12-12T23:17:29.860Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-006: Invalid email or password
**Date:** 2025-12-12T23:18:29.064Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-007: ThrottlerException: Too Many Requests
**Date:** 2025-12-12T23:18:29.079Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
ThrottlerException: Too Many Requests
```

**Stack Trace:**
```
ThrottlerException: ThrottlerException: Too Many Requests
    at ThrottlerGuard.throwThrottlingException (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:242:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ThrottlerGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:184:7)
    at async ThrottlerGuard.canActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:132:9)
    at async GuardsConsumer.tryActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/guards/guards-consumer.js:16:17)
    at async canActivateFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:135:33)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:42:31
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-008: ThrottlerException: Too Many Requests
**Date:** 2025-12-12T23:18:51.183Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
ThrottlerException: Too Many Requests
```

**Stack Trace:**
```
ThrottlerException: ThrottlerException: Too Many Requests
    at ThrottlerGuard.throwThrottlingException (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:242:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ThrottlerGuard.handleRequest (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:184:7)
    at async ThrottlerGuard.canActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/throttler/src/throttler.guard.ts:132:9)
    at async GuardsConsumer.tryActivate (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/guards/guards-consumer.js:16:17)
    at async canActivateFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:135:33)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:42:31
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-001: User with this email already exists
**Date:** 2025-12-12T23:21:33.745Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
User with this email already exists
```

**Stack Trace:**
```
ConflictException: User with this email already exists
    at AuthService.register (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/auth.service.ts:101:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/register

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---




### ERROR-001: Cannot GET /
**Date:** 2025-12-16T18:18:37.134Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /
```

**Stack Trace:**
```
NotFoundException: Cannot GET /
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: Cannot GET /en/contact
**Date:** 2025-12-16T18:18:40.288Z  
**Module:** unknown  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Cannot GET /en/contact
```

**Stack Trace:**
```
NotFoundException: Cannot GET /en/contact
    at callback (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/routes-resolver.js:77:19)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
    at /Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:280:10)
    at urlencodedParser (/Users/tugra/Desktop/rentorgin/node_modules/body-parser/lib/types/urlencoded.js:94:7)
    at Layer.handle [as handle_request] (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/tugra/Desktop/rentorgin/node_modules/express/lib/router/index.js:328:13)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /en/contact

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-001: Unauthorized
**Date:** 2025-12-16T18:21:09.912Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/auth/profile

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---


### ERROR-001: Unauthorized
**Date:** 2025-12-17T02:36:44.340Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/auth/profile

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---


### ERROR-001: Unauthorized
**Date:** 2026-01-03T11:18:11.945Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/auth/profile

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-002: Invalid refresh token
**Date:** 2026-01-03T11:18:11.964Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid refresh token
```

**Stack Trace:**
```
UnauthorizedException: Invalid refresh token
    at AuthService.refreshToken (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/auth.service.ts:180:13)
    at AuthController.refresh (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/auth.controller.ts:56:29)
    at /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:38:29
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/refresh

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-003: User with this email already exists
**Date:** 2026-01-03T11:18:39.403Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
User with this email already exists
```

**Stack Trace:**
```
ConflictException: User with this email already exists
    at AuthService.register (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/auth.service.ts:101:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/register

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-004: Invalid email or password
**Date:** 2026-01-03T11:18:54.842Z  
**Module:** auth  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Invalid email or password
```

**Stack Trace:**
```
UnauthorizedException: Invalid email or password
    at LocalStrategy.validate (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/auth/strategies/local.strategy.ts:31:13)
    at async LocalStrategy.callback [as _verify] (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:44)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/auth/login

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-005: Unauthorized
**Date:** 2026-01-03T11:39:42.799Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/stores

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-006: Store with ID 3 not found
**Date:** 2026-01-03T11:45:11.838Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Store with ID 3 not found
```

**Stack Trace:**
```
NotFoundException: Store with ID 3 not found
    at StoresService.findOne (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/stores/stores.service.ts:74:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmj3hnj8f00028td519ihyx8x
- Tenant: cmj3hnj8c00008td5jseun023
- Action: GET /api/v1/stores/3

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-007: Store with ID 3 not found
**Date:** 2026-01-03T11:45:12.853Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Store with ID 3 not found
```

**Stack Trace:**
```
NotFoundException: Store with ID 3 not found
    at StoresService.findOne (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/stores/stores.service.ts:74:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmj3hnj8f00028td519ihyx8x
- Tenant: cmj3hnj8c00008td5jseun023
- Action: GET /api/v1/stores/3

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-008: Store with ID 3 not found
**Date:** 2026-01-03T11:45:14.869Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Store with ID 3 not found
```

**Stack Trace:**
```
NotFoundException: Store with ID 3 not found
    at StoresService.findOne (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/stores/stores.service.ts:74:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmj3hnj8f00028td519ihyx8x
- Tenant: cmj3hnj8c00008td5jseun023
- Action: GET /api/v1/stores/3

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-009: Store with ID 3 not found
**Date:** 2026-01-03T11:45:18.888Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Store with ID 3 not found
```

**Stack Trace:**
```
NotFoundException: Store with ID 3 not found
    at StoresService.findOne (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/stores/stores.service.ts:74:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmj3hnj8f00028td519ihyx8x
- Tenant: cmj3hnj8c00008td5jseun023
- Action: GET /api/v1/stores/3

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-010: Bad Request Exception
**Date:** 2026-01-03T11:48:26.075Z  
**Module:** expenses  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Bad Request Exception
```

**Stack Trace:**
```
BadRequestException: Bad Request Exception
    at ValidationPipe.exceptionFactory (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/common/pipes/validation.pipe.js:101:20)
    at ValidationPipe.transform (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/common/pipes/validation.pipe.js:74:30)
    at async resolveParamValue (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:148:23)
    at async Promise.all (index 0)
    at async pipesFn (/Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:151:13)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:37:30
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmj3hnj8f00028td519ihyx8x
- Tenant: cmj3hnj8c00008td5jseun023
- Action: POST /api/v1/expenses

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-011: 
Invalid `this.prisma.budget.findUnique()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/budget/budget.service.ts:24:47

  21  */
  22 async create(tenantId: string, createBudgetDto: CreateBudgetDto) {
  23   // Check if budget already exists for this period and scope
→ 24   const existing = await this.prisma.budget.findUnique({
         where: {
           tenantId_year_quarter_scope_scopeValue: {
             tenantId: "cmj3hnj8c00008td5jseun023",
             year: 2026,
             scope: "COMPANY",
             scopeValue: null,
       +     quarter: Int
           }
         }
       })

Argument `quarter` must not be null.
**Date:** 2026-01-03T11:51:02.725Z  
**Module:** budget  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```

Invalid `this.prisma.budget.findUnique()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/budget/budget.service.ts:24:47

  21  */
  22 async create(tenantId: string, createBudgetDto: CreateBudgetDto) {
  23   // Check if budget already exists for this period and scope
→ 24   const existing = await this.prisma.budget.findUnique({
         where: {
           tenantId_year_quarter_scope_scopeValue: {
             tenantId: "cmj3hnj8c00008td5jseun023",
             year: 2026,
             scope: "COMPANY",
             scopeValue: null,
       +     quarter: Int
           }
         }
       })

Argument `quarter` must not be null.
```

**Stack Trace:**
```
PrismaClientValidationError: 
Invalid `this.prisma.budget.findUnique()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/budget/budget.service.ts:24:47

  21  */
  22 async create(tenantId: string, createBudgetDto: CreateBudgetDto) {
  23   // Check if budget already exists for this period and scope
→ 24   const existing = await this.prisma.budget.findUnique({
         where: {
           tenantId_year_quarter_scope_scopeValue: {
             tenantId: "cmj3hnj8c00008td5jseun023",
             year: 2026,
             scope: "COMPANY",
             scopeValue: null,
       +     quarter: Int
           }
         }
       })

Argument `quarter` must not be null.
    at wn (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:29:1363)
    at $n.handleRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6958)
    at $n.handleAndLogRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6307)
    at async l (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:130:9633)
    at async BudgetService.create (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/budget/budget.service.ts:24:22)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmj3hnj8f00028td519ihyx8x
- Tenant: cmj3hnj8c00008td5jseun023
- Action: POST /api/v1/budget

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-012: 
Invalid `this.prisma.budget.findUnique()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/budget/budget.service.ts:24:47

  21  */
  22 async create(tenantId: string, createBudgetDto: CreateBudgetDto) {
  23   // Check if budget already exists for this period and scope
→ 24   const existing = await this.prisma.budget.findUnique({
         where: {
           tenantId_year_quarter_scope_scopeValue: {
             tenantId: "cmj3hnj8c00008td5jseun023",
             year: 2026,
             scope: "COMPANY",
             scopeValue: null,
       +     quarter: Int
           }
         }
       })

Argument `quarter` must not be null.
**Date:** 2026-01-03T11:51:06.226Z  
**Module:** budget  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```

Invalid `this.prisma.budget.findUnique()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/budget/budget.service.ts:24:47

  21  */
  22 async create(tenantId: string, createBudgetDto: CreateBudgetDto) {
  23   // Check if budget already exists for this period and scope
→ 24   const existing = await this.prisma.budget.findUnique({
         where: {
           tenantId_year_quarter_scope_scopeValue: {
             tenantId: "cmj3hnj8c00008td5jseun023",
             year: 2026,
             scope: "COMPANY",
             scopeValue: null,
       +     quarter: Int
           }
         }
       })

Argument `quarter` must not be null.
```

**Stack Trace:**
```
PrismaClientValidationError: 
Invalid `this.prisma.budget.findUnique()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/budget/budget.service.ts:24:47

  21  */
  22 async create(tenantId: string, createBudgetDto: CreateBudgetDto) {
  23   // Check if budget already exists for this period and scope
→ 24   const existing = await this.prisma.budget.findUnique({
         where: {
           tenantId_year_quarter_scope_scopeValue: {
             tenantId: "cmj3hnj8c00008td5jseun023",
             year: 2026,
             scope: "COMPANY",
             scopeValue: null,
       +     quarter: Int
           }
         }
       })

Argument `quarter` must not be null.
    at wn (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:29:1363)
    at $n.handleRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6958)
    at $n.handleAndLogRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6307)
    at async l (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:130:9633)
    at async BudgetService.create (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/budget/budget.service.ts:24:22)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: cmj3hnj8f00028td519ihyx8x
- Tenant: cmj3hnj8c00008td5jseun023
- Action: POST /api/v1/budget

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-013: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:57

  81 const responseTime = Date.now() - startTime;
  82 
  83 // Log interaction
→ 84 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
**Date:** 2026-01-03T11:52:07.882Z  
**Module:** ai-assistant  
**Severity:** CRITICAL  
**Status:** Open  

**Error Message:**
```

Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:57

  81 const responseTime = Date.now() - startTime;
  82 
  83 // Log interaction
→ 84 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
```

**Stack Trace:**
```
PrismaClientKnownRequestError: 
Invalid `this.prisma.aIInteraction.create()` invocation in
/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:57

  81 const responseTime = Date.now() - startTime;
  82 
  83 // Log interaction
→ 84 const interaction = await this.prisma.aIInteraction.create(
Foreign key constraint violated: `ai_interactions_tenantId_fkey (index)`
    at $n.handleRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:7315)
    at $n.handleAndLogRequestError (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:121:6307)
    at async l (/Users/tugra/Desktop/rentorgin/node_modules/@prisma/client/runtime/library.js:130:9633)
    at async AiAssistantService.executePrompt (/Users/tugra/Desktop/rentorgin/apps/api/src/modules/ai-assistant/ai-assistant.service.ts:84:25)
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/tugra/Desktop/rentorgin/node_modules/@nestjs/core/router/router-proxy.js:9:17
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: POST /api/v1/ai-assistant/execute

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-014: Unauthorized
**Date:** 2026-01-03T12:21:59.021Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/stores

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-015: Unauthorized
**Date:** 2026-01-03T12:22:00.032Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/stores

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-016: Unauthorized
**Date:** 2026-01-03T12:22:02.041Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/stores

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-017: Unauthorized
**Date:** 2026-01-03T12:23:13.251Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/stores

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-018: Unauthorized
**Date:** 2026-01-03T12:23:14.261Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/stores

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-019: Unauthorized
**Date:** 2026-01-03T12:23:16.272Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/stores

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-020: Unauthorized
**Date:** 2026-01-03T12:23:20.284Z  
**Module:** stores  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/stores

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-021: Unauthorized
**Date:** 2026-01-03T12:23:40.890Z  
**Module:** leases  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/leases

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---

### ERROR-022: Unauthorized
**Date:** 2026-01-03T12:23:40.892Z  
**Module:** leases  
**Severity:** HIGH  
**Status:** Open  

**Error Message:**
```
Unauthorized
```

**Stack Trace:**
```
UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (/Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:60:30)
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:44:124
    at /Users/tugra/Desktop/rentorgin/apps/api/node_modules/@nestjs/passport/dist/auth.guard.js:83:24
    at allFailed (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at strategy.fail (/Users/tugra/Desktop/rentorgin/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /Users/tugra/Desktop/rentorgin/node_modules/passport-jwt/lib/strategy.js:106:33
    at /Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:190:16
    at getSecret (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/tugra/Desktop/rentorgin/node_modules/jsonwebtoken/verify.js:101:10)
```

**Context:**
- User: Unknown
- Tenant: Unknown
- Action: GET /api/v1/leases/expiring

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined

---




