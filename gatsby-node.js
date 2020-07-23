const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsProduct{
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      console.log(result)
      result.data.allDatoCmsProduct.edges.map(({ node: product }) => {
        createPage({
          path: `products/${product.slug}`,
          component: path.resolve(`./src/templates/work.js`),
          context: {
            slug: product.slug,
          },
        })
      })
      resolve()
    })
  })
}
