export function validateProductRow(row: Record<string, any>) {
  if (!row.article || !row.name || !row.price) {
    throw new Error(`Row missing mandatory fields: ${JSON.stringify(row)}`);
  }
  return true;
}
