/**
 * @file
 *
 * JS file for making sure that intercepts paste events from Ctrl/CMd+V and
 * right click and strips the formatting from them using proper Jquery
 * functions.
 *
 * @ignore
 */

(function ($, Drupal, drupalSettings, _) {

  'use strict';

  Drupal.ckeditor = Drupal.ckeditor || {};

  Drupal.behaviors.plaintext = {
    attach: function () {
      // Checks if the CKEDITOR currently exists
      if (typeof CKEDITOR !== 'undefined') {
        CKEDITOR.on('instanceReady', function (i) {
          // Gets the editor instance.
          var editor = i.editor;
          // The paste from word dialog shows up by default on any paste event.
          // We don't want that, so this disables it.
          editor.config.pasteFromWordPromptCleanup = false;
          // Paste event.
          editor.on('paste', function (e) {
            // Checks if the PlainText config is true, if its false, don't apply
            // the processing to the text.
            if(editor.config.PlainText === true) {
              console.log(e);
              console.log(editor);
              // Paste events that aren't the pastefromword paste dialog creates
              // this $ object inside the editor. We check if it exists.
              //
              // If it exists it means the paste should be stripped.
              if (e.data.dataTransfer.$) {
                // Not 100% sure if this is needed. Will test.
                e.data.type = 'text';

                var text = '';
                // Strip the tags using the jQuery.text function.
                e.data.dataValue = jQuery(e.data.dataValue).text();
              }
            }
          });
        });
      }
    }
  }
})(jQuery, Drupal, drupalSettings, _);