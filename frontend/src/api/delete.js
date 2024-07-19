export function deleteOne(id) {
  return fetch(`http://server:3333/api/article/${id}`, {
    method: "DELETE",
    mode: "cors",
  }).then((resp) => resp.json());
}
