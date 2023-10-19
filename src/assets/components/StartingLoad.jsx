
const StartingLoad = ()=> {
    
    return (<>
        <div style={{
        width:"100vw",
        height:"100vh",
        position:"absolute",
        top:0,
        left:0,
        zIndex:9999,
        background:"#1e1e1e",
        color:"var(--btn-bg-active)"
        }}
        >
            <div className="gif-staring" style={{
                position:"absolute",
                width:"fit-content",
                top:"50%",
                left:"50%",
                textAlign:"center",
                transform:"translate(-50%,-50%)"
            }}>
                <img src="./startpageload.gif"/>
                   <p style={{color:"var(--btn-bg-active)"}}><b><i>Starting...</i></b></p> 
            </div>
            <div className="content" style={{
                position:"absolute",
                width: "100%",
                bottom:"0",
                left:"50%",
                transform:"translate(-50%,0)"
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