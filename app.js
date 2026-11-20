'use strict';
const el = id => document.getElementById(id);
const prefix = 'checkboxes-v1:' + new URL('.', location.href).pathname + ':';
const memory = new Map();
function storageIssue() {
  el('error').hidden = false;
  el('error').textContent = 'Almacenamiento local no disponible · Local storage unavailable';
}
function read(key) {
  try { return memory.get(key) ?? localStorage.getItem(prefix + key); }
  catch { storageIssue(); return memory.get(key) ?? null; }
}
function write(key, value) {
  try { localStorage.setItem(prefix + key, value); memory.delete(key); }
  catch { memory.set(key, value); storageIssue(); }
}
let language = read('lang') === 'en' ? 'en' : 'es';
const t = (es, en) => language === 'es' ? es : en;
const column = () => language === 'es' ? 0 : 1;
const all = catalog.flatMap(group => group.items);
function projectIds() {
  const keys = new Set(memory.keys());
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(prefix)) keys.add(key.slice(prefix.length));
    }
  } catch { storageIssue(); }
  return Array.from(keys).filter(k => k.startsWith('project/')).map(k => k.slice(8));
}
let active = read('active') || 'first';
if (!projectIds().includes(active)) write('project/' + active, '');
const projectName = id => read('project/' + id) || t('Mi proyecto', 'My project');
const keyFor = id => 'result/' + active + '/' + id;
const state = id => read(keyFor(id)) || 'pending';
const statusLabel = value => ({
  yes: t('Encontrada','Found'), no: t('Revisada sin hallazgo','Reviewed without finding'),
  pending: t('Pendiente','Pending')
})[value];
function node(tag, text, className) {
  const n = document.createElement(tag);
  if (text !== undefined) n.textContent = text;
  if (className) n.className = className;
  return n;
}
function button(text, className, click) {
  const b = node('button', text, className);
  b.type = 'button';
  b.onclick = click;
  return b;
}
const closedGroups = new Set();
const openNotes = new Set();
// Build inline formatting with text nodes so HTML examples stay literal.
function appendFormatted(parent, text) {
  const inline = /(`[^`\n]+`|\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g;
  for (const part of text.split(inline)) {
    if (!part) continue;
    if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) {
      parent.append(node('code', part.slice(1, -1)));
    } else if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
      parent.append(node('strong', part.slice(2, -2)));
    } else if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
      parent.append(node('em', part.slice(1, -1)));
    } else {
      parent.append(part);
    }
  }
}
function makeCard(item) {
  const [id] = item;
  const [name, indicator, review] = item[column() + 1];
  const card = node('div', undefined, 'card');
  const row = node('div', undefined, 'row');
  const title = button(name, 'title', () => change(state(id) === 'pending' ? 'no' : 'pending'));
  row.append(title);
  const controls = ['yes','no'].map(value => {
    const mark = button('', 'mark ' + value, () => change(state(id) === value ? 'pending' : value));
    mark.setAttribute('role', 'checkbox');
    mark.setAttribute('aria-label', name + ' · ' + statusLabel(value));
    mark.title = statusLabel(value);
    row.append(mark);
    return mark;
  });
  function sync() {
    const value = state(id);
    title.classList.toggle('done', value !== 'pending');
    title.setAttribute('aria-label', name + ' · ' + statusLabel(value));
    controls.forEach((mark, index) => {
      const selected = value === ['yes','no'][index];
      mark.setAttribute('aria-checked', String(selected));
      mark.textContent = selected ? ['✓','✗'][index] : '□';
    });
  }
  function change(value) {
    write(keyFor(id), value);
    sync();
    updateCounts();
  }
  sync();
  const links = node('div', undefined, 'links');
  card.append(row, links);
  [indicator, review].forEach((body, idx) => {
    const noteId = id + '-help-' + idx;
    const note = node(idx && body.length ? 'ol' : 'p', undefined, 'note');
    if (!idx) appendFormatted(note, body);
    if (idx && !body.length) {
      note.textContent = t('Sin pasos incluidos en esta edición.', 'No steps included in this edition.');
    }
    if (idx) {
      for (const step of body) {
        const hasLink = typeof step === 'object';
        const line = node('li');
        appendFormatted(line, hasLink ? step.text : step);
        if (hasLink) {
          const link = node('a', step.label);
          link.href = step.url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          line.append(' ', link);
        }
        note.append(line);
      }
    }
    note.id = noteId;
    note.hidden = !openNotes.has(noteId);
    const label = idx ? t('¿Cómo?', 'How?') : t('¿Vulnerable?', 'Vulnerable?');
    const toggle = button(label, '', () => {
      note.hidden = !note.hidden;
      if (note.hidden) openNotes.delete(noteId); else openNotes.add(noteId);
      toggle.setAttribute('aria-expanded', String(!note.hidden));
    });
    toggle.setAttribute('aria-controls',noteId);
    toggle.setAttribute('aria-expanded',String(!note.hidden));
    links.append(toggle);
    card.append(note);
  });
  return card;
}
function updateCounts() {
  const found = all.filter(([id]) => state(id) === 'yes').length;
  const reviewed = all.filter(([id]) => state(id) !== 'pending').length;
  el('counts').textContent = t(reviewed + ' de ' + all.length + ' revisadas · ' + found + ' con hallazgo',
    reviewed + ' of ' + all.length + ' reviewed · ' + found + ' with findings');
  el('progress').max = all.length;
  el('progress').value = reviewed;
  el('progress').setAttribute('aria-label', el('counts').textContent);
  for (const g of catalog) {
    el('count-' + g.id).textContent = g.items.filter(([id]) => state(id) !== 'pending').length + '/' + g.items.length;
  }
}
function render() {
  document.documentElement.lang = language;
  const dark = (read('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
  document.documentElement.classList.toggle('dark', dark);
  el('theme').textContent = dark ? '☀' : '☾';
  el('theme').title = dark ? t('Tema de día','Light theme') : t('Tema de noche','Dark theme');
  el('theme').setAttribute('aria-label',el('theme').title);
  el('settings').title = t('Gestionar proyectos','Manage projects');
  el('settings').setAttribute('aria-label',el('settings').title);
  el('lang').value = language;
  el('projectLabel').textContent = t('PROYECTO ACTIVO','ACTIVE PROJECT');
  el('projectName').textContent = projectName(active);
  el('listTitle').textContent = t('Checklist de vulnerabilidades','Vulnerability checklist');
  el('legend').textContent = t('✓ Encontrada　 ✗ Revisada sin hallazgo', '✓ Found　 ✗ Reviewed without finding');
  el('groups').replaceChildren();
  for (const g of catalog) {
    const group = node('details', undefined, 'group');
    group.open = !closedGroups.has(g.id);
    group.ontoggle = () => { if (group.open) closedGroups.delete(g.id); else closedGroups.add(g.id); };
    const summary = node('summary',g.title[column()]);
    const count = node('small');
    count.id = 'count-' + g.id;
    summary.append(count);
    group.append(summary,...g.items.map(makeCard));
    el('groups').append(group);
  }
  updateCounts();
  el('footnote').textContent = t('Creada para la investigación y la formación en seguridad.', 'Built for security research and education.');
  el('pdf').textContent = t('Guardar informe en PDF','Save PDF report');
}
el('theme').onclick = () => {
  write('theme', document.documentElement.classList.contains('dark') ? 'light' : 'dark');
  render();
};
el('lang').onchange = e => { language = e.target.value; write('lang', language); render(); };
function changeSelection() {
  const id = el('projects').value;
  el('name').value = id ? projectName(id) : '';
}
el('settings').onclick = () => {
  el('dialogTitle').textContent = t('Gestionar proyectos','Manage projects');
  el('switchLabel').textContent = t('Abrir o crear proyecto','Open or create project');
  el('nameLabel').textContent = t('Nombre del proyecto','Project name');
  el('cancel').textContent = t('Cancelar','Cancel');
  el('save').textContent = t('Guardar','Save');
  const ids = projectIds().sort((a,b) => projectName(a).localeCompare(projectName(b),language));
  el('projects').replaceChildren(...ids.map(id => new Option(projectName(id),id)),
    new Option(t('+ Nuevo proyecto','+ New project'),''));
  el('projects').value = active;
  changeSelection();
  el('dialog').showModal();
};
el('projects').onchange = changeSelection;
el('cancel').onclick = () => el('dialog').close();
el('form').onsubmit = event => {
  event.preventDefault();
  const name = el('name').value.trim();
  if (!name) { el('name').value = ''; el('name').reportValidity(); return; }
  const next = el('projects').value || crypto.randomUUID();
  write('project/' + next, name);
  if (active !== next) openNotes.clear();
  active = next;
  write('active',active);
  el('dialog').close();
  render();
};
function buildReport() {
  const report = el('report');
  report.replaceChildren(node('p','CheckThisBug - Hunter'),node('h1',projectName(active)),
    node('p', new Intl.DateTimeFormat(language,{dateStyle:'long'}).format(new Date())),
    node('p', el('counts').textContent));
  for (const g of catalog) {
    report.append(node('h2',g.title[column()]));
    for (const item of g.items) {
      const line = node('div',undefined,'result');
      line.append(node('span',item[column()+1][0]),node('b',statusLabel(state(item[0]))));
      report.append(line);
    }
  }
}
el('pdf').onclick = () => { buildReport(); document.title = projectName(active) + ' - CheckThisBug - Hunter'; window.print(); };
window.addEventListener('beforeprint',buildReport);
window.addEventListener('afterprint',() => { document.title = 'CheckThisBug - Hunter'; });
window.addEventListener('storage',e => { if (e.key?.startsWith(prefix)) render(); });
render();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {
  el('error').hidden = false;
  el('error').textContent = t('No se pudo preparar el modo sin conexión.','Offline mode could not be prepared.');
});
