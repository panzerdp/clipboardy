module.exports = {
  //Messages
  MESSAGE_GET_SOURCE_TEXT: 'message_get_source_text',
  MESSAGE_SELECT_SOURCE_TEXT: 'message_select_source_text',
  MESSAGE_GET_SOURCE_HEIGHT: 'message_get_source_height',
  MESSAGE_TOGGLE_SOURCE_COLLAPSE: 'message_toggle_source_collapse',

  MIN_HEIGHT_FOR_DISPLAYING_COLLAPSE: 150, //Minimum height of the source for displaying the collapse button
  MIN_HEIGHT_FOR_DISPLAYING_SELECT_TEXT: 20, //Minimum height of the source for displaying the select button in vertical layout mode
  MAX_CLIPBOARD_HISTORY_ITEMS: 15, //The maximum number of copied items stored in the history

  SETTING_BUTTONS_LAYOUT: 'setting_buttons_layout',
  VALUE_BUTTONS_LAYOUT_TOP: 'value_buttons_layout_top',
  VALUE_BUTTONS_LAYOUT_RIGHT: 'value_buttons_layout_right',

  SETTING_BUTTONS_LIST: 'setting_list_of_buttons',
  VALUE_BUTTONS_LIST_COPY: 'value_buttons_copy',
  VALUE_BUTTONS_LIST_SELECT: 'value_buttons_select',
  VALUE_BUTTONS_LIST_COLLAPSE: 'value_buttons_collapse',

  SETTING_BUTTONS_APPEARANCE: 'setting_buttons_appearance',
  VALUE_BUTTONS_APPEARANCE_ALWAYS: 'value_buttons_appearance_always',
  VALUE_BUTTONS_APPEARANCE_HOVER: 'value_buttons_appearance_hover',
  VALUE_BUTTONS_APPEARANCE_NOT_DISPLAY: 'value_buttons_appearance_not_display',

  SETTING_SYNTAX_HIGHLIGHTING: 'setting_syntax_highlighting',
  VALUE_SYNTAX_HIGHLIGHTING_HIGHLIGHTJS: 'value_syntax_highlighting_highlightjs',
  VALUE_SYNTAX_HIGHLIGHTING_PLAIN: 'value_syntax_highlighting_plain',

  CONTEXT_MENU_ID: 'clipboardy-context-menu',

  KEY_CLIPBOARD_HISTORY: 'key_clipboard_history',
  KEY_LATEST_COPIED_TEXT: 'key_latest_copied_text',

  REGEXP_NUMBER_KEY_CODE: /^(?:numpad\s)?([1-9])$/
};