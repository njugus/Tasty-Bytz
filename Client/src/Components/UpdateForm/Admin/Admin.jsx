// import './Admin.css'
// import Header from '../../../Header';
// import React, { useEffect } from 'react';
// import useUserStore from './users';
// import { useUser } from '../../../Context/Context';

// function Admin() {
//     const { users,categories, loading, error,  fetchAllUsers, fetchAllCategories} = useUserStore();
//     const user = useUser();
//     // const [newCategory, setNewCategory] = useState({ name: '',  description: '' });
//     console.log(user);
//     if(loading) return <div>Loading.......</div>
//     if(error) return <div>Error......{error}</div>
//     return (
//         <section className="main-section"> 
//         <section className="Sidebar">
//             <h1 className="main-heading">Admin Dashboard</h1>
//             <ul className="sidebar-links" style={{listStyleType: "none", textDecoration: "none"}}>
//                 <li><a onClick={() => fetchAllUsers()}>Manage Users </a></li>
//                 <li><a onClick={() => fetchAllCategories()}>Manage Categories</a></li>
//                 <li>Reports</li>
//                 <li>Settings</li>   
//             </ul>
//         </section>
//         <section className="main">
//         <section className="User-Management-section">
//                 <h1>Welcome {user.user.data.first_name}</h1>
//                 <h1>Users Management</h1>
//                 <div className="management-table">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>First_Name</th>
//                                 <th>Second_Name</th>
//                                 <th>Email Address</th>
//                                 <th>Role</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map(counsellor => (
//                                 <tr key={counsellor.id}>
//                                     <td>{counsellor.first_name}</td>
//                                     <td>{counsellor.last_name}</td>
//                                     <td>{counsellor.email}</td>
//                                     <td>{counsellor.role}</td>
//                                     <td>
//                                         <button className="button delete" onClick={() => deleteCounsellor(counsellor.id)}>Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </section>
//             <section className="categories section">
//             <div className="management-table">
//                 <h1 style={{textAlign:"center"}}>Categories Management</h1>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Description</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {categories.map(counsellor => (
//                                 <tr key={counsellor.id}>
//                                     <td>{counsellor.name}</td>
//                                     <td>{counsellor.description}</td>
//                                     <td>
//                                         <button className="button delete">Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="add-counsellor">
//                     <input
//                         type="text"
//                         placeholder="Name"
//                         value={newCategory.name}
//                         onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Qualifications"
//                         value={newCategory.description}
//                         onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
//                     />
//                     <button className="button add" onClick={handleAdd}>Add Category</button>
//                 </div>
//             </section>

//         </section>
//         </section>
//     )
// }

// export default Admin;

// Admin.jsx
import './Admin.css';
import Header from '../../../Header';
import React, { useEffect } from 'react';
import useUserStore from './users';
import { useUser } from '../../../Context/Context';

function Admin() {
  const { users, categories, loading, error, fetchAllUsers, fetchAllCategories, newCategory, setNewCategory, addNewCategory } = useUserStore();
  const { user } = useUser(); // Correctly destructure user context

  useEffect(() => {
    fetchAllUsers();
    fetchAllCategories();
  }, [fetchAllUsers, fetchAllCategories]); // Fetch data on mount

  if (loading) return <div>Loading.......</div>;
  if (error) return <div>Error......{error}</div>;

  const handleAdd = async () => {
    await addNewCategory();
  };

  return (
    <section className="main-section"> 
      <section className="Sidebar">
        <h1 className="main-heading">Admin Dashboard</h1>
        <ul className="sidebar-links" style={{listStyleType: "none", textDecoration: "none"}}>
          <li><a onClick={fetchAllUsers}>Manage Users </a></li>
          <li><a onClick={fetchAllCategories}>Manage Categories</a></li>
          <li>Reports</li>
          <li>Settings</li>   
        </ul>
      </section>
      <section className="main">
        <section className="User-Management-section">
          <h1>Welcome {user.data.first_name}</h1>
          <h1>Users Management</h1>
          <div className="management-table">
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Address</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="button delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="categories-section">
          <div className="management-table">
            <h1 style={{textAlign:"center"}}>Categories Management</h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>
                      <button className="button delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="add-category">
            <input
              type="text"
              placeholder="Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            />
            <button className="button add" onClick={() => handleAdd()}>Add Category</button>
          </div>
        </section>
      </section>
    </section>
  )
}

export default Admin;

