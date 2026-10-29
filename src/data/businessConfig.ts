export interface BusinessConfig {
  name: string;
  shortName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  };
  serviceArea: {
    primaryRegion: string;
    radiusMiles: number;
    cities: string[];
    zipCodes: string[];
  };
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    emergency: string;
  };
  credentials: {
    licenseNumber: string;
    licenseTitle: string;
    insuranceCoverage: string;
    certifications: string[];
    workmanshipWarranty: string;
  };
  social: {
    googleReviewUrl: string;
    rating: number;
    reviewCount: number;
  };
}

export const defaultBusinessConfig: BusinessConfig = {
  name: "Northridge Build & Roof",
  shortName: "Northridge Roofing",
  tagline: "Roofing, Building & Outdoor Done Right",
  phone: "tel:+12145550198",
  phoneDisplay: "(214) 555-0198",
  email: "estimates@northridgebuildroof.com",
  address: {
    street: "4250 Construction Way",
    suite: "Suite 100",
    city: "Dallas",
    state: "TX",
    zip: "75201",
    full: "4250 Construction Way, Suite 100, Dallas, TX 75201"
  },
  serviceArea: {
    primaryRegion: "Dallas-Fort Worth Metroplex",
    radiusMiles: 45,
    cities: [
      "Dallas",
      "Fort Worth",
      "Plano",
      "Frisco",
      "McKinney",
      "Arlington",
      "Irving",
      "Garland",
      "Carrollton",
      "Richardson",
      "Lewisville",
      "Southlake"
    ],
    zipCodes: [
      "75201", "75202", "75024", "75025", "75034", "75035", "75070", "75071",
      "76011", "76012", "75038", "75039", "75080", "75081", "76092"
    ]
  },
  workingHours: {
    weekdays: "Monday – Friday: 7:00 AM – 6:00 PM",
    saturday: "Saturday: 8:00 AM – 3:00 PM",
    sunday: "Sunday: Closed (Emergency Tarping Available)",
    emergency: "24/7 Emergency Storm Tarping & Water Intrusion Dispatch"
  },
  credentials: {
    licenseNumber: "TX-RC-84920",
    licenseTitle: "Texas Licensed Roofing Contractor #RC-84920",
    insuranceCoverage: "$2,000,000 General Liability & Full Workers' Compensation",
    certifications: [
      "GAF Master Elite® Certified Contractor",
      "CertainTeed 5-Star Select ShingleMaster™",
      "Owens Corning Preferred Contractor",
      "OSHA 30 Safety Compliant Crews",
      "National Roofing Contractors Association (NRCA) Member"
    ],
    workmanshipWarranty: "10-Year Workmanship Guarantee + Lifetime Manufacturer Material Warranties"
  },
  social: {
    googleReviewUrl: "#reviews",
    rating: 4.9,
    reviewCount: 148
  }
};
