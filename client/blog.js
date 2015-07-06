Session.set('voices',window.speechSynthesis.getVoices());
voices = [];
theVoice=null;

Template.blog.helpers({
  blogData:function(){
    return Blogs.find({},{sort:{blogName:1,blog:1}}).fetch();
  }
});

Template.blog.events({
  'submit #addBlogForm':function(event){
    event.preventDefault();

    Blogs.insert({
      blogName:blogName.value,
      blog:blog.value,
    });

    blogName.value = '';
    blog.value = '';
  },
  'click .delete-entry':function(event){
    Blogs.remove(this._id);
  },

  'click .say': function(event){
    currentBlog = this._id;
    var msg = new SpeechSynthesisUtterance(Blogs.findOne({_id:this._id}));
    if (theVoice) msg.voice=theVoice;
    window.speechSynthesis.speak(msg);
  }
  /*
  'click .say': function(event){
    //var text = $("#words").val();
    var msg = new SpeechSynthesisUtterance(blog.value);
    if (theVoice) msg.voice=theVoice;
    window.speechSynthesis.speak(msg);
  }
  */
});
