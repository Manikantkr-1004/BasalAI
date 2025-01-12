import './App.css'
import { Navbar } from './Component/Navbar';
import { AllRoutes } from './Routes/AllRoutes'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
    <Navbar />
    <AllRoutes />
    <Toaster />
    </>
  )
}

export default App;