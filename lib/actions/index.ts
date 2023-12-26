import { findSwaggerDataSource, handleFilterSwaggerListData, searchCountries } from '@/utils';
import { handleInitColumns } from '@/utils/transformColumns';
import ncp from 'copy-paste';
import Enquirer from 'enquirer';
import autocomplete from 'inquirer-autocomplete-standalone';
const enquirer = new Enquirer();

export const createTable = async (swaggerObjArr: any) => {
  const swaggerResArr = handleFilterSwaggerListData(swaggerObjArr);
  const answer: string = await autocomplete({
    message: '请选择一个列表接口生成TableColumns',
    source: async (input: string) => {
      const finalCountries = await searchCountries(input, swaggerResArr);
      return finalCountries;
    }
  });
  if (!answer) process.exit(0);
  const result = findSwaggerDataSource(answer, swaggerResArr);
  const initColumns = handleInitColumns(result);
  let currentColumns = initColumns;

  const filterRes: any = await enquirer.prompt({
    type: 'multiselect',
    message: '请选择你需要的表单项',
    name: 'columns',
    choices: currentColumns.map((item) => {
      return {
        message: `${item.dataIndex}: ${item.title || item.dataIndex}`,
        name: item.dataIndex
      };
    })
  });

  currentColumns = currentColumns.filter((item) => (filterRes.columns as any[]).includes(item.dataIndex));
  const sortRes = await (enquirer as any).prompt({
    type: 'sort',
    name: 'columns',
    message: '请对其进行排序',
    choices: currentColumns.map((item) => {
      return {
        message: `${item.dataIndex}: ${item.title || item.dataIndex}`,
        name: item.dataIndex
      };
    })
  });

  currentColumns = sortRes.columns.map((item: any) => {
    return currentColumns.find((column) => column.dataIndex === item);
  });

  ncp.copy(currentColumns, () => {
    console.log(currentColumns);
    console.log('内容已成功复制至剪切板');
    process.exit(0);
  });
};
