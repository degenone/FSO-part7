import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Blog from './Blog';

const BlogList = (props) => {
    const { username } = props;
    const blogs = useSelector((state) => state.blogs);
    return (
        <div>
            {[...blogs]
                .sort((a, b) => {
                    if (a.likes > b.likes) return -1;
                    else if (a.likes < b.likes) return 1;
                    return 0;
                })
                .map((blog) => (
                    <Blog key={blog.id} blog={blog} username={username} />
                ))}
        </div>
    );
};
BlogList.propTypes = {
    username: PropTypes.string.isRequired,
};

export default BlogList;
