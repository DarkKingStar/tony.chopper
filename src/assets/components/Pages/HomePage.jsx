import React, { useState, useEffect } from 'react';
import Animeholders from '../animeholders';
import { FetchAnimeList } from '../../fetch/fetchanimelist';
import Loading from '../../functions/loading';
import "./HomePage.css";
import SearchBox from '../searchbox';

function HomePage() {
  const [rrdata, setrrData] = useState([]);
  const [tadata, settaData] = useState([]);
  const [loadingta, setLoadingta] = useState(true);
  const [loadingrr, setLoadingrr] = useState(true);
  const [rrpage, setrrPage] = useState(1);
  const [tapage, settaPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recentReleasedData = await FetchAnimeList(`recent-release?q=${rrpage}`);
        setrrData(recentReleasedData);
        setLoadingrr(false)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [rrpage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topAiringData = await FetchAnimeList(`top-airing?q=${tapage}`);
        settaData(topAiringData);
        setLoadingta(false)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [tapage]);

  const handlePageChange = (setter, delta, setLoading) => {
    setLoading(true);
    setter(prev => Math.max(prev + delta, 1));
  }

  return (
    <>

      <SearchBox/>
      <h1>Recent Releases</h1>
      {loadingrr ? <Loading /> : (
        <>
          <Animeholders jsonData={rrdata} />
          <h3>Page: {rrpage}</h3>
          <div className="container md-2">
            <button className=' mx-2' onClick={() => handlePageChange(setrrPage, -1,setLoadingrr)}>{'<'}</button>
            <button className=' mx-2' onClick={() => handlePageChange(setrrPage, 1,setLoadingrr)}>{'>'}</button>
          </div>
        </>
      )}
      <h1>Top Airing</h1>
      {loadingta ? <Loading /> : (
        <>
          <Animeholders jsonData={tadata} />
          <h3>Page: {tapage}</h3>
          <div className="container md-2">
            <button className=' mx-2' onClick={() => handlePageChange(settaPage, -1,setLoadingta)}>{'<'}</button>
            <button className=' mx-2' onClick={() => handlePageChange(settaPage, 1,setLoadingta)}>{'>'}</button>
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
