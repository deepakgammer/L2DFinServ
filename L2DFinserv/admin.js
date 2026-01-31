// ================== SUPABASE SETUP (SAFE MODE) ==================
var SUPABASE_URL = "https://oueqjvcwewssufdyjvry.supabase.co";
var SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZXFqdmN3ZXdzc3VmZHlqdnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjU5ODEsImV4cCI6MjA3MzQ0MTk4MX0.c1wve-e2WkbgxbSpZU1OsPtZnmttQVfLGlpKibwYKps";

// ✅ ONE GLOBAL CLIENT (NO REDECLARE EVER)
window.supabaseClient =
  window.supabaseClient ||
  window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ✅ USE THIS VARIABLE EVERYWHERE
var supabase = window.supabaseClient;

console.log("✅ Supabase Connected (ADMIN SAFE MODE)");

// ================== SIMPLE LOGIN SECURITY ==================
var ADMIN_USERNAME = "admin";
var ADMIN_PASSWORD = "1234";

function checkLogin() {
  if (localStorage.getItem("l2d_admin_auth") === "1") return;

  var user = prompt("Enter Admin Username:");
  var pass = prompt("Enter Admin Password:");

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

  var tableBody = document.querySelector("#enquiriesTable tbody");
  if (!tableBody) return;

  var result = await supabase
    .from("enquiries")
    .select("*")
    .order("id", { ascending: false });

  if (result.error) {
    console.error("❌ Fetch error:", result.error);
    return;
  }

  tableBody.innerHTML = "";

  result.data.forEach(function (row) {
    var tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.name || ""}</td>
      <td>${row.contact || ""}</td>
      <td>${row.whatsapp || ""}</td>
      <td>${row.loan_type || ""}</td>
      <td>₹${row.loan_req || ""}</td>
      <td>${row.income || ""}</td>
      <td>₹${row.monthly_income || ""}</td>
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

  var result = await supabase
    .from("enquiries")
    .delete()
    .eq("id", id);

  if (result.error) {
    console.error("❌ Delete error:", result.error);
  } else {
    console.log("✅ Deleted enquiry:", id);
    loadEnquiries();
  }
}

// ================== EXPOSE FUNCTIONS ==================
window.deleteEnquiry = deleteEnquiry;

// ================== ON READY ==================
document.addEventListener("DOMContentLoaded", function () {
  loadEnquiries();
});
