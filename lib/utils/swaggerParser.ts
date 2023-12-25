import SwaggerParser from '@apidevtools/swagger-parser';
import importSync from 'import-sync';
import path from 'path';

export const swaggerParse = (callback: (err: any, api: any) => void) => {
  const swaggerConfigPath = path.resolve(process.cwd(), './swaggerApi.config.js');
  const swaggerConfig = importSync(swaggerConfigPath);
  const swaggerJsonUrl = swaggerConfig.apifoxOption.projects[0].url;
  const parser = new SwaggerParser();
  parser.dereference(swaggerJsonUrl, callback);
};

export const handleSwaggerObjArr = (swaggerObj: any) => {
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
