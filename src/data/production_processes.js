const production_processes = [
    {
        production_process_id: 0,
        product_id: 1,
        department_id: 3,
        name: "Testovanie surovín",
        queue: 0,
        done_name: "Otestované suroviny"
    },
    {
        production_process_id: 1,
        product_id: 1,
        department_id: 1,
        name: "Preprava surovín",
        queue: 1,
        done_name: "Pripravené suroviny"
    },
    {
        production_process_id: 2,
        product_id: 1,
        department_id: 0,
        name: "Separácia",
        queue: 2,
        done_name: "Prešla separácia"
    },
    {
        production_process_id: 3,
        product_id: 1,
        department_id: 0,
        name: "Štandardizácia",
        queue: 3,
        done_name: "Prešla štandardizácia"
    },
    {
        production_process_id: 4,
        product_id: 1,
        department_id: 0,
        name: "Homogenizácia a tepelné spracovanie",
        queue: 4,
        done_name: "Prešlo tepelné spracovanie"
    },
    {
        production_process_id: 4,
        product_id: 1,
        department_id: 3,
        name: "Balenie a označovanie",
        queue: 5,
        done_name: "Pobalené"
    },
]

export default production_processes;