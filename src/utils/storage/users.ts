import { User } from "../../types";

export const getUsers = (usersRaw: string | null): User[] => {
    return usersRaw ? JSON.parse(usersRaw) as User[] : [];
}

export const createUser = (users: User[], employeeId: string, login: string, password: string): User[] => {
    const newUser: User = {
        employee_id: employeeId,
        login,
        password
    };

    return [...users, newUser];
};

export const updateUser = (users: User[], employeeId: string, login: string, password: string): User[] => {
    return users.map(user =>
        user.employee_id === employeeId
            ? { ...user, login, password }
            : user
    );
};

export const deleteUser = (users: User[], employeeId: string): User[] => {
    return users.filter((user) => user.employee_id !== employeeId);
};