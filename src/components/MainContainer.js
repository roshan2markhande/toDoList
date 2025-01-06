
import ListContainer from './ListContainer';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './MainContainer.css';

function MainContainer () {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/items')
          .then(response => {
            setItems(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the items!', error);
          });
      }, []);    


    const handleAddItem = () => {
        axios.post('http://localhost:5000/items', { name: newItem })
          .then(response => {
            setItems([...items, response.data]);
            setNewItem('');
          })
          .catch(error => {
            console.error('There was an error adding the item!', error);
          });

      };

      const handleDeleteItem = (id) => {
        axios.delete(`http://localhost:5000/items/${id}`)
          .then(response => {
            alert('for delete');
            setItems(items.filter(item => item._id !== id)); // Remove deleted item from state
          })
          .catch(error => {
            console.error('There was an error deleting the item!', error);
          });
      };
    return (
         <div >
        <div className='input-box'>
        <input className='input-item'
        type="text" 
        value={newItem} 
        onChange={(e) => setNewItem(e.target.value)} 
        placeholder="Add new item"
      />
            <input type='button' value='Add Task' className='button' onClick={handleAddItem} />
        </div>
        <ol className='list-task'>
        {items.map((item)=>
           <li key={item.id}> <ListContainer task_val={item} handleDeleteItem={handleDeleteItem}/></li>
        )}
        
        </ol>
        </div>
    )
}
export default MainContainer;

