"use strict";
// 插件的配置参数，供远程同步使用
export class Setting{
    // GitHub的私人令牌，可用于获取GitHub相关权限的令牌
    public Token : string = null;
    // 生成的Visual Stufio Code的Gist令牌，用于确定一套VSC的配置
    public Gist : string = null;
    public Migrated : boolean = false;
    public ProxyIP : string = null;
    public ProxyPort : string = null;
}