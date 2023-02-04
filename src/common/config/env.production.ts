export default {
  // 服务基本配置
  SERVICE_CONFIG: {
    // 端口
    port: 3000,
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
  },
};
