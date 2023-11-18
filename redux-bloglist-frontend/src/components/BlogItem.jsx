import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BlogItem = (props) => {
    const { blog } = props;
    return (
        <Paper sx={{ p: 1 }}>
            <Link to={`blogs/${blog.id}`}>
                <Typography variant='body1'>
                    <strong>{blog.title}</strong> by <i>{blog.author}</i>
                </Typography>
            </Link>
        </Paper>
    );
};
BlogItem.propTypes = {
    blog: PropTypes.object.isRequired,
};

export default BlogItem;
