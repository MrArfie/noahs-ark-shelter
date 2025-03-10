
export interface Pet {
  id: string;
  name: string;
  age: string;
  breed: string;
  gender: 'Male' | 'Female';
  size: 'Small' | 'Medium' | 'Large';
  type: 'Dog' | 'Cat' | 'Other';
  description: string;
  imageUrl: string;
  status: 'Available' | 'Adopted' | 'In Treatment';
  medicalHistory?: string;
  goodWith?: string[];
  personality?: string[];
  dateAdded: string;
}

export interface AdoptionApplication {
  id: string;
  petId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  applicantAddress: string;
  livingArrangement: string;
  hasOtherPets: boolean;
  otherPetsDescription?: string;
  hasChildren: boolean;
  childrenAges?: string;
  reasonForAdoption: string;
  applicationDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface DonationInfo {
  id: string;
  type: 'General' | 'Sponsorship' | 'Supplies';
  amount?: number;
  donorName: string;
  donorEmail: string;
  message?: string;
  isAnonymous: boolean;
  date: string;
}

export interface VolunteerInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  availableHours: string;
  interests: string[];
  experience: string;
  registrationDate: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  registrationUrl?: string;
}
