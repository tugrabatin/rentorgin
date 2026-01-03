/**
 * Database Seed Script
 * Populates development database with sample data
 * 
 * Geliştirme veritabanını örnek verilerle doldurur
 */

import { 
  PrismaClient, 
  TenantPlan, 
  TenantStatus, 
  UserRole, 
  UserStatus, 
  StoreStatus, 
  MallType, 
  RelationshipQuality, 
  LeaseStatus, 
  EscalationType,
  SeniorityLevel,
  LeasingTaskCategory,
  TaskPriority,
  TaskStatus,
  RiskLevel,
  FranchiseProjectStatus,
  LeasingRequestType,
  RequestSource,
  RequestStatus
} from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing seed data (optional - comment out if you want to keep existing data)
  // Mevcut seed verilerini temizle (opsiyonel - mevcut verileri korumak istiyorsanız yorum satırı yapın)
  try {
    await prisma.storeAnalytics.deleteMany({});
    await prisma.expense.deleteMany({});
    await prisma.lease.deleteMany({});
    await prisma.store.deleteMany({});
    await prisma.mall.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.tenant.deleteMany({});
    console.log('🧹 Cleaned existing seed data');
  } catch (error) {
    console.log('⚠️  Could not clean existing data (this is OK if database is empty)');
  }

  // Create Demo Tenant
  const tenant = await prisma.tenant.upsert({
    where: { domain: 'demo-company' },
    update: {},
    create: {
      name: 'Demo Retail Company',
      domain: 'demo-company',
      plan: TenantPlan.PROFESSIONAL,
      status: TenantStatus.ACTIVE,
      currency: 'TRY',
      language: 'tr',
      timezone: 'Europe/Istanbul',
      maxUsers: 50,
      maxStores: 100,
    },
  });

  console.log(`✅ Created tenant: ${tenant.name}`);

  // Create Admin User
  // Hash password with bcrypt
  const hashedPassword = await bcrypt.hash('demo123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      tenantId: tenant.id,
      email: 'admin@demo.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      language: 'tr',
    },
  });

  console.log(`✅ Created user: ${adminUser.email}`);

  // Create Sample Malls
  const mallIstanbul = await prisma.mall.create({
    data: {
      tenantId: tenant.id,
      name: 'İstanbul AVM',
      type: MallType.SHOPPING_MALL,
      country: 'Türkiye',
      city: 'İstanbul',
      district: 'Beşiktaş',
      address: 'Örnek Mahallesi, AVM Caddesi No:1',
      managementCompany: 'ABC Yönetim A.Ş.',
      relationshipQuality: RelationshipQuality.GOOD,
      contacts: {
        create: [
          {
            name: 'Ahmet Yılmaz',
            title: 'Kiralama Müdürü',
            email: 'ahmet@istanbulavm.com',
            phone: '+90 212 555 0001',
            isPrimary: true,
          },
        ],
      },
    },
  });

  const mallAnkara = await prisma.mall.create({
    data: {
      tenantId: tenant.id,
      name: 'Ankara Mega AVM',
      type: MallType.SHOPPING_MALL,
      country: 'Türkiye',
      city: 'Ankara',
      district: 'Çankaya',
      address: 'Merkez Mahallesi, Plaza Sokak No:15',
      managementCompany: 'XYZ Gayrimenkul',
      relationshipQuality: RelationshipQuality.EXCELLENT,
      contacts: {
        create: [
          {
            name: 'Mehmet Demir',
            title: 'Genel Müdür',
            email: 'mehmet@ankaramega.com',
            phone: '+90 312 555 0002',
            isPrimary: true,
          },
        ],
      },
    },
  });

  console.log(`✅ Created malls: ${mallIstanbul.name}, ${mallAnkara.name}`);

  // Create Sample Stores
  const store1 = await prisma.store.upsert({
    where: { code: 'FST-IST-001' },
    update: {},
    create: {
      tenantId: tenant.id,
      name: 'Fashion Store İstanbul',
      code: 'FST-IST-001',
      brand: 'Fashion Brand',
      concept: 'Premium Fashion',
      country: 'Türkiye',
      city: 'İstanbul',
      district: 'Beşiktaş',
      address: 'İstanbul AVM, Kat 2, No: 45',
      squareMeters: 150.0,
      status: StoreStatus.ACTIVE,
      openingDate: new Date('2023-01-15'),
      mallId: mallIstanbul.id,
    },
  });

  const store2 = await prisma.store.upsert({
    where: { code: 'FST-ANK-001' },
    update: {},
    create: {
      tenantId: tenant.id,
      name: 'Fashion Store Ankara',
      code: 'FST-ANK-001',
      brand: 'Fashion Brand',
      concept: 'Premium Fashion',
      country: 'Türkiye',
      city: 'Ankara',
      district: 'Çankaya',
      address: 'Ankara Mega AVM, Kat 1, No: 23',
      squareMeters: 200.0,
      status: StoreStatus.ACTIVE,
      openingDate: new Date('2023-03-01'),
      mallId: mallAnkara.id,
    },
  });

  console.log(`✅ Created stores: ${store1.name}, ${store2.name}`);

  // Create Sample Leases
  const lease1 = await prisma.lease.upsert({
    where: { contractNumber: 'CNT-2023-001' },
    update: {},
    create: {
      tenantId: tenant.id,
      storeId: store1.id,
      mallId: mallIstanbul.id,
      assignedToId: adminUser.id,
      contractNumber: 'CNT-2023-001',
      version: 1,
      status: LeaseStatus.ACTIVE,
      startDate: new Date('2023-01-01'),
      endDate: new Date('2028-12-31'),
      signedDate: new Date('2022-12-15'),
      monthlyRent: 45000.0,
      currency: 'TRY',
      escalationType: EscalationType.INDEX_BASED,
      escalationRate: 0.0,
      escalationIndex: 'TUFE',
      renewalOptionMonths: 60,
      renewalNoticeMonths: 6,
      commonAreaCharges: 8000.0,
      securityDeposit: 135000.0,
      fitOutPeriodDays: 30,
    },
  });

  const lease2 = await prisma.lease.upsert({
    where: { contractNumber: 'CNT-2023-002' },
    update: {},
    create: {
      tenantId: tenant.id,
      storeId: store2.id,
      mallId: mallAnkara.id,
      assignedToId: adminUser.id,
      contractNumber: 'CNT-2023-002',
      version: 1,
      status: LeaseStatus.ACTIVE,
      startDate: new Date('2023-03-01'),
      endDate: new Date('2026-02-28'),
      signedDate: new Date('2023-02-10'),
      monthlyRent: 35000.0,
      currency: 'TRY',
      escalationType: EscalationType.FIXED_PERCENTAGE,
      escalationRate: 15.0,
      renewalOptionMonths: 36,
      renewalNoticeMonths: 3,
      commonAreaCharges: 6500.0,
      securityDeposit: 105000.0,
      fitOutPeriodDays: 20,
    },
  });

  console.log(`✅ Created leases: ${lease1.contractNumber}, ${lease2.contractNumber}`);

  // Create Sample Analytics Data
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  for (let i = 0; i < 6; i++) {
    const month = currentMonth - i;
    const year = month > 0 ? currentYear : currentYear - 1;
    const adjustedMonth = month > 0 ? month : month + 12;

    await prisma.storeAnalytics.create({
      data: {
        tenantId: tenant.id,
        storeId: store1.id,
        year,
        month: adjustedMonth,
        revenue: 180000 + Math.random() * 40000,
        rent: 45000,
        commonAreaCharges: 8000,
        otherExpenses: 5000,
        rentToRevenueRatio: 25.0,
        revenuePerSquareMeter: 1200.0,
        profitMargin: 15.0,
        footTraffic: 8000 + Math.floor(Math.random() * 2000),
        conversionRate: 12.5,
        performanceScore: 75.0,
      },
    });
  }

  console.log(`✅ Created analytics data for ${store1.name}`);

  // Create Sample Budget
  await prisma.budget.create({
    data: {
      tenantId: tenant.id,
      year: currentYear,
      quarter: null, // Annual budget
      scope: 'COMPANY',
      scopeValue: null,
      plannedAmount: 5000000.0,
      actualAmount: 4850000.0,
      variance: -150000.0,
      status: 'ACTIVE',
    },
  });

  console.log(`✅ Created budget for ${currentYear}`);

  // ============================================================
  // LEASING MANAGER MODULE DATA
  // ============================================================

  // Create Default Leasing Manager Role Template
  const defaultRoleTemplate = await prisma.leasingManagerRoleTemplate.create({
    data: {
      nameTR: 'Kiralama Yöneticisi',
      nameEN: 'Leasing Manager',
      descriptionTR: 'Mülk ve ekipman kiralamalarından sorumlu, finansal planlama ve sözleşme yönetimi konusunda uzman pozisyon.',
      descriptionEN: 'Position responsible for property and equipment leasing, expert in financial planning and contract management.',
      coreResponsibilities: [
        'Potansiyel kiracı adaylarını keşfetmek ve değerlendirmek',
        'Kira sözleşmelerini hazırlamak ve yönetmek',
        'Sözleşme yenileme süreçlerini koordine etmek',
        'Kira ödemelerini takip etmek ve tahsilat yönetimi',
        'Müzakere süreçlerini yürütmek',
        'Bölgesel kira-verimlilik analizleri yapmak',
        'Kiralama bütçesini takip etmek',
        'Franchise geliştirme fırsatlarını değerlendirmek',
      ],
      coreSkills: [
        'Bütçe Planlama ve Raporlama',
        'Ekip Yönetimi',
        'Proje Yönetimi',
        'Satış ve Müzakere',
        'Finansal Analiz',
        'Stratejik Planlama',
        'İlişki Yönetimi',
      ],
      sectors: ['Perakende', 'AVM', 'Gayrimenkul', 'Franchise'],
      seniorityLevel: SeniorityLevel.MID,
      isDefault: true,
      isActive: true,
    },
  });

  console.log(`✅ Created default Leasing Manager role template`);

  // Create Sample Franchise Projects
  const franchiseProject1 = await prisma.franchiseProject.create({
    data: {
      tenantId: tenant.id,
      name: 'İzmir Alsancak Mağaza Açılışı',
      code: 'FP-2025-001',
      status: FranchiseProjectStatus.FEASIBILITY_STUDY,
      targetRegion: 'Ege',
      targetCity: 'İzmir',
      storeType: 'Premium Fashion',
      brand: 'Fashion Brand',
      concept: 'Urban Concept',
      estimatedCapex: 850000.0,
      estimatedOpex: 45000.0,
      expectedRevenue: 220000.0,
      expectedRentCost: 38000.0,
      feasibilityScore: 78.5,
      projectManagerId: adminUser.id,
      targetOpeningDate: new Date('2025-06-01'),
    },
  });

  const franchiseProject2 = await prisma.franchiseProject.create({
    data: {
      tenantId: tenant.id,
      name: 'Bursa Outlet Genişleme',
      code: 'FP-2025-002',
      status: FranchiseProjectStatus.APPROVED,
      targetRegion: 'Marmara',
      targetCity: 'Bursa',
      storeType: 'Outlet Store',
      brand: 'Fashion Brand',
      concept: 'Outlet Concept',
      estimatedCapex: 450000.0,
      estimatedOpex: 28000.0,
      expectedRevenue: 145000.0,
      expectedRentCost: 22000.0,
      feasibilityScore: 82.0,
      projectManagerId: adminUser.id,
      targetOpeningDate: new Date('2025-04-15'),
    },
  });

  console.log(`✅ Created franchise projects: ${franchiseProject1.name}, ${franchiseProject2.name}`);

  // Create Sample Leasing Tasks
  const task1 = await prisma.leasingTask.create({
    data: {
      tenantId: tenant.id,
      category: LeasingTaskCategory.CONTRACT_RENEWAL,
      title: 'İstanbul Mağaza Sözleşme Yenileme',
      description: 'Fashion Store İstanbul için sözleşme yenileme görüşmeleri başlatılmalı',
      priority: TaskPriority.HIGH,
      storeId: store1.id,
      mallId: mallIstanbul.id,
      leaseId: lease1.id,
      assignedToId: adminUser.id,
      defaultSLA: 30,
      riskLevel: RiskLevel.MEDIUM,
      status: TaskStatus.IN_PROGRESS,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  const task2 = await prisma.leasingTask.create({
    data: {
      tenantId: tenant.id,
      category: LeasingTaskCategory.FRANCHISE_DEVELOPMENT,
      title: 'İzmir Franchise Fizibilite Raporu',
      description: 'İzmir Alsancak projesi için detaylı fizibilite analizi hazırlanmalı',
      priority: TaskPriority.URGENT,
      franchiseProjectId: franchiseProject1.id,
      assignedToId: adminUser.id,
      defaultSLA: 15,
      riskLevel: RiskLevel.HIGH,
      status: TaskStatus.PENDING,
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    },
  });

  const task3 = await prisma.leasingTask.create({
    data: {
      tenantId: tenant.id,
      category: LeasingTaskCategory.MARKET_RESEARCH,
      title: 'Ankara Pazar Analizi',
      description: 'Ankara bölgesi için rakip analizi ve kira seviyesi araştırması',
      priority: TaskPriority.MEDIUM,
      mallId: mallAnkara.id,
      assignedToId: adminUser.id,
      defaultSLA: 20,
      riskLevel: RiskLevel.LOW,
      status: TaskStatus.PENDING,
      dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    },
  });

  console.log(`✅ Created leasing tasks: ${task1.title}, ${task2.title}, ${task3.title}`);

  // Create Sample Leasing Requests
  const request1 = await prisma.leasingRequest.create({
    data: {
      tenantId: tenant.id,
      type: LeasingRequestType.RENT_REDUCTION,
      source: RequestSource.TENANT,
      title: 'Ankara Mağaza Kira İndirimi Talebi',
      description: 'Son dönem satış performansına göre kira indirimi talep edilmektedir',
      storeId: store2.id,
      mallId: mallAnkara.id,
      leaseId: lease2.id,
      createdById: adminUser.id,
      assignedToId: adminUser.id,
      status: RequestStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    },
  });

  const request2 = await prisma.leasingRequest.create({
    data: {
      tenantId: tenant.id,
      type: LeasingRequestType.FRANCHISE_INQUIRY,
      source: RequestSource.FRANCHISE_CANDIDATE,
      title: 'İzmir Franchise Başvurusu',
      description: 'İzmir bölgesi için franchise başvurusu incelemesi',
      franchiseProjectId: franchiseProject1.id,
      createdById: adminUser.id,
      assignedToId: adminUser.id,
      status: RequestStatus.OPEN,
      priority: TaskPriority.MEDIUM,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const request3 = await prisma.leasingRequest.create({
    data: {
      tenantId: tenant.id,
      type: LeasingRequestType.ADDITIONAL_SPACE,
      source: RequestSource.INTERNAL,
      title: 'İstanbul Mağaza Alan Genişletme',
      description: 'Mevcut mağazaya ek 50 m² alan kiralama talebi',
      storeId: store1.id,
      mallId: mallIstanbul.id,
      createdById: adminUser.id,
      status: RequestStatus.PENDING_APPROVAL,
      priority: TaskPriority.MEDIUM,
    },
  });

  console.log(`✅ Created leasing requests: ${request1.title}, ${request2.title}, ${request3.title}`);

  // Create Sample Market Research Records
  await prisma.marketResearchRecord.create({
    data: {
      tenantId: tenant.id,
      region: 'Marmara',
      city: 'İstanbul',
      district: 'Şişli',
      competitorName: 'Fashion Rival A',
      competitorType: 'Direct Competitor',
      rentLevel: 52000.0,
      marketShare: 18.5,
      footTraffic: 12000,
      notes: 'Yüksek performanslı lokasyon, premium segment',
      dataSource: 'Pazar Araştırması 2024 Q4',
      recordDate: new Date('2024-12-01'),
      createdById: adminUser.id,
    },
  });

  await prisma.marketResearchRecord.create({
    data: {
      tenantId: tenant.id,
      region: 'Ege',
      city: 'İzmir',
      district: 'Alsancak',
      competitorName: 'Fashion Rival B',
      competitorType: 'Direct Competitor',
      rentLevel: 35000.0,
      marketShare: 22.0,
      footTraffic: 9500,
      notes: 'Orta-yüksek segment, büyüme potansiyeli yüksek',
      dataSource: 'Saha Araştırması 2024',
      recordDate: new Date('2024-11-15'),
      createdById: adminUser.id,
    },
  });

  console.log(`✅ Created market research records`);

  // Create Sample Job Description Template
  await prisma.jobDescriptionTemplate.create({
    data: {
      tenantId: tenant.id,
      roleNameTR: 'Kıdemli Kiralama Yöneticisi',
      roleNameEN: 'Senior Leasing Manager',
      summaryTR: 'Fashion Brand için Türkiye genelinde kiralama operasyonlarını yönetecek, franchise ağını büyütecek ve stratejik ortaklıklar geliştirecek deneyimli Kıdemli Kiralama Yöneticisi arıyoruz.',
      summaryEN: 'We are looking for an experienced Senior Leasing Manager to manage leasing operations across Turkey for Fashion Brand, grow the franchise network, and develop strategic partnerships.',
      responsibilitiesTR: [
        'Türkiye genelinde mağaza kiralamalarını koordine etmek',
        'Franchise ağının büyütülmesi stratejilerini geliştirmek ve uygulamak',
        'AVM yönetimleri ile ilişkileri yönetmek ve güçlendirmek',
        'Yıllık kiralama bütçesini hazırlamak ve takip etmek',
        '3 kişilik kiralama ekibini yönetmek ve geliştirmek',
        'Bölgesel pazar analizleri yapmak ve yeni fırsatları belirlemek',
      ],
      responsibilitiesEN: [
        'Coordinate store leasing operations across Turkey',
        'Develop and implement franchise network growth strategies',
        'Manage and strengthen relationships with mall managements',
        'Prepare and monitor annual leasing budget',
        'Manage and develop a team of 3 leasing professionals',
        'Conduct regional market analysis and identify new opportunities',
      ],
      skillsTR: [
        '7+ yıl perakende kiralama deneyimi',
        'Franchise yönetimi bilgisi',
        'İleri düzey Excel ve finansal modelleme',
        'Güçlü müzakere ve iletişim becerileri',
        'İngilizce (yazılı ve sözlü)',
      ],
      skillsEN: [
        '7+ years retail leasing experience',
        'Franchise management knowledge',
        'Advanced Excel and financial modeling',
        'Strong negotiation and communication skills',
        'English (written and verbal)',
      ],
      sectors: ['Perakende', 'Moda', 'AVM', 'Franchise'],
      seniorityLevel: SeniorityLevel.SENIOR,
      companyContext: JSON.stringify({
        companySize: '50-100',
        region: 'Türkiye Geneli',
        teamSize: 3,
        reportingTo: 'Genel Müdür',
      }),
      isTemplate: false,
      isPublished: true,
      createdById: adminUser.id,
    },
  });

  console.log(`✅ Created job description template`);

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


