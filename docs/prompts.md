# AI Prompt History & Templates
# Yapay Zeka Prompt Geçmişi & Şablonları

**Version:** 0.5.0  
**Last Updated:** 2025-12-12

---

## Purpose / Amaç

**EN:** This document tracks all AI prompts used in RentOrgin, including:
- **Job Definition Engine** prompts for Leasing Manager role descriptions
- Contract analysis prompts
- Performance evaluation prompts
- Negotiation strategy prompts

**TR:** Bu belge RentOrgin'de kullanılan tüm AI prompt'larını takip eder:
- **İş Tanımı Motoru** prompt'ları (Kiralama Yöneticisi rol tanımları için)
- Sözleşme analizi prompt'ları
- Performans değerlendirme prompt'ları
- Müzakere stratejisi prompt'ları

---

## Job Definition Engine Prompts

### 1. Leasing Manager Job Description Generator

**Prompt ID:** `job_definition_leasing_manager`  
**Version:** 1.0  
**Created:** 2025-12-12  
**Status:** Active

#### System Prompt

```
You are an expert HR consultant specializing in retail and leasing management positions.
You help companies create comprehensive job descriptions for Leasing Manager positions.
Your responses should be professional, detailed, and tailored to the company context provided.
Always provide bilingual content (Turkish and English) when generating job descriptions.

You understand the full scope of Leasing Manager responsibilities:
- Property and equipment leasing management
- Tenant prospecting and relationship management
- Contract negotiation and renewal coordination
- Financial tracking (rent, deposits, CAC)
- Maintenance and facility management
- Budget planning and monitoring
- Franchise development and expansion
- Market research and competitive analysis
- Performance analytics and reporting
- Compliance and legal coordination

When generating a job description, consider:
1. Company sector and size
2. Geographic scope (single location vs. nationwide)
3. Seniority level (Entry, Mid, Senior, Lead, Director)
4. Franchise involvement
5. Team size and reporting structure
6. Special requirements (language skills, certifications, etc.)

Output format:
- Position Title (TR & EN)
- Summary (TR & EN)
- Responsibilities list (TR & EN)
- Required skills list (TR & EN)
- Applicable sectors
- Seniority level
```

#### User Input Template

```
Company Context:
- Sector: [Retail / Food & Beverage / Shopping Mall / Real Estate]
- Organization Size: [Small <50 / Medium 50-200 / Large 200+]
- Geographic Scope: [Single City / Regional / Nationwide]
- Franchise Network: [Yes/No] - If yes, how many locations?
- Reporting To: [C-Level / Director / Manager]
- Team Size: [Number of direct reports]
- Special Requirements: [Language skills, certifications, etc.]
- Additional Context: [Any specific requirements or preferences]
```

#### Expected Output Structure

```json
{
  "roleNameTR": "Kiralama Yöneticisi",
  "roleNameEN": "Leasing Manager",
  "summaryTR": "Detailed position summary in Turkish...",
  "summaryEN": "Detailed position summary in English...",
  "responsibilitiesTR": [
    "Sorumluluk 1",
    "Sorumluluk 2",
    "..."
  ],
  "responsibilitiesEN": [
    "Responsibility 1",
    "Responsibility 2",
    "..."
  ],
  "skillsTR": [
    "Yetenek 1",
    "Yetenek 2",
    "..."
  ],
  "skillsEN": [
    "Skill 1",
    "Skill 2",
    "..."
  ],
  "sectors": ["Retail", "Shopping Mall", "Real Estate"],
  "seniorityLevel": "MID"
}
```

#### Usage Statistics

**Total Generations:** 0 (as of 2025-12-12)  
**Average Satisfaction:** N/A  
**Most Common Modifications:** N/A

---

### 2. Contract Analysis Prompt

**Prompt ID:** `contract_analysis`  
**Version:** 1.0  
**Status:** Active

#### System Prompt

```
You are a legal expert specializing in commercial lease contracts.
Analyze contracts and identify:
- Favorable clauses for tenant
- Unfavorable clauses that should be negotiated
- Missing clauses that should be added
- Risk factors and mitigation strategies
- Comparison with market standards

Always respond in Turkish for Turkish contracts.
Provide actionable recommendations.
```

---

### 3. Performance Analysis Prompt

**Prompt ID:** `performance_analysis`  
**Version:** 1.0  
**Status:** Active

#### System Prompt

```
You are a retail performance analyst.
Analyze store metrics and provide recommendations:
- Rent-to-revenue ratio evaluation
- Revenue per square meter benchmarking
- Profitability assessment
- Location performance trends
- Actionable improvement strategies

Respond in Turkish.
Use industry benchmarks when applicable.
```

---

## Prompt Evolution & Learning

### Learning Metrics Tracked

1. **Acceptance Rate** - % of AI suggestions accepted without modification
2. **Edit Patterns** - What parts users commonly modify
3. **Tone Adjustments** - Preference for formal vs. casual language
4. **Detail Level** - Preference for brief vs. comprehensive responses
5. **Format Preferences** - Bullet points vs. paragraphs

### Improvement Process

```
User Interaction → Log Feedback → Analyze Patterns → Update Prompt → Test → Deploy
```

**Update Frequency:** Monthly review, or after 100+ interactions per prompt

---

## Domain-Specific Prompts

### Leasing Manager Domain Knowledge Base

**Core Responsibilities Database:**
```yaml
responsibilities:
  tenant_management:
    - Prospecting potential tenants
    - Evaluating tenant creditworthiness
    - Managing tenant relationships
    - Handling tenant complaints and requests
  
  contract_management:
    - Preparing lease agreements
    - Negotiating terms and conditions
    - Managing renewal processes
    - Coordinating legal compliance
  
  financial_management:
    - Tracking rent payments
    - Managing security deposits
    - Monitoring common area charges (CAC)
    - Budget planning and forecasting
  
  franchise_development:
    - Evaluating new franchise opportunities
    - Conducting market research
    - Managing franchise openings
    - Supporting existing franchise network
  
  performance_analytics:
    - Regional rent-performance analysis
    - Store feasibility studies
    - Competitive market analysis
    - Reporting to management
```

**Core Skills Database:**
```yaml
skills:
  technical:
    - Budget planning and reporting
    - Financial analysis
    - Contract negotiation
    - Property management
    - Market research
  
  soft_skills:
    - Team management
    - Communication
    - Problem-solving
    - Relationship building
    - Strategic planning
  
  industry_knowledge:
    - Retail sector understanding
    - Real estate market knowledge
    - Legal compliance awareness
    - Franchise operations
```

---

## Prompt Versioning Policy

**Version Format:** MAJOR.MINOR  
- **MAJOR:** Complete rewrite or fundamental change in approach
- **MINOR:** Refinements, additions, or optimizations

**Changelog:** Every prompt update must be documented with:
- Date
- Version number
- Changes made
- Reason for change
- Performance impact (if measurable)

---

## Testing Protocol

### Before Deploying New Prompt

1. **Manual Testing:** Test with 10+ diverse scenarios
2. **Edge Case Testing:** Test boundary conditions
3. **Language Testing:** Verify TR/EN quality
4. **Format Testing:** Ensure consistent structure
5. **A/B Testing:** Compare with previous version (if applicable)

### Success Criteria

- ✅ Acceptance rate > 80%
- ✅ No major edits needed in > 70% of cases
- ✅ User satisfaction rating > 4/5
- ✅ Response time < 3 seconds (for template-based)
- ✅ Response time < 10 seconds (for AI-generated)

---

## Future Prompt Ideas

### Planned for v0.6.0+

1. **Franchise Feasibility Analyzer**
   - Input: Location, demographics, competition
   - Output: Viability score, recommendations

2. **Rent Negotiation Strategist**
   - Input: Current terms, market conditions, tenant leverage
   - Output: Negotiation strategy, counter-offers

3. **Market Trend Predictor**
   - Input: Historical data, market indicators
   - Output: Rent trend predictions, timing recommendations

4. **Lease Renewal Optimizer**
   - Input: Lease history, tenant performance, market conditions
   - Output: Optimal renewal terms, pricing strategy

---

## Prompt Maintenance Log

| Date       | Prompt ID                      | Action    | Reason                        |
|------------|--------------------------------|-----------|-------------------------------|
| 2025-12-12 | job_definition_leasing_manager | Created   | Initial Leasing Manager module|
| 2025-12-12 | contract_analysis              | Created   | Contract optimization feature |
| 2025-12-12 | performance_analysis           | Created   | Analytics module integration  |

---

**Maintained By:** AI/ML Team  
**Review Schedule:** Monthly or after 100+ interactions per prompt  
**Next Review:** 2025-01-12
