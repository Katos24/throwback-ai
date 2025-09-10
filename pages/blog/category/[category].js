import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getAllPosts, getPostsByCategory, getAllCategories } from '../../../lib/blog';
import styles from '../../../styles/BlogCategory.module.css';

export default function CategoryPage({ posts, category, totalPosts }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{category.name} | Photo Restoration Blog | Throwback AI</title>
        <meta name="description" content={`Explore ${category.name.toLowerCase()} articles about photo restoration, AI enhancement, and preserving family memories.`} />
        <meta name="keywords" content={`${category.name.toLowerCase()}, photo restoration, AI enhancement, vintage photos`} />
        <link rel="canonical" content={`https://throwbackai.app/blog/category/${category.slug}`} />
        
        <meta property="og:title" content={`${category.name} | Throwback AI Blog`} />
        <meta property="og:description" content={`${posts.length} articles about ${category.name.toLowerCase()}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://throwbackai.app/blog/category/${category.slug}`} />
      </Head>

      <main className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>→</span>
          <Link href="/blog">Blog</Link>
          <span className={styles.separator}>→</span>
          <span className={styles.current}>{category.name}</span>
        </nav>

        {/* Category Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>{category.name}</h1>
          <p className={styles.description}>
            {category.description || `Expert articles and guides about ${category.name.toLowerCase()}`}
          </p>
          <div className={styles.stats}>
            <span className={styles.postCount}>{posts.length} articles</span>
            <span className={styles.totalPosts}>of {totalPosts} total posts</span>
          </div>
        </header>

        {/* Posts Grid */}
        <section className={styles.postsGrid}>
          {posts.map(post => (
            <article key={post.slug} className={styles.postCard}>
              <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                <div className={styles.postImage}>
                  <Image
                    src={post.featuredImage || '/images/blog-default.jpg'}
                    alt={post.title}
                    width={400}
                    height={250}
                    className={styles.cardImage}
                  />
                </div>
                
                <div className={styles.postContent}>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  
                  <div className={styles.postMeta}>
                    <time className={styles.postDate}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span className={styles.readTime}>{post.readTime} min read</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </section>

        {/* Back to Blog */}
        <div className={styles.backToBlog}>
          <Link href="/blog" className={styles.backBtn}>
            ← Back to All Posts
          </Link>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const categories = getAllCategories();
  const paths = categories.map(category => ({
    params: { category: category.slug }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const posts = getPostsByCategory(params.category);
  const allCategories = getAllCategories();
  const category = allCategories.find(cat => cat.slug === params.category);
  const totalPosts = getAllPosts().length;

  if (!category) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      posts,
      category,
      totalPosts
    }
  };
}