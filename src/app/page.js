import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";
import { getBlogPostList } from "@/helpers/file-helpers";
import styles from "./homepage.module.css";
import { BLOG_DESCRIPTION, BLOG_TITLE } from "@/constants";

export async function generateMetadata() {
  return {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
  };
}

async function Home() {
  const blogList = await getBlogPostList();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {/* TODO: Iterate over the data read from the file system! */}
      {blogList.map((blogData) => {
        return (
          <BlogSummaryCard
            key={blogData.slug}
            slug={blogData.slug}
            title={blogData.title}
            abstract={blogData.abstract}
            publishedOn={blogData.publishedOn}
          />
        );
      })}
    </div>
  );
}

export default Home;
