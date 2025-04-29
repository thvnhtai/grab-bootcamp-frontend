/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Card, Typography } from 'antd';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import ImageUpload from '../../components/ImageUpload';
import { STEP_CONFIG } from '../../constants/common.constant';
import { useAppDispatch } from '../../redux/hooks';
import { analyzeImage } from '../../redux/slices/restaurantSlice';
import { PageURLs } from '../../utils/navigate';

export default function SearchPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = useCallback((file: File, preview: string) => {
    setImageFile(file);
    setImagePreview(preview);
  }, []);

  const handleAnalyzeImage = useCallback(async () => {
    if (!imageFile) return;

    setUploading(true);
    try {
      await dispatch(analyzeImage(imageFile)).unwrap();

      navigate(PageURLs.ofSearchResult(), {
        state: { uploadedImage: imagePreview }
      });
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setUploading(false);
    }
  }, [imageFile, imagePreview, navigate, dispatch]);

  return (
    <div css={styles.pageContainer}>
      <main css={styles.contentWrapper}>
        {/* Header Section */}
        <div css={styles.header}>
          <Typography.Title level={2} css={styles.heading}>
            Upload a Food Image
          </Typography.Title>
          <Typography.Paragraph css={styles.subtitle}>
            Take a photo of any food dish, and we'll find the best local
            restaurants that serve it.
          </Typography.Paragraph>
        </div>

        {/* Upload Section */}
        <div css={styles.uploadSection}>
          <ImageUpload onImageUpload={handleImageUpload} />
          <div css={styles.analysisControls}>
            <Button
              variant='solid'
              onClick={handleAnalyzeImage}
              disabled={!imagePreview || uploading}
              css={styles.analyzeButton}
            >
              {uploading ? 'Analyzing...' : 'Analyze Dish'}
            </Button>
          </div>
        </div>

        {/* How It Works Section */}
        <section css={styles.howItWorks}>
          <Typography.Title level={2} css={styles.sectionHeading}>
            How It Works
          </Typography.Title>
          <div css={styles.stepsContainer}>
            {STEP_CONFIG.map((step, index) => (
              <Card key={`step-${index}`} css={styles.stepCard}>
                <div css={styles.stepIndicator}>{index + 1}</div>
                <Typography.Title level={4} css={styles.stepTitle}>
                  {step.title}
                </Typography.Title>
                <Typography.Paragraph css={styles.stepDescription}>
                  {step.description}
                </Typography.Paragraph>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

const styles: Styles = {
  // Layout
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
  `,

  // Header Styles
  header: css`
    text-align: center;
    margin-bottom: 2.5rem;
  `,

  heading: css`
    font-size: 1.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
  `,

  subtitle: css`
    font-size: 1rem;
    color: var(--text-secondary);
    max-width: 36rem;
    margin: 0 auto;
    line-height: 1.5;
  `,

  // Upload Section
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

  // How It Works Section
  howItWorks: css`
    margin-top: 4rem;
  `,

  sectionHeading: css`
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 2rem;
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
  `,

  stepDescription: css`
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.4;
  `
};
