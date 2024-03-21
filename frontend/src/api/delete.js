export function deleteOne(id) {
  return fetch(
    `http://elb-192069193.ap-northeast-2.elb.amazonaws.com:3333/api/article/${id}`,
    {
      method: "DELETE",
      mode: "cors",
    }
  ).then((resp) => resp.json());
}
