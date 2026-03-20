import complaints from "../test/testcases.js";  // importing test cases from another file


var processedIds = [];  // array needs to be declared before it is getting used 
complaints.forEach((complaint)=>{  // looping over each complaint from the complaints array 
    isValidComplaint(complaint);
})



function isValidComplaint(complaint){
    if (!complaint || !complaint.complaint_id || !complaint.issue_type || !complaint.priority || !complaint.customer_type || !complaint.created_time || !complaint.status){
        return false;
    }

    if (typeof complaint.complaint_id !== 'string' || !/^C\d+$/.test(complaint.complaint_id)){
        return {validation : false , reason: "Not a valid complaint id"}
    }

    if (processedIds.includes(complaint.complaint_id)){
        console.log(complaint.complaint_id)
        return {validation: false , reason: "Duplicate complaint id"}
    }

    if(!["payment", "technical","account", "delivery"].includes(complaint.issue_type)){
        console.log(complaint.issue_type)
        return {validation: false, reason: "Issue type wrong"}
    }

    if(!["high", "medium", "low"].includes(complaint.priority)){
        console.log(complaint.priority)
        return {validation: false, reason: "Priority type wrong"}
    }

    if(!["premium", "regular"].includes(complaint.customer_type)){
        console.log(complaint.customer_type)
        return {validation: false, reason: "Priority type wrong"}
    }


    if(!/^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}$/.test(complaint.created_time)){
        console.log(complaint.created_time)
        return {validation: false, reason:"Invalid Time Stamp"}
    }

    if(!["resolved", "unresolved"].includes(complaint.status)){
        console.log(complaint.status)
        return {validation: false, reason:"Invalid Status"}
    }

    processedIds.push(complaint.complaint_id)




}