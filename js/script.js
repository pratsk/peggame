
var pos=new Array(49);
var jumps=new Array();
var boardType="Solitaire";
var numMoves=0;
var finished=false;
var selectnum=false;
var autosolve=false;
var running=false;
var basenum=0;
var destnum=0;
var destnum1=0;
var destnum2=0;
var destnum3=0;
var destnum4=0;
var delaynum=500;
if (document.images) {
blank = new Image(19,19);
blank.src = "./images/blank.gif";
empty = new Image(19,19);
empty.src = "./images/empty.gif";
emptysel = new Image(19,19);
emptysel.src = "./images/emptysel.gif";
peg = new Image(19,19);
peg.src = "./images/peg.gif";
pegact = new Image(19,19);
pegact.src = "./images/pegact.gif";
}
function display(pos,basenum,destnum) {
selectnum=false;
if (!basenum && !destnum) {
for (var i=0; i<pos.length; i++) {
if (pos[i]==-1) document.images["img"+i].src=blank.src;
else if (pos[i]==1) document.images["img"+i].src=peg.src;
else document.images["img"+i].src=empty.src;
 }
}
else {
document.images["img"+basenum].src=empty.src;
document.images["img"+(basenum+destnum/2)].src=empty.src;
document.images["img"+(basenum+destnum)].src=peg.src;
for (var i=0; i<pos.length; i++) {
if (document.images["img"+i].src==emptysel.src)
document.images["img"+i].src=empty.src;
 }
}
if (numMoves>1) win();
}
function move(num) {
var curNumMoves=numMoves;
if (!document.images)
alert("Your browser does not support the 'document.images' property.You\n" +
"should upgrade to at least Netscape 3.0 or Internet explorer 4.0.");
else if (autosolve && running) {}
else if (autosolve && !finished) {
if (confirm('You interrupted the \'Solve\' function. Want to try it yourself?'))
newGame();
}
else if (selectnum) {
if (num!=basenum && num!=basenum+destnum1 && num!=basenum+destnum2 &&
num!=basenum+destnum3 && num!=basenum+destnum4)
alert("Select a destination or click on the original peg again!");
else if (num==basenum) {
document.images["img"+basenum].src=peg.src;
if (destnum1!=0)
document.images["img"+(basenum+destnum1)].src=empty.src;
if (destnum2!=0)
document.images["img"+(basenum+destnum2)].src=empty.src;
if (destnum3!=0)
document.images["img"+(basenum+destnum3)].src=empty.src;
if (destnum4!=0)
document.images["img"+(basenum+destnum4)].src=empty.src;
selectnum=false;
}
else if (num==basenum+destnum1) movePeg(basenum,destnum1)
else if (num==basenum+destnum2) movePeg(basenum,destnum2)
else if (num==basenum+destnum3) movePeg(basenum,destnum3)
else if (num==basenum+destnum4) movePeg(basenum,destnum4)
}
else if (pos[num]==0) {
}
else if ((num==3 || num==10) && pos[num+7]==1 && pos[num+14]==0) movePeg(num,14);
else if ((num==45 || num==38) && pos[num-7]==1 && pos[num-14]==0) movePeg(num,-14);
else if ((num==21 || num==22) && pos[num+1]==1 && pos[num+2]==0) movePeg(num,2);
else if ((num==26 || num==27) && pos[num-1]==1 && pos[num-2]==0) movePeg(num,-2);
else if (num==4 || num==11 || num==19 || num==20) {
if (pos[num-1]==1 && pos[num-2]==0 && pos[num+7]==1 && pos[num+14]==0)
selPeg(num,-2,14);
else if (pos[num-1]==1 && pos[num-2]==0) movePeg(num,-2);
else if (pos[num+7]==1 && pos[num+14]==0) movePeg(num,14);
}
else if (num==2 || num==9 || num==14 || num==15) {
if (pos[num+1]==1 && pos[num+2]==0 && pos[num+7]==1 && pos[num+14]==0)
selPeg(num,2,14);
else if (pos[num+1]==1 && pos[num+2]==0) movePeg(num,2);
else if (pos[num+7]==1 && pos[num+14]==0) movePeg(num,14);
}
else if (num==28 || num==29 || num==37 || num==44) {
if (pos[num+1]==1 && pos[num+2]==0 && pos[num-7]==1 && pos[num-14]==0)
selPeg(num,2,-14);
else if (pos[num+1]==1 && pos[num+2]==0) movePeg(num,2);
else if (pos[num-7]==1 && pos[num-14]==0) movePeg(num,-14);
}
else if (num==33 || num==34 || num==39 || num==46) {
if (pos[num-1]==1 && pos[num-2]==0 && pos[num-7]==1 && pos[num-14]==0)
selPeg(num,-2,-14);
else if (pos[num-1]==1 && pos[num-2]==0) movePeg(num,-2);
else if (pos[num-7]==1 && pos[num-14]==0) movePeg(num,-14);
}
else if (num==16 || num==17 || num==18 || num==23 || num==24 || num==25 || num==30 || num==31 || num==32) {
var cond1=(pos[num-1]==1 && pos[num-2]==0);
var cond2=(pos[num-7]==1 && pos[num-14]==0);
var cond3=(pos[num+1]==1 && pos[num+2]==0);
var cond4=(pos[num+7]==1 && pos[num+14]==0);
if ((cond1 && (cond2 || cond3 || cond4)) ||
(cond2 && (cond1 || cond3 || cond4)) ||
(cond3 && (cond1 || cond2 || cond4)))
{
basenum=num;
destnum1=destnum2=destnum3=destnum4=0;
document.images["img"+basenum].src=pegact.src;
if (cond1) {
destnum1=-2;
document.images["img"+(basenum+destnum1)].src=emptysel.src;
}
if (cond2) {
destnum2=-14;
document.images["img"+(basenum+destnum2)].src=emptysel.src;
}
if (cond3) {
destnum3=2;
document.images["img"+(basenum+destnum3)].src=emptysel.src;
}
if (cond4) {
destnum4=14;
document.images["img"+(basenum+destnum4)].src=emptysel.src;
}
selectnum=true;
}
else if (cond1) movePeg(num,-2);
else if (cond2) movePeg(num,-14);
else if (cond3) movePeg(num,2);
else if (cond4) movePeg(num,14);
}
if (curNumMoves!=numMoves) display(pos,basenum,destnum);
else if (finished) win();
}
function selPeg(num,ofset1,ofset2) {
basenum=num;
destnum1=ofset1;
destnum2=ofset2;
destnum3=destnum4=0;
document.images["img"+basenum].src=pegact.src;
document.images["img"+(basenum+destnum1)].src=emptysel.src;
document.images["img"+(basenum+destnum2)].src=emptysel.src;
selectnum=true;
}
function movePeg(num,ofset) {
pos[num+ofset]=1;
pos[num+ofset/2]=pos[num]=0
basenum=num;
destnum=ofset;
numMoves++;
}
function win() {
var cnt=0;
for(var i=0; i<pos.length; i++) {
if (pos[i]!=-1) cnt+=pos[i];
}
if (cnt==1 && autosolve) {
if (confirm('You let the \'Solve\' function do it.Want to try it yourself?'))
newGame();
}
else if (cnt==1 && pos[24]==1) {
finished=true;
if (confirm('You found the best solution! Do you want to restart?')) newGame();
}
else if (cnt==1) {
finished=true;
if (confirm('You did it! Do you want to restart?')) newGame();
}
else {
var legalMoves=false;
var num=0;
while (num<pos.length && !legalMoves) {
if (pos[num]==1 &&
(((num==2 || num==9 || num==14 || num==15 || num==16 || num==17 ||
num==18 || num==23 || num==24 || num==25 || num==30 || num==31 ||
num==32 || num==21 || num==22 || num==28 || num==29 || num==37 ||
num==44) && pos[num+1]==1 && pos[num+2]==0) ||
((num==4 || num==11 || num==19 || num==20 || num==16 || num==17 ||
num==18 || num==23 || num==24 || num==25 || num==30 || num==31 ||
num==32 || num==26 || num==27 || num==33 || num==34 || num==39 ||
num==46) && pos[num-1]==1 && pos[num-2]==0) ||
((num==2 || num==9 || num==14 || num==15 || num==16 || num==17 ||
num==18 || num==23 || num==24 || num==25 || num==30 || num==31 ||
num==32 || num==4 || num==11 || num==19 || num==20 || num==3 ||
num==10) && pos[num+7]==1 && pos[num+14]==0) ||
((num==33 || num==34 || num==39 || num==46 || num==16 || num==17 ||
num==18 || num==23 || num==24 || num==25 || num==30 || num==31 ||
num==32 || num==45 || num==38 || num==28 || num==29 || num==37 ||
num==44) && pos[num-7]==1 && pos[num-14]==0)))
legalMoves=true;
num++;
}
if (!legalMoves) {
finished=true;
if (confirm('No more valid moves! Do you want to restart?')) newGame();
      }
   }
}
function newGame() {
if (autosolve && running) {}
else if (document.images) {
autosolve=false;
finished=false;
if (boardType=="Cross") {
for (var i=0; i<pos.length; i++) pos[i]=0;
pos[0]=pos[1]=pos[5]=pos[6]=-1;
pos[7]=pos[8]=pos[12]=pos[13]=-1;
pos[10]=pos[16]=pos[17]=pos[18]=pos[24]=pos[31]=1;
pos[35]=pos[36]=pos[40]=pos[41]=-1;
pos[42]=pos[43]=pos[47]=pos[48]=-1;
}
else if (boardType=="Plus") {
for (var i=0; i<pos.length; i++) pos[i]=0;
pos[0]=pos[1]=pos[5]=pos[6]=-1;
pos[7]=pos[8]=pos[12]=pos[13]=-1;
pos[10]=pos[17]=pos[22]=pos[23]=pos[24]=1;
pos[25]=pos[26]=pos[31]=pos[38]=1;
pos[35]=pos[36]=pos[40]=pos[41]=-1;
pos[42]=pos[43]=pos[47]=pos[48]=-1;
}
else if (boardType=="Fireplace") {
for (var i=0; i<pos.length; i++) pos[i]=0;
pos[0]=pos[1]=pos[5]=pos[6]=-1;
pos[7]=pos[8]=pos[12]=pos[13]=-1;
pos[2]=pos[3]=pos[4]=pos[9]=pos[10]=1;
pos[11]=pos[16]=pos[17]=pos[18]=1;
pos[23]=pos[25]=1;
pos[35]=pos[36]=pos[40]=pos[41]=-1;
pos[42]=pos[43]=pos[47]=pos[48]=-1;
}
else if (boardType=="Up Arrow") {
for (var i=0; i<pos.length; i++) pos[i]=0;
pos[0]=pos[1]=pos[5]=pos[6]=-1;
pos[7]=pos[8]=pos[12]=pos[13]=-1;
pos[3]=pos[9]=pos[10]=pos[11]=pos[15]=1;
pos[16]=pos[17]=pos[18]=pos[19]=1;
pos[24]=pos[31]=pos[37]=pos[38]=1;
pos[39]=pos[44]=pos[45]=pos[46]=1;
pos[35]=pos[36]=pos[40]=pos[41]=-1;
pos[42]=pos[43]=pos[47]=pos[48]=-1;
}
else if (boardType=="Pyramid") {
for (var i=0; i<pos.length; i++) pos[i]=0;
pos[0]=pos[1]=pos[5]=pos[6]=-1;
pos[7]=pos[8]=pos[12]=pos[13]=-1;
pos[10]=pos[16]=pos[17]=pos[18]=pos[22]=1;
pos[23]=pos[24]=pos[25]=pos[26]=1;
pos[28]=pos[29]=pos[30]=pos[31]=1;
pos[32]=pos[33]=pos[34]=1;
pos[35]=pos[36]=pos[40]=pos[41]=-1;
pos[42]=pos[43]=pos[47]=pos[48]=-1;
}
else if (boardType=="Diamond") {
for (var i=0; i<pos.length; i++) pos[i]=1;
pos[0]=pos[1]=pos[5]=pos[6]=-1;
pos[7]=pos[8]=pos[12]=pos[13]=-1;
pos[2]=pos[4]=pos[14]=pos[20]=pos[24]=0;
pos[28]=pos[34]=pos[44]=pos[46]=0;
pos[35]=pos[36]=pos[40]=pos[41]=-1;
pos[42]=pos[43]=pos[47]=pos[48]=-1;
}
else if (boardType=="Solitaire") {
for (var i=0; i<pos.length; i++) pos[i]=1;
pos[0]=pos[1]=pos[5]=pos[6]=-1;
pos[7]=pos[8]=pos[12]=pos[13]=-1;
pos[24]=0;
pos[35]=pos[36]=pos[40]=pos[41]=-1;
pos[42]=pos[43]=pos[47]=pos[48]=-1;
}
numMoves=0;
running=true;
changeBoard();
running=false;
solveArray();
display(pos);
}
else
alert("Your browser does not support the 'document.images' property.You\n" +
"should upgrade to at least Netscape 3.0 or Internet explorer 4.0.");
}
function initArray() {
this.length=initArray.arguments.length;
for (var i=0; i<this.length; i++) {
this[i] = initArray.arguments[i];
   }
}
function drawPreview(start,end) {
i=start;
j=end;
baseref=jumps[start];
offset=jumps[start+1];
pos[baseref]=pos[baseref+offset/2]=0;
pos[baseref+offset]=1;
document.images["img"+baseref].src=pegact.src;
document.images["img"+(baseref+offset)].src=emptysel.src;
solveRunning=setTimeout('drawJump(i,j)',delaynum);
}
function drawJump(start,end) {
i=start; j=end;
baseref=jumps[start];
offset=jumps[start+1];
document.images["img"+baseref].src=empty.src;
document.images["img"+(baseref+offset/2)].src=empty.src;
document.images["img"+(baseref+offset)].src=peg.src;
if (start+2==end) {
document.buttonsform.solve.value="Solve";
running=false;
finished=true;
setTimeout('win()',delaynum);
}
else solveRunning=setTimeout('drawPreview(i+2,j)',delaynum);
}
function solve() {
if (!document.images)
alert("Your browser does not support the 'document.images' property.You\n" +
"should upgrade to at least Netscape 3.0 or Internet explorer 4.0.");
else if (autosolve && running) {
clearTimeout(solveRunning);
document.buttonsform.solve.value="Solve";
running=false;
}
else {
document.buttonsform.solve.value=" Stop ";
newGame();
autosolve=true;
running=true;
solveRunning=setTimeout('drawPreview(0,jumps.length)',delaynum);
   }
}
function changeBoard() {
formName=document.buttonsform;
if (!running) {
boardType=formName.options[formName.options.selectedIndex].value;
newGame();
}
else {
optlength=formName.options.length;
for (var m=0; m<optlength; m++) {
if (formName.options[m].value==boardType) {
formName.options.selectedIndex=m;
break;
         }
      }
   }
}
function solveArray() {
if (boardType=="Cross") {
jumps = new initArray(17,-2,31,-14,18,-2,15,2,10,14);
}
else if (boardType=="Plus") {
jumps = new initArray(23,-2,25,-2,10,14,24,-2,21,2,
38,-14,23,2,26,-2);
}
else if (boardType=="Fireplace") {
jumps = new initArray(17,2,4,14,25,-14,2,2,4,14,
19,-2,10,14,24,-2,9,14,22,2);
}
else if (boardType=="Up Arrow") {
jumps = new initArray(46,-14,31,2,45,-14,44,-14,30,2,33,-2,
18,-14,4,-2,16,2,2,14,15,2,18,-2,31,
-14,16,2,19,-2,10,14);
}
else if (boardType=="Pyramid") {
jumps = new initArray(23,14,25,14,28,2,34,-2,37,-14,39,-14,
16,14,18,-2,31,-2,29,-14,15,2,17,14,
26,-2,31,-14,10,14);
}
else if (boardType=="Diamond") {
jumps = new initArray(30,14,44,2,32,2,34,-14,18,-14,4,-2,
16,-2,14,14,46,-14,20,-2,2,14,28,2,
38,-14,17,-2,15,14,29,2,31,2,33,-14,
19,-2,24,-2,10,14,25,-2,22,2);
}
else if (boardType=="Solitaire") {
jumps = new initArray(38,-14,33,-2,46,-14,25,14,44,2,46,-14,
11,14,20,-2,17,2,34,-14,20,-2,
15,2,2,14,23,-14,4,-2,2,14,
37,-14,28,2,31,-2,14,14,28,2,
17,-2,15,14,29,2,31,2,33,-14,19,-2,
24,-2,10,14,25,-2,22,2);
   }
}
