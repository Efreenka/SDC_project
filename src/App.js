import { useState, useEffect } from "react"
import Table from "./components/Table"
import Form from './components/Form'
import AddButton from './components/AddButton'
import useShowForm from "./hooks"
import Papa from 'papaparse'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [CSVData, setCSVData] = useState([])
  const [CSVHeaders, setCSVHeaders] = useState([])

  const { ref, showForm, setShowForm } = useShowForm(false)

  const getCSV = () => {
    Papa.parse("/react-data.csv", {
      header: true,
      download: true,
      delimeter: ";",
      skipEmptyLines: true, 
      complete: (result) => {
        setCSVData(result.data)
        setCSVHeaders([{
          Header: "UID",
          accessor: "uid"
        },
        {
          Header: "First Name",
          accessor: "first name"
        },
        {
          Header: "Last Name",
          accessor: "last name"
        },
        {
          Header: "Username",
          accessor: "username"
        },
        {
          Header: "Email",
          accessor: "email"
        },
        {
          Header: "Phone Number",
          accessor: "phone number"
        },
        {
          Header: "Access Allowed",
          accessor: "access allowed",
          Cell: ({ cell: { value } }) => < input type={"checkbox"} checked = {value === "true"} disabled/>
        },
        {
          Header: "Hired Since",
          accessor: "hired since",
          Cell: ({ cell: { value } }) => {
            const date1 = Date.parse(value)
            const date = new Date(date1).getDate()
            const month = new Date(date1).getMonth()
            const year = new Date(date1).getFullYear()
            return value && `${date}. ${month}. ${year}`
          }
        },
        ])
      }
    })
  }

  useEffect( () => {
    getCSV()
  }, [])

  return ( CSVData &&
    <div>
      <ToastContainer />
      <AddButton setShowForm={() => setShowForm(true)}/>
      <Form data={CSVData} setData={setCSVData} refForm={ref} showForm={showForm} hideForm={() => setShowForm(false)} />
      <Table columns={CSVHeaders} data={CSVData} />
    </div>
    
  )
}

export default App
