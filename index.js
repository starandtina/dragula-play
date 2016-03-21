var dragCotentContainer = document.querySelector('#drag-content-container');
var draggableContentContainer = document.querySelector('#draggable-content-container');
var Actions = Reflux.createActions({
  Blocker: {
    children: ['append', 'remove', 'shadow']
  }
});

Actions.Blocker.append.listen(function (type, el) {
  var $el = $(el);
  var View;

  switch (type) {
  case 'IMAGE':
    View = ImageBlockerView;
    break;
  case 'TEXT':
    View = TextBlockerView;
    break;
  case 'BUTTON':
    View = ButtonBlockerView;
    break;
  default:
    break;
  }

  $el.replaceWith(new View(Array.prototype.slice(arguments)).render().el);

  var editor = new MediumEditor('.editable', {
    toolbar: {
      buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote', 'orderedlist', 'unorderedlist', 'removeFormat']
    }
  });

  if ($('.editable').length !== 0) {
    $('.editable').get(0).focus();
  }
});


Actions.Blocker.shadow.listen(function (el, container, source) {
  $('.insertion-bar').remove();

  el.parentNode.insertBefore($('<div class="insertion-bar" />')[0], el);
  // $(el).addClass('hide');
});

dragula([dragCotentContainer, draggableContentContainer], {
    copy: function (el, source) {
      return source === draggableContentContainer;
    },
    accepts: function (el, target) {
      return target !== draggableContentContainer;
    },
    moves: function (el, source, handle, sibling) {
      return true; // elements are always draggable by default
    },
    invalid: function (el, handle) {
      return false; // don't prevent any drags from initiating by default
    }
  })
  .on('cloned', function (clone, original, type) {

  })
  .on('shadow', function (el, container, source) {
    Actions.Blocker.shadow.apply(Actions.Blocker, Array.prototype.slice.call(arguments));
  })
  .on('drag', function (el) {
    el.className = el.className.replace('ex-moved', '');
  })
  .on('drop', function (el, target, source, sibling) {
    $('.insertion-bar').remove();

    el.className += ' ex-moved';

    var args = Array.prototype.slice.call(arguments);
    args.unshift(el.dataset['blocker']);

    if (target != source) {
      Actions.Blocker.append.apply(Actions.Blocker, args);
    }
  })
  // .on('over', function (el, container) {
  //   container.className += ' ex-over';
  // }).on('out', function (el, container) {
  //   container.className = container.className.replace('ex-over', '');
  // });
