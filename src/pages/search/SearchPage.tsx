/** @jsxImportSource @emotion/react */
import { useCallback, useState } from 'react';

import { Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { styles } from './SearchPage.styles';
import { PageURLs } from '../../utils/navigate';
import { useAppDispatch } from '../../redux/hooks';
import { Message } from '../../enums/message.enum';
import { Button, ImageUpload } from '../../components';
import { useRestaurant } from '../../hooks/useRestaurant';
import { setMessages } from '../../redux/slices/appSlice';
import { STEP_CONFIG } from '../../constants/common.constant';

const MAX_RESTAURANTS = 50;

const { Title, Paragraph } = Typography;

interface ImageData {
  file: File;
  preview: string;
}

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { analyzeImageAndFetch, isLoading, getUserCoordinates } =
    useRestaurant();
  const [imageData, setImageData] = useState<ImageData | null>(null);

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
      const userCoords = await getUserCoordinates();
      if (!userCoords) {
        dispatch(
          setMessages([
            {
              type: Message.ERROR,
              message: 'Location access denied',
              description:
                'Please allow location access to find nearby restaurants.'
            }
          ])
        );
        return;
      }

      const analyzedRestaurants = await analyzeImageAndFetch(
        imageData.file,
        MAX_RESTAURANTS,
        userCoords
      );
      if (analyzedRestaurants.length === 0) {
        dispatch(
          setMessages([
            {
              type: Message.WARNING,
              message: 'No restaurants found',
              description:
                'No restaurants were found matching the uploaded dish.'
            }
          ])
        );
        return;
      }

      sessionStorage.setItem(
        'searchResults',
        JSON.stringify(analyzedRestaurants)
      );
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
  }, [imageData, analyzeImageAndFetch, getUserCoordinates, navigate, dispatch]);

  return (
    <div css={styles.pageContainer}>
      <main css={styles.contentWrapper}>
        <header css={styles.header}>
          <Title level={2} css={styles.heading}>
            Upload a Food Image
          </Title>
          <Paragraph css={styles.subtitle}>
            Take a photo of any food dish, and we'll find the best local
            restaurants that serve it.
          </Paragraph>
        </header>

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
