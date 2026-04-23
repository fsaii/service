import { db } from "../admin/firebase.js";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const service = JSON.parse(
  localStorage.getItem("SELECTED_SERVICE") || "null"
);


const confirmBtn = document.getElementById("confirmBooking");

confirmBtn.addEventListener("click", async () => {

  confirmBtn.disabled = true;
  confirmBtn.textContent = "กำลังส่งข้อมูล...";

try {

  const bookingData = {
    code: "DSK" + Date.now(),
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    serviceType: service?.title || "-",
    amount: document.getElementById("amount").value,
    location: document.getElementById("location").value || "-",
    date: document.getElementById("date").value || "-",
    note: document.getElementById("note").value || "-",
    status: "pending",
    technicianId: null,
    createdAt: serverTimestamp()
  };


await addDoc(collection(db, "jobs"), {
  service: bookingData.serviceType,
  customerName: bookingData.name,
  phone: bookingData.phone,
  location: bookingData.location,
  date: bookingData.date,

  status: "pending",
  technicianId: null,

  createdAt: serverTimestamp(),

  // 
  notificationType: "newJob",
  isNotificationRead: false
});

  console.log("✅ ส่ง Firebase สำเร็จ");
  alert("จองสำเร็จ ✅");

} catch (e) {
  console.error("❌ error:", e);
  alert("เกิดข้อผิดพลาด");

  confirmBtn.disabled = false;
  confirmBtn.textContent = "ยืนยันการจอง";
}
});