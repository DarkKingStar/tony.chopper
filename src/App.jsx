import './App.css'
import AppRouter from './Approuter';
import { useEffect, useState } from 'react';
import StartingLoad from './assets/components/StartingLoad';


function App() {
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  })

  useEffect(() => {
    if (loading) {
      document.getElementById('main-div').classList.add('Starting-load');
      document.getElementById('footer').classList.add('Starting-load');
    } else {
      document.getElementById('main-div').classList.remove('Starting-load');
      document.getElementById('footer').classList.remove('Starting-load');

    }
  }, [loading]);
  return (
    <>
      {loading && <StartingLoad/>}
      <AppRouter />  
    </>
  )
}

export default App;
