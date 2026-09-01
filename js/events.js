/* =============================================================
   events.js — No More Hiding
   Monthly calendar + event list for the Events page.
   ============================================================= */

(function () {
  'use strict';

  var calGrid      = document.getElementById('cal-grid');
  var calEventList = document.getElementById('cal-event-list');
  var calMonthLbl  = document.getElementById('cal-month-label');
  var prevBtn      = document.querySelector('[data-testid="cal-prev-btn"]');
  var nextBtn      = document.querySelector('[data-testid="cal-next-btn"]');

  if (!calGrid) return;

  /* ── State ── */
  var today = new Date();
  var state = { year: today.getFullYear(), month: today.getMonth() };

  /* ── Event data ─────────────────────────────────────────────
     Keys: "YYYY-M-D"  (month is 0-indexed, same as Date())
     ─────────────────────────────────────────────────────────── */
  var EVENTS = {
    /* October 24, 2026 — month index 9 */
    '2026-9-24': [{
      title:       'Color Outside the Lines',
      subtitle:    'A Sip, Snack & Paint Experience',
      color:       'salmon',
      time:        '1:00 – 4:00 PM',
      location:    'The Greene Turtle Sports Bar & Grille, Gambrills, MD',
      address:     '1407 S. Main Chapel Way, Gambrills, MD',
      description: 'A 3-hour instructor-led paint experience for women who want to step away from perfection and simply enjoy the creative process while meeting new people. No experience necessary — just bring your curiosity.',
      seats:       'Limited Seating',
      url:         'https://www.eventbrite.com/e/color-outside-the-lines-a-sip-snack-paint-experience-tickets-1992692301315',
      urlLabel:    'Register on Eventbrite',
      mapsUrl:     'https://www.google.com/maps/search/?api=1&query=1407+S.+Main+Chapel+Way+Gambrills+MD',
    }],

    /* November 28, 2026 — month index 10 */
    '2026-10-28': [{
      title:       'Friendsgiving @ The Winery',
      subtitle:    'An Evening of Gratitude, Connection & Celebration',
      color:       'sage',
      time:        '1:00 – 4:00 PM',
      location:    'The Winery at Bull Run',
      address:     '15950 Lee Highway, Centreville, VA 20120',
      description: 'A beautifully curated evening of wine, seasonal grazing, meaningful conversation, and warm sisterhood — designed for women who are ready to slow down, reconnect, and celebrate before the holiday season begins.',
      seats:       'Limited Seating',
      url:         'https://www.eventbrite.com/e/friendsgiving-the-winery-tickets-1998302663058?aff=ebdsoporgprofile',
      urlLabel:    'Register on Eventbrite',
      mapsUrl:     'https://www.google.com/maps/search/?api=1&query=15950+Lee+Highway+Centreville+VA+20120',
    }],
    
  };

  /* ── Constants ── */
  var MONTHS     = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var DAYS       = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var DOT_COLORS = { salmon: '#F8A491', sage: '#B7C7A4', slate: '#8fa8c4' };

  /* ── Render ── */
  function render() {
    var y = state.year;
    var m = state.month;

    calMonthLbl.textContent = MONTHS[m] + ' ' + y;

    var firstDay    = new Date(y, m, 1).getDay();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var daysInPrev  = new Date(y, m, 0).getDate();
    var isThisMonth = today.getFullYear() === y && today.getMonth() === m;

    var cells = [];

    for (var i = firstDay - 1; i >= 0; i--) {
      cells.push({ day: daysInPrev - i, cls: 'cal-cell other-month', numCls: 'cal-day-num other', events: [], isOther: true });
    }

    for (var d = 1; d <= daysInMonth; d++) {
      var key     = y + '-' + m + '-' + d;
      var isToday = isThisMonth && today.getDate() === d;
      cells.push({
        day:     d,
        cls:     isToday ? 'cal-cell today' : 'cal-cell',
        numCls:  isToday ? 'cal-day-num today' : 'cal-day-num',
        events:  EVENTS[key] || [],
        isOther: false,
      });
    }

    var remaining = (7 - (cells.length % 7)) % 7;
    for (var n = 1; n <= remaining; n++) {
      cells.push({ day: n, cls: 'cal-cell other-month', numCls: 'cal-day-num other', events: [], isOther: true });
    }

    calGrid.innerHTML = cells.map(function (cell, idx) {
      var eventsHtml = cell.events.map(function (ev) {
        return '<span class="cal-event ' + ev.color + '">' + escHtml(ev.title) + '</span>';
      }).join('');
      var ariaLabel = cell.isOther ? '' : ' aria-label="' + MONTHS[m] + ' ' + cell.day + (cell.events.length ? ', ' + cell.events.length + ' event' + (cell.events.length > 1 ? 's' : '') : '') + '"';
      return '<div class="' + cell.cls + '" role="gridcell"' + ariaLabel + ' data-testid="cal-cell-' + (idx + 1) + '">'
        + '<div class="' + cell.numCls + '">' + cell.day + '</div>'
        + eventsHtml
        + '</div>';
    }).join('');

    /* ── Event list below calendar ── */
    var listEvents = [];
    for (var dd = 1; dd <= daysInMonth; dd++) {
      var k = y + '-' + m + '-' + dd;
      if (EVENTS[k]) {
        EVENTS[k].forEach(function (ev) {
          listEvents.push({ day: dd, dow: DAYS[new Date(y, m, dd).getDay()], ev: ev });
        });
      }
    }

    if (listEvents.length === 0) {
      calEventList.innerHTML = '<p class="cal-no-events">No events scheduled this month.</p>';
    } else {
      calEventList.innerHTML = listEvents.map(function (item) {
        var ev = item.ev;
        var dotColor = DOT_COLORS[ev.color] || '#F8A491';

        var seatsHtml  = ev.seats
          ? '<span class="cal-list-badge">' + escHtml(ev.seats) + '</span>' : '';
        var addrHtml   = ev.address
          ? '<div class="cal-list-event-address">'
            + (ev.mapsUrl
              ? '<a href="' + escHtml(ev.mapsUrl) + '" target="_blank" rel="noopener" class="event-address-link">' + escHtml(ev.address) + '</a>'
              : escHtml(ev.address))
            + '</div>' : '';
        var descHtml   = ev.description
          ? '<div class="cal-list-event-desc">' + escHtml(ev.description) + '</div>' : '';
        var regHtml    = ev.url
          ? '<a href="' + escHtml(ev.url) + '" class="cal-list-register" target="_blank" rel="noopener">'
            + escHtml(ev.urlLabel || 'Register') + ' <span aria-hidden="true">→</span></a>' : '';

        return '<div class="cal-list-item" role="listitem" data-testid="cal-event-item">'
          + '<div class="cal-list-date">'
          + '<div class="cal-list-date-day">' + item.day + '</div>'
          + '<div class="cal-list-date-dow">' + item.dow + '</div>'
          + '</div>'
          + '<div class="cal-list-dot" style="background:' + dotColor + ';" aria-hidden="true"></div>'
          + '<div class="cal-list-body">'
          + '<div class="cal-list-event-title">' + escHtml(ev.title) + seatsHtml + '</div>'
          + (ev.subtitle ? '<div class="cal-list-event-subtitle">' + escHtml(ev.subtitle) + '</div>' : '')
          + '<div class="cal-list-event-meta">' + escHtml(ev.time) + ' &nbsp;·&nbsp; ' + escHtml(ev.location) + '</div>'
          + addrHtml
          + descHtml
          + regHtml
          + '</div>'
          + '</div>';
      }).join('');
    }
  }

  /* ── Navigation ── */
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      if (state.month === 0) { state.month = 11; state.year--; }
      else { state.month--; }
      render();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      if (state.month === 11) { state.month = 0; state.year++; }
      else { state.month++; }
      render();
    });
  }

  /* ── Utility ── */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  render();

})();

/* =============================================================
   Upcoming Events List — renders all future events chronologically
   into #upcoming-event-cards on the events page
   ============================================================= */

(function () {
  'use strict';

  var container = document.getElementById('upcoming-event-cards');
  if (!container) return;

  var MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var MONTHS_FULL  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var DAYS_FULL    = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  /* Pull event data — same EVENTS object defined above in this file.
     Walk all keys, parse dates, filter to today or future, sort asc. */
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var allEvents = [];

  /* EVENTS is defined in the IIFE above but not accessible here.
     Re-declare the same data so this block is self-contained. */
  var UPCOMING = [
    {
      date:        new Date(2026, 9, 24),   /* Oct 24 2026 */
      title:       'Color Outside the Lines',
      subtitle:    'A Sip, Snack & Paint Experience',
      color:       'salmon',
      time:        '1:00 – 4:00 PM',
      location:    'The Greene Turtle Sports Bar & Grille, Gambrills, MD',
      address:     '1407 S. Main Chapel Way, Gambrills, MD · Ph: 410-702-9896',
      description: 'A 3-hour instructor-led paint experience for women who want to step away from perfection and simply enjoy the creative process while meeting new people. No experience necessary — just bring your curiosity.',
      seats:       'Limited Seating',
      url:         'https://www.eventbrite.com/e/color-outside-the-lines-a-sip-snack-paint-experience-tickets-1992692301315',
      urlLabel:    'Register on Eventbrite',
      mapsUrl:     'https://www.google.com/maps/search/?api=1&query=1407+S.+Main+Chapel+Way+Gambrills+MD',
    },
    {
      date:        new Date(2026, 10, 28),  /* Nov 28 2026 */
      title:       'Friendsgiving @ The Winery',
      subtitle:    'An Evening of Gratitude, Connection & Celebration',
      color:       'sage',
      time:        '1:00 – 4:00 PM',
      location:    'The Winery at Bull Run',
      address:     '15950 Lee Highway, Centreville, VA 20120 · Ph: 703-815-2233',
      description: 'A beautifully curated evening of wine, seasonal grazing, meaningful conversation, and warm sisterhood — designed for women who are ready to slow down, reconnect, and celebrate before the holiday season begins.',
      seats:       'Limited Seating',
      url:         'https://www.eventbrite.com/e/friendsgiving-the-winery-tickets-1998302663058?aff=ebdsoporgprofile',
      urlLabel:    'Register on Eventbrite',
      mapsUrl:     'https://www.google.com/maps/search/?api=1&query=15950+Lee+Highway+Centreville+VA+20120',
    },
  ];

  /* Filter to upcoming only, sort ascending */
  var future = UPCOMING.filter(function (ev) { return ev.date >= today; });
  future.sort(function (a, b) { return a.date - b.date; });

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  if (future.length === 0) {
    container.innerHTML = '<p class="upcoming-events-empty">No upcoming events at this time — check back soon.</p>';
    return;
  }

  container.innerHTML = future.map(function (ev) {
    var d   = ev.date;
    var dow = DAYS_FULL[d.getDay()];
    var mon = MONTHS_SHORT[d.getMonth()].toUpperCase();
    var day = d.getDate();

    var badgeHtml   = ev.seats
      ? '<span class="upcoming-event-badge">' + esc(ev.seats) + '</span>' : '';
    var addrHtml    = ev.address
      ? '<div class="upcoming-event-address">'
        + (ev.mapsUrl
          ? '<a href="' + esc(ev.mapsUrl) + '" target="_blank" rel="noopener" class="event-address-link">' + esc(ev.address) + '</a>'
          : esc(ev.address))
        + '</div>' : '';
    var subtitleHtml = ev.subtitle
      ? '<div class="upcoming-event-subtitle">' + esc(ev.subtitle) + '</div>' : '';
    var descHtml    = ev.description
      ? '<div class="upcoming-event-desc">' + esc(ev.description) + '</div>' : '';

    var actionsHtml = '';
    if (ev.url) {
      actionsHtml += '<a href="' + esc(ev.url) + '" class="upcoming-event-register" target="_blank" rel="noopener">'
        + esc(ev.urlLabel || 'Register') + ' →</a>';
    } else {
      actionsHtml += '<a href="/events/" class="upcoming-event-details-link">More Details →</a>';
    }

    return '<div class="upcoming-event-card" role="listitem">'
      + '<div class="upcoming-event-date">'
      + '<span class="upcoming-event-date-month">' + mon + '</span>'
      + '<span class="upcoming-event-date-day">' + day + '</span>'
      + '<span class="upcoming-event-date-dow">' + dow.slice(0, 3) + '</span>'
      + '</div>'
      + '<div class="upcoming-event-body">'
      + '<div class="upcoming-event-title">' + esc(ev.title) + badgeHtml + '</div>'
      + subtitleHtml
      + '<div class="upcoming-event-meta">' + esc(ev.time) + ' &nbsp;·&nbsp; ' + esc(ev.location) + '</div>'
      + addrHtml
      + descHtml
      + '<div class="upcoming-event-actions">' + actionsHtml + '</div>'
      + '</div>'
      + '</div>';
  }).join('');

})();
