export function create(data) {
  return fetch("http://127.0.0.1:3333/api/article", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((resp) => resp.json());
}
