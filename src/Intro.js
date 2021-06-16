import React from 'react'
import resultImage from './itunes-f-result.png'

function Intro() {
    return (
        <div className="intro-message">
        <div className="intro head2">Here is the preview of search results...</div>
        <img className="intro-img" src={resultImage} alt="results"/>
        </div>
    )
}

export default Intro
