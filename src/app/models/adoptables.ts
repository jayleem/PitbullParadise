export interface Adoptable {
    id: string;
    age: number;
    name: string;
    type: string;
    breed: string;
    birthdate: string;
    gender: string;
    traits: string[];
    image: string;
    description: string;
    adoptionFee: number;
    isFeatured: boolean;
    hasMedicalNeeds: boolean;
    healthDesc:  string;
    intakeDate: Date;
    notes: string[];
}