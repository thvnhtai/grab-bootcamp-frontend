/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Card, Typography } from 'antd';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button';
import ImageUpload from '../../components/ImageUpload';

import { STEP_CONFIG } from '../../constants/common.constant';
import { PageURLs } from '../../utils/navigate';
import { useAnalyzeImage } from '../../hooks/useAnalyzeImage';

import { Styles } from '../../types/utility';
import { setMessages } from '../../redux/slices/appSlice';
import { Message } from '../../enums/message.enum';
import { useAppDispatch } from '../../redux/hooks';

const { Title, Paragraph } = Typography;

interface ImageData {
  file: File;
  preview: string;
}

const styles: Styles = {
  pageContainer: css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-color);
  `,
  contentWrapper: css`
    flex: 1;
    margin: 0 auto;
    padding: 2rem 1rem;
    width: 100%;
    max-width: 1200px;
  `,
  header: css`
    text-align: center;
    margin-bottom: 2.5rem;
  `,
  heading: css`
    font-size: 1.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
  `,
  subtitle: css`
    font-size: 1rem;
    color: var(--text-secondary-1);
    max-width: 36rem;
    margin: 0 auto;
    line-height: 1.5;
  `,
  uploadSection: css`
    margin-bottom: 3rem;
  `,
  analysisControls: css`
    text-align: center;
    margin-top: 2rem;
  `,
  analyzeButton: css`
    padding: 1.2rem 2rem;
    min-width: 200px;
  `,
  howItWorks: css`
    margin-top: 4rem;
  `,
  sectionHeading: css`
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 2rem;
    color: var(--text-primary);
  `,
  stepsContainer: css`
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(1, 1fr);
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  `,
  stepCard: css`
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s ease;
    border: none;
    &:hover {
      transform: translateY(-2px);
    }
  `,
  stepIndicator: css`
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 1rem;
  `,
  stepTitle: css`
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  `,
  stepDescription: css`
    color: var(--text-secondary-1);
    font-size: 0.875rem;
    line-height: 1.4;
  `
};

const SearchPage = () => {
  const navigate = useNavigate();
  const { analyzeImage, isLoading } = useAnalyzeImage();

  const [imageData, setImageData] = useState<ImageData | null>(null);

  const dispatch = useAppDispatch();

  const handleImageUpload = useCallback(
    (file: File | null, preview: string | null) => {
      setImageData(file && preview ? { file, preview } : null);
    },
    []
  );

  const handleAnalyzeImage = useCallback(async () => {
    if (!imageData) {
      dispatch(
        setMessages([
          {
            type: Message.ERROR,
            message: 'No image selected',
            description: 'Please upload an image to analyze.'
          }
        ])
      );
      return;
    }

    try {
      const restaurants = await analyzeImage(imageData.file);
      sessionStorage.setItem('searchResults', JSON.stringify(restaurants));
      sessionStorage.setItem('uploadedImagePreview', imageData.preview);
      navigate(PageURLs.ofSearchResult());
    } catch (error) {
      console.error('Image analysis failed:', error);
      dispatch(
        setMessages([
          {
            type: Message.ERROR,
            message: 'Image analysis failed',
            description: 'An error occurred while analyzing the image.'
          }
        ])
      );
    }
  }, [imageData, analyzeImage, navigate, dispatch]);

  return (
    <div css={styles.pageContainer}>
      <main css={styles.contentWrapper}>
        {/* Header Section */}
        <header css={styles.header}>
          <Title level={2} css={styles.heading}>
            Upload a Food Image
          </Title>
          <Paragraph css={styles.subtitle}>
            Take a photo of any food dish, and we'll find the best local
            restaurants that serve it.
          </Paragraph>
        </header>

        {/* Upload Section */}
        <section css={styles.uploadSection}>
          <ImageUpload onImageUpload={handleImageUpload} />
          <div css={styles.analysisControls}>
            <Button
              variant='solid'
              onClick={handleAnalyzeImage}
              disabled={!imageData || isLoading}
              css={styles.analyzeButton}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Dish'}
            </Button>
          </div>
        </section>

        {/* How It Works Section */}
        <section css={styles.howItWorks}>
          <Title level={2} css={styles.sectionHeading}>
            How It Works
          </Title>
          <div css={styles.stepsContainer}>
            {STEP_CONFIG.map((step, index) => (
              <Card key={step.title} css={styles.stepCard}>
                <div css={styles.stepIndicator}>{index + 1}</div>
                <Title level={4} css={styles.stepTitle}>
                  {step.title}
                </Title>
                <Paragraph css={styles.stepDescription}>
                  {step.description}
                </Paragraph>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SearchPage;
