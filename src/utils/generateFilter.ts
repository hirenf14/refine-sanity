import { CrudFilters, CrudOperators } from "@refinedev/core";

const mapOperator = (operator: CrudOperators) => {
    switch (operator) {
        case "eq":
            return "==";
        case "ne":
            return "!=";
        case "lt":
            return "<";
        case "gt":
            return ">";
        case "lte":
            return "<=";
        case "gte":
            return ">=";
        case "in":
        case "nin":
            return "in";
        case "contains":
        case "ncontains":
            return "match";
        default:
            throw new Error(`Does't support Operator ${operator} yet.`);
    }
}
const negativeFilters = ["nin", "ncontains"];
export const generateFilter = (filters?: CrudFilters) => {
    const queryFilters = filters
      ?.map((filter) => {
        if (Array.isArray(filter?.value) && filter.value?.length === 0) {
          return undefined;
        }
  
        if ("field" in filter) {
          const { field, operator, value } = filter;
          const mappedOperator = mapOperator(operator);
          const isNegative = negativeFilters.includes(operator);
          const filterStr = `${field} ${mappedOperator} "${value}"`;
  
          return isNegative ? `!(${filterStr})` : filterStr;
        }
        return undefined;
      })
      .filter((v) => v);
  
    return queryFilters?.join(" && ");
  };
  