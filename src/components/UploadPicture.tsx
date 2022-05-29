import { Button, Card, CardActions, CardContent, CardMedia, Stack } from '@mui/material';
import React, { useState } from 'react';
import ReactImageUploading, { ImageListType } from 'react-images-uploading';
interface Props {
  onChangeImage: (file: File) => void;
}
export const UploadPicture: React.FC<Props> = ({ onChangeImage }) => {
  const [images, setImages] = useState<ImageListType>([]);
  const handleChange = (imagesList: ImageListType) => {
    console.log('Change');
    if (imagesList[0]?.file) {
      setImages(imagesList);
      onChangeImage(imagesList[0].file);
    }
  };

  return (
    <Stack alignItems="center">
      <ReactImageUploading
        value={images}
        onChange={handleChange}
        maxNumber={1}
        dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
          <Card
            sx={{
              marginX: 4,
              width: '400px'
            }}
            onClick={onImageUpload}
            {...dragProps}>
            {imageList.length ? (
              <CardMedia component="img" image={imageList[0].data_url} alt="" width="400" />
            ) : (
              <CardContent
                sx={{
                  backgroundColor: isDragging ? 'red' : 'lightgrey',
                  width: '400px',
                  height: '400px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onClick={onImageUpload}
                {...dragProps}>
                Click or Drop here
              </CardContent>
            )}
            {!!imageList.length && (
              <CardActions>
                <Button
                  onClick={() => {
                    onImageRemove(0);
                    setImages([]);
                  }}>
                  Try another
                </Button>
              </CardActions>
            )}
          </Card>
        )}
      </ReactImageUploading>
    </Stack>
  );
};
