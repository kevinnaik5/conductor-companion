/* ---------- Data ---------- */
// Route 548 Up. Intermediate stops and distances are invented for the prototype.
const STOPS = ['Minto Road', 'Delhi Gate', 'ITO', 'Pragati Maidan', 'Bhairon Marg', 'Nizamuddin', 'Ashram', 'Maharani Bagh',
  'Sukhdev Vihar', 'Okhla', 'Jamia Nagar', 'Batra Hospital', 'Khanpur', 'Hamdard Nagar'];
const STOPS_HI = ['मिंटो रोड', 'दिल्ली गेट', 'आईटीओ', 'प्रगति मैदान', 'भैरों मार्ग', 'निज़ामुद्दीन', 'आश्रम', 'महारानी बाग',
  'सुखदेव विहार', 'ओखला', 'जामिया नगर', 'बत्रा हॉस्पिटल', 'खानपुर', 'हमदर्द नगर'];
// Stop codes: placeholders (random) until real DTC stop IDs are available.
const STOP_CODES = [2714, 3051, 1186, 4420, 2638, 3907, 1452, 2875, 4163, 3329, 1790, 4512, 2246, 3684];
const KM = [0, 1.5, 3.0, 4.5, 5.5, 6.8, 8.2, 9.4, 10.6, 11.8, 13.0, 14.9, 16.0, 17.5];
const BAND_LIMITS_KM = [4, 10]; // ₹5 up to 4 km, ₹10 up to 10 km, ₹15 beyond. Placeholder.
const SLABS = [5, 10, 15]; // Non-AC, placeholder
const CUR = 3; // Pragati Maidan

/* ---------- Language ---------- */
// Device UI language. Hindi copy is a draft: needs review by a native speaker.
let LANG = 'en';
const T = {
  en: {
    route: 'Up', boarding: 'Boarding stop', offline: 'Offline', curStop: 'Current stop', next: 'Next',
    gpsUnsure: 'GPS unsure', atQ: s => `${s}?`, answerBelow: 'Answer below · auto-yes in 4 s', gpsLost: 'GPS lost · manual mode',
    pwPaid: 'UPI paid', pwNone: 'No UPI pending', pwPending: 'UPI pending', pwOver: 'UPI over 1:00',
    newTicket: 'New ticket', cancel: 'Cancel', printing: 'Printing', undo: 'Undo', voided: n => `Ticket #00${n} voided`, audit: 'Logged for audit',
    noTickets: 'No tickets yet', shiftStart: 'Shift started 06:10',
    yes4: 'Yes · 4s', change: 'Change', nextStop: 'Next stop',
    cash: 'Cash', card: 'Card', upi: 'UPI', pink: 'Pink', pinkFree: 'Pink card · free', blueCard: 'Blue card', child: 'Child', free: 'Free',
    to: s => `<small>to</small>${s}`, noStops: 'No stops', waitPrint: 'Wait · printing', childHalf: 'Child ½',
    whereTo: p => `Where to? · ${p} stops`, from: s => `From ${s}`, unsureTag: '? GPS unsure', terminal: 'Terminal', changeStart: 'Change start',
    payUpi: 'Pay by UPI', turn: 'Turn device to passenger', scanned: 'Scanned, next passenger',
    tapCard: 'Tap card now', cancelBack: 'Cancel · back to fares', ticket: 'Ticket',
    closesAuto: 'Closes by itself in 1.5 s · no tap needed', balance: b => `balance ${b}`,
    pinkRead: 'Pink card read · free ticket', pinkText: 'Tap the distance, then the stop.',
    cards: {
      pink: { label: 'Pink card', sub: 'Saheli · women', big: 'Free', meta: 'Zero-fare ticket issued' },
      blue: { label: 'Blue card', sub: 'NCMC · stored value', big: '₹10 deducted', meta: 'Balance ₹184' },
      orange: { label: 'Orange card', sub: 'Senior / disabled', big: 'Concession', meta: 'Concession applied by card' },
    },
  },
  hi: {
    route: 'अप', boarding: 'चढ़ने का स्टॉप', offline: 'ऑफ़लाइन', curStop: 'अभी का स्टॉप', next: 'अगला',
    gpsUnsure: 'GPS पक्का नहीं', atQ: s => `${s}?`, answerBelow: 'नीचे जवाब दें · 4 सेकंड में अपने-आप हाँ', gpsLost: 'GPS नहीं · मैनुअल मोड',
    pwPaid: 'UPI मिला', pwNone: 'कोई UPI बाकी नहीं', pwPending: 'UPI बाकी', pwOver: 'UPI 1:00 पार',
    newTicket: 'नया टिकट', cancel: 'रद्द करें', printing: 'प्रिंट हो रहा', undo: 'वापस', voided: n => `टिकट #00${n} रद्द`, audit: 'ऑडिट में दर्ज',
    noTickets: 'अभी कोई टिकट नहीं', shiftStart: 'शिफ़्ट 06:10 से',
    yes4: 'हाँ · 4s', change: 'बदलें', nextStop: 'अगला स्टॉप',
    cash: 'नकद', card: 'कार्ड', upi: 'UPI', pink: 'पिंक', pinkFree: 'पिंक कार्ड · मुफ़्त', blueCard: 'ब्लू कार्ड', child: 'बच्चा', free: 'मुफ़्त',
    to: s => `${s}<small>तक</small>`, noStops: 'कोई स्टॉप नहीं', waitPrint: 'रुकें · प्रिंट', childHalf: 'बच्चा ½',
    whereTo: p => `कहाँ तक? · ${p} स्टॉप`, from: s => `${s} से`, unsureTag: '? GPS पक्का नहीं', terminal: 'आखिरी स्टॉप', changeStart: 'शुरुआत बदलें',
    payUpi: 'UPI से भुगतान', turn: 'डिवाइस यात्री की ओर घुमाएँ', scanned: 'स्कैन हुआ, अगला यात्री',
    tapCard: 'अब कार्ड टैप करें', cancelBack: 'रद्द करें · किराए पर वापस', ticket: 'टिकट',
    closesAuto: '1.5 सेकंड में अपने-आप बंद', balance: b => `बैलेंस ${b}`,
    pinkRead: 'पिंक कार्ड पढ़ा · मुफ़्त टिकट', pinkText: 'दूरी चुनें, फिर स्टॉप।',
    cards: {
      pink: { label: 'पिंक कार्ड', sub: 'सहेली · महिला', big: 'मुफ़्त', meta: 'मुफ़्त टिकट जारी' },
      blue: { label: 'ब्लू कार्ड', sub: 'NCMC · बैलेंस वाला', big: '₹10 कटे', meta: 'बैलेंस ₹184' },
      orange: { label: 'ऑरेंज कार्ड', sub: 'वरिष्ठ / दिव्यांग', big: 'रियायत', meta: 'कार्ड से रियायत लागू' },
    },
  },
};
const t = (k, ...a) => { const v = T[LANG][k] ?? T.en[k]; return typeof v === 'function' ? v(...a) : v; };
const sn = i => (LANG === 'hi' ? STOPS_HI[i] : STOPS[i]);   // stop name by index, in the device language
const sname = name => sn(STOPS.indexOf(name));             // stop name from its English id
const rt = (a, b) => `${sname(a)} → ${sname(b)}`;
const tdesc = (pay, stop, extra = '') => `${t(pay)}${extra} · → ${sname(stop)}`;
const bandOf = (from, to) => { const d = KM[STOPS.indexOf(to)] - KM[STOPS.indexOf(from)]; return d <= BAND_LIMITS_KM[0] ? 0 : d <= BAND_LIMITS_KM[1] ? 1 : 2; };
// Exit stop on the ticket strip: the one bold word, in its fare band's colour (boarding stop lives only in the top box)
const trip = (from, to) => `→ <b class="exit band-${bandOf(from, to)}">${sname(to)}</b>`;

/* ---------- Helpers ---------- */
const icon = (n, cls = '') => `<span class="ms ${cls}" aria-hidden="true">${n}</span>`;
const rs = n => Number.isInteger(n) ? `₹${n}` : `₹${n.toFixed(2)}`;

/* ---------- Components ---------- */
function statusBar({ net = 'ok', battery = 82, printer = 'ok', queued = 0, pending = { count: 0 } } = {}) {
  const netEl = net === 'off'
    ? `<span class="it bad">${icon('signal_cellular_nodata')}${t('offline')}</span>`
    : `<span class="it">${icon('signal_cellular_alt')}</span>`;
  const batIcon = battery <= 10 ? 'battery_alert' : battery <= 20 ? 'battery_1_bar' : battery >= 80 ? 'battery_full' : 'battery_4_bar';
  const batCls = battery <= 10 ? 'bad' : battery <= 20 ? 'warn' : '';
  const prn = printer === 'out'
    ? `<span class="it bad">${icon('print_disabled')}${queued}</span>`
    : printer === 'busy' ? `<span class="it">${icon('print', 'fill')}</span>` : `<span class="it">${icon('print')}</span>`;
  return `<div class="abs sb" data-name="StatusBar">
    <span class="route" data-name="StatusBar/Route" title="Set at trip start">${icon('directions_bus', 'fill')}<b>548</b><small>${icon('arrow_upward')}${t('route')}</small></span>
    <span class="sys">${netEl}<span class="it ${batCls}">${icon(batIcon)}${battery}%</span>${prn}
      <button class="lang" data-name="StatusBar/Language" aria-label="Switch language"><b class="on">${LANG === 'en' ? 'EN' : 'हि'}</b></button></span>
  </div>`;
}

const TERMINAL = STOPS.length - 1;
const code = i => `<span class="code">${STOP_CODES[i]}</span>`;

function stopBanner({ gps = 'ok', stop = STOPS[CUR], next = STOPS[CUR + 1], exit = null } = {}) {
  const si = STOPS.indexOf(stop), ni = STOPS.indexOf(next);
  if (gps === 'unsure') {
    return `<button class="abs bn unsure" data-name="StopBanner/Unsure">
      <span class="lbl">${icon('help', 'fill')}${t('gpsUnsure')}</span>
      <span class="stop">${t('atQ', sn(ni))}</span>
      ${code(ni)}
      <span class="hint">${icon('arrow_downward')}${t('answerBelow')}</span>
      ${icon('edit_location_alt', 'edit')}
    </button>`;
  }
  // Journey line: boarding above, exit below, bus between. Same size; exit carries its fare colour.
  const ei = exit ? STOPS.indexOf(exit.to) : -1;
  const exitRow = ei < 0
    ? `<span class="mk exit empty">${icon('flag')}</span><span class="tl-row exit empty"><span class="cc">— —</span><span class="nm">—</span></span>`
    : `<span class="mk exit band-${bandOf(exit.from, exit.to)}">${icon('flag', 'fill')}</span><span class="tl-row exit band-${bandOf(exit.from, exit.to)}"><span class="cc">${STOP_CODES[ei]}</span><span class="nm">${sn(ei)}</span></span>`;
  return `<button class="abs bn tl ${gps === 'lost' ? 'lost' : ''}" data-name="StopBanner/${gps === 'lost' ? 'Lost' : 'Confident'}" aria-label="${t('boarding')}">
    <span class="rail"><span class="bus">${icon(gps === 'lost' ? 'location_disabled' : 'directions_bus', 'fill')}</span></span>
    <span class="mk board">${icon('location_on', 'fill')}</span>
    <span class="tl-row board"><span class="cc">${STOP_CODES[si]}</span><span class="nm">${sn(si)}</span></span>
    <span class="tl-div"></span>
    ${exitRow}
  </button>`;
}

// Pending UPI tile: fixed position under the journey box (D8). Red after 1:00 (D9), green when paid.
function pendingWidget({ count = 0, alert = false, paid = false } = {}) {
  const [cls, ic, name, label] = paid ? ['paid', 'check_circle', 'Paid', t('pwPaid')]
    : alert ? ['alert', 'error', 'Alert', t('pwOver')]
    : count ? ['', 'hourglass_top', 'Default', t('pwPending')] : ['empty', 'hourglass_empty', 'Empty', t('pwNone')];
  return `<button class="abs pw ${cls}" data-name="PendingWidget/${name}">
    ${icon(ic, 'fill')}<b>${paid ? '' : count}</b><span class="t">${label}</span>${icon('chevron_right', 'chev')}</button>`;
}

function lastStrip(s = { kind: 'last' }) {
  if (s.kind === 'hidden') return ''; // the open stop list takes this space
  if (s.kind === 'draft') {
    return `<div class="abs st draft" data-name="LastTicket/Draft">${icon('edit_note')}
      <div class="txt"><b>${t('newTicket')}</b><span>${s.desc}</span></div>
      <button class="cancel" data-name="Draft/Cancel">${icon('close')}${t('cancel')}</button></div>`;
  }
  if (s.kind === 'voided') {
    return `<div class="abs st voided" data-name="LastTicket/Voided">${icon('block')}
      <div class="txt"><b>${t('voided', s.no)}</b><span>${t('audit')}</span></div></div>`;
  }
  if (s.kind === 'printing') {
    return `<div class="abs st printing" data-name="LastTicket/Printing">${icon('print', 'fill')}
      <div class="txt"><b>${t('printing')} #00${s.no} · ${s.fare}${s.pay ? ` · ${s.pay}` : ''}</b><span>${s.route ?? s.desc}</span></div>
      <div class="prog"><i></i></div></div>`;
  }
  if (s.kind === 'none') {
    return `<div class="abs st empty" data-name="LastTicket/Empty">${icon('receipt_long')}<div class="txt"><b>${t('noTickets')}</b><span>${t('shiftStart')}</span></div></div>`;
  }
  return `<div class="abs st" data-name="LastTicket/Default">${icon('receipt_long')}
    <div class="txt"><b>#00${s.no || 42} · ${s.fare || '₹5'} · ${s.pay || t('cash')}</b><span>${s.route ?? s.desc ?? trip('Pragati Maidan', 'Ashram')}</span></div>
    <button class="undo">${icon('undo')}${t('undo')} <small>${s.secs ?? 12}s</small></button>
  </div>`;
}

function alertSlot(a) {
  if (!a) return '';
  return `<div class="abs al" data-name="AlertSlot"><div class="banner ${a.tone}">${icon(a.icon, 'fill')}<div><b>${a.title}</b>${a.text}</div></div></div>`;
}

function actionSlot(gps, next = STOPS[CUR + 1]) {
  if (gps === 'unsure') {
    return `<div class="abs ac two" data-name="ActionSlot/ConfirmStop">
      <button class="btn-yes" data-name="ActionSlot/Yes">${icon('check')}${t('yes4')}</button>
      <button class="btn-line" data-name="ActionSlot/Change">${icon('edit_location_alt')}${t('change')}</button></div>`;
  }
  if (gps !== 'lost') return '';
  return `<div class="abs ac" data-name="ActionSlot/NextStop"><button class="btn-tonal-lg">${icon('skip_next', 'fill')}${t('nextStop')} · ${sname(next)}</button></div>`;
}

function chips({ child = false, mult = 1, pay = 'cash', upiOff = false } = {}) {
  // data-name stays in English so prototype selectors work in both languages
  const c = (id, label, on) => `<button class="chip ${on ? 'on' : ''}" data-name="Chip/${id}">${label}</button>`;
  const seg = (key, id, ic) => {
    const off = key === 'upi' && upiOff;
    const on = pay === key && !off;
    return `<button class="seg k-${key} ${on ? 'on' : ''} ${off ? 'off' : ''}" data-name="Pay/${id}">${icon(on ? 'check' : ic)}${t(key)}</button>`;
  };
  const cardSeg = pay === 'pink'
    ? `<button class="seg on pink" data-name="Pay/PinkCard">${icon('check')}${t('pink')}</button>`
    : seg('card', 'Card', 'contactless');
  return `<div class="abs pay" data-name="PaymentRow">${seg('cash', 'Cash', 'payments')}${cardSeg}${seg('upi', 'UPI', 'qr_code_2')}</div>
  <div class="abs ch" data-name="PassengerRow">${c('Child', t('child'), child)}${c('×2', '×2', mult === 2)}${c('×3', '×3', mult === 3)}${c('×4+', '×4+', mult === 4)}</div>`;
}

function fares({ child = false, mult = 1, pay = 'cash' } = {}, disabled = false, sel = null, from = CUR) {
  const btns = SLABS.map((base, i) => {
    const total = base * mult * (child ? 0.5 : 1);
    const calc = child && mult > 1 ? `${t('child')} × ${mult}` : child ? t('childHalf') : mult > 1 ? `${rs(base)} × ${mult}` : '';
    const reach = bandStops(from, i).reduce((a, x) => (x.i > a.i ? x : a), { i: -1 });
    const sub = disabled ? t('waitPrint') : reach.i < 0 ? t('noStops') : t('to', sn(reach.i));
    const amt = rs(total);
    const state = disabled ? 'dis' : sel === null ? '' : sel === i ? 'sel' : 'dim';
    const tag = pay === 'upi' ? ['qr_code_2', t('upi')] : pay === 'card' ? ['contactless', t('card')] : pay === 'pink' ? ['contactless', t('free')] : null;
    return `<button class="fare band-${i} ${state}" data-name="FareButton/Slab${i + 1}">
      ${tag ? `<span class="tag">${icon(tag[0])}${tag[1]}</span>` : ''}
      <span class="amt ${amt.length > 4 ? 'sm' : ''}">${amt}</span>
      <span class="sub">${sub}</span>
      <span class="dest">${disabled || reach.i < 0 ? `<span class="w">${sub}</span>`
        : `<span class="arr">→</span><span class="w">${sn(reach.i).split(' ').join('<br>')}</span>`}</span>
      ${calc && !disabled ? `<span class="calc">${calc}</span>` : ''}
    </button>`;
  }).join('');
  return `<div class="abs fa fare-grid" data-name="FareButtons">${btns}</div>`;
}

/* Stops in one fare band, counted from the boarding stop. ₹15 lists the terminal first. */
function bandStops(from, band) {
  const out = [];
  for (let j = from + 1; j < STOPS.length; j++) {
    const d = KM[j] - KM[from];
    const b = d <= BAND_LIMITS_KM[0] ? 0 : d <= BAND_LIMITS_KM[1] ? 1 : 2;
    if (b === band) out.push({ i: j, name: STOPS[j], d });
  }
  const last = out.findIndex(x => x.i === STOPS.length - 1);
  if (band === 2 && last > 0) out.unshift(out.splice(last, 1)[0]);
  return out;
}

function stopRow({ from = CUR, band = 1, unsure = false, pink = false } = {}) {
  const list = bandStops(from, band);
  const btns = list.map(x => `<button class="sbtn ${x.i === TERMINAL ? 'term' : ''}" data-name="StopButton/${x.name}">
      <span class="nm">${x.i === TERMINAL ? icon('flag', 'fill') : ''}${sn(x.i)}</span>
      <span class="km">${STOP_CODES[x.i]} · ${x.d.toFixed(1)} km</span></button>`).join('');
  return `<div class="abs sr band-${band} ${unsure ? 'unsure' : ''}" data-name="StopRow/₹${SLABS[band]}">
    <div class="sr-head">
      <b>${pink ? t('free') : rs(SLABS[band])}</b>
      <span>${icon(unsure ? 'help' : 'location_on', 'fill')}${sn(from)}${unsure ? '?' : ''}${icon('arrow_forward')}</span>
    </div>
    <div class="sr-foot">
      <button data-name="StopRow/ChangeBoarding">${icon('edit_location_alt')}${t('changeStart')}</button>
      <button data-name="StopRow/Cancel">${icon('close')}${t('cancel')}</button>
    </div>
    <div class="sr-grid">${btns}</div>
  </div>`;
}

/* S1 composition: every element has a fixed position across all states */
function mainScreen(o = {}) {
  const m = o.mods || {};
  const at = o.at ?? CUR;
  const next = o.next ?? STOPS[at + 1];
  const mult = m.mult || 1;
  const drafting = o.row || m.child || mult > 1 || (m.pay && m.pay !== 'cash');
  const draftDesc = [t({ cash: 'cash', card: 'card', upi: 'upi', pink: 'pinkFree' }[m.pay || 'cash']),
    m.child && t('child'), mult > 1 && `× ${mult}`, o.row && m.pay !== 'pink' && rs(SLABS[o.row.band] * mult * (m.child ? 0.5 : 1))]
    .filter(Boolean).join(' · ');
  const last = o.row ? { kind: 'hidden' } : drafting ? { kind: 'draft', desc: draftDesc } : o.last;
  return `<div class="scr" lang="${LANG}">
    ${statusBar(o.status)}
    ${pendingWidget(o.pending || { count: 2 })}
    ${stopBanner({ gps: o.gps, stop: o.stop ?? STOPS[at], next, exit: drafting ? null : (o.exit ?? (o.last && o.last.to ? o.last : null)) })}
    ${alertSlot(o.alert)}
    ${lastStrip(last)}
    ${actionSlot(o.gps, next)}
    ${chips({ ...m, upiOff: o.upiOff })}
    ${o.row ? stopRow({ from: at, unsure: o.gps === 'unsure', pink: m.pay === 'pink', ...o.row }) : ''}
    ${fares(m, o.faresDisabled, o.row ? o.row.band : null, at)}
    ${o.overlay || ''}
  </div>`;
}

/* Fake QR (visual placeholder, not scannable) */
function qrSvg(seed = 7) {
  const N = 29; let s = seed;
  const rnd = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;
  const finder = (x, y) => (x >= 0 && x < 7 && y >= 0 && y < 7) &&
    (x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4));
  const inFinderZone = (x, y) => (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
  let r = '';
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    let on;
    if (x < 8 && y < 8) on = finder(x, y);
    else if (x > N - 9 && y < 8) on = finder(x - (N - 7), y);
    else if (x < 8 && y > N - 9) on = finder(x, y - (N - 7));
    else if (y === 6) on = x % 2 === 0;
    else if (x === 6) on = y % 2 === 0;
    else on = !inFinderZone(x, y) && rnd() > 0.52;
    if (on) r += `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`;
  }
  return `<svg viewBox="0 0 ${N} ${N}" role="img" aria-label="UPI QR code for ₹10"><g fill="var(--qr-ink)">${r}</g></svg>`;
}

function upiScreen({ amount = '₹10', no = 43, desc = 'Adult · 1', route = t('from', sn(CUR)), toast = '' } = {}) {
  return `<div class="scr" lang="${LANG}">
    ${statusBar()}
    <div class="abs upi-title" data-name="UPI/Title">${icon('qr_code_2')}${t('payUpi')}</div>
    <div class="abs qr-card" data-name="UPI/QR">${qrSvg(no)}</div>
    <div class="abs upi-amt" data-name="UPI/Amount"><div class="a">${amount}</div>
      <div class="m">#00${no} · ${desc === 'Adult · 1' ? '' : `${desc} · `}${route}</div>
      <div class="hint">${icon('screen_rotation_alt')}${t('turn')}</div></div>
    <button class="abs upi-cancel-b" data-name="UPI/Cancel">${icon('close')}${t('cancel')}</button>
    <button class="abs upi-go" data-name="UPI/ScannedNext">${icon('done_all')}${t('scanned')}</button>
    ${toast}
  </div>`;
}

function cardOverlay(kind, no = 43, over = {}) {
  const c = { ...t('cards')[kind], ...over };
  return `<div class="scrim"></div>
  <div class="cardok ${kind}" data-name="CardTap/${kind}" role="status">
    <div class="band">${icon('contactless')}<div><b>${c.label}</b><span>${c.sub}</span></div></div>
    <div class="body">
      <div class="big">${icon('check_circle', 'fill')}${c.big}</div>
      <div class="meta">${c.meta}</div>
      <div class="printing">${icon('print', 'fill')}${t('printing')} #00${no}</div>
      <div class="bar"><i></i></div>
      <div class="auto">${t('closesAuto')}</div>
    </div>
  </div>`;
}

function cardWait({ amount = '₹10', no = 43, dest = '' } = {}) {
  return `<div class="scrim"></div>
  <div class="cardwait" data-name="CardWait" role="status">
    <div class="cw-ic">${icon('contactless')}</div>
    <b>${t('tapCard')}</b>
    <div class="cw-amt">${amount}</div>
    <div class="cw-meta">${dest ? `${rt(STOPS[CUR], dest)} · ` : ''}${t('ticket')} #00${no}</div>
    <button class="btn-cancel">${icon('close')}${t('cancelBack')}</button>
  </div>`;
}

/* Frames-page only (not yet translated) */
const ERRS = {
  balance: { title: 'Not enough balance', card: 'blue', cardLabel: 'Blue card · ₹4 left', text: 'Fare is ₹10. Ask for cash or UPI.', acts: [['payments', 'Cash instead · ₹10'], [null, 'Dismiss']] },
  read:    { title: 'Card read failed', card: 'blue', cardLabel: 'Card not read', text: 'Ask the passenger to hold the card flat on the reader.', acts: [['contactless', 'Tap again'], [null, 'Dismiss']] },
  notarmed: { title: 'Pick the fare first', card: 'blue', cardLabel: 'Blue card · not charged', text: 'Blue and orange cards need a fare. Tap Card, then the fare, then ask for the card again.', acts: [[null, 'OK']] },
  invalid: { title: 'Card invalid or expired', card: 'pink', cardLabel: 'Pink card · expired 08/26', text: 'No ticket issued. Collect cash or UPI.', acts: [[null, 'Dismiss']] },
};
function cardError(kind) {
  const e = ERRS[kind];
  const acts = e.acts.map(([ic, l], i) => i === 0 && ic
    ? `<button class="btn-filled">${icon(ic)}${l}</button>`
    : `<button class="btn-outlined">${l}</button>`).join('');
  return `<div class="scrim"></div>
  <div class="carderr" data-name="CardError/${kind}" role="alert">
    <div class="hd">${icon('error', 'fill')}<b>${e.title}</b></div>
    <span class="chip-card" style="background:var(--card-${e.card})">${icon('contactless')}${e.cardLabel}</span>
    <p>${e.text}</p>
    <div class="acts">${acts}</div>
  </div>`;
}

const cardToast = `<div class="snack" data-name="Snackbar/CardTap" role="status">
  <span class="sw" style="background:var(--card-pink)">${icon('contactless')}</span>
  <div><b>Pink card · free ticket</b><span>Ticket #0044 printing · QR still open</span></div>
  ${icon('check_circle', 'fill ok')}
</div>`;

function pendingScreen() {
  return `<div class="scr">
    ${statusBar({ printer: 'busy' })}
    <div class="abs pl-head" data-name="Pending/Header">${icon('hourglass_top')}UPI pending<small>4 items</small></div>
    <div class="abs pl" data-name="Pending/List">
      <div class="li late" data-name="PendingItem/Over1min">${icon('error', 'fill')}<span class="t1">₹15 · #0040</span><span class="tm">1:12</span>
        <span class="t2">Over 1:00 · no payment yet</span>
        <div class="acts"><button class="p">Paid in cash</button><button class="c">Cancel</button></div></div>
      <div class="li pending" data-name="PendingItem/Pending">${icon('schedule')}<span class="t1">₹10 · #0043</span><span class="tm">0:24</span>
        <span class="t2">Waiting for payment</span></div>
      <div class="li paid" data-name="PendingItem/Paid">${icon('check_circle', 'fill')}<span class="t1">₹5 · #0041</span><span class="tm">Paid</span>
        <span class="t2">Ticket printing · clears in a moment</span></div>
      <div class="li refund" data-name="PendingItem/RefundFlagged">${icon('currency_exchange')}<span class="t1">₹10 · #0037</span><span class="tm">Refund</span>
        <span class="t2">Refund flagged, no new ticket</span></div>
    </div>
    <div class="abs pl-close" data-name="Pending/Close"><button>${icon('close')}Close</button></div>
  </div>`;
}

function stopSheet() {
  const rows = [CUR - 2, CUR - 1, CUR, CUR + 1, CUR + 2].map(i => `
    <div class="stoprow ${i === CUR ? 'cur' : ''}" data-name="StopRow${i === CUR ? '/Current' : ''}">
      <span class="n">${i === CUR ? 'GPS' : i < CUR ? 'Before' : 'After'}</span>${STOPS[i]}
      ${i === CUR ? icon('check_circle', 'fill') : ''}
    </div>`).join('');
  return `<div class="scrim"></div>
  <div class="sheet" data-name="BottomSheet/StopCorrection">
    <div class="handle"></div>
    <h3>Correct current stop</h3>
    <p class="hsub">Tap where the bus is. Fares don't change.</p>
    ${rows}
    <button class="full">${icon('list')}Full stop list (${STOPS.length})</button>
  </div>`;
}
