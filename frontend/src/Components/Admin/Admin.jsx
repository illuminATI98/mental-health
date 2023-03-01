import React, { useEffect, useState } from "react";

const User = (props) => (
    <tr>
        <td>{props.record.id}</td>
        <td>{props.record.name}</td>
        <td>{props.record.email}</td>
        <td>{props.record.points}</td>
        {/*<td>*/}
        {/*    <button className="btn btn-link"*/}
        {/*            onClick={() => {*/}
        {/*                props.deleteUser(props.record.id);*/}
        {/*            }}*/}
        {/*    >*/}
        {/*        Delete*/}
        {/*    </button>*/}
        {/*</td>*/}
    </tr>
);

export default function UsersList() {
    
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortedIsChanged, setSortedIsChanged] = useState(false);
    
    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`https://localhost:7270/users`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const result = await response.json();
            setUsers(result.$values);
            setFilteredUsers(result.$values);
            setSortedUsers(result.$values);
           console.log(result.$values)
        }

        getUsers();
        
    }, []);

    function recordList() {
        const userList = sortedIsChanged === true ?  sortedUsers : filteredUsers;
        return userList.map((record) => {
            return (
                <User
                    record={record}
                    key={record.id}
                />
            );
        });
    }

    function sortByName() {
        const sorted = [...sortedUsers].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        setSortedUsers(sorted);
        setSortedIsChanged(true);
    }

    function sortByPoints() {
        const sorted = [...sortedUsers].sort((a, b) => (a.points > b.points) ? 1 : ((b.points > a.points) ? -1 : 0));
        setSortedUsers(sorted);
        setSortedIsChanged(true);
    }
    
    function notSorted(){
        setSortedUsers(users);
        setSortedIsChanged(false);
    }

    function filterName(e) {
        const value = e.toLowerCase();
        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(value)
        );
        setFilteredUsers(filtered);
    }

    function filterPoints(e) {
        const value = e.toLowerCase();
        const filtered = users.filter((user) =>
            user.points.toString().includes(value)
        );
        setFilteredUsers(filtered);
    }

    function filterId(e) {
        const value = e.toLowerCase();
        const filtered = users.filter((user) =>
            user.id.toString().includes(value)
        );
        setFilteredUsers(filtered);
    }
        
    return (
        <div>
            <h3>Users List</h3>
            <select id = "arrange" onChange={(e) => {
                if (e.target.value === "By Name") {
                    sortByName();
                } else if (e.target.value === "By Points") {
                    sortByPoints();
                } else if(e.target.value === "Arrange"){
                    notSorted();
                }
            }}>
                <option> Arrange </option>
                <option> By Name </option>
                <option> By Points </option>
            </select>
            <input id="filterName" type="text"
                   placeholder="Filter name" onChange={(e) => filterName(e.target.value)}></input>
            <input id="filterPoints" type="text"
                   placeholder="Filter points" onChange={(e) => filterPoints(e.target.value)}></input>
            <input id="filterId" type="text"
                   placeholder="Filter ID" onChange={(e) => filterId(e.target.value)}></input>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}