const KEY="eventease_data_v1";

const seed={
 users:[
  {id:1,name:"Aarav Reddy",email:"aarav@gmail.com",password:"1234",role:"user"},
  {id:2,name:"Admin Kavya",email:"admin@eventease.com",password:"admin123",role:"admin"}
 ],
 events:[
  {id:101,title:"Tech Innovators Summit 2026",date:"2026-10-10",time:"10:00 AM",venue:"HITEX, Hyderabad",speaker:"Dr. Ananya Rao",category:"Technology",description:"A technology summit featuring AI, cloud computing and emerging software trends."},
  {id:102,title:"Cultural Fest 2026",date:"2026-10-18",time:"4:00 PM",venue:"KL University Auditorium, Vijayawada",speaker:"Niharika Sharma",category:"Culture",description:"Music, dance, arts and student cultural performances."},
  {id:103,title:"AI & Future Skills Workshop",date:"2026-11-02",time:"11:00 AM",venue:"Innovation Hub, Bengaluru",speaker:"Rahul Varma",category:"Workshop",description:"Hands-on workshop covering AI tools, career skills and project building."},
  {id:104,title:"Entrepreneurship Connect",date:"2026-11-15",time:"9:30 AM",venue:"T-Hub, Hyderabad",speaker:"Meghana Iyer",category:"Business",description:"Meet founders, learn startup basics and explore new business ideas."}
 ],
 registrations:[],
 notifications:[
  {id:1,title:"Welcome to EventEase",message:"Explore upcoming events and register online.",date:"2026-09-22"},
  {id:2,title:"New event added",message:"Tech Innovators Summit 2026 registration is open.",date:"2026-09-22"}
 ],
 feedback:[]
};

let db=JSON.parse(localStorage.getItem(KEY))||seed;
let currentUser=JSON.parse(localStorage.getItem("eventease_user"))||null;
const app=document.getElementById("app");

function save(){localStorage.setItem(KEY,JSON.stringify(db))}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.style.display="block";setTimeout(()=>t.style.display="none",2500)}
function go(view){render(view)}
function setSession(user){currentUser=user;localStorage.setItem("eventease_user",JSON.stringify(user));updateNav()}
function logout(){currentUser=null;localStorage.removeItem("eventease_user");updateNav();go("home");toast("Logged out successfully")}
function updateNav(){
 document.querySelectorAll(".admin-only").forEach(x=>x.classList.toggle("hidden",currentUser?.role!=="admin"));
 document.getElementById("loginNav").classList.toggle("hidden",!!currentUser);
 document.getElementById("userNav").classList.toggle("hidden",!currentUser);
 document.getElementById("logoutBtn").classList.toggle("hidden",!currentUser);
}
function eventCard(e){
 const registered=db.registrations.some(r=>r.eventId===e.id&&r.userId===currentUser?.id);
 return `<div class="card">
  <span class="tag">${esc(e.category)}</span><h3>${esc(e.title)}</h3>
  <p class="muted">📅 ${esc(e.date)} &nbsp; ⏰ ${esc(e.time)}</p>
  <p>📍 ${esc(e.venue)}</p><p>🎤 ${esc(e.speaker)}</p>
  <p>${esc(e.description)}</p>
  <div class="actions"><button class="btn primary" onclick="showEvent(${e.id})">View Details</button>
  ${currentUser&&currentUser.role==="user"?`<button class="btn ${registered?"success":"secondary"}" onclick="registerEvent(${e.id})">${registered?"Registered":"Register"}</button>`:""}</div>
 </div>`
}
function render(view="home"){
 updateNav();
 if(view==="home") return home();
 if(view==="events") return events();
 if(view==="login") return login();
 if(view==="register") return registration();
 if(view==="notifications") return notifications();
 if(view==="feedback") return feedback();
 if(view==="admin"&&currentUser?.role==="admin") return admin();
 if(view==="profile"&&currentUser) return profile();
 home();
}
function home(){
 const upcoming=db.events.slice().sort((a,b)=>a.date.localeCompare(b.date)).slice(0,3);
 app.innerHTML=`<section class="hero"><h1>Plan. Participate. Experience.</h1><p>EventEase is a complete front-end Event Management System for discovering events, registering participants, managing events and collecting feedback.</p>
 <div class="actions"><button class="btn secondary" onclick="go('events')">Explore Events</button>${!currentUser?`<button class="btn primary" onclick="go('register')">Create Account</button>`:""}</div></section>
 <h2 class="section-title">Upcoming Events</h2><div class="grid">${upcoming.map(eventCard).join("")}</div>
 <h2 class="section-title">System Features</h2><div class="grid">
 <div class="card"><h3>👤 User Module</h3><p>Registration, login, event registration, notifications and feedback.</p></div>
 <div class="card"><h3>⚙️ Admin Module</h3><p>Create, edit and delete events and view participant feedback.</p></div>
 <div class="card"><h3>🔔 Notifications</h3><p>Participants can view important event updates.</p></div>
 </div>`;
}
function events(){
 app.innerHTML=`<h1 class="section-title">All Events</h1><p class="muted">Choose an event to view schedules, speakers and venue information.</p><div class="grid">${db.events.map(eventCard).join("")}</div>`;
}
function login(){
 app.innerHTML=`<h1 class="section-title">Login</h1><form id="loginForm">
 <label>Email</label><input id="email" type="email" required placeholder="Enter email">
 <label>Password</label><input id="password" type="password" required placeholder="Enter password">
 <p id="loginErr" class="error"></p><br><button class="btn primary">Login</button>
 <p style="margin-top:12px">New user? <button type="button" class="btn secondary" onclick="go('register')">Register</button></p>
 <p class="muted" style="margin-top:12px">Demo admin: admin@eventease.com / admin123</p>
 </form>`;
 document.getElementById("loginForm").onsubmit=e=>{e.preventDefault();
  const u=db.users.find(x=>x.email.toLowerCase()===email.value.toLowerCase()&&x.password===password.value);
  if(!u){loginErr.textContent="Invalid email or password.";return}
  setSession(u);toast("Login successful");go(u.role==="admin"?"admin":"home");
 };
}
function registration(){
 app.innerHTML=`<h1 class="section-title">User Registration</h1><form id="regForm"><div class="form-grid">
 <div class="full"><label>Full Name</label><input id="name" required placeholder="e.g. Saanvi Reddy"></div>
 <div><label>Email</label><input id="email" type="email" required placeholder="name@gmail.com"></div>
 <div><label>Mobile Number</label><input id="mobile" pattern="[6-9][0-9]{9}" required placeholder="10-digit mobile number"></div>
 <div><label>Password</label><input id="password" type="password" minlength="4" required></div>
 <div><label>Confirm Password</label><input id="confirm" type="password" required></div>
 </div><p id="regErr" class="error"></p><br><button class="btn primary">Create Account</button></form>`;
 document.getElementById("regForm").onsubmit=e=>{e.preventDefault();
  if(password.value!==confirm.value){regErr.textContent="Passwords do not match.";return}
  if(db.users.some(u=>u.email.toLowerCase()===email.value.toLowerCase())){regErr.textContent="Email is already registered.";return}
  const user={id:Date.now(),name:name.value.trim(),email:email.value.trim(),password:password.value,role:"user",mobile:mobile.value};
  db.users.push(user);save();setSession(user);toast("Registration successful");go("home");
 };
}
function showEvent(id){
 const e=db.events.find(x=>x.id===id);if(!e)return;
 const registered=db.registrations.some(r=>r.eventId===id&&r.userId===currentUser?.id);
 const m=document.createElement("div");m.className="modal";m.id="eventModal";
 m.innerHTML=`<div class="modal-box"><h2>${esc(e.title)}</h2><p class="tag">${esc(e.category)}</p>
 <p><b>Date:</b> ${esc(e.date)}</p><p><b>Time:</b> ${esc(e.time)}</p><p><b>Venue:</b> ${esc(e.venue)}</p><p><b>Speaker:</b> ${esc(e.speaker)}</p><p>${esc(e.description)}</p>
 <div class="actions">${currentUser?.role==="user"?`<button class="btn primary" onclick="registerEvent(${id});document.getElementById('eventModal').remove()">${registered?"Already Registered":"Register Now"}</button>`:""}<button class="btn secondary" onclick="document.getElementById('eventModal').remove()">Close</button></div></div>`;
 document.body.appendChild(m);
}
function registerEvent(eventId){
 if(!currentUser){toast("Please login as a user first");go("login");return}
 if(currentUser.role!=="user"){toast("Only users can register for events");return}
 if(db.registrations.some(r=>r.eventId===eventId&&r.userId===currentUser.id)){toast("You are already registered");return}
 db.registrations.push({id:Date.now(),eventId,userId:currentUser.id,date:new Date().toISOString().slice(0,10)});
 db.notifications.push({id:Date.now()+1,title:"Registration confirmed",message:`Your registration for "${db.events.find(e=>e.id===eventId).title}" is confirmed.`,date:new Date().toISOString().slice(0,10)});
 save();toast("Event registration successful");go("events");
}
function notifications(){
 const mine=currentUser?db.notifications.slice().reverse():db.notifications.slice().reverse();
 app.innerHTML=`<h1 class="section-title">Notifications</h1>${mine.length?mine.map(n=>`<div class="card notification"><h3>${esc(n.title)}</h3><p>${esc(n.message)}</p><small class="muted">${esc(n.date)}</small></div>`).join(""):`<div class="empty">No notifications yet.</div>`}`;
}
function feedback(){
 if(!currentUser){app.innerHTML=`<div class="empty"><h2>Login required</h2><p>Please login to submit feedback.</p><button class="btn primary" onclick="go('login')">Login</button></div>`;return}
 const myRegs=db.registrations.filter(r=>r.userId===currentUser.id);
 app.innerHTML=`<h1 class="section-title">Feedback</h1><form id="feedbackForm"><label>Event</label><select id="eventId" required>${myRegs.length?myRegs.map(r=>{const e=db.events.find(x=>x.id===r.eventId);return `<option value="${e.id}">${esc(e.title)}</option>`}).join(""):`<option value="">No registered events</option>`}</select>
 <label>Rating</label><select id="rating" required><option value="5">5 - Excellent</option><option value="4">4 - Very Good</option><option value="3">3 - Good</option><option value="2">2 - Fair</option><option value="1">1 - Needs Improvement</option></select>
 <label>Comments</label><textarea id="comment" required placeholder="Share your opinion"></textarea><br><button class="btn primary" ${!myRegs.length?"disabled":""}>Submit Feedback</button></form>`;
 document.getElementById("feedbackForm").onsubmit=e=>{e.preventDefault();db.feedback.push({id:Date.now(),eventId:Number(eventId.value),userId:currentUser.id,rating:Number(rating.value),comment:comment.value,date:new Date().toISOString().slice(0,10)});save();toast("Feedback submitted");go("feedback")}
}
function profile(){
 const regs=db.registrations.filter(r=>r.userId===currentUser.id);
 app.innerHTML=`<h1 class="section-title">My Profile</h1><div class="card"><h2>${esc(currentUser.name)}</h2><p>${esc(currentUser.email)}</p><p>Role: User</p></div><h2 class="section-title">My Registrations</h2><div class="grid">${regs.length?regs.map(r=>eventCard(db.events.find(e=>e.id===r.eventId))).join(""):`<div class="empty">No event registrations yet.</div>`}</div>`;
}
function admin(){
 const totalRegs=db.registrations.length;
 app.innerHTML=`<h1 class="section-title">Admin Dashboard</h1>
 <div class="stats"><div class="stat"><span>Events</span><b>${db.events.length}</b></div><div class="stat"><span>Users</span><b>${db.users.filter(u=>u.role==="user").length}</b></div><div class="stat"><span>Registrations</span><b>${totalRegs}</b></div><div class="stat"><span>Feedback</span><b>${db.feedback.length}</b></div></div>
 <div class="actions"><button class="btn primary" onclick="openEventForm()">+ Create Event</button><button class="btn secondary" onclick="viewAdminFeedback()">View Feedback</button></div>
 <h2 class="section-title">Manage Events</h2><div class="grid">${db.events.map(e=>`<div class="card"><span class="tag">${esc(e.category)}</span><h3>${esc(e.title)}</h3><p>📅 ${esc(e.date)} | 📍 ${esc(e.venue)}</p><div class="actions"><button class="btn secondary" onclick="openEventForm(${e.id})">Edit</button><button class="btn danger" onclick="deleteEvent(${e.id})">Delete</button></div></div>`).join("")}</div>`;
}
function openEventForm(id){
 const e=id?db.events.find(x=>x.id===id):{title:"",date:"",time:"",venue:"",speaker:"",category:"Technology",description:""};
 const m=document.createElement("div");m.className="modal";m.id="eventFormModal";
 m.innerHTML=`<div class="modal-box"><h2>${id?"Edit Event":"Create Event"}</h2><form id="eventForm"><label>Event Title</label><input id="title" required value="${esc(e.title)}"><label>Date</label><input id="date" type="date" required value="${esc(e.date)}"><label>Time</label><input id="time" required value="${esc(e.time)}"><label>Venue</label><input id="venue" required value="${esc(e.venue)}"><label>Speaker</label><input id="speaker" required value="${esc(e.speaker)}"><label>Category</label><select id="category"><option>Technology</option><option>Culture</option><option>Workshop</option><option>Business</option><option>Sports</option></select><label>Description</label><textarea id="description" required>${esc(e.description)}</textarea><div class="actions"><button class="btn primary">Save</button><button type="button" class="btn secondary" onclick="document.getElementById('eventFormModal').remove()">Cancel</button></div></form></div>`;
 document.body.appendChild(m);category.value=e.category;
 document.getElementById("eventForm").onsubmit=ev=>{ev.preventDefault();const data={id:id||Date.now(),title:title.value,date:date.value,time:time.value,venue:venue.value,speaker:speaker.value,category:category.value,description:description.value};if(id)db.events=db.events.map(x=>x.id===id?data:x);else db.events.push(data);save();m.remove();toast(id?"Event updated":"Event created");render("admin")}
}
function deleteEvent(id){if(confirm("Delete this event?")){db.events=db.events.filter(e=>e.id!==id);db.registrations=db.registrations.filter(r=>r.eventId!==id);save();toast("Event deleted");render("admin")}}
function viewAdminFeedback(){
 app.innerHTML=`<h1 class="section-title">Participant Feedback</h1>${db.feedback.length?`<table><tr><th>User</th><th>Event</th><th>Rating</th><th>Comment</th><th>Date</th></tr>${db.feedback.map(f=>{const u=db.users.find(x=>x.id===f.userId),e=db.events.find(x=>x.id===f.eventId);return `<tr><td>${esc(u?.name)}</td><td>${esc(e?.title)}</td><td>${f.rating}/5</td><td>${esc(f.comment)}</td><td>${esc(f.date)}</td></tr>`}).join("")}</table>`:`<div class="empty">No feedback submitted yet.</div>`}<div class="actions"><button class="btn secondary" onclick="go('admin')">Back to Admin</button></div>`;
}
document.querySelectorAll(".nav-btn").forEach(btn=>btn.addEventListener("click",()=>go(btn.dataset.view)));
document.getElementById("logoutBtn").addEventListener("click",logout);
render("home");
