import test from 'node:test';
import assert from 'node:assert/strict';
import {chanceView,rotatePoint,strikeFrame} from '../src/lib/kickabout-camera.ts';
import {createMatch,beginChance,tickMatch,continueMatch,prepareStrike,strike,strikePosition,setAim,finishAction} from '../src/lib/kickabout-engine.ts';
const advance=(m,seconds)=>{for(let i=0;i<seconds*100;i++)tickMatch(m,.01)};
test('full match reaches half time and full time with every chance type',()=>{
 const m=createMatch(7), kinds=new Set(); m.speed=4; let halftime=false;
 for(let i=0;i<30000 && m.phase!=='fulltime';i++){
  if(m.phase==='halftime'){halftime=true;continueMatch(m)}
  if(['aim','dribble'].includes(m.phase)){kinds.add(m.kind);finishAction(m,'Test chance completed')}
  tickMatch(m,.05);
 }
 assert.equal(m.phase,'fulltime');assert.equal(m.minute,90);assert.ok(halftime);
 assert.deepEqual([...kinds].sort(),['corner','dribble','free-kick','header','pass','shot']);
 assert.ok(m.rating>=3 && m.rating<=10);
});
test('pause freezes action timers and speed only accelerates simulation',()=>{
 const m=createMatch(1);m.paused=true;advance(m,3);assert.equal(m.minute,0);
 m.paused=false;m.speed=4;advance(m,.5);assert.ok(m.minute>3);
 beginChance(m,'shot','still');advance(m,1);assert.ok(Math.abs(m.phaseTime-1)<.01);
});
test('aim is capped; chip predicts landing and contact produces curl',()=>{
 const m=createMatch(1);beginChance(m,'shot','still');setAim(m,{x:m.ball.x-1000,y:m.ball.y+1000});
 assert.ok(Math.hypot(m.aim.x,m.aim.y)<=100.00001);prepareStrike(m);strike(m,{x:.4,y:.7});
 assert.equal(m.phase,'flight');assert.ok(m.landing);assert.ok(m.ball.vz>0);assert.ok(m.curve<0);assert.ok(m.ball.vy<0);
});
test('moving and dropping strike balls vary with time and missed headers expire',()=>{
 const m=createMatch(2);beginChance(m,'header','drop');prepareStrike(m);const a=strikePosition(m);advance(m,1);assert.ok(strikePosition(m).y>a.y);
 advance(m,2.4);assert.equal(m.phase,'result');assert.match(m.message,/cross sails/);
 beginChance(m,'shot','left');prepareStrike(m);advance(m,.4);assert.notEqual(strikePosition(m).x,150);
});
test('pressure can tackle during aim and dribbling crosses finish line',()=>{
 const m=createMatch(4);beginChance(m,'pass');m.players=[{id:6,team:'away',x:m.ball.x+14,y:m.ball.y,run:0}];advance(m,1.9);assert.equal(m.phase,'result');assert.match(m.message,/Tackled/);
 beginChance(m,'dribble');m.players=[];m.carrying=true;m.dribbleTarget={x:(m.gate.left+m.gate.right)/2,y:m.gate.y-15};advance(m,4);assert.equal(m.dribbles,1);assert.equal(m.pending,'shot');const index=m.nextChance;continueMatch(m);assert.equal(m.kind,'shot');assert.equal(m.nextChance,index);
});
test('midfield pass retains possession; corner receiver takes a shot',()=>{
 for(const kind of ['pass','corner']){
  const m=createMatch(8);beginChance(m,kind,'still');m.layout='short-corner';const index=m.nextChance;
  const direction=kind==='corner'?1:-1;
  m.players=[{id:2,team:'home',x:m.ball.x,y:m.ball.y+direction*40,run:0}];m.aim={x:0,y:direction*30};prepareStrike(m);strike(m,{x:0,y:0});advance(m,.4);
  assert.equal(m.passes,1);assert.equal(m.phase,kind==='corner'?'teammate':'result');assert.equal(m.nextChance,index);
 }
});

test('unobstructed shot scores, keeper saves, and high shot goes over',()=>{
 const shoot=(z,keeper)=>{const m=createMatch(5);beginChance(m,'shot','still');m.players=[];m.keeper=keeper;m.origin={x:150,y:90};m.aim={x:0,y:-100};m.wind=0;prepareStrike(m);strike(m,{x:0,y:z});advance(m,.3);return m};
 assert.equal(shoot(0,{x:260,y:66}).goals,1);
 assert.match(shoot(0,{x:150,y:66}).message,/Saved/);
 const m=createMatch(1);beginChance(m,'shot','still');m.players=[];m.phase='flight';m.ball={x:150,y:50,z:40,vx:0,vy:-200,vz:0};advance(m,.05);assert.match(m.message,/Over the bar/);
});
test('receiver near goal takes a visible shot and goal is credited as assist',()=>{
 const m=createMatch(9);beginChance(m,'shot','still');m.players=[{id:2,team:'home',x:m.ball.x,y:m.ball.y-40,run:0}];m.aim={x:0,y:-30};prepareStrike(m);strike(m,{x:0,y:0});advance(m,.3);
 assert.equal(m.phase,'teammate');assert.equal(m.passes,1);assert.equal(m.home,0);assert.equal(m.assistShot,true);
 advance(m,.7);assert.equal(m.phase,'flight');assert.ok(m.ball.vy<0);
 m.players=[];m.keeper={x:280,y:66};m.ball={x:150,y:50,z:0,vx:0,vy:-200,vz:0};advance(m,.05);
 assert.equal(m.home,1);assert.equal(m.assists,1);assert.equal(m.goals,0);assert.equal(m.phase,'result');
});
test('each visible receiver has a playable pass across seeded layouts',()=>{
 for(let seed=1;seed<=20;seed++)for(const kind of ['pass','shot','corner'])for(let receiver=0;receiver<3;receiver++){
  const sample=createMatch(seed);beginChance(sample,kind,'still');if(receiver>=sample.players.filter(p=>p.team==='home').length)continue;
  let reachable=false;
  for(const loft of [0,.12,.25,.4,.55,.7])for(let power=.55;power<=1.6 && !reachable;power+=.1){
   const m=createMatch(seed);beginChance(m,kind,'still');advance(m,1);
   const target=m.players.filter(p=>p.team==='home')[receiver];m.players=m.players.filter(p=>p.team==='away'||p.id===target.id);
   const dx=target.x-m.ball.x,dy=target.y-m.ball.y,length=Math.hypot(dx,dy),strength=Math.min(100,length*.5*power);
   m.aim={x:dx/length*strength,y:dy/length*strength};prepareStrike(m);strike(m,{x:0,y:loft});
   for(let frame=0;frame<300 && m.phase==='flight';frame++)tickMatch(m,.01);
   if(m.passes===1)reachable=true;
  }
  assert.ok(reachable,`${kind}, seed ${seed}, receiver ${receiver}`);
 }
});
test('bottom-edge contact lofts much higher than a central strike',()=>{
 const centre=createMatch(1),bottom=createMatch(1);
 for(const m of [centre,bottom]){beginChance(m,'shot','still');m.players=[];prepareStrike(m)}
 strike(centre,{x:0,y:0});strike(bottom,{x:0,y:1});advance(centre,.5);advance(bottom,.5);
 assert.ok(bottom.ball.z>85);assert.equal(centre.ball.z,0);assert.ok(bottom.landing);
});
test('pre-match clock stays stopped; rating rewards success and penalises mistakes',()=>{
 const m=createMatch(1);m.phase='setup';advance(m,10);assert.equal(m.minute,0);assert.equal(m.rating,6.5);
 finishAction(m,'Just wide.');assert.ok(m.rating<6.5);const before=m.rating;finishAction(m,'Goal!');assert.ok(m.rating>before);
});
test('chance schedule includes midfield, defensive buildup, walls and crowded boxes',()=>{
 const m=createMatch(11),zones=new Set();let crowded=false,wall=false;
 for(let i=0;i<12;i++){m.nextChance=i;beginChance(m);if(m.kind==='pass')zones.add(m.zone);if(m.difficulty==='crowded'){crowded=true;assert.equal(m.players.filter(p=>p.team==='away').length,5);assert.equal(m.players.filter(p=>p.team==='home').length,1)}if(m.kind==='free-kick'){wall=true;assert.equal(m.incoming,'still');assert.ok(m.players.filter(p=>p.team==='away').length>=3)}}
 assert.deepEqual([...zones].sort(),['defence','midfield']);assert.ok(crowded);assert.ok(wall);
});
test('crowded chances and free kicks still have a reachable receiver',()=>{
 for(const kind of ['shot','free-kick'])for(let seed=1;seed<=12;seed++){
  let complete=false;
  for(const loft of [0,.1,.2,.3,.4,.5,.65])for(let power=.5;power<=1.7&&!complete;power+=.08){
   const m=createMatch(seed);m.nextChance=2;beginChance(m,kind,'still');const p=m.players.find(p=>p.team==='home');const dx=p.x-m.ball.x,dy=p.y-m.ball.y,length=Math.hypot(dx,dy),strength=Math.min(100,length*.5*power);m.aim={x:dx/length*strength,y:dy/length*strength};prepareStrike(m);strike(m,{x:0,y:loft});for(let i=0;i<350&&m.phase==='flight';i++)tickMatch(m,.01);complete=m.passes>0;
  }
  assert.ok(complete,`${kind} seed ${seed}`);
 }
});
test('every header starts with space and a protected two-second reaction window',()=>{
 for(let seed=1;seed<=100;seed++){
  const m=createMatch(seed*997);beginChance(m,'header');
  for(const p of m.players.filter(p=>p.team==='away'))assert.ok(Math.hypot(p.x-m.ball.x,p.y-m.ball.y)>=80);
  const defenders=m.players.filter(p=>p.team==='away').map(p=>({x:p.x,y:p.y}));
  advance(m,1.9);assert.equal(m.phase,'aim');assert.deepEqual(m.players.filter(p=>p.team==='away').map(p=>({x:p.x,y:p.y})),defenders);
 }
});
test('keeper stays set before the kick, waits for a reaction, then tracks the shot',()=>{
 const m=createMatch(18);beginChance(m,'shot','still');m.players=[];const initial=m.keeper.x;
 advance(m,2);assert.equal(m.keeper.x,initial);m.aim={x:30,y:-90};prepareStrike(m);advance(m,.5);assert.equal(m.keeper.x,initial);
 strike(m,{x:0,y:0});advance(m,.2);assert.equal(m.keeper.x,initial);advance(m,.25);assert.notEqual(m.keeper.x,initial);
});
test('teammate conversion varies with shooting position instead of guaranteed goals',()=>{
 const rate=(x,y)=>{let goals=0;for(let seed=1;seed<=500;seed++){
  const m=createMatch(seed*997);beginChance(m,'shot','still');m.players=[];m.ball={x,y,z:0,vx:0,vy:0,vz:0};m.phase='teammate';m.assistShot=true;
  for(let i=0;i<500 && m.phase!=='result';i++)tickMatch(m,.01);goals+=m.assists;
 }return goals/500};
 const central=rate(150,120),angled=rate(90,150),wide=rate(220,205);
 assert.ok(central>.6 && central<.8);assert.ok(angled>.4 && angled<.65);assert.ok(wide>.3 && wide<.55);assert.ok(central>angled && angled>wide);
});
test('every match includes an early corner and layout variants span the field',()=>{
 const dribbles=new Set(),corners=new Set(),freeKicks=new Set(),decks=new Set();
 for(let seed=1;seed<=100;seed++){
  const m=createMatch(seed*997);decks.add(m.deck.join(','));assert.equal(m.deck[1],'corner');assert.equal(m.deck.filter(k=>k==='corner').length,2);
  for(const kind of ['dribble','corner','free-kick']){beginChance(m,kind);(kind==='dribble'?dribbles:kind==='corner'?corners:freeKicks).add(m.layout)}
 }
 assert.equal(dribbles.size,5);assert.equal(corners.size,3);assert.equal(freeKicks.size,3);assert.ok(decks.size>50);
});
test('a bad turnover creates counter risk and conceding is possible',()=>{
 let conceded=0;
 for(let seed=1;seed<=100;seed++){
  const m=createMatch(seed*997);beginChance(m,'pass');m.zone='defence';finishAction(m,'Intercepted. They read the pass.');assert.equal(m.counterThreat,.42);continueMatch(m);conceded+=m.away;
 }
 assert.ok(conceded>20&&conceded<65);
});
test('teammates can chip and still resolve the play',()=>{
 let chips=0;
 for(let seed=1;seed<=100;seed++){
  const m=createMatch(seed*997);beginChance(m,'shot','still');m.players=[];m.ball={x:130,y:200,z:0,vx:0,vy:0,vz:0};m.phase='teammate';m.assistShot=true;advance(m,.7);
  if(m.ball.vz>0)chips++;
  for(let frame=0;frame<500&&m.phase!=='result';frame++)tickMatch(m,.01);assert.equal(m.phase,'result');
 }
 assert.ok(chips>10&&chips<50);
});
test('harder dribbling layouts retain an achievable route through their gate',()=>{
 for(let seed=1;seed<=120;seed++){
  let won=false;
  for(const edge of [-.4,.1,.25,.5,.75,.9,1.4])for(const middle of [-.4,.1,.3,.5,.7,.9,1.4])for(const pivot of [.2,.5,.75]){
   if(won)break;
   const m=createMatch(seed*997);beginChance(m,'dribble');const lane=Math.max(-180,Math.min(480,m.bounds.left+(m.bounds.right-m.bounds.left)*edge));
   const route=[{x:lane,y:m.origin.y-35},{x:Math.max(-180,Math.min(480,m.bounds.left+(m.bounds.right-m.bounds.left)*middle)),y:m.gate.y+(m.origin.y-m.gate.y)*pivot},{x:(m.gate.left+m.gate.right)/2,y:m.gate.y-10}];let stage=0;m.carrying=true;
   for(let frame=0;frame<1500&&m.phase==='dribble';frame++){
    m.dribbleTarget=route[stage];tickMatch(m,.01);if(Math.hypot(m.ball.x-route[stage].x,m.ball.y-route[stage].y)<6&&stage<2)stage++;
   }
   if(m.dribbles===1)won=true;
  }
  assert.ok(won,`Dribble seed ${seed} has no tested route`);
 }
});

test('contact balls cross once, leave the screen and expire; bounces vary height',()=>{
 for(const incoming of ['left','right','bounce-left','bounce-right','centre-left','centre-right','drop','rise']){
  const m=createMatch(37);beginChance(m,'shot',incoming);prepareStrike(m);const samples=[];
  for(let i=0;i<=10;i++){m.phaseTime=m.incomingDuration*i/10;samples.push(strikePosition(m))}
  if(incoming.includes('left')||incoming==='right'||incoming.includes('right')){
   const sign=incoming==='left'||incoming==='bounce-left'||incoming==='centre-right'?1:-1;
   for(let i=1;i<samples.length;i++)assert.ok((samples[i].x-samples[i-1].x)*sign>0);
  }
  if(incoming.startsWith('bounce'))assert.ok(Math.max(...samples.map(p=>p.y))-Math.min(...samples.map(p=>p.y))>30);
  m.phaseTime=m.incomingDuration+.01;tickMatch(m,.01);assert.equal(m.phase,'result');
 }
});
test('corners use full-width touchlines, views rotate and free-kick walls vary',()=>{
 const views=new Set(),wallCounts=new Set(),corners=new Set(),pace=new Set(),dribbleCounts=new Set();
 for(let seed=1;seed<=100;seed++){
  const m=createMatch(seed*997);beginChance(m,'corner');assert.ok(m.origin.x<-170||m.origin.x>470);assert.ok(m.origin.y<60);assert.ok(m.players.some(p=>p.team==='home'&&Math.hypot(p.x-m.origin.x,p.y-m.origin.y)>250));corners.add(m.origin.x);views.add(m.rotation);
  beginChance(m,'free-kick');wallCounts.add(m.players.filter(p=>p.team==='away').length);
  beginChance(m,'dribble');dribbleCounts.add(m.players.length);for(const p of m.players)pace.add(Math.round(p.pace*10));
  const [x,y,w,h]=chanceView(m).split(' ').map(Number);
  for(const p of [m.origin,...m.players]){const view=rotatePoint(p,m.rotation);assert.ok(view.x>=x&&view.x<=x+w&&view.y>=y&&view.y<=y+h)}
 }
 assert.equal(corners.size,2);assert.equal(views.size,2);assert.ok(wallCounts.size>=3);assert.ok(dribbleCounts.size>=4);assert.ok(pace.size>=4);
 for(const angle of [0,90,270]){const original={x:-175,y:510},roundtrip=rotatePoint(rotatePoint(original,angle),-angle);assert.deepEqual(roundtrip,original)}
});
test('goals and assists trigger temporary outcome banners',()=>{
 const m=createMatch(1);finishAction(m,'Goal!');assert.equal(m.celebration.kind,'goal');assert.ok(m.celebration.until>m.elapsed);m.assistShot=true;finishAction(m,'Goal! Your pass made it. Assist!');assert.equal(m.celebration.kind,'assist');
});

test('camera stays fixed when players move and when a receiver gets the ball',()=>{
 const m=createMatch(817);beginChance(m,'shot','still');const view=chanceView(m);
 advance(m,1);assert.equal(chanceView(m),view);m.players=[];m.origin={x:75,y:130};m.ball={x:75,y:130,z:0,vx:0,vy:0,vz:0};m.phase='teammate';advance(m,.7);assert.equal(chanceView(m),view);
 for(const kind of ['pass','shot','header','free-kick','dribble']){beginChance(m,kind);assert.equal(m.rotation,0)}
 beginChance(m,'corner');assert.ok([90,270].includes(m.rotation));
});
test('goal banners hold the minute, players and phase until the celebration finishes',()=>{
 const m=createMatch(8);beginChance(m,'shot');finishAction(m,'Goal!');const minute=m.minute,players=JSON.stringify(m.players),phaseTime=m.phaseTime,log=JSON.stringify(m.log);
 advance(m,1);assert.equal(m.minute,minute);assert.equal(m.phaseTime,phaseTime);assert.equal(JSON.stringify(m.players),players);assert.equal(JSON.stringify(m.log),log);assert.equal(m.phase,'result');
 continueMatch(m);assert.equal(m.phase,'result');advance(m,.6);assert.equal(m.celebration,null);assert.equal(m.phase,'simulation');
});
test('dribbling screens are staggered along the route with at most ten opponents',()=>{
 for(let seed=1;seed<=30;seed++){
  const m=createMatch(seed*997);beginChance(m,'dribble');assert.ok(m.players.some(p=>p.anchor));
  const guards=m.players.filter(p=>p.anchor);assert.ok(guards.every(p=>p.x>=m.bounds.left&&p.x<=m.bounds.right));assert.ok(guards.every(p=>p.y>m.gate.y&&p.y<m.origin.y));assert.ok(new Set(guards.map(p=>Math.round(p.y))).size>=2);assert.ok(m.players.length+(m.layout==='corner-run'?1:0)<=10);
 }
});
test('ordinary deliveries never launch vertically upward',()=>{
 for(let seed=1;seed<=100;seed++)for(const kind of ['pass','shot']){
  const m=createMatch(seed*997);beginChance(m,kind);assert.notEqual(m.incoming,'rise');
 }
 const m=createMatch(5);beginChance(m,'shot','bounce-in');prepareStrike(m);const first=strikePosition(m);m.phaseTime=m.incomingDuration*.85;assert.ok(strikePosition(m).y>first.y);
});

test('simulation commentary stays concise',()=>{
 const m=createMatch(911);m.speed=4;
 for(let i=0;i<30000&&m.phase!=='fulltime';i++){
  if(m.phase==='halftime')continueMatch(m);
  if(['aim','dribble'].includes(m.phase))finishAction(m,'Chance over.');
  tickMatch(m,.05);
  for(const text of m.log){assert.ok(text.length<85,`Overlong line: ${text}`);assert.ok((text.match(/[.!?]/g)||[]).length<=1,`Multiple sentences: ${text}`)}
 }
});
test('camera fills different frame shapes without cropping playable positions',()=>{
 for(const kind of ['corner','shot','pass','dribble'])for(const aspect of [.65,1,1.3,1.8]){
  const m=createMatch(71);beginChance(m,kind);const [left,top,width,height]=chanceView(m,aspect).split(' ').map(Number);assert.ok(Math.abs(width/height-aspect)<.00001);
  for(const p of m.viewPoints){const rotated=rotatePoint(p,m.rotation);assert.ok(rotated.x>=left&&rotated.x<=left+width&&rotated.y>=top&&rotated.y<=top+height)}
 }
});

test('contact ball stays round and hit coordinates track wide and tall frames',()=>{
 for(const frame of [{width:440,height:340},{width:300,height:500},{width:680,height:240}]){
  const ball=strikeFrame({x:150,y:300},frame);assert.equal(ball.x,frame.width/2);assert.equal(ball.y,300*frame.height/380);assert.equal(ball.radius,44*Math.min(frame.width/300,frame.height/380));
  assert.ok(Math.abs(((ball.x+ball.radius*.5)-ball.x)/ball.radius-.5)<.000001);
 }
});
test('your player stays at the original position through a teammate finish',()=>{
 const m=createMatch(9);beginChance(m,'shot','still');const you={...m.you};m.players=[{id:2,team:'home',x:m.ball.x,y:m.ball.y-40,run:0}];m.aim={x:0,y:-30};prepareStrike(m);strike(m,{x:0,y:0});advance(m,.3);
 assert.equal(m.phase,'teammate');assert.deepEqual(m.you,you);assert.notDeepEqual(m.origin,you);advance(m,.7);assert.deepEqual(m.you,you);
});
test('half-time and result screens resume without manual input',()=>{
 const m=createMatch(5);m.minute=44.99;m.nextChance=6;tickMatch(m,.05);assert.equal(m.phase,'halftime');advance(m,1.6);assert.equal(m.phase,'simulation');assert.ok(m.minute>=45);
 beginChance(m,'shot');finishAction(m,'Just wide.');advance(m,1);assert.notEqual(m.phase,'result');
});
test('dribbling defenders move promptly and vary their pace',()=>{
 const m=createMatch(321);beginChance(m,'dribble');const initial=m.players.map(p=>({...p}));advance(m,.45);assert.equal(m.phase,'dribble');assert.ok(m.players.some((p,i)=>Math.hypot(p.x-initial[i].x,p.y-initial[i].y)>.5));assert.ok(new Set(m.players.map(p=>Math.round(p.pace*10))).size>2);
});
test('commentary does not repeat consecutive lines across a whole match',()=>{
 const m=createMatch(17);m.speed=4;
 for(let i=0;i<30000&&m.phase!=='fulltime';i++){
  if(['aim','dribble'].includes(m.phase))finishAction(m,'Chance over.');tickMatch(m,.05);
  const lines=m.log.map(line=>line.replace(/^.*?′ /,'').toLowerCase().replace(/\{home\}|\{away\}/g,'team'));
  for(let j=1;j<lines.length;j++)assert.notEqual(lines[j],lines[j-1]);
 }
 assert.equal(m.phase,'fulltime');
});
test('a lofted ball rebounds once with reduced vertical speed',()=>{
 const m=createMatch(11);beginChance(m,'pass','still');m.players=[];m.origin={x:150,y:700};m.aim={x:0,y:10};prepareStrike(m);strike(m,{x:0,y:1});
 for(let i=0;i<310&&!m.ball.bounces;i++)tickMatch(m,.01);
 assert.equal(m.ball.bounces,1);assert.ok(m.ball.vz>0&&m.ball.vz<80);advance(m,.3);assert.equal(m.ball.bounces,1);
});

test('corners always put the taker below the goal in the framed view',()=>{
 for(let seed=1;seed<=100;seed++){
  const m=createMatch(seed*997);beginChance(m,'corner');const taker=rotatePoint(m.origin,m.rotation),goal=rotatePoint({x:150,y:45},m.rotation);
  assert.ok(taker.y>goal.y+200);assert.ok([90,270].includes(m.rotation));
 }
});
