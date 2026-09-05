export interface BranchRecord {
  ifsc: string;
  bankName: string;
  bankSlug: string;
  branch: string;
  branchSlug: string;
  address: string;
  city: string;
  district: string;
  districtSlug: string;
  state: string;
  stateSlug: string;
  contact: string;
  micr: string | null;
  upi: boolean;
  neft: boolean;
  rtgs: boolean;
  imps: boolean;
}

export interface BankSummary {
  name: string;
  slug: string;
  branchCount: number;
}

export interface StateSummary {
  name: string;
  slug: string;
  branchCount: number;
}

export interface DistrictSummary {
  name: string;
  slug: string;
  branchCount: number;
}

/** Shape returned by the Razorpay IFSC lookup API (https://ifsc.razorpay.com/{code}). */
export interface RazorpayIfscResponse {
  BANK: string;
  IFSC: string;
  BRANCH: string;
  ADDRESS: string;
  CITY: string;
  DISTRICT: string;
  STATE: string;
  CONTACT: string;
  MICR: string | null;
  UPI: boolean;
  NEFT: boolean;
  RTGS: boolean;
  IMPS: boolean;
  BANKCODE: string;
  CENTRE: string;
}

export type LookupStatus = 'idle' | 'loading' | 'success' | 'not-found' | 'error';
