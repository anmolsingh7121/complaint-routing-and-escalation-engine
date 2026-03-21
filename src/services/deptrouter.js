import validComplaints from "../models/complaint.js";

// separate arrays to hold complaints for each department
let paymentQueries = [];
let accountQueries = [];
let deliveryQueries = [];
let technicalQueries = [];

// route each valid complaint to its department
validComplaints.forEach((complaint) => {
  toDepartment(complaint)
})

// routes a complaint to the correct department array based on issue_type
// switch is used instead of if-else for cleaner routing logic
// no default case needed — invalid issue types are already rejected in complaint.js
function toDepartment(complaint) {
  switch(complaint.issue_type) {
    case "payment":
      paymentQueries.push(complaint)
      break;

    case "account":
      accountQueries.push(complaint)
      break;

    case "technical":
      technicalQueries.push(complaint)
      break;

    case "delivery":
      deliveryQueries.push(complaint)
      break;
  }
}

export { accountQueries, paymentQueries, technicalQueries, deliveryQueries }