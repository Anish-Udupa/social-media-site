import React from 'react';
import { useState, useEffect } from 'react';
import './ViewPostSmall.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ViewPostSmall({ post_id, seed, setViewFullPost, setViewFullPostId }) {
    const [post, setPost] = useState(null);
    const [ postLiked, setPostLiked ] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:8000/api/post/get/${post_id}`);
            const json = await res.json();

            // if(json.verified)
            //     setPost(json);
            // else
            //     console.log("Unverified post: " + post_id)
            setPost(json);
        console.log(json)
        })();
    }, [postLiked]);


    const postClicked = () => {
        setViewFullPost(true);
        setViewFullPostId(post_id);
    };

    const likePost = async(e) => {
        if(postLiked === false){
            const user = localStorage.getItem("username");
            const post_id = post._id;
            const obj = {
                user: user,
                post_id: post_id,
            };
            try{
                await axios.post("http://localhost:8000/api/incLike", obj)
            }
            catch(err){
                console.log(err);
            }
            // .then(res => {console.log(res)})
            // .catch(err => { console.log(err)})

            setPostLiked(true);
        }
        setViewFullPost(false);
        e.preventDefault();
    }

    return (
        post && (<div className="vp-small-container" onClick={postClicked} onDoubleClick={likePost}>
            { post.verified && (<FontAwesomeIcon className='vp-small-tick' icon={faCheck} />)}
            <img
                className="vp-small-img"
                src={`http://localhost:8000/image/${post.pic}`}
            />
            <div className="vp-small-info-container">
                <div className="vp-small-profile-container">
                    <img
                        className="vp-small-profile-pic"
                        // src={`http://localhost:8000/image/${post.user_details.profile_pic}`}
                        src={"https://picsum.photos/300/450"}
                    />
                    <p>{post.username}</p>
                </div>
                <div className="vp-small-interactions-container">
                    <div className="vp-small-like-container">
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="fa-icon-heart"
                            onClick={likePost}
                        />
                        <p>{post.likes_count}</p>
                    </div>
                    <div className="vp-small-comment-container">
                        <FontAwesomeIcon
                            icon={faComment}
                            className="fa-icon-comment"
                        />
                        <p>{post.comments_count}</p>
                    </div>
                </div>
            </div>
        </div>)
    );
}

export default ViewPostSmall;
