'use strict';

import { remote } from 'electron'

export default {
    showOpenFile(callback) {
        remote.dialog.showOpenDialog({
            title: '请选择要打开的文件',
            filters: [
                { name: 'Markdown', extensions: ['md'] },
                { name: 'All Files', extensions: ['*'] }
            ],
            properties: ['openFile', 'showHiddenFiles']
        }, (filePaths) => {
            callback(filePaths)
        })
    },
    showOpenCatalog() {
        remote.dialog.showOpenDialog({
            title: '请选择文档目录',
            properties: ['openDirectory', 'showHiddenFiles', 'createDirectory']
        }, (filePaths) => {
            console.log(filePaths)
        })
    },
    showSave(type,callback) {
        let filters=[];
        
        if(type==0){
            filters.push({ name: 'Markdown', extensions: ['md'] })
        }else if(type==1){
            filters.push({ name: 'HTML', extensions: ['html'] })
        }else if(type==2){
            filters.push({ name: 'PDF', extensions: ['pdf'] })
        }

        filters.push({ name: 'All Files', extensions: ['*'] })

        remote.dialog.showSaveDialog({
            title: '文件另存为',
            filters: filters,
        }, (filename) => {
            callback(filename)
        })
    },
    showErrorBox() {
        remote.dialog.showErrorBox('title', 'Error')
    },
    // MessageBOX
    showMessageBox() {
        remote.dialog.showMessageBox({
            type: 'info',
            buttons: ['button1', 'button2', 'button3'],
            title: 'Message Box',
            message: 'This is Message Box Test.',
            detail: '额外的信息'
        }, (response) => {
            // 被点击按钮的索引.
            console.log(response)
        })
    }
};