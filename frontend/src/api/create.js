export function create(data) {
  return fetch(
    "http://elb-192069193.ap-northeast-2.elb.amazonaws.com:3333/api/article",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((resp) => resp.json());
}
