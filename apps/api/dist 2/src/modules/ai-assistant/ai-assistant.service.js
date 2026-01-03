"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAssistantService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../database/prisma.service");
const job_descriptions_service_1 = require("../leasing-manager/job-descriptions.service");
const axios_1 = __importDefault(require("axios"));
let AiAssistantService = class AiAssistantService {
    constructor(prisma, configService, jobDescriptionsService) {
        this.prisma = prisma;
        this.configService = configService;
        this.jobDescriptionsService = jobDescriptionsService;
        this.openaiApiKey = this.configService.get('OPENAI_API_KEY') || '';
        this.useRealAI = this.openaiApiKey.startsWith('sk-');
    }
    async executePrompt(promptId, context, userInput) {
        let aiResponse;
        let model = 'mock';
        let tokensUsed = 0;
        const startTime = Date.now();
        if (promptId === 'job_definition_leasing_manager') {
            return this.generateJobDescription(context, userInput);
        }
        if (this.useRealAI) {
            try {
                const systemPrompt = this.getSystemPrompt(promptId);
                const response = await axios_1.default.post('https://api.openai.com/v1/chat/completions', {
                    model: 'gpt-4',
                    messages: [
                        {
                            role: 'system',
                            content: systemPrompt,
                        },
                        {
                            role: 'user',
                            content: userInput,
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 500,
                }, {
                    headers: {
                        'Authorization': `Bearer ${this.openaiApiKey}`,
                        'Content-Type': 'application/json',
                    },
                });
                aiResponse = response.data.choices[0].message.content;
                model = response.data.model;
                tokensUsed = response.data.usage?.total_tokens || 0;
            }
            catch (error) {
                console.error('OpenAI API error:', error);
                aiResponse = 'Üzgünüm, AI servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.';
            }
        }
        else {
            aiResponse = this.generateMockResponse(userInput);
        }
        const responseTime = Date.now() - startTime;
        const interaction = await this.prisma.aIInteraction.create({
            data: {
                tenantId: context.tenantId || 'default-tenant',
                userId: context.userId || 'default-user',
                promptId,
                module: context.module || 'general',
                contextData: JSON.stringify(context),
                userInput,
                aiResponse,
                model,
                tokensUsed: tokensUsed || null,
                responseTime,
            },
        });
        return {
            interactionId: interaction.id,
            response: aiResponse,
            timestamp: interaction.createdAt,
            model,
        };
    }
    async logFeedback(interactionId, feedback) {
        return this.prisma.aIInteraction.update({
            where: { id: interactionId },
            data: {
                wasAccepted: feedback.accepted,
                wasEdited: feedback.edited,
                userEdits: feedback.edits,
                satisfaction: feedback.rating,
            },
        });
    }
    generateMockResponse(userInput) {
        const input = userInput.toLowerCase();
        if (input.includes('performans') || input.includes('analiz')) {
            return `📊 Mağaza performans analizi için şu metriklere bakmanızı öneririm:

1. **Kira/Ciro Oranı:** %25'in altında olmalı (ideal: %15-20)
2. **M² Başına Ciro:** Lokasyona göre değişir ama >1000₺/m² hedeflenmelidir
3. **Trend Analizi:** Son 6 aylık ciro trendine bakın

Detaylı analiz için Analytics sayfasını ziyaret edin.`;
        }
        if (input.includes('sözleşme') || input.includes('kira') || input.includes('yenileme')) {
            return `📄 Kira sözleşmeleri hakkında:

- **Yenileme Zamanlaması:** Süre bitiminden 3-6 ay önce başlatın
- **Müzakere Stratejisi:** Performans verilerinizi (ciro, ziyaretçi sayısı) hazırlayın
- **Piyasa Araştırması:** Benzer lokasyonlardaki kira bedellerini araştırın

Süresi dolmak üzere olan sözleşmeler için "Sözleşmeler" sayfasını kontrol edin.`;
        }
        if (input.includes('avm') || input.includes('mall')) {
            return `🏢 AVM ilişkileri yönetimi için öneriler:

1. **Düzenli İletişim:** AVM yönetimiyle 3 ayda bir görüşün
2. **Sorun Çözme:** Talepleri zamanında takip edin
3. **İlişki Kalitesi:** Puanlamayı güncel tutun

AVM detayları için "AVM'ler" sayfasını ziyaret edin.`;
        }
        return `💡 Size yardımcı olabilmem için lütfen daha spesifik bir soru sorun.

Şu konularda yardımcı olabilirim:
- Mağaza performans analizi
- Kira sözleşmesi optimizasyonu
- AVM ilişkileri yönetimi
- Lokasyon analitiği

Örnek: "Tüm mağazalarımın performansını özetle" veya "Süresi dolmak üzere olan sözleşmeleri listele"`;
    }
    async generateJobDescription(context, userInput) {
        const tenantId = context.tenantId || 'default-tenant';
        const userId = context.userId || 'default-user';
        try {
            let companyContext = {};
            try {
                companyContext = JSON.parse(userInput);
            }
            catch {
                companyContext = this.parseCompanyContextFromText(userInput);
            }
            const jobDescription = await this.jobDescriptionsService.generateFromLeasingManagerTemplate(tenantId, userId, companyContext);
            if (this.useRealAI) {
                try {
                    const systemPrompt = this.getSystemPrompt('job_definition_leasing_manager');
                    const response = await axios_1.default.post('https://api.openai.com/v1/chat/completions', {
                        model: 'gpt-4',
                        messages: [
                            {
                                role: 'system',
                                content: systemPrompt,
                            },
                            {
                                role: 'user',
                                content: `Company Context: ${JSON.stringify(companyContext)}\n\nGenerate a comprehensive job description based on this context.`,
                            },
                        ],
                        temperature: 0.7,
                        max_tokens: 2000,
                    }, {
                        headers: {
                            'Authorization': `Bearer ${this.openaiApiKey}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    return {
                        interactionId: jobDescription.id,
                        response: `Job description generated successfully. ID: ${jobDescription.id}`,
                        timestamp: new Date(),
                        model: 'template-based',
                        jobDescription,
                    };
                }
                catch (error) {
                    console.error('OpenAI API error in job description generation:', error);
                }
            }
            return {
                interactionId: jobDescription.id,
                response: `Job description generated successfully. ID: ${jobDescription.id}`,
                timestamp: new Date(),
                model: 'template-based',
                jobDescription,
            };
        }
        catch (error) {
            console.error('Error generating job description:', error);
            throw error;
        }
    }
    getSystemPrompt(promptId) {
        const prompts = {
            'job_definition_leasing_manager': `You are an expert HR consultant specializing in retail and leasing management positions.
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
- Seniority level`,
            'contract_analysis': `You are a legal expert specializing in commercial lease contracts.
Analyze contracts and identify:
- Favorable clauses for tenant
- Unfavorable clauses that should be negotiated
- Missing clauses that should be added
- Risk factors and mitigation strategies
- Comparison with market standards

Always respond in Turkish for Turkish contracts.
Provide actionable recommendations.`,
            'performance_analysis': `You are a retail performance analyst.
Analyze store metrics and provide recommendations:
- Rent-to-revenue ratio evaluation
- Revenue per square meter benchmarking
- Profitability assessment
- Location performance trends
- Actionable improvement strategies

Respond in Turkish.
Use industry benchmarks when applicable.`,
        };
        return prompts[promptId] || `You are a helpful AI assistant for RentOrgin, a rental management platform.
Provide professional, accurate, and helpful responses in Turkish.
Focus on rental management, lease contracts, store performance, and mall relations.`;
    }
    parseCompanyContextFromText(text) {
        const context = {};
        if (text.toLowerCase().includes('retail') || text.toLowerCase().includes('perakende')) {
            context.sector = 'Retail';
        }
        else if (text.toLowerCase().includes('food') || text.toLowerCase().includes('yiyecek')) {
            context.sector = 'Food & Beverage';
        }
        else if (text.toLowerCase().includes('mall') || text.toLowerCase().includes('avm')) {
            context.sector = 'Shopping Mall';
        }
        if (text.toLowerCase().includes('entry') || text.toLowerCase().includes('giriş')) {
            context.seniorityLevel = 'ENTRY';
        }
        else if (text.toLowerCase().includes('senior') || text.toLowerCase().includes('kıdemli')) {
            context.seniorityLevel = 'SENIOR';
        }
        else if (text.toLowerCase().includes('director') || text.toLowerCase().includes('direktör')) {
            context.seniorityLevel = 'DIRECTOR';
        }
        if (text.toLowerCase().includes('franchise') || text.toLowerCase().includes('franchise')) {
            context.franchiseNetwork = true;
        }
        return context;
    }
};
exports.AiAssistantService = AiAssistantService;
exports.AiAssistantService = AiAssistantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        job_descriptions_service_1.JobDescriptionsService])
], AiAssistantService);
//# sourceMappingURL=ai-assistant.service.js.map