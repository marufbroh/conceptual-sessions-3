import { Query } from 'mongoose'
import { TQueryObj } from '../types/TQueryObj'
import { filter } from './filterHelper'
import { search } from './serachHelper'
import { sort } from './sortHelper'
import { paginate } from './paginateHelper'
import { select } from './fieldSelectHelper'

export const getQuery = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
  const searchedQuery = search(modelQuery, query)
  const filteredQuery = filter(searchedQuery, query)
  const sortedQuery = sort(filteredQuery, query)
  const paginatedQuery = paginate(sortedQuery, query)
  const selectedFieldQuery = select(paginatedQuery, query)
  return selectedFieldQuery
}
