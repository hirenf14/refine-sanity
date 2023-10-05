import { MetaQuery } from "@refinedev/core";


export const generateSelect = (fields: MetaQuery["fields"]): string => {
    if(!fields) {
        return '';
    }
    if(typeof fields === 'string') return fields;
    if(!Array.isArray(fields)) {
        console.log(fields);
    }
    const selected: string[] = fields.map(f => {
        if(typeof f === 'string') return f;
        const field = f as any;
        if(field.operation || field.fields) {
            // TODO: Doesn't support nested yet, have to add it.
            throw new Error("Sorry, nested fields are not implemented yet");
        }
        return Object.keys(field).map((key: string) => `"${key}": ${generateSelect(field[key])}`).join(", ");
    });
    return `{${selected.join(", ")}}`;
}