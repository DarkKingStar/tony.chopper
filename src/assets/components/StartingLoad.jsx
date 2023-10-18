
const StartingLoad = ()=> {
    return (<>
        <div style={{
        width:"100vw",
        height:"100vh",
        position:"absolute",
        top:0,
        left:0,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        zIndex:9999,
        background:"#1e1e1e",
        transition: "all 0.5s ease-in"
        }}
        >
        Loading
        </div>
    </>);
}

export default StartingLoad;