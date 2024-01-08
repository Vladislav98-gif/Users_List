import React, { useState, useEffect } from 'react';
import UserInfo from './UserInfo';

function UsersImport() {
  const [users, setUsers] = useState([]);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserInfoVisible, setUserInfoVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Помилка запиту до сервера:', error));
  }, []);

  const addUser = () => {
    if (newUser.firstName && newUser.lastName) {
      const user = {
        id: users.length + 1,
        name: `${newUser.firstName} ${newUser.lastName}`,
      };

      setUsers([...users, user]);
      setNewUser({ firstName: '', lastName: '' });
      setShowNewUserForm(false);
    } else {
      alert("Будь ласка, введіть ім'я та прізвище.");
    }
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleUserInfoClick = (user) => {
    setSelectedUser(user);
    setUserInfoVisible(true);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
    setUserInfoVisible(false);
    setIsEditing(false); // Скасовуємо режим редагування при поверненні
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = (editedUser) => {
    // Оновлюємо інформацію про користувача на сервері або в іншому місці для збереження даних.
    // Після успішного оновлення даних можна оновити стан користувачів на сторінці.
    const updatedUsers = users.map(user => (user.id === editedUser.id ? editedUser : user));
    setUsers(updatedUsers);
    setIsEditing(false);
  };

  return (
    <div>
      <div className='List'>
        <button className='New-User' onClick={() => setShowNewUserForm(true)}>
          Новий користувач
        </button>
        {!isUserInfoVisible ? (
          <ul>
            {users.map(user => (
              <div className='user-item' key={user.id}>
                {user.name}
                <button className='info' onClick={() => handleUserInfoClick(user)}>Інфо</button>
                <button className='Delete' onClick={() => deleteUser(user.id)}>Видалити</button>
              </div>
            ))}
          </ul>
        ) : null}
      </div>

      {showNewUserForm && !isUserInfoVisible ? (
        <div className='CreateForm'>
          <h2>Форма створення користувача</h2>
          <input
            type="text"
            placeholder="Ім'я"
            value={newUser.firstName}
            onChange={e => setNewUser({ ...newUser, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Прізвище"
            value={newUser.lastName}
            onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
          />
          <button className='New-User2' onClick={addUser}>
            Створити користувача
          </button>
        </div>
      ) : null}

      {selectedUser && isUserInfoVisible && (
        <UserInfo
          user={selectedUser}
          onBackClick={handleBackClick}
          onEditClick={handleEditClick}
          isEditing={isEditing}
          onSaveClick={handleSaveClick}
          onCancelClick={handleCancelClick}
        />
      )}
    </div>
  );
}

export default UsersImport;
