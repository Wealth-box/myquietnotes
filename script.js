const monthYear = document.getElementById("month-year");
const daysContainer = document.getElementById("days");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const selectedDateEl = document.getElementById("selected-date");
const noteText = document.getElementById("note-text");
const saveNoteBtn = document.getElementById("save-note");
const setAlarmBtn = document.getElementById("set-alarm");
const toggleDarkBtn = document.getElementById("toggle-dark");
const dailyVerse = document.getElementById("daily-verse");

let currentDate = new Date();
let selectedDate = null;

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  daysContainer.innerHTML = '';
  for (let i=0; i<firstDay; i++) daysContainer.innerHTML += `<div></div>`;
  for (let day=1; day<=lastDate; day++) {
    const div = document.createElement("div");
    div.textContent = day;
    div.addEventListener("click", ()=> {
      selectedDate = {year, month, day};
      selectedDateEl.textContent = `${year}-${month+1}-${day}`;
      loadNote();
      renderCalendar();
    });
    if (selectedDate && selectedDate.day===day && selectedDate.month===month && selectedDate.year===year) {
      div.classList.add("selected");
    }
    daysContainer.appendChild(div);
  }
}
prevBtn.onclick = ()=>{currentDate.setMonth(currentDate.getMonth()-1); renderCalendar();};
nextBtn.onclick = ()=>{currentDate.setMonth(currentDate.getMonth()+1); renderCalendar();};
saveNoteBtn.onclick = ()=>{
  if(!selectedDate) return alert("Select a date");
  const key = `${selectedDate.year}-${selectedDate.month+1}-${selectedDate.day}`;
  localStorage.setItem("note-"+key, noteText.value);
  alert("Note saved");
};
function loadNote(){
  if(!selectedDate) return;
  const key = `${selectedDate.year}-${selectedDate.month+1}-${selectedDate.day}`;
  noteText.value = localStorage.getItem("note-"+key) || '';
}
setAlarmBtn.onclick = ()=>{
  if(!selectedDate) return alert("Select a date");
  const time = prompt("Enter time in HH:MM (24hr format)", "07:00");
  if(time){
    localStorage.setItem("alarm-"+selectedDate.year+"-"+(selectedDate.month+1)+"-"+selectedDate.day, time);
    alert("Alarm set for "+time);
  }
};
toggleDarkBtn.onclick = ()=>{
  document.querySelectorAll('.calendar-section,.note-section,.verse-section,.app-header').forEach(e=>e.classList.toggle('dark-mode'));
};
// Daily verse (demo random)
const verses=["John 3:16 For God so loved the world...","Psalm 23:1 The Lord is my shepherd...","Philippians 4:13 I can do all things..."];
dailyVerse.textContent=verses[Math.floor(Math.random()*verses.length)];
renderCalendar();