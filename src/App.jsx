import { useState } from 'react'
// import BasicTable from './components/BasicTable'
import Header from './components/Header'
import DataTable from './components/DataTable'
import Footer from './components/Footer'
// import Sidebar from './components/Sidebar'





import './App.css'

function App() {

  return (
    <div className="app">
      <Header />
      <DataTable />
      <Footer />
      {/* <Sidebar /> */}
    </div>
  )
}

export default App
