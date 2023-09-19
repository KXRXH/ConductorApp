export default interface Client {
    cardNumber: string;
    firstName: string;
    lastName: string;
    middleName: string;
    birth: Date;
    benefits: Benefit[]
}

export interface Benefit {
    id: number;
    amount: number;
    name: string;
}