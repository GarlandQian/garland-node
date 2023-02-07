export default {
  // 服务基本配置
  SERVICE_CONFIG: {
    // 端口
    port: 3001,
    // 请求前缀
    apiPrefix: 'api',
  },

  // 数据库配置
  DATABASE_CONFIG: {
    type: 'mysql',
    host: '182.61.150.19',
    port: 3306,
    username: 'nodedb',
    password: 'root',
    database: 'nodedb',
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  },

  //swagger配置
  SWAGGER_CONFIG: {
    setupUrl: 'api-docs',
    title: 'WD NestJS 博客API',
    desc: '第一个NestJS例子',
    version: '1.0.0',
  },
};
