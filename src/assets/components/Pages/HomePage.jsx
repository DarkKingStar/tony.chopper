import React, { useState, useEffect } from 'react';
import Animeholders from '../animeholders';
import { FetchAnimeList } from '../../fetch/fetchanimelist';
import Loading from '../../functions/loading';
import "./HomePage.css";
import SearchBox from '../searchbox';
import Pagechangeoption from '../pagechangeoption';

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
          <Pagechangeoption handlePageChange={handlePageChange} Pageno={rrpage} setPage={setrrPage} setLoading={setLoadingrr}/>
        </>
      )}
      <h1>Top Airing</h1>
      {loadingta ? <Loading /> : (
        <>
          <Animeholders jsonData={tadata} />
          <Pagechangeoption handlePageChange={handlePageChange} Pageno={tapage} setPage={settaPage} setLoading={setLoadingta}/>
        </>
      )}
    </>
  );
}

export default HomePage;
