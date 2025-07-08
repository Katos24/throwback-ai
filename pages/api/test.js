export default function handler(req, res) {
  console.log("Test API route hit, method:", req.method);
  res.status(200).json({ message: "Test successful" });
}