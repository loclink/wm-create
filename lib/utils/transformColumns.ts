/**
 * 初始化Columns
 * @param dataSource
 * @returns
 */
export const handleInitColumns = (dataSource: any) => {
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

export const filterColumns = (columns: any[], answerData: any) => {
  columns.filter((item) => (answerData.columns as any[]).includes(item.dataIndex));
};

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
