import { useSelector } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const BlogList = () => {
  const blogs = useSelector(state => state.blogList)

	return ( 
    <div id="blogs-list">
      <Table striped>
        <tbody>
          {blogs
          .sort((b, a) => {
            if (a.likes < b.likes) return -1;
            if (a.name === b.name) return 0;
            return 1;
          })
          .map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
	)
}

export default BlogList;
