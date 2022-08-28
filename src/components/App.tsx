import * as React from 'react'
import { useState, useEffect } from 'react'

export interface IUser {
    name: string;
    age: number;
}
export default function App() {

    useEffect(() => {
        console.log("aca")
    }, [])


    const [users, setUsers] = useState<IUser[]>([
        {
            name: "Bijaya",
            age: 25,
        },
        {
            name: "Ram",
            age: 25,
        },
    ]);

    return (
        <div>
            <h1>Users list</h1>
            <ul>
                {users.map((user: IUser) => {
                    return (
                        <li>
                            {user.name} is {user.age} years old
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};