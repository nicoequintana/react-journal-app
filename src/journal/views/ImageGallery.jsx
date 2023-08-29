
import { ImageList, ImageListItem } from '@mui/material';


export const ImageGallery = ({ images }) => {
  return (

    <ImageList className="animate__animated animate__fadeIn animate__faster" sx={{ width: "100%", height: 500 }} cols={4} rowHeight={200}>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            alt='Imagen de la nota'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
