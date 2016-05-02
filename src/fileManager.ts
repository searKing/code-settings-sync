"use strict";
var fs = require('fs');
// 文件类
export class File {
    // 文件名
    public fileName: string = null;
    constructor(private file: string, public content: string, private filePath) {
        // this.fileName = file.split('.')[0];
        this.fileName = file;
    }
}
// 文件管理类
export class FileManager {

    // 检测文件是否存在
    public static FileExists(filePath: string): Promise<boolean> {
        
        return new Promise<boolean>((resolve, reject) => {
            // 调用系统函数检测对应文件路径的文件存在状态
            var stat: boolean = fs.existsSync(filePath);
            if (stat) {
                resolve(stat);
            }
            else resolve(stat);
        });
    }
    // ES7 中有了更加标准的解决方案，新增了 async/await 两个关键词。
    // async 可以声明一个异步函数，此函数需要返回一个 Promise 对象。
    // await 可以等待一个 Promise 对象 resolve，并拿到结果。
    // 声明一个异步函数，返回Promise对象
    // resolve、reject是Promise接口的回调函数，这些回调函数，均是Promise接口需要实现的，一般thenable实现
    
    // 从文件中读入内容，并调用resolve回调返回读出的数据data
    public static async ReadFile(filePath: string): Promise<string> {
        return new Promise<string>(async(resolve, reject) => {
            // 读取文件内容
            await fs.readFile(filePath, { encoding: 'utf8' }, function(err: any, data: any) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(data);

            });
        });
    }

    // 将数据写入文件
    public static WriteFile(filePath: string, data: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (data) {
                fs.writeFile(filePath, data, function(err: any, data: any) {
                    if (err) {
                        console.error(err);
                        reject(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            }
            else {
                console.error("DATA is EMPTY for " + filePath);
                reject(false);
            }
        });
    }

    // 列出当前路径下所有文件，并回调resolve返回文件列表
    public static async ListFiles(directory: string): Promise<Array<File>> {
        var me = this;
        return new Promise<Array<File>>((resolve, reject) => {
            // data 文件名数组
            fs.readdir(directory, async function(err: any, data: Array<string>) {
                if (err) {
                    console.error(err);
                    reject(null);
                }

                var files = new Array<File>();
                for (var i = 0; i < data.length; i++) {
                    var fileName = data[i];
                    var filePath = directory.concat(fileName);
                    var fileContent = await me.ReadFile(filePath);
                    var file: File = new File(fileName, fileContent, filePath);
                    files.push(file);
                }
                resolve(files);
            });

        });
    }

    public static async DeleteFile(filePath: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (filePath) {
                this.FileExists(filePath).then(async function(fileExists: boolean) {
                    if (fileExists) {
                        await fs.unlinkSync(filePath);
                    }
                    resolve(true);
                });
            }
            else {
                console.error("DATA is EMPTY for " + filePath);
                reject(false);
            }
        });
    }

    public static async CreateDirectory(name: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (name) {
                this.FileExists(name).then(async function(dirExist: boolean) {
                    if (!dirExist) {
                        await fs.mkdirSync(name);

                    }
                    resolve(true);
                });
            }
            else {
                console.error("DATA is EMPTY for " + name);
                reject(false);
            }
        });
    }

}