import http from './http';

export function getPosts() {
  return http({
    url: 'posts',
    method: 'GET',
  });
}
export function deletePost(params) {
  return http({
    url: `posts/${params}`,
    method: 'DELETE',
  });
}
export function updatePost(params, data) {
  return http({
    url: `posts/${params}`,
    method: 'PATCH',
    data,
  });
}
