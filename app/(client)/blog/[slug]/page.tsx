import { Container } from '@/components';

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const {slug} = await params;
  
  return (
    <div>
      <Container>
        <h2>Single Blog Page</h2>
        <p>{slug}</p>
      </Container>
      
    </div>
  );
};
export default BlogPage;
