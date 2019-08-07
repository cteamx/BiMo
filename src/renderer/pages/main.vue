<template>
  <el-container class="container">
    <el-aside v-if="is_menu" class="nav" width="200px;">
      <div class="topx"></div>
      <div class="topc">
        <el-menu active-text-color="#909090" :collapse="isCollapse" @select="handleSelectTools">
          <el-menu-item index="1">
            <i class="el-icon-document-add"></i>
            <span slot="title">新建文档</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-tickets"></i>
            <span slot="title">打开文件</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-full-screen"></i>
            <span slot="title">全屏编辑</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-view"></i>
            <span slot="title">预览文档</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-download"></i>
            <span slot="title">导出文档</span>
          </el-menu-item>
          <!-- <el-menu-item index="6">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>-->
          <el-menu-item index="7">
            <i class="el-icon-document"></i>
            <span slot="title">使用说明</span>
          </el-menu-item>
          <el-menu-item index="8">
            <i class="el-icon-warning-outline"></i>
            <span slot="title">关于</span>
          </el-menu-item>
        </el-menu>

        <div class="topf">
          <img src="../assets/imgs/logo.png" alt>
        </div>
      </div>
    </el-aside>
    <el-main>
      <div id="wrapper">
        <div class="topx">
          <el-tooltip v-if="is_menu" class="item" effect="dark" content="关闭左侧菜单" placement="right">
            <span class="is_menu">
              <i class="el-icon-s-fold" @click="onHideMenu()"></i>
            </span>
          </el-tooltip>
          <el-tooltip v-else class="item" effect="dark" content="展开左侧菜单" placement="right">
            <span class="is_menu">
              <i class="el-icon-s-unfold" @click="onShowMenu()"></i>
            </span>
          </el-tooltip>

          <span>{{file_path}}</span>
          <span class="wsave" v-if="is_save">
            - 未保存
            <i class="el-icon-arrow-down" @click="onSave()"></i>
          </span>
          <span class="word-sum">字数：{{wordSize}}</span>
        </div>
        <el-row>
          <el-col class="span" :span="edit_span" v-if="is_edit">
            <codemirror v-model="code" :options="cmOptions" @input="inputs"></codemirror>
          </el-col>

          <el-col class="span" :span="html_span" v-if="is_html">
            <div class="preview-wrap">
              <div class="markdown-body" v-html="value" v-highlight></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>

    <el-dialog title="导出" :visible.sync="dialogDown" width="400px">
      <el-row>
        <el-col class="span" :span="12">
          <div class="downs">
            <el-tooltip v-if="is_menu" class="item" effect="dark" content="导出 Html" placement="top">
              <img
                src="../assets/imgs/html.png"
                @click="onMakeSave(1)"
                @focus="focusing = false"
                @blur="focusing = false"
                alt
              >
            </el-tooltip>
          </div>
        </el-col>

        <el-col class="span" :span="12">
          <div class="downs">
            <el-tooltip v-if="is_menu" class="item" effect="dark" content="导出 PDF" placement="top">
              <img src="../assets/imgs/PDF.png" @click="onMakeSave(2)" alt>
              <p>PDF暂未开放</p>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog title="设置" :visible.sync="dialogSetting" :before-close="handleCloseSetting">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSetting = false">取 消</el-button>
        <el-button type="primary" @click="dialogSetting = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="关于" :visible.sync="dialogAbout">
      <div>
        <img class="imglogo" src="../assets/imgs/logo.png" alt>
        <p>
          <b>笔墨</b> 是一款 Markdown 书写工具
        </p>
        <p>
          <b>邮箱</b>：service@c.team
        </p>
        <p>
          <b>Github</b>：<a class="a" @click="openUrl('https://github.com/cteams/BiMo')">https://github.com/cteams/BiMo</a>
        </p>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import marked from "marked";
import dialog from "../utils/dialog.js";
import files from "../utils/file.js";
import md from "../components/md.js";
import html from "../components/html.js";
import { codemirror } from "vue-codemirror";
import { shell } from "electron";

import pdf from "html-pdf";
import toc from "markdown-toc";

import "../assets/css/codemirror.css";
import "codemirror/keymap/sublime.js";
import "codemirror/addon/edit/closetag.js";
import "codemirror/addon/search/search.js";
import "codemirror/addon/search/jump-to-line.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/edit/continuelist.js";
import "codemirror/mode/markdown/markdown.js";

// import 'codemirror/theme/monokai.css'

export default {
  components: {
    codemirror
  },
  data() {
    return {
      code: "",
      value: "",
      defaultData: "preview",
      cmOptions: {
        tabSize: 4,
        keyMap: "sublime",
        mode: "text/x-markdown",
        showCursorWhenSelecting: true,
        styleActiveLine: true,
        lineWrapping: true,
        autoCloseTags: true,
        extraKeys: {
          Enter: "newlineAndIndentContinueMarkdownList",
          "Cmd-S": () => {
            this.onSave();
          },
          "Cmd-O": () => {
            this.onOpenFile();
          },
          "Cmd-N": () => {
            this.onNewFile();
          },
          "Cmd-B": cm => {
            this.setExtraKeys(cm, "B");
          },
          "Cmd-I": cm => {
            this.setExtraKeys(cm, "I");
          },
          "Cmd-L": cm => {
            this.setExtraKeys(cm, "L");
          },
          "Cmd-G": cm => {
            this.setExtraKeys(cm, "G");
          },
          "Cmd-K": cm => {
            this.setExtraKeys(cm, "K");
          },
          "Cmd-1": cm => {
            this.setExtraKeys(cm, "1");
          },
          "Cmd-2": cm => {
            this.setExtraKeys(cm, "2");
          },
          "Cmd-3": cm => {
            this.setExtraKeys(cm, "3");
          },
          "Cmd-4": cm => {
            this.setExtraKeys(cm, "4");
          },
          "Cmd-5": cm => {
            this.setExtraKeys(cm, "5");
          },
          "Cmd-6": cm => {
            this.setExtraKeys(cm, "6");
          }
        },
        smartIndent: true // 自带markdown缩进
      },
      wordSize: 0,
      isCollapse: true,
      is_edit: true,
      is_html: true,
      edit_span: 12,
      html_span: 12,
      file_path: "未命名",
      is_menu: true,
      is_save: false,
      is_open: false,
      l: null,
      r: null,
      scale: 0,
      throttleLoadL: null,
      throttleLoadR: null,
      dialogDown: false,
      dialogSetting: false,
      dialogAbout: false
    };
  },
  mounted() {
    this.markdown();
  },
  destroyed() {
    this.closeScroll();
  },
  methods: {
    handleCloseSetting(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    setExtraKeys(cm, type) {
      var txt = cm.getSelection();
      if (type == "B") {
        cm.replaceSelection("**" + txt + "**");
      } else if (type == "I") {
        cm.replaceSelection("*" + txt + "*");
      } else if (type == "L") {
        cm.replaceSelection("[描述](http://example.com)");
      } else if (type == "G") {
        cm.replaceSelection("![描述](http://example.com/ss.jpg)");
      } else if (type == "K") {
        cm.replaceSelection("```type\n" + txt + "\n```");
      } else if (type == "1") {
        cm.replaceSelection("# " + txt);
      } else if (type == "2") {
        cm.replaceSelection("## " + txt);
      } else if (type == "3") {
        cm.replaceSelection("### " + txt);
      } else if (type == "4") {
        cm.replaceSelection("#### " + txt);
      } else if (type == "5") {
        cm.replaceSelection("##### " + txt);
      } else if (type == "6") {
        cm.replaceSelection("###### " + txt);
      }
    },
    onScroll(e) {
      // this.closeScroll();

      let that = this;
      that.l = document.querySelector(".CodeMirror-vscrollbar");
      that.r = document.querySelector(".preview-wrap");

      that.scale = that.l.offsetHeight / that.r.offsetHeight;

      that.throttleLoadL = this.fnThrottle(this.onScrollL, 5);

      that.throttleLoadR = this.fnThrottle(this.onScrollR, 5);

      that.l.addEventListener("scroll", that.throttleLoadL);
      that.r.addEventListener("scroll", that.throttleLoadR);
    },
    closeScroll() {
      this.l.removeEventListener("scroll", this.throttleLoadL);
      this.r.removeEventListener("scroll", this.throttleLoadR);
    },
    onScrollL() {
      this.r.scrollTop = this.l.scrollTop * this.scale;
    },
    onScrollR() {
      this.l.scrollTop = this.r.scrollTop / this.scale;
    },
    // VUE 节流
    fnThrottle(fn, delay, atleast) {
      let timer = null;
      let previous = null;
      return function() {
        let now = +new Date();
        if (!previous) previous = now;
        if (atleast && now - previous > atleast) {
          fn();
          previous = now;
          clearTimeout(timer);
        } else {
          clearTimeout(timer);
          timer = setTimeout(function() {
            fn();
            previous = null;
          }, delay);
        }
      };
    },
    onOpenLinkInit() {
      //外部打开所有出站链接
      let links = document
        .querySelector(".preview-wrap")
        .querySelectorAll("a[href]");

      Array.prototype.forEach.call(links, function(link) {
        const url = link.getAttribute("href");
        if (url.indexOf("http") === 0) {
          link.addEventListener("click", function(e) {
            e.preventDefault();
            shell.openExternal(url);
            return false;
          });
        }
      });
    },
    markdown() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      });

      this.value = marked(this.code);
      this.wordSize = this.code.length;

      setTimeout(() => {
        this.onOpenLinkInit();
        this.onScroll();
      }, 1000);


      // console.log(toc(this.code).content);
    },
    inputs() {
      if (this.is_open) {
        this.is_save = false;
        this.is_open = false;
      } else {
        this.is_save = true;
        this.markdown();
      }
    },
    onShowMenu() {
      this.is_menu = true;
    },
    onHideMenu() {
      this.is_menu = false;
    },
    onSave() {
      let that = this;

      if (this.file_path == "未命名") {
        dialog.showSave(0, function(e) {
          that.file_path = e;

          files.writeFile(that.file_path, that.code);

          that.is_save = false;
        });
      } else {
        files.writeFile(that.file_path, that.code);

        that.is_save = false;
      }
    },
    onMakeSave(type) {
      // type 1 html  2 PDf
      let that = this;

      if (type == 1) {
        dialog.showSave(type, function(e) {
          if (type == 1) {
            let value = html.htmlHeader + that.value + html.htmlFooter;
            files.writeFile(e, value);
          } else if (type == 2) {
            // var options = { format: "A4" };
            // pdf.create(that.value, options).toFile(e, function(err, res) {
            //   if (err) return console.log(err);
            // });
          }
        });
      }
    },
    onNewFile() {
      // 新建文档
      this.file_path = "未命名";
      this.is_save = true;
      this.code = "";
      this.value = "";
      this.is_edit = true;
      this.is_html = true;
      this.html_span = 12;
      this.edit_span = 12;
    },
    onOpenFile() {
      let that = this;
      // 打开文档
      dialog.showOpenFile(function(e) {
        that.file_path = e[0];

        files.readFile(that.file_path, function(e) {
          that.is_edit = true;
          that.is_html = true;
          that.html_span = 12;
          that.edit_span = 12;
          that.value = "";
          that.code = e;
          that.is_open = true;
          that.markdown();
        });
      });
    },
    handleSelectTools(key, keyPath) {
      if (key == "1") {
        this.onNewFile();
      } else if (key == "2") {
        this.onOpenFile();
      } else if (key == "3") {
        // 全屏编辑
        if (this.is_html) {
          this.is_html = false;
          this.edit_span = 24;
          this.is_edit = true;
        } else {
          this.is_html = true;

          if (this.html_span == 24) {
            this.html_span = 12;
          }
          this.edit_span = 12;
          this.is_edit = true;
        }
      } else if (key == "4") {
        // 全屏预览
        if (this.is_edit) {
          this.is_edit = false;
          this.html_span = 24;
          this.is_html = true;
        } else {
          this.is_edit = true;
          if (this.edit_span == 24) {
            this.edit_span = 12;
          }
          this.html_span = 12;
          this.is_html = true;
        }
      } else if (key == "5") {
        this.dialogDown = true;
      } else if (key == "6") {
        // this.dialogSetting = true;
      } else if (key == "7") {
        this.$confirm(
          "会清空当前文档内容, 请先保存当前文档，是否继续?",
          "提示",
          {
            confirmButtonText: "已经保存",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.file_path = "未命名";
            this.is_save = true;
            this.is_edit = true;
            this.is_html = true;
            this.html_span = 12;
            this.edit_span = 12;

            this.code = md.mdText;
            this.value = md.mdText;
          })
          .catch(() => {});
      } else if (key == "8") {
        this.dialogAbout = true;
      }
    },
    openUrl(url){
      shell.openExternal(url);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/github.css";

.container {
  height: 100%;

  .nav {
    background: #fff;
    height: 100%;

    .topx {
      height: 25px;
      background: #fff;
      -webkit-app-region: drag;
    }

    .topc {
      border-right: 1px solid #efefef;
      height: calc(100% - 25px);

      .topf {
        position: fixed;
        bottom: 10px;
        text-align: center;
        width: 64px;
        line-height: 10px;
        color: #6d6d6d;

        .p1 {
          background: #e41717;
          height: 33px;
          width: 40px;
          line-height: 33px;
          color: #fff;
          margin: auto;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
        }

        .p2 {
          background: #505050;
          height: 33px;
          width: 40px;
          line-height: 33px;
          color: #fff;
          margin: auto;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
        }

        img {
          width: 40px;
        }
      }
    }

    .el-menu {
      border: 0px;
    }
  }

  .el-main {
    padding: 0px;

    #wrapper {
      height: calc(100% - 46px);

      .topx {
        height: 25px;
        background: #fff;
        text-align: center;
        color: #000;
        line-height: 27px;
        font-weight: 300;
        border-bottom: 1px solid #efefef;
        font-size: 12px;
        -webkit-user-select: none;
        -webkit-app-region: drag;
      }

      .wsave {
        color: #848484;
      }

      .word-sum {
        font-size: 12px;
        font-weight: 100;
        position: absolute;
        right: 12px;
      }

      .is_menu {
        font-size: 14px;
        cursor: pointer;
        position: absolute;
        left: 76px;
      }

      .el-row {
        height: 100%;
        .span {
          height: 100%;
          .vue-codemirror {
            font-size: 14px;
            height: 100%;
            margin-top: 10px;
            margin-left: 10px;
            margin-bottom: 10px;
            border-right: 1px solid #f1f1f1;
            overflow-y: hidden;
          }

          .preview-wrap {
            height: 100%;
            overflow: auto;
            margin-top: 10px;
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 10px;

            .markdown-body {
              max-width: 800px;
              margin: auto;
            }
          }
        }
      }
    }
  }

  .downs {
    text-align: center;
    margin-right: 10px;
    margin-left: 10px;

    img {
      width: 80px;
      height: 80px;
      cursor: pointer;
    }
  }

  .el-tooltip:focus {
    outline-width: 0;
  }

  .imglogo {
    position: absolute;
    width: 80px;
    right: 40px;
    top: 71px;
  }

  .a{
    color:#0366d6;
    cursor: pointer;
  }
}
</style>
