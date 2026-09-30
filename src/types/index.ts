export type ScreenType =
  | 'login'
  | 'dashboard'
  | 'new-analysis'
  | 'my-analyses'
  | 'standards-explorer'
  | 'knowledge-graph'
  | 'compliance-centre'
  | 'updates-alerts'
  | 'expert-review'
  | 'reports'
  | 'administration'
  | 'help-docs';

export type LanguageCode = 'en' | 'hi' | 'gu' | 'mr' | 'bn' | 'ta' | 'te';

export type StandardStatus =
  | 'Current'
  | 'Superseded'
  | 'Withdrawn'
  | 'Amendment Available'
  | 'Review Required'
  | 'Partial Match'
  | 'No Evidence Found'
  | 'Mandatory Status Unconfirmed';

export type ConfidenceLevel = 'High' | 'Medium' | 'Needs Clarification';

export interface StandardRecord {
  id: string;
  isNumber: string;
  title: string;
  status: StandardStatus;
  relevance: number;
  sector: string;
  committee: string;
  edition: string;
  year: number;
  amendmentStatus: string;
  officialSource: string;
  sourceUrl: string;
  lastVerifiedDate: string;
  reason: string;
  scopeMatch: string;
  productCategory: string;
  relevantProperties: string[];
  normativeRelevance: string;
  isPrimary?: boolean;
  categoryType: 'primary' | 'allied' | 'test' | 'safety' | 'installation';
}

export interface DocumentMetadata {
  fileName: string;
  fileSize: string;
  fileSizeBytes?: number;
  dateCreated: string;
  dateModified?: string;
  author: string;
  title?: string;
  subject?: string;
  pageCount?: number;
  pdfVersion?: string;
  creator?: string;
  producer?: string;
  sourceType: 'uploaded' | 'sample';
  rawProperties?: Record<string, string>;
}

export interface ExtractedRequirement {
  product: string;
  productType: string;
  performance: string;
  application: string;
  procurementContext: string;
  likelyRequirements: string[];
  confidence: {
    product: ConfidenceLevel;
    productType: ConfidenceLevel;
    performance: ConfidenceLevel;
    application: ConfidenceLevel;
    procurementContext: ConfidenceLevel;
  };
  missingWarnings: string[];
  documentMetadata?: DocumentMetadata;
}

export interface AnalysisRecord {
  id: string;
  name: string;
  productCategory: string;
  date: string;
  status: 'Verified' | 'Expert review required' | 'Draft' | 'Pending expert approval';
  standardsCount: number;
  extractedRequirement?: ExtractedRequirement;
  primaryStandard?: StandardRecord;
}

export interface GraphNode {
  id: string;
  isNumber: string;
  title: string;
  type: 'primary' | 'related' | 'certification' | 'test' | 'superseded' | 'warning';
  status: string;
  whyItMatters: string;
  officialSource: string;
  x: number;
  y: number;
  radius: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  relationshipType: 'Normative reference' | 'Allied standard' | 'Supersedes' | 'Amended by' | 'Certification applies to' | 'Test method';
  isMandatory?: boolean;
}

export interface ComplianceItem {
  id: string;
  requirement: string;
  type: string;
  status: 'Applicable — verify scope' | 'Not identified' | 'Not applicable' | 'Mandatory under identified notification' | 'Potentially applicable' | 'Manual verification required';
  evidence: string;
  actionText: string;
  sourceDetails: string;
  gazetteRef?: string;
}

export interface MissingRequirementItem {
  id: string;
  category: 'Product identity' | 'Technical parameters' | 'Testing' | 'Procurement and compliance';
  name: string;
  status: 'Complete' | 'Missing' | 'Partial' | 'Required' | 'Not specified' | 'Needs confirmation';
  whyItMatters: string;
  sourceOrStandard: string;
  value?: string;
}

export interface VersionHistoryItem {
  id: string;
  editionLabel: string;
  year: string;
  publicationDate: string;
  effectiveDate: string;
  status: string;
  relationship: string;
  source: string;
  tenderImpact: string;
  changesSummary?: string;
}

export interface EvidenceRecord {
  id: string;
  standardId: string;
  isNumber: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: string;
  clause: string;
  retrievedDate: string;
  verifiedDate: string;
  dataVersion: string;
  evidenceSnippet: string;
  evidenceConfidence: string;
  humanVerificationStatus: 'Verified by BIS Analyst' | 'Pending Human Sign-off' | 'System Verified';
}

export interface ExpertReviewItem {
  id: string;
  analysisId: string;
  analysisName: string;
  productCategory: string;
  aiRecommendation: string;
  confidenceScore: number;
  reasonForEscalation: string;
  officialEvidence: string;
  suggestedAction: string;
  status: 'Pending approval' | 'Reviewed' | 'High-risk' | 'Certification ambiguity' | 'Conflicting standards' | 'Outdated reference';
  reviewHistory: {
    reviewer: string;
    date: string;
    decision: string;
    comment: string;
  }[];
}

export interface DataSourceRecord {
  name: string;
  status: 'Active' | 'Syncing' | 'Standby';
  lastSync: string;
  recordsAdded: number;
  recordsUpdated: number;
  recordsDeprecated: number;
  validationStatus: 'Verified' | 'Warning' | 'Audited';
}
