// ================== SUPABASE SETUP (SAFE MODE) ==================
var SUPABASE_URL = "https://oueqjvcwewssufdyjvry.supabase.co";
var SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZXFqdmN3ZXdzc3VmZHlqdnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjU5ODEsImV4cCI6MjA3MzQ0MTk4MX0.c1wve-e2WkbgxbSpZU1OsPtZnmttQVfLGlpKibwYKps";

// ✅ ONE GLOBAL CLIENT (NO REDECLARE CRASH)
window.supabaseClient =
  window.supabaseClient ||
  window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ✅ USE THIS VARIABLE EVERYWHERE
var supabase = window.supabaseClient;

console.log("✅ Supabase Connected (SAFE MODE)");

// ================== ENQUIRY FORM ==================
async function submitEnquiry(event) {
  event.preventDefault();

  var name = document.getElementById("name")?.value.trim();
  var contact = document.getElementById("contact")?.value.trim();
  var whatsapp = document.getElementById("whatsapp")?.value.trim();
  var loan_type = document.getElementById("loanType")?.value;
  var loan_req = document.getElementById("loanReq")?.value.trim();
  var monthly_income = document.getElementById("monthlyIncome")?.value.trim();

  var incomeRadio = document.querySelector("input[name='income']:checked");
  var income = incomeRadio ? incomeRadio.value : null;

  if (!name || !contact || !loan_type) {
    alert("Please fill required fields");
    return;
  }

  var result = await supabase.from("enquiries").insert([
    {
      name: name,
      contact: contact,
      whatsapp: whatsapp,
      loan_type: loan_type,
      loan_req: loan_req,
      income: income,
      monthly_income: monthly_income,
    },
  ]);

  if (result.error) {
    console.error("❌ Supabase Error:", result.error);
    alert("Failed to submit enquiry");
  } else {
    console.log("✅ Enquiry submitted");
    closeForm();
    window.location.href = "successMessage.html";
  }
}

// ================== MODAL CONTROLS ==================
function openForm() {
  var modal = document.getElementById("enquiryModal");
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeForm() {
  var modal = document.getElementById("enquiryModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}

// ================== NAVBAR MENU ==================
function toggleMenu() {
  var nav = document.querySelector(".navbar");
  if (nav) nav.classList.toggle("active");
}

// ================== ANIMATIONS ==================
function playHomeAnimation() {
  document.querySelectorAll(".card").forEach(function (card, i) {
    setTimeout(function () {
      card.classList.add("show");
    }, i * 150);
  });
}

function playPartnerAnimation() {
  document.querySelectorAll(".partner-card").forEach(function (card, i) {
    setTimeout(function () {
      card.classList.add("show");
    }, i * 150);
  });
}

// ================== EXPOSE TO HTML ==================
window.openForm = openForm;
window.closeForm = closeForm;
window.submitEnquiry = submitEnquiry;
window.toggleMenu = toggleMenu;
window.playHomeAnimation = playHomeAnimation;
window.playPartnerAnimation = playPartnerAnimation;

// ================== DOM READY ==================
document.addEventListener("DOMContentLoaded", function () {
  playHomeAnimation();
});
