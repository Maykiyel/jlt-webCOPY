// ============================================
// Account Status Types
// ============================================

export type AccountLifecycleStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED";

export type AccountStatus =
  | { state: "ACTIVE" } // currently online
  | { state: "OFFLINE"; lastSeen: Date }; // offline, show minutes/hours ago


// ============================================
// Account List Types (for table view)
// ============================================

export interface AccountListItem {
  id: number;
  avatarUrl: string | null; // profile image
  name: string;             // full name
  email: string;
  contactNumber: string;

  // For employees
  role?: string;            // e.g. "Sales", "Operations"
  isLead?: boolean;         // true = lead ON, false = lead OFF
  employeeNumber?: string;   // e.g. "EMP-101", "EMP-102"

  // For clients
  companyName?: string;     // e.g. "Acme Corp"
  position?: string;        // e.g. "Purchasing Manager"

  status: AccountStatus;    // online/offline with timestamp

}

// ============================================
// Full Account Data Types (for detail view)
// ============================================

export interface AccountDetails {
  id: number;

  // Account Information
  accountInfo: {
    fullName: string;
    username: string;
    email: string;
    contactNumber: string;
    role: string
  };

  // Security
  security: {
    passwordHash: string; // stored securely, not plain text
  };

  // Company Information
  companyInfo: {
    companyName: string;
    position: string;
    companyAddress: string;
    businessType: string;
  };

  // Identification
  identification: {
    idImageUrl: string | null; // path to ID image
    profileImageUrl: string | null; // path to profile image
  };

  // Flags and lifecycle
  isLead: boolean;                  // lead toggle
  employeeNumber?: string; // e.g. "EMP-101", "EMP-102"
  status: AccountStatus;             // online/offline with timestamp
}
