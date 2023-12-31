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

    async create({ resource, variables }: Parameters<DataProvider['create']>[0]) {
      const response = await client.create(
      {
        _type: resource,
        ...(variables as any)
      },
      {
        autoGenerateArrayKeys: true
      });
      return {
        data: {
          ...response,
          id: response._id
        } as any
      }
    },

    async update({ id, variables }: Parameters<DataProvider['update']>[0]) {
      const response = await client
        .patch(id as string)
        .set({
          _id: id,
          ...(variables as any),
        })
        .commit({ autoGenerateArrayKeys: true });
      return {
        data: {
          ...response,
          id: response._id,
        } as any,
      }
    },

    async deleteOne({ id }: Parameters<DataProvider['deleteOne']>[0]) {
      const response = await client.delete(id as string);
      return {
        data: response as any
      }
    },

    async deleteMany({ ids, resource, meta }) {
      const idsStr = ids.map((id) => `"${id}"`).join(", ");
      const { query } = q(
          `*[_id in [${idsStr}]]${generateSelect(meta?.fields)}`,
      ).filterByType(resource);

      const response = await client.delete({ query });

      return {
          data: response as any,
      }
    },
    
    getApiUrl(): string {
      throw Error("Not implemented on refine-sanity data provider.");
    },
  };
}
export default dataProvider;