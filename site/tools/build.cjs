const fs=require('fs'),path=require('path'),os=require('os');
const {metadata}=require('./metadata.cjs');
const {check}=require('./check.cjs');
function inventory(root){
  const files=[];
  function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())walk(file);else files.push(path.relative(root,file).replaceAll('\\','/'));}}
  walk(root);return files.sort();
}
function removeObsolete(root,manifest,current){
  if(!fs.existsSync(manifest))return;
  for(const rel of JSON.parse(fs.readFileSync(manifest,'utf8'))){
    if(current.includes(rel))continue;
    const file=path.resolve(root,rel);
    if(!file.startsWith(path.resolve(root)+path.sep))throw new Error('Invalid managed file path');
    if(fs.existsSync(file)&&fs.statSync(file).isFile())fs.unlinkSync(file);
  }
}
function build({source=path.resolve(__dirname,'..'),output}={}){
  source=path.resolve(source);
  const parent=path.dirname(source);
  const defaultOutput=path.basename(source)==='site'&&fs.existsSync(path.join(parent,'package.json'))?parent:path.join(parent,'github-pages-ready');
  output=path.resolve(output||defaultOutput);
  if(output===source||output.startsWith(source+path.sep))throw new Error('Output must be outside the editable site.');
  const config=JSON.parse(fs.readFileSync(path.join(source,'site.config.json'),'utf8'));
  config.publicUrl=config.publicUrl.replace(/\/?$/,'/');
  if(new URL(config.publicUrl).protocol!=='https:')throw new Error('Public URL must use HTTPS.');
  const pages=fs.readdirSync(source).filter(n=>n.endsWith('.html')&&n!=='404.html').sort();
  const routes=new Set(pages.map(n=>n==='index.html'?'home':n.slice(0,-5)));
  const tempRoot=path.resolve(os.tmpdir());
  const stage=fs.mkdtempSync(path.join(tempRoot,'vaughan-build-'));
  try{
    for(const name of fs.readdirSync(source).filter(n=>/\.(css|js)$/.test(n)))fs.copyFileSync(path.join(source,name),path.join(stage,name));
    for(const folder of ['assets','calendar'])fs.cpSync(path.join(source,folder),path.join(stage,folder),{recursive:true,filter:p=>{
      const rel=path.relative(source,p).replaceAll('\\','/');
      return !/^assets\/gallery\/[^/]+\.jpe?g$/i.test(rel)&&!['assets/faq-hands-at-sunset.jpeg','assets/battle-house-illustration.png'].includes(rel);
    }});
    function redirect(html,destination){
      const head=html.match(/<head>([\s\S]*?)<\/head>/i)[1].replace(/<base[^>]*>/g,'').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<link[^>]*rel="stylesheet"[^>]*>/g,'');
      return `<!doctype html><html lang="en"><head>${head}<script>location.replace(${JSON.stringify(destination)}+location.search+location.hash)</script><noscript><meta http-equiv="refresh" content="0;url=${destination}"></noscript></head><body><a href="${destination}">Continue to the wedding website</a></body></html>\n`;
    }
    for(const name of pages){
      const route=name==='index.html'?'home':name.slice(0,-5);
      const original=fs.readFileSync(path.join(source,name),'utf8');
      const raw=metadata(original,route,config);
      // Refresh local preview metadata from the same configuration as the build.
      if(raw!==original)fs.writeFileSync(path.join(source,name),raw);
      let html=raw.replace('<head>','<head><base href="../">');
      html=html.replace(/href="([^"]+)"/g,(match,href)=>{
        if(href.startsWith('#'))return `href="${route}/${href}"`;
        const local=href.match(/^\/?([a-z0-9-]+)(?:\.html)?\/?([?#].*)?$/i);
        if(local){const target=local[1]==='index'?'home':local[1];if(routes.has(target))return `href="${target}/${local[2]||''}"`;}
        return match;
      });
      fs.mkdirSync(path.join(stage,route),{recursive:true});fs.writeFileSync(path.join(stage,route,'index.html'),html);
      fs.writeFileSync(path.join(stage,name),redirect(raw,route+'/'));
    }
    let notFound=fs.readFileSync(path.join(source,'404.html'),'utf8').replace('href="/home/"',`href="${new URL('home/',config.publicUrl).pathname}"`);
    fs.writeFileSync(path.join(stage,'404.html'),notFound);fs.writeFileSync(path.join(stage,'.nojekyll'),'');
    const result=check(stage,config);
    // Validate a complete build before replacing any published files.
    const docs=path.join(output,'docs'),docsManifest=path.join(output,'.build-files.json'),builtFiles=inventory(stage);
    fs.mkdirSync(docs,{recursive:true});
    removeObsolete(docs,docsManifest,builtFiles);
    fs.cpSync(stage,docs,{recursive:true});
    fs.writeFileSync(docsManifest,JSON.stringify(builtFiles,null,2)+'\n');
    const repoSource=path.join(output,'site');
    const includeSource=p=>{
      const rel=path.relative(source,p).replaceAll('\\','/');
      return !/^assets\/gallery\/[^/]+\.jpe?g$/i.test(rel)&&!['assets/faq-hands-at-sunset.jpeg','assets/battle-house-illustration.png'].includes(rel);
    };
    const sourceFiles=inventory(source).filter(rel=>includeSource(path.join(source,rel))),sourceManifest=path.join(output,'.source-files.json');
    if(repoSource!==source){removeObsolete(repoSource,sourceManifest,sourceFiles);fs.cpSync(source,repoSource,{recursive:true,filter:includeSource});}
    fs.writeFileSync(sourceManifest,JSON.stringify(sourceFiles,null,2)+'\n');
    fs.writeFileSync(path.join(output,'package.json'),JSON.stringify({name:'vaughan-wedding',private:true,scripts:{build:'node site/tools/build.cjs --output .',check:'node site/tools/check.cjs docs'}},null,2)+'\n');
    fs.writeFileSync(path.join(output,'README.md'),`# Alexandra & Dalton — wedding website\n\nEdit the site folder; docs is generated. No dependencies need installing.\n\n## Build and check\n\nRun npm run build from this folder with Node.js installed. It rebuilds docs and checks local links, assets, anchors, metadata, headings, the schedule fallback, and homepage link targets at both root and repository-prefix URLs. Run npm run check to check the existing docs folder. The public address lives in site/site.config.json.\n\nIn the original design workspace, edit outputs/the-vaughan-wedding and run its Build-GitHub.ps1 (or node work/package-github-pages.cjs). That refreshes this entire folder, including its editable source snapshot. Never hand-edit both copies.\n\n## Publish\n\nCopy this folder into your GitHub repository and commit it. In Settings → Pages, deploy from your branch's /docs folder. Source lives outside docs and is not part of the served site. Keep any existing domain/DNS settings. This build does not publish or change them.\n\nRoutes use /home/, /schedule/, /venues/, /lodging/, /travel/, /wedding-party/, /gallery/, /registry/, /faqs/, and /rsvp/. Root and older .html links redirect and contain sharing metadata. A custom 404 page returns visitors home. After publishing, test the public link preview and calendar imports on a real phone.\n\nOriginal full-resolution photos remain in the local design folder; the repository uses optimized assets. RSVP and Registry remain unfinished; wedding-party photos and biographies are pending.\n`);
    fs.mkdirSync(path.join(output,'.github/workflows'),{recursive:true});
    fs.writeFileSync(path.join(output,'.github/workflows/check.yml'),`name: Check website\non: [push, pull_request]\npermissions:\n  contents: read\njobs:\n  check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: '22'\n      - run: npm run build\n      - run: git diff --exit-code -- docs\n`);
    console.log(`Built ${pages.length} pages; checked ${result.references} local references. Output: ${output}`);
  } finally {
    const resolved=path.resolve(stage);
    if(path.dirname(resolved)!==tempRoot||!path.basename(resolved).startsWith('vaughan-build-'))throw new Error('Unexpected staging path');
    fs.rmSync(resolved,{recursive:true,force:true});
  }
}
module.exports={build};
if(require.main===module){const arg=process.argv.indexOf('--output');build({output:arg>=0?process.argv[arg+1]:undefined});}
