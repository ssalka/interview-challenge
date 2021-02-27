import { gql } from 'apollo-boost'

export const EPOCHES_QUERY = gql`
  query epoches($first: Int!, $skip: Int) {
    epoches(first: $first, skip: $skip) {
      id
      startBlock
      endBlock
      queryFees: queryFeeRebates
      totalRewards
    }
  }
`
