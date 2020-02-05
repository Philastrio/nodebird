import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s]+)/g).map(tag => {
        if (tag.match(/#[^\s]+/)) {
          return (
            <Link
              href={{
                pathname: "/hashtag",
                query: { tag: tag.slice(1) }
              }}
              as={`/hashtag/${tag.slice(1)}`}
              key={tag}
            >
              <a>{tag}</a>
            </Link>
          );
        }
        return tag;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired
};

export default PostCardContent;
