import React from 'react'

function Result(props) {
    const {artworkUrl100,collectionName,trackName,trackViewUrl,artistName}=props;
    return (
        <div className="items">
            <img src={artworkUrl100} alt={trackName}/>
            <h3 className="trackname">{trackName}</h3>
            <h5 className="artist"><span>Artists: </span>{artistName}</h5>
            <h5 className="album"><span>Album:</span> {collectionName}</h5>
            <a href={trackViewUrl} target="_blank" rel="noreferrer"><button type="button" className="items-btn">Go to iTunes</button></a>
        </div>
    )
}

export default Result
