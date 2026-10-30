(function () {
  'use strict';

  function initFilterGroup(group) {
    var buttons = Array.prototype.slice.call(group.querySelectorAll('[data-filter]'));
    if (!buttons.length) {
      return;
    }

    var blocks = Array.prototype.slice.call(document.querySelectorAll('.content-block[data-group]'));
    var status = document.getElementById('filter-status');
    var labels = {
      all: 'جميع الأقسام',
      phone: 'أقسام الهاتف',
      pc: 'أقسام الحاسوب',
      channels: 'أقسام القنوات والمجتمعات'
    };

    function applyFilter(selectedButton) {
      var filter = selectedButton.getAttribute('data-filter');

      buttons.forEach(function (button) {
        button.setAttribute('aria-pressed', button === selectedButton ? 'true' : 'false');
      });

      blocks.forEach(function (block) {
        var matches = filter === 'all' || block.getAttribute('data-group') === filter;
        block.hidden = !matches;
      });

      if (status) {
        status.textContent = 'يتم عرض ' + (labels[filter] || 'المحتوى') + '.';
      }
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        applyFilter(button);
      });
    });
  }

  function initTabs(tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    if (!tabs.length) {
      return;
    }

    var section = tablist.closest('.tabs-section');
    var panels = section ? Array.prototype.slice.call(section.querySelectorAll('[role="tabpanel"]')) : [];

    function getPanel(tab) {
      var panelId = tab.getAttribute('aria-controls');
      return panels.filter(function (panel) {
        return panel.id === panelId;
      })[0] || null;
    }

    function activateTab(selectedTab, moveFocus) {
      tabs.forEach(function (tab) {
        var isSelected = tab === selectedTab;
        tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        tab.tabIndex = isSelected ? 0 : -1;

        var panel = getPanel(tab);
        if (panel) {
          panel.hidden = !isSelected;
        }
      });

      if (moveFocus) {
        selectedTab.focus();
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateTab(tab, false);
      });
    });

    tablist.addEventListener('keydown', function (event) {
      var currentIndex = tabs.indexOf(document.activeElement);
      if (currentIndex === -1) {
        return;
      }

      var isRtl = document.documentElement.dir === 'rtl';
      var nextIndex;

      switch (event.key) {
        case 'ArrowRight':
          nextIndex = currentIndex + (isRtl ? -1 : 1);
          break;
        case 'ArrowLeft':
          nextIndex = currentIndex + (isRtl ? 1 : -1);
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();

      if (nextIndex < 0) {
        nextIndex = tabs.length - 1;
      } else if (nextIndex >= tabs.length) {
        nextIndex = 0;
      }

      activateTab(tabs[nextIndex], true);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    Array.prototype.forEach.call(document.querySelectorAll('[role="tablist"]'), initTabs);
    Array.prototype.forEach.call(document.querySelectorAll('[data-filter-group]'), initFilterGroup);
  });
})();
