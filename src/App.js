import { useState, useEffect } from "react"
import Table from "./components/Table"
import Form from './components/Form'
import AddButton from './components/AddButton'
import useShowForm from "./hooks"
import Papa from 'papaparse'

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
        setCSVHeaders(result.meta.fields.map((oneHeader) => {
          return {
            Header: oneHeader,
            accessor: oneHeader,
          }
        }))
      }
    })
  }
  
  useEffect( () => {
    getCSV()
  }, [])

  useEffect(() => {
    console.log(CSVData)
    const savedData = Papa.unparse(CSVData, {
      quotes: false,
	    quoteChar: '"',
      escapeChar: '"',
      delimiter: ";",
      header: true,
      newline: "\r\n",
      skipEmptyLines: false, 
      columns: null
    })
    console.log(savedData)
  }, [CSVData]);

  return ( CSVData &&
    <div>
      <AddButton setShowForm={() => setShowForm(true)}/>
      <Form data={CSVData} setData={setCSVData} refForm={ref} showForm={showForm} hideForm={() => setShowForm(false)} />
      <Table columns={CSVHeaders} data={CSVData} />
    </div>
    
  )
}

export default App
