import ncp from 'copy-paste';
import { findSwaggerDataSource, searchCountries } from '@/utils';
import { handleFilterSwaggerListData } from '@/utils';
import autocomplete from 'inquirer-autocomplete-standalone';
import { transformColumns } from '@/utils/transformColumns';

export const createTable = async (swaggerObjAr: any) => {
  const swaggerResArr = handleFilterSwaggerListData(swaggerObjAr);
  const answer: string = await autocomplete({
    message: '请选择一个列表接口生成TableColumns',
    source: async (input: string) => {
      const finalCountries = await searchCountries(input, swaggerResArr);
      return finalCountries;
    }
  });
  if (!answer) process.exit(0);
  const result = findSwaggerDataSource(answer, swaggerResArr);
  ncp.copy(transformColumns(result), () => {
    console.log('内容已成功复制至剪切板');
  });
};
