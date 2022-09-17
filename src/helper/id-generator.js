export default function generateID() {
  var base = "id";
  var now = new Date().getTime();
  var random = Math.floor(Math.random() * 100000);
  return base + now + random;
}
