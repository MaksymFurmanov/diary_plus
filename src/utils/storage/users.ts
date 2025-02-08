import {User} from "../../types";

export const getUsers = (): User[] => {
    const usersRaw = localStorage.getItem("users");
    return usersRaw ? JSON.parse(usersRaw) as User[] : [];
}

export const createUser = (user: User): User[] => {
    const users = getUsers();

    const updatedUsers = [...users, user];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return updatedUsers;
};

export const updateUser = (user: User): User[] => {
    const users = getUsers();
    const updatedUsers = users.map(userItem =>
        userItem.employee_id === user.employee_id ? user: userItem
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return updatedUsers;
};

export const deleteUser = (employeeId: string): User[] => {
    const users = getUsers();
    const updatedUsers = users.filter((userItem) => userItem.employee_id !== employeeId);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return updatedUsers;
};
