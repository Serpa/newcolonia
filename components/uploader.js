import { useState } from 'react';

const ImageUpload = () => {
    const [pictureFile, setpictureFile] = useState(null);

    const pictureChangeHandler = event => {
        setpictureFile(event.target.files[0]);
    };

    const uploadPictureHandler = async () => {
        const pictureData = new FormData();
        pictureData.append('image', pictureFile);
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: profilePicData,
            });
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            setpictureFile(null);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="input-group input-group-sm mb-3">
            <input accept=".doc, .docx" type="file" className="form-control" name='picture' onChange={pictureChangeHandler} />
            <button className={`btn btn-primary btn-sm px-3 ${(!pictureFile) && 'disabled'}`} onClick={uploadPictureHandler}>
                <i className="fa-solid fa-upload"></i> :
            </button>
        </div>
    );
};
export default ImageUpload;