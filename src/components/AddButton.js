import "./AddButton.css"

const AddButton = (props) => {
    return (
        <button className="add-button" onClick={props.setShowForm}>Přidat</button>
    )
}

export default AddButton
