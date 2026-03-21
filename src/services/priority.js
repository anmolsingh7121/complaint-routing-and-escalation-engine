import {accountQueries, paymentQueries, technicalQueries, deliveryQueries} from './deptrouter.js'

function priorityCheck(deptQueries){
  deptQueries.sort((a, b) => { // sort picks the complaints in pairs and then fetches the data from them and sorts them on the basis of 1, 0 , -1
  const dateA = new Date(a.created_time)
  const dateB = new Date(b.created_time)

  // if dates are different — older comes first
  if (dateA - dateB !== 0) {
    return dateA - dateB
  }

  // if dates are same — premium comes before regular
  if (a.customer_type === "premium" && b.customer_type === "regular") return -1  // a first
  if (a.customer_type === "regular" && b.customer_type === "premium") return 1   // b first
  return 0  // both same type, keep order
})

}
// console.log(paymentQueries)
priorityCheck(paymentQueries)
priorityCheck(accountQueries)
priorityCheck(technicalQueries)
priorityCheck(deliveryQueries)


export {paymentQueries, accountQueries, technicalQueries, deliveryQueries}