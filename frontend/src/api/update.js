export function update(id, data) {
  return fetch(
    `http://elb-192069193.ap-northeast-2.elb.amazonaws.com:3333/api/article/${id}`,
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
