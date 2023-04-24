import * as React from "react"
// import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout/Layout"
import Seo from "../components/seo"
import { useState } from "react"

// import { useQueryParam, NumberParam, StringParam } from "use-query-params"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import KeywordSearch from "../components/KeywordSearch/KeywordSearch"

export default function Posts({
  // data: {
  //   allMarkdownRemark: { group },
  //   site: {
  //     siteMetadata: { title },
  //   },
  // },
  data,
  // location,
}) {
  const tagGroup = data.allMarkdownRemark.group
  const categoryGroup = data.categoriesGroup.group
  const allPosts = data.allMarkdownRemark.edges

  const [filtered, setFiltered] = useState({
    filteredPosts: [],
  })

  const posts =
    filtered.filteredPosts.length > 0 ? filtered.filteredPosts : allPosts

  return (
    <Layout>
      <p>현재 {posts.length}개의 포스트가 있습니다</p>
      

      
      <Router>
        <Routes>
          <Route
            path="/posts"
            element={
              <>
                <KeywordSearch
                  tagGroup={tagGroup}
                  categoryGroup={categoryGroup}
                  allPosts={allPosts}
                  filtered={filtered}
                  setFiltered={setFiltered}
                />
              </>
            }
          ></Route>
        </Routes>
      </Router>

      <h3>포스트들</h3>
      {posts.length === 0 ? (
        <div>해당하는 포스트가 없습니다.</div>
      ) : (
        <ol>
          {posts.map(({ node }) => {
            const { excerpt } = node
            const { slug } = node.fields
            const { title, date, description, tags } = node.frontmatter

            return (
              <li key={slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: description || excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                  <ul>
                    {tags && tags.map((tag, idx) => <li key={idx}>{tag}</li>)}
                  </ul>
                </article>
              </li>
            )
          })}
        </ol>
      )}
    </Layout>
  )
}
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000, sort: { frontmatter: { date: DESC } }) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
    categoriesGroup: allMarkdownRemark {
      group(field: { frontmatter: { category: SELECT } }) {
        fieldValue
      }
    }
  }
`
