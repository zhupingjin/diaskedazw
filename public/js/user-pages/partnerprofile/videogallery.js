
(function($){
    'use strict';

    var html5Lightbox;

    $("body").click(function(e){

        var type = "";
        var el = null;

        // check if click the like button
        if($(e.target).hasClass("fa-star"))
        {
            type = "star";
        }
        else if($(e.target).hasClass("fa-sign-language"))
        {
            type = "clap";
        }
        else if($(e.target).hasClass("fa-heart"))
        {
            type = "heart";
        }

        //send request to add like with videoid, type ... and set active class to element clicked
        if(type.length != 0)
        {
            

            el = $(e.target);

            // send request
            $.get("likevideo", {video_id: $(e.target).attr("video-id"), liketype: type, partner_id: partner.id})
                .then(function(data){
                    if(data == "failed"){
                        alert("you have to login first");
                        return;
                    }

                    if(type == "star")
                    {
                        $("i.fa-star[video-id='"+$(e.target).attr("video-id")+"']").parent().find(".count").text(data);
                        $("i.fa-star[video-id='"+$(e.target).attr("video-id")+"']").addClass("active");
                    }
                    else if(type == "clap")
                    {
                        $("i.fa-sign-language[video-id='"+$(e.target).attr("video-id")+"']").parent().find(".count").text(data);
                        $("i.fa-sign-language[video-id='"+$(e.target).attr("video-id")+"']").addClass("active");
                    }
                    else if(type == "heart")
                    {
                        $("i.fa-heart[video-id='"+$(e.target).attr("video-id")+"']").parent().find(".count").text(data);
                        $("i.fa-heart[video-id='"+$(e.target).attr("video-id")+"']").addClass("active");
                    }

                    var titleHTML = $(".like-button-container[video-id='" + $(e.target).attr("video-id") + "']").html();
                    var html = $(".html5lightbox[video-id='"+$(e.target).attr("video-id") + "']").attr("title");
                    html = $(html).find("a").remove();
                    html = $(html).find("span").html(titleHTML);
                    $(".html5lightbox[video-id='"+$(e.target).attr("video-id") + "']").attr("title", $(html).html());

                })
                .fail(function(err){});
        }

    });
    
    function addVideoElement(videos)
    {
        videos.forEach(video => {
            var titleHTML = '<div style="width: 100%;"><a>' + video.title + '</a>' + 
                                '<span class="title-like" video-id="'+video.id+'" style="float:right;">' +
                                    '<a style="padding: 5px;"><i video-id="'+video.id+'" class="fas fa-star ' + (video.is_star ? "active" : "" ) + '"></i> <span class="count">' + video.star + '<span></a>' +
                                    '<a style="padding: 5px;"><i video-id="'+video.id+'" class="fas fa-sign-language ' + (video.is_clap ? "active" : "" ) + '"></i> <span class="count">' + video.clap + '<span></a>' + 
                                    '<a style="padding: 5px;"><i video-id="'+video.id+'" class="fas fa-heart ' + (video.is_heart ? "active" : "" ) + '"></i> <span class="count">' + video.heart + "<span></a>" +
                                '</span>' +
                            '</div>';
                            
            var html = "" + 
                    "<div class='col-md-4'>" +
                        "<div class='video-gallery-thumbnail'>" +
                            "<div class='video-poster-img-container'>" +
                                "<a class='html5lightbox' video-id='"+video.id+"' href='" + asset_url + "/" + video.video_url+ "' title='"+titleHTML+"' data-group='videogallery-1'>" +
                                    "<img video-id='"+video.id+"' src='"+asset_url + "/" + video.adimg_url + "' class='video-poster-img' >" +
                                "</a>" +
                                "<div class='video-poster-img-video'></div>" +
                            "</div>" +
                            "<div class='video-caption'>" +
                                "<h3 class='video-caption-title'>" + video.title + "</h3>" +
                                "<p class='video-caption-description'>" + video.description + "</p>" +
                                "<div style=''>" + 
                                    "<div class='like-button-container' video-id='"+video.id+"' style='margin:auto;'>" +                                        
                                        "<a style='padding: 5px;'><i video-id='"+video.id+"' class='fas fa-star " + (video.is_star ? "active" : "" ) + "'></i> <span class='count'>" + video.star + "<span></a>" +
                                        "<a style='padding: 5px;'><i video-id='"+video.id+"' class='fas fa-sign-language " + (video.is_clap ? "active" : "" ) +  "'></i> <span class='count'>" + video.clap + "<span></a>" + 
                                        "<a style='padding: 5px;'><i video-id='"+video.id+"' class='fas fa-heart " + (video.is_heart ? "active" : "" ) + "'></i> <span class='count'>" + video.heart + "<span></a>" +
                                    "</div>" +
                                "</div>" + 
                            "</div>" +
                        "</div>" +
                    "</div>";

            $(html).appendTo('#video-gallery');
        });
        
        // html5 vieo lightbox
        $(".video-poster-img-video").click(function(){
            $(this).parent().children().first().click();
        });

        var jsFolder = asset_url + "/plugins/carouselengine/";
        if ( typeof html5Lightbox === "undefined" )
        {
            //jQuery(".html5lightbox").html5lightbox();
            
            jQuery(".html5lightbox").html5lightbox({
                skinsfoldername:"",
                jsfolder:jsFolder,
                barheight:64,
                showtitle:true,
                showdescription:false,
                shownavigation:false,
                thumbwidth:80,
                thumbheight:60,
                thumbtopmargin:12,
                thumbbottommargin:8,
                titlebottomcss:'{color:#333; font-size:14px; font-family:Armata,sans-serif,Arial; overflow:hidden; text-align:left;}',
                descriptionbottomcss:'{color:#333; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;}'
            });

            $(".html5lightbox").click((e)=>{
                console.log(e);
            });
        }
    }
    $("<div class='lds-roller' style='display:block;'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>")
            .appendTo("#video-gallery");
    $.get('getvideos', {count: -1, partnerid: partner.id})
        .done(function(data){
            console.log('getvideos successed', data);

            $("#video-gallery").find('.lds-roller').remove();
            addVideoElement(data);

            $("img[video-id='"+content_id+"']").click();
            content_id = "";
        })
        .fail(function(err){
            console.log('getvideos failed', err);
        });
}(jQuery));