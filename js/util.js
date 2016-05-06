var serialize = function(form) {
  if (!form || form.nodeName !== "FORM") {
    return;
  }
  var i, j,
    obj = {};
  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    if (form.elements[i].name === "") {
      continue;
    }
    switch (form.elements[i].nodeName) {
      case 'INPUT':
        switch (form.elements[i].type) {
          case 'text':
          case 'hidden':
          case 'password':
          case 'button':
          case 'reset':
          case 'submit':
            obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
            break;
          case 'checkbox':
          case 'radio':
            if (form.elements[i].checked) {
              obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
            }
            break;
          case 'file':
            break;
        }
        break;
      case 'TEXTAREA':
        obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
        break;
      case 'SELECT':
        switch (form.elements[i].type) {
          case 'select-one':
            obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
            break;
          case 'select-multiple':
            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
              if (form.elements[i].options[j].selected) {
                obj[form.elements[i].name] = encodeURIComponent(form.elements[i].options[j].value);
              }
            }
            break;
        }
        break;
      case 'BUTTON':
        switch (form.elements[i].type) {
          case 'reset':
          case 'submit':
          case 'button':
            obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
            break;
        }
        break;
    }
  }
  return obj;
};
var sortTable = function(table, col, reverse) {
  var tb = table.tBodies[0],
    tr = Array.prototype.slice.call(tb.rows, 0),
    i;
  reverse = -((+reverse) || -1);
  tr = tr.sort(function(a, b) {
    return reverse * (a.cells[col].textContent.trim()
      .localeCompare(b.cells[col].textContent.trim())
    );
  });
  for (i = 0; i < tr.length; ++i)
    tb.appendChild(tr[i]);
};
var makeSortable = function(table) {
  var th = table.tHead,
    i;
  th && (th = th.rows[0]) && (th = th.cells);
  if (th)
    i = th.length;
  else
    return;
  while (--i >= 0)
    (function(i) {
      var dir = 1;
      th[i].addEventListener('click', function() {
        sortTable(table, i, (dir = 1 - dir));
      });
    }(i));
};
var makeAllSortable = function(parent) {
  parent = parent || document.body;
  var t = parent.getElementsByTagName('table'),
    i = t.length;
  while (--i >= 0)
    makeSortable(t[i]);
};
window.onload = function() {
  makeAllSortable();
};