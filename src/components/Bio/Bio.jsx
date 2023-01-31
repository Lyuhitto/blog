/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { AiOutlineMail, AiOutlineGithub } from "react-icons/ai"

import {
  container,
  authorImg,
  desc,
  authorName,
  authorSummary,
  socialLinks,
  socialItem,
} from "./Bio.module.css"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social
  console.log(social)

  return (
    <section className={container}>
      <div className={authorImg}>
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/profile-pic.png"
          width={50}
          height={50}
          quality={95}
          alt="Profile picture"
        />
      </div>
      {author?.name && (
        <div className={desc}>
          <strong className={authorName}>{author.name}</strong>
          <p className={authorSummary}>{author?.summary || null}</p>
          <ul className={socialLinks}>
            <li className={socialItem}>
              <a
                href={`http://${social?.email || ``}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineMail />
              </a>
            </li>
            <li className={socialItem}>
              <a
                href={`http://${social?.github || ``}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineGithub />
              </a>
            </li>
          </ul>
        </div>
      )}
    </section>
  )
}

export default Bio
