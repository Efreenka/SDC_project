import "./AddButton.css"

const AddButton = (props) => {

    return (
        <button className="add-button" onClick={props.setShowForm}>Add</button>
    )
}

export default AddButton
