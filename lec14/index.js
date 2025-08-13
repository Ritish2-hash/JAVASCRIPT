//by id
let el1= document.getElementById("hometitle");
console.log(el1);

//by classname
let el2=document.getElementsByClassName("user item");
console.log(el2[2]);


let el3=document.getElementsByClassName("user list headiing");
console.log(el3);// collection
console.log(el3[0]);// element

//by tagname
let el4=document.getElementsByTagName("p");
console.log(el4); //collection


//by**queryselector**//

let el5=document.querySelector("hometitle");
console.log(el5);

let el6 = document.querySelector(".user item");
let el7 = document.querySelectorAll(".user item");
console.log(el6);
console.log(el7);


let el8=document.querySelector("p")
console.dir(el8);

//prperties
//1.inner text
//2.inner html
//3.test content
let userlist = document.querySelector(".user-list")

let content= el8.innerText
console.log(content);

let userlistcontent=userlist.innerText
console.log(userlistcontent);

let userlistcontent2 =userlist.innerHTML
console.log(userlistcontent2);

el8.innerText="set using javascript"

userlist.innerText = "<li>Usernone</li>\n<li>User Two</li>";

userlist.innerHTML = "<li>Usernone</li><li>User Two</li>";


/*parent
child
sibling*/

let li =document.querySelector("li")
console.dir(li);
console.log(li.parentElement.parentElement.previousElementSibling)