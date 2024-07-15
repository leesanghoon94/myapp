export function readAll() {
  return () =>
    fetch(`http://127.0.0.1:3333/api/article/`)
      .then((res) => res.json())
      .then((arr) => arr.reverse());
}

export function readOne(id) {
  return () =>
    fetch(`http://127.0.0.1:3333/api/article/${id}`).then((resp) =>
      resp.json()
    );
}
