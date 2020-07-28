import React from "react"
import { Link , graphql } from "gatsby"
// import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"

import Layout from "../components/layout"
// import PostCard from "../components/post-card"
import SEO from "../components/seo"

export const tagsPageQuery = graphql`
  query tagsPageQuery($tag: String!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: 1000
		) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
						title
						featuredImage {
							childImageSharp {
								fluid(maxWidth: 540, maxHeight: 360, quality: 80) {
                  ...GatsbyImageSharpFluid
                  ...GatsbyImageSharpFluidLimitPresentationSize
                }
							}
						}
          }
        }
      }
    }
  }
`
// const Pagination = (props) => (
//   <div className="pagination">
//     <ul>
//       {!props.isFirst && (
//         <li>
//           <Link to={props.prevPage} rel="prev">
//           <span className="icon -left"><RiArrowLeftLine/></span> Previous
//           </Link>
//         </li>
//       )}
//       {Array.from({ length: props.numPages }, (_, i) => (
//         <li key={`pagination-number${i + 1}`} >
//           <Link
//             to={`${props.tagSlug}${i === 0 ? '' : i + 1}`}
//             className={props.currentPage === i + 1 ? "is-active num" : "num"}
//           >
//             {i + 1}
//           </Link>
//         </li>
//       ))}
//       {!props.isLast && (
//         <li>
//           <Link to={props.nextPage} rel="next">
//             Next <span className="icon -right"><RiArrowRightLine/></span>
//           </Link>
//         </li>
//       )}
//     </ul>
//   </div>
// )
class TagsIndex extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map((post) => (
      <li key={post.node.frontmatter.slug}>
        <Link to={post.node.frontmatter.slug}>
          <h2>{post.node.frontmatter.title}</h2>
        </Link>
      </li>
    ))
    const tag = this.props.pageContext.tag
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with "${tag}"`
    
    // const { data } = this.props
    // const { currentPage, numPages } = this.props.pageContext
    // const tagsSlug = '/tags/' 
    // const isFirst = currentPage === 1
    // const isLast = currentPage === numPages
    // const prevPage = currentPage - 1 === 1 ? tagsSlug : tagsSlug + (currentPage - 1).toString()
    // const nextPage = tagsSlug + (currentPage + 1).toString()

    // const posts = data.allMarkdownRemark.edges
    //   .filter(edge => !!edge.node.frontmatter.date)
    //   .map(edge =>
    //     <PostCard key={edge.node.id} data={edge.node} />
    //   )
    // let props = {
    //   isFirst,
    //   prevPage,
    //   numPages,
    //   tagsSlug,
    //   currentPage,
    //   isLast,
    //   nextPage
    // }
    
    return (
      <Layout className="tag-page">
        <SEO
          title={`${tag}`}
          description={`There are ${totalCount} tips on ${tag}`}
        />
        <h1>{tagHeader}</h1>
        <div className="grids col-1 sm-2 lg-3">
          {postLinks}
        </div>
      </Layout>
    )
  }
}

export default TagsIndex