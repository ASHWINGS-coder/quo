{
   let createPost = function(){
       let newPostForm = $('#new-post-form');

       newPostForm.submit(function(e){
           e.preventDefault();

           $.ajax({
               type:'post',
               url:'/posts/create',
               data:newPostForm.serialize(),
               success:function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container > ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
               },
               error:function(err){
                   console.log(error.responseText);
               }
           })
       })
   }

   //method to create a post in DOM

   let newPostDom = function(post){
       return $(`
       <li id="post-${post._id}">
    <p>
        <small id="delete">
            <a class="delete-post-button" href="/posts/destroy/${post._id}">
                X
            </a>
        </small>
      ${post.content}
        <br>
       <small> ${post.user.name}   </small>
       <br>
       <small>
       <a data-likes="0" href="/likes/toggle/?id=<%= post._id%>&type=Post">
              0 <i class="far fa-heart"></i>
            </a>
       </small>
    </p>
    <div id="post-comments">
       
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Answer...">
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Answer">
            </form>
   

        <div class="post-comments-list">
                <ul id="post-comments-${post._id}">

                </ul>
        </div>
    </div>
</li>   
       `)
   }

    //method to delete a post from dom
   let deletePost = function(deleteLink){
       $(deleteLink).click(function(e){
           e.preventDefault();

           $.ajax({
               type:"get",
               url:$(deleteLink).prop('href'),
               success:function(data){
                $(`#post-${data.data.   post_id}`).remove()
               },
               error:function(error){
                console.log(error.responseText);
               }
           })
       })
   }
   createPost();
}