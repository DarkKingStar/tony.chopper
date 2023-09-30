// EpisodeList.js
import React, { useState } from 'react';


const EpisodeList = ({  episodeList, handleEpisodeClick, currentPage, totalPages, goToNextPage, 
  slicing, goToPreviousPage,  handleJumpTo, handleSlicing}) => {
  const [jumpTo,setJumpTo] = useState(0);

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setJumpTo(inputValue);
  };
  return (
    <div>
      {/* Display Episodes */}
      <div className="episode-box">
        {episodeList.map((link) => (
          <button 
            key={link.number}
            onClick={() => handleEpisodeClick(link.number)}
          >
            {link.number}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Prev {slicing}</button>
        <select  onChange={(e) => handleSlicing(parseInt(e.target.value))}>
        <option value={20}>20</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        </select>
        <button onClick={goToNextPage} disabled={currentPage >= totalPages}>Next {slicing}</button>
      </div>


      {/* Jump to episode input*/}
      <div className='ranging'>
        <input type="text" value={jumpTo||""} onChange={handleInputChange} placeholder='Jump To....'/>
        <button onClick={()=>handleJumpTo(jumpTo)}>Go</button>
      </div>
    </div>
  );
};
export default EpisodeList;
