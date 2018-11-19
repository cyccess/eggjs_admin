/*!
 * 
 * 基于Bootstrap扩展Modal 
 * Date 2018-08-13 10:00
 * CRP
 */
+(function ($, window) {
  var dialogTpl = [];
  dialogTpl.push('<div class="modal fade" tabindex="-1" role="dialog">' +
      '  <div class="modal-dialog" role="document">' +
      '    <div class="modal-content">' +
      '      <div class="modal-header">' +
      '        <h5 class="modal-title">Modal title</h5>' +
      '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
      '          <span aria-hidden="true">&times;</span>' +
      '        </button>' +
      '      </div>' +
      '      <div class="modal-body">' +
      '      <div class="modal-loading"></div>' +
      '      </div>' +
      '      <div class="modal-footer">' +
      '        <button type="button" class="btn btn-primary" id="ok">保存</button>' +
      '        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>');

  var dialog = function (config) {

    config = config || {};

    var setting = dialog.setting;

    // 合并默认配置
    for (var i in setting) {
      if (config[i] === undefined) config[i] = setting[i];
    }

    // 自定义按钮队列
    config.button = config.button || [];

    config.ok &&
    config.button.push({
      id: config.okBtn,
      callback: config.ok
    });

    config.cancel &&
    config.button.push({
      id: config.cancelBtn,
      callback: config.cancel
    });

    return dialog.fn._init(config);
  };

  dialog.fn = dialog.prototype = {

    constructor: dialog,

    _init: function (config) {
      var that = this;

      that.config = config;

      that._showBox();

      that.button.apply(that, config.button);
      that._addEvent();

      return that;
    },
    _showBox: function () {
      var that = this,
          fn = that.config.close;

      that.modal = that._modal();
      that.modal.close = function () {
        if (typeof fn === 'function')
          fn.call(that, window);
        this.removeFormDom();
      }

      return that;
    },
    button: function () {
      var that = this,
          listeners = that._listeners = that._listeners || {},
          ags = [].slice.call(arguments),
          item, id;

      for (var i in ags) {
        item = ags[i];
        id = item.id;

        if (!listeners[id])
          listeners[id] = {};

        if (item.callback)
          listeners[id].callback = item.callback;
      }

      return that;
    },
    _addEvent: function () {
      var that = this,
          modal = that.modal;

      modal.find('.modal-footer').on("click", function (event) {
        var target = event.target, btnID;
        if (target === modal.$close[0]) {
          that._click('cancel');
          return false;
        }
        else {
          btnID = target.id;
          btnID && that._click(target.id);
        }
      });

      $(window).on("resize", function () {
        that._setModalBodyMaxHeight();
      });

      return that;
    },
    _click: function (id) {
      var that = this,
          fn = that._listeners[id] && that._listeners[id].callback;
      return typeof fn !== "function" || fn.call(that, window) !== false ? that.modal.close() : that;
    },
    _modal: function () {
      this.modal = this.modal || $(".modal");

      this.modal.length > 0 && this.modal.remove();

      this.modal = $(dialogTpl.join(""));
      this.modal.find('.modal-dialog').css({'max-width': this.config.width});
      this.modal.find('.modal-title').html(this.config.title);

      this.modal.modal({
        // backdrop: "static",
        show: true
      });

      this.loadContent();

      return this.modal;
    },
    handleUpdate: function () {
      this.modal.find(".modal-body").html(this.config.content);

      if (this.config.init) {
        this.config.init.call(this);
      }

      this._setModalBodyMaxHeight();

      var _close = this.modal.find('.close');

      if (_close) {
        this.modal["$close"] = _close;
      }

      this.modal.removeFormDom = function () {
        this.modal("hide");
      }
    },
    loadContent: function () {
      var that = this;
      var con = that.config.content.split(':');
      if (con.length === 2) {
        $.get(con[1], function (con) {
          that.config.content = con;
          that.handleUpdate();
        })
      }
      else {
        that.handleUpdate();
      }
    },
    _setModalBodyMaxHeight: function (win) {
      var modal = this.modal,
          wh = $(window).height(),
          mh,
          mt;

      modal.find(".modal-body").css({"max-height": wh - 230});
      mh = modal.find(".modal-content").height();
      mt = (wh - mh) / 2;
      // modal.find(".modal-dialog").css({"margin-top": mt});
    }
  };

  dialog.fn._init.prototype = dialog.fn;

  /*! 使用jQ方式调用窗口 */
  $.fn.dialog = function () {
    var config = arguments;
    this.bind('click', function () {
      dialog.apply(this, config);
      return false;
    });
    return this;
  };

  window.dialog = $.dialog = dialog;

  /*! dialog 的全局默认配置 */
  dialog.setting = {
    title: "",
    content: null,         //url:/demo/page
    button: null,          //自定义按钮组
    okBtn: "ok",        //确定按钮ID
    cancelBtn: "cancel",    //取消按钮ID
    ok: null,             //确定按钮回调函数
    cancel: null,           //取消按钮回调函数
    init: null,             //对话框初始化后执行的函数
    close: null,            //对话框关闭前执行的函数
    width: null,
    size: 'lg'                //lg sm
  };

}(jQuery, this));


/* 
 *使用示例
 *
 $.dialog({
    content:'url:/demo/page'
    init: function () {
       
    },
    sure: function () {

        alert(1);
        return false;
    },
    cancel: function () {

    },
    button: [
        {
            id: "btn1",
            callback: function () {
                alert("btn1");
                return false;
            }
        }
    ],
    close: function () {
        alert("close");
    }
});
*/