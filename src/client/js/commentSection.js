const { default: fetch } = require("node-fetch");

const form = document.getElementById("commentForm");
const videoContainer = document.getElementById("videoContainer");
const deleteBtn = document.querySelectorAll(".video__comment-delete");

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id  = id;
    newComment.classList.add("video__comment");
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const span2 = document.createElement("span");
    span2.innerText = "❌";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
};

const handleSubmit = async (event) =>{
    event.preventDefault();
    const textarea = form.querySelector("textarea");    
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;    

    if(text===""){
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method:"POST",
        headers: { //express.json()을 쓰기 위함
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text,
        }),
    });    
    
    //realtime comment add   
    if(response.status === 201){
        textarea.value = "";    
        //fake comment에 id받아오기
        const {newCommentId} = await response.json();
        addComment(text, newCommentId);
    }
};
if(form){
    form.addEventListener("submit",handleSubmit);
}

//delete comment
const handleDelete = (event) =>{    
    console.log(event.target.parentElement.dataset.id);    
};

deleteBtn.forEach( (btn) => {
    btn.addEventListener("click", handleDelete);
});