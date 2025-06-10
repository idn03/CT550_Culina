import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import InriaTitle from './InriaTitle';
import NormalText from '../override/Text';
import { uploadImage } from '@utils/Helper';
import { spacings } from '@/utils/CulinaStyles';

interface ImageUploaderProps {
  imageUri: { id: string; uri: string };
  setImageUri: (image: { id: string; uri: string }) => void;
  layout: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageUri, setImageUri, layout }) => {
  const handleImageUpload = async () => {
    const result = await uploadImage(layout);
    setImageUri({
      id: result?.id || '',
      uri: result?.url || '',
    });
  };

  return (
    <View style={spacings.mt5}>
      <InriaTitle>Upload Image</InriaTitle>
      <Pressable onPress={handleImageUpload} style={[styles.uploadImg, spacings.mt5]}>
        <Image resizeMode='contain' source={{ uri: imageUri.uri }} style={styles.preview} />
        <NormalText>Choose your Image</NormalText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  uploadImg: {
    width: '100%',
    alignItems: 'center'
  },
  preview: {
    height: 100,
    width: 120,
    borderRadius: 10,
  },
});

export default ImageUploader;