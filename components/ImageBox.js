import React from 'react';



const GeneratedImageCard = ({ finalData, isLoading }) => {
    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid rgba(255, 255, 255, 0.8)', // White border with 80% opacity
        padding: '20px',
        marginTop: '20px',
        borderRadius: '10px',
        backgroundColor: 'transparent',

    };
   


    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '400px', // Set a max height for the image
        borderRadius: '8px',
    };
    
    return (
        <div style={cardStyle}>
            {isLoading ? (
                <p>Loading...</p>
            ) : finalData ? (
                <img src={finalData} alt="Generated Tattoo" style={imageStyle} />
            ) : (
                <p>No image generated yet</p>
            )}
        </div>
    );

};



export default GeneratedImageCard;
