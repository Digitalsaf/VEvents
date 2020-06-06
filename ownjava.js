let form = document.getElementById("register")
form.addEventListener('submit', function(event) {
    event.preventDefault();
    let one = document.getElementById("validationCustom01")
    let two = document.getElementById("validationCustom02")
    let three = document.getElementById("validationCustom03")
    let four = document.getElementById("validationCustom05")
    let five = document.getElementById("exampleFormControlFile1")
    console.log(one.value,two.value,three.value,four.value,five.value)
    let newEvent = {
        title: one.value,
        description: two.value,
        location: three.value,
        date: four.value,
        upvote: 0
    }

    db.collection("Events").add(newEvent)


});

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyASp-NPFQVBHqz0D2DlPHHh3PrPt9-PJGg",
    authDomain: "vevents-dbc46.firebaseapp.com",
    databaseURL: "https://vevents-dbc46.firebaseio.com",
    projectId: "vevents-dbc46",
    storageBucket: "vevents-dbc46.appspot.com",
    messagingSenderId: "280352398445",
    appId: "1:280352398445:web:a050d39a51dcc265977364",
    measurementId: "G-QFTKD3KLXM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let db = firebase.firestore()

  db.collection('Events').orderBy('date').onSnapshot(renderEvents)

  function renderEvents(fireBaseRecords){
    let boxEvent = document.getElementById("EventLog")
    boxEvent.innerHTML = ""
    fireBaseRecords.forEach(record => {
        console.log("id:", record.id)
        console.log("data:", record.data())
        
        let evt = record.data()
        console.log(evt.title,evt.description,evt.date,evt.location)
        
            let createCard = document.createElement('div')
            createCard.setAttribute('class', 'card col-md-6 mt-3 pl');
            

            let createCardBody = document.createElement('div')
            createCardBody.setAttribute('class', 'card-body pr-5');
            createCardBody.setAttribute('style','width:40rem; color:red; display:block;')
            let cardBodyTitle = document.createTextNode(evt.title)
            let cardBodyDesc = document.createTextNode(evt.description)
            let cardBodyDate = document.createTextNode(evt.date)
            let cardBodyLoc = document.createTextNode(evt.location)
            let cardBodyUpVotes = document.createTextNode(evt.upvote)
            let cardBodyBut= document.createElement("button")
            cardBodyBut.innerHTML = "UpVote"
            cardBodyBut.setAttribute('style','display:block; margin:10px; padding:10px; width:5rem;')
            cardBodyBut.setAttribute('value', evt.upvote)
            cardBodyBut.setAttribute('id', record.id)
            cardBodyBut.setAttribute('type', 'button')
            cardBodyBut.onclick = upVoteBut;
    
            
            

        
            createCardBody.appendChild(cardBodyTitle)
            createCardBody.appendChild(cardBodyDesc)
            createCardBody.appendChild(cardBodyDate)
            createCardBody.appendChild(cardBodyLoc)
            createCardBody.appendChild(cardBodyUpVotes)
            createCardBody.appendChild(cardBodyBut)
            
            
            
            
          
          createCard.appendChild(createCardBody)
          boxEvent.appendChild(createCard);
          
          
            function upVoteBut (event) {
                console.log(event.target.id, event.target.value)
                
                db.collection('Events').doc(event.target.id).update(
                    {upvote: Number(event.target.value) +1}

                     )
                }
        
      })
    
  }


  /*let createCard = document.createElement('div')
  createCard.setAttribute('class', 'card');
  let createCardBody = document.createElement('div')
  let cardBodyText = document.createTextNode(record.id,record.data())
  createCardBody.append(cardBodyText)
  createCard.setAttribute('class', 'card-body');
  createCard.appendChild(createCardBody)
  


 document.body.appendChild(createCard);
 */