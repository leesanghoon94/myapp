export function readAll() {
  return () =>
    fetch(
      `http://elb-192069193.ap-northeast-2.elb.amazonaws.com:3333/api/article/`
    )
      .then((res) => res.json())
      .then((arr) => arr.reverse());
}

export function readOne(id) {
  return () =>
    fetch(
      `http://elb-192069193.ap-northeast-2.elb.amazonaws.com:3333/api/article/${id}`
    ).then((resp) => resp.json());
}
