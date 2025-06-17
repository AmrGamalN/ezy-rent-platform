db = db.getSiblingDB("admin");

try {
  rs.initiate({
    _id: "rs0",
    members: [
      { _id: 0, host: "mongo1:27017", priority: 3 },
      { _id: 1, host: "mongo2:27017", priority: 2 },
      { _id: 2, host: "mongo3:27017", priority: 1 },
    ],
  });
  print("Replica Set initiated");
} catch (e) {
  print("Replica already exists or failed:", e.message);
}

function waitUntilPrimary(maxRetries = 60, intervalMs = 2000) {
  for (let i = 0; i < maxRetries; i++) {
    const isMaster = db.isMaster();
    if (isMaster.ismaster) {
      print("PRIMARY confirmed");
      return;
    }
    print("Waiting for PRIMARY...");
    sleep(intervalMs);
  }
  throw new Error("Timeout: No PRIMARY");
}

waitUntilPrimary();

const user = db.getUser("root");
if (!user) {
  db.createUser({
    user: "root",
    pwd: "example",
    roles: [{ role: "root", db: "admin" }],
  });
  print("User created");
} else {
  print("User already exists");
}
