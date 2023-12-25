export function searchCountries(input = '', swaggerObjArr: any[]): Promise<any[]> {
  return new Promise((resolve) => {
    const results = swaggerObjArr.filter((s) => s.name.toLowerCase()?.includes(input.toLowerCase()));
    const all = results.map((resItem) => ({
      value: resItem.operationId,
      name: resItem.name,
      description: resItem.path,
      disabled: false
    }));
    resolve(all);
  });
}

export const findSwaggerDataSource = (operationId: string, swaggerObjArr: any[]) => {
  const result = swaggerObjArr.find((item) => item.operationId === operationId);
  return result.dataSource;
};
