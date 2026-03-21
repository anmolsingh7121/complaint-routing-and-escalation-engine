import { paymentQueries, accountQueries, technicalQueries, deliveryQueries } from './priority.js'

// calculates how many days old a complaint is from today
function daysOld(created_time) {
  const now = new Date()
  const created = new Date(created_time)
  var diff = now - created                              // difference in milliseconds
  var days = Math.floor(diff / (1000 * 60 * 60 * 24))  // convert milliseconds to days
  return days
}

// assigns final_priority and escalation status to each complaint
// using a 3 point system:
//   1 point → complaint is older than 545 days (1.5 years)
//   1 point → customer is premium
//   1 point → original priority is high
// 3 points → high priority + escalated
// 2 points → medium priority + escalated
// 0-1 points → low priority + not escalated
function newPriority(deptQueries) {
  deptQueries.forEach((query) => {
    let point = 0

    // point 1 — complaint has been unresolved for more than 545 days
    if (daysOld(query.created_time) > 545) point++

    // point 2 — premium customers get higher urgency
    if (query.customer_type === "premium") point++

    // point 3 — complaint was already marked high priority on input
    if (query.priority === "high") point++

    // assign final priority and escalation based on total points
    if (point === 3) {
      query.final_priority = "high"
      query.escalation = "escalated"
    } else if (point === 2) {
      query.final_priority = "medium"
      query.escalation = "escalated"
    } else {
      query.final_priority = "low"
      query.escalation = "not escalated"
    }
  })
}

// run priority and escalation logic for all departments
newPriority(paymentQueries)
newPriority(accountQueries)
newPriority(technicalQueries)
newPriority(deliveryQueries)

export { paymentQueries, accountQueries, technicalQueries, deliveryQueries }