import React, { useState, useEffect } from 'react';
import api from '../services/api';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    age: '',
    city: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // GET - Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // POST - Create new user
  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '', age: '', city: '' });
      alert('User created successfully!');
    } catch (error) {
      alert('Failed to create user');
    }
  };

  // PUT - Update user
  const updateUser = async (id, updatedUser) => {
    try {
      const response = await api.put(`/users/${id}`, updatedUser);
      setUsers(users.map(user => 
        user.id === id ? response.data : user
      ));
      setEditingUser(null);
      alert('User updated successfully!');
    } catch (error) {
      alert('Failed to update user');
    }
  };

  // DELETE - Remove user
  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
        alert('User deleted successfully!');
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Manager (Axios CRUD)</h2>
      
      {/* Create User Form */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
        <h3>Add New User</h3>
        <form onSubmit={createUser}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            required
            style={{ margin: '5px', padding: '8px' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            required
            style={{ margin: '5px', padding: '8px' }}
          />
          <input
            type="number"
            placeholder="Age"
            value={newUser.age}
            onChange={(e) => setNewUser({...newUser, age: e.target.value})}
            required
            style={{ margin: '5px', padding: '8px' }}
          />
          <input
            type="text"
            placeholder="City"
            value={newUser.city}
            onChange={(e) => setNewUser({...newUser, city: e.target.value})}
            required
            style={{ margin: '5px', padding: '8px' }}
          />
          <button type="submit" style={{ margin: '5px', padding: '8px 15px' }}>
            Add User
          </button>
        </form>
      </div>

      {/* Users List */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h3>Users List</h3>
          {users.map(user => (
            <div key={user.id} style={{ 
              border: '1px solid #ddd', 
              margin: '10px 0', 
              padding: '10px' 
            }}>
              {editingUser === user.id ? (
                <EditUserForm 
                  user={user} 
                  onSave={updateUser}
                  onCancel={() => setEditingUser(null)}
                />
              ) : (
                <div>
                  <strong>{user.name}</strong> - {user.email} 
                  <br />
                  Age: {user.age}, City: {user.city}
                  <br />
                  <button 
                    onClick={() => setEditingUser(user.id)}
                    style={{ margin: '5px' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteUser(user.id)}
                    style={{ margin: '5px', backgroundColor: '#ff4444', color: 'white' }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Edit User Form Component
const EditUserForm = ({ user, onSave, onCancel }) => {
  const [editData, setEditData] = useState(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user.id, editData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={editData.name}
        onChange={(e) => setEditData({...editData, name: e.target.value})}
        style={{ margin: '5px', padding: '8px' }}
      />
      <input
        type="email"
        value={editData.email}
        onChange={(e) => setEditData({...editData, email: e.target.value})}
        style={{ margin: '5px', padding: '8px' }}
      />
      <input
        type="number"
        value={editData.age}
        onChange={(e) => setEditData({...editData, age: e.target.value})}
        style={{ margin: '5px', padding: '8px' }}
      />
      <input
        type="text"
        value={editData.city}
        onChange={(e) => setEditData({...editData, city: e.target.value})}
        style={{ margin: '5px', padding: '8px' }}
      />
      <button type="submit" style={{ margin: '5px' }}>Save</button>
      <button type="button" onClick={onCancel} style={{ margin: '5px' }}>Cancel</button>
    </form>
  );
};

export default UserManager;