import React, { useState } from 'react';

const TattooGenerator = () => {
    const [text, setText] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [tattooImage, setTattooImage] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
        setUploadedImage(null); // Reset uploaded image if text is entered
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
            setText(''); // Reset text if image is uploaded
        }
    };

    const renderNewIdea = () => {
        // Implement logic to generate a tattoo based on text or uploaded image
        // This is a placeholder action; replace with actual image generation logic
        setTattooImage('path/to/generated/tattoo/image.png');
    };

    return (
        <div>
            <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Describe your tattoo idea..."
                rows={4}
                style={{ width: '100%', maxWidth: '500px', marginBottom: '10px' }}
                disabled={uploadedImage !== null}
            />
            <br />
            <input type="file" onChange={handleImageUpload} disabled={text !== ''} style={{ marginBottom: '10px' }} />
            <br />
            <button
                onClick={renderNewIdea}
                style={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '30px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    display: 'block',
                    color: 'black'
                }}
            >
                Render new idea
            </button>
            {tattooImage && (
                <div 
                    style={{ 
                        width: '300px', 
                        height: '300px', 
                        marginTop: '20px',
                        border: '1px dashed rgba(255,255,255,0.2)', // Dashed border added
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <img src={tattooImage} alt="Generated Tattoo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
            )}
        </div>
    );
};

export default TattooGenerator;
