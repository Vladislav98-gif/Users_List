import React, { useState } from 'react';

function UserInfo({ user, onBackClick, onEditClick, isEditing, onSaveClick, onCancelClick }) {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleFieldChange = (e, field) => {
    setEditedUser({ ...editedUser, [field]: e.target.value });
  };

  return (
    <div className='Forma'>
      <h1 className='UsersButton'>Інформація про користувача</h1>
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
      <button className='UsersButton1' onClick={onBackClick}>Повернутися</button>
    </div>
  );
}

export default UserInfo;
