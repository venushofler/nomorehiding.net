/**
 * contact.js
 * Country-code flag picker + contact form submit handler
 * for /contact/index.html
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════
     COUNTRY PICKER
  ═══════════════════════════════════════════════════════════════ */

  /* [iso2, dialCode, name] */
  var COUNTRIES = [
    ['af','93','Afghanistan'],
    ['al','355','Albania'],
    ['dz','213','Algeria'],
    ['ad','376','Andorra'],
    ['ao','244','Angola'],
    ['ag','1','Antigua & Barbuda'],
    ['ar','54','Argentina'],
    ['am','374','Armenia'],
    ['au','61','Australia'],
    ['at','43','Austria'],
    ['az','994','Azerbaijan'],
    ['bs','1','Bahamas'],
    ['bh','973','Bahrain'],
    ['bd','880','Bangladesh'],
    ['bb','1','Barbados'],
    ['by','375','Belarus'],
    ['be','32','Belgium'],
    ['bz','501','Belize'],
    ['bj','229','Benin'],
    ['bt','975','Bhutan'],
    ['bo','591','Bolivia'],
    ['ba','387','Bosnia & Herzegovina'],
    ['bw','267','Botswana'],
    ['br','55','Brazil'],
    ['bn','673','Brunei'],
    ['bg','359','Bulgaria'],
    ['bf','226','Burkina Faso'],
    ['bi','257','Burundi'],
    ['cv','238','Cape Verde'],
    ['kh','855','Cambodia'],
    ['cm','237','Cameroon'],
    ['ca','1','Canada'],
    ['cf','236','Central African Republic'],
    ['td','235','Chad'],
    ['cl','56','Chile'],
    ['cn','86','China'],
    ['co','57','Colombia'],
    ['km','269','Comoros'],
    ['cg','242','Congo'],
    ['cr','506','Costa Rica'],
    ['hr','385','Croatia'],
    ['cu','53','Cuba'],
    ['cy','357','Cyprus'],
    ['cz','420','Czech Republic'],
    ['dk','45','Denmark'],
    ['dj','253','Djibouti'],
    ['do','1','Dominican Republic'],
    ['ec','593','Ecuador'],
    ['eg','20','Egypt'],
    ['sv','503','El Salvador'],
    ['gq','240','Equatorial Guinea'],
    ['er','291','Eritrea'],
    ['ee','372','Estonia'],
    ['sz','268','Eswatini'],
    ['et','251','Ethiopia'],
    ['fj','679','Fiji'],
    ['fi','358','Finland'],
    ['fr','33','France'],
    ['ga','241','Gabon'],
    ['gm','220','Gambia'],
    ['ge','995','Georgia'],
    ['de','49','Germany'],
    ['gh','233','Ghana'],
    ['gr','30','Greece'],
    ['gt','502','Guatemala'],
    ['gn','224','Guinea'],
    ['gy','592','Guyana'],
    ['ht','509','Haiti'],
    ['hn','504','Honduras'],
    ['hu','36','Hungary'],
    ['is','354','Iceland'],
    ['in','91','India'],
    ['id','62','Indonesia'],
    ['ir','98','Iran'],
    ['iq','964','Iraq'],
    ['ie','353','Ireland'],
    ['il','972','Israel'],
    ['it','39','Italy'],
    ['ci','225','Ivory Coast'],
    ['jm','1','Jamaica'],
    ['jp','81','Japan'],
    ['jo','962','Jordan'],
    ['kz','7','Kazakhstan'],
    ['ke','254','Kenya'],
    ['kw','965','Kuwait'],
    ['kg','996','Kyrgyzstan'],
    ['la','856','Laos'],
    ['lv','371','Latvia'],
    ['lb','961','Lebanon'],
    ['ls','266','Lesotho'],
    ['lr','231','Liberia'],
    ['ly','218','Libya'],
    ['li','423','Liechtenstein'],
    ['lt','370','Lithuania'],
    ['lu','352','Luxembourg'],
    ['mg','261','Madagascar'],
    ['mw','265','Malawi'],
    ['my','60','Malaysia'],
    ['mv','960','Maldives'],
    ['ml','223','Mali'],
    ['mt','356','Malta'],
    ['mr','222','Mauritania'],
    ['mu','230','Mauritius'],
    ['mx','52','Mexico'],
    ['md','373','Moldova'],
    ['mc','377','Monaco'],
    ['mn','976','Mongolia'],
    ['me','382','Montenegro'],
    ['ma','212','Morocco'],
    ['mz','258','Mozambique'],
    ['mm','95','Myanmar'],
    ['na','264','Namibia'],
    ['np','977','Nepal'],
    ['nl','31','Netherlands'],
    ['nz','64','New Zealand'],
    ['ni','505','Nicaragua'],
    ['ne','227','Niger'],
    ['ng','234','Nigeria'],
    ['mk','389','North Macedonia'],
    ['no','47','Norway'],
    ['om','968','Oman'],
    ['pk','92','Pakistan'],
    ['pa','507','Panama'],
    ['pg','675','Papua New Guinea'],
    ['py','595','Paraguay'],
    ['pe','51','Peru'],
    ['ph','63','Philippines'],
    ['pl','48','Poland'],
    ['pt','351','Portugal'],
    ['qa','974','Qatar'],
    ['ro','40','Romania'],
    ['ru','7','Russia'],
    ['rw','250','Rwanda'],
    ['sa','966','Saudi Arabia'],
    ['sn','221','Senegal'],
    ['rs','381','Serbia'],
    ['sl','232','Sierra Leone'],
    ['sg','65','Singapore'],
    ['sk','421','Slovakia'],
    ['si','386','Slovenia'],
    ['so','252','Somalia'],
    ['za','27','South Africa'],
    ['kr','82','South Korea'],
    ['ss','211','South Sudan'],
    ['es','34','Spain'],
    ['lk','94','Sri Lanka'],
    ['sd','249','Sudan'],
    ['sr','597','Suriname'],
    ['se','46','Sweden'],
    ['ch','41','Switzerland'],
    ['sy','963','Syria'],
    ['tw','886','Taiwan'],
    ['tj','992','Tajikistan'],
    ['tz','255','Tanzania'],
    ['th','66','Thailand'],
    ['tg','228','Togo'],
    ['tt','1','Trinidad & Tobago'],
    ['tn','216','Tunisia'],
    ['tr','90','Turkey'],
    ['tm','993','Turkmenistan'],
    ['ug','256','Uganda'],
    ['ua','380','Ukraine'],
    ['ae','971','United Arab Emirates'],
    ['gb','44','United Kingdom'],
    ['us','1','United States'],
    ['uy','598','Uruguay'],
    ['uz','998','Uzbekistan'],
    ['ve','58','Venezuela'],
    ['vn','84','Vietnam'],
    ['ye','967','Yemen'],
    ['zm','260','Zambia'],
    ['zw','263','Zimbabwe']
  ];

  var POPULAR = ['us','gb','ca','jm','tt','bb','bs','ng','gh','za'];

  /* ── DOM refs ── */
  var wrap       = document.getElementById('cpicker');
  var btn        = document.getElementById('cpicker-btn');
  var dropdown   = document.getElementById('cpicker-dropdown');
  var flagImg    = document.getElementById('cpicker-flag');
  var codeSpan   = document.getElementById('cpicker-code');
  var valueInput = document.getElementById('cpicker-value');
  var searchEl   = document.getElementById('cpicker-search');
  var listEl     = document.getElementById('cpicker-list');
  var emptyEl    = document.getElementById('cpicker-empty');

  if (!btn) return; /* not on contact page */

  var selected = COUNTRIES.filter(function (c) { return c[0] === 'us'; })[0];

  function flagUrl(iso) {
    return 'https://flagcdn.com/w20/' + iso.toLowerCase() + '.png';
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function checkSvg() {
    return '<svg class="cpicker-checkmark" viewBox="0 0 16 16" fill="none" ' +
           'width="14" height="14" aria-hidden="true">' +
           '<path d="M3 8.5l3 3L13 5" stroke="currentColor" stroke-width="2" ' +
           'stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function addItem(c) {
    var li = document.createElement('li');
    li.setAttribute('role', 'option');
    li.setAttribute('tabindex', '0');
    var isSel = (c[0] === selected[0]);
    li.setAttribute('aria-selected', isSel ? 'true' : 'false');
    li.dataset.iso = c[0];
    li.innerHTML =
      '<img src="' + flagUrl(c[0]) + '" width="20" height="15" alt="" ' +
      'aria-hidden="true" style="border-radius:2px;flex-shrink:0;">' +
      '<span class="cpicker-item-name">' + esc(c[2]) + '</span>' +
      '<span class="cpicker-item-code">+' + esc(c[1]) + '</span>' +
      (isSel ? checkSvg() : '');
    li.addEventListener('click', function () { pick(c); });
    li.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(c); }
    });
    listEl.appendChild(li);
  }

  function buildList(q) {
    q = (q || '').toLowerCase().trim();
    listEl.innerHTML = '';

    if (!q) {
      var grp = document.createElement('li');
      grp.className = 'cpicker-group-label';
      grp.setAttribute('role', 'presentation');
      grp.textContent = 'Popular';
      listEl.appendChild(grp);

      POPULAR.forEach(function (iso) {
        var c = COUNTRIES.filter(function (x) { return x[0] === iso; })[0];
        if (c) addItem(c);
      });

      var sep = document.createElement('li');
      sep.className = 'cpicker-separator';
      sep.setAttribute('role', 'separator');
      listEl.appendChild(sep);

      COUNTRIES.forEach(function (c) {
        if (POPULAR.indexOf(c[0]) === -1) addItem(c);
      });

      emptyEl.hidden = true;
    } else {
      var hits = COUNTRIES.filter(function (c) {
        return c[2].toLowerCase().indexOf(q) !== -1 ||
               c[1].indexOf(q.replace('+', '')) !== -1;
      });
      hits.forEach(addItem);
      emptyEl.hidden = hits.length > 0;
    }

    listEl.scrollTop = 0;
  }

  function pick(c) {
    selected    = c;
    flagImg.src = flagUrl(c[0]);
    flagImg.alt = c[2];
    codeSpan.textContent = '+' + c[1];
    valueInput.value     = '+' + c[1];
    close();
  }

  function open() {
    dropdown.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    searchEl.value = '';
    buildList('');
    setTimeout(function () { searchEl.focus(); }, 30);
  }

  function close() {
    dropdown.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdown.hidden ? open() : close();
  });

  searchEl.addEventListener('input', function () {
    buildList(searchEl.value);
  });

  document.addEventListener('click', function (e) {
    if (!wrap.contains(e.target)) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !dropdown.hidden) {
      close();
      btn.focus();
    }
  });


  /* ═══════════════════════════════════════════════════════════════
     FORM SUBMIT
  ═══════════════════════════════════════════════════════════════ */

  var form      = document.getElementById('contact-form');
  var resultEl  = document.getElementById('contact-result');
  var submitBtn = form ? form.querySelector('.contact-submit') : null;

  if (!form || !submitBtn) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';
    resultEl.hidden       = true;

    try {
      var res  = await fetch('https://api.web3forms.com/submit', {
        method : 'POST',
        body   : new FormData(form)
      });
      var json = await res.json();

      if (json.success) {
        resultEl.className   = 'contact-result contact-result--success';
        resultEl.textContent = 'Thank you! Your message has been sent. We’ll be in touch within 2–3 business days.';
        form.reset();
      } else {
        throw new Error(json.message || 'Submission failed');
      }
    } catch (_err) {
      resultEl.className   = 'contact-result contact-result--error';
      resultEl.textContent = 'Something went wrong. Please try again or email us directly at hello@nomorehiding.net.';
    }

    resultEl.hidden       = false;
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Send Message';
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

}());
