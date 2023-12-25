import SwaggerParser from '@apidevtools/swagger-parser';
import importSync from 'import-sync';
import path from 'path';
import fs from 'fs-extra';

export const swaggerParse = (callback: (err: any, api: any) => void) => {
  const swaggerPrivateConfigPath = path.resolve(process.cwd(), './swaggerApi.config.private.js');
  const swaggerConfigPath = path.resolve(process.cwd(), './swaggerApi.config.js');
  const swaggerPrivateConfigPathExists = fs.existsSync(swaggerPrivateConfigPath);
  const swaggerConfigPathExists = fs.existsSync(swaggerConfigPath);

  if (!swaggerConfigPathExists && !swaggerPrivateConfigPathExists) {
    console.error('未能找到swaggerApi.config.js或swaggerApi.config.private.js, 请检查当前路径是否存在该文件');
    process.exit(1);
  }

  // 私有配置优先处理
  const swaggerConfig = swaggerPrivateConfigPathExists
    ? importSync(swaggerPrivateConfigPath)
    : importSync(swaggerConfigPath);

  const swaggerJsonUrl = swaggerConfig.apifoxOption.projects[0].url;
  const parser = new SwaggerParser();
  parser.dereference(swaggerJsonUrl, callback);
};

/**
 * 处理swagger数据，将所有列表接口数据过滤出来
 */
export const handleFilterSwaggerListData = (swaggerObj: any) => {
  const newSwaggerObjArr = Object.keys(swaggerObj.paths)
    .map((key) => {
      return {
        ...swaggerObj.paths[key]?.get,
        path: key
      };
    })
    .filter((item) => item.responses?.[200])
    .map((item) => {
      return {
        ...item,
        dataSource: item.responses[200].content['application/json'].schema.properties.data?.properties
      };
    })
    .filter((item) => item.dataSource && item.dataSource?.list && item.dataSource?.total)
    .map((item) => {
      item.dataSource = item.dataSource.list?.items.properties;
      return {
        name: (item.tags?.length ? item.tags?.[0] : '') + item.summary,
        ...item
      };
    });
  return newSwaggerObjArr;
};
