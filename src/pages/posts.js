import * as React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout/Layout"
import Seo from "../components/seo"
import { useState } from "react"

export default function Posts({
  // data: {
  //   allMarkdownRemark: { group },
  //   site: {
  //     siteMetadata: { title },
  //   },
  // },
  data,
  location,
}) {
  const group = data.allMarkdownRemark.group
  const allPosts = data.allMarkdownRemark.edges

  const [tagList, setTagList] = useState([])
  const onClickTag = e => {
    const targetTag = e.target.value

    if (tagList.includes(targetTag)) {
      setTagList(v => v.filter(item => item !== targetTag))
    } else {
      setTagList(v => [...v, targetTag])
    }

    setTagList(v => v.sort())
  }

  const [filtered, setFiltered] = useState({
    filteredPosts: [],
    query: "",
  })
  const handleSearchChange = event => {
    const query = event.target.value
    const filteredPosts = allPosts.filter(post => {
      const { description, title, tags } = post.node.frontmatter
      return (
        // input에 입력된 검색어가 desc, title, tags에 해당되는지 검색
        description.toLowerCase().includes(query.toLowerCase()) ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        (tags && tags.join("").toLowerCase().includes(query.toLowerCase()))
      )
    })
    setFiltered({
      query,
      filteredPosts,
    })
  }

  const posts = filtered.query ? filtered.filteredPosts : allPosts

  return (
    <Layout>
      <p>현재 개의 포스트가 있습니다</p>
      <h3>검색하기</h3>
      <input
        type="text"
        aria-label="검색하기"
        placeholder="검색어를 입력하세요"
        value={filtered.query}
        onChange={handleSearchChange}
      ></input>
      <h3>태그들</h3>
      <section>
        {group.map(tag => (
          <button
            value={tag.fieldValue}
            key={tag.fieldValue}
            onClick={onClickTag}
          >
            {tag.fieldValue}
          </button>
        ))}
      </section>
      <p>현재선택 :{tagList.join(", ")}</p>

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
                    {tags &&
                      tags.map((tag, idx) => <li>{tag}</li>)}
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
  }
`
