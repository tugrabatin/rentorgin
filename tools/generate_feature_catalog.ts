/**
 * Feature Catalog Generator
 * 
 * Scans the codebase and generates/updates:
 * - docs/feature-registry.json (machine-readable)
 * - docs/feature-catalog.md (human-readable)
 * 
 * Usage:
 *   npm run generate:catalog
 *   node tools/generate_feature_catalog.ts
 * 
 * Logic:
 * 1. Scan API controllers → extract routes
 * 2. Scan database schema → extract models
 * 3. Scan UI pages → extract paths
 * 4. Cross-reference → match features
 * 5. Output JSON + Markdown
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// ============================
// CONFIGURATION
// ============================

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(WORKSPACE_ROOT, 'docs');
const REGISTRY_PATH = path.join(DOCS_DIR, 'feature-registry.json');
const CATALOG_PATH = path.join(DOCS_DIR, 'feature-catalog.md');

const API_CONTROLLERS_PATH = path.join(WORKSPACE_ROOT, 'apps/api/src/modules');
const UI_PAGES_PATH = path.join(WORKSPACE_ROOT, 'apps/web/src/app');
const SCHEMA_PATH = path.join(WORKSPACE_ROOT, 'packages/database/prisma/schema.prisma');

// ============================
// TYPES
// ============================

interface Feature {
  id: string;
  name: string;
  name_tr: string;
  status: 'ga' | 'beta' | 'experimental';
  version: string;
  domain: string;
  entrypoints: {
    api: string[];
    ui: string[];
  };
  evidence: {
    controller?: string;
    service?: string;
    ui_pages?: string[];
    schema?: string;
    docs?: string[];
  };
  tests?: {
    unit: boolean;
    e2e: boolean;
    coverage: number;
  };
}

// ============================
// SCANNER FUNCTIONS
// ============================

/**
 * Scan API controllers and extract routes
 */
function scanApiControllers(): Map<string, string[]> {
  const featureRoutes = new Map<string, string[]>();

  const controllerFiles = glob.sync(`${API_CONTROLLERS_PATH}/**/*.controller.ts`);

  for (const file of controllerFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const moduleName = path.basename(path.dirname(file));
    
    // Extract @Controller decorator
    const controllerMatch = content.match(/@Controller\(['"](.+?)['"]\)/);
    const baseRoute = controllerMatch ? controllerMatch[1] : moduleName;

    // Extract HTTP methods
    const routes: string[] = [];
    const methodRegex = /@(Get|Post|Put|Delete|Patch)\(\s*(?:['"](.+?)['"]\s*)?\)/g;
    let match;

    while ((match = methodRegex.exec(content)) !== null) {
      const method = match[1].toUpperCase();
      const route = match[2] || '';
      const fullRoute = `${method} /api/v1/${baseRoute}${route ? '/' + route : ''}`;
      routes.push(fullRoute);
    }

    if (routes.length > 0) {
      featureRoutes.set(moduleName, routes);
    }
  }

  return featureRoutes;
}

/**
 * Scan UI pages and extract paths
 */
function scanUiPages(): Map<string, string[]> {
  const featurePages = new Map<string, string[]>();

  const pageFiles = glob.sync(`${UI_PAGES_PATH}/**/page.tsx`);

  for (const file of pageFiles) {
    const relativePath = path.relative(UI_PAGES_PATH, path.dirname(file));
    const urlPath = '/' + relativePath.replace(/\\/g, '/').replace(/\[(.+?)\]/g, ':$1');
    
    const moduleName = relativePath.split('/')[0] || 'home';
    
    if (!featurePages.has(moduleName)) {
      featurePages.set(moduleName, []);
    }
    featurePages.get(moduleName)!.push(urlPath);
  }

  return featurePages;
}

/**
 * Scan database schema and extract models
 */
function scanDatabaseSchema(): Map<string, string> {
  const modelMap = new Map<string, string>();

  if (!fs.existsSync(SCHEMA_PATH)) {
    console.warn('⚠️  Schema file not found:', SCHEMA_PATH);
    return modelMap;
  }

  const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
  const lines = schema.split('\n');

  let currentModel: string | null = null;
  let startLine = 0;

  lines.forEach((line, index) => {
    const modelMatch = line.match(/^model\s+(\w+)\s*\{/);
    if (modelMatch) {
      currentModel = modelMatch[1];
      startLine = index + 1;
    }

    if (currentModel && line.trim() === '}') {
      modelMap.set(currentModel, `schema.prisma:${startLine}-${index + 1}`);
      currentModel = null;
    }
  });

  return modelMap;
}

/**
 * Check if tests exist for a module
 */
function checkTests(moduleName: string): { unit: boolean; e2e: boolean; coverage: number } {
  const unitTestPath = path.join(API_CONTROLLERS_PATH, moduleName, '__tests__');
  const e2eTestPath = path.join(WORKSPACE_ROOT, 'apps/web/tests', `${moduleName}.spec.ts`);

  const hasUnitTests = fs.existsSync(unitTestPath);
  const hasE2eTests = fs.existsSync(e2eTestPath);

  // Coverage is a rough estimate (you'd need to run Jest coverage for real data)
  let coverage = 0;
  if (hasUnitTests) coverage += 10;
  if (hasE2eTests) coverage += 10;

  return { unit: hasUnitTests, e2e: hasE2eTests, coverage };
}

// ============================
// FEATURE MAPPING
// ============================

/**
 * Map module name to feature metadata
 */
const FEATURE_METADATA: Record<string, Partial<Feature>> = {
  'auth': {
    name: 'Authentication & Authorization',
    name_tr: 'Kimlik Doğrulama ve Yetkilendirme',
    domain: 'core',
    status: 'ga',
    version: '0.4.0',
  },
  'stores': {
    name: 'Store Management',
    name_tr: 'Mağaza Yönetimi',
    domain: 'core',
    status: 'ga',
    version: '0.2.0',
  },
  'leases': {
    name: 'Lease Contract Management',
    name_tr: 'Kira Sözleşmesi Yönetimi',
    domain: 'core',
    status: 'ga',
    version: '0.2.0',
  },
  'malls': {
    name: 'Mall Relations Management',
    name_tr: 'AVM İlişkileri Yönetimi',
    domain: 'core',
    status: 'ga',
    version: '0.1.0',
  },
  'expenses': {
    name: 'Expense Tracking',
    name_tr: 'Gider Takibi',
    domain: 'finance',
    status: 'ga',
    version: '0.3.0',
  },
  'budget': {
    name: 'Budget Management',
    name_tr: 'Bütçe Yönetimi',
    domain: 'finance',
    status: 'ga',
    version: '0.3.0',
  },
  'risk': {
    name: 'Risk Management',
    name_tr: 'Risk Yönetimi',
    domain: 'operations',
    status: 'ga',
    version: '0.3.0',
  },
  'analytics': {
    name: 'Analytics & Reporting',
    name_tr: 'Analitik ve Raporlama',
    domain: 'insights',
    status: 'ga',
    version: '0.1.0',
  },
  'ai-assistant': {
    name: 'AI Assistant',
    name_tr: 'Yapay Zeka Asistanı',
    domain: 'ai',
    status: 'beta',
    version: '0.1.0',
  },
  'translation': {
    name: 'Translation Engine',
    name_tr: 'Çeviri Motoru',
    domain: 'ai',
    status: 'beta',
    version: '0.1.0',
  },
  'leasing-manager': {
    name: 'Leasing Manager Tools',
    name_tr: 'Kiralama Yöneticisi Araçları',
    domain: 'operations',
    status: 'ga',
    version: '0.3.0',
  },
  'upload': {
    name: 'File Upload',
    name_tr: 'Dosya Yükleme',
    domain: 'infrastructure',
    status: 'ga',
    version: '0.1.0',
  },
  'session': {
    name: 'Session Management',
    name_tr: 'Oturum Yönetimi',
    domain: 'infrastructure',
    status: 'beta',
    version: '0.1.0',
  },
};

// ============================
// MAIN GENERATOR
// ============================

async function generateFeatureCatalog() {
  console.log('🔍 Scanning codebase for features...\n');

  const apiRoutes = scanApiControllers();
  const uiPages = scanUiPages();
  const dbModels = scanDatabaseSchema();

  console.log(`✅ Found ${apiRoutes.size} API modules`);
  console.log(`✅ Found ${uiPages.size} UI page groups`);
  console.log(`✅ Found ${dbModels.size} database models\n`);

  // Build feature list
  const features: Feature[] = [];

  for (const [moduleName, routes] of apiRoutes.entries()) {
    const metadata = FEATURE_METADATA[moduleName] || {
      name: moduleName.charAt(0).toUpperCase() + moduleName.slice(1),
      name_tr: moduleName,
      domain: 'unknown',
      status: 'ga',
      version: '0.1.0',
    };

    const pages = uiPages.get(moduleName) || [];
    const tests = checkTests(moduleName);

    const feature: Feature = {
      id: moduleName,
      name: metadata.name!,
      name_tr: metadata.name_tr!,
      status: metadata.status as any,
      version: metadata.version!,
      domain: metadata.domain!,
      entrypoints: {
        api: routes,
        ui: pages,
      },
      evidence: {
        controller: `apps/api/src/modules/${moduleName}/${moduleName}.controller.ts`,
        service: `apps/api/src/modules/${moduleName}/${moduleName}.service.ts`,
        ui_pages: pages.length > 0 ? [`apps/web/src/app/${moduleName}/page.tsx`] : undefined,
      },
      tests,
    };

    features.push(feature);
  }

  // Generate JSON registry
  const registry = {
    meta: {
      version: '0.5.0',
      generated: new Date().toISOString().split('T')[0],
      totalFeatures: features.length,
    },
    features,
  };

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2), 'utf-8');
  console.log(`✅ Generated: ${REGISTRY_PATH}`);

  // Generate Markdown catalog (basic version)
  let markdown = `# Feature Catalog (Auto-Generated)\n\n`;
  markdown += `**Generated:** ${registry.meta.generated}\n`;
  markdown += `**Total Features:** ${registry.meta.totalFeatures}\n\n`;
  markdown += `---\n\n`;

  features.forEach((feature) => {
    markdown += `## ${feature.name}\n\n`;
    markdown += `- **ID:** \`${feature.id}\`\n`;
    markdown += `- **Status:** ${feature.status}\n`;
    markdown += `- **Version:** ${feature.version}\n`;
    markdown += `- **Domain:** ${feature.domain}\n\n`;
    markdown += `**API Routes:**\n`;
    feature.entrypoints.api.forEach((route) => {
      markdown += `- \`${route}\`\n`;
    });
    markdown += `\n**UI Pages:**\n`;
    if (feature.entrypoints.ui.length > 0) {
      feature.entrypoints.ui.forEach((page) => {
        markdown += `- \`${page}\`\n`;
      });
    } else {
      markdown += `- None\n`;
    }
    markdown += `\n**Tests:**\n`;
    markdown += `- Unit: ${feature.tests?.unit ? '✅' : '❌'}\n`;
    markdown += `- E2E: ${feature.tests?.e2e ? '✅' : '❌'}\n`;
    markdown += `- Coverage: ${feature.tests?.coverage}%\n\n`;
    markdown += `---\n\n`;
  });

  fs.writeFileSync(CATALOG_PATH, markdown, 'utf-8');
  console.log(`✅ Generated: ${CATALOG_PATH}\n`);

  console.log('✨ Feature catalog generation complete!');
}

// ============================
// RUN
// ============================

generateFeatureCatalog().catch((err) => {
  console.error('❌ Error generating feature catalog:', err);
  process.exit(1);
});
