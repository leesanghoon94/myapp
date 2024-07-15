export function update(id, data) {
  return fetch(
    `http://alb-controller-1582272261.ap-northeast-2.elb.amazonaws.com/api/article/${id}`,
    {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((resp) => resp.json());
}
