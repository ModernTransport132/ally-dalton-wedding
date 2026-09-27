const fs = require('fs');
const path = require('path');
function check(root, config) {
  root = path.resolve(root);
  const errors = [], files = [];
  function walk(dir) { for (const entry of fs.readdirSync(dir, {withFileTypes:true})) { const p=path.join(dir,entry.name); if(entry.isDirectory())walk(p);else files.push(p); } }
  walk(root);
  for(const file of files.filter(p=>p.endsWith('.js'))){try{new (require('vm').Script)(fs.readFileSync(file,'utf8'),{filename:file})}catch(error){errors.push(error.message)}}
  const origin = 'https://build.test';
  // Simulate repository-prefix hosting as well as custom-domain hosting.
  let checked = 0;
  for (const prefix of ['', '/wedding']) {
    for (const file of files.filter(p=>/\.(html|css)$/.test(p))) {
      const html=fs.readFileSync(file,'utf8'), rel=path.relative(root,file).replaceAll('\\','/');
      const documentUrl=new URL(prefix+'/'+rel,origin);
      const baseTag=html.match(/<base\b[^>]*href="([^"]+)"/i);
      const base=baseTag?new URL(baseTag[1],documentUrl):documentUrl;
      const refs=file.endsWith('.html')?[...html.replace(/<base\b[^>]*>/gi,'').matchAll(/\b(?:href|src|data-src|data-full|data-image)="([^"]+)"/g)].map(m=>m[1]):[];
      if(file.endsWith('.css')){const css=html.replace(/url\(\s*(["'])data:[\s\S]*?\1\s*\)/g,'');refs.push(...[...css.matchAll(/url\(\s*['"]?([^\s)'";]+)['"]?\s*\)/g)].map(m=>m[1]));}
      for(const value of refs){
        if(/^(?:https?:|data:|mailto:|tel:|javascript:)/i.test(value))continue;
        // The standalone 404 uses the configured deployment path at arbitrary depths.
        if(rel==='404.html'&&value===new URL('home/',config.publicUrl).pathname)continue;
        let url;try{url=new URL(value.replaceAll('&amp;','&'),base)}catch{errors.push(rel+': invalid URL '+value);continue;}
        if(url.origin!==origin)continue;
        if(prefix&&!url.pathname.startsWith(prefix+'/')){errors.push(rel+': escapes repository prefix: '+value);continue;}
        let target=path.resolve(root,'.'+decodeURIComponent(url.pathname.slice(prefix.length)));
        if(target!==root&&!target.startsWith(root+path.sep)){errors.push(rel+': escapes output: '+value);continue;}
        if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
        checked++;
        if(!fs.existsSync(target)){errors.push(rel+': missing '+value);continue;}
        if(url.hash&&target.endsWith('.html')){const contents=fs.readFileSync(target,'utf8');const id=decodeURIComponent(url.hash.slice(1));if(!contents.includes('id="'+id+'"')&&!['friday','saturday'].includes(id))errors.push(rel+': missing anchor '+value);}
      }
      if(file.endsWith('.html')&&!['404.html'].includes(rel)){
        for(const marker of ['name="description"','rel="canonical"','property="og:image"','name="twitter:card"'])if(!html.includes(marker))errors.push(rel+': missing '+marker);
        if(!html.includes(new URL('assets/wedding-share.jpg',config.publicUrl).href))errors.push(rel+': incorrect sharing image URL');
        if(rel.includes('/')&&(html.match(/<h1\b/g)||[]).length!==1)errors.push(rel+': expected one main heading');
        if(/<img\b(?![^>]*\balt=)[^>]*>/i.test(html))errors.push(rel+': image missing alt attribute');
        if(rel==='home/index.html'&&/<a\b[^>]*target="_blank"/i.test(html))errors.push('Homepage opens a new tab');
      }
    }
  }
  const schedule=fs.readFileSync(path.join(root,'schedule/index.html'),'utf8');
  for(const title of ['Ceremony Rehearsal','Rehearsal Dinner','Wedding Ceremony','Cocktail Hour','Reception'])if(!schedule.includes('<h2>'+title+'</h2>'))errors.push('Schedule fallback missing '+title);
  if(errors.length)throw new Error([...new Set(errors)].join('\n'));
  return {files:files.length,references:checked};
}
module.exports={check};
if(require.main===module){const config=require('../site.config.json');console.log(check(process.argv[2]||path.resolve(__dirname,'../../docs'),config));}
