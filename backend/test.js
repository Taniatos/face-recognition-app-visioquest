const fetch = require("node-fetch");

(async () => {
  const r = await fetch("http://localhost:3001/imageurl", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: "https://samples.clarifai.com/face-det.jpg" }),
  });

  const data = await r.json();
  console.log("HTTP:", r.status);
  console.dir(data, { depth: null });
})();

// 
const PAT = process.env.PAT;
const USER_ID = "taniatos";
const APP_ID = "face-test-app";
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";