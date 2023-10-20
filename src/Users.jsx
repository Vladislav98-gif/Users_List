import React, { useState, useEffect } from 'react';

function UserInfo({ user, onBackClick, onEditClick, isEditing, onSaveClick, onCancelClick }) {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleFieldChange = (e, field) => {
    setEditedUser({ ...editedUser, [field]: e.target.value });
  };

  return (
    <div className='Forma'>
      <h1 class='UsersButton'>Інформація про користувача</h1>
      {!isEditing ? (
        <>
          <p><strong>Ім'я:</strong> {user.name}</p>
          <p><strong>Адреса:</strong> {user.address.street}, {user.address.suite}, {user.address.city}</p>
          <p><strong>Номер телефону:</strong> {user.phone}</p>
          <p><strong>Вік:</strong> {user.age}</p>
          <p><strong>Робота:</strong> {user.company.name}</p>
          <p><strong>Стать:</strong> {user.gender}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      ) : (
        <>
          <label>Ім'я: <input type="text" value={editedUser.name} onChange={(e) => handleFieldChange(e, 'name')} /></label><br />
          <label>Адреса: <input type="text" value={editedUser.address.street} onChange={(e) => handleFieldChange(e, 'address.street')} /></label><br />
          <label>Номер телефону: <input type="text" value={editedUser.phone} onChange={(e) => handleFieldChange(e, 'phone')} /></label><br />
          <label>Вік: <input type="text" value={editedUser.age} onChange={(e) => handleFieldChange(e, 'age')} /></label><br />
          <label>Робота: <input type="text" value={editedUser.company.name} onChange={(e) => handleFieldChange(e, 'company.name')} /></label><br />
          <label>Стать: <input type="text" value={editedUser.gender} onChange={(e) => handleFieldChange(e, 'gender')} /></label><br />
          <label>Email: <input type="text" value={editedUser.email} onChange={(e) => handleFieldChange(e, 'email')} /></label><br />
        </>
      )}
      {!isEditing ? (
        <button className='Redact' onClick={onEditClick}>Редагувати</button>
      ) : (
        <>
          <button className='Save' onClick={() => onSaveClick(editedUser)}>Зберегти</button>
          <button className='Cancel' onClick={onCancelClick}>Скасувати</button>
        </>
      )}
      <button class='UsersButton1' onClick={onBackClick}>Повернутися</button>
    </div>
  );
}

function Users() {
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

export default Users;
