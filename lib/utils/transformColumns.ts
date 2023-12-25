export const transformColumns = (dataSource: any) => {
  if (!dataSource) return [];
  return Object.keys(dataSource).map((key) => {
    return {
      dataIndex: key,
      title: dataSource[key].description,
      align: 'center',
      hideInSearch: true
    };
  });
};
