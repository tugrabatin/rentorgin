/**
 * AI Assistant Service  
 * OpenAI integration and prompt management
 * 
 * AI Asistan Servisi
 * OpenAI entegrasyonu ve prompt yönetimi
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
import { JobDescriptionsService } from '../leasing-manager/job-descriptions.service';
import axios from 'axios';

@Injectable()
export class AiAssistantService {
  private openaiApiKey: string;
  private useRealAI: boolean;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private jobDescriptionsService: JobDescriptionsService,
  ) {
    this.openaiApiKey = this.configService.get<string>('OPENAI_API_KEY') || '';
    this.useRealAI = this.openaiApiKey.startsWith('sk-');
  }

  async executePrompt(promptId: string, context: any, userInput: string) {
    let aiResponse: string;
    let model = 'mock';
    let tokensUsed = 0;
    const startTime = Date.now();

    // Special handling for job description generation
    if (promptId === 'job_definition_leasing_manager') {
      return this.generateJobDescription(context, userInput);
    }

    if (this.useRealAI) {
      // Real OpenAI API call
      try {
        const systemPrompt = this.getSystemPrompt(promptId);
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
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
          },
          {
            headers: {
              'Authorization': `Bearer ${this.openaiApiKey}`,
              'Content-Type': 'application/json',
            },
          }
        );

        aiResponse = response.data.choices[0].message.content;
        model = response.data.model;
        tokensUsed = response.data.usage?.total_tokens || 0;
      } catch (error) {
        console.error('OpenAI API error:', error);
        aiResponse = 'Üzgünüm, AI servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.';
      }
    } else {
      // Mock response for development
      aiResponse = this.generateMockResponse(userInput);
    }

    const responseTime = Date.now() - startTime;

    // Log interaction
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

  async logFeedback(interactionId: string, feedback: any) {
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

  /**
   * Generate mock AI response for development
   * Geliştirme için mock AI yanıtı oluştur
   */
  private generateMockResponse(userInput: string): string {
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

  /**
   * Generate job description using AI or template
   * AI veya şablon kullanarak iş tanımı oluştur
   */
  private async generateJobDescription(context: any, userInput: string) {
    const tenantId = context.tenantId || 'default-tenant';
    const userId = context.userId || 'default-user';

    try {
      // Parse company context from user input if provided
      let companyContext: any = {};
      try {
        companyContext = JSON.parse(userInput);
      } catch {
        // If not JSON, try to extract context from text
        companyContext = this.parseCompanyContextFromText(userInput);
      }

      // Use JobDescriptionsService to generate from template
      const jobDescription = await this.jobDescriptionsService.generateFromLeasingManagerTemplate(
        tenantId,
        userId,
        companyContext,
      );

      // If AI is available, enhance with AI
      if (this.useRealAI) {
        try {
          const systemPrompt = this.getSystemPrompt('job_definition_leasing_manager');
          const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
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
            },
            {
              headers: {
                'Authorization': `Bearer ${this.openaiApiKey}`,
                'Content-Type': 'application/json',
              },
            }
          );

          // Parse AI response and update job description if needed
          // For now, return the template-based one
          return {
            interactionId: jobDescription.id,
            response: `Job description generated successfully. ID: ${jobDescription.id}`,
            timestamp: new Date(),
            model: 'template-based',
            jobDescription,
          };
        } catch (error) {
          console.error('OpenAI API error in job description generation:', error);
          // Fall back to template-based
        }
      }

      return {
        interactionId: jobDescription.id,
        response: `Job description generated successfully. ID: ${jobDescription.id}`,
        timestamp: new Date(),
        model: 'template-based',
        jobDescription,
      };
    } catch (error) {
      console.error('Error generating job description:', error);
      throw error;
    }
  }

  /**
   * Get system prompt by prompt ID
   * Prompt ID'ye göre system prompt'u getir
   */
  private getSystemPrompt(promptId: string): string {
    const prompts: Record<string, string> = {
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

    return prompts[promptId] || `You are a helpful AI assistant for BASIS, a rental management platform.
Provide professional, accurate, and helpful responses in Turkish.
Focus on rental management, lease contracts, store performance, and mall relations.`;
  }

  /**
   * Parse company context from text input
   * Metin girişinden şirket bağlamını çıkar
   */
  private parseCompanyContextFromText(text: string): any {
    const context: any = {};

    // Simple keyword-based parsing
    if (text.toLowerCase().includes('retail') || text.toLowerCase().includes('perakende')) {
      context.sector = 'Retail';
    } else if (text.toLowerCase().includes('food') || text.toLowerCase().includes('yiyecek')) {
      context.sector = 'Food & Beverage';
    } else if (text.toLowerCase().includes('mall') || text.toLowerCase().includes('avm')) {
      context.sector = 'Shopping Mall';
    }

    if (text.toLowerCase().includes('entry') || text.toLowerCase().includes('giriş')) {
      context.seniorityLevel = 'ENTRY';
    } else if (text.toLowerCase().includes('senior') || text.toLowerCase().includes('kıdemli')) {
      context.seniorityLevel = 'SENIOR';
    } else if (text.toLowerCase().includes('director') || text.toLowerCase().includes('direktör')) {
      context.seniorityLevel = 'DIRECTOR';
    }

    if (text.toLowerCase().includes('franchise') || text.toLowerCase().includes('franchise')) {
      context.franchiseNetwork = true;
    }

    return context;
  }
}




