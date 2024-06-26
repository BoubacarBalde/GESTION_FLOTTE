export interface Utilisateur {
    id: number;
    username: string;
    password: string;
    type_utilisateur: string;
    telephone: string;
    adress: string;
    date_embauche: string;
    image: string | null;
}