import React from 'react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
const GalleryHotels = () => {

    const images = [
  {
    original: 'https://q-xx.bstatic.com/xdata/images/hotel/840x460/71647704.jpg?k=6cb5d62e54d7d4ba79f745b0d2c2a2f96722e84e0ae8ac1c057e84218817ce38',
    thumbnail: 'https://q-xx.bstatic.com/xdata/images/hotel/840x460/71647704.jpg?k=6cb5d62e54d7d4ba79f745b0d2c2a2f96722e84e0ae8ac1c057e84218817ce38',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    
        },
  
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
    ];
    
    return (
        <div style={{ padding: 20,display:"flex",flexDirection:"column",alignItems:"center" }}>
            <h3 style={{ margin: 20 }}> صور فندق ديفان اربيل</h3>
            <div style={{width:"100%"}}>
  <ImageGallery items={images} isRTL />
            </div>
          
        </div>
    )
}

export default GalleryHotels
