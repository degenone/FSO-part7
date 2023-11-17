import PropTypes from 'prop-types';

const BlogItem = (props) => {
    const { blog } = props;
    const blogStyle = {
        paddingTop: '0.4rem',
        paddingBottom: '0.4rem',
        paddingLeft: '0.5rem',
        border: 'dashed',
        borderWidth: '2px',
        marginBottom: 5,
    };
    return (
        <div style={blogStyle}>
            <div className='blog-header'>
                <a href={`blogs/${blog.id}`}>
                    <strong>{blog.title}</strong> by <i>{blog.author}</i>
                </a>
            </div>
        </div>
    );
};
BlogItem.propTypes = {
    blog: PropTypes.object.isRequired,
};

export default BlogItem;
