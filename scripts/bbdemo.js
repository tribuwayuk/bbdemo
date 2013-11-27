(function(_, $, Backbone) {

  var App = App || {};

  App.init = function() {

    // Define our Todo class
    var Todo = Backbone.Model.extend({
      defaults: {
        done: false
      }
    });

    // Define our TodoView class
    var TodoView = Backbone.View.extend({

      tmpl: $('#todo-entry').html(),
      tagName: 'li',
      className: 'entry',

      events: {
        'change .done': 'toggleDone'
      },

      render: function() {
        var _self = this;
        _self.$el.html(_.template(_self.tmpl, _self.model.attributes));
        console.log(_self.$el);
        return _self;
      },

      initialize: function() {
        var _self = this;
        _self.listenTo(_self.model, 'change', _self.render);

      },

      toggleDone: function(e) {
        e.preventDefault();

      }


    });

    // Define our AppView class ( this will bild the the existing div#app element )
    var AppView = Backbone.View.extend({

      el: $('#app'),

      initialize: function() {

        var _self = this;
        // setup element variables
        _self.inputText = _self.$el.find('.todo-input')[0];
        _self.todoList = _self.$el.find('.todo-list')[0];

      },

      events: {

        'submit form': 'onSubmit'

      },

      onSubmit: function(e) {

        e.preventDefault();
        var _self = this;

        if (_self.inputText.value.trim() === '') {
          return false;
        }

        // TODO: create new model using the collection's create or add method
        var _todoText = _self.inputText.value.trim();
        var _todoView = new TodoView({
          model: new Todo({
            title: _todoText
          })
        });
        //
        $(_self.todoList).prepend(_todoView.render().el);

        _self.inputText.value = '';
        _self.inputText.focus();
      }

    });

    // Init new app
    var _app = new AppView();
  };

  // fireup App.init when dom is ready
  $(document).ready(function() {
    App.init();
  });

})(_, jQuery, Backbone);
