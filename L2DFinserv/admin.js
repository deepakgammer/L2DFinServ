// ================== SUPABASE SETUP ==================
const SUPABASE_URL = "https://oueqjvcwewssufdyjvry.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZXFqdmN3ZXdzc3VmZHlqdnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjU5ODEsImV4cCI6MjA3MzQ0MTk4MX0.c1wve-e2WkbgxbSpZU1OsPtZnmttQVfLGlpKibwYKps";

// 🔒 Prevent duplicate client
if (!window._supabase) {
  window._supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );
}
const supabase = window._supabase;

console.log("✅ Supabase Connected (Admin)");

// ================== SIMPLE LOGIN SECURITY ==================
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "1234";

function checkLogin() {
  const loggedIn = localStorage.getItem("l2d_admin_auth");
  if (loggedIn === "1") return;

  const user = prompt("Enter Admin Username:");
  const pass = prompt("Enter Admin Password:");

  if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
    localStorage.setItem("l2d_admin_auth", "1");
    alert("✅ Login successful");
  } else {
    alert("❌ Invalid credentials");
    window.location.replace("index.html");
  }
}

// ================== LOAD ENQUIRIES ==================
async function loadEnquiries() {
  checkLogin();

  const tableBody = document.querySelector("#enquiriesTable tbody");
  if (!tableBody) return;

  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("❌ Fetch error:", error);
    return;
  }

  tableBody.innerHTML = "";

  data.forEach((row) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.name ?? ""}</td>
      <td>${row.contact ?? ""}</td>
      <td>${row.whatsapp ?? ""}</td>
      <td>${row.loan_type ?? ""}</td>
      <td>₹${row.loan_req ?? ""}</td>
      <td>${row.income ?? ""}</td>
      <td>₹${row.monthly_income ?? ""}</td>
      <td>
        <button onclick="deleteEnquiry(${row.id})">Delete</button>
      </td>
    `;

    tableBody.appendChild(tr);
  });
}

// ================== DELETE ENQUIRY ==================
async function deleteEnquiry(id) {
  if (!id) return;

  if (!confirm("Delete this enquiry?")) return;

  const { error } = await supabase
    .from("enquiries")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("❌ Delete error:", error);
  } else {
    console.log("✅ Deleted enquiry:", id);
    loadEnquiries();
  }
}

// ================== EXPOSE FUNCTIONS ==================
window.deleteEnquiry = deleteEnquiry;

// ================== ON READY ==================
document.addEventListener("DOMContentLoaded", () => {
  loadEnquiries();
});
