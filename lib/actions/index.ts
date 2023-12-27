import { actions, searchAction } from '@/config/keymap';
import { findSwaggerDataSource, handleFilterSwaggerListData } from '@/utils';
import { handleInitColumns } from '@/utils/transformColumns';
import ncp from 'copy-paste';
const { Toggle, Confirm, AutoComplete, MultiSelect, Sort, Select } = require('enquirer');

export const createTable = async (swaggerObjArr: any) => {
  const swaggerResArr = handleFilterSwaggerListData(swaggerObjArr);
  const autoComplete = new AutoComplete({
    limit: 10,
    ame: 'columns',
    message: '请选择一个列表接口生成TableColumns',
    actions: searchAction,
    choices: swaggerResArr.map((resItem) => ({
      name: resItem.operationId,
      message: resItem.name
    })),
    footer: () => `${swaggerResArr.length > 10 ? '...' : ''}共${swaggerResArr.length}条选项`
  });
  const answer = await autoComplete.run();
  if (!answer) process.exit(0);

  const result = findSwaggerDataSource(answer, swaggerResArr);
  const initColumns = handleInitColumns(result);
  let currentColumns = initColumns;

  // 过滤
  const multiselect = new MultiSelect({
    limit: 10,
    message: '请选择你需要的表单项',
    name: 'columns',
    actions,
    choices: currentColumns.map((item) => {
      return {
        message: `${item.dataIndex}: ${item.title || item.dataIndex}`,
        name: item.dataIndex
      };
    }),
    footer: () => `${currentColumns.length > 10 ? '...' : ''}共${currentColumns.length}条选项`
  });
  const filterRes = await multiselect.run();
  currentColumns = currentColumns.filter((item) => (filterRes as any[]).includes(item.dataIndex));

  // 排序
  const sort = new Sort({
    name: 'columns',
    message: '请对其进行排序',
    actions,
    choices: currentColumns.map((item) => {
      return {
        message: `${item.dataIndex}: ${item.title || item.dataIndex}`,
        name: item.dataIndex
      };
    })
  });
  const sortRes = await sort.run();

  currentColumns = sortRes.map((item: any) => {
    return currentColumns.find((column) => column.dataIndex === item);
  });
  const toggle = new Toggle({
    name: 'question',
    message: '是否为Columns加入查询字段?',
    initial: true,
    actions,
    enabled: '是',
    disabled: '否'
  });
  const toggleRes = await toggle.run();

  if (toggleRes) {
    const parameters = swaggerResArr.find((item) => item.operationId == answer).parameters;
    const searchColumns = parameters
      ?.map((item: any) => {
        if (!['pageSize', 'pageNum', 'beginTime', 'endTime'].includes(item.name)) {
          return {
            title: item?.description,
            hideInTable: true,
            dataIndex: item.name
          };
        }
      })
      .filter((item: any) => item);

    // searchColumns = [
    //   {
    //     title: '通用时间范围查询',
    //     dataIndex: 'date',
    //     hideInTable: true,
    //     valueType: 'dateRange',
    //     search: {
    //       transform([beginTime, endTime]: string[]) {
    //         return {
    //           beginTime: `${beginTime} 00:00:00`,
    //           endTime: `${endTime} 23:59:59`
    //         };
    //       }
    //     }
    //   },
    //   ...searchColumns
    // ];

    currentColumns = [...searchColumns, ...currentColumns];
  }

  const selectRes = new Select({
    name: 'action',
    message: '请选择需要执行的操作',
    choices: [
      {
        message: '使用当前Columns创建EnhanceTable页面',
        name: 1
      },
      {
        message: '仅复制Columns至剪切板, 并退出任务',
        name: 0
      }
    ]
  });

  ncp.copy(currentColumns, () => {
    console.log('Columns已成功复制至系统剪切板');
    process.exit(0);
  });
};
