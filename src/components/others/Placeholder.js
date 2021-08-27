import React from 'react'
import './placeholder.css'

const Placeholder = () => {

    const mystyle = {
        color: "white",
        backgroundColor: "#499167",
        padding: "20px",
        marginTop: "100px",
        marginBottom: "100px",
        textAlign: "center",
        animationDuration: "1.5s",
        animationName: "slidein",
        animationIterationCount: "infinite",
        animationDirection: "alternate"
    };

    return (
        <div className="container main">
            <div style={mystyle} className="soon">
                <h1>Welcome to Okaziyo</h1>
                <p>This page will be available soon, stay in touch ...</p>
            </div>
        </div>
    )
}

export default Placeholder
