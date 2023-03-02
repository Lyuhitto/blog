import * as React from "react"
import { useSearchParams } from "react-router-dom"

export default function KeywordSearch({
  filtered,
  setFiltered,
  group,
  allPosts,
}) {
  const [searchParams, setSearchParams] = useSearchParams()

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
      ...filtered,
      query,
      filteredPosts,
    })
    if (query === "") {
      searchParams.delete("keyword")
    } else {
      searchParams.set("keyword", query)
    }
    setSearchParams(searchParams)
  }

  const onTagClick = e => {
    const targetTag = e.target.value

    if (filtered.selectedTags.includes(targetTag)) {
      setFiltered(prev => ({
        ...filtered,
        selectedTags: prev.selectedTags.filter(item => item !== targetTag),
      }))
      removeTag(targetTag)
    } else {
      setFiltered(prev => ({
        ...filtered,
        selectedTags: [...prev.selectedTags, targetTag],
      }))
      addTag(targetTag)
    }

    setSearchParams(searchParams)
  }
  const addTag = targetTag => {
    searchParams.append("tag", targetTag)
  }
  const removeTag = targetTag => {
    const currentTags = searchParams
      .getAll("tag")
      .filter(item => item !== targetTag)
    searchParams.delete("tag")
    for (let tag of currentTags) {
      searchParams.append("tag", tag)
    }
  }

  React.useEffect(() => {
    console.log("hi")
  }, [filtered.query, filtered.selectedTags.join("")])

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

      <h3>태그들</h3>
      <section>
        {group.map(tag => (
          <button
            value={tag.fieldValue}
            key={tag.fieldValue}
            onClick={onTagClick}
          >
            {tag.fieldValue}
          </button>
        ))}
        <p>현재 선택된 태그들 : {filtered.selectedTags.join(", ")}</p>
      </section>
    </div>
  )
}
