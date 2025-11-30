// =============================
// CHAT.JS — FINAL VERSION
// Handles sending + receiving messages
// =============================

import { db } from "./firebase.js";
import {
  ref,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// DOM elements
const msgBox = document.getElementById("messages");
const input = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

// Firebase reference
const messagesRef = ref(db, "messages");

// -----------------------------
// SEND MESSAGE
// -----------------------------
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // Save message to Firebase
  push(messagesRef, {
    text,
    time: Date.now()
  });

  input.value = "";
}

// Events
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

// -----------------------------
// RENDER MESSAGE
// -----------------------------
onChildAdded(messagesRef, (snapshot) => {
  const data = snapshot.val();
  renderMessage(data.text);
});

function renderMessage(text) {
  const div = document.createElement("div");
  div.className = "message-entry";
  div.textContent = text;
  msgBox.appendChild(div);
  msgBox.scrollTop = msgBox.scrollHeight;
}
// chat js
