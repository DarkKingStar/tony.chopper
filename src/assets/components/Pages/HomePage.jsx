import React, { useState, useEffect, useMemo } from 'react';
import Animeholders from '../animeholders';
import { FetchAnimeList } from '../../fetch/fetchanimelist';
import Loading from '../../functions/loading';
import "./HomePage.css";
import SearchBox from '../searchbox';
import Pagechangeoption from '../pagechangeoption';
import SubHeading from './SubHeading';
import BackgroundImage from '../BackgroundImage';
import UpcomingAnime from '../UpcomingAnime';

const HomePage=({})=> {
  const [rrdata, setrrData] = useState([]);
  const [tadata, settaData] = useState([]);
  const [podata,setpoData] = useState([]);
  const [amdata,setamData] = useState([]);

  const [loadingta, setLoadingta] = useState(true);
  const [loadingrr, setLoadingrr] = useState(true);
  const [loadingpo,setLoadingpo] = useState(true);
  const [loadingam,setLoadingam] = useState(true);
  
  const [rrpage, setrrPage] = useState(1);
  const [tapage, settaPage] = useState(1);
  const [popage,setpoPage] = useState(1);
  const [ampage,setamPage] = useState(1);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const recentReleasedData = await FetchAnimeList("recentRelease",rrpage);
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
        const topAiringData = await FetchAnimeList("topAiring",tapage);
        settaData(topAiringData);
        setLoadingta(false)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [tapage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularData = await FetchAnimeList("popular",popage);
        setpoData(popularData);
        setLoadingpo(false)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [popage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animemovieData = await FetchAnimeList('animemovies',ampage);
        setamData(animemovieData);
        setLoadingam(false)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [ampage]);

  const handlePageChange = (setter, delta, setLoading) => {
    setLoading(true);
    setter(prev => Math.max(prev + delta, 1));
  }

  return (
    <>
      <BackgroundImage/>
      <SearchBox/>
      <div className="container" style={{margin:"20px auto"}}>
        <UpcomingAnime/>
      </div>
      <SubHeading text={"Popular"}/>
      <Pagechangeoption handlePageChange={handlePageChange} Pageno={popage} setPage={setpoPage} Loading={loadingpo} setLoading={setLoadingpo}/>
      {loadingpo ? <Loading /> : (
        <>
          <Animeholders jsonData={podata} />
        </>
      )}
      <SubHeading text={"Top Airing"}/>
      <Pagechangeoption handlePageChange={handlePageChange} Pageno={tapage} setPage={settaPage} Loading={loadingta} setLoading={setLoadingta}/>
      {loadingta ? <Loading /> : (
        <>
          <Animeholders jsonData={tadata} />
        </>
      )}
      <SubHeading text={"Latest Update"}/>
      <Pagechangeoption handlePageChange={handlePageChange} Pageno={rrpage} setPage={setrrPage} Loading={loadingrr} setLoading={setLoadingrr}/>
      {loadingrr ? <Loading /> : (
        <>
          <Animeholders jsonData={rrdata} />
        </>
      )}
      <SubHeading text={"Anime Movies"}/>
      <Pagechangeoption handlePageChange={handlePageChange} Pageno={ampage} setPage={setamPage} Loading={loadingam} setLoading={setLoadingam}/>
      {loadingam ? <Loading /> : (
        <>
          <Animeholders jsonData={amdata} />
        </>
      )}
    </>
  );
}

export default HomePage;
