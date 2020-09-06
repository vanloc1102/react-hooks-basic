import React from "react";
import PropTypes from "prop-types";

function PostList(props) {
    const { posts } = props;
    return (
        <ul className="post-list">
            {posts.map((post) => {
                return <li key={post.id}>{post.title}</li>;
            })}
        </ul>
    );
}

PostList.propTypes = {
    posts: PropTypes.array,
};

PostList.defaultProps = {
    posts: [],
};

export default PostList;
