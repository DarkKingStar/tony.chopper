const Pagechangeoption=({handlePageChange, Pageno, setPage,hasNextPage, Loading, setLoading})=> {
    return (<>
    <div className="container md-2 pagechange">
        <button className=' mx-2' disabled={Pageno === 1 || Loading} onClick={() => handlePageChange(setPage, -1,setLoading)}>{'<'}</button>
        <h3 style={{width:"fit-content",margin:"0"}}>{Pageno}</h3>
        <button className=' mx-2' disabled={!hasNextPage || Loading} onClick={() => handlePageChange(setPage, 1,setLoading)}>{'>'}</button>
    </div>
    </>);
}

export default Pagechangeoption;