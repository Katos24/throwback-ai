import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog/posts');

export function getAllPosts() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Calculate reading time (roughly 200 words per minute)
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);

        return {
          slug,
          content,
          readTime,
          ...data
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return allPostsData;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function getPostBySlug(slug) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Calculate reading time
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    // Generate table of contents from content
    const tableOfContents = generateTableOfContents(content);

    return {
      slug,
      content,
      readTime,
      tableOfContents,
      ...data
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getPostsByCategory(category) {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category === category);
}

export function getPostsByTag(tag) {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.tags && post.tags.includes(tag));
}

export function getAllCategories() {
  const allPosts = getAllPosts();
  const categoryMap = new Map();
  
  allPosts.forEach(post => {
    if (post.category) {
      const existing = categoryMap.get(post.category) || {
        slug: post.category,
        name: post.categoryName || post.category,
        count: 0,
        description: post.categoryDescription || ''
      };
      existing.count++;
      categoryMap.set(post.category, existing);
    }
  });
  
  return Array.from(categoryMap.values());
}

export function getAllTags() {
  const allPosts = getAllPosts();
  const tagMap = new Map();
  
  allPosts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => {
        const count = tagMap.get(tag) || 0;
        tagMap.set(tag, count + 1);
      });
    }
  });
  
  return Array.from(tagMap.entries()).map(([tag, count]) => ({ tag, count }));
}

function generateTableOfContents(content) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    headings.push({
      level,
      title,
      id
    });
  }

  // Create hierarchical structure
  const toc = [];
  const stack = [];

  headings.forEach(heading => {
    const item = { ...heading, children: [] };

    if (heading.level === 1) {
      toc.push(item);
      stack.length = 0;
      stack.push(item);
    } else if (heading.level === 2) {
      if (stack.length > 0) {
        stack[0].children.push(item);
      } else {
        toc.push(item);
      }
    } else if (heading.level === 3) {
      if (stack.length > 0 && stack[0].children.length > 0) {
        const lastH2 = stack[0].children[stack[0].children.length - 1];
        if (!lastH2.children) lastH2.children = [];
        lastH2.children.push(item);
      }
    }
  });

  return toc.length > 0 ? toc : null;
}

// Helper function to get featured posts
export function getFeaturedPosts(limit = 3) {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.featured).slice(0, limit);
}

// Helper function to get recent posts
export function getRecentPosts(limit = 5) {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit);
}

// Helper function for search
export function searchPosts(query) {
  const allPosts = getAllPosts();
  const searchTerms = query.toLowerCase().split(' ');
  
  return allPosts.filter(post => {
    const searchableText = `${post.title} ${post.excerpt} ${post.content} ${post.tags?.join(' ') || ''}`.toLowerCase();
    return searchTerms.every(term => searchableText.includes(term));
  });
}