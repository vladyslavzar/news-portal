export const getComentsOnArticle = async () => {
    const res = await fetch(`http://localhost:3000/comments`,{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    if (!res.ok) {
        console.log(`Error, error status: ${res.status}`);
        return;
    }

    const data = await res.json();

    return data;
}

export const postComment = async (title, nickname, pfp, content, email) => {
    let lastId = 1;
    let ifFound = false;

    await getComentsOnArticle()
                    .then(res => {
                        if (!res.length) return;

                         lastId=res[res.length-1].id + 1;

                        if(res[0].postTitle === title) {
                            ifFound = true;
                        }
                        
                        res.forEach(item => {
                            
                            if (item.postTitle === title) {
                                ifFound = true;
                                let lastId = 1;
                                if (item.postComments.length) {
                                    lastId = item.postComments[item.postComments.length-1].id + 1;
                                }

                                const newComment = [
                                    {
                                      id: lastId,
                                      email: email,
                                      nickname: nickname,
                                      content: content,
                                      pfp: pfp,
                                      likes: 0,
                                      dislikes: 0
                                    }
                                ]
                        
                                const generatedObj = {
                                    postTitle: title,
                                    postComments: item.postComments.concat(newComment)
                                }
                                
                                console.log(item.postComments.concat(newComment), 'concat');
                                
                        
                                fetch(`http://localhost:3000/comments/${item.id}`,{
                                    method: 'PUT',
                                    headers : {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(generatedObj)
                                })
                                .then(res => res.json())
                                .then(data => console.log(data, 'data'));
                        
                                
                            }
                        });
                    });
                    
    console.log(ifFound);

    if (ifFound) return;

    const generatedObj = {
        id: lastId,
        postTitle: title,
        postComments: [
          {
            id: 1,
            email: email,
            nickname: nickname,
            content: content,
            pfp: pfp,
            likes: 0,
            dislikes: 0
          }
        ]
    }

    await fetch(`http://localhost:3000/comments/`,{
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(generatedObj)
        })
        .then(res => res.json())
        .then(data => console.log(data, 'data'));

}

export const reactToComment = async (isLike, articleId, commentId, email) => {


    // inc comm like/dislike

    fetch(`http://localhost:3000/comments/${articleId}`,{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(data => data.json())
    .then(res => {
        let ifReturn = false

        fetch(`http://localhost:3000/userActions`,{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(data => data.json())
        .then(res => {
            let arr = res ? res : [];
            
            if(arr && arr.length) {
                arr.forEach(item => {
                    if (item.email === email) {
                        item.actions.forEach(item => {
                            if (item.commentId === commentId) {
                                ifReturn = true;
                            }
                        })
                    }
                })
            }

        })

        if (ifReturn) return;

        let generatedObj = res;

        console.log(generatedObj, 'generatedObj');

        generatedObj.postComments.forEach((item, i) => {
            if (item.id === commentId) {
                if(isLike){
                    generatedObj.postComments[i].likes++;
                }else {
                    generatedObj.postComments[i].dislikes++;
                }
                
            }
        })
        fetch(`http://localhost:3000/comments/${commentId}`,{
            method: 'PUT',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(generatedObj)
        })
        .then(res => res.json())
        .then(data => console.log(data, 'data'));
    })

    let userId = 1;

    fetch(`http://localhost:3000/userActions`,{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(data => data.json())
    .then(res => {
        if (res.length) {
            userId = res[res.length - 1] + 1;
            res.forEach(item => {
                if (item.email === email) {
                    let lastCommId = 1;
                    lastCommId = item.actions[item.actions.length - 1] + 1;

                    const newReaction = {
                        id: lastCommId,
                        postId: articleId,
                        commentId: commentId,
                        like: isLike                        
                    }

                    const generatedObj = {
                        email: item.email,
                        actions: item.actions.concat(newReaction)
                    }
                    
                    
            
                    fetch(`http://localhost:3000/userActions/${item.id}`,{
                        method: 'PUT',
                        headers : {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(generatedObj)
                    })
                    .then(res => res.json())
                    .then(data => console.log(data, 'data'));
                }
            })
        }
    
    })


    const generatedObj = {
        id: userId,
        email: email,
        actions : [
          {
            id: 1,
            postId: articleId,
            commentId: commentId,
            like: isLike
          }
        ]
    }

    await fetch(`http://localhost:3000/userActions/`,{
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(generatedObj)
        })
        .then(res => res.json())
        .then(data => console.log(data, 'data'));
}

export const deleteComment = (articleId, commentId) => {
    fetch(`http://localhost:3000/comments/${articleId}`,{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(data => data.json())
    .then(res => {
        res.postComments.forEach((item, i) => {
            if(item.id === commentId){
                res.postComments.splice(i, 1);             
            }
        })
        fetch(`http://localhost:3000/comments/${articleId}`,{
            method: 'PUT',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(res)
        })
        .then(res => res.json())
        .then(data => console.log(data, 'data'));
    })
}