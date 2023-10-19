
const StartingLoad = ()=> {
    
    return (<>
        <div style={{
        width:"100vw",
        height:"90vh",
        position:"absolute",
        top:0,
        left:0,
        zIndex:9999,
        background:"#1e1e1e",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"space-between",
        overflow:"hidden"
        }}
        >
          <div style={{
                width:"100%",
                textAlign:"center"}}>
                  <div className="container">
                    <h3 style={{color:"var(--btn-bg-active)"}}><b><i>Starting...</i></b></h3>
                  </div>
          </div>
            <div className="gif-staring" style={{
                width:"100%"
            }}>
              <div className="container" style={{
                position:"absolute",
                top:"50%",
                left:"50%",
                transform:"translate(-50%,-50%)"
              }}>
                <img src="./startpageload.gif"/> 
              </div>
            </div>
            <div className="content" style={{
                width: "100%"
            }}>
            <div className="container">
              <div className="footer__label">
                <h1 className="footer__title" style={{color:"var(--btn-bg-active)"}}>C H O P P E R • I O</h1>
                <span className="footer__subtitle" style={{color:"var(--btn-bg-active)"}}>Watch & Download</span>
              </div>
              <div className="footer__copyright" style={{color:"var(--btn-bg-active)"}}>
                  2023 Copyright &copy; <b>DarkinStar</b>                
              </div>
            </div>
          </div>
        </div>
    </>);
}

export default StartingLoad;