// Reproducible native Higgsedit composition. Input screens contain fictional demo data only.
export default async ({ project, frame, text, rect, media }) => {
  const p = await project({ dir: '/home/user/clinicflow-film', size: '1280x720', fps: 24, background: '#182a25' });
  const dashboard = await p.add('/home/user/film-inputs/workspace.png');
  const calendar = await p.add('/home/user/film-inputs/calendar.png');
  const work = await p.add('/home/user/film-inputs/my-work.png');
  const ink = '#182a25', paper = '#faf9f5', lime = '#d9ef88';
  const type = (copy, x, y, size, color = ink, width = 1100, extra = {}) => text(copy, {x,y,width,height:size*2.8,fontFamily:'DM Sans',fontSize:size,color,fontWeight:400,...extra});
  const enter = { enter: {from:{y:26,opacity:0},duration:.7}, exit:{to:{opacity:0,y:-8},duration:.25,anchor:'end'} };
  const label = (copy, color=ink) => type(copy,72,51,14,color,1000,{letterSpacing:2});
  const footer = (color=ink) => type('ClinicFlow  /  Product overview  /  Fictional demonstration data',72,674,12,color,1100);
  p.compose(frame({width:1280,height:720,layout:'none',background:ink},[
    label('CLINICFLOW  /  YOUR PRACTICE. IN FLOW.',lime),
    frame({x:72,y:174,width:1100,height:355,layout:'none',motion:enter},[
      type('Less admin.',0,0,105,paper),type('More room for care.',0,128,91,lime),
      type('A calmer way to run your clinic.',4,274,25,'#c3d0bd'),
    ]),rect({x:72,y:595,width:1136,height:1,fill:'#5a715f'}),
    type('PATIENTS   /   APPOINTMENTS   /   FILES   /   FOLLOW-UPS',72,627,15,'#c3d0bd',1136,{letterSpacing:2}),
  ]),{at:0,dur:4,name:'01 Brand introduction'});
  function screen(at,dur,handle,kicker,title,caption,bg) {
    p.compose(frame({width:1280,height:720,layout:'none',background:bg},[
      label(kicker),
      frame({x:72,y:128,width:410,height:400,layout:'none',motion:enter},[
        type(title,0,0,58,ink,395,{lineHeight:1.13}),
        type(caption,0,244,21,'#566550',370,{lineHeight:1.5}),
      ]),
      frame({x:522,y:113,width:695,height:510,layout:'none',radius:16,clip:true,background:paper,motion:{enter:{from:{x:70,opacity:0,scale:.97},duration:.8},exit:{to:{opacity:0},duration:.25,anchor:'end'}}},[
        rect({x:0,y:0,width:695,height:30,fill:'#ffffff'}),
        type('CLINICFLOW  /  WORKSPACE',18,7,10,'#697660',650,{letterSpacing:1}),
        media({file:handle,x:0,y:30,width:695,height:530,fit:'width',animate:[{property:'offsetY',from:0,to:-20,at:1,duration:dur-1.3,easing:'smooth'}]}),
      ]),footer(),
    ]),{at,dur,name:kicker});
  }
  screen(4,5,dashboard,'01 / START WITH TODAY','Your day.\nA little\nclearer.','Appointments, enquiries and the next action. Together.', '#e5eadb');
  screen(9,4,calendar,'02 / APPOINTMENTS','From first\ncontact to\nnext visit.','Keep the patient and the booking connected.','#e5ddf1');
  screen(13,5,work,'03 / MY WORK','Follow up.\nFollow\nthrough.','A clear owner. A visible next step. Clinical decisions stay with the clinician.','#f4d8c3');
  p.compose(frame({width:1280,height:720,layout:'none',background:paper},[
    label('04 / LETTERS & REPORTS'),
    frame({x:72,y:148,width:1100,height:390,layout:'none',motion:enter},[
      type('Your words. Your sign-off.',0,0,66,ink),
      type('Templates help you write. People stay in control.',0,103,26,'#62705b'),
      ...['Write with templates','Doctor review','Approve & send'].flatMap((copy,i)=>[
        rect({x:i*378,y:218,width:344,height:104,radius:15,fill:i===2?ink:'#e4eada'}),
        type(copy,i*378+23,252,23,i===2?lime:ink,310),
      ]),
    ]),footer(),
  ]),{at:18,dur:4,name:'04 Human-led letters'});
  p.compose(frame({width:1280,height:720,layout:'none',background:ink},[
    label('CLINICFLOW',lime),
    frame({x:72,y:170,width:1136,height:360,layout:'none',motion:{enter:{from:{y:25,opacity:0},duration:.8}}},[
      type('Find your',0,0,100,paper),type('clinic’s flow.',0,120,100,lime),
      type('Explore the workspace. Start a conversation.',4,271,24,'#cad8c2'),
    ]),rect({x:72,y:605,width:1136,height:1,fill:'#4b6251'}),
    type('UK INDEPENDENT CONSULTANTS & SMALL CLINICS',72,639,14,'#cad8c2',1136,{letterSpacing:2}),
  ]),{at:22,dur:4,name:'05 Closing brand card'});
  await p.frame(2.2,'renders/poster.png');
  await p.render('renders/film-silent.mp4',{depth:8,bitrate:4500000,shards:4,concurrency:2});
};
