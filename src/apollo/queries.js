import { gql } from 'apollo-boost'

export const EPOCHES_QUERY = gql`
  query epoches($first: Int!) {
    epoches(first: $first) {
      id
      startBlock
      endBlock
    }
  }
`
