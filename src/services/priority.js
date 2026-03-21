import {accountQueries, paymentQueries, technicalQueries, deliveryQueries} from './deptrouter.js'


// calculates how many days old a complaint is from today
function daysOld(created_time) {
  const now = new Date()
  const created = new Date(created_time)
  var diff = now - created                              // difference in milliseconds
  var days = Math.floor(diff / (1000 * 60 * 60 * 24))  // convert milliseconds to days
  return days
}

function newPriority(deptQueries) {
  deptQueries.forEach((query) => {
    let point = 0

    // point 1 — complaint has been unresolved for more than 545 days
    if (daysOld(query.created_time) > 545) point++

    // point 2 — premium customers get higher urgency
    if (query.customer_type === "premium") point++

    // point 3 — complaint was already marked high priority on input
    if (query.priority === "high") point++

    if (point === 3) {
      query.final_priority = "high"
    } else if (point === 2) {
      query.final_priority = "medium"

    } else {
      query.final_priority = "low"

    }
  })
}




// console.log(paymentQueries)
newPriority(paymentQueries)
newPriority(accountQueries)
newPriority(technicalQueries)
newPriority(deliveryQueries)


export {paymentQueries, accountQueries, technicalQueries, deliveryQueries}