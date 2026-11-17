export const PIECES = {
  3: {name:'Pawn',cost:2,image:'Pawn'}, 4: {name:'Knight',cost:3,image:'Knight'},
  5: {name:'King',cost:3,image:'King'}, 6: {name:'Rook',cost:4,image:'Rook'},
  7: {name:'Bishop',cost:4,image:'Bishop'}, 8: {name:'Queen',cost:5,image:'Queen'}
};
const diagonal = [[-1,-1],[-1,1],[1,-1],[1,1]];
const straight = [[-1,0],[1,0],[0,-1],[0,1]];
const knight = [[-2,-1],[-2,1],[2,-1],[2,1],[-1,-2],[1,-2],[-1,2],[1,2]];
export function attacks(board, index, piece = board[index]) {
  const x=index%8, y=Math.floor(index/8), result=[];
  const steps = piece===3 ? diagonal : piece===4 ? knight : piece===5 || piece===8 ? [...diagonal,...straight] : piece===6 ? straight : piece===7 ? diagonal : [];
  for (const [dx,dy] of steps) {
    for (let n=1;n<=(piece>=6?7:1);n++) {
      const nx=x+dx*n, ny=y+dy*n;
      if(nx<0 || nx>7 || ny<0 || ny>7) break;
      const to=ny*8+nx;
      if(board[to]>=2) break;
      result.push(to);
      if(board[to]===1) break;
    }
  }
  return result;
}
export function evaluate(board) {
  const covered=new Set(); let cost=0, targets=0, hit=0;
  board.forEach((value,i)=>{if(PIECES[value]){cost+=PIECES[value].cost; attacks(board,i).forEach(j=>covered.add(j));}});
  board.forEach((value,i)=>{if(value===1){targets++;if(covered.has(i))hit++;}});
  return {covered,cost,targets,hit,solved:targets>0 && hit===targets};
}
export function makeBoard(count, random=Math.random) {
  for(let attempt=0;attempt<100;attempt++) {
    const cells=Array.from({length:64},(_,i)=>i);
    for(let i=63;i>0;i--){const j=Math.floor(random()*(i+1));[cells[i],cells[j]]=[cells[j],cells[i]];}
    const board=Array(64).fill(0);
    cells.slice(0,count).forEach(i=>board[i]=1);
    cells.slice(count,count*2).forEach(i=>board[i]=2);
    // Every target must be reachable by a short-range piece from an empty square.
    if(cells.slice(0,count).every(target=>board.some((v,i)=>v===0 && attacks(board,i,5).includes(target))))return board;
  }
  const board=Array(64).fill(0);
  for(let i=0;i<count;i++){board[i*2]=1;board[48+i]=2;}
  return board;
}
