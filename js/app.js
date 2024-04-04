let posts = [
   {
      'id': 1,
      'title': 'JS1',
      'body': 'JavaScript1'
   },
   {
      'id': 2,
      'title': 'JS2',
      'body': 'JavaScript2'
   },
   {
      'id': 3,
      'title': 'JS3',
      'body': 'JavaScript3'
   },
]

function removePost(post){
   posts = posts.filter(p => p.id !== post.id)
   postList()
}

const postList = () => {
   const section = document.querySelector('#postList')
   section.innerHTML = ''
   
   for (const post of posts) {
      let article = document.createElement('article')
      let div = document.createElement('div')
      let title = document.createElement('p')
      let body = document.createElement('p')
      let btn = document.createElement('button')
      btn.innerText = 'Delete'
      btn.classList.add('btn')
      btn.addEventListener('click', () => {
         removePost(post)
      })
      
      section.appendChild(article)

      title.innerHTML = `Title: <b>${post.title}</b>`
      body.innerHTML = `Body: <b> ${post.body}</b>`
      
      article.appendChild(div)
      div.appendChild(title)
      div.appendChild(body)
      article.appendChild(btn)
   }
  

}

postList()

const postForm = () => {
   const btn = document.querySelector('#postForm button')
   btn.addEventListener('click', (e) => {
      let title = document.querySelector('#title')
      let body = document.querySelector('#body')
      const newPost = {
         'id': new Date().getTime(),
         'title': title.value,
         'body': body.value
      }
      posts.push(newPost)
      title.value = ''
      body.value = ''
      e.preventDefault()
      postList()
   })
}

postForm()