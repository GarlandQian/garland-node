import { ApiHideProperty } from '@nestjs/swagger';

export class BaseDTO {
  /**
   * 创建时间
   * @example Date
   */
  readonly createTime: Date;

  /**
   * 创建人
   * @example string
   */
  creator: string;

  /**
   * 更新时间
   * @example Date
   */
  readonly updateTime: Date;

  /**
   * 更新人
   * @example string
   */
  updater: string;

  /**
   * 是否删除
   * @example false
   */
  @ApiHideProperty()
  delFlag: number;

  /**
   * 更新次数
   * @example 1
   */
  @ApiHideProperty()
  version: number;
}
