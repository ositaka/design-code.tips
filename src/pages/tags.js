import React from "react"
import { graphql, Link } from "gatsby"
import { kebabCase } from 'lodash'

import Img from "gatsby-image"
import { RiArrowRightSLine } from "react-icons/ri"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const TagsPageQuery = graphql`
  query TagsPageQuery {
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

const TagsPage = ({ 
  data: {
    allMarkdownRemark: { group }
  } }) => {
	return (
    <Layout className="tags-page">
      <SEO
        title={"All Tags"}
        description={"The full list of Tags on design-code.tips"}
      />
      <h1>All Tags</h1>
      <div className="grids col-1 sm-2 lg-3">
        <ul className="taglist">
          {group.map((tag) => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
	)
}

export default TagsPage
