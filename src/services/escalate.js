import { paymentQueries, accountQueries, technicalQueries, deliveryQueries } from './priority.js'


// assigns escalation on the basis of final priority
function escalator(deptQueries){
  deptQueries.forEach((query)=>{
    if (query.final_priority === "high") {
      query.escalation = "escalated"
    } else if (query.final_priority === "medium") {
      query.escalation = "escalated"
    } else {
      query.escalation = "not escalated"
    }
  })
    
}

// run priority and escalation logic for all departments
escalator(paymentQueries)
escalator(accountQueries)
escalator(technicalQueries)
escalator(deliveryQueries)

export { paymentQueries, accountQueries, technicalQueries, deliveryQueries }