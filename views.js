var BlockerView = Backbone.View.extend({
  attributes: {
   
  },
  events: function () {
    var e = {};

    e['click'] = this.onClick;

    return e;
  },
  onClick: function () {
    this.$el.addClass('active');
  }
});

$(document).on('click.active.endr.blocker', function () {
  $('.blocker-zone.active').removeClass('active');
});

var ImageBlockerView = BlockerView.extend({
  className: 'image-placeholder-zone u-flexCenter blocker-zone',
  template: _.template($('#image-tpl').html()),
  events: function () {
    var e = {};

    e['click'] = this.onClick;

    return e;
  },
  render: function () {
    this.$el.html(this.template());

    return this;
  }
});


var TextBlockerView = BlockerView.extend({
  className: 'text-placeholder-zone blocker-zone',
  template: _.template($('#text-tpl').html()),
  render: function () {
    this.$el.html(this.template());

    return this;
  }
});

var ButtonBlockerView = BlockerView.extend({
  className: 'button-placeholder-zone u-flexCenter blocker-zone',
  template: _.template($('#button-tpl').html()),
  render: function () {
    this.$el.html(this.template());

    return this;
  }
});
