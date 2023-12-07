import { useRouter } from 'next/router';
import React, { useState } from 'react';

import styles from '../../styles/Feed.module.css';

export const Feed = ({ articles, pageNumber }) => {
  const router = useRouter();
  const [isGridView, setIsGridView] = useState(false); // State to manage grid/list view

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.toggleButton}>
          <button onClick={toggleView}>
            Toggle View
          </button>
        </div>
        
        <div className={isGridView ? styles.grid : styles.list}>
          {articles.map((article, index) => (
            <div key={index} className={styles.post}>
              <h1 onClick={() => (window.location.href = article.url)}>
                {article.title}
              </h1>
              <p>{article.description}</p>
              {!!article.urlToImage && <img src={article.urlToImage} />}
            </div>
          ))}
        </div>
      </div>
            
      <div className={styles.paginator}>
        <div
          className={pageNumber === 1 ? styles.disabled : styles.active}
          onClick={() => {
            if (pageNumber > 1) {
              router.push(`/feed/${pageNumber - 1}`);
            }
          }}>
        
          Previous Page
        </div>
    
        <div>#{pageNumber}</div>
        <div
          className={pageNumber === 5 ? styles.disabled : styles.active}
          onClick={() => {
            if (pageNumber < 5) {
              router.push(`/feed/${pageNumber + 1}`);
            }
          }}
          >
          Next Page
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.id;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [], // Return an empty array if pageNumber is invalid
        pageNumber: 1,
      },
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer 0f9ed2f2b88c455db6e06b418e052472`,
      },
    }
  );

  const json = await apiResponse.json();
  const { articles } = json;

  return {
    props: {
      articles: articles || [ ], // Ensure articles is not undefined
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};

export default Feed;
