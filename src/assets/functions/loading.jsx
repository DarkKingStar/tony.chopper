function Loading(){
    const pStyle = {
        color: 'white',
        position: 'relative',
        fontSize: '20px',
        top:'-90px',
      };
    return(
    <><img src="./loading.gif" height={250} width={250}/>
        <p style={pStyle}>Loading....</p>
    </>)
}
export default Loading