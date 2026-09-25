'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); } });
const stages = [
  ['A CLEAR START', 'Every first contact,\nwith somewhere to go.', 'Bring an enquiry or GP referral into the patient record. After the appropriate review, book an appointment with the right clinician.', ['Enquiry or referral', 'Patient record', 'Appointment booked'], 'Referral acceptance remains a clinician’s decision.'],
  ['CONTEXT, NOT COPYING', 'The visit,\nin the patient’s story.', 'Record the consultation, relevant history and the clinician’s plan. Keep files associated with the right patient and visit.', ['Patient & appointment', 'Clinician-entered consultation', 'Plan recorded'], 'Tests can happen before or after a consultation. They are not a compulsory step.'],
  ['REVIEW BEFORE RELEASE', 'From information\nto a considered next step.', 'Link a test-result file to its request. The responsible clinician reviews the recorded result and records an action. Letters follow a separate template, approval and delivery workflow.', ['File & recorded result', 'Clinician review & action', 'Letter prepared for approval'], 'Uploading a result is not clinical acknowledgement. Laboratory connections are not live.'],
  ['FOLLOW THROUGH', 'Keep the next action\nin sight.', 'Schedule the follow-up, assign responsibility and see what is due. Staff can contact the patient, book the next appointment and record the outcome.', ['Follow-up scheduled', 'Owner & due date', 'Contact and book'], 'Contacted is not the same as booked—and booked does not mean clinically complete.'],
];
const tabs = [...document.querySelectorAll('[data-stage]')];
function selectStage(index) {
  tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
  const [label, title, copy, path, note] = stages[index];
  document.querySelector('#journey-label').textContent = label;
  const heading = document.querySelector('#journey-title'); heading.replaceChildren();
  title.split('\n').forEach((line, i) => { if (i) heading.append(document.createElement('br')); heading.append(document.createTextNode(line)); });
  document.querySelector('#journey-copy').textContent = copy;
  document.querySelector('#journey-note').textContent = note;
  document.querySelector('#journey-panel').setAttribute('aria-labelledby', tabs[index].id);
  const pathElement = document.querySelector('#journey-path'); pathElement.replaceChildren();
  path.forEach((step, i) => { if (i) { const arrow = document.createElement('b'); arrow.textContent = '↓'; arrow.setAttribute('aria-hidden', 'true'); pathElement.append(arrow); } const item = document.createElement('span'); item.textContent = step; if (i === path.length - 1) { item.className = 'path-final'; const tick = document.createElement('i'); tick.textContent = '✓'; tick.setAttribute('aria-hidden', 'true'); item.append(tick); } pathElement.append(item); });
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectStage(i));
  tab.addEventListener('keydown', event => { let next; if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (i + 1) % tabs.length; if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length; if (event.key === 'Home') next = 0; if (event.key === 'End') next = tabs.length - 1; if (next !== undefined) { event.preventDefault(); selectStage(next); tabs[next].focus(); } });
});
function wireDialog(trigger, id) {
  const dialog = document.querySelector(id); let previousFocus;
  document.querySelector(trigger).addEventListener('click', () => { previousFocus = document.activeElement; dialog.showModal(); });
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => previousFocus?.focus());
}
wireDialog('[data-open-preview]', '#preview-dialog');
wireDialog('[data-open-privacy]', '#privacy-dialog');
document.querySelector('#year').textContent = new Date().getFullYear();
