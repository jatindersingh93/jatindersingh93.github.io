$(function() { 
    var localData = "data.json";
    var slide = 0;
    var maxSlide = 1;
    var aniDuration = 2000;
    var delay = 2000;
    var last_vote_timestamp = null; 
    // this will hold images if one is being disabled.
    var voted_image = [];
    var SHOW_VOTING_IMAGE = true;
    var themeData = [];
    var finalistsData = [];
    var timer = [];     
    $( document ).ready(function() {
       var request = $.ajax({
            xhrFields: {
                withCredentials: true
            },      
           data: { get_param: 'value' }, 
           success: function (data) {
               finalistsData = data;
               console.log(finalistsData);
               createHtml(slide);
            },            
            url: localData
        });
        //setInterval(latestVote, 3000);         
        //setInterval(displayVote, 9000);         
    });
       
    function createHtml(slide){
        resetTimer();
        data = finalistsData;        
        var cropImages = '';
        var j = 1;
        $('body').attr('class','')

        
        $.each(data, function(key, field){   
            if(key == "winners"){            
            $('.logo img').attr('src', data[key][slide]['logo']);                
            $('.entries .d').html(data[key][slide]['entries']['digits']);
            $('.entries .en').html(data[key][slide]['entries']['text']);                       
            
            $('.selected .d').html(data[key][slide]['selected']['digits']);
            $('.selected .en').html(data[key][slide]['selected']['text']);              
            
            $('.months .d').html(data[key][slide]['months']['digits']);
            $('.months .en').html(data[key][slide]['months']['text']); 
            
            $('.award .d').html(data[key][slide]['award']['digits']);
            $('.award .en').html(data[key][slide]['award']['text']);
            
            $('.message .en').html(data[key][slide]['message']['text']);                 
            
            //add remove orientation class
            $('body').toggleClass(data[key][slide]['orientation']);
                
            $('.votes .d').html(data[key][slide]['votes']['digits']);
            $('.votes .en').html(data[key][slide]['votes']['text']);       
                
            $('.award-image img').attr('src', data[key][slide]['url']);
            $('.photo-info .en .title').html(data[key][slide]['title']);                      
            $('.photo-info .en .photographer').html(data[key][slide]['photographer']);   
            $('.photo-info .en .description').html(data[key][slide]['description']);                 
            }
        });
        startAnimating();
    }                      

    function startAnimating(){
        // show logo
        $('.logo img').fadeTo(aniDuration, 0.99);
        $('.award-text div').each(function(index, element){  
            timer.push(
                setTimeout( function(){ 
                    $(element).fadeTo(aniDuration, 0.99);   
                    console.log("pause for " + delay);
                }, delay)	       
                );
           delay += 1500;
        });
        delay = 1000; //reset
        
        // hide award text
        timer.push( 
            setTimeout(hideAwardText, aniDuration * 6) 
        );
           
         //hide everything and show image
        timer.push(
             setTimeout(showImage, aniDuration * 7)                 
            );
        
        timer.push(
            setTimeout( hideInfoText, aniDuration * 25)
            );
        timer.push(
            setTimeout( reset, aniDuration * 30)
            );        
       
    }
    
    function hideAwardText(){
        $('.award-text div').fadeTo(aniDuration, 0);
        $('.message').fadeTo(aniDuration, 0.99);     
    }
    function showImage(){
        $('.logo img').fadeTo(aniDuration, 0);
        $('.message').fadeTo(aniDuration, 0);
        $('.award-image img').delay(delay*2).fadeTo(aniDuration, 0.99);
        $('.photo-info').delay(delay * 12).fadeTo(aniDuration, 0.99);   
    }
    function hideInfoText(){
        $('.photo-info').fadeTo(aniDuration, 0);          
    }
    function reset(){
        slide++;
        
        if(slide > maxSlide){
        slide = 0;
        }        
        $('.award-image img').delay(delay).fadeTo(aniDuration, 0, function(){
            createHtml(slide);
        });        
        
    }

    function resetTimer(){
            for (var i = 0; i < timer.length; i++)
            {
                clearTimeout(timer[i]);
            }
        timer = [];
    }
    
});  