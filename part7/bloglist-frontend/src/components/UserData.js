import React from 'react'

const UserData = ({ userData }) => {
  if (!userData) return <div>404 Not Found</div>
  return (
    <div>
      <h2>{userData.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {userData.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserData
