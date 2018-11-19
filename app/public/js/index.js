$(function () {
  var Sidebar = function () {
    this.sidebarType = 'full';
    this.currentTheme = '';

    this._init();
  };

  Sidebar.prototype = {
    constructor: Sidebar,
    _init: function () {
      this.sidebarType = $.cookie("sidebarType");
      this.currentTheme = $.cookie("mystyle");

      this.$sidebar = $(".sidebar");

      this.loadTheme();

      if (this.sidebarType && this.sidebarType === 'mini') {
        this.onSidebarFold();
      }

      // 展开第一个菜单
      this.onSidebarEvent(".sidebar-nav:first");
    },
    loadTheme: function () {
      if (this.currentTheme) {
        $("link[data-rel='theme']").attr("disabled", "disabled");
        $("link[title='" + this.currentTheme + "']").removeAttr("disabled");
      }
    },
    onSidebarEvent: function (ele) {
      var $ele = $(ele);
      var innerHeight = $('.sidebar-content').innerHeight();
      var navCount = $(".sidebar-nav").length;
      // 子菜单内部高度 =（菜单总数 * 一级菜单高度）+ 折叠操作高度
      innerHeight = innerHeight - ((navCount * 40) + 30);

      if ($ele.hasClass('sidebar-nav-active')) {
        $ele.removeClass("sidebar-nav-active");
        $ele.find('.sidebar-trans').animate({
          "max-height": 0
        }, 50)
      }
      else {
        // 取消已选中的菜单
        $('.sidebar-nav.sidebar-nav-active').removeClass('sidebar-nav-active')
            .find('.sidebar-trans').css({"max-height": 0});
        $ele.addClass("sidebar-nav-active");
        $ele.find('.sidebar-trans').animate({
          'max-height': innerHeight + "px"
        }, 50);
      }
    },
    onSidebarFold: function () {
      var $viewBody = $('.view-body');
      var mini_css = "sidebar-mini";

      if (this.$sidebar.hasClass(mini_css)) {
        this.sidebarType = 'full';
        this.$sidebar.removeClass(mini_css);
        $viewBody.css({"left": "180px"});
      }
      else {
        this.sidebarType = 'mini';
        this.$sidebar.addClass(mini_css);
        $viewBody.css({"left": "50px"});
      }
      this.setTooltipEvent();
      $.cookie('sidebarType', this.sidebarType);
    },
    setTooltipEvent: function () {
      var $tip = $(".sidebar-title,.sidebar-trans .nav-item a");
      if (this.sidebarType === 'mini') {
        $tip.on({
          mouseenter: function () {
            var $that = $(this)
            var offset = $that.offset();
            $('.sidebar_tooltip').css({"left": "50px", "top": (offset.top + 3) + "px"})
                .addClass("show")
                .html($that.data('tip'));
          },
          mouseleave: function () {
            $('.sidebar_tooltip').removeClass("show");
          }
        });
      }
      else {
        $tip.off("mouseenter mouseleave");
      }
    }
  };

  var sidebar = new Sidebar();

  $(".sidebar-nav").on("click", function () {
    sidebar.onSidebarEvent(this);
  });

  $(".sidebar .sidebar-fold").click(function () {
    sidebar.onSidebarFold();
  });

  $(".dropdown .changecolor li").click(function () {
    var style = $(this).attr("id");
    $("link[data-rel='theme']").attr("disabled", "disabled");
    $("link[title='" + style + "']").removeAttr("disabled");
    $.cookie('mystyle', style);
  });

  var path = window.location.pathname.toLowerCase();
  $(".nav-item a").each(function (i, ele) {
    var $ele = $(ele);
    var href = $ele.attr("href").toLowerCase();
    if (href === path) {
      var nav = $ele.parent().addClass("active").closest(".sidebar-nav");
      // sidebar.onSidebarEvent(nav);
    }
  });

  $(".topbar-nav-menu").on('show.bs.dropdown', function () {
    var innerHeight = $(document).innerHeight();
    $('.topbar-nvar-inner').css({"max-height": (innerHeight - 50) + 'px', 'overflow-y': 'scroll'});
  });

  var csrftoken = $.cookie("csrfToken");

  function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }
  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader('x-csrf-token', csrftoken);
      }
    },
  });
});