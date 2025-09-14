// ================== SUPABASE SETUP ==================
const SUPABASE_URL = "https://oueqjvcwewssufdyjvry.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZXFqdmN3ZXdzc3VmZHlqdnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjU5ODEsImV4cCI6MjA3MzQ0MTk4MX0.c1wve-e2WkbgxbSpZU1OsPtZnmttQVfLGlpKibwYKps";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
console.log("Supabase Connected ✅ (Admin)");

// ================== SIMPLE LOGIN SECURITY ==================
const ADMIN_USERNAME = "admin"; // ✅ change to your username
const ADMIN_PASSWORD = "1234"; // ✅ change to your password

function checkLogin() {
  const loggedIn = localStorage.getItem("l2d_admin_auth");
  if (!loggedIn) {
    let user = prompt("Enter Admin Username:");
    let pass = prompt("Enter Admin Password:");

    if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
      localStorage.setItem("l2d_admin_auth", "1");
      alert("✅ Login successful!");
    } else {
      alert("❌ Invalid credentials!");
      window.location.href = "index.html"; // redirect if failed
    }
  }
}

// ================== LOAD ENQUIRIES ==================
async function loadEnquiries() {
  checkLogin(); // ✅ ensure only logged in users can see data

  const tableBody = document.querySelector("#enquiriesTable tbody");
  if (!tableBody) return;

  let { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("❌ Error fetching enquiries:", error);
    return;
  }

  console.log("📥 Fetched Enquiries:", data);

  tableBody.innerHTML = "";

  data.forEach((row) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.name || ""}</td>
      <td>${row.contact || ""}</td>
      <td>${row.whatsapp || ""}</td>
      <td>${row.loan_type || ""}</td>
      <td>₹${row.loan_req || ""}</td>
      <td>${row.income || ""}</td>
      <td>₹${row.monthly_income || ""}</td>
      <td>
        <button class="btn-delete" onclick="deleteEnquiry(${row.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// ================== DELETE ENQUIRY ==================
async function deleteEnquiry(id) {
  if (!id) {
    console.error("❌ Invalid ID for delete");
    return;
  }

  if (!confirm("Are you sure you want to delete this enquiry?")) return;

  const { error } = await supabase.from("enquiries").delete().eq("id", id);

  if (error) {
    console.error("❌ Error deleting enquiry:", error);
  } else {
    console.log("✅ Enquiry deleted with ID:", id);
    await loadEnquiries(); // Refresh table after delete
  }
}

// ================== ON LOAD ==================
window.onload = () => {
  loadEnquiries();
};
