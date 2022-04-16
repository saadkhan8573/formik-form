import React, { useState } from 'react';

export const ImageUpload = ({ fileupload,field }) => {
    const [imageData, setImageData] = useState("https://www.w3schools.com/howto/img_avatar.png")
    const handleChange = (event) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                fileupload('image', reader.result);
                setImageData(reader.result);
            }
        };
        reader.readAsDataURL(event.target.files[0]);
    }
    return (
        <>
            <div className='fileUpload'>
                <img src={imageData} alt="aaa" />
                <input type="file" onChange={handleChange} />
            </div>
        </>
    )
}