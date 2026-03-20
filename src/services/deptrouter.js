import validComplaints from "../models/complaint.js";
let paymentQueries = [];
let accountQueries = [];
let deliveryQueries = [];
let technicalQueries = [];

validComplaints.forEach((complaint)=>{
    // console.log(complaint.issue_type) // why does it give undefined
   toDepartment(complaint)
})

function toDepartment(complaint){
    if(complaint.issue_type === "payment" ){
        paymentQueries.push(complaint)
        return;
    }

    if(complaint.issue_type === "account" ){
        accountQueries.push(complaint)
        return;
    }

    if(complaint.issue_type === "technical" ){
        technicalQueries.push(complaint)
        return;
    }

    if(complaint.issue_type === "delivery" ){
       deliveryQueries.push(complaint)
        return;
    }
}


export {accountQueries, paymentQueries, technicalQueries, deliveryQueries}
