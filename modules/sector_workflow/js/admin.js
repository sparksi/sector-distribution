(function ($, Drupal) {
  Drupal.behaviors.sector_workflow = {
    attach: function (context, settings) {
      if (typeof document.querySelector('option[value="draft"]') !== 'undefined') {
        var moderationState = document.getElementById('edit-moderation-state-0-state');
        moderationState.value = 'draft';
      }
    }
  }
})(jQuery, Drupal);
