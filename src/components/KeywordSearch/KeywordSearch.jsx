import * as React from "react"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function KeywordSearch({
  filtered,
  setFiltered,
  tagGroup,
  categoryGroup,
  allPosts,
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(
    searchParams.get("keyword") ? searchParams.get("keyword") : ""
  )
  const [selectedTags, setSelectedTags] = useState(searchParams.getAll("tag"))

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") ? searchParams.get("category") : "all"
  )

  const handleSearchChange = event => {
    const query = event.target.value
    setQuery(query)
    if (query === "") {
      searchParams.delete("keyword")
    } else {
      searchParams.set("keyword", query)
    }
    setSearchParams(searchParams)
  }

  const onTagClick = e => {
    const targetTag = e.target.value

    if (selectedTags.includes(targetTag)) {
      setSelectedTags(prev => prev.filter(item => item !== targetTag))
      removeTag(targetTag)
    } else {
      setSelectedTags(prev => [...prev, targetTag])
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

  const handleCategory = e => {
    const name = e.target.value
    setSelectedCategory(name)
    console.log(name)

    if (name !== "all") {
      searchParams.set("category", name)
    } else {
      searchParams.delete("category", name)
    }
    setSearchParams(searchParams)
  }

  React.useEffect(() => {
    const filteredPosts = allPosts.filter(post => {
      const { description, title, tags, category } = post.node.frontmatter

      const filterByTags = () => {
        if (selectedTags.length <= 0) {
          return true
        } else if (tags && selectedTags.length > 0) {
          for (let i = 0; i < selectedTags.length; i++) {
            if (tags.includes(selectedTags[i])) return true
          }
        }
        return false
      }

      const filterByCategory = () => {
        if (selectedCategory === "all") {
          return true
        } else {
          return category === selectedCategory ? true : false
        }
      }

      return (
        // input에 입력된 검색어가 desc, title, tags에 해당되는지 검색
        (description.toLowerCase().includes(query.toLowerCase()) ||
          title.toLowerCase().includes(query.toLowerCase())) &&
        filterByTags() &&
        filterByCategory()
      )
    })

    setFiltered({ ...filtered, filteredPosts })
  }, [query, selectedTags.join(""), selectedCategory])

  return (
    <div>
      <h3>검색하기</h3>
      <input
        type="search"
        name="keyword"
        aria-label="검색하기"
        placeholder="검색어를 입력하세요"
        value={query}
        onChange={e => {
          handleSearchChange(e)
        }}
      />

      <h3>카테고리</h3>
      <section>
        <button value={"all"} key={"all"} onClick={handleCategory}>
          all
        </button>
        {categoryGroup &&
          categoryGroup.map(category => (
            <button
              value={category.fieldValue}
              key={category.fieldValue}
              onClick={handleCategory}
            >
              {category.fieldValue}
            </button>
          ))}
      </section>

      <h3>태그들</h3>
      <section>
        {tagGroup.map(tag => (
          <button
            value={tag.fieldValue}
            key={tag.fieldValue}
            onClick={onTagClick}
          >
            {tag.fieldValue}
          </button>
        ))}
        <p>현재 선택된 태그들 : {selectedTags.join(", ")}</p>
      </section>
    </div>
  )
}
