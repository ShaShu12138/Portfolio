import assert from 'node:assert/strict';
import {attacks,evaluate,makeBoard} from '../games/check-man/rules.mjs';
let board=Array(64).fill(0);board[0]=6;board[3]=1;board[5]=1;
assert.deepEqual(attacks(board,0).filter(i=>i<8),[1,2,3]);
board[2]=2;assert(!attacks(board,0).includes(3));
board=Array(64).fill(0);board[27]=3;
assert.deepEqual(new Set(attacks(board,27)),new Set([18,20,34,36]));
board=Array(64).fill(2);board[0]=4;board[10]=1;
assert(attacks(board,0).includes(10));
assert.equal(evaluate(board).cost,3);assert(evaluate(board).solved);
assert(!evaluate(Array(64).fill(0)).solved);
for(const count of [6,8,10])for(let i=0;i<100;i++){
  board=makeBoard(count);assert.equal(board.filter(v=>v===1).length,count);assert.equal(board.filter(v=>v===2).length,count);
  for(let target=0;target<64;target++)if(board[target]===1)assert(board.some((v,j)=>v===0&&attacks(board,j,5).includes(target)));
}
console.log('Check Man: ray blocking, pawn, knight, scoring and 300 generated puzzles passed.');
