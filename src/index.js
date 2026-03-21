import { paymentQueries, accountQueries, technicalQueries, deliveryQueries } from './services/escalate.js'

// manually tag each complaint with its department name
paymentQueries.forEach(q => q.department = "Finance")
technicalQueries.forEach(q => q.department = "Tech")
deliveryQueries.forEach(q => q.department = "Logistics")
accountQueries.forEach(q => q.department = "Support")

// combine all department arrays into one single array for unified display
const allQueries = []
paymentQueries.forEach(q => allQueries.push(q))
technicalQueries.forEach(q => allQueries.push(q))
deliveryQueries.forEach(q => allQueries.push(q))
accountQueries.forEach(q => allQueries.push(q))

// maps priority names to numbers so sort() can compare them mathematically
// high = 1 (comes first), medium = 2, low = 3 (comes last)
const priorityOrder = { high: 1, medium: 2, low: 3 }

// sort all complaints by final_priority — highest urgency first
allQueries.sort((a, b) => priorityOrder[a.final_priority] - priorityOrder[b.final_priority])

console.log("\n" + "─".repeat(62))  // new line + top border of table
console.log("  ALL VALID COMPLAINTS — FINAL STATE")  // table title
console.log("─".repeat(62))  // separator below title
console.log("  ID    | Department | Final Priority | Escalated | Status")  // column headers
console.log("  " + "─".repeat(58))  // separator below column headers

allQueries.forEach(q => {
  const id        = q.complaint_id.padEnd(5)    // pad to 5 chars to keep ID column aligned
  const dept      = q.department.padEnd(10)     // pad to 10 chars to keep department column aligned
  const priority  = q.final_priority.padEnd(14) // pad to 14 chars to keep priority column aligned
  const escalated = q.escalation === "escalated" ? "Yes 🔴" : "No  🟢"  // escalation status with icon
  const status    = q.status === "resolved" ? "Resolved ✅" : "Unresolved"  // resolution status with icon

  console.log(`  ${id} | ${dept} | ${priority} | ${escalated}  | ${status}`)  // print formatted row
})

console.log("─".repeat(62))  // bottom border of table