import React from 'react';
import logo from './logo.svg';
import { Link, withRouter } from 'react-router-dom';
import './App.css';

class PostDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            postData: '',
            commentsList: [],
            postId: this.props.match.params.id,
            userId: this.props.match.params.userId,
            commentShowOrHide: false,
        }
    }
    componentDidMount() {
        this.getPostDetails();
        console.log(this.props);
    }
    getComments = () => {
        const { postId, commentShowOrHide } =  this.state;
        if (!commentShowOrHide) {
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`,{
                method: 'get'
            }).then((res) => res.json()).then((resp) => {
                this.setState({
                    commentsList:  resp,
                    commentShowOrHide: true,
                });
            })
        } else {
            this.setState({
                commentShowOrHide: false,
            });
        }
        
    }
    getPostDetails = () => {
        const { postId } =  this.state;
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'get'
        }).then((res) => res.json()).then((resp) => {
            this.setState({
                postData:  resp
            });
        })
    }
    deletePost = () => {
        const { postId, userId } =  this.state;
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'delete'
        }).then((res) => res.json()).then((resp) => {
            this.props.history.push(`/post-list-of-user/${userId}`);
        })
        
    }
    render() {
        const { postData, commentsList, commentShowOrHide } = this.state;
        return (
            <div className="post-desc">
                <div className="post-card-header">
                    <div className="title-holder">
                        <h1>{postData.title}</h1>
                    </div>
                    <div className="delete-button-holder">
                        <button onClick={this.deletePost}>delete</button>
                    </div>
                </div>
                <div>{postData.body}</div>
                <div className="comments-holder">
                    <h3> Comments </h3>
                    {
                        commentShowOrHide && commentsList.map(aComment => {
                            return (
                                <div className="comment-row">
                                    <b><span className="user">{aComment.email}</span></b>: {aComment.body}
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={this.getComments}> { !commentShowOrHide ? 'Show Comments' : 'Hide Comment' } </button>
            </div>
        );
    }      
};

export default withRouter(PostDetails);
