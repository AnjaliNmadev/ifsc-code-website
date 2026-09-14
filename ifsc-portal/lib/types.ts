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
  /** This branch's OWN swift code, if it has one on file. Null for most branches. */
  swift: string | null;
  /**
   * Bank-level fallback swift code, used ONLY when `swift` above is null.
   * This is NOT this branch's own code — it's the bank's head-office/nodal
   * branch code, shown so the user has something to start from. Always
   * render it with a clear "not this branch's own code" disclaimer.
   */
  swiftFallback?: string | null;
  swiftFallbackBranch?: string | null;
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
  SWIFT?: string | null;
  UPI: boolean;
  NEFT: boolean;
  RTGS: boolean;
  IMPS: boolean;
  BANKCODE: string;
  CENTRE: string;
}

export type LookupStatus = 'idle' | 'loading' | 'success' | 'not-found' | 'error';
