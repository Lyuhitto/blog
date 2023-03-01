import React from "react"
import { useSearchParams } from "react-router-dom"

export default function KeywordSearch({ filtered, setFiltered, allPosts }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchKeyword = searchParams.get("s")

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
    searchParams.set("keyword", query);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <input
        type="search"
        name="keyword"
        aria-label="검색하기"
        placeholder="검색어를 입력하세요"
        value={filtered.query}
        onChange={e => {
          handleSearchChange(e)
        }}
      />
    </div>
  )
}
