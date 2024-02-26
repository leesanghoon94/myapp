export function readAll() {
  return () =>
    fetch(`http://10.1.1.144:3333/api/article/`)
      .then((res) => res.json())
      .then((arr) => arr.reverse());
}

export function readOne(id) {
  return () =>
    fetch(`http://localhost:3333/api/article/${id}`).then((resp) =>
      resp.json()
    );
}
