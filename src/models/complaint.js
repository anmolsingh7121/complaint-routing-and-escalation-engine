var complain = "       ".trim().toLowerCase()

// Helper function to check whole-word keywords
function containsKeyword(text, keyword) {
  return new RegExp(`\\b${keyword}`).test(text);
}

// These keywords will be from finance based complaints 
const highPriorityKeywords = [
  "money",
  "refund",
  "fraud",
  "scam",
  "unauthorized",
  "charged",
  "payment failed",
  "deducted",
  "not delivered",
  "missing",
  "bank",
  "account"
];

const mediumPriorityKeywords = [
  "delay",
  "late",
  "delayed",
  "wrong item",
  "incorrect item",
  "damaged",
  "defective",
  "not working",
  "replacement",
  "exchange",
  "where is my order",
  "i need help"
];


// Mostly these keywords will be from experienced based complaints
const lowPriorityKeywords = [
  "slow",
  "packaging",
  "damaged box",
  "color",
  "size issue",
  "not satisfied",
  "quality",
  "feedback",
  "suggestion",
  "improve"


];

// faulty complaints 
const faultyComplaints = [
  "bad",
  "worst worst worst worst",
  "aaaaaaa",
  "!!!!!!!!!",
  "you are stupid",
  "not good",
  "asdfghjkl",
  "fix this now",
  "delay delay delay delay",
  "i hate this app",
    "this app sucks",
    "worst service ever" ,
    "u guys are trash",
    "???????????",
    "abc"
];

const isHigh = highPriorityKeywords.some(k => containsKeyword(complain, k))
const isMedium = mediumPriorityKeywords.some(k => containsKeyword(complain, k))
const isLow = lowPriorityKeywords.some(k => containsKeyword(complain, k));

const hasKeyword =
  isHigh || isMedium || isLow

  console.log(hasKeyword)

// for every complaint it should not be less than 4 char and for every faulty keyword the keyword should not exist in the complaint 
if 
  ((complain.length < 4 && !hasKeyword) || faultyComplaints.some(keyword => complain.includes(keyword))){
    console.log("Faulty complaint");
}
else if(isHigh){
    console.log("High priority")
}
else if(isMedium){
    console.log("Medium priority")
}
else {
    console.log(`Low priority`)
}


