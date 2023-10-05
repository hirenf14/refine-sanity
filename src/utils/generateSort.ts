import { CrudSorting } from "@refinedev/core";

export const generateSort = (sorters: CrudSorting): string[] => {
    return sorters.map(sorter => `${sorter.field} ${sorter.order}`);
  };