import complaints from "../test/testcases.js";

// tracks complaint ids that have passed all validation checks
let processedIds = [];
var validComplaints = []

complaints.forEach((complaint)=>{
    isValidComplaint(complaint);
})

function isValidComplaint(complaint){

    // reject if complaint is empty or any mandatory field is missing
    if (!complaint || !complaint.complaint_id || !complaint.issue_type || !complaint.priority || !complaint.customer_type || !complaint.created_time || !complaint.status){
        return false;
    }

    // complaint_id must be a string and follow the format C + digits (e.g. C001)
    if (typeof complaint.complaint_id !== 'string' || !/^C\d+$/.test(complaint.complaint_id)){
        return {validation : false , reason: "Not a valid complaint id"}
    }

    // reject if same complaint_id has already been processed
    if (processedIds.includes(complaint.complaint_id)){
        return {validation: false , reason: "Duplicate complaint id"}
    }

    // only allow known issue types — unknown types are rejected
    if(!["payment", "technical","account", "delivery"].includes(complaint.issue_type)){
        return {validation: false, reason: "Issue type wrong"}
    }

    // priority must be one of the three accepted values
    if(!["high", "medium", "low"].includes(complaint.priority)){
        return {validation: false, reason: "Priority type wrong"}
    }

    // customer type must be either premium or regular
    if(!["premium", "regular"].includes(complaint.customer_type)){
        return {validation: false, reason: "Invalid customer type"}
    }

    // timestamp must match specific format and must not be a future date
    if(!/^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}$/.test(complaint.created_time) || new Date(complaint.created_time) > new Date()){
        return {validation: false, reason:"Invalid Time Stamp"}
    }

    // status must be either resolved or unresolved
    if(!["resolved", "unresolved"].includes(complaint.status)){
        return {validation: false, reason:"Invalid Status"}
    }

    // complaint passed all checks — add its id to processedIds
    processedIds.push(complaint.complaint_id)
}

// build validComplaints by matching full complaint objects against processedIds
// processedIds is cleaned up after each match to prevent any accidental reuse
complaints.forEach((complaint)=>{
    if(processedIds.includes(complaint.complaint_id)){
        validComplaints.push(complaint);
        processedIds = processedIds.filter((id)=> id!== complaint.complaint_id)
    }
})

export default validComplaints;