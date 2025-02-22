'use client';
import React, { useState } from 'react';
import Webcam from 'react-webcam';
import Link from 'next/link';


// You can add your icons as components or use an icon library like Material-UI or Font Awesome
import { Close, FlashlightOn } from '@mui/icons-material'; // Adjust based on what you use
import { Button } from '@mui/material';

const CameraPage = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [flashOn, setFlashOn] = useState(false);

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  }, [webcamRef]);

  const handleFlashToggle = () => {
    setFlashOn(!flashOn);
    // Flash toggle logic can be implemented here, depending on your app's requirements
  };

  const handleUploadFromGallery = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', backgroundColor: '#333' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
        <Link href="/">
          <Close fontSize="large" style={{ color: 'white' }} />
        </Link>
      </div>
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
        <button onClick={handleFlashToggle} style={{ background: 'none', border: 'none', color: 'white' }}>
          <FlashlightOn fontSize="large" />
        </button>
      </div>
      
      {isCameraOpen ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70%' }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={{
              facingMode: "environment", // Use rear camera
            }}
            style={{ 
              border: '2px solid #fff', 
              borderRadius: '8px', 
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.6)' 
            }}
          />
        </div>
      ) : (
        <div style={{ textAlign: 'center', paddingTop: '20px', color: 'white' }}>
          {photo ? (
            <img src={photo} alt="Captured" style={{ width: '100%', borderRadius: '8px' }} />
          ) : (
            <p>No photo taken yet</p>
          )}
        </div>
      )}

      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUploadFromGallery}
          style={{ marginBottom: '10px' }}
        >
          Upload from Gallery
        </Button>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={capture}
        >
          Click Photo
        </Button>
      </div>
    </div>
  );
};

export default CameraPage;
