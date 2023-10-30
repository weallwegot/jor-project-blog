import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";

export async function generateMetadata({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);
  const title = blogPost.frontmatter.title;
  const abstract = blogPost.frontmatter.abstract;
  return {
    title: `${title} - ${BLOG_TITLE}`,
    description: abstract,
  };
}

async function BlogPost({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);
  const title = blogPost.frontmatter.title;
  const publishedOn = blogPost.frontmatter.publishedOn;
  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={blogPost.content} />
      </div>
    </article>
  );
}

export default BlogPost;
