/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
 */
function getCurrentCaret(areaId, pos) {
  let area = document.getElementById(areaId);
  return area.selectionStart;
}

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    let range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos(areaId, pos) {
  let input = document.getElementById(areaId);
  setSelectionRange(input, pos, pos);
}

function moveCaretToPos(areaId, charCount) {
  let address = getCurrentCaret(areaId) + charCount;
  if (address >= 0)
    setCaretToPos(areaId, address);

}

function insertAtCaret(areaId, text) {
  var txtarea = document.getElementById(areaId);
  if (!txtarea) { return; }

  var scrollPos = txtarea.scrollTop;
  var strPos = 0;
  var br = ( ( txtarea.selectionStart || txtarea.selectionStart == '0' ) ?
      'ff' : ( document.selection ? 'ie' : false ) );
  if (br == 'ie') {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart('character', -txtarea.value.length);
    strPos = range.text.length;
  } else if (br == 'ff') {
    strPos = txtarea.selectionStart;
  }

  var front = ( txtarea.value ).substring(0, strPos);
  var back = ( txtarea.value ).substring(strPos, txtarea.value.length);
  txtarea.value = front + text + back;
  strPos = strPos + text.length;
  if (br == 'ie') {
    txtarea.focus();
    var ieRange = document.selection.createRange();
    ieRange.moveStart('character', -txtarea.value.length);
    ieRange.moveStart('character', strPos);
    ieRange.moveEnd('character', 0);
    ieRange.select();
  } else if (br == 'ff') {
    txtarea.selectionStart = strPos;
    txtarea.selectionEnd = strPos;
    txtarea.focus();
  }

  txtarea.scrollTop = scrollPos;
}
