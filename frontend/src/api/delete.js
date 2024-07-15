export function deleteOne(id) {
  return fetch(`http://127.0.0.1:3333/api/article/${id}`, {
    method: "DELETE",
    mode: "cors",
  }).then((resp) => resp.json());
}
