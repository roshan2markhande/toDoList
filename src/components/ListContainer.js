
import './ListContainer.css';

function ListContainer ({task_val,handleDeleteItem}) {
    const handleDelete = () => {
        handleDeleteItem(task_val._id); // Call the delete handler from parent
      };
   
    return (
        <div className='items'>
            <h4 className='input-items' id='id'>{task_val.name}</h4>
            <Button onclick={handleDelete}>{"Delete"}</Button>
        </div>
    )
}

function Button({children,onclick}) {
    return (
        <button className="button" onClick={onclick} >{children}</button>
    )
  }
export default ListContainer
