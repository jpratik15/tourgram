import React from 'react'

import UsersList from "../components/UsersList"

const Users = () => {
    const USERS = [
        {
            id : "u1",
            name : "Pratik",
            image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80",
            places : 1
        }
    ]
    return <UsersList items={USERS} />
}
export default Users;