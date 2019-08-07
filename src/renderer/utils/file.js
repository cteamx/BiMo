'use strict';

import fs from "fs"

export default {
    // 读文件内容
    readFile(path, callback) {
        fs.readFile(path, "utf-8", function (err, data) {
            // 读取文件失败/错误
            if (err) {
                throw err;
            }
            // 读取文件成功
            callback(data.toString());
        });
    },
    // 写文件
    writeFile(path, text) {
        fs.writeFile(path, text, function (err) {
            if (err) {
                throw err;
            }
            console.log("Saved.");
        });
    },
    // 读目录列表
    readCatalog(path) {
        fs.readdir(path, function (err, files) {
            if (err) {
                throw err;
            }
            console.log(files);
        });
    }
};