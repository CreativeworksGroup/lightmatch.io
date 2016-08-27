Template.submitPhoto.rendered = function(){
    this.$('input[data-role=materialtags]').materialtags({
        tagClass: 'chip'
    });
}

Template.submitPhoto.events({
    'click #save-tags':function(e){
        e.preventDefault();
        const target = e.target;
        //const text = target.text.value;
        
        var tags = $("#photo-tags").materialtags('items');
        var path = Iron.Location.get().path.split("/");
        var imgId = path[2];
        Images.update(imgId, {$set: {'tags': tags}});
    }
});