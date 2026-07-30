import http from "http";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify({
    platform: "JUMO DIGITAL ENTERPRISE PLATFORM",
    system: "JUMO UNIVERSAL ENTERPRISE OPERATING SYSTEM",
    status: "Genesis Foundation Running"
  }));
});

server.listen(PORT, () => {
  console.log(`JUMO UEOS running on port ${PORT}`);
});
