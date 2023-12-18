import { Query } from "mongoose"
import { TQueryObj } from "../types/TQueryObj"
import { filter } from "./filterHelper"
import { search } from "./serachHelper"

export const getQuery = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
    const filteredQuery = filter(modelQuery, query)
    const searchedQuery = search(filteredQuery, query)
    // const sortedQuery = sort(searchedQuery, query)
    // const paginatedQuery = paginate(sortedQuery, query)
    // const selectedFieldQuery = select(paginatedQuery, query)
    return searchedQuery
  }