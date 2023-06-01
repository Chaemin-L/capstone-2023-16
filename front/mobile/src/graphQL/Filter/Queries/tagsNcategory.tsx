import {graphql} from 'babel-plugin-relay/macro';

export const tagsNcategoryFilter = graphql`
  query tagsNcategoryFilterQuery($category: GlobalID!, $tags: [GlobalID!]!) {
    getPublicPosts(
      sortingOpt: {sortBy: ID}
      categoryFilter: {id: $category}
      tagsFilter: {tagIds: $tags}
    ) {
      edges {
        node {
          id
          contentPreview
          tags {
            edges {
              node {
                body
              }
            }
          }
          likeCnt
          paidContent
          title
          isPublic
          requiredMembershipTier
          bookmarkCnt
          commentCnt
          author {
            id
            nickname
          }
        }
      }
    }
  }
`;
