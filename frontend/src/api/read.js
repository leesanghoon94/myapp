export function readAll() {
  return () =>
    fetch(
      `http://alb-controller-1582272261.ap-northeast-2.elb.amazonaws.com/api/article/`
    )
      .then((res) => res.json())
      .then((arr) => arr.reverse());
}

export function readOne(id) {
  return () =>
    fetch(
      `http://alb-controller-1582272261.ap-northeast-2.elb.amazonaws.com/api/article/${id}`
    ).then((resp) => resp.json());
}
