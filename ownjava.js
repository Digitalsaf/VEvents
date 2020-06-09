let form = document.getElementById("register");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let one = document.getElementById("validationCustom01");
  let two = document.getElementById("validationCustom02");
  let three = document.getElementById("validationCustom03");
  let four = document.getElementById("validationCustom05");
  let five = document.getElementById("exampleFormControlFile1").files[0];
  console.log(one.value, two.value, three.value, four.value);
  let newEvent = {
    title: one.value,
    description: two.value,
    location: three.value,
    date: four.value,
    upvote: 0,
  };
  

  // get your select image

  // get your image name

  // create storage thing
  let storageRef = firebase.storage().ref("event_imgs/" + five.name);
  // other
  // upload file

  let task = storageRef.put(five);
  task.on(
    "state_changed",
    function (snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("upload is " + progress + " done");
    },
    function (error) {
      console.log(error.message);
    },
    function () {
      task.snapshot.ref.getDownloadURL().then(function (getDownloadURL) {
        console.log(getDownloadURL);
        newEvent.url = getDownloadURL; 
        db.collection("Events").add(newEvent);
      });
    }
  );
  register.reset()
 
});
console.log();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASp-NPFQVBHqz0D2DlPHHh3PrPt9-PJGg",
  authDomain: "vevents-dbc46.firebaseapp.com",
  databaseURL: "https://vevents-dbc46.firebaseio.com",
  projectId: "vevents-dbc46",
  storageBucket: "vevents-dbc46.appspot.com",
  messagingSenderId: "280352398445",
  appId: "1:280352398445:web:a050d39a51dcc265977364",
  measurementId: "G-QFTKD3KLXM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

db.collection('Events').orderBy('upvote','desc').onSnapshot(renderEvents)





function renderEvents(fireBaseRecords) {
  let boxEvent = document.getElementById("EventLog");
  boxEvent.innerHTML = "";
  fireBaseRecords.forEach((record) => {
    
    console.log("id:", record.id);
    console.log("data:", record.data());

    let evt = record.data();
    console.log(evt.title, evt.description, evt.date, evt.location, evt.url);


    // Card
    let createCard = document.createElement("div");
    createCard.setAttribute("class", " shadow card mb-3", "border-left-10");

    // Card Header
    let cardHeader = document.createElement("div");
    cardHeader.setAttribute("class", "card-header bg-success font-weight-bold");
    createCard.appendChild(cardHeader);

    // Card Body
    let createCardBody = document.createElement("div");
    createCardBody.setAttribute("class", "card-body container");
    createCardBody.setAttribute("style", "width:40rem; font-family:Verdana;");

    // Card Body Text and Votes
    let cardBodyTitle = document.createTextNode(evt.title); // This is the card header
    let cardBodyDescH = document.createTextNode('Description');
    let cardBodyDesc = document.createTextNode(evt.description);
    let cardBodyPic = document.createElement("img");
    cardBodyPic.setAttribute("src", evt.url);
    cardBodyPic.setAttribute("style", 'height:300px; width:300px; margin-left:25%; margin-right:25%; margin-bottom:10px; display:block; border: 5px green double;');
    let textDate = document.createTextNode("Date: ");
    let cardBodyDate = document.createTextNode(evt.date);
    let textLoc = document.createTextNode("Location: ");
    let cardBodyLoc = document.createTextNode(evt.location);
    let textVote = document.createTextNode('UpVotes: ')
    let cardBodyUpVotes = document.createTextNode(evt.upvote);

    // Add text and votes to elements

    let descH = document.createElement('h5')
    descH.setAttribute('style','color:lightsalmon; font-weight: bold; text-align: center')
    let descP = document.createElement("p");
    descP.setAttribute('style','display:inline-block margin:10px;font-style: italic;')
    let dateP = document.createElement("h7");
    let dateN = document.createElement("h7");
    dateN.setAttribute('style','color:Green; font-weight: bold')
    let locP = document.createElement("div");
    let locN = document.createElement('h7')
    locN.setAttribute('style','color: blue; font-weight: bold')
    let upVoteP = document.createElement("h6");
    upVoteP.setAttribute('style','color:red; font-weight: bold')
    let upVoteN = document.createElement("span");
    //
    upVoteN.setAttribute('class','badge badge-secondary')
    upVoteP.setAttribute('id','upVoteID')
    //
    descH.appendChild(cardBodyDescH)
    descP.appendChild(descH)
    descP.appendChild(cardBodyDesc);
    dateN.appendChild(textDate)
    dateP.appendChild(dateN)
    dateP.appendChild(cardBodyDate);
    locN.appendChild(textLoc)
    locP.appendChild(locN)
    locP.appendChild(cardBodyLoc);
    upVoteP.appendChild(textVote)
    upVoteP.appendChild(upVoteN)
    upVoteN.appendChild(cardBodyUpVotes)

    // Card Button
    let cardBodyBut = document.createElement("button");
    cardBodyBut.innerHTML = "UpVote";
    cardBodyBut.setAttribute("class", "btn btn-primary");
    cardBodyBut.setAttribute("value", evt.upvote);
    cardBodyBut.setAttribute("id", record.id);
    cardBodyBut.setAttribute("type", "button");
    cardBodyBut.onclick = upVoteBut;

    // Add to Card body
    cardHeader.appendChild(cardBodyTitle);
    createCardBody.appendChild(cardBodyPic);
    createCardBody.appendChild(descP);
    createCardBody.appendChild(dateP);
    createCardBody.appendChild(locP);
    createCardBody.appendChild(upVoteP);
    createCardBody.appendChild(cardBodyBut);

    // Add to Card and Event Log
    createCard.appendChild(createCardBody);
    boxEvent.appendChild(createCard);

    function upVoteBut(event) {
      console.log(event.target.id, event.target.value);

      db.collection("Events")
        .doc(event.target.id)
        .update({ upvote: Number(event.target.value) + 1 });
    }

    


  });
}

// text area counter

var el;                                                    

function countCharacters(e) {                                    
  var textEntered, countRemaining, counter;          
  textEntered = document.getElementById('validationCustom02').value;  
  counter = (0 + (textEntered.length));
  countRemaining = document.getElementById('chars'); 
  countRemaining.textContent = counter;
  
  if (counter == 0)
  {
      countRemaining.setAttribute('style','opacity:0;')
  }
  else if (counter > 1){
      countRemaining.setAttribute('style','opacity:0.5;')
  }
}
el = document.getElementById('validationCustom02');                   
el.addEventListener('keyup', countCharacters, false);

// Filter Buttons

function dateFunction() {
    db.collection('Events').orderBy('date','desc').onSnapshot(renderEvents)
}

function ascFunction() {
    db.collection('Events').orderBy('upvote','asc').onSnapshot(renderEvents)
}

function descFunction() {
    db.collection('Events').orderBy('upvote','desc').onSnapshot(renderEvents)
}






