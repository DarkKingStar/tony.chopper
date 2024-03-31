import React, { useState, useEffect, useMemo } from 'react';
import Animeholders from '../animeholders';
import { FetchAnimeList } from '../../fetch/fetchanimelist';
import Loading from '../../functions/loading';
import "./HomePage.css";
import SearchBox from '../searchbox';
import Pagechangeoption from '../pagechangeoption';
import SubHeading from './SubHeading';
import BackgroundImage from '../BackgroundImage';


const buttonsData = [
  { label: "New Season", route: "new-season" },
  { label: "Recent Released", route: "recent-released" },
  { label: "Most Popular", route: "popular" },
  { label: "Anime Movies", route: "anime-movies" },
];


const HomePage=({})=> {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  
  const [page, setPage] = useState(1);

  const [route, setRoute] = useState("new-season");

  const [category, setCategory] = useState("New Season");


  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const recentReleasedData = await FetchAnimeList(route,page);
        setData(recentReleasedData);
        setLoading(false)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    console.log("page:",page,"  route:",route)
    fetchData();
  }, [page,route]);


  const handlePageChange = (setter, delta, setLoading) => {
    setLoading(true);
    setter(prev => Math.max(prev + delta, 1));
  }

  const Button = ({ label, route,  currentPage }) => (
    <button
      disabled={route === currentPage}
      className={route === currentPage ? "currentactive-btn" : null}
      style={{ margin: '10px' }}
      onClick={() => {
        setRoute(route);
        setCategory(label);
        setPage(1);
      }}
    >
      {label}
    </button>
  );
  return (
    <>
      <BackgroundImage/>
      <SearchBox/>
      <div style={{ margin: '20px' }}>
        {buttonsData.map((button) => (
          <Button
            key={button.label}
            label={button.label}
            route={button.route}
            currentPage={route}
          />
        ))}
      </div>
      <SubHeading text={category}/>
      
      
      <Pagechangeoption handlePageChange={handlePageChange} Pageno={page} hasNextPage={data.hasNextPage} setPage={setPage} Loading={loading} setLoading={setLoading}/>
      {loading ? <Loading /> : (
        <>
          <Animeholders jsonData={data} />
        </>
      )}
      
    </>
  );
}

export default HomePage;
