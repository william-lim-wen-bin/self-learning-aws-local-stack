import { ContentBlock, Heading, Stack } from 'braid-design-system';

interface PageLayoutProps {
  pageTitle: string;
  children: React.ReactNode;
}

export const PageLayout = ({ pageTitle, children }: PageLayoutProps) => (
  <Stack space="medium">
    <Heading level="2">{pageTitle}</Heading>
    <ContentBlock>{children}</ContentBlock>
  </Stack>
);
