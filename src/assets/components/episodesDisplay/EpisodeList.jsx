// EpisodeList.js
import React, { useState } from 'react';
import FadeInFromRight from '../../functions/FadeInFromRight';
import FadeInFromLeft from '../../functions/FadeinFromLeft';
import ScaleIn from '../../functions/ScaleIn';


const EpisodeList = ({  episodeList, linkoption, handleEpisodeClick, currentPage, enablenext, goToNextPage, 
  slicing, goToPreviousPage,  handleJumpTo, handleSlicing,lastepisodenumber,watchPageFlag}) => {
  const [jumpTo,setJumpTo] = useState(0);
  const evalue = new URLSearchParams(window.location.search).get('e');
  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    if(Number(inputValue) > Number(lastepisodenumber)){
      setJumpTo(lastepisodenumber);
    }else{
      setJumpTo(inputValue);
    }
  };

  console.log(episodeList)
  return (<>
  {episodeList.length != 0 ? 
  <div>
  {/* Jump to episode input*/}
  <FadeInFromLeft value={
  <div className='ranging'>
    <input type="text" value={jumpTo||""} onChange={handleInputChange} placeholder='Jump To....'/>
    <button onClick={()=>handleJumpTo(jumpTo)}><ScaleIn value={"Go"}/></button>
  </div>}/>

  {/* Display Episodes */}
  <FadeInFromRight value={
    <div className="episode-box">
    {episodeList.map((link) => (
      <button 
        key={link.number}
        onClick={() => {
          handleEpisodeClick(link.number);
          //add the code here
      }}
        className={`${((evalue?.split('-')[evalue?.split('-').length - 1] == link?.number) || (!watchPageFlag && linkoption == link?.number)) ?"currentactive-btn":""}`}
      >
        <ScaleIn value={link?.number}/>
      </button>
    ))}
  </div>
  }/>
  
  {/* Navigation Buttons */}
  <FadeInFromLeft value={
  <div className="pagination">
    <button onClick={goToPreviousPage} disabled={currentPage === 1}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px"  height="24px">
      <g fill="#fff" transform="rotate(180 12 12)">
        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
        <path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z"/>
      </g>
    </svg>
    </button>
    <select  onSelect={(e) => handleSlicing(parseInt(e.target.value))}>
    <option value={20}>20</option>
    <option value={40}>40</option>
    <option value={50}>50</option>
    <option value={100}>100</option>
    </select>
    <button onClick={goToNextPage} disabled={enablenext}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px"  height="24px">
      <g fill="#fff">
      <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
      <path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z"/>
      </g>
    </svg>
    </button>
  </div>
  }/>
</div>
  :
  <FadeInFromLeft value={
    <div>
      <h4>Not yet Available</h4>
    </div>}/>
    
    
    
  }</>
    
  );
};
export default EpisodeList;
