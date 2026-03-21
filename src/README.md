# Complaint Routing and Escalation Engine

## What is this project?
→ A complaint routing and escalation engine that processes
  incoming complaints and routes them to the correct department,
  assigns priority, and flags complaints for escalation.

## Requirements
→ Node.js v18 or above

## Steps
→ clone the repo
→ run: node src/index.js

## Project Structure

src/
  models/
    complaint.js     → validates complaints, filters invalid ones
  services/
    deptrouter.js    → routes complaints to departments
    priority.js      → assigns final_priority using 3-point scoring system
    escalate.js      → assigns escalation status based on final_priority
  test/
    testcases.js     → 22 test cases covering edge cases
  index.js           → ties everything together, prints final output

## Logic Explanation

### Validation
→ rejects missing fields, invalid formats, duplicate ids,
  future timestamps, wrong field values

### Department Routing
→ payment   → Finance
→ technical → Tech
→ delivery  → Logistics
→ account   → Support
→ unknown   → rejected

### Priority Engine (point system)
→ 1 point if complaint is older than 545 days
→ 1 point if customer is premium
→ 1 point if original priority is high
→ 3 points = high final priority
→ 2 points = medium final priority
→ 0-1 points = low final priority

### Escalation
→ high and medium priority complaints are escalated
→ low priority complaints are not escalated

### Conflict Resolution (equal urgency)
→ if two complaints have the same final priority
→ older complaint goes first
→ if same date — premium customer goes first

## Assumptions
→ complaint_id must follow format C + digits (C001, C002)
→ unknown issue types are rejected as invalid
→ resolved complaints are still validated but kept in output
→ 545 days threshold chosen as 1.5 years of being unresolved
→ premium customers get priority bump due to higher service expectation

## Test Cases

22 test cases covering:

→ valid complaints (TC1, TC2, TC3)
→ duplicate complaint id (TC4)
→ missing mandatory fields (TC5)
→ malformed timestamp (TC6)
→ invalid priority value (TC7)
→ old unresolved complaint for escalation testing (TC8)
→ unknown issue type — rejected (TC9, TC17)
→ invalid customer type (TC10)
→ empty object (TC11)
→ all fields empty strings (TC12)
→ null complaint id (TC13)
→ premium customer low priority — priority bump tested (TC14)
→ old premium complaint — early escalation tested (TC15)
→ future timestamp (TC16)
→ invalid status value (TC18)
→ same customer same issue different ids — not a duplicate (TC19)
→ numeric complaint id instead of string (TC20)
→ same final priority via different point combinations — conflict resolution tested (TC21, TC22)

## Known Limitations
→ faulty complaint text detection not implemented
  (assignment uses structured input not free text)
→ unknown issue types are rejected rather than routed
→ no database — all data is hardcoded in testcases.js
→ escalation threshold is fixed at 545 days — not configurable