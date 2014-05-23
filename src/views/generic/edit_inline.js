"use strict";

var Backbone = require('../../backbone')
  , $ = require('jquery')

require('jquery-bootstrap');

module.exports = {
  editItem: function (EditView) {
    var that = this
      , editView = new EditView({ model: this.model })

    if (!this.$mainEl || !this.$editEl) {
      throw "Define both a $mainEl and $editEl for the view to use this function."
    }

    this.$mainEl.hide();
    editView.$el.appendTo(that.$editEl);
    this.listenToOnce(editView, 'removed', function (modelSaved) {
      if (modelSaved) {
        that.$mainEl.show();
      } else {
        that.remove();
        Backbone.history.loadUrl(Backbone.history.fragment);
      }
    });
  },
  deleteItem: function (itemType, nameAttribute, navigateAfter) {
    var that = this
      , template = require('../../templates/delete_item_modal.html')
      , message
      , $modal

    message = (
        'Delete ' + (itemType ? itemType + ' ' : '') +
        '<strong>' + this.model.get(nameAttribute || 'name') + '</strong>?')

    $modal = $(template({ message: message}))
      .prependTo('body').show().modal()
      .on('hidden.bs.modal', function () {
        $modal.remove();
      })
      .one('click', '[name="confirm-delete"]', function () {
        that.model.destroy({
          success: function () {
            that.remove.bind(that);
            $modal.modal('hide');
            Backbone.history.navigate(navigateAfter || '', { trigger: true });
          }
        });
      });
  }
}
