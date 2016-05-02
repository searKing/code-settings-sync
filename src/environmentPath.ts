"use strict";
import * as vscode from 'vscode';
import * as path from 'path';
// 环境变量类
export class Environment {

    private context: vscode.ExtensionContext;
    public isInsiders = null;
    // vsc存储所在父目录 ~
    public homeDir = null;
    // 插件安装目录 ~/.vscode/extensions
    public ExtensionFolder: string = null;
    // 应用数据目录，即存放配置文件和应用数据的目录 ~/.config/Code
    public PATH = null;
    
    // ~/.config/Code/User/gist_sync.txt
    public FILE_GIST: string = null;
    // ~/.config/Code/User/token.txt
    public FILE_TOKEN: string = null;
    // ~/.config/Code/User/settings.txtjson
    public FILE_SETTING: string = null;
    // ~/.config/Code/User/launch.txtjson
    public FILE_LAUNCH: string = null;
    public FILE_KEYBINDING: string = null;
    public FILE_SETTING_NAME: string = "settings.json";
    public FILE_LAUNCH_NAME: string = "launch.json";
    public FILE_KEYBINDING_NAME: string = "keybindings.json";
    public FILE_EXTENSION_NAME : string = "extensions.json";
    // ~/.config/Code/User/extensions.json
    public FILE_EXTENSION : string = null;
    // ~/.config/Code/User/snippets/
    public FOLDER_SNIPPETS: string = null;
    // ~/.config/Code/User/syncSettings.json
    // 保存vsc配置在Git远程同步信息，Gist + Token
    public APP_SETTINGS : string = null;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        // /insiders/是正则表达式
        this.isInsiders = /insiders/.test(context.asAbsolutePath(""));
        // 指向当前shell的环境变量的HOME目录
        this.homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
        // 插件安装目录HOME/.vscode/extensions
        this.ExtensionFolder = path.join(this.homeDir, this.isInsiders ? '.vscode-insiders' : '.vscode', 'extensions');
        // 一般windows会有的应用数据目录，如/Roming/，其他操作系统，需按照惯例自己生成
        this.PATH = process.env.APPDATA
        if (!this.PATH) {
            // macos
            if (process.platform == 'darwin')
                this.PATH = process.env.HOME + '/Library/Application Support';
            else if (process.platform == 'linux') {
                var os = require("os")
                this.PATH = os.homedir() + '/.config';
            } else
                this.PATH = '/var/local'
        }

        var codePath = this.isInsiders ? '/Code - Insiders' : '/Code';
        this.PATH = this.PATH + codePath;

        this.FILE_GIST = this.PATH.concat("/User/gist_sync.txt");
        this.FILE_EXTENSION = this.PATH.concat("/User/",this.FILE_EXTENSION_NAME);
        this.FILE_TOKEN = this.PATH.concat("/User/token.txt");
        this.FILE_SETTING = this.PATH.concat("/User/",this.FILE_SETTING_NAME);
        this.FILE_LAUNCH = this.PATH.concat("/User/",this.FILE_LAUNCH_NAME);
        this.FILE_KEYBINDING = this.PATH.concat("/User/",this.FILE_KEYBINDING_NAME);
        this.FOLDER_SNIPPETS = this.PATH.concat("/User/snippets/");
        this.APP_SETTINGS = this.PATH.concat("/User/syncSettings.json");
    }


}