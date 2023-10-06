import { SanityClient } from "@sanity/client";

import {
  DataProvider,
} from "@refinedev/core";

import { q } from 'groqd';
import { generateFilter } from "./utils/generateFilter";
import { generateSelect } from "./utils/generateSelect";
import { generateSort } from "./utils/generateSort";


export const dataProvider = (client: SanityClient): DataProvider => {
  return {
    async getList({ resource, pagination, sorters, filters, meta }: Parameters<DataProvider['getList']>[0]) {
      const {
        current = 1,
        pageSize = 10,
      } = pagination ?? {};
      const start = (current - 1) * pageSize;
      const end = start + pageSize - 1;
      let dataQuery: any = q("*").filterByType(resource);
      const filterStr = generateFilter(filters);
      if (filterStr) {
        dataQuery = dataQuery.filter(filterStr); // Apply filters if any result's achieved
      }
      const totalQuery = dataQuery.query; // Separate query to avoid sliced total
      if (sorters?.length) {
        dataQuery = dataQuery.order(...generateSort(sorters));
      }
      dataQuery = dataQuery.slice(start, end);
      const paginatedQuery = q(`{
        "data": ${dataQuery.query}${generateSelect(meta?.fields)},
        "total": count(${totalQuery}._id)
      }`);
      const response = await client.fetch(paginatedQuery.query);
      return {
        data: response.data,
        total: response.total
      };
    },

    async getOne({ resource, id, meta }: Parameters<DataProvider['getOne']>[0]) {
      const { query } = q("*").filterByType(resource).filter(`_id == "${id}"`).slice(0);
      const dataQuery = q(`{
      "data": ${query}${generateSelect(meta?.fields)}
    }`);
      // const data = await client.getDocument(id as string);
      const response = await client.fetch(dataQuery.query);
      return {
        data: response.data
      }
    },

    getApiUrl(): string {
      throw Error("Not implemented on refine-sanity data provider.");
    },
    async create({ resource, variables }: Parameters<DataProvider['create']>[0]) {
      const response = await client.create({
        _type: resource,
        ...(variables as any)
      });
      return {
        data: {
          ...response,
          id: response._id
        } as any
      }
    },

    async update({ resource, id, variables }: Parameters<DataProvider['update']>[0]) {
      const response = await client.createOrReplace({
        _type: resource,
        _id: id,
        ...(variables as any)
      });
      return {
        data: {
          ...response,
          id: response._id
        } as any
      }
    },

    async deleteOne({ id }: Parameters<DataProvider['deleteOne']>[0]) {
      const response = await client.delete(id as string);
      return {
        data: response as any
      }
    }
  };
}
export default dataProvider;