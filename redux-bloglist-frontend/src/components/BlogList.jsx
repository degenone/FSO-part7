import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogList = () => {
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
                    <Blog key={blog.id} blog={blog} />
                ))}
        </div>
    );
};

export default BlogList;
