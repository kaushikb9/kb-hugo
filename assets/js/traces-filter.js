document.addEventListener('DOMContentLoaded', function() {
  const filterTags = document.querySelectorAll('.filter-tag');
  const archiveEntries = document.querySelectorAll('.archive-entry');
  const archiveYears = document.querySelectorAll('.archive-year');
  const archiveMonths = document.querySelectorAll('.archive-month');

  function updateCounts() {
    archiveYears.forEach(year => {
      const visibleEntries = year.querySelectorAll('.archive-entry:not(.hidden)');
      const countElement = year.querySelector('.archive-count');
      if (countElement) {
        countElement.textContent = ` ${visibleEntries.length}`;
      }
      if (visibleEntries.length === 0) {
        year.classList.add('hidden');
        year.style.display = 'none';
      } else {
        year.classList.remove('hidden');
        year.style.display = '';
      }
    });

    archiveMonths.forEach(month => {
      const visibleEntries = month.querySelectorAll('.archive-entry:not(.hidden)');
      const countElement = month.querySelector('.archive-count');
      if (countElement) {
        countElement.textContent = ` ${visibleEntries.length}`;
      }
      if (visibleEntries.length === 0) {
        month.classList.add('hidden');
        month.style.display = 'none';
      } else {
        month.classList.remove('hidden');
        month.style.display = '';
      }
    });
  }

  function filterByTraceKind(selectedTraceKind) {
    archiveEntries.forEach(entry => {
      const entryTraceKind = entry.getAttribute('data-trace-kind');
      if (selectedTraceKind === 'all' || entryTraceKind === selectedTraceKind) {
        entry.classList.remove('hidden');
        entry.style.display = '';
      } else {
        entry.classList.add('hidden');
        entry.style.display = 'none';
      }
    });
    updateCounts();
  }

  filterTags.forEach(tag => {
    tag.addEventListener('click', function() {
      filterTags.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const selectedTraceKind = this.getAttribute('data-trace-kind');
      filterByTraceKind(selectedTraceKind);
    });
  });
});
