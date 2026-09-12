export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface ProjectCaseStudy {
  executiveSummary: string;
  problemChallenge: string;
  solutionOverview: string;
  architectureComponents: { title: string; description: string }[];
  technicalHighlights?: string[];
  demoType: 'live_demo' | 'restricted_access' | 'internal_network';
  demoNotes?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  status: string;
  shortDescription: string;
  fullDescription: string;
  keyImpact: string[];
  techTags: string[];
  imagePath: string;
  galleryImages: string[];
  projectUrl: string;
  architectureHighlights: string[];
  clientType: string;
  caseStudy?: ProjectCaseStudy;
}

export interface Capability {
  id: string;
  iconName: string;
  title: string;
  shortDescription: string;
  detailedFeatures: string[];
  useCases: string[];
}

export interface TrustFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  metric?: string;
}

export interface Industry {
  id: string;
  name: string;
  iconName: string;
  description: string;
  keySolutions: string[];
}

export interface TechCategory {
  id: string;
  category: string;
  items: { name: string; description: string; tag: string }[];
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface WorkProcessStep {
  stepNumber: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface Testimonial {
  id: string;
  clientRole: string;
  organization: string;
  orgType: string;
  quote: string;
  impactMetrics: string;
}

export interface RFPFormData {
  organizationName: string;
  contactName: string;
  workEmail: string;
  phone: string;
  organizationType: string;
  projectScope: string[];
  estimatedTimeline: string;
  projectBudget: string;
  projectDetails: string;
  securityRequirements: string[];
}
