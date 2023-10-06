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
        const response = await this.client.fetch(paginatedQuery.query);
        return {
          data: response.data,
          total: response.total
        };
    }
  };
}
export default SanityDataProvider;