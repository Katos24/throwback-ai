import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '../../lib/blog';
import styles from '../../styles/Blog.module.css';

export default function BlogIndex({ posts, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Photo Restoration Blog | Tips, Guides & AI Technology | Throwback AI</title>
        <meta name="description" content="Expert guides on photo restoration, AI enhancement techniques, and preserving family memories. Learn how to restore old photos with professional tips and tutorials." />
        <meta name="keywords" content="photo restoration blog, AI photo enhancement, restore old photos, family photo preservation, vintage photo repair" />
        <link rel="canonical" href="https://throwbackai.app/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Photo Restoration Blog | Throwback AI" />
        <meta property="og:description" content="Expert guides on photo restoration and AI enhancement techniques" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://throwbackai.app/blog" />
        <meta property="og:image" content="https://throwbackai.app/images/blog-hero.jpg" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Throwback AI Blog",
            "description": "Expert guides on photo restoration and AI enhancement",
            "url": "https://throwbackai.app/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Throwback AI",
              "logo": {
                "@type": "ImageObject",
                "url": "https://throwbackai.app/logo.png"
              }
            }
          })}
        </script>
      </Head>

      <main className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Photo Restoration & AI Enhancement Blog
            </h1>
            <p className={styles.heroDescription}>
              Expert guides, tips, and insights on restoring old photos, 
              AI enhancement techniques, and preserving precious family memories.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className={styles.filters}>
          <div className={styles.filterContainer}>
            <h2 className={styles.filterTitle}>Browse by Category</h2>
            <div className={styles.categoryButtons}>
              <button
                className={`${styles.categoryBtn} ${selectedCategory === 'all' ? styles.active : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Posts ({posts.length})
              </button>
              {categories.map(category => (
                <button
                  key={category.slug}
                  className={`${styles.categoryBtn} ${selectedCategory === category.slug ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className={styles.postsGrid}>
          <div className={styles.postsContainer}>
            {filteredPosts.map((post, index) => (
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
                    <div className={styles.categoryTag}>
                      {post.categoryName}
                    </div>
                  </div>
                  
                  <div className={styles.postContent}>
                    <h3 className={styles.postTitle}>{post.title}</h3>
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
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className={styles.newsletter}>
          <div className={styles.newsletterContent}>
            <h2 className={styles.newsletterTitle}>
              Get Photo Restoration Tips
            </h2>
            <p className={styles.newsletterDescription}>
              Subscribe to receive expert tips, tutorials, and updates on AI photo enhancement techniques.
            </p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email address"
                className={styles.emailInput}
                required
              />
              <button type="submit" className={styles.subscribeBtn}>
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  
  // Calculate category counts
  const categoryMap = new Map();
  posts.forEach(post => {
    const category = categoryMap.get(post.category) || { 
      slug: post.category, 
      name: post.categoryName, 
      count: 0 
    };
    category.count++;
    categoryMap.set(post.category, category);
  });
  
  const categories = Array.from(categoryMap.values());

  return {
    props: {
      posts,
      categories
    }
  };
}