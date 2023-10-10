import React, { useState, useEffect, useMemo } from 'react';
import Animeholders from '../animeholders';
import { FetchAnimeList } from '../../fetch/fetchanimelist';
import Loading from '../../functions/loading';
import "./HomePage.css";
import SearchBox from '../searchbox';
import Pagechangeoption from '../pagechangeoption';
import SubHeading from './SubHeading';

function HomePage() {
  const [rrdata, setrrData] = useState([]);
  const [tadata, settaData] = useState([]);
  const [loadingta, setLoadingta] = useState(true);
  const [loadingrr, setLoadingrr] = useState(true);
  const [rrpage, setrrPage] = useState(() => {
    const storedValue = parseInt(localStorage.getItem('rrpage')) || 1;
    return storedValue;
  });
  const [tapage, settaPage] = useState(() => {
    const storedValue = parseInt(localStorage.getItem('tapage')) || 1;
    return storedValue;
  });

  useEffect(() => {
    localStorage.setItem('rrpage', rrpage.toString());
  }, [rrpage]);

  useEffect(() => {
    localStorage.setItem('tapage', tapage.toString());
  }, [tapage]);

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
      <SubHeading text={"Recent Releases"}/>
      <Pagechangeoption handlePageChange={handlePageChange} Pageno={rrpage} setPage={setrrPage} Loading={loadingrr} setLoading={setLoadingrr}/>
      {loadingrr ? <Loading /> : (
        <>
          <Animeholders jsonData={rrdata} />
        </>
      )}
      <SubHeading text={"Top Airing"}/>
      <Pagechangeoption handlePageChange={handlePageChange} Pageno={tapage} setPage={settaPage} Loading={loadingta} setLoading={setLoadingta}/>
      {loadingta ? <Loading /> : (
        <>
          <Animeholders jsonData={tadata} />
        </>
      )}
    </>
  );
}

export default HomePage;
