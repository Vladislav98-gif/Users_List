import React, { useState } from 'react';
import "./App.css"
import UsersImport from "./UsersImport";
import { Routes, Route, Link } from 'react-router-dom';




 



function App(){

 
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '' });
  
    const addUser = () => {
      const { firstName, lastName } = newUser;
      if (firstName && lastName) {
        setUsers([...users, { id: users.length + 1, firstName, lastName }]);
        setNewUser({ firstName: '', lastName: '' });
      } else {
        alert('Будь ласка, введіть ім\'я та прізвище.');
      }
    };

return (

      

    <>

    
    
    
      <div className="Global">
        <img
          className="image1"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Lesser_Coat_of_Arms_of_Ukraine.svg/640px-Lesser_Coat_of_Arms_of_Ukraine.svg.png"
          alt="Ухилянт"
          title="Ухилянт"
        />
        <p className="base" title="Danger">
          База даних ухилянтів
        </p>
        <div className="home">
          <img
            className="image2"
            src="https://usagif.com/wp-content/uploads/gifs/book-49.gif.webp"
            alt="Home"
            title="Home" />



        </div>

        <div class='Users'>
          <p class='UklonList'>
            Список ухилянтів
          </p>
          <p title={"Вік: 31рік. Посада: Ухилянт"} class='uklon'>Увага!!! Особливий ухилянт {<name class='Lyoha'>Alexey Borov</name>} знаходиться в активному розшуку!!!</p>
          <div>
      <h1></h1>
     
      
    </div>
        </div >
      
      
        <p>
          
          <UsersImport />
         

        </p>

     
    
        <div>

        </div>
      </div>
      
    
      <header>
      
        
      
      </header>
  
     
    </>
  )
}

    



  


export default App
