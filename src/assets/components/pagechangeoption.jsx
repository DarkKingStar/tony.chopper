const Pagechangeoption=({handlePageChange, Pageno, setPage, setLoading})=> {
    return (<>
    <div className="container md-2" style={{display:"flex",margin:"20px 0 50px",alignItems:"center",justifyContent:"center",width:"100%"}}>
        <button className=' mx-2' disabled={Pageno === 1} onClick={() => handlePageChange(setPage, -1,setLoading)}>{'<'}</button>
        <h3 style={{width:"fit-content",margin:"0"}}>{Pageno}</h3>
        <button className=' mx-2' onClick={() => handlePageChange(setPage, 1,setLoading)}>{'>'}</button>
    </div>
    </>);
}

export default Pagechangeoption;