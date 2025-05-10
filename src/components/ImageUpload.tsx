/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  CameraOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  SyncOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Card, Typography } from 'antd';
import { useCallback, useRef, useState } from 'react';

import { fileToBase64 } from '../utils/common';
import { Button } from './Button';
import { Styles } from '../types/utility';

interface ImageUploadProps {
  onImageUpload: (file: File | null, previewUrl: string | null) => void;
}

const styles: Styles = {
  card: css`
    padding: 1.5rem;
    width: 100%;
    max-width: 32rem;
    margin: 0 auto;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: var(--background-color);
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `,
  uploadContainer: css`
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed var(--border-color);
    transition: all 0.3s ease;
    cursor: pointer;
  `,
  dragActive: css`
    border-color: var(--primary-color);
    background-color: rgba(0, 177, 79, 0.1);
  `,
  previewPadding: css`
    padding: 1rem;
  `,
  uploadPadding: css`
    padding: 2rem;
  `,
  previewWrapper: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  previewImage: css`
    width: 100%;
    height: auto;
    max-height: 16rem;
    object-fit: contain;
    border-radius: 0.25rem;
  `,
  buttonGroup: css`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    gap: 0.5rem;
    width: 100%;
    flex-wrap: wrap;
  `,
  buttonPadding: css`
    padding: 1.2rem;
    flex-grow: 1;
    justify-content: center;
  `,
  takePhotoButton: css`
    color: var(--text-primary) !important;
  `,
  uploadIcon: css`
    margin-bottom: 1rem;
    color: var(--text-secondary-1);
  `,
  iconStyle: css`
    font-size: 3rem;
    color: var(--text-inactive);
  `,
  uploadHeading: css`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  `,
  uploadInstructions: css`
    color: var(--text-inactive);
    text-align: center;
    margin-bottom: 1rem;
  `,
  buttonContainer: css`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    @media (min-width: 640px) {
      flex-direction: row;
      justify-content: center;
    }
  `,
  buttonIcon: css`
    margin-right: 0.5rem;
  `,
  hiddenInput: css`
    display: none;
  `
};

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    async (file: File) => {
      try {
        if (!file.type.startsWith('image/')) {
          console.warn('Selected file is not an image:', file.type);
          return;
        }
        const base64 = await fileToBase64(file);
        setPreview(base64);
        onImageUpload(file, base64);
      } catch (error) {
        console.error('Error processing file:', error);
      }
    },
    [onImageUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleFileChange(file);
      }
    },
    [handleFileChange]
  );

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileChange(file);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [handleFileChange]
  );

  const handleRemoveImage = useCallback(() => {
    setPreview(null);
    onImageUpload(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onImageUpload]);

  return (
    <Card css={styles.card}>
      <div
        css={[
          styles.uploadContainer,
          isDragging && styles.dragActive,
          preview ? styles.previewPadding : styles.uploadPadding
        ]}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div css={styles.previewWrapper}>
            <img src={preview} alt='Preview' css={styles.previewImage} />
            <div css={styles.buttonGroup}>
              <Button
                variant='outlined'
                onClick={handleRemoveImage}
                css={[styles.buttonPadding]}
              >
                <DeleteOutlined css={styles.buttonIcon} />
                Remove
              </Button>
              <Button
                variant='solid'
                onClick={handleButtonClick}
                css={[styles.buttonPadding]}
              >
                <SyncOutlined css={styles.buttonIcon} />
                Change Image
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div css={styles.uploadIcon}>
              <CloudUploadOutlined css={styles.iconStyle} />
            </div>
            <Typography.Title level={4} css={styles.uploadHeading}>
              Upload a Food Image
            </Typography.Title>
            <Typography.Paragraph css={styles.uploadInstructions}>
              Drag and drop an image here, or click to select a file
            </Typography.Paragraph>
            <div css={styles.buttonContainer}>
              <Button
                variant='solid'
                onClick={handleButtonClick}
                css={[styles.buttonPadding]}
              >
                <UploadOutlined css={styles.buttonIcon} /> Upload Image
              </Button>
              <Button
                variant='outlined'
                onClick={handleButtonClick}
                css={[styles.buttonPadding, styles.takePhotoButton]}
              >
                <CameraOutlined css={styles.buttonIcon} /> Take Photo
              </Button>
            </div>
          </>
        )}
        <input
          ref={fileInputRef}
          type='file'
          css={styles.hiddenInput}
          accept='image/*'
          onChange={handleInputChange}
          aria-label='Upload food image'
        />
      </div>
    </Card>
  );
}
