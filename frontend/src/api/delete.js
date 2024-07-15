export function deleteOne(id) {
  return fetch(
    `http://alb-controller-1582272261.ap-northeast-2.elb.amazonaws.com/api/article/${id}`,
    {
      method: "DELETE",
      mode: "cors",
    }
  ).then((resp) => resp.json());
}
