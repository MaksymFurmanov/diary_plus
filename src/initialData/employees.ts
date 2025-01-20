import { Employee } from "../types";

const employees: Employee[] = [
    {
        id: 0,
        department_id: 0,
        name: "Ing. Eric Šoltésov",
        position: "Manažér výroby",
        date_of_birth: new Date("09.03.1989")
    },
    {
        id: 1,
        department_id: 0,
        name: "Mária Nováková",
        position: "Operátor linky",
        date_of_birth: new Date("12.07.1985")
    },
    {
        id: 2,
        department_id: 0,
        name: "Peter Horváth",
        position: "Operátor linky",
        date_of_birth: new Date("25.03.1990")
    },
    {
        id: 3,
        department_id: 0,
        name: "Jana Kováčová",
        position: "Operátor linky",
        date_of_birth: new Date("08.11.1988")
    },
    {
        id: 4,
        department_id: 0,
        name: "Andrej Ďurica",
        position: "Operátor linky",
        date_of_birth: new Date("17.05.1993")
    },
    {
        id: 5,
        department_id: 3,
        name: "Veronika Hrušková",
        position: "Manažér kontroly kvality",
        date_of_birth: new Date("19.09.1987")
    },
    {
        id: 6,
        department_id: 3,
        name: "Ing. Martin Šimko",
        position: "Analytik kvality",
        date_of_birth: new Date("06.12.1992")
    },
    {
        id: 7,
        department_id: 3,
        name: "Eva Mészárosová",
        position: "Analytik kvality",
        date_of_birth: new Date("28.05.1989")
    },
    {
        id: 8,
        department_id: 3,
        name: "Bc. Juraj Novák",
        position: "Analytik kvality",
        date_of_birth: new Date("14.02.1995")
    },
    {
        id: 9,
        department_id: 3,
        name: "Zuzana Kováčová",
        position: "Analytik kvality",
        date_of_birth: new Date("03.07.1990")
    }
];

export default employees;