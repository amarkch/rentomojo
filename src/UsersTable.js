import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import './App.css';

class UsersTable extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            userData: []
        }
    }
    componentDidMount() {
        this.getUserData();
    }
    getUserData = () => {
        const that = this;
        fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()).then((resp) => {
            that.setState({
                userData: resp
            });
        })
    }
    render() {
        const { userData } = this.state;
        return (
            <div className="user-holder">
                <h3>Users List</h3>
                 <div className="head-row">
                    <div className="cell">
                        Name
                    </div>
                    <div className="cell">
                        Company
                    </div>
                    <div className="cell">
                        Her/His post
                    </div>
                </div>

                {
                    userData.map( anUser => {
                        return (
                            <div className="user-row">
                                <div className="cell">
                                    {anUser.name}
                                </div>
                                <div className="cell">
                                    {anUser.company.name}
                                </div>
                                <div className="cell">
                                    <Link to={`post-list-of-user/${anUser.id}`} > Her/His Post </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }      
};

export default UsersTable;
