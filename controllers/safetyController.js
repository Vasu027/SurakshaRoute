const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, {recursive:true});

const eventsFile = path.join(dataDir, 'events.json');
const trustedFile = path.join(dataDir, 'trusted.json');

function readJSON(file){
  try { return JSON.parse(fs.readFileSync(file)); } catch(e){ return []; }
}
function writeJSON(file, data){ fs.writeFileSync(file, JSON.stringify(data, null, 2)); }

exports.createSOS = (req, res) => {
  const body = req.body || {};
  const ev = {type:'sos', ts: new Date().toISOString(), body};
  const arr = readJSON(eventsFile);
  arr.push(ev);
  writeJSON(eventsFile, arr);
  // Note: real SMS/push integration needed for production.
  res.json({ok:true, saved: ev});
};

exports.getEvents = (req, res) => {
  res.json(readJSON(eventsFile));
};

exports.addTrusted = (req, res) => {
  const contact = req.body;
  if(!contact || !contact.name) return res.status(400).json({ok:false, error:'invalid'});
  const arr = readJSON(trustedFile);
  arr.push(Object.assign({id: Date.now()}, contact));
  writeJSON(trustedFile, arr);
  res.json({ok:true, trusted: arr});
};

exports.getTrusted = (req, res) => {
  res.json(readJSON(trustedFile));
};

exports.verifyDriver = (req, res) => {
  const {plate} = req.body || {};
  if(!plate) return res.status(400).json({ok:false, error:'no plate'});
  // Demo verification: simple pattern check and random risk score
  const verified = typeof plate === 'string' && plate.trim().length >= 4;
  const riskScore = Math.floor(Math.random()*100);
  res.json({ok:true, plate, verified, riskScore, note: 'Demo verification — replace with OCR + DB'});
};

exports.checkin = (req, res) => {
  const body = req.body || {};
  const ev = {type:'companion_checkin', ts: new Date().toISOString(), body};
  const arr = readJSON(eventsFile);
  arr.push(ev);
  writeJSON(eventsFile, arr);
  res.json({ok:true});
};