import React, { useState } from "react";
import './App.css';

function App() {
  const [gallery, setGallery] = useState([
    { id: 1, url: "image-1.webp" },
    { id: 2, url: "image-2.webp", },
    { id: 3, url: "image-3.webp", },
    { id: 4, url: "image-4.webp", },
    { id: 5, url: "image-5.webp", },
    { id: 6, url: "image-6.webp", },
    { id: 7, url: "image-7.webp", },
    { id: 8, url: "image-8.webp", },
    { id: 9, url: "image-9.webp", },
    { id: 10, url: "image-10.jpeg", },
    { id: 11, url: "image-11.jpeg", },
    // Add more images here
  ]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);

  const selectedImgeLength = selectedImages.length

  const handleImageClick = (selected, image) => {
    // Filter those images which are not selected otherwise adding image id to selected image
    if (!selected) {
      setSelectedImages(selectedImages.filter((id) => id !== image.id));
    } else {
      setSelectedImages([...selectedImages, image.id]);
    }
  };

  const handleImageDragStart = (image) => {
    // set dragging image to state to memorize
    setDraggedImage(image);
  };

  const handleImageDragOver = (image) => {
    if (draggedImage !== image) {
      // Makeing a deep copy of gallery
      const updatedImages = [...gallery];

      // Dragged image index finding
      const draggedIndex = gallery.indexOf(draggedImage);

      // Target position index finding to set dragged image
      const targetIndex = gallery.indexOf(image);

      // Deleting the dragged image from its previous position from gallery
      updatedImages.splice(draggedIndex, 1);

      // Inserting dragged image in taget Index
      updatedImages.splice(targetIndex, 0, draggedImage);

      // Update the gallery
      setGallery(updatedImages);
    }
  };

  const handleImageDrop = () => {
    // After compleating dragging drag state make empty 
    setDraggedImage(null);
  };


  const handleDeleteSelectedImages = () => {
    // Filtering images which are not selected for selected image deletion 
    const updatedImages = gallery.filter((image) => !selectedImages.includes(image.id));
    setGallery(updatedImages);
    setSelectedImages([]);
  };

  return (
    <div className="mother-container">
      <div className="main-container">
        <div className="controls">
          {
            selectedImgeLength > 0 ?
              <>
                <div><input type="checkbox" checked /> {selectedImgeLength} File Selecetd </div>
                <a onClick={handleDeleteSelectedImages}>
                  Delete Files
                </a>
              </>
              : <div className="txt-btm-border">Gallery </div>
          }

        </div>
        <div className="image-gallery">
          {gallery.map((image, index) => (
            <div
              key={image.id}
              className={`${selectedImages.includes(image.id) ?
                "selected-image-container" :
                "image-container"} ${index == 0 ? 'large-image' : ''}`}
              onDragStart={() => handleImageDragStart(image)}
              onDragOver={() => handleImageDragOver(image)}
              onDrop={handleImageDrop}
              draggable
            >
              <img src={image.url} alt={`Image ${image.url}`} />
              <input className="checkbox" type="checkbox" onChange={(e) => handleImageClick(e.target.checked, image)} />

            </div>
          ))}
          <div className="add-photo">
            <img src="empty.png" />
            Add Images
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
