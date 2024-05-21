export class Person{
    _id?: string;
    nom!: string;
    email!: string;
    avatar!: string;
}

export class Matiere{
    _id?: string;
    nom!: string;
    coefficient!: number;
    professeur!: Person;
    image!: string;
}

export class Assignment{
    _id?: string;
    nom!: string;
    dateRendu!: Date;
    rendu!: boolean;
    remarque!: string;
    etudiant!: Person;
    matiere!: Matiere;
}