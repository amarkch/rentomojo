import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import './App.css';

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            postList: [],
            userId: this.props.match.params.id,
            postLimitPerPage: 10
        }
    }
    componentDidMount() {
        this.getPostList(0);

        console.log(this.props);
    }
    getPostList = (skip) => {
        const { userId, postLimitPerPage } =  this.state;
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&skip=${skip}&limit=${postLimitPerPage}`,{
            method: 'get'
        }).then((res) => res.json()).then((resp) => {
            this.setState({
                postList:  resp
            });
        })
    }
    render() {
        const { postList, userId } = this.state;
        return (
            <div className="user-holder">
                <h3> List of posts</h3>
                 <div className="head-row">
                    <div className="cell-no">
                        No
                    </div>
                    <div className="cell-title">
                        Title
                    </div>
                     <div className="cell-read">
                        Title
                    </div>
                </div>
                {
                    postList.map((aPost, idx) => {
                        return (
                            <div className="user-row">
                                <div className="cell-no">
                                    {idx + 1}
                                </div>
                                <div className="cell-title">
                                    {aPost.title}
                                </div>
                                <div className="cell-read">
                                    <Link to={`/post-details/${userId}/${aPost.id}`} > Read </Link>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="pagination-holder">
                    <div className="page" onClick={() => this.getPostList(10)}>
                        1
                    </div>
                    <div className="page" onClick={() => this.getPostList(20)}>
                        2
                    </div>
                    <div className="page" onClick={() => this.getPostList(30)}>
                        3
                    </div>
                    <div className="page" onClick={() => this.getPostList(40)}>
                        4
                    </div>
                    <div className="page" onClick={() => this.getPostList(50)}>
                        5
                    </div>
                </div>
            </div>
        );
    }      
};

export default PostList;
