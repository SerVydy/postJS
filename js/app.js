let posts = []
let countPost = 0
let limit = 15
let page = 1
let isPaginator = false

const loadPosts = async () => {
   const params = new URLSearchParams({_limit: limit, _page: page }).toString();
   const respons = await fetch(`https://jsonplaceholder.typicode.com/posts?${params}`)
   posts = await respons.json()
   countPost = respons.headers.get('X-Total-Count')
   console.log(countPost)
   if (!isPaginator){
      paginator()
   }
   
   postList()
}

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

      title.innerHTML = `ID - ${post.id} <br> Title: <b>${post.title}</b>`
      body.innerHTML = `Body: <b> ${post.body}</b>`
      
      article.appendChild(div)
      div.appendChild(title)
      div.appendChild(body)
      article.appendChild(btn)
   }
  

}



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

const sortPost = () => {
   const sort = document.querySelector('#sort select')

   sort.addEventListener('change', () => {
      posts.sort((post1, post2) => {
         return post1[sort.value].localeCompare(post2[sort.value])
      })
      postList()
   })
   
}

const paginator = () => {
   isPaginator = true
   let maxPages = Math.ceil(countPost/limit)
   console.log(maxPages)
   const section = document.querySelector('#paginator')
   for (let index = 1; index <= maxPages; index++) {
      let div = document.createElement('div')
      div.innerHTML = index
      if (index === page){
         div.classList.add('active')
      }
      div.addEventListener('click', (event) => {
         page = event.target.innerHTML
         removeActivePaginator()
         event.target.classList.add('active')
         console.log(page)
         loadPosts()
      })
      section.appendChild(div)
   }
   
}

function removeActivePaginator(){
   const divs = document.querySelectorAll('#paginator div')
   for (const div of divs) {
      div.classList.remove('active')
   }
}

loadPosts()

postList()
postForm()
sortPost()