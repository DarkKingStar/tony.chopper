function Loading(){
    const pStyle = {
        color: 'white',
        position: 'relative',
        fontSize: '20px',
        top:'-90px',
      };
    return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div>
        <img src="./loading.gif" height={250} width={250}/>
        <p style={pStyle}>Loading....</p>
        </div>
    </div>)
}
export default Loading