
async function sendMsg(){
 let box=document.getElementById('msgBox');
 if(!box.value.trim()) return;
 await addDoc(collection(window.db,"chat"),{text:box.value, time:Date.now()});
 box.value="";
}
onSnapshot(collection(window.db,"chat"), snap=>{
 let m=document.getElementById('messages');
 m.innerHTML="";
 snap.forEach(d=>{
  let div=document.createElement('div');
  div.textContent=d.data().text;
  m.appendChild(div);
 });
});
