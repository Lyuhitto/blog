import * as React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout/Layout"
import Seo from "../components/seo"
import { useState } from "react"

export default function Posts({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) {
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
  return (
    <Layout>
      <p>현재 개의 포스트가 있습니다</p>
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
      <ul></ul>
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
    allMarkdownRemark(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`
