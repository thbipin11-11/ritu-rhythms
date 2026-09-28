const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const ADMIN_USER = 'ritu@123';
const ADMIN_PASSWORD = 'Rhythms@1234';
const ROOT = path.join(__dirname, 'site');
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'riturythms-data.json');
const sessions = new Map();

function defaultData(){return {questions:[],schoolRequests:[],impact:{schools:0,students:0,sessions:0,volunteers:0}};}
function loadData(){try{fs.mkdirSync(DATA_DIR,{recursive:true}); if(!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE,JSON.stringify(defaultData(),null,2)); return JSON.parse(fs.readFileSync(DATA_FILE,'utf8'));}catch(e){return defaultData();}}
let data=loadData();
function saveData(){fs.mkdirSync(DATA_DIR,{recursive:true});fs.writeFileSync(DATA_FILE,JSON.stringify(data,null,2));}
function send(res,status,obj){const body=JSON.stringify(obj);res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(body);}
function token(){return crypto.randomBytes(32).toString('hex');}
function authorized(req){const h=req.headers.authorization||'';const t=h.startsWith('Bearer ')?h.slice(7):'';return sessions.has(t);}
function readBody(req){return new Promise((resolve,reject)=>{let raw='';req.on('data',c=>{raw+=c;if(raw.length>1e6)req.destroy();});req.on('end',()=>{try{resolve(raw?JSON.parse(raw):{});}catch(e){reject(e);}});req.on('error',reject);});}
function safePath(urlPath){const decoded=decodeURIComponent(urlPath.split('?')[0]);const target=decoded==='/'?'index.html':decoded.replace(/^\/+/, '');const full=path.resolve(ROOT,target);return full.startsWith(path.resolve(ROOT))?full:null;}
function serveStatic(req,res){let file=safePath(req.url);if(!file)return send(res,403,{error:'Forbidden'});fs.stat(file,(err,st)=>{if(err||!st.isFile())return send(res,404,{error:'Not found'});const ext=path.extname(file).toLowerCase();const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.txt':'text/plain; charset=utf-8'};res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream'});fs.createReadStream(file).pipe(res);});}
const server=http.createServer(async(req,res)=>{
  try{
    const u=new URL(req.url,`http://${req.headers.host||'localhost'}`);
    if(req.method==='GET'&&u.pathname==='/api/impact') return send(res,200,{ok:true,impact:data.impact});
    if(req.method==='POST'&&u.pathname==='/api/submit'){
      const b=await readBody(req); if(!['question','school'].includes(b.type)||!b.payload)return send(res,400,{error:'Invalid submission'});
      const row={...b.payload,submittedAt:new Date().toISOString()}; if(b.type==='question')data.questions.push(row);else data.schoolRequests.push(row);saveData();return send(res,200,{ok:true});
    }
    if(req.method==='POST'&&u.pathname==='/api/admin/login'){
      const b=await readBody(req); if(b.user!==ADMIN_USER||b.password!==ADMIN_PASSWORD)return send(res,401,{error:'Invalid credentials'});const t=token();sessions.set(t,Date.now());return send(res,200,{ok:true,token:t});
    }
    if(req.method==='GET'&&u.pathname==='/api/admin/data'){
      if(!authorized(req))return send(res,401,{error:'Unauthorized'});return send(res,200,{ok:true,questions:data.questions,schoolRequests:data.schoolRequests,impact:data.impact});
    }
    if(req.method==='POST'&&u.pathname==='/api/admin/impact'){
      if(!authorized(req))return send(res,401,{error:'Unauthorized'});const b=await readBody(req);data.impact={schools:Number(b.impact?.schools||0),students:Number(b.impact?.students||0),sessions:Number(b.impact?.sessions||0),volunteers:Number(b.impact?.volunteers||0)};saveData();return send(res,200,{ok:true,impact:data.impact});
    }
    if(req.method==='GET'&&u.pathname==='/admin') {res.writeHead(302,{Location:'/admin.html'});return res.end();}
    return serveStatic(req,res);
  }catch(e){console.error(e);send(res,500,{error:'Server error'});}
});
server.listen(PORT,HOST,()=>console.log(`Ritu Rhythms running at http://localhost:${PORT}`));
