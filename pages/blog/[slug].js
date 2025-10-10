import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getAllPosts, getPostBySlug } from '../../lib/blog';
import { markdownToHtml } from '../../lib/markdown';
import styles from '../../styles/BlogPost.module.css';

export default function BlogPost({ post, relatedPosts }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Throwback AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://throwbackai.app/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.lastModified || post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://throwbackai.app/blog/${post.slug}`
    }
  };

  return (
    <>
      <Head>
        <title>{post.title} | Throwback AI Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.keywords} />
        <link rel="canonical" href={`https://throwbackai.app/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://throwbackai.app/blog/${post.slug}`} />
        <meta property="og:image" content={post.featuredImage} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.categoryName} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.featuredImage} />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Head>

      <article className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>→</span>
          <Link href="/blog">Blog</Link>
          <span className={styles.separator}>→</span>
          <Link href={`/blog/category/${post.category}`}>{post.categoryName}</Link>
          <span className={styles.separator}>→</span>
          <span className={styles.current}>{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className={styles.header}>
          <div className={styles.categoryTag}>
            <Link href={`/blog/category/${post.category}`}>
              {post.categoryName}
            </Link>
          </div>
          
          <h1 className={styles.title}>{post.title}</h1>
          
          <div className={styles.meta}>
            <div className={styles.author}>
              <Image
                src={post.authorImage || '/images/avatar-after2.jpg'}
                alt={post.author}
                width={40}
                height={40}
                className={styles.authorImage}
              />
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>By {post.author}</span>
                <time className={styles.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>
            <div className={styles.readTime}>
              {post.readTime} min read
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className={styles.featuredImage}>
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={800}
              height={400}
              className={styles.heroImage}
              priority
            />
          </div>
        )}

        {/* Table of Contents */}
        {post.tableOfContents && (
          <div className={styles.tableOfContents}>
            <h3>Table of Contents</h3>
            <ul>
              {post.tableOfContents.map((item, index) => (
                <li key={index}>
                  <a href={`#${item.id}`}>{item.title}</a>
                  {item.children && (
                    <ul>
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <a href={`#${child.id}`}>{child.title}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Content */}
        <div className={styles.content}>
          <div 
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Article Footer */}
        <footer className={styles.footer}>
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className={styles.tags}>
              <h4>Tags:</h4>
              <div className={styles.tagList}>
                {post.tags.map(tag => (
                  <Link key={tag} href={`/blog/tag/${tag}`} className={styles.tag}>
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className={styles.shareButtons}>
            <h4>Share this article:</h4>
            <div className={styles.shareLinks}>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://throwbackai.app/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
              >
                Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://throwbackai.app/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
              >
                Facebook
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://throwbackai.app/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Author Bio */}
          <div className={styles.authorBio}>
            <Image
              src={post.authorImage || '/images/author-default.jpg'}
              alt={post.author}
              width={80}
              height={80}
              className={styles.authorBioImage}
            />
            <div className={styles.authorBioContent}>
              <h4>{post.author}</h4>
              <p>{post.authorBio || "Expert in AI photo restoration and enhancement technologies."}</p>
            </div>
          </div>
        </footer>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className={styles.relatedPosts}>
            <h3>Related Articles</h3>
            <div className={styles.relatedGrid}>
              {relatedPosts.map(relatedPost => (
                <article key={relatedPost.slug} className={styles.relatedCard}>
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className={styles.relatedImage}>
                      <Image
                        src={relatedPost.featuredImage || '/images/blog-default.jpg'}
                        alt={relatedPost.title}
                        width={300}
                        height={200}
                        className={styles.relatedCardImage}
                      />
                    </div>
                    <div className={styles.relatedContent}>
                      <h4 className={styles.relatedTitle}>{relatedPost.title}</h4>
                      <p className={styles.relatedExcerpt}>{relatedPost.excerpt}</p>
                      <time className={styles.relatedDate}>
                        {new Date(relatedPost.date).toLocaleDateString()}
                      </time>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <h3>Ready to Restore Your Photos?</h3>
            <p>Try our AI-powered photo restoration tools and bring your memories back to life.</p>
            <div className={styles.ctaButtons}>
              <Link href="/replicate/restore-premium" className={styles.ctaBtn}>
                Start Free Restoration
              </Link>
              <Link href="/replicate/avatar" className={styles.ctaBtnSecondary}>
                Create AI Avatar
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content || '');
  
  // Get related posts (same category, exclude current post)
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return {
    props: {
      post: {
        ...post,
        content
      },
      relatedPosts
    }
  };
}