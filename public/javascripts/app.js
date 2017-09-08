
//favorite the item
function toggleFollow(element){
  let item = element.closest('li');
  let button = element;
  let url = button.innerHTML === 'Unfollow'? '/api/unfollow' : '/api/follow';
  fetch(url+item.id,{method:'post'}).then(
    res =>console.log(res)
  )
}
