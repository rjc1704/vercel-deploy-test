import React from 'react';
import { useState } from 'react';

import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { v4 } from 'uuid';

import { getImgUrl, postUserProfileImg } from '@/app/api/mypage';

interface ImageUploadProps {
  onSuccess: (imageUrl: string) => void;
  profileImg?: string | null | undefined;
}

const profileDefault =
  'https://fvkzqozjdtlaogexuuin.supabase.co/storage/v1/object/public/project/userProfileImg/userProfileDefault?t=2023-09-04T01%3A41%3A06.168Z';

export function ImageUpload({ onSuccess, profileImg }: ImageUploadProps) {
  const [previewImg, setPreviewImg] = useState<string | undefined>(undefined);

  const uploadImageAndGetUrl = async (imgFile: File, imgName: string) => {
    try {
      await postUserProfileImg({ imgFile, imgName });
      const imgUrlResponse = await getImgUrl(imgName);
      return imgUrlResponse.data.publicUrl;
    } catch (error) {
      throw error;
    }
  };

  const handleImageUpload = async (imgFile: File | undefined) => {
    try {
      if (imgFile) {
        const imgName = v4();
        const imgUrl = await uploadImageAndGetUrl(imgFile, imgName);

        onSuccess(imgUrl);
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
    }
  };

  const handleImageChange = (selectedFile: File | undefined) => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
        if (typeof reader.result === 'string') {
          setPreviewImg(reader.result);

          await handleImageUpload(selectedFile);
        } else {
          setPreviewImg(undefined);
        }
      };
    }
  };

  const handleImageCancel = () => {
    setPreviewImg(undefined);
  };

  const { getInputProps } = useDropzone();

  return (
    <>
      {typeof previewImg === 'string' ? (
        <div className="flex flex-col items-center">
          <Image
            src={previewImg}
            alt="Preview Profile Image"
            width={100}
            height={100}
            className="w-32 h-32 flex justify-center overflow-hidden object-cover rounded-md mx-auto m-2"
          />
          <button className="text-sm opacity-50 mb-2" onClick={handleImageCancel}>
            현재 이미지 삭제
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <Image
              src={profileImg || profileDefault}
              alt="profileDefaultImg"
              width={100}
              height={100}
              className="w-32 h-32 flex justify-center overflow-hidden object-cover rounded-md mx-auto m-2"
            />
            <label className="cursor-pointer text-sm opacity-50 mb-2">
              <input accept="image/*" type="file" {...getInputProps()} onChange={event => handleImageChange(event.target.files?.[0])} />
              이미지 선택하기
            </label>
          </div>
        </>
      )}
    </>
  );
}
