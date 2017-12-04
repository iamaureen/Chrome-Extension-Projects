// TODO(DEVELOPER): Change the values below using values from the initialization snippet: Firebase Console > Overview > Add Firebase to your web app.
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCZCs7PIno3eKWR1u-CR5Ua9AqPLPFwluw",
  authDomain: "tolc-b0fa5.firebaseapp.com",
  databaseURL: "https://tolc-b0fa5.firebaseio.com",
  projectId: "tolc-b0fa5",
  storageBucket: "tolc-b0fa5.appspot.com",
  messagingSenderId: "62715960283"
};
firebase.initializeApp(config);


firebase.database().ref('/web').on('value', function(snapshot) {
  if(snapshot.val()!=null)
  {

    var data = snapshot.val();
    var q_count, exp_count, exa_count;
    q_count = exp_count = exa_count = 0;

    //question
    if(data["question"])
    {
      if (document.getElementById("questions").hasChildNodes()) {
        while (document.getElementById("questions").firstChild) {
          document.getElementById("questions").removeChild(document.getElementById("questions").firstChild);
        }
      }
      for(var x in data["question"])
      {
        console.log('from web (key):: ', x);
        const outer_div = document.createElement('div');
        outer_div.className = "card mt-4";

        const inner_div = document.createElement('div');
        inner_div.id = x+"_innerdiv";
        inner_div.className = "card-body";

        const div_title = document.createElement('h4');
        div_title.className = "card-title";
        const div_title_textnode = document.createTextNode(data["question"][x].title);
        div_title.appendChild(div_title_textnode);

        const div_source = document.createElement('a');
        div_source.className = "card-link";
        div_source.setAttribute('href',data["question"][x].url);
        div_source.innerHTML = "Source";

        const div_note = document.createElement('p');
        const div_note_textnode = document.createTextNode(data["question"][x].note);
        div_note_textnode.className = "scroll-box";
        div_note.appendChild(div_note_textnode);

        const div_tags = document.createElement('p');
        const div_tags_textnode = document.createTextNode(data["question"][x].tags);
        div_tags_textnode.className = "text-muted";
        div_tags.appendChild(div_tags_textnode);


        const div_hr = document.createElement("HR");
        const div_br = document.createElement("BR");

        const div_user = document.createElement("SMALL");
        div_user.className = "text-muted";
        const div_user_textnode = document.createTextNode(`Added by ${data["question"][x].user} on ${data["question"][x].date} `);
        div_user.appendChild(div_user_textnode);

        const comment_form = document.createElement("FORM");
        comment_form.id = x+"_form";
        const comment_div = document.createElement('div');
        comment_div.className = "form-group";
        const comment_textarea = document.createElement("TEXTAREA");
        comment_textarea.className = "form-control";
        comment_textarea.rows = "2";
        comment_textarea.id = x+"_comment";
        comment_textarea.placeholder = "Add a comment";

        //comment button
        const comment_button = document.createElement("BUTTON");
        comment_button.className = "btn btn-primary";
        const button_text = document.createTextNode("Add");
        comment_button.type ="button";
        comment_button.id = x;
        comment_button.appendChild(button_text);

        //add comment to the database once clicked
        comment_button.addEventListener('click',function(e){
          var id = e.target.id;
          console.log('from web (id):: ', id)
          const data = document.getElementById(id+"_comment");
          if(data.value)
          {
            var pushComment = firebase.database().ref("web/question/"+id).child('comment').push();
            pushComment.set({
              data: data.value,
              user: firebase.auth().currentUser.displayName,
              date: Date()
            });
            data.value ='';
          }
        });

        //useful button
        const useful_button = document.createElement("BUTTON");
        useful_button.className = "btn btn-primary";
        const useful_button_text = document.createTextNode(`Useful (${data["question"][x].useful}) `);
        useful_button.type = "button";
        useful_button.id = x;
        useful_button.appendChild(useful_button_text);

        //update counter in the database when user presses 'useful'
        useful_button.addEventListener('click', function(e){
          var id = e.target.id;
          var num_useful = data["question"][x].useful
          num_useful++
          firebase.database().ref("web/question/"+id).update({
            useful: num_useful
          })
          .then(() => {
            console.log("useful is updated");
          })
          .catch(() => {
            console.log("Error in updating")
          });

        });

        //notuseful buttons
        const not_useful_button = document.createElement("BUTTON");
        not_useful_button.className = "btn btn-primary";
        const not_useful_button_text = document.createTextNode(`Not Useful (${data["question"][x].notuseful}) `);
        not_useful_button.type = "button";
        not_useful_button.id = x;
        not_useful_button.appendChild(not_useful_button_text);

        //update counter in the database when user presses 'not useful'
        not_useful_button.addEventListener('click', function(e){
          var id = e.target.id;
          var num_notuseful = data["question"][x].notuseful
          num_notuseful++
          firebase.database().ref("web/question/"+id).update({
            notuseful: num_notuseful
          })
          .then(() => {
            console.log("not useful is updated");
          })
          .catch(() => {
            console.log("Error in updating")
          });

        });



        comment_div.appendChild(comment_textarea);
        comment_form.appendChild(comment_div);
        comment_form.appendChild(comment_button);
        comment_form.appendChild(useful_button);
        comment_form.appendChild(not_useful_button);

        inner_div.appendChild(div_title);
        inner_div.appendChild(div_source);
        inner_div.appendChild(div_note);
        inner_div.appendChild(div_tags);
        inner_div.appendChild(div_user);



        if(data["question"][x]["comment"])
        {
          for(var y in data["question"][x]["comment"])
          {
            const div_comment = document.createElement('div');
            const comment_text = document.createTextNode(data["question"][x]["comment"][y].data);
            div_comment.appendChild(comment_text);
            const div_user = document.createElement("SMALL");
            div_user.className = "text-muted";
            const div_user_textnode = document.createTextNode(` Added by ${data["question"][x]["comment"][y].user} on ${data["question"][x]["comment"][y].date} `);
            div_user.appendChild(div_user_textnode);
            div_comment.appendChild(div_user);
            inner_div.appendChild(div_comment);
            inner_div.appendChild(div_br);
            console.log(data["question"][x]["comment"][y].data);
          }
        }
        inner_div.appendChild(div_br);
        inner_div.appendChild(div_hr);
        inner_div.appendChild(comment_form);
        outer_div.appendChild(inner_div);
        document.getElementById("questions").appendChild(outer_div);

      }
    }

    //explanation
    if(data["explanation"])
    {
      if (document.getElementById("explanations").hasChildNodes()) {
        while (document.getElementById("explanations").firstChild)
        {
          document.getElementById("explanations").removeChild(document.getElementById("explanations").firstChild);
        }
      }
      for(var x in data["explanation"])
      {
        const outer_div = document.createElement('div');
        outer_div.className = "card mt-4";

        const inner_div = document.createElement('div');
        inner_div.id = x+"_innerdiv";
        inner_div.className = "card-body";

        const div_title = document.createElement('h4');
        div_title.className = "card-title";
        const div_title_textnode = document.createTextNode(data["explanation"][x].title);
        div_title.appendChild(div_title_textnode);

        const div_source = document.createElement('a');
        div_source.className = "card-link";
        div_source.setAttribute('href',data["explanation"][x].url);
        div_source.innerHTML = "Source";

        const div_note = document.createElement('p');
        const div_note_textnode = document.createTextNode(data["explanation"][x].note);
        div_note_textnode.className = "scroll-box";
        div_note.appendChild(div_note_textnode);

        const div_hr = document.createElement("HR");
        const div_br = document.createElement("BR");

        const div_user = document.createElement("SMALL");
        div_user.className = "text-muted";
        const div_user_textnode = document.createTextNode(`Added by ${data["explanation"][x].user} on ${data["explanation"][x].date} `);
        div_user.appendChild(div_user_textnode);

        const comment_form = document.createElement("FORM");
        comment_form.id = x+"_form";
        const comment_div = document.createElement('div');
        comment_div.className = "form-group";
        const comment_textarea = document.createElement("TEXTAREA");
        comment_textarea.className = "form-control";
        comment_textarea.rows = "2";
        comment_textarea.id = x+"_comment";
        comment_textarea.placeholder = "Add a comment";

        const comment_button = document.createElement("BUTTON");
        comment_button.className = "btn btn-primary";
        const button_text = document.createTextNode("Add");
        comment_button.type ="button";
        comment_button.id = x;

        comment_button.addEventListener('click',function(e){
          var id = e.target.id;
          const data = document.getElementById(id+"_comment");
          if(data.value)
          {
            var pushComment = firebase.database().ref("web/explanation/"+id).child('comment').push();
            pushComment.set({
              data: data.value,
              user: firebase.auth().currentUser.displayName,
              date: Date()
            });
            data.value ='';
          }
        });

        comment_button.appendChild(button_text);

        comment_div.appendChild(comment_textarea);
        comment_form.appendChild(comment_div);
        comment_form.appendChild(comment_button);

        inner_div.appendChild(div_title);
        inner_div.appendChild(div_source);
        inner_div.appendChild(div_note);
        //inner_div.appendChild(div_hr);
        inner_div.appendChild(div_user);



        if(data["explanation"][x]["comment"])
        {
          for(var y in data["explanation"][x]["comment"])
          {
            const div_comment = document.createElement('div');
            const comment_text = document.createTextNode(data["explanation"][x]["comment"][y].data);
            div_comment.appendChild(comment_text);
            const div_user = document.createElement("SMALL");
            div_user.className = "text-muted";
            const div_user_textnode = document.createTextNode(` Added by ${data["explanation"][x]["comment"][y].user} on ${data["explanation"][x]["comment"][y].date} `);
            div_user.appendChild(div_user_textnode);
            div_comment.appendChild(div_user);
            inner_div.appendChild(div_comment);
            inner_div.appendChild(div_br);
            console.log(data["explanation"][x]["comment"][y].data);
          }
        }
        inner_div.appendChild(div_br);
        inner_div.appendChild(div_hr);
        inner_div.appendChild(comment_form);
        outer_div.appendChild(inner_div);
        document.getElementById("explanations").appendChild(outer_div);

      }


    }

    //example
    if(data["example"])
    {
      if (document.getElementById("examples").hasChildNodes()) {
        while (document.getElementById("examples").firstChild)
        {
          document.getElementById("examples").removeChild(document.getElementById("examples").firstChild);
        }
      }
      for(var x in data["example"])
      {
        const outer_div = document.createElement('div');
        outer_div.className = "card mt-4";

        const inner_div = document.createElement('div');
        inner_div.id = x+"_innerdiv";
        inner_div.className = "card-body";

        const div_title = document.createElement('h4');
        div_title.className = "card-title";
        const div_title_textnode = document.createTextNode(data["example"][x].title);
        div_title.appendChild(div_title_textnode);

        const div_source = document.createElement('a');
        div_source.className = "card-link";
        div_source.setAttribute('href',data["example"][x].url);
        div_source.innerHTML = "Source";

        const div_note = document.createElement('p');
        const div_note_textnode = document.createTextNode(data["example"][x].note);
        div_note_textnode.className = "scroll-box";
        div_note.appendChild(div_note_textnode);

        const div_hr = document.createElement("HR");
        const div_br = document.createElement("BR");

        const div_user = document.createElement("SMALL");
        div_user.className = "text-muted";
        const div_user_textnode = document.createTextNode(`Added by ${data["example"][x].user} on ${data["example"][x].date} `);
        div_user.appendChild(div_user_textnode);

        const comment_form = document.createElement("FORM");
        comment_form.id = x+"_form";
        const comment_div = document.createElement('div');
        comment_div.className = "form-group";
        const comment_textarea = document.createElement("TEXTAREA");
        comment_textarea.className = "form-control";
        comment_textarea.rows = "2";
        comment_textarea.id = x+"_comment";
        comment_textarea.placeholder = "Add a comment";

        const comment_button = document.createElement("BUTTON");
        comment_button.className = "btn btn-primary";
        const button_text = document.createTextNode("Add");
        comment_button.type ="button";
        comment_button.id = x;

        comment_button.addEventListener('click',function(e){
          var id = e.target.id;
          const data = document.getElementById(id+"_comment");
          if(data.value)
          {
            var pushComment = firebase.database().ref("web/example/"+id).child('comment').push();
            pushComment.set({
              data: data.value,
              user: firebase.auth().currentUser.displayName,
              date: Date()
            });
            data.value ='';
          }
        });

        comment_button.appendChild(button_text);

        comment_div.appendChild(comment_textarea);
        comment_form.appendChild(comment_div);
        comment_form.appendChild(comment_button);

        inner_div.appendChild(div_title);
        inner_div.appendChild(div_source);
        inner_div.appendChild(div_note);
        //inner_div.appendChild(div_hr);
        inner_div.appendChild(div_user);



        if(data["example"][x]["comment"])
        {
          for(var y in data["example"][x]["comment"])
          {
            const div_comment = document.createElement('div');
            const comment_text = document.createTextNode(data["example"][x]["comment"][y].data);
            div_comment.appendChild(comment_text);
            const div_user = document.createElement("SMALL");
            div_user.className = "text-muted";
            const div_user_textnode = document.createTextNode(` Added by ${data["example"][x]["comment"][y].user} on ${data["example"][x]["comment"][y].date} `);
            div_user.appendChild(div_user_textnode);
            div_comment.appendChild(div_user);
            inner_div.appendChild(div_comment);
            inner_div.appendChild(div_br);
            console.log(data["example"][x]["comment"][y].data);
          }
        }
        inner_div.appendChild(div_br);
        inner_div.appendChild(div_hr);
        inner_div.appendChild(comment_form);
        outer_div.appendChild(inner_div);
        document.getElementById("examples").appendChild(outer_div);

      }

    }

  }
});


//Adding event listener to the close button
$('#closePopUp').click(function(event) {
  window.close();
});
