// ================== SUPABASE SETUP ==================
const SUPABASE_URL = "https://oueqjvcwewssufdyjvry.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZXFqdmN3ZXdzc3VmZHlqdnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjU5ODEsImV4cCI6MjA3MzQ0MTk4MX0.c1wve-e2WkbgxbSpZU1OsPtZnmttQVfLGlpKibwYKps";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
console.log("Supabase Connected ✅");

// ================== ENQUIRY FORM ==================
async function submitEnquiry(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const loan_type = document.getElementById("loanType").value;
  const loan_req = document.getElementById("loanReq").value.trim(); // ✅ loan_req
  const monthly_income = document.getElementById("monthlyIncome").value.trim();
  const incomeRadio = document.querySelector("input[name='income']:checked");
  const income = incomeRadio ? incomeRadio.value : null;

  // Insert into Supabase (snake_case field names)
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
    console.error("❌ Error submitting enquiry:", error);
    alert("Failed to submit enquiry. Please try again.");
  } else {
    console.log("✅ Enquiry submitted:", data);
    window.location.href = "successMessage.html"; // Redirect after success
  }
}

// ================== MODAL CONTROLS ==================
function openForm() {
  document.getElementById("enquiryModal").style.display = "flex";
}
function closeForm() {
  document.getElementById("enquiryModal").style.display = "none";
}

// ================== NAVBAR MENU ==================
function toggleMenu() {
  document.querySelector(".navbar").classList.toggle("active");
}

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
