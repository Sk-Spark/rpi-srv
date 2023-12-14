import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { FiRefreshCcw  } from "react-icons/fi";


function App() {

  const [iotService, setIotService] = useState<[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [loadData, setLoadData] = useState(true); 

  interface ApiResponse {
    // Define the structure of your API response here
    data: any;
  }

  async function fetchData(apiUrl: string): Promise<ApiResponse> {
    try {
      const response: AxiosResponse = await axios.get(apiUrl);
      // Assuming your API returns JSON data, you can access it using response.data
      return { data: response.data };
    } catch (error: any) {
      // Handle errors here
      if (axios.isAxiosError(error)) {
        // Axios error
        const axiosError: AxiosError = error;
        console.error('Axios error:', axiosError.message);
        throw axiosError;
      } else {
        // Other errors
        console.error('Error:', error.message);
        throw error;
      }
    }
  }

  useEffect(()=>{
    const apiUrl = '/api/mdns'; // Replace with your API endpoint
    fetchData(apiUrl)
    .then((result: ApiResponse) => {
      console.log('API Response:', result.data);
      setIotService(result.data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error('Error:', error);
      setIsLoading(false);
    });
  },[loadData]);

  const getIotService = ()=>{
    return iotService?.map((i:any)=>{
      return <>
        <a className="App-link"
          target="_blank"
          href={`http://${i.IP}`}>{`${i.hostName}`}</a>
      </>
    });
  }


  return (
    <div className="App">
      <header className="App-header">
        <div className='header_div'>
          <p>RPi IOT Server</p>
          <div className='referesh_div' onClick={()=>{
              setLoadData(!loadData);
              setIsLoading(true);
            }}> 
            <FiRefreshCcw className={isLoading?'App-logo':''} />
          </div>
        </div>
        {getIotService()}
      </header>
    </div>
  );
}

export default App;
