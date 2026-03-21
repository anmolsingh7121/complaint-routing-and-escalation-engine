const complaints = [

  // TC1 — valid, regular customer, high priority payment issue
  {
    complaint_id: "C001",
    issue_type: "payment",
    priority: "high",
    customer_type: "regular",
    created_time: "2025-01-15T10:30:00",
    status: "unresolved"
  },

  // TC2 — valid, regular customer, low priority technical issue
  {
    complaint_id: "C002",
    issue_type: "technical",
    priority: "low",
    customer_type: "regular",
    created_time: "2025-01-10T08:00:00",
    status: "unresolved"
  },

  // TC3 — valid, already resolved complaint (should be skipped)
  {
    complaint_id: "C003",
    issue_type: "delivery",
    priority: "medium",
    customer_type: "premium",
    created_time: "2025-01-14T09:00:00",
    status: "resolved"
  },

  // TC4 — invalid, duplicate complaint_id (C001 already exists)
  {
    complaint_id: "C001",
    issue_type: "payment",
    priority: "high",
    customer_type: "regular",
    created_time: "2025-01-15T11:00:00",
    status: "unresolved"
  },

  // TC5 — invalid, missing mandatory field (no priority)
  {
    complaint_id: "C004",
    issue_type: "technical",
    customer_type: "regular",
    created_time: "2025-01-13T07:00:00",
    status: "unresolved"
  },

  // TC6 — invalid, malformed timestamp
  {
    complaint_id: "C005",
    issue_type: "delivery",
    priority: "medium",
    customer_type: "premium",
    created_time: "not-a-date",
    status: "unresolved"
  },

  // TC7 — invalid, wrong priority value
  {
    complaint_id: "C006",
    issue_type: "account",
    priority: "urgent",
    customer_type: "regular",
    created_time: "2100-01-12T06:00:00",  // future date, bumped to 2100
    status: "unresolved"
  },

  // TC8 — valid, old unresolved complaint (should trigger escalation)
  {
    complaint_id: "C007",
    issue_type: "payment",
    priority: "medium",
    customer_type: "regular",
    created_time: "2024-12-01T10:00:00",  // still old enough to escalate
    status: "unresolved"
  },

  // TC9 — valid, unknown issue_type
  {
    complaint_id: "C008",
    issue_type: "unknown",
    priority: "low",
    customer_type: "regular",
    created_time: "2025-01-15T08:00:00",
    status: "unresolved"
  },

  // TC10 — invalid, wrong customer_type value
  {
    complaint_id: "C009",
    issue_type: "technical",
    priority: "high",
    customer_type: "vip",
    created_time: "2025-01-15T09:00:00",
    status: "unresolved"
  },

  // TC11 — invalid, completely empty object
  {
  },

  // TC12 — invalid, all fields are empty strings
  {
    complaint_id: "",
    issue_type: "",
    priority: "",
    customer_type: "",
    created_time: "",
    status: ""
  },

  // TC13 — invalid, missing complaint_id
  {
    complaint_id: null,
    issue_type: "payment",
    priority: "high",
    customer_type: "premium",
    created_time: "2025-01-15T10:30:00",
    status: "unresolved"
  },

  // TC14 — valid, premium customer with low priority (priority should be bumped up)
  {
    complaint_id: "C010",
    issue_type: "technical",
    priority: "low",
    customer_type: "premium",
    created_time: "2025-01-15T10:30:00",
    status: "unresolved"
  },

  // TC15 — valid, old premium complaint (should escalate faster than regular)
  {
    complaint_id: "C011",
    issue_type: "account",
    priority: "medium",
    customer_type: "premium",
    created_time: "2024-11-01T10:00:00",  // still old enough for early escalation
    status: "unresolved"
  },

  // TC16 — invalid, future timestamp
  {
    complaint_id: "C012",
    issue_type: "delivery",
    priority: "medium",
    customer_type: "regular",
    created_time: "2100-01-15T10:30:00",  // bumped to 2100 to keep it future
    status: "unresolved"
  },

  // TC17 — valid, unknown issue_type
  {
    complaint_id: "C013",
    issue_type: "unknown",
    priority: "high",
    customer_type: "premium",
    created_time: "2025-01-14T10:30:00",
    status: "unresolved"
  },

  // TC18 — invalid, wrong status value
  {
    complaint_id: "C014",
    issue_type: "payment",
    priority: "high",
    customer_type: "premium",
    created_time: "2025-01-15T10:30:00",
    status: "pending"
  },

  // TC19 — valid, two complaints same customer same issue (not duplicate, different id)
  {
    complaint_id: "C015",
    issue_type: "payment",
    priority: "high",
    customer_type: "premium",
    created_time: "2023-01-15T10:30:00",  // kept old for escalation testing
    status: "unresolved"
  },
  {
    complaint_id: "C016",
    issue_type: "payment",
    priority: "high",
    customer_type: "premium",
    created_time: "2025-01-15T10:30:00",
    status: "resolved"
  },

  // TC20 — invalid, numeric complaint_id instead of string
  {
    complaint_id: 12345,
    issue_type: "technical",
    priority: "low",
    customer_type: "regular",
    created_time: "2025-01-15T10:30:00",
    status: "unresolved"
  }
,
  // TC21 — same date, same customer type → original order kept
 // TC21 — gets medium priority via: not old + premium + high priority (0+1+1 = 2 points)
{
  complaint_id: "C017",
  issue_type: "payment",
  priority: "high",          // point 3 ✅
  customer_type: "premium",  // point 2 ✅
  created_time: "2025-01-15T10:30:00",  // not old → no point
  status: "unresolved"
},

// TC22 — gets medium priority via: old + not premium + not high (1+0+0 = 1 point)
// wait this gives low not medium

// correct TC22 — gets medium via: old + premium + not high (1+1+0 = 2 points)
{
  complaint_id: "C018",
  issue_type: "payment",
  priority: "medium",        // no point
  customer_type: "premium",  // point 2 ✅
  created_time: "2023-01-01T10:30:00",  // older than 545 days → point 1 ✅
  status: "unresolved"
}

// expected result:
// C017 stays before C018 → original order kept ✅
// sort returns 0 → no swap happens
];

export default complaints;