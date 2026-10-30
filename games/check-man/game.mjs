import {PIECES,makeBoard,evaluate} from './rules.mjs';
let board=[], selected=3, best=null, deadline=null, expired=false;
const boardElement=document.getElementById('board'), status=document.getElementById('status');
const cells=Array.from({length:64},(_,i)=>{
  const button=document.createElement('button');
  button.className=(i%8+Math.floor(i/8))%2?'dark':'';
  button.addEventListener('click',()=>{
    if(!roundOpen() || board[i]===1 || board[i]===2)return;
    if(!deadline)deadline=Date.now()+120000;
    board[i]=board[i]>=3?0:selected;
    status.textContent='Cover every target, then submit your solution.';
    render();
  });
  button.addEventListener('keydown',e=>{
    const steps={ArrowLeft:-1,ArrowRight:1,ArrowUp:-8,ArrowDown:8};
    if(e.key in steps){e.preventDefault();cells[Math.max(0,Math.min(63,i+steps[e.key]))].focus();}
  });
  boardElement.append(button); return button;
});
Object.entries(PIECES).forEach(([id,piece])=>{
  const button=document.createElement('button');button.dataset.piece=id;
  const img=document.createElement('img');img.src=`assets/${piece.image}.png`;img.alt='';
  button.append(img,`${piece.name} · ${piece.cost}`);
  button.setAttribute('aria-pressed',String(Number(id)===selected));
  button.onclick=()=>{selected=Number(id);document.querySelectorAll('[data-piece]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));};
  document.getElementById('pieces').append(button);
});
function render(){
  const result=evaluate(board);
  cells.forEach((button,i)=>{
    const value=board[i], name=value===1?'Target':value===2?'Obstacle':PIECES[value]?.name||'Empty';
    button.replaceChildren();
    if(value){const img=document.createElement('img');img.alt='';img.src=`assets/${value===1?'Target':value===2?'Bloker':PIECES[value].image}.png`;button.append(img);}
    button.classList.toggle('covered',result.covered.has(i));button.classList.toggle('target',value===1);
    button.setAttribute('aria-label',`${String.fromCharCode(65+i%8)}${Math.floor(i/8)+1}: ${name}${result.covered.has(i)?', covered':''}`);
    button.disabled=expired;
  });
  document.getElementById('coverage').textContent=`${result.hit} / ${result.targets}`;
  document.getElementById('cost').textContent=result.cost;
  document.getElementById('best').textContent=best??'—';
}
function newPuzzle(){board=makeBoard(Number(document.getElementById('difficulty').value));best=null;deadline=null;expired=false;document.getElementById('time').textContent='2:00';status.textContent='Choose a piece. The timer starts on your first placement.';render();}
document.getElementById('new').onclick=newPuzzle;
document.getElementById('difficulty').onchange=newPuzzle;
document.getElementById('clear').onclick=()=>{if(!roundOpen())return;board=board.map(v=>v>=3?0:v);render();};
document.getElementById('check').onclick=()=>{
  if(!roundOpen())return;
  const result=evaluate(board);
  if(!result.solved){status.textContent=`${result.targets-result.hit} targets still need coverage.`;return;}
  best=best===null?result.cost:Math.min(best,result.cost);
  status.textContent=`Solution saved: ${result.cost} points. Try using fewer points!`;render();
};
function roundOpen(){
  if(!expired && deadline && Date.now()>=deadline){
    expired=true;
    status.textContent=best===null?'Time is up. Start a new puzzle to try again.':`Round complete! Your best solution: ${best} points.`;
    document.getElementById('time').textContent='0:00';render();
  }
  return !expired;
}
setInterval(()=>{
  if(!deadline || expired)return;
  const seconds=Math.max(0,Math.ceil((deadline-Date.now())/1000));
  document.getElementById('time').textContent=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
  if(seconds===0)roundOpen();
},200);
newPuzzle();
