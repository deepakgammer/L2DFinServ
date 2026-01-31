// ================== SUPABASE SETUP ==================
const SUPABASE_URL = "https://oueqjvcwewssufdyjvry.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZXFqdmN3ZXdzc3VmZHlqdnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjU5ODEsImV4cCI6MjA3MzQ0MTk4MX0.c1wve-e2WkbgxbSpZU1OsPtZnmttQVfLGlpKibwYKps";

// 🔒 Prevent redeclaration
if (!window._supabase) {
  window._supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );
}
const supabase = window._supabase;

console.log("✅ Supabase Connected");

// ================== ENQUIRY FORM ==================
async function submitEnquiry(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const loan_type = document.getElementById("loanType").value;
  const loan_req = document.getElementById("loanReq").value.trim();
  const monthly_income = document.getElementById("monthlyIncome").value.trim();

  const incomeRadio = document.querySelector(
    "input[name='income']:checked"
  );
  const income = incomeRadio ? incomeRadio.value : null;

  if (!name || !contact || !loan_type) {
    alert("Please fill required fields");
    return;
  }

  const { data, error } = await supabase.from("enquiries").insert([
    {
      name,
      contact,
      whatsapp,
      loan_type,
      loan_req,
      income,
      monthly_income,
    },
  ]);

  if (error) {
    console.error("❌ Supabase Error:", error);
    alert("Failed to submit enquiry");
  } else {
    console.log("✅ Enquiry submitted:", data);
    closeForm();
    window.location.href = "successMessage.html";
  }
}

// ================== MODAL CONTROLS ==================
function openForm() {
  const modal = document.getElementById("enquiryModal");
  if (modal) modal.style.display = "flex";
}

function closeForm() {
  const modal = document.getElementById("enquiryModal");
  if (modal) modal.style.display = "none";
}

// expose to HTML
window.openForm = openForm;
window.closeForm = closeForm;
window.submitEnquiry = submitEnquiry;

// ================== NAVBAR MENU ==================
function toggleMenu() {
  document.querySelector(".navbar")?.classList.toggle("active");
}
window.toggleMenu = toggleMenu;

// ================== ANIMATIONS ==================
function playHomeAnimation() {
  document.querySelectorAll(".card").forEach((card, i) => {
    setTimeout(() => card.classList.add("show"), i * 150);
  });
}

function playPartnerAnimation() {
  document.querySelectorAll(".partner-card").forEach((card, i) => {
    setTimeout(() => card.classList.add("show"), i * 150);
  });
}

window.playHomeAnimation = playHomeAnimation;
window.playPartnerAnimation = playPartnerAnimation;

// ================== DOM READY ==================
document.addEventListener("DOMContentLoaded", () => {
  playHomeAnimation();
});
